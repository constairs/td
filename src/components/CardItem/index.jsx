import React from 'react';
import { PropTypes } from 'prop-types';

import { FontAwesome } from '@fortawesome/react-fontawesome';
import { faDotCircle, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

import { DropdownMenu } from '../index';

export class CardItem extends React.Component {
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

CardItem.defaultProps = {
  title: '',
  text: ''
};

CardItem.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired
};
