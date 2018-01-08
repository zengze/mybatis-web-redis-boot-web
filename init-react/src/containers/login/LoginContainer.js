import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAction } from './';

import { createForm } from 'rc-form';

import { List, InputItem, Button, } from 'antd-mobile';

import './Login.less';

class LoginContainer extends Component {

  state = {

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data != this.props.data) {
      this.setState({
        status: nextProps.data,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { getFieldValue, validateFields } = this.props.form;

    const userName = getFieldValue('userName');
    const password = getFieldValue('password');

    validateFields({ force: true },
      (err, values) => {
        if (!err) {
          this.props.login(userName,password);
        }
      }
    );
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { status } = this.state;

    return (
      <div className="login-container">
        <div className="login-top">
          <div className="login-header">
            <a href="">
              <img alt="" className="login-logo" src="https://gw.alipayobjects.com/zos/rmsportal/NGCCBOENpgTXpBWUIPnI.svg" />
              <span className="login-title">爱美斯国际物流</span>
            </a>
          </div>
        </div>
        <List>
          <InputItem
            {...getFieldProps('userName')}
            placeholder="请输入用户名"
          >用户名</InputItem>
          <InputItem
            {...getFieldProps('password')}
            type="password"
            placeholder="请输入密码"
          >密码2</InputItem>
          <Button type="primary" onClick={this.handleSubmit}>登录</Button>
        </List>
        <div className="login-footer">
          南京鼎盛合力水利技术有限公司 Copyright © 2016 - 2019
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    data: state.loginReduce.status
  }
}

function mapDispatchToProps(dispatch){
  return {
    login(userName,password){
      dispatch(loginAction.login(userName,password))
    }
  }
}

LoginContainer = createForm()(LoginContainer);

export default connect(mapStateToProps,mapDispatchToProps)(LoginContainer)
