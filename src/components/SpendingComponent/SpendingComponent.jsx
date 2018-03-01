import React, { Component } from 'react';
import { Table, Button, Form, Modal, Input, InputNumber, Icon , message } from 'antd';
import { Row, Col } from 'antd';
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Create a new Expense"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Item Name">
                        {getFieldDecorator('itemName', {
                            rules: [{ required: true, message: 'Please input the name for this item!' }],
                        })(<Input size="large" />)}
                    </FormItem>
                    <FormItem label="Item Price">
                        {getFieldDecorator('moneySpent', {
                            rules: [{ required: true, message: 'Please input the price for this Item!' }],
                        })(<InputNumber
                            size="large"
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />)}
                    </FormItem>
                    <FormItem label="Description">
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: 'Please input the description for this Item!' }],
                        })(<Input type="textarea" size="large" />)}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);



const columns = [{
    title: 'Item Name',
    dataIndex: 'itemName',
}, {
    title: 'Money Spent',
    className: 'column-money',
    dataIndex: 'moneySpent',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.money - b.money,
}, {
    title: 'Description',
    dataIndex: 'description',
}];

// const data = [{
//     key: '1',
//     name: 'Rice and Stew',
//     money: 300000.00,
//     description: 'New York No. 1 Lake Park',
// }];


class SpendingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        this.handleCreate=this.handleCreate.bind(this)
    }

    loading = () => {
        const hide = message.loading('Action in progress..', 0);
        // Dismiss manually and asynchronously
        setTimeout(hide, 1000);
      };

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
        this.loading()


        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            var newSpendingArray
            if(this.props.activity.spending){
                newSpendingArray = this.props.activity.spending.slice()
            }else{
                newSpendingArray = []
            }
            
            newSpendingArray.push(values)
            this.props.onSpendingUpdate(newSpendingArray)
            form.resetFields();
            this.setState({ visible: false });
        });
    }

    goBack(){
        window.location.href = "/activities"
    }

    saveFormRef = (form) => {
        this.form = form;
    }


    render() {
        console.log(this.props.activity)
        const margins = {
            marginTop: "30px",
            marginBottom: "30px",
        }
        
        return (
            <Row>
                <Col span={24}>
                    <Row type="flex" justify="space-between">
                        <Button style={margins}  onClick={this.goBack} size="large"><Icon type="left" />Dashboard</Button>
                        <Button style={margins} onClick={this.showModal} size="large"> <Icon type="plus" />Add Expense</Button>
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
                        rowKey="itemName"
                        columns={columns}
                        dataSource={this.props.activity.spending}
                        bordered
                        title={() => 'Spending Table'}
                    />
                </Col>
            </Row>
        );
    }
}

export default SpendingComponent;
