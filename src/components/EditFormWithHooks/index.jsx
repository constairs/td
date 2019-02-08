// @flow

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { ColorPicker } from '../index';

type Props = {
  title: string,
  text: string,
  color: string,
  importancy: string,
  onSubmit: (formData: Object) => any
};

export const EditFormWithHooks = ({
  title,
  text,
  color,
  importancy,
  onSubmit
} : Props) => {
  const [tit, useTitle] = useState(title);
  const [txt, useText] = useState(text);
  const [col, useColor] = useState(color);
  const [imp, userImportancy] = useState(importancy);

  useEffect(() => {
    console.log('is updated');
    return () => {
      console.log('is unmount');
    };
  });

  const handleSubmit = () => {
    onSubmit({
      tit, txt, col, imp
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label htmlFor="title">
        <input
          type="text"
          id="title"
          name="title"
          value={tit}
          onChange={({ target: { value } }) => { useTitle(value); }}
        />
      </label>

      <label htmlFor="surname">
        <input
          type="text"
          id="surname"
          name="surname"
          value={txt}
          onChange={({ target: { value } }) => { useText(value); }}
        />
      </label>

      <span>Color</span>
      <ColorPicker
        value={col}
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
            value: imp,
            // $FlowFixMe
            label: `${String.toUpperCase(imp[0])}${imp.slice(1)}`
          }}
          onChange={({ target: { value } }) => {
            userImportancy(value);
          }}
        />
      </label>

      <button className="btn btn-md">
        Submit
      </button>
    </form>
  );
};
