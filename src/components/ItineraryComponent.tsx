import React, { useState } from 'react';
import { Store } from "../store/storeModel";
import { useDispatch, useSelector } from "react-redux";
import { Flight } from "../models/Flight";
import { Itinerary } from '../models/Itinerary';
import { isZero, zeroItinerary } from '../util/itineraryUtil';
import { itineraryToIItinerary } from '../util/interfaceUtil';
import './styles.css';

type Props = {flight: Flight, action: Function, selectedItinerary: Itinerary}

export default function ItineraryComponent({flight, action, selectedItinerary}: Props) {
  const numberOfAdults = useSelector((store: Store) => store.bookings.numberOfAdults);
  const numberOfChildren = useSelector((store: Store) => store.bookings.numberOfChildren);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState<number>(-1);
  
  return (
    <div className='itineraries'>
        {flight.itineraries.map((itinerary, index) => {
            return (
                <div key={index} className={!isZero(selectedItinerary) && selected === index ? 'selected-itinerary' : 'itinerary'} onClick={() => {
                    if (index === selected) {
                        setSelected(-1);
                        dispatch(action(zeroItinerary()));
                    } else {
                        setSelected(index);
                        dispatch(action(itineraryToIItinerary({
                            ...itinerary,
                            flightId: flight.flight_id
                        })));
                    }
                }}>
                    <p>Departure time: {new Date(itinerary.depatureAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}</p>

                    <p>Arrival time: {new Date(itinerary.arriveAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}</p>

                    <p>Available seats: {itinerary.avaliableSeats}</p>
                    <p>Price: {itinerary.prices[0].adult * numberOfAdults + itinerary.prices[0].child * numberOfChildren} SEK</p>
                </div>
            )
        })}
    </div>
  )
}

