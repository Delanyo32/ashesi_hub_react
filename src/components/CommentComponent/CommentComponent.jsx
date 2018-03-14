import React, { Component } from 'react';
import { Button, Card, Input, InputNumber, Icon, message, List, Avatar, Spin } from 'antd';
import { Row, Col } from 'antd';
const { TextArea } = Input;

const data = [
    {
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

class CommentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            comment:''
        }
        this.createComment = this.createComment.bind(this)
    }


    loading = () => {
        const hide = message.loading('Action in progress..', 0);
        // Dismiss manually and asynchronously
        setTimeout(hide, 1000);
    };


    goBack() {
        window.location.href = "/activities"
    }

    

    createComment= ()=>{
        this.loading()
        this.props.onCommentUpdate(this.state.comment)
        this.setState({
            comment:''
        })
    }

    sortComments = (commetsArray)=>{
        if(commetsArray){
            return commetsArray.sort((a,b)=>{
                return  b.timestamp - a.timestamp
            })
        }
 
    }



    render() {
        const margins = {
            marginTop: "30px",
            marginBottom: "30px",
        }
        return (
            <Row type="flex" justify="center" >
                <Col span={24}>
                    <Row type="flex" justify="space-between">
                        <Button style={margins} onClick={() => { this.goBack() }} size="large"><Icon type="left" />Dashboard</Button>
                    </Row>
                </Col>
                <Col span={16}>
                    <Card title="Add Comment" >
                        <TextArea rows={3} placeholder="Any thing to note about this activity??" value={this.state.comment} onChange={(e)=>{this.setState({comment:e.target.value})}}/>
                        <Row type="flex" justify="end">
                            <Button type="primary" style={{ marginTop: "10px" }} onClick={() => { this.createComment() }} size="large">Add Comment</Button>
                        </Row>
                    </Card>

                    <div style={{ marginTop: "10px" }}>
                        <Card title="Comments"  >
                            <div>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={this.sortComments(this.props.activity.comments)}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon="user" />}
                                                title={
                                                    <div>
                                                        <h4>{item.userName}</h4>
                                                        <p href="https://ant.design">{item.comment}</p>
                                                    </div>
                                                }
                                                description={item.date}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </Card>
                    </div>

                </Col>
            </Row>
        );
    }
}

export default CommentComponent;
