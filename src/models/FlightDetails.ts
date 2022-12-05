import { IFlightDetails } from "../store/storeModel";

export class FlightDetails {
    flight_id: string;
    depatureAt: Date;
    arriveAt: Date;

    constructor(iFlightDetails: IFlightDetails) {
        const {
            flight_id,
            depatureAt,
            arriveAt
        } = iFlightDetails;
        this.flight_id = flight_id;
        this.depatureAt = new Date(depatureAt);
        this.arriveAt = new Date(arriveAt);
    }
}