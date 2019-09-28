/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Heart from './Heart';
import RatingStars from './RatingStars';
import * as sc from '../styles/placeStyles';
import { useCurrentPlaceContext } from '../context/CurrentPlaceContext';

const Place = (props) => {
  const {
    place, first, last,
  } = props;

  const [, setCurrentPlace] = useCurrentPlaceContext();

  let percent = '100%';
  let color;
  if (place) {
    percent = (`${(place.averageReview / 5) * 100}%`);
    color = place.plusVerified ? 'rgb(145, 70, 105)' : undefined;
  }

  const propertyRender = [];
  if (place.plusVerified) {
    propertyRender.push(
      <sc.PlusVerified color={color} key={place.plusVerified}>PLUS</sc.PlusVerified>,
    );
    propertyRender.push(<span key={place._id}>Verified</span>);
  } else {
    propertyRender.push(<span key={place._id}>{place.propertyType}</span>);
  }

  const favorited = !!place.savedList.length;
  const heartStyle = {
    fill: favorited ? 'rgb(255, 90, 95)' : 'rgb(72, 72, 72)',
    fillOpacity: favorited ? '1' : '0.5',
    stroke: '#fff',
    size: '28px',
  };

  return (
    <sc.PlaceDiv first={first} last={last}>
      <sc.HeartWrapper onClick={() => setCurrentPlace(place)}>
        <Heart heartStyle={heartStyle} />
      </sc.HeartWrapper>
      <sc.Image src={place.url} alt="" />
      <sc.Property color={color}>
        {propertyRender}
        <span> · </span>
        {place.city}
      </sc.Property>
      <sc.Title>{place.title}</sc.Title>
      <sc.Price>{`$${place.price}/night`}</sc.Price>
      <sc.Review>
        <RatingStars size="1.1em" color={color} percent={percent} />
        <span>{` ${place.totalReviews}`}</span>
      </sc.Review>
    </sc.PlaceDiv>
  );
};

Place.defaultProps = {
  place: undefined,
  first: false,
  last: false,
};

// Place.propTypes = {
//   first: PropTypes.bool,
//   last: PropTypes.bool,
//   place: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
//     plusVerified: PropTypes.bool.isRequired,
//     propertyType: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     city: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     totalReviews: PropTypes.number.isRequired,
//     averageReview: PropTypes.number.isRequired,
//     savedList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
//   }),
// };

export default Place;
