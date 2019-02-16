// @flow

import React from 'react';

export const DropdownMenu = ({
  opened,
  children,
  onclose
} : {
  opened: boolean,
  children: Object,
  onclose: () => any
}) => (
  <React.Fragment>
    {
      opened && (
        <div
          className="dropdown-overlay"
          onClick={(e) => {
          e.target === e.currentTarget && onclose();
          }}
        >
          <div className="dropdown-content">
            { children }
          </div>
        </div>
      )
    }
  </React.Fragment>
);
