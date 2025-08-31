import { configs } from "../configs/config";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { UserRoleEnum } from "../enums/user-role.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { IDTOUser, IUser } from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { accessTokenRepository } from "../repositories/access-token.repository";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { refreshTokenRepository } from "../repositories/refresh-token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signIn(
    user: IUser,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await this.deleteTokens(user._id);

    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });

    await this.createTokens(user._id, tokens);

    const updateUser = await userRepository.updateLastLoginById(user._id);

    return { user: updateUser, tokens };
  }

  public async getMe(jwtPayload: ITokenPayload): Promise<Partial<IUser>> {
    const user = await userRepository.getById(jwtPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 421);
    }

    return userPresenter.toPublicResDto(user);
  }

  public async createManager(dto: IDTOUser): Promise<IUser> {
    await this.isEmailExistOrThrow(dto.email);
    const [user] = await userRepository.getLustUser();
    return await userRepository.create({
      id: user.id + 1,
      name: dto.name,
      surname: dto.surname,
      email: dto.email,
      role: UserRoleEnum.MANAGER,
    });
  }

  public async activateAccountGetURL(
    jwtPayload: ITokenPayload,
    userId: string,
  ): Promise<string> {
    const user = await userRepository.getById(userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const token = tokenService.generateActionTokens(
      { userId: user._id, role: user.role },
      ActionTokenTypeEnum.ACTIVATE,
    );

    await actionTokenRepository.create({
      type: ActionTokenTypeEnum.ACTIVATE,
      _userId: user._id,
      token,
    });

    return `${configs.FRONT_URL}/activate/${token}`;
  }

  public async activateAccount(
    jwtPayload: ITokenPayload,
    dto: { password: string; confirm_password: string },
  ): Promise<void> {
    const password = await passwordService.hashPassword(dto.password);
    await userRepository.updateById(jwtPayload.userId, { password });

    await actionTokenRepository.deleteByParams({
      _userId: jwtPayload.userId,
      type: ActionTokenTypeEnum.ACTIVATE,
    });
  }

  public async recoveryPasswordGetURL(email: string): Promise<string> {
    const user = await userRepository.getByEmail(email);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    if (!user.is_active) {
      throw new ApiError("Manager must activate account", 403);
    }

    const token = tokenService.generateActionTokens(
      { userId: user._id, role: user.role },
      ActionTokenTypeEnum.RECOVERY_PASSWORD,
    );
    await actionTokenRepository.create({
      type: ActionTokenTypeEnum.RECOVERY_PASSWORD,
      _userId: user._id,
      token,
    });

    return `${configs.FRONT_URL}/recovery-password/${token}`;
  }

  public async recoveryPasswordSet(
    dto: { password: string; confirm_password: string },
    jwtPayload: ITokenPayload,
  ): Promise<void> {
    const password = await passwordService.hashPassword(dto.password);
    await userRepository.updatePasswordById(jwtPayload.userId, { password });

    await actionTokenRepository.deleteByParams({
      _userId: jwtPayload.userId,
      type: ActionTokenTypeEnum.RECOVERY_PASSWORD,
    });

    await Promise.all([
      accessTokenRepository.deleteByParams({ _userId: jwtPayload.userId }),
      refreshTokenRepository.deleteByParams({ _userId: jwtPayload.userId }),
    ]);
  }

  private async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email already exists", 409);
    }
  }

  public async refresh(jwtPayload: ITokenPayload): Promise<ITokenPair> {
    await this.deleteTokens(jwtPayload.userId);

    const tokens = tokenService.generateTokens({
      userId: jwtPayload.userId,
      role: jwtPayload.role,
    });
    await this.createTokens(jwtPayload.userId, tokens);

    return tokens;
  }

  public async signOut(jwtPayload: ITokenPayload): Promise<void> {
    const user = await userRepository.getById(jwtPayload.userId);

    await this.deleteTokens(user._id);
  }

  private async createTokens(
    _userId: string,
    tokens: ITokenPair,
  ): Promise<void> {
    await Promise.all([
      accessTokenRepository.create({
        accessToken: tokens.accessToken,
        _userId,
      }),
      refreshTokenRepository.create({
        refreshToken: tokens.refreshToken,
        _userId,
      }),
    ]);
  }

  private async deleteTokens(_userId: string): Promise<void> {
    await Promise.all([
      accessTokenRepository.deleteByParams({
        _userId,
      }),
      refreshTokenRepository.deleteByParams({
        _userId,
      }),
    ]);
  }
}

export const authService = new AuthService();
