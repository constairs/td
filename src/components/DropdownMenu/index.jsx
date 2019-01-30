import React from 'react';
import { PropTypes } from 'prop-types';

export const DropdownMenu = ({ opened, children: Component }) => (
  <React.Fragment>
    {
      opened && (
        <div>
          { Component }
        </div>
      )
    }
  </React.Fragment>
);

DropdownMenu.propTypes = {
  children: PropTypes.ObjectOf(PropTypes.string).isRequired,
  opened: PropTypes.bool.isRequired
};
