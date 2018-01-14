import React, { Component } from 'react';
import css from './TextInput.css';


class TextInput extends Component {
  constructor(props) {
    super(props);
    this.handleInputTextChange = this.handleInputTextChange.bind(this);
  }

  handleInputTextChange(e) {
    this.props.onInputTextChange(e.target.value);
  }

  renderInput(){
    
    if(this.props.label.includes('Password')){
      return <input className={css.group__input} type="password" required onBlur={this.handleInputTextChange}/>
    }else{
      return <input className={css.group__input} type="text" required onBlur={this.handleInputTextChange}/>
    }
  }

    
  render() {
    return (
   
      <div className={css.group}>
          {this.renderInput()}
          <div className={css.highlight}></div>
          <span className={css.bar}></span>
          <label className={css.group__label} >{this.props.label}</label>
        </div>
    );
  }
}

export default TextInput;
