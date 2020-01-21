import * as React from 'react';
import View from '../../Basic/View';
import { declareQueries } from 'avenger/lib/react';
import { restaurants } from '../../../queries';
import RestaurantPreview from '../RestaurantPreview/RestaurantPreview';
import Spinner from '../Spinner/Spinner';

const errorIcon = require('./../../../images/error.png');

const queries = declareQueries({ restaurants });

type Props = typeof queries.Props;

class ResultsList extends React.Component<Props, {}> {
  render() {
    return this.props.queries.fold(
      () => (
        <View
          className="spinner-wrapper"
          style={{ height: '100%', width: '100%' }}
          hAlignContent="center"
          vAlignContent="center"
        >
          <Spinner />
        </View>
      ),
      () => (
        <View
          className="error-wrapper"
          style={{ height: '100%', width: '100%' }}
          hAlignContent="center"
          vAlignContent="center"
        >
          <img style={{ height: '50px', width: '50px' }} src={errorIcon} />
        </View>
      ),
      ({ restaurants }) => (
        <View className="results-list" grow>
          {restaurants.map(rest => {
            return <RestaurantPreview restaurant={rest} />;
          })}
        </View>
      )
    );
  }
}
export default queries(ResultsList);
