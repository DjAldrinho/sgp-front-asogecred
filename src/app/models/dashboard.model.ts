export class Dashboard {
    constructor(
        public period: string,
        public total_account: string,
        public total_deposit: string,
        public total_retire: string,
        public total_credits: number,
        public pending_credits: number,
        public active_credits: number,
        public finish_credits: number,
        public expired_credits: number,
    ) { }
}