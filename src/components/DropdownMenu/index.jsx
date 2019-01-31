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
        <div>
          { children }
        </div>
      )
    }
  </React.Fragment>
);
