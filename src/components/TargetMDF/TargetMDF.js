import React, { Component } from 'react';
import css from './TargetMDF.css';
import add from '../../assets/images/addArrow.png'


class TargetMDF extends Component {

    constructor(props) {
        super(props);
        this.handlePropsChange = this.handlePropsChange.bind(this)
    }

    handlePropsChange(array) {
        this.props.onPropsChange(array);
    }


    addField() {
        let object = {
            targetId:(this.props.data.targets.length),
            targetDescription: '',
            targetValue: '',
            targetUnit: ''
        }

        let newArray = this.props.data.targets.slice()
        newArray.push(object)

        var clone  =  Object.assign({},this.props.data)

        clone.targets = newArray

        this.handlePropsChange(clone)
    }



    renderList(entries) {
        const list = entries.map((item) => {
            return (
                <div className={css.piForm} key={item}>
                    <div className={css.group}>
                        <textarea name="motivation" rows="4" className={css.group__input} onBlur={(e) => { item.targetDescription = e.target.value }} required></textarea>
                        <div className={css.highlight}></div>
                        <span className={css.bar}></span>
                        <label className={css.group__label} >Target Short Description</label>
                    </div>
                    <div className={css.group_50}>
                        <input className={css.group__input} type="text" onBlur={(e) => { item.targetValue = e.target.value }} required/>
                        <div className={css.highlight}></div>
                        <span className={css.bar}></span>
                        <label className={css.group__label}>Target Value</label>
                    </div>

                    <div className={css.group_50}>
                        <input className={css.group__input} type="text" onBlur={(e) => { item.targetUnit = e.target.value }} required/>
                        <div className={css.highlight}></div>
                        <span className={css.bar}></span>
                        <label className={css.group__label}>Target Unit</label>
                    </div>


                </div>
            );
        });
        return list
    }

    render() {
        return (
            <div>
                <div className={css.groupHeading}>
                    <h4 className={css.groupHeading__title} data-tooltip="Target for this Milestone">Create a New Milestone</h4>
                </div>
                <div className={css.piForm} action="" >

                    <div className={css.group_50}>
                        <input className={css.group__input} type="text"  onBlur={(e) => { this.props.data.milestone = e.target.value }} required/>
                        <div className={css.highlight}></div>
                        <span className={css.bar}></span>
                        <label className={css.group__label}>Milestone</label>
                    </div>

                    <div className={css.group_50}>
                        <input className={css.group__input} type="text" onBlur={(e) => { this.props.data.milestoneBudget = e.target.value }} required/>
                        <div className={css.highlight}></div>
                        <span className={css.bar}></span>
                        <label className={css.group__label}>Milestone Budget(AMT)</label>
                    </div>
                    <div className={css.group}>
                        <textarea name="motivation" rows="4" className={css.group__input}  onBlur={(e) => { this.props.data.milestoneReason = e.target.value }} required></textarea>
                        <div className={css.highlight}></div>
                        <span className={css.bar}></span>
                        <label className={css.group__label} >What is the Budget For???</label>
                    </div>




                    <div className={css.groupHeading}>
                        <h4 className={css.groupHeading__title} data-tooltip="Target for this Milestone">Add a Target for this Milestone</h4>
                        <a onClick={() => { this.addField() }}><img className={css.groupHeading__add} src={add} alt="" /></a>
                    </div>


                    {this.renderList(this.props.data.targets)}


                    <div className={css.groupHeading}>
                        <h4 className={css.groupHeading__title} data-tooltip="Target for this Milestone">Milestone Impact</h4>
                    </div>

                    <div className={css.piForm} >
                        <div className={css.group}>
                            <textarea name="motivation" rows="4" className={css.group__input} onBlur={(e) => { this.props.data.impactDescription = e.target.value }} required></textarea>
                            <div className={css.highlight}></div>
                            <span className={css.bar}></span>
                            <label className={css.group__label} >Population Short Description</label>
                        </div>
                        <div className={css.group_50}>
                            <input className={css.group__input} type="text" onBlur={(e) => { this.props.data.impactLives = e.target.value }} required/>
                            <div className={css.highlight}></div>
                            <span className={css.bar}></span>
                            <label className={css.group__label}># of Lives to Affect</label>
                        </div>

                        <div className={css.group_50}>
                            <input className={css.group__input} type="text" onBlur={(e) => { this.props.data.impactUnit = e.target.value }} required/>
                            <div className={css.highlight}></div>
                            <span className={css.bar}></span>
                            <label className={css.group__label}>Population Unit</label>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default TargetMDF;
