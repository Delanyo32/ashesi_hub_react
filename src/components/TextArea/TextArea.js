import React, { Component } from 'react';
import css from './TextArea.css';


class TextArea extends Component {
  constructor(props) {
    super(props);
    this.handleInputTextChange = this.handleInputTextChange.bind(this);
  }

  handleInputTextChange(e) {
    this.props.onInputTextChange(e.target.value);
  }
    
  render() {
    return (
   
      <div className={css.group}>
          <textarea rows="4" className={css.group__input} onBlur={this.handleInputTextChange} required></textarea>
          <div className={css.highlight}></div>
          <span className={css.bar}></span>
          <label className={css.group__label} >{this.props.label}</label>
       </div>
    );
  }
}

export default TextArea;
