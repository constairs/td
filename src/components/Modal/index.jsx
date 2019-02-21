// @flow

import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ModalOverlay = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0,0,0,.67);
`;

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
        <React.Fragment>
          <ModalOverlay
            onClick={e => (e.target === e.currentTarget && onCloseModal())}
          >
            <div className="modal">
              <button className="x-btn" onClick={onCloseModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <div className="modal-content">
                { children }
              </div>
            </div>
          </ModalOverlay>
        </React.Fragment>
      )
    }
  </React.Fragment>
);
