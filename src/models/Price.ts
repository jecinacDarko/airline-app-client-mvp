import { IPrice } from "../store/storeModel";

export class Price {
    currency: string;
    adult: number;
    child: number;

    constructor(iprice: IPrice) {
        const { currency, adult, child } = iprice;
        this.currency = currency;
        this.adult = adult;
        this.child = child;
    }
}

