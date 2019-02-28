export class ScoresModel {
    public rank: number;
    public player: string;
    public coins: number;
    public change: number;


    constructor(rank: number, player: string, coins: number, change: number) {
        this.rank = rank;
        this.player = player;
        this.coins = coins;
        this.change = change;
    }
}