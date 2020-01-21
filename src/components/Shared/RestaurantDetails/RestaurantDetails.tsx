import * as React from 'react';
import { Business } from 'src/model/YelpSearchResponse';
import View from '../../Basic/View';

import './restaurantPreview.scss';

const star = require('./../../../images/star.png');

type Props = {
  restaurant: Business;
};

export default class RestaurantDetails extends React.Component<Props, {}> {
  render() {
    const rest = this.props.restaurant;

    return <View className="restaurant-details" grow></View>;
  }
}
