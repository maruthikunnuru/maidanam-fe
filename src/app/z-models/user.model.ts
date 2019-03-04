export class UserModel {
    public userId: number;
    public userName: string;
    public firstName: string;
    public lastName: string;
    public emailId: string;
    public referenceCd: string;
    public totalCoins: number;
    public totalLoan: number;
    public effectiveCoins: number;
    public userRole: string;
    public groups: string[];


    constructor(userId: number, userName: string,
                firstName: string, lastName: string,
                userRole: string) {
        this.userId = userId;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userRole = userRole;
    }


}
