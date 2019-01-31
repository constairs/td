// @flow

import React from 'react';
import { FontAwesome } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export const Modal = ({
  opened,
  onCloseModal,
  children
} : {
  opened: boolean,
  onCloseModal: () => any,
  children: Object
}) => (
  <React.Fragment>
    {
      opened && (
        <div className="modal-wrapper">
          <button className="x-btn" onCLick={onCloseModal}>
            <FontAwesome icon={faTimes} />
          </button>
          <div className="modal">{ children }</div>
        </div>
      )
    }
  </React.Fragment>
);

