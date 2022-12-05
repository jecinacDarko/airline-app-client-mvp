import { IBookingDTO } from "../store/storeModel";
import { FlightDetails } from "./FlightDetails";
import { PersonDetails } from "./PersonDetails";

export class BookingDTO {
    flightTo: FlightDetails;
    flightFrom?: FlightDetails;
    childPassengers: PersonDetails[];
    adultPassengers: PersonDetails[];

    constructor(
        iBookingDto: IBookingDTO
        
    ) {
        const {
            flightTo,
            childPassengers,
            adultPassengers,
            flightFrom
        } = iBookingDto;
        this.flightTo = new FlightDetails(flightTo);
        if (flightFrom) {
            this.flightFrom = new FlightDetails(flightFrom);
        }
        this.childPassengers = childPassengers;
        this.adultPassengers = adultPassengers;
    }
}