import * as React from 'react';
import View from '../../Basic/View';
import { declareQueries } from 'avenger/lib/react';
import { restaurants } from '../../../queries';
import RestaurantPreview from '../RestaurantPreview/RestaurantPreview';
import LoadingSpinner from '../../Basic/LoadingSpinner/LoadingSpinner';
import Modal from '../../Basic/Modal/Modal';
import RestaurantDetails from '../RestaurantDetails/RestaurantDetails';

const errorIcon = require('./../../../images/error.png');

const queries = declareQueries({ restaurants });

type Props = typeof queries.Props;
type State = { openedModal: string | null };

class ResultsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { openedModal: null };
  }

  render() {
    return this.props.queries.fold(
      () => (
        <View
          className="spinner-wrapper"
          style={{ height: '100%', width: '100%', position: 'relative' }}
          hAlignContent="center"
          vAlignContent="center"
        >
          <LoadingSpinner size={45} overlayColor="transparent" />
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
        <View column className="results-list" style={{ height: '100%', width: '100%' }}>
          {restaurants
            .filter(rest => !rest.is_closed)
            .sort((a, b) => {
              const aDist = a.distance ? a.distance : 0;
              const bDist = b.distance ? b.distance : 0;
              return aDist - bDist;
            })
            .map(rest => {
              return (
                <View
                  key={rest.id}
                  style={{ minHeight: '120px', margin: '10px 0px' }}
                  onClick={() => {
                    this.open(rest.id);
                  }}
                >
                  <RestaurantPreview restaurant={rest} />
                </View>
              );
            })}

          {this.state.openedModal && this.getModal(this.state.openedModal)}
        </View>
      )
    );
  }

  getModal(id: string) {
    return (
      <Modal
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        onDismiss={() => this.close()}
      >
        <RestaurantDetails queries={{ restaurantDetails: id }} />
      </Modal>
    );
  }

  open(id: string) {
    this.setState({ openedModal: id });
  }

  close() {
    this.setState({ openedModal: null });
  }
}
export default queries(ResultsList);
