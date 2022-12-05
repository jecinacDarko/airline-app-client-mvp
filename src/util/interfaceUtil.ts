import { BookingDTO } from "../models/BookDTO"
import { CreatedBooking } from "../models/CreatedBooking"
import { Flight } from "../models/Flight"
import { FlightDetails } from "../models/FlightDetails"
import { Itinerary } from "../models/Itinerary"
import { IBookingDTO, ICreatedBooking, IFlight, IFlightDetails, IItinerary } from "../store/storeModel"

const createdBookingToICreatedBooking = (booking: CreatedBooking): ICreatedBooking => {
  return {
    ...booking,
    booking: bookingDtoToIBookingDto(booking.booking)
  }
}

const bookingDtoToIBookingDto = (bookingDto: BookingDTO): IBookingDTO => {
  return {
    ...bookingDto,
    flightTo: flightDetailsToIFlightDetails(bookingDto.flightTo),
    flightFrom: !bookingDto.flightFrom ? bookingDto.flightFrom : flightDetailsToIFlightDetails(bookingDto.flightFrom),
  }
}

const flightDetailsToIFlightDetails = (flightDetails: FlightDetails): IFlightDetails => {
  return {
    ...flightDetails,
    depatureAt: new Date(flightDetails.depatureAt).toJSON(),
    arriveAt: new Date(flightDetails.arriveAt).toJSON()
  }
}

const flightToIFlight = (flight: Flight): IFlight => {
    return { 
      ...flight,
      itineraries: flight.itineraries.map(itinerary => itineraryToIItinerary(itinerary))
    }
}

const itineraryToIItinerary = (itinerary: Itinerary): IItinerary => {
  return {
    ...itinerary,
    depatureAt: new Date(itinerary.depatureAt).toJSON(),
    arriveAt: new Date(itinerary.arriveAt).toJSON(),
    prices: itinerary.prices.map(price => {
      return {...price}
    })
  }
}

export { flightToIFlight, itineraryToIItinerary, createdBookingToICreatedBooking };