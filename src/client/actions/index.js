import axios from 'axios';

export const FETCH_FLIGHTS = 'fetch_flights';

export const fetchFlights = () => async dispatch => {
  let url = "https://api.spacexdata.com/v3/launches?limit=40";

  const res = await axios.get(url);

  dispatch({
    type: FETCH_FLIGHTS,
    payload: res.data
  });
};
