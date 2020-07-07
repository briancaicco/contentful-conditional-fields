import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EmptyState } from '@contentful/forma-36-react-components';

const DefaultSorry = ({ error }) => (
  <EmptyState
    headingProps={{ text: 'Sorry, an error has occurred' }}
    descriptionProps={{
      text: error
    }}
  />
);

DefaultSorry.propTypes = {
  error: PropTypes.string
};

class Sorry extends Component {
  static propTypes = {
    fallback: PropTypes.func,
    children: PropTypes.node,
    notifier: PropTypes.shape({ error: PropTypes.func })
  };

  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error: JSON.stringify(error) };
  }

  componentDidCatch() {
    this.props.notifier.error(`Error: ${this.state.error}`);
  }

  render() {
    const { fallback, children } = this.props;
    const { error } = this.state;

    if (error) {
      return fallback ? fallback() : <DefaultSorry error={error} />;
    }

    return children;
  }
}

export { Sorry };
