import React, { Component } from 'react';
import { Table, Button, Form, Modal, Input, InputNumber, Icon, message } from 'antd';
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

const CollectionEditForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, data } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Edit Volunteer"
                okText="Edit"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Volunteer Full Name">
                        {getFieldDecorator('volunteerName', {
                            initialValue: data.volunteerName,
                            rules: [{ required: true, message: 'Please input the volunteers Full Name' }],
                        })(<Input size="large" />)}
                    </FormItem>
                    <FormItem label="Volunteer Email">
                        {getFieldDecorator('volunteerEmail', {
                            initialValue: data.volunteerEmail,
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
            visible: false,
            editVisible: false,
            selectedVolunteer:null
        }
        this.handleCreate = this.handleCreate.bind(this)
    }

    componentDidMount(){
        if(this.props.activity.volunteers){
            this.setState({
                selectedVolunteer:this.props.activity.volunteers[0]
            })
        }
    }

    renderEditForm(){
        if(this.state.selectedVolunteer){
            return(
                <CollectionEditForm
                        ref={this.editFormRef}
                        visible={this.state.editVisible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleEdit}
                        data={this.state.selectedVolunteer}
                    />
            )
        }
    }

    editFormRef = (editForm) => {
        this.editForm = editForm;
    }

    showEdit(record) {
        this.setState({
            editVisible: true,
            selectedVolunteer: record
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    loading = () => {
        const hide = message.loading('Action in progress..', 0);
        // Dismiss manually and asynchronously
        setTimeout(hide, 1000);
    };

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
            editVisible: false
        });
    }

    handleCreate = () => {
        const form = this.form;
        this.loading()


        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            if (this.props.activity.volunteers) {
                var newVolunteersArray = this.props.activity.volunteers.slice()
            } else {
                var newVolunteersArray = []
            }
            values['timestamp'] = Date.now()

            newVolunteersArray.push(values)
            this.props.onVolunteerUpdate(newVolunteersArray)

            form.resetFields();
            this.setState({ visible: false });
        });
    }

    handleEdit = () => {
        const form = this.editForm;
        this.loading()


        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            var newVolunteersArray = []
            newVolunteersArray = this.props.activity.volunteers.map((entry) => {
                if (entry.timestamp == this.state.selectedVolunteer.timestamp) {
                    values['timestamp'] = Date.now()
                    return values
                } else {
                    return entry
                }
            })
            values['timestamp'] = Date.now()
            this.props.onVolunteerUpdate(newVolunteersArray)

            form.resetFields();
            this.setState({ editVisible: false });
        });
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    goBack() {
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
                        <Button style={margins} onClick={() => { this.goBack() }} size="large"><Icon type="left" />Dashboard</Button>
                        <Button style={margins} onClick={this.showModal} size="large" ><Icon type="plus" />Add Voluneer</Button>
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
                        onRow={(record) => { return { onClick: () => { this.showEdit(record) } } }}
                        rowKey="volunteerName"
                        columns={columns}
                        dataSource={this.props.activity.volunteers}
                        bordered
                        title={() => 'Volunteers'}
                    />
                    {this.renderEditForm()}
                </Col>
            </Row>
        );
    }
}

export default VolunteerComponent;
