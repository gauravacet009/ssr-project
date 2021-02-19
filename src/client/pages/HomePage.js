/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PropTypes from "prop-types"; // ES6
import { fetchFlights } from "../actions";
import customCss from '../../styles/style';
import config from '../../../config';
const HomePage = (props) => {

  const { fetchFlights: reloadFlights } = props;

  const updateUrl = (e, value) => {
    e.preventDefault();
    //console.log(value, fetchFlights);
    config.launch_year = value;
    reloadFlights();
  };
  const renderFlights = () => {
    return props.flights.map((detail, indexId) => (
      <div className="col s12 m6 l6 xl4" key={`col-${indexId}`}>
        <div className="card large" style={customCss.card_large} key={`card-${indexId}`}>
          <div className="card-image" style={customCss.card_image} key={`image-${indexId}`}>
            <LazyLoadImage
              alt={detail.mission_name}
              src={detail.links.mission_patch_small}
              style={customCss.c_img}
            />
          </div>
          <div className="card-content" key={`content-${indexId}`}>
            <span className="card-title" style={customCss.card_title} key={`m_name-${indexId}`}>
              <b key={`m_name_flight-${indexId}`}>                
                {detail.mission_name}# {detail.flight_number}
              </b>
            </span>
            <span className="card-title" style={customCss.card_title} key={`m_id-${indexId}`}>              
              <b> Mission Id: </b>
              {detail.mission_id.length > 0
                ? detail.mission_id.map(
                    (id, index) => `${(index ? ", " : "") + id}`
                  )
                : "NA"}
            </span>
            <span className="card-title" style={customCss.card_title} key={`year-${indexId}`}>              
              <b> Launch Year: </b>
              {detail.launch_year}
            </span>
            <span className="card-title" style={customCss.card_title} key={`launch-${indexId}`}>              
              <b> Successful Launch: </b>
              {detail.launch_success ? 'True' : 'False'}
            </span>
          </div>
        </div>
      </div>
    ));
  };

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title> Flight Schedule </title>
        <meta property="og:title" content="Flight Schedule" />
        <meta name="description" content="Flight schedules and landings" />
      </Helmet>
    );
  };

  const { fetchFlights: loadFlights } = props;
  //if (typeof window !== undefined) {
    useEffect(() => {
      window.scrollTo(0, 0);
      loadFlights();
    }, [loadFlights]);
  //}
  return (
    <div>
      
      {head()}
      <div className="row">
        <div className="section">
          <div className="row">
          <div className="row">
            {customCss.filter_details.map((f_year, index) => 
                <button onClick={(e) => updateUrl(e, f_year)} className="btn waves-effect waves-light btn-small" key={f_year+index} style={customCss.filter}> {f_year} </button>
            )}
            </div>
            <div className="row">              
              {renderFlights()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    flights: state.flights,
  };
};

const loadData = (store) => {
  // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
  // So we need to use store itself to load data
  return store.dispatch(fetchFlights()); // Manually dispatch a network request
};

HomePage.propTypes = {
  flights: PropTypes.arrayOf(PropTypes.any),
  fetchFlights: PropTypes.func,
};

HomePage.defaultProps = {
  flights: [],
  fetchFlights: null,
};

export default {
  component: connect(mapStateToProps, { fetchFlights })(HomePage),
  loadData,
};
