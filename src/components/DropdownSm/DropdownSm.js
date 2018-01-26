import React, { Component } from 'react';
import css from './DropdownSm.css';


class DropdownSm extends Component {

    
  constructor(props) {
    super(props);
    this.handleInputOptionChange = this.handleInputOptionChange.bind(this);
  }

  handleInputOptionChange(e) {
    this.props.onInputOptionChange(e.target.value);
  } 
    

    renderList(options){
        const list = options.map((item) => {
            return (
              <option key={item} value={item} />
            );
          });
          return list
    }

    render() {
        return (
            <div className={css.group}>
                <input className={css.pseudo_drop} list={this.props.label} onBlur={this.handleInputOptionChange} required/>
                <datalist id={this.props.label}>
                    {this.renderList(this.props.options)}
                </datalist>
                <div className={css.highlight}></div>
                <span className={css.bar}></span>
                <label className={css.group__label}>{this.props.label}</label>
            </div>

        );
    }
}

export default DropdownSm;
