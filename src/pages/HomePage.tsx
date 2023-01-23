import { useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FligthComponent from "../components/FligthComponent";
import SearchBar from "../components/SearchBar";
import { Flight } from "../models/Flight";
import { Itinerary } from "../models/Itinerary";
import { setFromItinerary, setToItinerary } from "../slices/currentBookingSlice";
import { Store } from "../store/storeModel";
import { isZero } from "../util/itineraryUtil";
import './style.css'
import React from "react";

export function HomePage() {

  const directFlights = useSelector((store: Store) => store.flights.directFlights.map(flight => new Flight(flight)));
  const returnFlights = useSelector((store: Store) => store.flights.returnFlights.map(flight => new Flight(flight)));

  const toItinerary = useSelector((store: Store) => new Itinerary(store.bookings.toItinerary));
  const fromItinerary = useSelector((store: Store) => new Itinerary(store.bookings.fromItinerary));
  const oneWay = useSelector((store: Store) => store.bookings.oneWay);

  const navigate = useNavigate();

  const canNavigate = (): boolean => {
    if (isZero(toItinerary)) {
      return false;
    }

    if (!oneWay) {
      if (isZero(fromItinerary)) {
        return false;
      }
    }

    return true;
  }

  const navigateToBooking = () => {
    if (!toItinerary) {
      return;
    }

    if (oneWay) {
      if (!fromItinerary) {
        return;
      }
    }

    navigate('/book');
  }
    
  return (
  <div className='homePage'>
    <h1>AirBuddy</h1>
      <div className='mapped'>
        <SearchBar />
      </div> 
        <div className='flights'>
          <div className='flightsTo'>
            {directFlights.map(flight => {
            return (<FligthComponent key={flight.flight_id} flight={flight} action={setToItinerary} itinerary={toItinerary}/>)})} 
          </div>
          <div className='flightsBack'>
            {returnFlights.map(flight => {
            return (<FligthComponent key={flight.flight_id} flight={flight} action={setFromItinerary} itinerary={fromItinerary}/>)})}
          </div> 
      </div>
      <div className='bookContainer'>
        {(directFlights.length > 0 && returnFlights.length > 0) && 
        <button className='btnBook' onClick={ () => navigateToBooking()} disabled={!canNavigate()}>Book!</button> }
      </div>
  </div>
  )
}
  