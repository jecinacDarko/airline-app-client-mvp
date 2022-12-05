import { ICreatedBooking } from "../store/storeModel";
import { BookingDTO } from "./BookDTO";

export class CreatedBooking {
    bookingId: string;
    booking: BookingDTO;

    constructor(iCreatedBooking: ICreatedBooking) {
        const {
            bookingId,
            booking
        } = iCreatedBooking;
        this.booking = new BookingDTO(booking);
        this.bookingId = bookingId;
    }
}