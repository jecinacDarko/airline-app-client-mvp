import { PersonDetails } from "../models/PersonDetails";

interface CityState {
    cities: string[];
}

interface CreatedBookingState {
    booking: ICreatedBooking;
    error: string;
}

interface ICreatedBooking {
    bookingId: string;
    booking: IBookingDTO;
}

interface IBookingDTO {
    flightTo: IFlightDetails;
    flightFrom?: IFlightDetails;
    childPassengers: PersonDetails[];
    adultPassengers: PersonDetails[];
}

interface IFlightDetails { 
    flight_id: string;
    depatureAt: string;
    arriveAt: string;
}

interface FlightState {
    directFlights: IFlight[];
    returnFlights: IFlight[];
}

interface IFlight {
    flight_id: string;
    depatureDestination: string;
    arrivalDestination: string;
    itineraries: IItinerary[];
}

interface IItinerary {
    depatureAt: string;
    arriveAt: string;
    avaliableSeats: number;
    prices: IPrice[];
    flightId: string;
}

interface IPrice {
    currency: string;
    adult: number;
    child: number;
}

interface BookingState {
    toItinerary: IItinerary;
    fromItinerary: IItinerary;
    numberOfAdults: number;
    numberOfChildren: number;
    oneWay: boolean; 
}

interface Store {
    flights: FlightState;
    cities: CityState;
    bookings: BookingState;
    createdBookings: CreatedBookingState;
}

export type { 
    CityState, 
    FlightState, 
    Store, 
    BookingState, 
    IFlight, 
    IItinerary, 
    IPrice, 
    CreatedBookingState,
    IFlightDetails,
    IBookingDTO,
    ICreatedBooking
}