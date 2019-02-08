import React, { useState } from 'react';

import Select from 'react-select';
import { ColorPicker } from '../index';

export const CreateFormWithHooks = ({ onCreate } : { onCreate: (formData: Object) => any }) => {
  const [title, useTitle] = useState('');
  const [text, useText] = useState('');
  const [color, useColor] = useState('');
  const [importancy, useImportancy] = useState('');

  return (
    <form
      onSubmit={() => {
        onCreate({
          title,
          text,
          color,
          importancy
        });
      }}
    >
      <label htmlFor="title">
        <input
          id="title"
          name="title"
          value={title}
          onChange={({ target: { value } }) => { useTitle(value); }}
        />
      </label>

      <label htmlFor="text">
        <input
          id="text"
          name="text"
          value={text}
          onChange={({ target: { value } }) => { useText(value); }}
        />
      </label>

      <span>Color</span>
      <ColorPicker
        value={color}
        colors={['#cc0000', '#f0f0f0', '#2b2b2b']}
        onSwitch={(switchedColor) => { useColor(switchedColor); }}
      />

      <label htmlFor="importancy">
        <Select
          name="importancy"
          id="importancy"
          options={[
            { value: 'default', label: 'Default' },
            { value: 'important', label: 'Important' },
            { value: 'veryImportant', label: 'Very important' },
          ]}
          value={{
            value: importancy,
            // $FlowFixMe
            label: `${String.toUpperCase(importancy[0])}${importancy.slice(1)}`
          }}
          onChange={({ target: { value } }) => {
            useImportancy(value);
          }}
        />
      </label>
    </form>
  );
};
