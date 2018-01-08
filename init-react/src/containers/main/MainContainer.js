import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Menu, NavBar, Icon } from 'antd-mobile';

import { mainAction } from './';

import './Main.less';

class MainContainer extends React.Component {

  constructor(props){
    super(props)
    this.state={
      show: false,
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      show: !this.state.show,
    });
  }

  onMaskClick = () => {
    this.setState({
      show: false,
    });
  }

  _onMenuChange = (value) => {
    location.href = '#' + value[1];
    this.setState({
      menuValue: value,
      show: false,
    });
  }

  render() {
    const { menuValue, show } = this.state;

    const menuData = [
      {
        value: '/prj_projectname/wradmab',
        label: '[ 组织机构 ]管理',
        children: [
          {
            value: '/prj_projectname/wradmab/list',
            label: '组织机构',
          },
          {
            value: '/prj_projectname/wradmab/add',
            label: '添加组织',
          },
        ],
      },
      {
        value: '/prj_user/hwmodel',
        label: '配置管理',
        children: [
          {
            value: '/prj_user/hwmodel/list',
            label: '配置列表',
          },
          {
            value: '/prj_user/hwmodel/add',
            label: '添加配置',
          },
        ],
      },
      {
        value: '/prj_user/hwrole',
        label: '角色管理',
        children: [
          {
            value: '/prj_user/hwrole/list',
            label: '角色列表',
          },
          {
            value: '/prj_user/hwrole/add',
            label: '添加角色',
          },
        ],
      },
      {
        value: '/prj_user/hwuser',
        label: '用户管理',
        children: [
          {
            value: '/prj_user/hwuser/list',
            label: '用户列表',
          },
          {
            value: '/prj_user/hwuser/add',
            label: '添加用户',
          },
        ],
      },
      {
        value: '/prj_user/hwview',
        label: '视图管理',
        children: [
          {
            value: '/prj_user/hwview/list',
            label: '视图列表',
          },
          {
            value: '/prj_user/hwview/add',
            label: '添加视图',
          },
        ],
      },
    ];

    const menuEl = (
      <Menu
        className="foo-menu"
        data={menuData}
        value={menuValue}
        onChange={this._onMenuChange}
      />
    );

    return (
      <div className={show ? 'menu-active' : ''}>
        <div>
          <NavBar
            leftContent="Menu"
            icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg" className="am-icon am-icon-md" alt="" />}
            onLeftClick={this.handleClick}
            className="top-nav-bar"
          >
            Here is title
          </NavBar>
        </div>
        <div>
          {this.props.children}
        </div>
        {show ? menuEl : null}
        {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

export default connect(mapStateToProps)(MainContainer);
