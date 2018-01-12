import React , {Component} from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { List, PullToRefresh, SwipeAction, SearchBar } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import hwRoleActions,{HW_ROLE} from '../actions'
import BaseComponent from '../../../../common/BaseComponent'

class HwRoleListContainer extends BaseComponent {

  constructor (props) {
    super(props);
    Object.assign(this.actions,hwRoleActions);
    this.state = {
      keywords:"",
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
    if(nextProps.hwRoleListReducer !== this.props.hwRoleListReducer) {
      this.setState({
        hwRoleList: nextProps.hwRoleListReducer.data,
        // hwRoleListLoading: nextProps.hwRoleListReducer.loading,
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
      name: "HW_ROLE.name",
      type: "HW_ROLE.type",
      nt: "HW_ROLE.nt",
    };

    this.setState({
      listParam: listParam,
    });

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
          <div style={{ fontWeight: 'bold' }}>{item.name}</div>
          <Brief>{'类型：' + item.type}</Brief>
          <Brief>{'备注：' + item.nt}</Brief>
          <Brief>{'配置：' + item.modelDesp}</Brief>
        </Item>
      </SwipeAction>
    )
  }

 render() {
    const { hwRoleList } = this.state;

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
          refreshing={this.state.hwRoleListLoading}
          distanceToRefresh={50}
          onRefresh={() => this._select()}
        >
          <List>
            {
              hwRoleList && hwRoleList.length == 0
              ?
                <div style={{ padding: 10, textAlign: 'center' }}>暂无数据</div>
              :
                _.map(hwRoleList, (item) => {
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
    hwRoleListReducer: state.hwRoleListReducer.toJS()
  }
}

export default connect(mapStateToProps)(HwRoleListContainer)
