import React, { Component } from 'react';
import css from './GroupHeader.css';

class GroupHeader extends Component {
    
  render() {
    return (
        <div>
        <div className={css.piForm}>
            <div className={css.groupHeading}>
                <h4 className={css.groupHeading__title} data-tooltip="Click to add a project lead.">{this.props.label}</h4>     
                {/* <a><img className={css.groupHeading__add} src={add} alt=""/></a> */}
            </div>
        </div>
        </div>
        
    );
  }
}

export default GroupHeader;
