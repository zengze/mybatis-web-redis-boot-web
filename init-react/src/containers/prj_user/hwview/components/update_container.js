import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import _ from 'lodash';

import {
  List, Modal, Picker,
  InputItem, Button,
} from 'antd-mobile';

import BaseComponent from '../../../../common/BaseComponent';
import hwViewActions from '../actions';
import hwRoleActions from '../../../prj_user/hwrole/actions';

class HwViewUpdateContainer extends BaseComponent {

  constructor (props) {
    super(props);
    Object.assign(this.actions,hwViewActions);
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
        this.updateObj({
          ...values,
          token: this.props.params.id,
          tokenOfRole: _.join(values.tokenOfRole, ','),
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
    const { hwRoleList, hwView } = this.props;

    let roleData = [];

    roleData = _.map(hwRoleList, (item) => {
      return {
        value: item.token,
        label: item.name,
      }
    });

    return (
      <div>
        <List>
          <InputItem {...getFieldProps('name', {
            initialValue: hwView.name,
            rules: [
              {required: true, message: '请填写名称'}
            ]
          })}>
            名称
          </InputItem>
          <Picker cols={1} data={roleData}
            {...getFieldProps('tokenOfRole', {
              initialValue: [hwView.tokenOfRole],
              rules: [
                {required: true, message: '请选择角色'}
              ]
            })}
            >
            <List.Item arrow="horizontal">角色</List.Item>
          </Picker>
          <InputItem {...getFieldProps('module', {
            initialValue: hwView.module,
            rules: [
              {required: true, message: '请填写模块'}
            ]
          })}>
            模块
          </InputItem>
          <InputItem {...getFieldProps('json', {
            initialValue: hwView.json,
            rules: [
              {required: true, message: '请填写内容'}
            ]
          })}>
            内容
          </InputItem>
          <InputItem {...getFieldProps('nt', {
            initialValue: hwView.nt,
            rules: [
              {required: true, message: '请填写备注'}
            ]
          })}>
            备注
          </InputItem>
        </List>
        <Button
          type="primary"
          onClick={() => this._success()}>
          保存
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

const mapStateToProps = (state, ownProps) => {
	const { data:hwRoleList } = state.hwRoleListReducer.toJS();
	const {obj:hwView}=state.getHwViewReducer.toJS();

	return {
    hwView:hwView,
    hwRoleList:hwRoleList,
	}
}

HwViewUpdateContainer = createForm()(HwViewUpdateContainer);

export default connect(mapStateToProps)(HwViewUpdateContainer);
