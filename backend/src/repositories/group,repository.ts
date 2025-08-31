import { FilterQuery } from "mongoose";

import { IGroup } from "../interfaces/group.interface";
import { Group } from "../models/group.model";

class GroupRepository {
  public async getAll(): Promise<IGroup[]> {
    return await Group.find({});
  }

  public async create(dto: Partial<IGroup>): Promise<IGroup> {
    return await Group.create(dto);
  }

  public async findByParams(params: FilterQuery<IGroup>): Promise<IGroup> {
    return await Group.findOne(params);
  }
}

export const groupRepository = new GroupRepository();
