import React, { Component } from 'react';
import { Table, Button, Form, Modal, Input, InputNumber,Icon } from 'antd';
import { Row, Col } from 'antd';
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Add a new volunteer"
                okText="Add"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Volunteer Full Name">
                        {getFieldDecorator('volunteerName', {
                            rules: [{ required: true, message: 'Please input the volunteers Full Name' }],
                        })(<Input size="large" />)}
                    </FormItem>
                    <FormItem label="Volunteer Email">
                        {getFieldDecorator('volunteerEmail', {
                            rules: [{ required: true, message: 'Please input the volunteers Email Address' }],
                        })(<Input type="textarea" size="large" />)}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);



const columns = [{
    title: 'Volunteer Full Name',
    dataIndex: 'volunteerName',
}, {
    title: 'Volunteer Email',
    dataIndex: 'volunteerEmail',
}];


class VolunteerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        this.handleCreate = this.handleCreate.bind(this)
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

    handleCreate = () => {
        const form = this.form;


        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            if(this.props.activity.volunteers){
                var newVolunteersArray = this.props.activity.volunteers.slice()
            }else{
                var newVolunteersArray = []
            }
            
            newVolunteersArray.push(values)
            this.props.onVolunteerUpdate(newVolunteersArray)

            form.resetFields();
            this.setState({ visible: false });
        });
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    goBack(){
        window.location.href = "/activities"
    }


    render() {
        const margins = {
            marginTop: "30px",
            marginBottom: "30px",
        }
        return (
            <Row>
                <Col span={24}>
                    <Row type="flex" justify="space-between">
                        <Button style={margins} onClick={()=>{this.goBack()}} size="large"><Icon type="left" />Dashboard</Button>
                        <Button style={margins} onClick={this.showModal} size="large" ><Icon type="plus"/>Add Voluneer</Button>
                    </Row> 
                    <CollectionCreateForm
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
                </Col>
                <Col span={24}>
                    <Table
                        rowKey="volunteerName"
                        columns={columns}
                        dataSource={this.props.activity.volunteers}
                        bordered
                        title={() => 'Volunteers'}
                    />
                </Col>
            </Row>
        );
    }
}

export default VolunteerComponent;
