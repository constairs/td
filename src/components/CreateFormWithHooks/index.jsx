import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { ColorPicker } from '../index';

export function CreateFormWithHooks({
  title,
  text,
  color,
  importancy,
  onSubmit
}) {
  const [tit, useTitle] = useState(title);
  const [txt, useText] = useState(text);
  const [clr, useColor] = useState(color);
  const [imp, useImportancy] = useState(importancy);

  return (
    <form
      className="create-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
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
          value={tit}
          onChange={({ target: { value } }) => { useTitle(value); }}
        />
      </label>

      <label htmlFor="text">
        <span className="descr">Text</span>
        <input
          id="text"
          name="text"
          value={txt}
          onChange={({ target: { value } }) => { useText(value); }}
        />
      </label>

      <label htmlFor="colorPicker">
        <span className="descr">Color</span>
        <ColorPicker
          id="colorPicker"
          value={clr}
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
          defaultValue={imp.value}
          value={{
            value: imp.value,
            label: imp.label
          }}
          onChange={(value) => {
            useImportancy(value);
          }}
        />
      </label>

      <button className="btn btn-md" type="submit">
        Submit
      </button>
    </form>
  );
}

CreateFormWithHooks.defaultProps = {
  title: '',
  text: '',
  color: '',
  importancy: 'default'
};

CreateFormWithHooks.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  importancy: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};
