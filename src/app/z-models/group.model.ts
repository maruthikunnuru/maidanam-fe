export class GroupModel {
    public groupId: number;
    public userId: number;
    public groupName: string;
    public defaultInd: boolean;
    public groupCode: string;
    public isActive: boolean;


    constructor(groupId: number, userId: number, groupName: string, defaultInd: boolean, groupCode: string, isActive: boolean) {
        this.groupId = groupId;
        this.userId = userId;
        this.groupName = groupName;
        this.defaultInd = defaultInd;
        this.groupCode = groupCode;
        this.isActive = isActive;
    }
}