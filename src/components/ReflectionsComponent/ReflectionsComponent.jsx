import React, { Component } from 'react';
import { Table, Button, Form, Modal, Input, InputNumber, Icon, message ,Card} from 'antd';
import { Row, Col } from 'antd';
import ReactQuill from 'react-quill';




class ReflectionsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            text: '' ,
            title:''
    }
        this.handleChange = this.handleChange.bind(this)
    }



    loading = () => {
        const hide = message.loading('Action in progress..', 0);
        // Dismiss manually and asynchronously
        setTimeout(hide, 1000);
    };

    handleChange(value) {
        this.setState({ text: value })
        // console.log(value)
    }

    save(){
        if(this.props.activity.reflections){
            var newReflectionsArray = this.props.activity.reflections.slice()
        }else{
            var newReflectionsArray = []
        }
        var reflection = {
            title:this.state.title,
            text:this.state.text,
            createdAt:Date.now()
        }
        newReflectionsArray.push(reflection)
        this.props.onReflectionUpdate(newReflectionsArray)
        this.setState({title:'',text:''})
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
                        <Button style={margins} onClick={() => { this.save() }} size="large"><Icon type="save" />Save</Button>
                    </Row>

                </Col>
                <Col span={24}>
                    <Card title="Add Reflection" >
                    <Input style={{marginBottom:"20px"}} size="large" placeholder="Reflection Title" value={this.state.title} onChange={(e)=>{this.setState({title:e.target.value})}} />
                        <ReactQuill value={this.state.text}
                            onChange={this.handleChange} />
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default ReflectionsComponent;
