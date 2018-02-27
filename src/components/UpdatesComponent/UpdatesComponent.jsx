import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Card, Icon, Timeline, Form, Modal, Input, Button, Select } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Update Field"
                okText="Update"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Select a Field">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input the name for this item!' }],
                        })(
                            <Select
                                showSearch
                                size="large"
                                placeholder="Select a field"
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="name">Actvity Name</Option>
                                <Option value="description">Activity Description</Option>
                                <Option value="budget">Activity Budget</Option>
                                <Option value="schedule">Activity Schedule</Option>
                                <Option value="beneficiaries">Activity Beneficiaries</Option>
                            </Select>

                        )}
                    </FormItem>
                    <FormItem label="Update Value">
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input the description for this Item!' }],
                        })(<Input type="textarea" size="large" />)}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);

class UpdatesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    goBack(){
        window.location.href = "/activities"
    }

    handleCreate = () => {
        const form = this.form;


        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    renderList=(timeline)=>{
        if(timeline){
            const line = timeline.map((item)=>{
                return(
                     <Timeline.Item key={item.updateDate.toString()}>Update {item.updateField} <br/>
                        <small>{item.updateDate.toString()}</small> </Timeline.Item>
                )
            })
            return line
        }
        
        
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
        return (

            <Row type="flex" justify="start" gutter={16}>
                <Col span={24}>
                    <Row type="flex" justify="space-between">
                        <Button style={margins} onClick={()=>{this.goBack()}} size="large"><Icon type="left" />Dashboard</Button>
                        <Button style={margins} onClick={this.showModal} size="large" ><Icon type="plus" />Add Update</Button>
                    </Row>
                    <CollectionCreateForm
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
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
                        <p style={p_value}>{this.props.activity["range-picker"][0]+" "+this.props.activity["range-picker"][1]}</p>
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
        );
    }
}

export default UpdatesComponent;
