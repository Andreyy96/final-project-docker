import {FC} from 'react';
import {IGroup} from "../../../interfaces/group.interface";

interface IProps {
    group: IGroup
}

const Group: FC<IProps> = ({group}) => {
    return (
        <option value={group.name}>{group.name}</option>
    );
};

export {Group};