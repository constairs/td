// @flow

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle, faTrash, faPen, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

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
      <div className="card" style={{ backgroundColor: color }}>
        <button onClick={() => { this.setState({ optionsDropdown: true }); }}>
          <FontAwesomeIcon icon={faDotCircle} />
        </button>

        <DropdownMenu opened={optionsDropdown}>
          <React.Fragment>
            <button onClick={onEditItem}>
              <FontAwesomeIcon icon={faPen} /> Edit
            </button>
            <button onClick={disabled ? enableItem : disableItem}>
              <FontAwesomeIcon icon={disabled ? faCheck : faTimes} /> {disabled ? 'Enable' : 'Disable'}
            </button>
            <button onClick={onDeleteItem}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </React.Fragment>
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
