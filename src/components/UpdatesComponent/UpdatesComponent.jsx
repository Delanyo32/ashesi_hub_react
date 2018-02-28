import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Card, Icon, Timeline, Form, Modal, Input, Button, Select } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

class UpdatesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }

    }



    goBack() {
        window.location.href = "/activities"
    }



    renderList = (timeline) => {
        if (timeline) {
            const line = timeline.map((item) => {
                return (
                    <Timeline.Item key={item.updateDate.toString()}>Update {item.updateField} <br />
                        <small>{item.updateDate.toString()}</small> </Timeline.Item>
                )
            })
            return line
        }


    }

    renderDate = (date)=>{
        var dd = ""
        if(date){
            dd  = date[0]+" "+date[1]
            
        }
        return dd
    }



    render() {

        const p_title = {
            fontWeight: 600,
            fontSize: "12px",
            color: "#8B8FA1",
            marginBottom: "5px"
        }
        const p_value = {
            fontWeight: 600,
            fontSize: "20px",
            color: "#1774F0",
            marginTop: "0px"
        }

        const margins = {
            marginTop: "30px",
            marginBottom: "30px",
        }
        const page = (
            <Row type="flex" justify="start" gutter={16}>
                <Col span={24}>
                    <Row type="flex" justify="space-between">
                        <Button style={margins} onClick={() => { this.goBack() }} size="large"><Icon type="left" />Dashboard</Button>
                    </Row>

                </Col>
                <Col span={8}>
                    <Card title="Activity Infromation"
                    >
                        <p style={p_title}>Activity Name</p>
                        <p style={p_value}>{this.props.activity.activityName}</p>
                        <p style={p_title}>Activity Description</p>
                        <p style={p_value}>{this.props.activity.activityDescription}</p>
                    </Card>
                </Col>

                <Col span={8}>

                    <Card title="Activity Infromation"
                    >
                        <p style={p_title}>Activity Budget</p>
                        <p style={p_value}>${this.props.activity.activityAmount}</p>
                        <p style={p_title}>Activity Schedule</p>
                        <p style={p_value}>{this.renderDate(this.props.activity["range-picker"])}</p>
                        <p style={p_title}>Estimated Activity Beneficiaries</p>
                        <p style={p_value}>{this.props.activity.activityBeneficiaries} lives</p>
                    </Card>
                </Col>

                <Col span={8}>
                    <Card title="Recent Updates"
                    >
                        <Timeline>
                            {this.renderList(this.props.activity.updates)}
                        </Timeline>
                    </Card>
                </Col>
            </Row>
        )
        if(this.props.activity){
            return page
        }else{
            return (
                <p>Loading....</p>
            
            );
        }
        
    }
}

export default UpdatesComponent;
