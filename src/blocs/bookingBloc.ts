import { baseUrl } from "../config";
import { BookingDTO } from "../models/BookDTO";
import { CreatedBooking } from "../models/CreatedBooking";

const getBooking = async (bookingId: string): Promise<CreatedBooking> => {
    return await (await fetch(`${baseUrl}booking/${bookingId}`)).json();
}

const bookFlight = async (bookingDTO: BookingDTO): Promise<CreatedBooking> => {
    const res = await fetch(`${baseUrl}booking`, {
        method: 'post',
        body: JSON.stringify(bookingDTO),
        headers: { 'Content-Type': 'application/json'}
    });
    return res.json();
}

export default { getBooking, bookFlight }