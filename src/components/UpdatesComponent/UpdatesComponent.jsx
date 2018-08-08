import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Card, Icon, Timeline, Form, Modal, Input, Button, Select, InputNumber, DatePicker, message } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const { TextArea } = Input;

const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, data } = props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };
        return (
            <Modal
                visible={visible}
                title="Edit Project Activity"
                okText="Edit"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Activity Name">
                        {getFieldDecorator('activityName', {
                            initialValue: data.activityName,
                            rules: [{ required: true, message: 'Please input the name for this Activity!' }],
                        })(<Input size="large" />)}
                    </FormItem>
                    <FormItem label="Activity Description">
                        {getFieldDecorator('activityDescription', {
                            initialValue: data.activityDescription,
                            rules: [{ required: true, message: 'Please input the description for this Activity!' }],
                        })(<TextArea placeholder="" autosize={{ minRows: 2, maxRows: 6 }} />)}
                    </FormItem>
                    <FormItem label="Activity Budget">
                        {getFieldDecorator('activityAmount', {
                            initialValue: data.activityAmount,
                            rules: [{ required: true, message: 'Please input the budget for this Activity!' }],
                        })(
                            <InputNumber
                                size="large"
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        )}
                    </FormItem>

                    <FormItem label="Activity Beneficiaries">
                        {getFieldDecorator('activityBeneficiaries', {
                            initialValue: data.activityBeneficiaries,
                            rules: [{ required: true, message: 'Please input the beneficiaries for this Activity!' }],
                        })(
                            <InputNumber
                                size="large"
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Activity Duration"
                    >
                        {getFieldDecorator('range-picker', rangeConfig)(
                            <RangePicker />
                        )}
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

    saveFormRef = (form) => {
        this.form = form;
    }

    loading = () => {
        const hide = message.loading('Action in progress..', 0);
        // Dismiss manually and asynchronously
        setTimeout(hide, 1000);
    };

    handleCreate = () => {
        console.log(this.props.activity)
        const form = this.form;
        this.loading()

        form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            const rangeValue = fieldsValue['range-picker'].map(date => new Date(date));
            const values = {
                ...fieldsValue,
                'range-picker': { startsAt: rangeValue[0].getTime(), endsAt: rangeValue[1].getTime() }

            };
            console.log('Received values of form: ', values);
            var saveObj = values
            saveObj['createdAt'] = Date.now()
            var editedActivity = Object.assign({}, this.props.activity)
            editedActivity.activityName = values.activityName
            editedActivity.activityDescription = values.activityDescription
            editedActivity.activityBeneficiaries = values.activityBeneficiaries
            editedActivity["range-picker"] = values["range-picker"]
            editedActivity.activityAmount = values.activityAmount
            this.props.onActivityEdit(editedActivity)
            //this.saveActivity(values)
            form.resetFields();
            this.setState({ visible: false });
        });
    }


    saveActivity = (activity) => {
        activity["id"] = this.props.activity.id

        var currentActivities = this.props.project.activities
        var newActivities = []
        if (currentActivities) {
            newActivities = currentActivities.slice()
        }

        newActivities.push(activity)

        var newProject = Object.assign({}, this.state.project)
        newProject.activities = newActivities

        this.props.stitch.then(stitch => {
            let db = stitch.service("mongodb", "mongodb-atlas").db("hub");

            let users = db.collection("users");

            users.updateOne({ owner_id: stitch.authedId() }, { $set: { project: newProject } }).then(() => {
                this.getInfo()
            });
        })



    }



    goBack() {
        window.location.href = "/activities"
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
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

    renderDate = (date) => {
        var dd = ""
        if (date) {
            var moment = require('moment');
            dd = moment(date.startDate).format("MM/DD/YYYY") + " - " + moment(date.endDate).format("MM/DD/YYYY")
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
                        <Button style={margins} onClick={() => { this.showModal() }} size="large"><Icon type="edit" />Edit Current Activity</Button>
                        <CollectionCreateForm
                            ref={this.saveFormRef}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onCreate={this.handleCreate}
                            data={this.props.activity}
                        />
                    </Row>

                </Col>
                <Col span={8}>
                    <Card title="Activity Information"
                    >
                        <p style={p_title}>Activity Name</p>
                        <p style={p_value}>{this.props.activity.activityName}</p>
                        <p style={p_title}>Activity Description</p>
                        <p style={p_value}>{this.props.activity.activityDescription}</p>
                    </Card>
                </Col>

                <Col span={8}>

                    <Card title="Activity Information"
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
        if (this.props.activity) {
            return page
        } else {
            return (
                <p>Loading....</p>

            );
        }

    }
}

export default UpdatesComponent;
