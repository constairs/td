// @flow

import React from 'react';

import { FontAwesome } from '@fortawesome/react-fontawesome';
import { faDotCircle, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

import { DropdownMenu } from '../index';

type Props = {
  title?: string,
  text?: string,
  onDeleteItem: () => any,
  onEditItem: () => any
};

type State = {
  optionsDropdown: boolean
};

export class CardItem extends React.Component<Props, State> {
  static defaultProps = {
    title: '',
    text: ''
  };

  state = {
    optionsDropdown: false
  };

  render() {
    const {
      props: {
        title,
        text,
        onDeleteItem,
        onEditItem
      },
      state: {
        optionsDropdown
      }
    } = this;
    return (
      <div className="card">
        <button onClick={() => { this.setState({ optionsDropdown: true }); }}>
          <FontAwesome icon={faDotCircle} />
        </button>

        <DropdownMenu opened={optionsDropdown}>
          <React.Fragment>
            <button onClick={onEditItem}>
              <FontAwesome icon={faPen} /> Edit
            </button>
            <button onClick={onDeleteItem}>
              <FontAwesome icon={faTrash} /> Delete
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
