// @flow

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faTrash, faPen, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

import { DropdownMenu } from '../index';

type Props = {
  title?: string,
  text?: string,
  color?: string,
  disabled?: boolean,
  onDeleteItem: () => any,
  onEditItem: () => any,
  disableItem: () => any,
  enableItem: () => any
};

type State = {
  optionsDropdown: boolean
};

export class CardItem extends React.Component<Props, State> {
  static defaultProps = {
    title: '',
    text: '',
    color: '#ffffff',
    disabled: false
  };

  state = {
    optionsDropdown: false
  };

  render() {
    const {
      props: {
        title,
        text,
        color,
        disabled,
        onDeleteItem,
        onEditItem,
        disableItem,
        enableItem
      },
      state: {
        optionsDropdown
      }
    } = this;
    return (
      <div className={`card ${
        // $FlowFixMe
        color.slice(1) || 'default'
      }`}
      >

        <DropdownMenu
          opened={optionsDropdown}
          content={
            <React.Fragment>
              <button className="btn" onClick={onEditItem}>
                <FontAwesomeIcon icon={faPen} /> Edit
              </button>
              <button className="btn" onClick={disabled ? enableItem : disableItem}>
                <FontAwesomeIcon icon={disabled ? faCheck : faTimes} /> {disabled ? 'Enable' : 'Disable'}
              </button>
              <button className="btn" onClick={onDeleteItem}>
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </React.Fragment>
          }
        >
          {({ open }) => (
            // eslint-disable-next-line
            <a
              onClick={() => { open(); this.setState({ optionsDropdown: true }); }}
              style={{
                top: 24,
                right: 24,
                cursor: 'pointer',
                color: '#aaa',
                fontSize: 20,
              }}
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </a>
          )}
        </DropdownMenu>

        <DropdownMenu
          style={{ width: 200 }}
          content={({ close }) => (
            <div style={{ fontSize: 14, margin: -8 }}>
              <DropdownMenu.MenuItem onClick={() => { onEditItem(); close(); }}>
                <FontAwesomeIcon icon={faPen} /> Edit
              </DropdownMenu.MenuItem>
              <DropdownMenu.MenuItem onClick={() => {
                if (disabled) {
                  enableItem();
                } else {
                  disableItem();
                }
                close();
              }}
              >
                <FontAwesomeIcon icon={disabled ? faCheck : faTimes} /> {disabled ? 'Enable' : 'Disable'}
              </DropdownMenu.MenuItem>
              <DropdownMenu.MenuItem onClick={() => {
                onDeleteItem(); close();
              }}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </DropdownMenu.MenuItem>
            </div>
          )}
        >
          {({ open }) => (
            <button
              id="popoverBtnTitle"
              onClick={(e) => { open(e); }}
              style={{
                top: 24,
                right: 24,
                cursor: 'pointer',
                color: '#aaa',
                fontSize: 20,
              }}
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
          )}
        </DropdownMenu>

        <h3 className="card_title">
          {title}
        </h3>
        <p className="card_text">
          {text}
        </p>
      </div>
    );
  }
}
