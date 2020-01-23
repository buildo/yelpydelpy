import * as React from 'react';

import './spinner.scss';

export default function Spinner() {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
}
