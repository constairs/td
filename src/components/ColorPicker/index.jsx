import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const PickerItem = styled.button`
  border-radius: 100%;
  width: 30px;
  height: 30px;
  background-color: ${({ color }) => color};
  border: 2px solid ${({ active }) => (active ? '#2b2b2b' : 'transparent')};
`;

export const ColorPicker = ({
  value,
  colors,
  onSwitch
}) => (
  <ul className="color-picker">
    {
      colors && colors.map(color => (
        <li key={color}>
          <PickerItem
            active={color === value}
            type="button"
            color={color}
            onClick={() => { onSwitch(color); }}
          />
        </li>
      ))
    }
  </ul>
);

ColorPicker.propTypes = {
  value: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSwitch: PropTypes.func.isRequired
};
