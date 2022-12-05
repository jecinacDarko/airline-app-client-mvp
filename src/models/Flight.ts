import { IFlight } from "../store/storeModel";
import { Itinerary } from "./Itinerary";

export class Flight {
    flight_id: string;
    depatureDestination: string;
    arrivalDestination: string;
    itineraries: Itinerary[];

    constructor(iFlight: IFlight) {
        const {
            flight_id,
            depatureDestination,
            arrivalDestination,
            itineraries
        } = iFlight;
        this.flight_id = flight_id;
        this.depatureDestination = depatureDestination;
        this.arrivalDestination = arrivalDestination;
        this.itineraries = itineraries.map(itinerary => new Itinerary(itinerary));
    }
}