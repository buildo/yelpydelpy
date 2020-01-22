import * as React from 'react';
import View from '../../Basic/View';

import RestaurantPreview from '../RestaurantPreview/RestaurantPreview';
import { BusinessDetails, Open } from 'src/model/YelpResponse';

type Props = {
  restaurant: BusinessDetails;
};

export default class RestaurantDetails extends React.Component<Props, {}> {
  render() {
    const rest = this.props.restaurant;
    const lat = rest.coordinates.latitude;
    const long = rest.coordinates.longitude;
    const open = stringifyOpenHours(rest.hours.open);

    return (
      <View column grow shrink={false} className="restaurant-details">
        <View className="header">
          <RestaurantPreview restaurant={rest} />
        </View>

        <View className="info-box" style={{ marginTop: '10px' }}>
          <View column className="hour" style={{ width: '40%' }}>
            <div className="title">Hours</div>
            {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((dayName, i) => (
              <View key={dayName} style={{ width: '100%' }}>
                <View style={{ width: '50px' }} className="day-name">
                  {dayName}
                </View>
                <View grow className="opening-time">
                  {open[i]}
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
            <img key={url} style={{ height: '120px', width: '180px' }} src={url} />
          ))}
        </View>
      </View>
    );
  }
}

const googleMapsAPIKey = ''; // TODO: need ap key
const googleMapsAPIEndpoint = 'https://www.google.com/maps/embed/v1/place';

function stringifyOpenHours(opens: Open[]): string[] {
  let days = Array<string>(7).fill('');

  if (!opens) return days;

  // group up turns
  opens.forEach(open => {
    //TODO: security check
    const start = `${open.start.substring(0, 2)}:${open.start.substring(2, 2)}`;
    const end = `${open.end.substring(0, 2)}:${open.end.substring(2, 2)}`;
    const out = start + ' - ' + end + '; ';
    days[open.day].concat(out);
  });
  return days;
}
