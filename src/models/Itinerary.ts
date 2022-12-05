import { IItinerary } from "../store/storeModel";
import { Price } from "./Price";

export class Itinerary {
    depatureAt: Date;
    arriveAt: Date;
    avaliableSeats: number;
    prices: Price[];
    flightId: string;

    constructor(iItinirary: IItinerary) {
      const {
        depatureAt,
        arriveAt,
        avaliableSeats,
        prices,
        flightId
      } = iItinirary;
      this.depatureAt = new Date(depatureAt);
      this.arriveAt = new Date(arriveAt);
      this.avaliableSeats = avaliableSeats;
      this.prices = prices.map(price => new Price(price));
      this.flightId = flightId;
    }
}
