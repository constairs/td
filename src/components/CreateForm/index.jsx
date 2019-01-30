// @flow

import React from 'react';

import { ColorPicker } from '../index';

type Props = {

};

export class CreateForm extends React.Component<Props, Object> {
  state={
    title: '',
    text: '',
    color: '#ffffff'
  }

  render() {
    const {
      state: {
        title,
        text,
        color
      }
    } = this;

    return (
      <form onSubmit={() => {}}>
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

        <button type="submit">
          Add
        </button>

      </form>
    );
  }
}
