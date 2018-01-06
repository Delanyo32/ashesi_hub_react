import React, { Component } from 'react';
import css from './LoginInput.css';


class LoginInput extends Component {

  constructor(props) {
    super(props);
    this.handleInputTextChange = this.handleInputTextChange.bind(this);
  }

  handleInputTextChange(e) {
    this.props.onInputTextChange(e.target.value);
  }

  renderInput(){
    if(this.props.label === "password"){
      return <input type="password" className={css.text_field} required onBlur={this.handleInputTextChange}/>
    }else{
      return <input className={css.text_field} type="text" required onBlur={this.handleInputTextChange}/>
    }
  }

  render() {
    return (
      <div className={css.group_login}>
        {this.renderInput()}
        <div className={css.highlight}></div>
        <span className={css.bar}></span>
        <label>{this.props.label}</label>
      </div>

    );
  }
}

export default LoginInput;
