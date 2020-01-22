import * as React from 'react';
import View from '../../Basic/View';

import './restaurantPreview.scss';
import RestaurantPreview from '../RestaurantPreview/RestaurantPreview';
import { BusinessDetails } from 'src/model/YelpResponse';

type Props = {
  restaurant: BusinessDetails;
};

export default class RestaurantDetails extends React.Component<Props, {}> {
  render() {
    const rest = this.props.restaurant;
    const lat = rest.coordinates.latitude;
    const long = rest.coordinates.longitude;

    return (
      <View className="restaurant-details" grow>
        <View className="header">
          <RestaurantPreview restaurant={rest} />
        </View>

        <View className="hour-map">
          <View column className="hours">
            <h1>Hours</h1>
            <h2>
              <b>mon:</b>{' '}
            </h2>
            <h2>
              <b>tue:</b>{' '}
            </h2>
            <h2>
              <b>wed:</b>{' '}
            </h2>
            <h2>
              <b>thu:</b>{' '}
            </h2>
            <h2>
              <b>fri:</b>{' '}
            </h2>
            <h2>
              <b>sun:</b>{' '}
            </h2>
          </View>
          <View className="map">
            <iframe
              width="100%"
              height="100%"
              src={`${googleMapsAPIEndpoint}?key=${googleMapsAPIKey}&center=${lat},${long}&zoom=18`}
            />
          </View>
        </View>

        <View className="info">
          <h1>
            <b>phone:</b> {rest.display_phone}
          </h1>
          <h1>
            <b>price:</b> {rest.price}
          </h1>
        </View>

        <View className="photos">
          {rest.photos.map(url => (
            <img style={{ height: '120px', width: '180px' }} src={url} />
          ))}
        </View>
      </View>
    );
  }
}

const googleMapsAPIKey = 'AIzaSyBele7DDxzyCaIeiCy8NJbR7RzZV8Inlbw';
const googleMapsAPIEndpoint = 'https://www.google.com/maps/embed/v1/place';
