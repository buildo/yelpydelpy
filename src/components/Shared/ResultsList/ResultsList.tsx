import * as React from 'react';
import View from '../../Basic/View';
import { declareQueries } from 'avenger/lib/react';
import { restaurants } from '../../../queries';
import RestaurantPreview from '../RestaurantPreview/RestaurantPreview';
import Spinner from '../Spinner/Spinner';
import Modal from '../../Basic/Modal/Modal';

const errorIcon = require('./../../../images/error.png');

// TODO: remove mock
import mockDetails from '../../../mock/yelpRestaurantDetail.json';
import RestaurantDetails from '../RestaurantDetails/RestaurantDetails';
import { BusinessDetails } from 'src/model/YelpResponse';

const queries = declareQueries({ restaurants });

type Props = typeof queries.Props;

class ResultsList extends React.Component<Props, { isModalOpen: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { isModalOpen: false };
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
                  this.open();
                }}
              >
                <RestaurantPreview restaurant={rest} />
              </View>
            );
          })}
          {this.state.isModalOpen && this.getModal()}
        </View>
      )
    );
  }

  getModal() {
    return (
      <Modal
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        onDismiss={() => this.close()}
      >
        <RestaurantDetails restaurant={(mockDetails as unknown) as BusinessDetails} />
      </Modal>
    );
  }

  open() {
    this.setState({ isModalOpen: true });
  }

  close() {
    this.setState({ isModalOpen: false });
  }
}
export default queries(ResultsList);
