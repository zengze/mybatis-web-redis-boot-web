import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import _ from 'lodash';

import {
  List, Modal, Picker,
  InputItem, Button,
} from 'antd-mobile';

import BaseComponent from '../../../../common/BaseComponent';
import hwUserActions  from '../actions';
import hwRoleActions from '../../../prj_user/hwrole/actions';

class HwUserAddContainer extends BaseComponent {

  constructor (props) {
    super(props);
    Object.assign(this.actions,hwUserActions);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    const listParam = {
      current : "0",
      pageSize : "10",
      field : "",
      keywords:"",
      order:"",
      columnKey:""
    }

    this.props.dispatch(hwRoleActions.getObjList(this.getQueryParams(listParam)))
  }

  _success() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.addObj({
          ...values,
          tokenOfRole: _.join(values.tokenOfRole, ','),
          state: _.join(values.state, ','),
        })
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
    const { data:hwRoleList } = this.props.hwRoleListReducer;

    let roleData = [];

    roleData = _.map(hwRoleList, (item) => {
      return {
        value: item.token,
        label: item.name,
      }
    });

    const stateData = [
      {
        value: '0',
        label: '禁用',
      },
      {
        value: '1',
        label: '启用',
      }
    ];

    return (
      <div>
        <List>
          <InputItem {...getFieldProps('username', {
            initialValue: '',
            rules: [
              {required: true, message: '请填写用户名'}
            ]
          })}>
            用户名
          </InputItem>
          <InputItem {...getFieldProps('password', {
            initialValue: '',
            rules: [
              {required: true, message: '请填写密码'}
            ]
          })}>
            密码
          </InputItem>
          <InputItem {...getFieldProps('alias', {
            initialValue: '',
          })}>
            别名
          </InputItem>
          <InputItem {...getFieldProps('nt', {
            initialValue: '',
          })}>
            备注
          </InputItem>
          <Picker cols={1} data={roleData}
            {...getFieldProps('tokenOfRole', {
              rules: [
                {required: true, message: '请选择角色'}
              ]
            })}
            >
            <List.Item arrow="horizontal">角色</List.Item>
          </Picker>
          <Picker
            cols={1}
            data={stateData}
            {...getFieldProps('state', {
              rules: [
                {required: true, message: '请选择状态'}
              ]
            })}>
            <List.Item arrow="horizontal">状态</List.Item>
          </Picker>
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
    hwRoleListReducer: state.hwRoleListReducer.toJS()
  }
}

HwUserAddContainer = createForm()(HwUserAddContainer);

export default connect(mapStateToProps)(HwUserAddContainer);
