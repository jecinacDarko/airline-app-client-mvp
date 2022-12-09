import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BookingDTO } from "../models/BookDTO";
import { Flight } from "../models/Flight";
import { Itinerary } from "../models/Itinerary";
import { PersonDetails } from "../models/PersonDetails";
import { createBooking, resetBookingState } from "../slices/bookingSlice";
import { IFlightDetails, Store } from "../store/storeModel";

export function BookingPage() {
  const dispatch = useDispatch<any>();

  const toItinerary = useSelector((store: Store) => new Itinerary(store.bookings.toItinerary));
  const fromItinerary = useSelector((store: Store) => new Itinerary(store.bookings.fromItinerary));
  const oneWay = useSelector((store: Store) => store.bookings.oneWay);

  const numberOfAdults = useSelector((store: Store) => store.bookings.numberOfAdults);
  const initialAdults: PersonDetails[] = [];
  for (let i = 0; i < numberOfAdults; i ++) {
    initialAdults.push(new PersonDetails('', '', 0));
  }
  const [adults, setAdults] = useState<PersonDetails[]>(initialAdults);

  const numberOfChildren = useSelector((store: Store) => store.bookings.numberOfChildren);
  const initialChildren: PersonDetails[] = [];
  for (let i = 0; i < numberOfChildren; i ++) {
    initialChildren.push(new PersonDetails('', '', 0));
  } 

  const [showBooking, setShowBooking] = useState<boolean>(false);

  const [children, setChildren] = useState<PersonDetails[]>(initialChildren);
  
  const toFlight = useSelector((store: Store) => store.flights.directFlights.map(flight => new Flight(flight)).find(flight => flight.flight_id === toItinerary?.flightId)) as Flight;

  const fromFlight = useSelector((store: Store) => store.flights.returnFlights.map(flight => new Flight(flight)).find(flight => flight.flight_id === fromItinerary?.flightId)) as Flight;

  const bookingResult = useSelector((store: Store) => store.createdBookings.booking);
  
  useEffect(() => {
    dispatch(resetBookingState())
  }, [dispatch, bookingResult]);

  const makeBooking = () => {
    let bookingDto;

    if (!toItinerary) {
      return;
    }

    if (oneWay) {
      bookingDto = new BookingDTO({
        flightTo: flightDetailsFromItinerary(toItinerary),
        childPassengers: children,
        adultPassengers: adults});
    } else {
      if (!fromItinerary) {
        return;
      }

      bookingDto = new BookingDTO({
        flightTo: flightDetailsFromItinerary(toItinerary),
        childPassengers: children,
        adultPassengers: adults,
        flightFrom: flightDetailsFromItinerary(fromItinerary)
      });
    }

    setShowBooking(true);

    dispatch(createBooking(bookingDto));
  }

  const flightDetailsFromItinerary = (itinerary: Itinerary): IFlightDetails => {
    return {
      flight_id: itinerary.flightId, 
      depatureAt: new Date(itinerary.depatureAt).toJSON(), 
      arriveAt: new Date(itinerary.arriveAt).toJSON()
    }
  }

  return (
    <div className ='bookingPage'>
      <h2>Finalize your booking for the following flights: </h2>
      <p>{toFlight.depatureDestination} to {toFlight.arrivalDestination}</p>
      {!oneWay && <p>{fromFlight.depatureDestination} to {fromFlight.arrivalDestination}</p>}
      {adults.map((adult: PersonDetails, index) => {
        return (
          <div className='addInfo' key={index}>
            <label>Name:</label>
            <input type="text" value={adult.firstName} onChange={(event) => {
              setAdults(
                adults.map((adult, index_) => {
                  return index_ === index ? {
                    ...adult, 
                    firstName: event.target.value
                  } : adult
              }))
            }}></input>
            <label>Last name:</label>
            <input type="text" value={adult.lastName} onChange={(event) => {
              setAdults(
                adults.map((adult, index_) => {
                  return index_ === index ? {
                    ...adult, 
                    lastName: event.target.value
                  } : adult
              }))
            }}></input>
             <label>Age:</label>
            <input type="number" value={adult.age} onChange={(event) => {
              setAdults(
                adults.map((adult, index_) => {
                  return index_ === index ? {
                    ...adult, 
                    age: parseInt(event.target.value)
                  } : adult
              }))
            }}></input>
          </div>
        )
      })}
       {children.map((child: PersonDetails, index) => {
        return (
          <div key={index}>
            <input type="text" value={child.firstName} onChange={(event) => {
              setChildren(
                children.map((adult, index_) => {
                  return index_ === index ? {
                    ...adult, 
                    firstName: event.target.value
                  } : adult
              }))
            }}></input>
            <input type="text" value={child.lastName} onChange={(event) => {
              setChildren(
                children.map((adult, index_) => {
                  return index_ === index ? {
                    ...adult, 
                    lastName: event.target.value
                  } : adult
              }))
            }}></input>
            <input type="number" value={child.age} onChange={(event) => {
              setChildren(
                children.map((adult, index_) => {
                  return index_ === index ? {
                    ...adult, 
                    age: parseInt(event.target.value)
                  } : adult
              }))
            }}></input>
          </div>
        )
      })}
      {showBooking && bookingResult.bookingId && <p>Congratulations, you have booked flight from {fromFlight.depatureDestination} to {fromFlight.arrivalDestination}.
      flight ID: {bookingResult.bookingId}</p>}
      {!showBooking && !bookingResult.bookingId && <button className='btnBook' onClick={makeBooking}>Book now!</button>}
    </div>
  );
}