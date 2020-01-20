import * as React from 'react';
import { Business } from 'src/model/YelpSearchResponse';
import View from './../../Basic/View'; // CLARIFY: why absolute path doesn't work?

import './restaurantPreview.scss';

const star = require('./../../../images/star.png');

type Props = {
  restaurant: Business;
};

export default class RestaurantPreview extends React.Component<Props, {}> {
  render() {
    const rest = this.props.restaurant;

    //TODO: remove tracking border
    return (
      <View className="restaurant-preview" grow>
        <View
          className="image-frame"
          hAlignContent="center"
          vAlignContent="center"
          style={{ width: '120px', height: '120px', border: '1px red solid' }}
        >
          <img style={{ width: '90%', height: '90%' }} src={rest.image_url} alt="image" />
        </View>
        <View
          className="info-frame"
          grow
          column
          style={{ height: '120px', border: '1px red solid' }}
        >
          <h1>{rest.name}</h1>
          <h2>{`${rest.location.address1}, ${rest.location.city}`}</h2>
          <View className="categories-list" style={{ margin: '3px 8px' }}>
            {rest.categories.map(cat => {
              return (
                <View style={{ marginRight: '5px', padding: '2px 4px' }} className="category-tag">
                  {cat.title}
                </View>
              );
            })}
          </View>
          <View className="rating" style={{ margin: '3px 8px' }}>
            {[...Array(Math.trunc(rest.rating))].map(() => {
              return <img src={star} />;
            })}
          </View>
        </View>
        <View className="add-info-frame" column>
          <div className="open-signal">{rest.is_closed ? 'closed' : 'open'}</div>
          <h3>
            {Math.trunc(rest.distance) > 999
              ? Math.round(rest.distance * 10) / 10 + 'km'
              : Math.trunc(rest.distance) + 'm'}
          </h3>
        </View>
      </View>
    );
  }
}
