// @flow

import React from 'react';

export const DropdownMenu = ({
  opened,
  children
} : {
  opened: boolean,
  children: Object
}) => (
  <React.Fragment>
    {
      opened && (
        <div className="dropdown-overlay">
          <div className="dropdown-content">
            { children }
          </div>
        </div>
      )
    }
  </React.Fragment>
);
