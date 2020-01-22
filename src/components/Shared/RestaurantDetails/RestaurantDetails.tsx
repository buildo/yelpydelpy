import * as React from 'react';
import View from '../../Basic/View';

import RestaurantPreview from '../RestaurantPreview/RestaurantPreview';
import { BusinessDetails, Open } from 'src/model/YelpResponse';

import './restaurantDetails.scss';

const phoneIcon = require('./../../../images/phone.png');

type Props = {
  restaurant: BusinessDetails;
};

export default class RestaurantDetails extends React.Component<Props, {}> {
  render() {
    const rest = this.props.restaurant;
    const lat = rest.coordinates.latitude;
    const long = rest.coordinates.longitude;
    const photos = rest.photos.length > 3 ? rest.photos.slice(0, 3) : rest.photos;

    // TODO: remove
    console.log('hours', this.props.restaurant.hours[0]);
    console.log('open', this.props.restaurant.hours[0].open);

    const openTimes = stringifyOpenHours(rest.hours[0].open);

    return (
      <View column grow className="restaurant-details">
        <View className="header">
          <RestaurantPreview restaurant={rest} />
        </View>

        <View className="info-box" style={{ marginTop: '10px' }}>
          <View column className="hour" style={{ width: '40%' }}>
            <View className="title">Hours</View>
            {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((dayName, i) => (
              <View key={dayName} style={{ width: '100%' }}>
                <View style={{ width: '50px' }} className="day-name">
                  {dayName}
                </View>
                <View grow className="opening-time">
                  {openTimes[i]}
                </View>
              </View>
            ))}
          </View>

          <View column className="map" style={{ width: '60%' }}>
            <iframe
              width="100%"
              height="100%"
              src={`${googleMapsAPIEndpoint}?key=${googleMapsAPIKey}&center=${lat},${long}&zoom=18`}
            />
          </View>
        </View>

        <View style={{ margin: '10px 0px' }} vAlignContent="center" className="info">
          <View>
            <img src={phoneIcon} style={{ height: '15px', width: '15px', marginRight: '10px' }} />
          </View>
          <View className="phone-number">{rest.display_phone}</View>
        </View>

        <View className="photos">
          {photos.map(url => (
            <img
              key={url}
              style={{ height: '120px', width: '180px', margin: '5px 5px' }}
              src={url}
            />
          ))}
        </View>
      </View>
    );
  }
}

const googleMapsAPIKey = ''; // TODO: need ap key
const googleMapsAPIEndpoint = 'https://www.google.com/maps/embed/v1/place';

function stringifyOpenHours(opens: Open[]): string[] {
  console.log('stringifyOpenHours', opens);

  let days = Array<string>(7).fill('');

  if (!opens) return days;

  // group up turns
  opens.forEach(open => {
    //TODO: security check
    const start = `${open.start.substring(0, 2)}:${open.start.substring(2, 4)}`;
    const end = `${open.end.substring(0, 2)}:${open.end.substring(2, 4)}`;
    const out = start + '-' + end + '     ';
    days[open.day] = days[open.day].concat(out);
  });
  return days;
}
