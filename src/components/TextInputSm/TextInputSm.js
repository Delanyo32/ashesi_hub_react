import React, { Component } from 'react';
import css from './TextInputSm.css';


class TextInputSm extends Component {
    
  render() {
    return (
   
      <div className={css.group}>
          <input className={css.group__input} type="text" required/>
          <div className={css.highlight}></div>
          <span className={css.bar}></span>
          <label className={css.group__label} >{this.props.label}</label>
        </div>
    );
  }
}

export default TextInputSm;
