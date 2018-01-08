import React, { Component } from 'react';
import {connect} from 'react-redux';
import { createForm } from 'rc-form';
import _ from 'lodash';

import {
  List, Modal, Picker,
  InputItem, Button,
} from 'antd-mobile';

import BaseComponent from '../../../../common/BaseComponent';
import wrAdmaBActions from '../actions';

class WrAdmaBAddContainer extends BaseComponent {

  constructor (props) {
    super(props);
    Object.assign(this.actions,wrAdmaBActions);
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

    this.props.dispatch(wrAdmaBActions.getObjList(this.getQueryParams(listParam)))
  }

  _success() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.addObj({
          ...values,
          orgTp: _.join(values.orgTp, ','),
          orgScal: _.join(values.orgScal, ','),
          menb: _.join(values.menb, ','),
          tokenOfParent: _.join(values.tokenOfParent, ','),
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
    const { data:wrAdmaBList } = this.props.wrAdmaBListReducer;

    let wrAdmaBData = [];

    wrAdmaBData = _.map(wrAdmaBList, (item) => {
      return {
        value: item.token,
        label: item.name,
      }
    });

    const orgTpData = [
      {
        value: 1,
        label: '国家机关（行政主管部门）',
      },
      {
        value: 2,
        label: '事业单位',
      },
      {
        value: 3,
        label: '企业',
      },
      {
        value: 4,
        label: '社会团体',
      },
      {
        value: 5,
        label: '乡镇水利管理单位',
      },
      {
        value: 9,
        label: '其他',
      }
    ];

    const orgScalData = [
      {
        value: 1,
        label: '正部（省）级',
      },
      {
        value: 2,
        label: '副部（省）级',
      },
      {
        value: 3,
        label: '正厅级',
      },
      {
        value: 4,
        label: '副厅级',
      },
      {
        value: 5,
        label: '正处级',
      },
      {
        value: 6,
        label: '副处级',
      },
      {
        value: 7,
        label: '正科级',
      },
      {
        value: 8,
        label: '副科级',
      },
      {
        value: 9,
        label: '其他',
      }
    ];

    const menbData = [
      {
        value: 1,
        label: '隶属于中央',
      },
      {
        value: 2,
        label: '隶属于省（自治区、直辖市）',
      },
      {
        value: 3,
        label: '隶属于地（区、市、州、盟）',
      },
      {
        value: 4,
        label: '隶属于县（区、市、旗）',
      },
      {
        value: 9,
        label: '其他',
      }
    ];

    return (
      <div>
        <List>
          <InputItem labelNumber={6} {...getFieldProps('orgCd', {
            initialValue: '',
            rules: [
              {required: true, message: '请填写组织机构代码'}
            ]
          })}>
            组织机构代码
          </InputItem>
          <InputItem labelNumber={6} {...getFieldProps('orgNm', {
            initialValue: '',
            rules: [
              {required: true, message: '请填写组织机构名称'}
            ]
          })}>
            组织机构名称
          </InputItem>
          <InputItem labelNumber={6} {...getFieldProps('orgShnm', {
            initialValue: '',
          })}>
            组织机构简称
          </InputItem>
          <InputItem labelNumber={6} {...getFieldProps('partdomain', {
            initialValue: '',
            rules: [
              {required: true, message: '请填写机构英文简称'}
            ]
          })}>
            机构英文简称
          </InputItem>
          <InputItem labelNumber={6} {...getFieldProps('fulldomain', {
            initialValue: '',
            rules: [
              {required: true, message: '请填写机构英文全称'}
            ]
          })}>
            机构英文全称
          </InputItem>
          <Picker cols={1} data={orgTpData}
            {...getFieldProps('orgTp', {
              initialValue: '',
              rules: [
                {required: true, message: '请选择所属机构类型'}
              ]
            })}
            >
            <List.Item arrow="horizontal">所属机构类型</List.Item>
          </Picker>
          <InputItem labelNumber={6} {...getFieldProps('lrNm', {
            initialValue: '',
          })}>
            法人代表
          </InputItem>
          <Picker cols={1} data={orgScalData}
            {...getFieldProps('orgScal', {
              initialValue: '',
              rules: [
                {required: true, message: '请选择机构规格'}
              ]
            })}
            >
            <List.Item arrow="horizontal">机构规格</List.Item>
          </Picker>
          <Picker cols={1} data={menbData}
            {...getFieldProps('menb', {
              initialValue: '',
              rules: [
                {required: true, message: '请选择隶属关系'}
              ]
            })}
            >
            <List.Item arrow="horizontal">隶属关系</List.Item>
          </Picker>
          <InputItem labelNumber={6} {...getFieldProps('web', {
            initialValue: '',
          })}>
            网址
          </InputItem>
          <Picker cols={1} data={wrAdmaBData}
            {...getFieldProps('tokenOfParent', {
              initialValue: '',
            })}
            >
            <List.Item arrow="horizontal">上级机构</List.Item>
          </Picker>
          <InputItem labelNumber={6} {...getFieldProps('email', {
            initialValue: '',
          })}>
            邮箱
          </InputItem>
          <InputItem labelNumber={6} {...getFieldProps('addr', {
            initialValue: '',
          })}>
            地址
          </InputItem>
          <InputItem labelNumber={6} {...getFieldProps('zip', {
            initialValue: '',
          })}>
            邮编
          </InputItem>
          <InputItem labelNumber={6} {...getFieldProps('tel', {
            initialValue: '',
          })}>
            办公室电话
          </InputItem>
          <InputItem labelNumber={6} {...getFieldProps('fax', {
            initialValue: '',
          })}>
            传真号码
          </InputItem>
          <InputItem labelNumber={6} {...getFieldProps('nt', {
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
    wrAdmaBListReducer : state.wrAdmaBListReducer.toJS()
  }
}

WrAdmaBAddContainer = createForm()(WrAdmaBAddContainer);

export default connect(mapStateToProps)(WrAdmaBAddContainer);
