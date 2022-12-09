import { Store } from '../store/storeModel';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { SearchDTO } from '../models/SearchDTO';
import { fetchCities } from '../slices/citySlice';
import { searchFlights } from '../slices/flightSlice';
import { resetState, setNumberOfAdults, setNumberOfChildren, setOneWay }  from '../slices/currentBookingSlice';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export default function SearchBar() {

  const dispatch = useDispatch<any>();
  const cities = useSelector((store: Store) => store.cities.cities).map((city, index) => { 
    return { 
      id: index, 
      name: city
    };
  });

  useEffect(() => { dispatch(fetchCities()) }, [dispatch]);

  const [oneWay, setOneWayLocal] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const toItinerary = useSelector((store: Store) => store.bookings.toItinerary)

  const createRequest = () => {
    const request = new SearchDTO(
      from, 
      to,
      oneWay,
      departureDate,
      returnDate,
      adults,
      children
    )

    dispatch(searchFlights(request));
    dispatch(resetState());
    dispatch(setNumberOfAdults(adults));
    dispatch(setNumberOfChildren(children));
    dispatch(setOneWay(oneWay));
  };

  return (
    <div className='form'>
      <label>From</label>
      <input type="text" name="from" value={from} onChange={(event) => setFrom(event.target.value)}></input>

      <label>To</label>

      <input 
        type="text" 
        name="to" 
        value={to} 
        onChange={(event) => setTo(event.target.value)}>
      </input>

      <label>One Way</label>
      <input 
        className='checkbox' 
        type="checkbox" 
        name="oneway" 
        checked={oneWay} 
        onChange={() => setOneWayLocal(!oneWay)}></input>

      <label>Departure</label>
      <DatePicker 
        selected={departureDate} 
        onChange={(date) => {if (date != null) setDepartureDate(date)}}>  
      </DatePicker>
      {!oneWay && (<><label >Return Flight</label>
      <DatePicker selected={returnDate} onChange={(date) => {if (date != null) setReturnDate(date)}}></DatePicker></>)}

      <label>Adult Passengers</label>
      <input type="number" name="adults" value={adults} onChange={(event) => setAdults(parseInt(event.target.value))}></input>
      <label>Child Passangers</label>
      <input type="number" name="child" value={children} onChange={(event) => setChildren(parseInt(event.target.value))}></input>
      <button className="btn" type="submit" onClick={createRequest}>Search</button>
    </div>
  )
}
 