import React, { Component } from 'react';
import { Table, Button, Form, Modal, Input, InputNumber,Icon , message} from 'antd';
import { Row, Col } from 'antd';
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Add a new beneficiary"
                okText="Add"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Beneficiary Demography">
                        {getFieldDecorator('beneficiaryDemography', {
                            rules: [{ required: true, message: 'Please input the beneficiary demography!' }],
                        })(<Input placeholder="adults/childeren/students" size="large" />)}
                    </FormItem>
                    <FormItem label="Beneficiary Number">
                        {getFieldDecorator('beneficiaryNumber', {
                            rules: [{ required: true, message: 'Please input the number of beneficiaries!' }],
                        })(
                            <InputNumber
                                    size="large"
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />)}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);



const columns = [{
    title: 'Beneficiary Demography',
    dataIndex: 'beneficiaryDemography',
}, {
    title: 'Beneficiary Number',
    dataIndex: 'beneficiaryNumber',
}];




class BeneficiariesComponent extends Component {
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
        });
    }

    goBack(){
        window.location.href = "/activities"
    }

    handleCreate = () => {
        const form = this.form;
        this.loading()

        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            
            if(this.props.activity.beneficiaries){
                var newBeneficiariesArray = this.props.activity.beneficiaries.slice()
            }else{
                var newBeneficiariesArray = []
            }
            
            newBeneficiariesArray.push(values)
            this.props.onBeneficiariesUpdate(newBeneficiariesArray)
            form.resetFields();
            this.setState({ visible: false });
        });
    }

    saveFormRef = (form) => {
        this.form = form;
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
                        <Button style={margins}  onClick={()=>{this.goBack()}} size="large"><Icon type="left" />Dashboard</Button>
                        <Button style={margins} onClick={this.showModal} size="large" ><Icon type="plus"/>Add Beneficiary</Button>
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
                        rowKey="beneficiaryDemography"
                        columns={columns}
                        dataSource={this.props.activity.beneficiaries}
                        bordered
                        title={() => 'Beneficiaries'}
                    />
                </Col>
            </Row>
        );
    }
}

export default BeneficiariesComponent;
