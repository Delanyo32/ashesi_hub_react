import React, { Component } from 'react';
import css from './Table.css';

class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedToUpdate: '',
            updateValue: "",
            updateIndex: ""
        };
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleUpdate() {
        var updateData = {}
        if (this.props.label === "Milestone Budget") {
            updateData["type"] = "budget"
            updateData["value"] = this.state.updateValue
            updateData["targetIndex"] = this.state.updateIndex
        } else if (this.props.label === "Lives to Affect") {
            updateData["type"] = "lives"
            updateData["value"] = this.state.updateValue
            updateData["targetIndex"] = this.state.updateIndex
        }
        else if (this.props.label === "Set Targets") {
            updateData["type"] = "target"
            updateData["value"] = this.state.updateValue
            updateData["targetIndex"] = this.state.updateIndex
        }

        this.props.onMilestoneUpdate(updateData)
    }


    renderList(entries) {
        const list = entries.map((item, index) => {
            return (
                <tr className={css.table__row} key={index} onClick={() => { this.selectForUpdate(item.key, index) }}>
                    <td className={css.table__desc}>{item.key}</td>
                    <td className={css.table__desc}>{item.current + " of " + item.value}</td>
                </tr>
            );
        });
        return list
    }

    selectForUpdate(item, index) {
        this.setState({
            updateIndex: index
        })

        this.setState({
            selectedToUpdate: item
        })
    }

    renderUpdateForm() {
        const form = (
            <div className={css.tableContent}>
                <h2 className={css.tableContent__update}>Updating: </h2>
                <span className={css.tableContent__update_sub}>{this.state.selectedToUpdate}</span>
                <div className={css.group + " " + css.group_50} id="tableContent__updateInput">
                    <input className={css.group__input} type="text" required onBlur={(e) => { this.setState({ updateValue: e.target.value }) }} />
                    <div className={css.highlight}></div>
                    <span className={css.bar}></span>
                    <label className={css.group__label}># to add</label>
                    <button className={css.update__btn} onClick={() => { this.handleUpdate() }}> update</button>
                </div>
            </div>

        )
        if (this.state.selectedToUpdate) {
            return form
        } else {
            return (
                <div>Click a row to update</div>
            )
        }
    }

    render() {
        return (
            <div className={css.content} id="content-personalInfo">

                <div className={css.milestoneTab__table}>
                    <table className={css.milestoneTab__table_self}>
                        <thead>
                            <tr>
                                <th className={css.table__heading}>{this.props.label}</th>
                                <th className={css.table__heading}>Current of Projected</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.renderList(this.props.data)}
                        </tbody>
                    </table>
                    {this.renderUpdateForm()}

                </div>
            </div>
        );
    }
}

export default Table;
