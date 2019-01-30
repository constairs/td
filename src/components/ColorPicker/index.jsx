// @flow

import React from 'react';

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
        <button
          className={color === value ? 'color-picker-item active' : 'color-picker-item'}
          style={{
            backgroundColor: color
          }}
          onClick={() => { onSwitch(color); }}
        />
      </li>
    ))
  }
  </ul>
);
