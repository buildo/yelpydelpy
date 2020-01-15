/*

This components reuses two other "basic" components that we defined in our
app's `components` folder: View and Dropdown.

It also reads and updates the `CurrentView` data state we defined,
using the dedicated query, command, helpers and types defined respecitvely in
`queries`, `commands` and `model`.

*/

import * as React from 'react';
import View from '../View';
import Dropdown from '../Dropdown';
import { declareQueries } from 'avenger/lib/react';
import { currentView } from '../../queries';
import { doUpdateCurrentView } from '../../commands';
import { CurrentView } from '../../model';
import { constNull } from 'fp-ts/lib/function';

const queries = declareQueries({ currentView });

type Props = typeof queries.Props;

type OptionType = { value: CurrentView; label: string };

const options: Array<OptionType> = [
  {
    value: 'home',
    label: 'Home'
  },
  {
    value: 'hello',
    label: 'Hello'
  }
];

class SwitchViewDropdown extends React.Component<Props> {
  onChange = (value: OptionType) => {
    doUpdateCurrentView(value.value).run();
  };

  render() {
    const currentView = this.props.queries.fold(constNull, constNull, q => q.currentView);
    const value = options.find(o => o.value === currentView) || options[0];
    const props = { type: 'single', options, value, onChange: this.onChange };
    return (
      <View className="switch-view-dropdown">
        <Dropdown {...(props as any)} />
      </View>
    );
  }
}

export default queries(SwitchViewDropdown);
