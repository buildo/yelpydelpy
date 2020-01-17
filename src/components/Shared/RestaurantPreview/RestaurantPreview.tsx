import * as React from 'react';
import { Business } from 'src/model/YelpSearchResponse';

type Props = {
  restaurant: Business;
};

export default class RestaurantPreview extends React.Component<Props, {}> {
  render() {
    const rest = this.props.restaurant;

    return (
      <div className="restaurant-preview">
        <div className="image-frame">
          <img src={rest.image_url} alt="image" />
        </div>
        <div className="info-frame">
          <h1>{rest.name}</h1>
          <div className="open-signal">{rest.is_closed ? 'closed' : 'open'}</div>
          <h2>{`${rest.location.address1}, ${rest.location.city}`}</h2>
          <div className="categories-list">{/* TODO: */}</div>
          <div className="rating"></div>
          <h3>
            {Math.trunc(rest.distance) > 999
              ? '${Math.round(rest.distance * 10) / 10}km'
              : '${Math.trunc(rest.distance)}m'}
          </h3>
        </div>
      </div>
    );
  }
}
