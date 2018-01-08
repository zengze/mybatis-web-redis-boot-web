import React, { Component } from 'react';
import {connect} from 'react-redux'
import { createForm } from 'rc-form';
import _ from 'lodash';

import {
  List, Modal, Toast,
  InputItem, Button,
  Picker,
} from 'antd-mobile';

import BaseComponent from '../../../../common/BaseComponent'
import hwModelActions  from '../actions'

class HwModelAddContainer extends BaseComponent {

  constructor (props) {
    super(props)
    Object.assign(this.actions,hwModelActions)
    this.state = {
      visible: false,
    }
  }

  _success() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.addObj(values)
      } else {
        this.setState({
          visible: true,
          errData: err,
        });
      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { visible, errData } = this.state;

    return (
      <div>
        <List>
          <InputItem {...getFieldProps('name', {
            initialValue: '',
            rules: [
              {required: true, message: '请填写名称'}
            ]
          })}>
            名称
          </InputItem>
          <InputItem {...getFieldProps('json', {
            initialValue: '',
            rules: [
              {required: true, message: '请填写内容'}
            ]
          })}>
            内容
          </InputItem>
          <InputItem {...getFieldProps('nt', {
            initialValue: '',
          })}>
            备注
          </InputItem>
        </List>
        <Button
          type="primary"
          onClick={() => this._success()}>
          添加
        </Button>
        <Modal
          visible={visible}
          transparent
          maskClosable={false}
          title="提示信息"
          footer={[{ text: 'Ok', onPress: () => this.setState({ visible: false }) }]}
        >
          <div>
            {
              _.map(errData, (item) => {
                return <div style={{ color: 'red' }}>{item.errors[0].message}</div>;
              })
            }
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return  {

  }
}

HwModelAddContainer = createForm()(HwModelAddContainer);

export default connect(mapStateToProps)(HwModelAddContainer);
