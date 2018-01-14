import React, { Component } from 'react';
import css from './MultiDataForm.css';


class MultiDataForm extends Component {
    
  render() {
    return (
        <div>
            <div className={css.groupHeading}>
                <h4 className="groupHeading__title tooltip_left" data-tooltip="Click to add a project lead.">Project Lead Information</h4>     
                <img className="groupHeading__add" src="assets/images/addArrow.png" alt=""/>
            </div>

            
            <div className="group group_50">
                <input type="text" required/>
                <div className="highlight"></div>
                <span className="bar"></span>
                <label>Name</label>
            </div>

            <div className="group group_50">
                <input type="text" required/>
                <div className="highlight"></div>
                <span className="bar"></span>
                <label>Role</label>
            </div>

            <div className="group">
                <textarea name="motivation" id="" cols="30" rows="4"></textarea>
                <div className="highlight"></div>
                <span className="bar"></span>
                <label>Motivation</label>
            </div>

            <div className="group">
                <input type="file" className="inputfile" id="file"  name="file" accept="image/*" multiple/>
                <label className="inputfileLabel" htmlfor="file" >
                    <svg className="inputfileLabel__svg" xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                        <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"
                    />
                    </svg>
                <span>Choose a file&hellip;</span></label>
            </div>
        </div>
    );
  }
}

export default MultiDataForm;
