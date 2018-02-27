import React from 'react'
import styles from './ActivityPage.css'
import { Row, Col } from 'antd';
import { Avatar } from 'antd';
import { Layout } from 'antd';
import { Card } from 'antd';
import { Menu, Dropdown } from 'antd';
import { Tabs, Icon } from 'antd';
import SpendingComponent from '../../components/SpendingComponent/SpendingComponent'
import VolunteerComponent from '../../components/VolunteerComponent/VolunteerComponent'
import UpdatesComponent from '../../components/UpdatesComponent/UpdatesComponent'
import BeneficiariesComponent from '../../components/BeneficiariesComponent/BeneficiariesComponent'
const TabPane = Tabs.TabPane;
const { Meta } = Card;
const { Header, Footer, Content } = Layout;

const full_height = { height: "100vh" }
const margins = { margin: "30px" }
const topM = { marginTop: "30px" }


const menu = (
    <Menu>
        <Menu.Item>
            <a href="/">Logout</a>
        </Menu.Item>
    </Menu>
);



class ActivityPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            userObject: {},
            project: {},
            currentActivity: {}
        }
        this.handleSpendingChange = this.handleSpendingChange.bind(this)
        this.handleVolunteersChange = this.handleVolunteersChange.bind(this)
        this.handleBeneficiariesChange = this.handleBeneficiariesChange.bind(this)

    }
    doRefresh(){
        let db = this.props.stitch.service("mongodb", "mongodb-atlas").db("hub");

        let users = db.collection("users");

        users.find({ "owner_id": this.props.stitch.authedId() }, null).execute().then((data) => {
            if (data[0]) {
                var user = data[0]
                this.setState({
                    project: user.project,
                })

                this.setState({
                    userObject: user
                })
                var activities = this.state.project.activities
                var id = this.props.match.params.id

                var currentActivity = activities.find((element) => {
                    return element.id == id
                })

                this.setState({
                    currentActivity: currentActivity
                })

            }
        })
    }

    getProjectInformation = () => {
        if (this.props.stitch.authedId()) {

            if (localStorage.getItem('user')) {
                var user = JSON.parse(localStorage.getItem('user'))
                this.setState({
                    project: user.project,
                })
                this.setState({
                    userObject: user
                })
                console.log(user)
                var activities = user.project.activities
                var id = this.props.match.params.id

                var currentActivity = activities.find((element) => {
                    return element.id == id
                })

                this.setState({
                    currentActivity: currentActivity
                })
            } else {
                let db = this.props.stitch.service("mongodb", "mongodb-atlas").db("hub");

                let users = db.collection("users");

                users.find({ "owner_id": this.props.stitch.authedId() }, null).execute().then((data) => {
                    if (data[0]) {
                        var user = data[0]
                        this.setState({
                            project: user.project,
                        })

                        this.setState({
                            userObject: user
                        })
                        var activities = this.state.project.activities
                        var id = this.props.match.params.id

                        var currentActivity = activities.find((element) => {
                            return element.id == id
                        })

                        this.setState({
                            currentActivity: currentActivity
                        })
                        localStorage.setItem('user',JSON.stringify(user))
                    }
                })
            }

        } else {
            const { history } = this.props;
            history.push(`/`)
        }

    }

    // goBack=()=>{
    //     const { history } = this.props;
    //     history.push("/activities")
    // }


    handleBeneficiariesChange = (beneficiariesArray) => {
        var newActivitiy = Object.assign({}, this.state.currentActivity)
        newActivitiy.beneficiaries = beneficiariesArray
        this.saveActivityUpdate(newActivitiy, "beneficiary")
    }
    handleSpendingChange = (spendingArray) => {
        var newActivitiy = Object.assign({}, this.state.currentActivity)
        newActivitiy.spending = spendingArray
        this.saveActivityUpdate(newActivitiy, "spending")
    }

    handleVolunteersChange = (volunteersArray) => {
        var newActivitiy = Object.assign({}, this.state.currentActivity)
        newActivitiy.volunteers = volunteersArray
        this.saveActivityUpdate(newActivitiy, "volunteer")
    }


    saveActivityUpdate = (activity, type) => {
        var currentActivities = this.state.project.activities
        var newActivities = currentActivities.filter((el) => {
            return el.id !== this.props.match.params.id;
        });

        if (activity.updates) {
            var newUpdates = activity.updates.slice()
        } else {
            var newUpdates = []
        }

        var update = {
            updateField: type,
            updateDate: new Date,

        }

        newUpdates.push(update)

        activity.updates = newUpdates

        newActivities.push(activity)

        var newProject = Object.assign({}, this.state.project)
        newProject.activities = newActivities

        let db = this.props.stitch.service("mongodb", "mongodb-atlas").db("hub");

        let users = db.collection("users");

        users.updateOne({ owner_id: this.props.stitch.authedId() }, { $set: { project: newProject } }).then(() => {
            this.doRefresh()
        });


    }

    componentWillMount() {
        this.getProjectInformation()
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
                            <div style={topM}></div>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab={<span><Icon type="calendar" />Activity Updates</span>} key="1">
                                    <UpdatesComponent activity={this.state.currentActivity}></UpdatesComponent>
                                </TabPane>
                                <TabPane tab={<span><Icon type="wallet" />Activity Spending</span>} key="2">
                                    <SpendingComponent activity={this.state.currentActivity} onSpendingUpdate={this.handleSpendingChange}></SpendingComponent>
                                </TabPane>
                                <TabPane tab={<span><Icon type="team" />Activity Volunteers</span>} key="3">
                                    <VolunteerComponent activity={this.state.currentActivity} onVolunteerUpdate={this.handleVolunteersChange}></VolunteerComponent>
                                </TabPane>

                                <TabPane tab={<span><Icon type="smile-o" />Activity Beneficiaries</span>} key="4">
                                    <BeneficiariesComponent activity={this.state.currentActivity} onBeneficiariesUpdate={this.handleBeneficiariesChange} />
                                </TabPane>
                            </Tabs>
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



export default ActivityPage
