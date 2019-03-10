export class GroupModel {
    public groupId: number;
    public groupName: string;
    public referenceCds: string;
    public coinsToPurchase: number;
    public coinsPrice: number;
    public groupStatus: string;
    public defaultCoins: number;

    constructor(groupId: number, groupName: string, referenceCds: string,
                coinsToPurchase: number, coinsPrice: number, groupStatus: string,
                defaultCoins: number) {
        this.groupId = groupId;
        this.groupName = groupName;
        this.referenceCds = referenceCds;
        this.coinsToPurchase = coinsToPurchase;
        this.coinsPrice = coinsPrice;
        this.groupStatus = groupStatus;
        this.defaultCoins = defaultCoins;
    }
}