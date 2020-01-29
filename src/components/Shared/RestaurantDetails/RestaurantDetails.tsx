import * as React from 'react';
import View from '../../Basic/View';

import RestaurantPreview from '../RestaurantPreview/RestaurantPreview';
import { Open } from 'src/model/YelpResponse';

import './restaurantDetails.scss';
import { declareQueries } from 'avenger/lib/react';
import { restaurantDetails } from '../../../queries';
import LoadingSpinner from '../../Basic/LoadingSpinner/LoadingSpinner';
import { FormattedMessage } from 'react-intl';

const errorIcon = require('./../../../images/error.png');
const phoneIcon = require('./../../../images/phone.png');

const queries = declareQueries({ restaurantDetails });

type Props = typeof queries.Props;

class RestaurantDetails extends React.Component<Props, {}> {
  render() {
    return this.props.queries.fold(
      () => (
        <View
          className="spinner-wrapper"
          style={{ height: '200px', width: '200px', position: 'relative' }}
          hAlignContent="center"
          vAlignContent="center"
        >
          <LoadingSpinner size={45} overlayColor="transparent" />
        </View>
      ),
      error => {
        console.log('error on query restaurantDetails', error);
        return (
          <View
            className="error-wrapper"
            style={{ height: '100%', width: '100%' }}
            hAlignContent="center"
            vAlignContent="center"
          >
            <img style={{ height: '50px', width: '50px' }} src={errorIcon} />
          </View>
        );
      },
      ({ restaurantDetails }) => {
        const rest = restaurantDetails;
        const lat = rest.coordinates.latitude;
        const long = rest.coordinates.longitude;
        const photos = rest.photos.length > 3 ? rest.photos.slice(0, 3) : rest.photos;

        const openTimes = rest.hours ? stringifyOpenHours(rest.hours[0].open) : undefined;
        return (
          <View column shrink={false} className="restaurant-details">
            <View className="header">
              <RestaurantPreview restaurant={rest} />
            </View>

            <View className="info-box" shrink={false} style={{ marginTop: '10px' }}>
              <View column className="hour" style={{ width: '45%' }}>
                <View className="title">
                  <FormattedMessage id="RestaurantDetails.hours" />
                </View>
                {openTimes &&
                  ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((dayName, i) => (
                    <View key={dayName} style={{ width: '100%' }}>
                      <View style={{ width: '50px' }} className="day-name">
                        <FormattedMessage id={`RestaurantDetails.${dayName}`} />
                      </View>
                      <View grow className="opening-time">
                        {openTimes[i] !== '' ? (
                          openTimes[i]
                        ) : (
                          <FormattedMessage id="RestaurantDetails.closed" />
                        )}
                      </View>
                    </View>
                  ))}
                {!openTimes && (
                  <View vAlignContent="center" hAlignContent="center" grow>
                    <FormattedMessage id="RestaurantDetails.noData" />
                  </View>
                )}
              </View>

              <View column className="map" style={{ width: '55%' }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`${googleMapsAPIEndpoint}?key=${googleMapsAPIKey}&q=${lat},${long}&zoom=18`}
                />
              </View>
            </View>

            <View
              shrink={false}
              style={{ margin: '10px 0px' }}
              vAlignContent="center"
              className="info"
            >
              <View>
                {rest.display_phone && rest.display_phone !== '' && (
                  <img
                    src={phoneIcon}
                    style={{ height: '15px', width: '15px', marginRight: '10px' }}
                  />
                )}
              </View>
              <View className="phone-number">{rest.display_phone}</View>
            </View>

            <View shrink={false} hAlignContent="center" className="photos">
              {photos.map(url => (
                <img
                  key={url}
                  style={{ height: '120px', maxWidth: '180px', margin: '5px 5px' }}
                  src={url}
                />
              ))}
            </View>
          </View>
        );
      }
    );
  }
}
export default queries(RestaurantDetails);

const googleMapsAPIKey = 'AIzaSyDDUbzwLfSKpbo6GI_oi90IOi8DhRzkzQo';
const googleMapsAPIEndpoint = 'https://www.google.com/maps/embed/v1/place';

function stringifyOpenHours(opens: Open[]): string[] {
  let days = Array<string>(7).fill('');

  // group up turns
  opens.forEach(open => {
    if (open.start.length !== 4 || open.end.length !== 4) return;

    const start = `${open.start.substring(0, 2)}:${open.start.substring(2, 4)}`;
    const end = `${open.end.substring(0, 2)}:${open.end.substring(2, 4)}`;
    const out = start + '-' + end + '     ';

    days[open.day] = days[open.day].concat(out);
  });

  return days.map(openTimeDescription => {
    return openTimeDescription.trim();
  });
}
