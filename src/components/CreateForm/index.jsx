// @flow

import React from 'react';

import Select from 'react-select';
import { ColorPicker } from '../index';

type Props = {
  onCreate: (
    formdata: {
      title: string,
      text: string,
      color: string
  }) => any
};

export class CreateForm extends React.Component<Props, Object> {
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
        onCreate
      }
    } = this;

    return (
      <form onSubmit={() => {
        onCreate({
          title,
          text,
          color
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
            options={[]}
            value={importancy}
            onChange={
              ({ target: { value } }) => {
                this.setState({
                  importancy: value
                });
              }}
          />
        </label>

        <button type="submit">
          Add
        </button>

      </form>
    );
  }
}
