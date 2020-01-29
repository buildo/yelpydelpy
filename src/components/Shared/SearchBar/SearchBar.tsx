import Input from '../../Basic/Input/Input';
import Dropdown from '../../Basic/Dropdown/Dropdown';
import Button from '../../Basic/Button/Button';
import * as React from 'react';
import View from '../../Basic/View';
import './searchBar.scss';
import { SearchParams } from '../../../model/searchParams';

type Props = {
  onSearch: (query: SearchParams) => void;
  currentSearchParams: SearchParams;
};

type State = SearchParams;

export default class SearchBar extends React.Component<Props, State> {
  private onTypeLocation = (text: string) => this.setState({ location: text });
  private onChangeRange = (selectedRange: RangeOption) =>
    this.setState({ range: selectedRange.value });
  private onSearch = () => this.props.onSearch(this.state);

  constructor(props: Props) {
    super(props);
    this.state = props.currentSearchParams;
  }

  render() {
    return (
      <View grow className="search-bar">
        <View grow style={{ minWidth: '300px' }}>
          <Input
            wrapper={{ style: { width: '100%' } }}
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
            className="range-field"
            value={rangeOptions.find((option: RangeOption) => option.value === this.state.range)}
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
          <Button
            style={{ width: '100px' }}
            className="search-button"
            label="search"
            buttonState={this.state.location.trim() === '' ? 'not-allowed' : 'ready'}
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
