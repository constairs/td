// @flow

// import React, { useState } from 'react';
// import styled from 'styled-components';

// const DropdownOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
// `;

// export const DropdownMenu = ({
//   opened,
//   content,
//   children,
//   onClose
// } : {
//   opened: boolean,
//   content: Object,
//   children: Object,
//   onClose: () => void
// }) => {
//   const [openedState, useOpened] = useState(false);
//   const [topState, useTop] = useState(0);
//   const [leftState, useLeft] = useState(0);

//   const isOutOfLimit = leftState + 200 > window.innerWidth;

//   const open = (e: MouseEvent) => {
//     if (e.currentTarget && e.currentTarget instanceof Element) {
//       const { left, top, height } = (e.currentTarget).getBoundingClientRect();
//       useOpened(true);
//       useTop(top + height + 8);
//       useLeft(left);
//     }
//   };

//   return (
//     <React.Fragment>
//       {
//         opened && (
//           <DropdownOverlay
//             onClick={(e) => {
//               if (e.target === e.currentTarget) {
//                 onClose();
//               }
//             }}
//           >
//             <div
//               className="dropdown-content"
//               style={{
//                 topState,
//                 left: isOutOfLimit ? 'auto' : leftState,
//                 right: isOutOfLimit ? 8 : 'auto'
//               }}
//             >
//               { content && content }
//             </div>
//           </DropdownOverlay>

//         )
//       }
//       { children && children(open, openedState) }
//     </React.Fragment>
//   );
// };

// @flow

import * as React from 'react';
import styled from 'styled-components';


const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 998;
`;

const PopoverStyled = styled.div`
  padding: 16px;
  position: fixed;
  min-width: 10px;
  top: 80px;
  left: 0;
  z-index: 2000;
  border: 1px solid #D8D8D8;
`;

export const MenuItem = styled.a`
  padding: 8px;
  display: block;
  color: #757575;
  text-decoration: none;
  cursor: pointer;
  border-radius: 4px;
  :hover {
    background-color: #F6F6F6;
  }
`;


type Props = {
  opened?: boolean,
  // eslint-disable-next-line
  onClose: Function,
  children?: ({ open: (e: MouseEvent) => void, opened: boolean }) => React.Node,
  content?: React.Node | ({ close: () => void }) => React.Node,
  style?: Object,
};

export class DropdownMenu extends React.Component<Props, Object> {
  static defaultProps = {
    opened: false,
    onClose() {},
    children: () => {},
    content: null,
    style: {},
  };

  static MenuItem = MenuItem;

  state = {
    opened: false,
    left: 0,
    top: 0,
  };

  open = (e: MouseEvent) => {
    if (e.currentTarget && e.currentTarget instanceof Element) {
      const { left, top, height } = (e.currentTarget).getBoundingClientRect();
      this.setState({
        opened: true,
        left,
        top: top + height + 8,
      });
    }
  };

  close = () => {
    this.setState({ opened: false });
    this.props.onClose();
  };

  render = () => {
    const {
      open,
      close,
      state: {
        opened,
        left,
        top,
      },
      props: {
        children,
        content,
        ...props
      }
    } = this;

    const isOutOfLimit = left + 200 > window.innerWidth;

    return (
      <React.Fragment>
        {opened && (
          <Overlay
            onClick={(e) => {
              e.stopPropagation();
              if (e.target === e.currentTarget && close) {
                close();
              }
            }}
          >
            <PopoverStyled
              {...props}
              style={{
                top,
                left: isOutOfLimit ? 'auto' : left,
                right: isOutOfLimit ? 8 : 'auto',
                ...props.style,
              }}
            >
              {content && (
                typeof content === 'function'
                  ? content({ close })
                  : content
              )}
            </PopoverStyled>
          </Overlay>
        )}
        {children && children({ open, opened })}
      </React.Fragment>
    );
  };
}
