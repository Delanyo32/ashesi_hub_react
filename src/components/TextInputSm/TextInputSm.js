import React, { Component } from 'react';
import css from './TextInputSm.css';


class TextInputSm extends Component {

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
          <input className={css.group__input} type="text" onBlur={this.handleInputTextChange} required/>
          <div className={css.highlight}></div>
          <span className={css.bar}></span>
          <label className={css.group__label} >{this.props.label}</label>
        </div>
    );
  }
}

export default TextInputSm;
