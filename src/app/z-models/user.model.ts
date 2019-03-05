import {GroupModel} from './group.model';

export class UserModel {
    public userName: string;
    public firstName: string;
    public lastName: string;
    public emailId: string;
    public userRole: string;
    public groups: GroupModel[];


    constructor(userName: string, firstName: string, lastName: string, emailId: string, userRole: string, groups: GroupModel[]) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.userRole = userRole;
        this.groups = groups;
    }
}
