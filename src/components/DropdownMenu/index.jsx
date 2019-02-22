import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 998;
`;

const DropdownStyled = styled.div`
  padding: 16px;
  position: fixed;
  min-width: 10px;
  top: 80px;
  left: 0;
  z-index: 2000;
  border: 1px solid #D8D8D8;
  background-color: #fff;
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

export class DropdownMenu extends React.Component {
  static defaultProps = {
    opened: false,
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
        top
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
            <DropdownStyled
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
            </DropdownStyled>
          </Overlay>
        )}
        {children && children({ open, opened })}
      </React.Fragment>
    );
  };
}

DropdownMenu.propTypes = {
  opened: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  content: PropTypes.node,
  style: PropTypes.objectOf(PropTypes.any)
};
