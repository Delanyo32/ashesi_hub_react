import React, { Component } from 'react';
import css from './TextArea.css';


class TextArea extends Component {
    
  render() {
    return (
   
      <div className={css.group}>
          <textarea rows="4" className={css.group__input}></textarea>
          <div className={css.highlight}></div>
          <span className={css.bar}></span>
          <label className={css.group__label} >{this.props.label}</label>
       </div>
    );
  }
}

export default TextArea;
