import React from 'react'
import styles from './ActivitiesDashboard.css'
import { Row, Col } from 'antd';
import { Avatar } from 'antd';
import { Layout } from 'antd';
import { Card } from 'antd';
import { Button, Modal, Form, Input, InputNumber, DatePicker, Dropdown, Menu } from 'antd';
const { Meta } = Card;
const { Header, Footer, Content } = Layout;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const full_height = { height: "100vh" }
const margins = { margin: "30px" }

const menu = (
    <Menu>
        <Menu.Item>
            <a href="/">Logout</a>
        </Menu.Item>
    </Menu>
);

const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;
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
                title="Create a new Project Activity"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Activity Name">
                        {getFieldDecorator('activityName', {
                            rules: [{ required: true, message: 'Please input the name for this Activity!' }],
                        })(<Input size="large" />)}
                    </FormItem>
                    <FormItem label="Activity Description">
                        {getFieldDecorator('activityDescription', {
                            rules: [{ required: true, message: 'Please input the description for this Activity!' }],
                        })(<Input type="textarea" size="large" />)}
                    </FormItem>
                    <FormItem label="Activity Budget">
                        {getFieldDecorator('activityAmount', {
                            initialValue: 1000,
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
                            initialValue: 10,
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
                        label="RangePicker"
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


class ActivitiesDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            userObject: {},
            project: {}
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

    handleCreate = () => {
        const form = this.form;

        form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            const rangeValue = fieldsValue['range-picker'];
            const values = {
                ...fieldsValue,
                'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
            };

            console.log('Received values of form: ', values);
            this.saveActivity(values)
            form.resetFields();
            this.setState({ visible: false });
        });
    }

    saveActivity = (activity) => {
        var randomID = require("random-id")
        activity["id"] = randomID()

        var currentActivities = this.state.project.activities
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


    saveFormRef = (form) => {
        this.form = form;
    }

    getInfo = () => {
        this.props.stitch.then(stitch=>{
            if (stitch.authedId()) {
                let db = stitch.service("mongodb", "mongodb-atlas").db("hub");
                let user = db.collection("users");
                user.find({ "owner_id": stitch.authedId() }, null).execute().then((data) => {
                    if (data[0]) {
                        var user = data[0]
                        this.setState({
                            project: user.project,
                        })
                        this.setState({
                            userObject: user
                        })
                        localStorage.setItem('user', JSON.stringify(user))
                    }
                });
    
            } else {
                const { history } = this.props;
                history.push(`/`)
            }
        })

    }

    goToActivityInformation = (id) => {
        const { history } = this.props;
        history.push(`/activities/${id}`)
    }

    componentDidMount() {

        this.getInfo()
    }

    renderActivityCards() {
        var actList = this.state.project.activities
        console.log(actList)
        if (actList) {
            const activities_list = actList.map((item, index) => {
                return (
                    <Col span={8} key={item.id}>
                        <Card
                            onClick={() => { this.goToActivityInformation(item.id) }}
                            hoverable
                            style={{ width: 400 }}
                        >
                            <Meta
                                title={item.activityName}
                                description={item.activityDescription}
                            />

                        </Card>
                    </Col>

                )
            })
            return activities_list
        }


    }

    render() {

        const page = (
            <Layout className="layout" style={full_height}>
                <Header>
                    <Row>
                        <Col span={12}>
                            <a href=".">
                                <svg className={styles.logo} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 41">
                                    <g fill="none" fillRule="evenodd">
                                        <path fill="#ffffff" d="M16.436,11.216 C22.092,11.216 26.908,15.248 26.908,22.808 L26.908,40 L18.508,40 L18.508,24.04 C18.508,20.568 16.324,18.944 13.636,18.944 C10.556,18.944 8.42799999,20.736 8.42799999,24.712 L8.42799999,40 L0.0279999905,40 L0.0279999905,0.8 L8.42799999,0.8 L8.42799999,14.632 C9.93999999,12.56 12.74,11.216 16.436,11.216 Z M51.884,12 L60.284,12 L60.284,40 L51.884,40 L51.884,37.368 C50.372,39.44 47.572,40.784 43.876,40.784 C38.22,40.784 33.404,36.752 33.404,29.192 L33.404,12 L41.804,12 L41.804,27.96 C41.804,31.432 43.988,33.056 46.676,33.056 C49.756,33.056 51.884,31.264 51.884,27.288 L51.884,12 Z M84.308,11.216 C91.644,11.216 97.692,17.656 97.692,26 C97.692,34.344 91.644,40.784 84.308,40.784 C80.556,40.784 77.812,39.496 75.964,37.368 L75.964,40 L67.564,40 L67.564,0.8 L75.964,0.8 L75.964,14.632 C77.812,12.504 80.556,11.216 84.308,11.216 Z M82.628,32.832 C86.492,32.832 89.292,30.2 89.292,26 C89.292,21.8 86.492,19.168 82.628,19.168 C78.764,19.168 75.964,21.8 75.964,26 C75.964,30.2 78.764,32.832 82.628,32.832 Z"
                                        />
                                        <path fill="#00DF91" d="M106.092,40.784 C103.18,40.784 100.772,38.376 100.772,35.464 C100.772,32.552 103.18,30.144 106.092,30.144 C109.004,30.144 111.412,32.552 111.412,35.464 C111.412,38.376 109.004,40.784 106.092,40.784 Z"
                                        />
                                    </g>
                                </svg>
                            </a>
                        </Col>
                        <Col span={12}>
                            <Row type="flex" justify="end">
                                <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
                                        <a>
                                            <div className={styles.user_info}>
                                                <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                                                <span className={styles.username}>{this.state.userObject.fullName}</span>
                                            </div>
                                        </a>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Header>
                <Content className={styles.content}>
                    <Row type="flex" justify="center">
                        <Col span={22}>
                            <Row type="flex" justify="space-between">
                                <div className={styles.header_text}>
                                    <h2>Project Name: {this.state.project.projectName}</h2>
                                    <p>Activities:</p>
                                </div>
                                <div style={margins}>
                                    <Button size="large" onClick={this.showModal}>Add Activity</Button>
                                    <CollectionCreateForm
                                        ref={this.saveFormRef}
                                        visible={this.state.visible}
                                        onCancel={this.handleCancel}
                                        onCreate={this.handleCreate}
                                    />
                                </div>
                            </Row>

                        </Col>
                        <Col span={21}>
                            <Row type="flex" justify="start" gutter={16}>

                                {this.renderActivityCards()}
                            </Row>
                        </Col>
                    </Row>

                </Content>
                <Footer>
                    <p>Delanyo & Raphael</p>
                </Footer>
            </Layout>
        )

        return page

    }

}



export default ActivitiesDashboard
