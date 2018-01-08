import React, { Component } from 'react';
import {connect} from 'react-redux';
import { createForm } from 'rc-form';
import _ from 'lodash';

import {
  List, Modal, Picker,
  InputItem, Button,
} from 'antd-mobile';

import BaseComponent from '../../../../common/BaseComponent';
import hwRoleActions  from '../actions';
import hwModelActions from '../../../prj_user/hwmodel/actions';

class HwRoleAddContainer extends BaseComponent {

  constructor (props) {
    super(props);
    Object.assign(this.actions,hwRoleActions);
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
    };

    this.props.dispatch(hwModelActions.getObjList(this.getQueryParams(listParam)));
  }

  _success() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.addObj({
          ...values,
          tokenOfModel: _.join(values.tokenOfModel, ','),
        });
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
    const { data:hwModelList } = this.props.hwModelListReducer;

    let modelData = [];

    modelData = _.map(hwModelList, (item) => {
      return {
        value: item.token,
        label: item.name,
      }
    });

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
          <InputItem {...getFieldProps('type', {
            initialValue: '',
            rules: [
              {required: true, message: '请填写类型'}
            ]
          })}>
            类型
          </InputItem>
          <InputItem {...getFieldProps('nt', {
            initialValue: '',
          })}>
            备注
          </InputItem>
          <Picker cols={1} data={modelData}
            {...getFieldProps('tokenOfModel', {
              rules: [
                {required: true, message: '请选择配置'}
              ]
            })}
            >
            <List.Item arrow="horizontal">配置</List.Item>
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
    hwModelListReducer: state.hwModelListReducer.toJS(),
  }
}

HwRoleAddContainer = createForm()(HwRoleAddContainer);

export default connect(mapStateToProps)(HwRoleAddContainer);
