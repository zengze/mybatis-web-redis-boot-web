import React , {Component} from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { List, PullToRefresh, SwipeAction, SearchBar } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import hwUserActions,{HW_USER} from '../actions'
import BaseComponent from '../../../../common/BaseComponent'

class HwUserListContainer extends BaseComponent {

  constructor (props) {
    super(props);
    Object.assign(this.actions,hwUserActions);
  	this.state = {
			listParam: {
  			current : "0",
  			pageSize : "10",
  			field : "",
  			keywords:"",
  			order:"",
  			columnKey:""
		  },
      keywords: '',
      down: true,
      height: document.documentElement.clientHeight,
		};
  }

  componentDidMount() {
    this._select();

    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei,
    }), 0);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.hwUserListReducer !== this.props.hwUserListReducer) {
      this.setState({
        hwUserList: nextProps.hwUserListReducer.data,
        // hwUserListLoading: nextProps.hwUserListReducer.loading,
      });
    }
  }

  _select() {
    const { keywords } = this.state;
    const listParam = {
      current: "0",
      pageSize: "10",
      field: "",
      keywords: keywords,
      order: "",
      columnKey: "",
      username: "HW_USER.username",
      alias: "HW_USER.alias",
      nt: "HW_USER.nt",
    };

    this.getObjList(this.getQueryParams(listParam));
  }

  _list(item) {
    return (
      <SwipeAction
        style={{ backgroundColor: 'gray' }}
        autoClose
        right={[
          {
            text: '编辑',
            onPress: () => this.getObjById(item.id),
            style: { backgroundColor: '#ddd', color: 'white' },
          },
          {
            text: '删除',
            onPress: () => this.delObjById(item.id,this.getQueryParams(this.state.listParam)),
            style: { backgroundColor: '#F4333C', color: 'white' },
          },
        ]}
      >
        <Item onClick={() => this.getObjById(item.id)}>
          <div style={{ fontWeight: 'bold' }}>{item.username}</div>
          <Brief>{'别名：' + item.alias}</Brief>
          <Brief>{'备注：' + item.nt}</Brief>
          <Brief>{'角色：' + item.roleDesp}</Brief>
          <Brief>{'状态：' + item.state}</Brief>
        </Item>
      </SwipeAction>
    )
  }

  render() {
    const { hwUserList } = this.state;

    return (
      <div>
        <SearchBar
          placeholder="Search"
          cancelText={'查询'}
          value={this.state.keywords}
          onChange={(val) => this.setState({ keywords: val })}
          onClear={(val) => this.setState({ keywords: '' })}
          onCancel={() => this._select()} />
        <PullToRefresh
          ref={el => this.ptr = el}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
          direction={this.state.down ? 'down' : 'up'}
          refreshing={this.state.hwUserListLoading}
          distanceToRefresh={50}
          onRefresh={() => this._select()}
        >
          <List>
            {
              hwUserList && hwUserList.length == 0
              ?
                <div style={{ padding: 10, textAlign: 'center' }}>暂无数据</div>
              :
                _.map(hwUserList, (item) => {
                  return this._list(item);
                })
            }
          </List>
        </PullToRefresh>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    hwUserListReducer: state.hwUserListReducer.toJS()
  }
}
export default connect(mapStateToProps)(HwUserListContainer)
