import * as React from 'react';
import View from '../../Basic/View';
import { declareQueries } from 'avenger/lib/react';
import { restaurants } from '../../../queries';
import RestaurantPreview from '../RestaurantPreview/RestaurantPreview';
import Spinner from '../Spinner/Spinner';
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
        <View column className="results-list" style={{ height: '100%', width: '100%' }}>
          {restaurants.map(rest => {
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
