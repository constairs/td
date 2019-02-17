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
      <div className={`card ${color.slice(1) || 'default'}`}>
        <button onClick={() => { this.setState({ optionsDropdown: true }); }}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>

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
              onClick={open}
              style={{
                top: 24,
                right: 24,
                cursor: 'pointer',
                color: '#aaa',
                fontSize: 20,
              }}
            >
              <FontAwesomeIcon icon={faDotCircle} />
            </a>
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
