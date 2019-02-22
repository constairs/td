import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { ColorPicker } from '../index';

export class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      text: props.text,
      color: props.color,
      importancy: props.importancy
    };
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
        onSubmit
      }
    } = this;

    return (
      <form
        onSubmit={() => {
          onSubmit({
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

        <label htmlFor="colorPicker">
          <span className="descr">Color</span>
          <ColorPicker
            id="colorPicker"
            value={color}
            colors={['#cc0000', '#f0f0f0', '#2b2b2b', '#6AC8C8', '#f05050']}
            onSwitch={(switchedColor) => {
              this.setState({ color: switchedColor });
            }}
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
            value={{ value: importancy, label: 'Default' }}
            onChange={
              ({ target: { value } }) => {
                this.setState({
                  importancy: value
                });
              }}
          />
        </label>

        <button className="btn btn-md" type="submit">
          Add
        </button>

      </form>
    );
  }
}

CreateForm.defaultProps = {
  title: '',
  text: '',
  color: '',
  importancy: 'default'
};

CreateForm.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  importancy: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};
