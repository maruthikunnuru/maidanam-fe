export class UserModel {
    public userName: string;
    public firstName: string;
    public lastName: string;
    public emailId: string;
    public userRole: string;

    constructor(userName: string, firstName: string, lastName: string,
                emailId: string, userRole: string) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.userRole = userRole;
    }
}
