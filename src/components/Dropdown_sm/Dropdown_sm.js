import React, { Component } from 'react';
import css from './Dropdown_sm.css';


class Dropdown_sm extends Component {

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
                <input className={css.pseudo_drop} list={this.props.label} required />
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

export default Dropdown_sm;
