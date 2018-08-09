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

const CollectionEditForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, data } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Edit Expense"
                okText="Edit"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Item Name">
                        {getFieldDecorator('itemName', {
                            initialValue: data.itemName,
                            rules: [{ required: true, message: 'Please input the name for this item!' }],
                        })(<Input size="large" />)}
                    </FormItem>
                    <FormItem label="Item Price">
                        {getFieldDecorator('moneySpent', {
                            initialValue: data.moneySpent,
                            rules: [{ required: true, message: 'Please input the price for this Item!' }],
                        })(<InputNumber
                            size="large"
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />)}
                    </FormItem>
                    <FormItem label="Description">
                        {getFieldDecorator('description', {
                            initialValue: data.description,
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



class SpendingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            editVisible: false,
            selectedSpending: null
        }
        this.handleCreate = this.handleCreate.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    componentDidMount(){
        if(this.props.activity.spending){
            this.setState({
                selectedSpending:this.props.activity.spending[0]
            })
        }
    }

    renderEditForm(){
        if(this.state.selectedSpending){
            return(
                <CollectionEditForm
                        ref={this.editFormRef}
                        visible={this.state.editVisible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleEdit}
                        data={this.state.selectedSpending}
                    />
            )
        }
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
            var newSpendingArray
            newSpendingArray = this.props.activity.spending.slice()

            values['timestamp'] = Date.now()
            newSpendingArray.push(values)
            this.props.onSpendingUpdate(newSpendingArray)
            form.resetFields();
            this.setState({ editVisible: false });
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
            var newSpendingArray = []

            newSpendingArray = this.props.activity.spending.map((entry)=>{
                if(entry.timestamp == this.state.selectedSpending.timestamp){
                    values['timestamp'] = Date.now()
                    return values
                }else{
                    return entry
                }
            })
        
            this.props.onSpendingUpdate(newSpendingArray)
            form.resetFields();
            this.setState({ editVisible: false });
        });

    }

    goBack() {
        window.location.href = "/activities"
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    editFormRef = (editForm) => {
        this.editForm = editForm;
    }

    showEdit(record) {
        this.setState({
            editVisible: true,
            selectedSpending: record
        });
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
                        <Button style={margins} onClick={this.goBack} size="large"><Icon type="left" />Dashboard</Button>
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
                        onRow={(record) => { return { onClick: () => { this.showEdit(record) } } }}
                        rowKey="itemName"
                        columns={columns}
                        dataSource={this.props.activity.spending}
                        bordered
                        title={() => 'Spending Table'}
                    />
                    {this.renderEditForm()}
                </Col>
            </Row>
        );
    }
}

export default SpendingComponent;
