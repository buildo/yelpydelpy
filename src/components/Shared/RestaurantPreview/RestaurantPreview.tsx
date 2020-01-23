import * as React from 'react';
import { Business } from 'src/model/YelpResponse';
import View from '../../Basic/View';

import './restaurantPreview.scss';

const star = require('./../../../images/star.png');

type Props = {
  restaurant: Business;
};

export default class RestaurantPreview extends React.Component<Props, {}> {
  render() {
    const rest = this.props.restaurant;

    return (
      <View className="restaurant-preview" grow>
        <View
          className="image-frame"
          hAlignContent="center"
          vAlignContent="center"
          style={{ height: '120px', width: '120px' }}
        >
          <img style={{ width: '90%', height: '90%' }} src={rest.image_url} alt="image" />
        </View>

        <View className="info-frame" grow column>
          <View className="header" style={{ height: '38px' }}>
            <View className="name" style={{ height: '100%' }} grow>
              <h1>{rest.name}</h1>
            </View>
          </View>

          <View className="address" style={{ height: '20px' }}>
            <h2>{`${rest.location.address1}, ${rest.location.city}`}</h2>
          </View>

          <View className="categories-list" style={{ height: '20px', margin: '7px 8px' }}>
            {rest.categories.map(cat => {
              return (
                <View key={cat.alias} style={{ marginRight: '5px' }} className="category-tag">
                  {cat.title}
                </View>
              );
            })}
          </View>

          <View className="footer" style={{ height: '25px' }}>
            <View className="rating" grow style={{ height: '100%', margin: '0px 8px' }}>
              {[...Array(Math.trunc(rest.rating))].map((_, index) => (
                <img key={index} src={star} />
              ))}
            </View>
            {rest.distance && (
              <View className="distance" style={{ height: '100%' }}>
                <h1>
                  {Math.trunc(rest.distance) > 999
                    ? Math.round(rest.distance * 10) / 10 + 'km'
                    : Math.trunc(rest.distance) + 'm'}
                </h1>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}
