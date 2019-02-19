export class UserModel {
    public displayName: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public userName: string;
    public groups: string[];


    constructor(displayName: string,
                firstName: string,
                lastName: string,
                email: string,
                userName: string,
                groups: string[]) {
        this.displayName = displayName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.userName = userName;
        this.groups = groups;
    }
}
