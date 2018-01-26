import React, { Component } from 'react';
import css from './Accordion.css';

class Accordion extends Component {
    toggle(parent) {

        if (parent.className === css.accordionBox__self) {
            parent.className = (css.accordionBox__self + " " + css.active)
        } else {
            parent.className = css.accordionBox__self
        }

    }

    update(index){
       window.location.href=("/milestone/"+index)
    }

    renderSub(list) {
        const li = list.map((item) => {
            return(
                <React.Fragment key={item.targetDescription}>
                <p>Target (Short Description):
                    <span>{item.targetDescription}</span>
                </p>
                <p>Target Value :
                    <span>{item.targetValue + " " +item.targetUnit}</span>
                </p>
            </React.Fragment>
            )
            
        })
        return li
    }

    renderList(entries) {
        const list = entries.map((item, index) => {
            return (
                <div className={css.accordionBox__self} onClick={(e) => { this.toggle(e.target.parentNode) }} key={index}>
                    <p className={css.accordionBox__self__text}>{item.milestone}</p>

                    <div className={css.accordionBox__self__content}>
                        <p>Milestone Budget (AMT) :
                                               <span>{item.milestoneBudget}</span>
                        </p>
                        <p>What is the budget for ?
                                               <span>{item.milestoneReason}</span>
                        </p>
                            {this.renderSub(item.targets)}
                        <p>Population (Short Description)
                                               <span>Bringing my work into InVision Studio with advanced.</span>
                        </p>
                        <p># of affected lives :
                                               <span>{item.impactLives+" " +item.impactUnit}</span>
                        </p>
                        <span className={css.accordionBox__self_update} onClick={()=>{this.update(index)}}>update</span>
                    </div>
                </div>
            );
        });
        return list
    }


    render() {
        return (
            <div className={css.accordionBox} >
                <p className={css.accordionBox__title}>Current Milestones</p>

                {this.renderList(this.props.data)}
            </div>
        );
    }
}

export default Accordion;
