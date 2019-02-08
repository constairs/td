// @flow

import React from 'react';

import Select from 'react-select';
import { ColorPicker } from '../index';

type Props = {
  onEdit: (formdata: {
    title: string,
    text: string,
    color: string,
    importancy: string
  }) => any
};

export class EditForm extends React.Component<Props, Object> {
  state={
    title: '',
    text: '',
    color: '#ffffff',
    importancy: 'default'
  }

  render() {
    const {
      state: {
        title,
        text,
        color,
        importancy
      },
      props: {
        onEdit
      }
    } = this;
    return (
      <form onSubmit={() => {
        onEdit({
          title,
          text,
          color,
          importancy
        });
      }}
      >

        <label htmlFor="titleInput">
          <span>Title</span>
          <input
            type="text"
            id="titleInput"
            value={title}
            onChange={({ target: { value } }) => {
              this.setState({ title: value });
            }}
          />
        </label>
        <label htmlFor="textInput">
          <span>Text</span>
          <textarea
            id="textInput"
            value={text}
            onChange={({ target: { value } }) => {
              this.setState({ text: value });
            }}
          />
        </label>

        <span>Color</span>
        <ColorPicker
          value={color}
          colors={['#cc0000', '#f0f0f0', '#2b2b2b']}
          onSwitch={(switchedColor) => {
            this.setState({ color: switchedColor });
          }}
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
            value={{ value: importancy, label: 'Default' }}
            onChange={
              ({ target: { value } }) => {
                this.setState({
                  importancy: value
                });
              }}
          />
        </label>

        <button type="submit">
          Edit
        </button>

      </form>
    );
  }
}
