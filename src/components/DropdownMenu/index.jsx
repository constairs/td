// @flow

import React, { useState } from 'react';
import styled from 'styled-components';

const DropdownOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const DropdownMenu = ({
  opened,
  content,
  children,
  onClose
} : {
  opened: boolean,
  content: Object,
  children: Object,
  onClose: () => void
}) => {
  const [openedState, useOpened] = useState(false);
  const [topState, useTop] = useState(0);
  const [leftState, useLeft] = useState(0);

  const isOutOfLimit = leftState + 200 > window.innerWidth;

  const open = (e: MouseEvent) => {
    if (e.currentTarget && e.currentTarget instanceof Element) {
      const { left, top, height } = (e.currentTarget).getBoundingClientRect();
      useOpened(true);
      useTop(top + height + 8);
      useLeft(left);
    }
  };

  return (
    <React.Fragment>
      {
        opened && (
          <DropdownOverlay
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
          >
            <div
              className="dropdown-content"
              style={{
                topState,
                left: isOutOfLimit ? 'auto' : leftState,
                right: isOutOfLimit ? 8 : 'auto'
              }}
            >
              { content && content }
            </div>
          </DropdownOverlay>

        )
      }
      { children && children(open, openedState) }
    </React.Fragment>
  );
};
