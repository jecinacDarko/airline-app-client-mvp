import { Itinerary } from "../models/Itinerary"
import { IItinerary } from "../store/storeModel";

const zeroItinerary = (): IItinerary => {
    return {
        arriveAt: new Date(0).toJSON(), 
        depatureAt: new Date(0).toJSON(), 
        avaliableSeats: 0, 
        prices: [], 
        flightId: ''
    }
}

const isZero = (itinerary: Itinerary): boolean => {
    return itinerary.arriveAt.valueOf() === new Date(0).valueOf() 
        && itinerary.depatureAt.valueOf() === new Date(0).valueOf();
}

export { isZero, zeroItinerary }