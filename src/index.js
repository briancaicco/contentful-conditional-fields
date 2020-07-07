/* eslint-disable no-undef */
import React from 'react';
import { render } from 'react-dom';
import { init, locations } from 'contentful-ui-extensions-sdk';
import { Sorry } from './sorry';
import { App } from './App';

init(sdk => {
  if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    render(
      <Sorry notifier={sdk.notifier}>
        <App sdk={sdk} />
      </Sorry>,
      document.getElementById('root')
    );
  }
});

if (module.hot) {
  module.hot.accept();
}
