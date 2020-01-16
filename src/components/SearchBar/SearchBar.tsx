import Input from 'buildo-react-components/lib/Input';
import SingleDropdown from 'buildo-react-components/lib/Dropdown';
import { StatefulButton } from 'buildo-react-components/lib/Button';
import * as React from 'react';
import { queryRestaurants } from './../../queries/queries';
import './searchBar.scss';
import { YelpSearchResponse } from 'src/model/yelpResponse';

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
      <div className="search-bar">
        <Input
          className="location-field"
          placeholder="Insert location"
          value={this.state.location}
          onChange={this.onTypeLocation}
        />
        <SingleDropdown
          className="range-field"
          value={this.state.range}
          onChange={this.onChangeRange}
          placeholder="- km"
          options={rangeOptions}
        />
        <StatefulButton
          className="search-button"
          baseState="ready"
          label="search"
          onClick={this.onSearch}
        />
      </div>
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
