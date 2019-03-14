import {GroupModel} from './group.model';

export class UserModel {
    public userId: number;
    public userName: string;
    public firstName: string;
    public lastName: string;
    public displayName: string;
    public emailId: string;
    public groupId: number;
    public group: GroupModel;
    public referenceCd: string;
    public totalCoins: number;
    public totalLoan: number;
    public effectiveCoins: number;
    public userRole: string;


    constructor(userId: number, userName: string, firstName: string,
                lastName: string, displayName: string, emailId: string,
                groupId: number, group: GroupModel, referenceCd: string,
                totalCoins: number, totalLoan: number, effectiveCoins: number,
                userRole: string) {
        this.userId = userId;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.displayName = displayName;
        this.emailId = emailId;
        this.groupId = groupId;
        this.group = group;
        this.referenceCd = referenceCd;
        this.totalCoins = totalCoins;
        this.totalLoan = totalLoan;
        this.effectiveCoins = effectiveCoins;
        this.userRole = userRole;
    }
}
