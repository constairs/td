// @flow

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export const Modal = ({
  opened,
  onCloseModal,
  children
}: {
  opened: boolean,
  onCloseModal: () => any,
  children: Object
}) => (
  <React.Fragment>
    {opened && (
      <div className="modal-overlay" onCLick={onCloseModal}>
        <div className="modal">
          <button className="x-btn" onCLick={onCloseModal}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    )}
  </React.Fragment>
);
