import React, { Component } from 'react';
import css from './MDF.css';
import add from '../../assets/images/addArrow.png'


class MDF extends Component {

    constructor(props) {
        super(props);
        this.handlePropsChange =  this.handlePropsChange.bind(this)
      }

      handlePropsChange(array) {
        this.props.onTargetCommunityChange(array);
    } 
    

  addField(){
      let object = {
        id:(this.props.data.length),
        community: '',
        population: '',
        need:'',
    }

    let newArray = this.props.data.slice()
    newArray.push(object)

   this.handlePropsChange(newArray)
  }



renderList(entries){
    const list = entries.map((item) => {
        return (
                <div className={css.piForm} key={item.id}>
                    <div className={css.group_50}>
                        <input  className={css.group__input} type="text" onBlur={(e)=>{item.community=e.target.value}} required/>
                        <div className={css.highlight}></div>
                        <span className={css.bar}></span>
                        <label className={css.group__label}>Community</label>
                    </div>

                    <div className={css.group_50}>
                        <input  className={css.group__input} type="text" onBlur={(e)=>{item.population=e.target.value}} required/>
                        <div className={css.highlight}></div>
                        <span className={css.bar}></span>
                        <label className={css.group__label}>Population/Age Range</label>
                    </div>

                    <div className={css.group}>
                        <textarea name="motivation" rows="4" className={css.group__input} onBlur={(e)=>{item.need=e.target.value}} required></textarea>
                        <div className={css.highlight}></div>
                        <span className={css.bar}></span>
                        <label className={css.group__label} >What community need does your project Address</label>
                    </div>
                </div>
        );
      });
      return list
}
    
  render() {
    return (
        <div>
            <div className={css.piForm}  action="" >
                <div className={css.groupHeading}>
                    <h4 className={css.groupHeading__title} data-tooltip="Click to add a Community.">Identify the Community</h4>     
                    <a onClick={()=>{this.addField()}}><img className={css.groupHeading__add} src={add} alt=""/></a>
                </div>
                {this.renderList(this.props.data)}
                
            </div>
        </div>
    );
  }
}

export default MDF;
