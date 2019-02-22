import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faTrash, faPen, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

import { DropdownMenu } from '../index';

export const CardItem = ({
  title,
  text,
  color,
  disabled,
  onDeleteItem,
  onEditItem,
  disableItem,
  enableItem
}) => (
  <div
    className={`card ${
      color.slice(1) || 'default'
    }`}
  >
    <DropdownMenu
      style={{ width: 200 }}
      content={({ close }) => (
        <div style={{ fontSize: 14, margin: -8 }}>
          <DropdownMenu.MenuItem onClick={() => { onEditItem(); close(); }}>
            <FontAwesomeIcon icon={faPen} /> Edit
          </DropdownMenu.MenuItem>
          <DropdownMenu.MenuItem
            onClick={() => {
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
          <DropdownMenu.MenuItem
            onClick={() => {
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

CardItem.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  disableItem: PropTypes.func.isRequired,
  enableItem: PropTypes.func.isRequired
};

CardItem.defaultProps = {
  title: '',
  text: '',
  color: '#ffffff',
  disabled: false
};
