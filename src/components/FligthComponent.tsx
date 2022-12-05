import { Flight } from "../models/Flight"
import { Itinerary } from "../models/Itinerary"
import ItineraryComponent from "./ItineraryComponent"

type Props = {flight: Flight, action: Function, itinerary: Itinerary}

export default function FligthComponent({flight, action, itinerary}: Props) {
  return (
    <div key={flight.flight_id} className='flightComponent'>
      <div className='flightTitle'>
        <p>Flight id: {flight.flight_id}</p>
        <p>From: {flight.depatureDestination}</p>
        <p>To: {flight.arrivalDestination}</p>
        <ItineraryComponent flight={flight} action={action} selectedItinerary={itinerary}/>
      </div>
    </div>
  )
}