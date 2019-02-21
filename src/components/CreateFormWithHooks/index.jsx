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
      className="create-form"
      onSubmit={(e) => {
        e.preventDefault();
        onCreate({
          title,
          text,
          color,
          importancy
        });
      }}
    >
      <label htmlFor="title">
        <span className="descr">Title</span>
        <input
          id="title"
          name="title"
          value={title}
          onChange={({ target: { value } }) => { useTitle(value); }}
        />
      </label>

      <label htmlFor="text">
        <span className="descr">Text</span>
        <input
          id="text"
          name="text"
          value={text}
          onChange={({ target: { value } }) => { useText(value); }}
        />
      </label>

      <label htmlFor="colorPicker">
        <span className="descr">Color</span>
        <ColorPicker
          id="colorPicker"
          value={color}
          colors={['#cc0000', '#f0f0f0', '#2b2b2b', '#6AC8C8', '#f05050']}
          onSwitch={(switchedColor) => { useColor(switchedColor); }}
        />
      </label>

      <label htmlFor="importancy">
        <Select
          name="importancy"
          id="importancy"
          options={[
            { value: 'default', label: 'Default' },
            { value: 'important', label: 'Important' },
            { value: 'veryImportant', label: 'Very important' },
          ]}
          defaultValue={importancy.value}
          value={{
            value: importancy.value,
            label: importancy.label
          }}
          onChange={(value) => {
            useImportancy(value);
          }}
        />
      </label>

      <button className="btn btn-md">
        Submit
      </button>
    </form>
  );
};
