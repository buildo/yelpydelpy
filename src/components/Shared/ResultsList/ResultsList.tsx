import * as React from 'react';
import View from '../../Basic/View';
import { declareQueries } from 'avenger/lib/react';
import { restaurants } from '../../../queries';
import RestaurantPreview from '../RestaurantPreview/RestaurantPreview';

const queries = declareQueries({ restaurants });

type Props = typeof queries.Props;

class ResultsList extends React.Component<Props, {}> {
  render() {
    return this.props.queries.fold(
      () => <>loading</>,
      () => <>error</>,
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
