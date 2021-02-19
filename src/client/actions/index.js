import axios from 'axios';
import config from '../../../config';

export const FETCH_FLIGHTS = 'fetch_flights';

export const fetchFlights = () => async dispatch => {
  let url = `https://api.spacexdata.com/v3/launches?limit=40&launch_year=${config.launch_year}`;

  const res = await axios.get(url);

  dispatch({
    type: FETCH_FLIGHTS,
    payload: res.data
  });
};
