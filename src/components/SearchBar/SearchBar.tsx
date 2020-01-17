import Input from '../Base/Input/Input';
import Dropdown from '../Base/Dropdown/Dropdown';
import StatefulButton from '../Base/StatefulButton/StatefulButton';
import * as React from 'react';
import { queryRestaurants } from './../../queries/queries';
import { YelpSearchResponse } from 'src/model/yelpResponse';
import View from '../Base/View';
import './searchBar.scss';

type Props = {
  onSearchResponse: (res: YelpSearchResponse) => void;
};

type State = {
  location: string;
  range: RangeOption;
};

export default class SearchBar extends React.Component<Props, State> {
  private onTypeLocation = (text: string) => this.setState({ location: text });
  private onChangeRange = (selectedRange: RangeOption) => this.setState({ range: selectedRange });
  private onSearch = () =>
    new Promise((resolve, reject) => {
      queryRestaurants(this.state.location, this.state.range.value)
        .then((res: YelpSearchResponse) => {
          resolve();
          this.props.onSearchResponse(res);
        })
        .catch(() => {
          console.log('ERROR'); // TODO:
          reject();
        });
    });

  constructor(props: Props) {
    super(props);
    this.state = {
      location: '',
      range: rangeOptions[1]
    };
  }

  render() {
    return (
      <View grow className="search-bar">
        <View grow style={{ minWidth: '300px' }}>
          <Input
            wrapper={{ style: { width: '100%' } }} //wtf?
            className="location-field"
            placeholder="Insert location"
            value={this.state.location}
            onChange={this.onTypeLocation}
          />
        </View>
        <View
          shrink={false}
          style={{
            marginLeft: '10px'
          }}
        >
          <Dropdown
            // wrapper={{ style: { width: '100px' } }} // wtf? this doesnt work
            // style={{ width: '100px' }} // wtf? this doesnt work
            className="range-field"
            value={this.state.range}
            onChange={this.onChangeRange}
            options={rangeOptions}
          />
        </View>
        <View
          shrink={false}
          style={{
            marginLeft: '10px'
          }}
        >
          <StatefulButton
            style={{ width: '100px' }} // wtf?
            className="search-button"
            baseState="ready"
            label="search"
            onClick={this.onSearch}
          />
        </View>
      </View>
    );
  }
}

type RangeOption = { value: number; label: string };
const rangeOptions: RangeOption[] = [
  { value: 500, label: '500 m' },
  { value: 1000, label: '1 km' },
  { value: 2000, label: '2 km' },
  { value: 3000, label: '3 km' },
  { value: 4000, label: '4 km' },
  { value: 5000, label: '5 km' },
  { value: 6000, label: '6 km' },
  { value: 7000, label: '7 km' },
  { value: 8000, label: '8 km' },
  { value: 9000, label: '9 km' },
  { value: 10000, label: '10 km' }
];
