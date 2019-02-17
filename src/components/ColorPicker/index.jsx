// @flow

import React from 'react';
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
} : {
  value: string,
  colors: string[],
  onSwitch: (color: string) => any
}) => (
  <ul className="color-picker">
    {
      colors && colors.map(color => (
        <li key={color}>
          <PickerItem
            active={color === value}
            color={color}
            onClick={() => { onSwitch(color); }}
          />
        </li>
      ))
    }
  </ul>
);
