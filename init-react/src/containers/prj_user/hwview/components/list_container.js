import React , {Component} from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { List, PullToRefresh, SwipeAction, SearchBar } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import hwViewActions from '../actions';
import BaseComponent from '../../../../common/BaseComponent';

class HwViewListContainer extends BaseComponent {

  constructor (props) {
    super(props);
    Object.assign(this.actions,hwViewActions);
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
    if(nextProps.hwViewListReducer !== this.props.hwViewListReducer) {
      this.setState({
        hwViewList: nextProps.hwViewListReducer.data,
        // hwViewListLoading: nextProps.hwViewListReducer.loading,
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
      name: "HW_VIEW.name",
      module: "HW_VIEW.module",
      json: "HW_VIEW.json",
      nt: "HW_VIEW.nt",
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
          <Brief>{'角色：' + item.roleDesp}</Brief>
          <Brief>{'模块：' + item.module}</Brief>
          <Brief>{'内容：' + item.json}</Brief>
          <Brief>{'备注：' + item.nt}</Brief>
        </Item>
      </SwipeAction>
    )
  }

  render() {
    const { hwViewList } = this.state;

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
          refreshing={this.state.hwViewListLoading}
          distanceToRefresh={50}
          onRefresh={() => this._select()}
        >
          <List>
            {
              hwViewList && hwViewList.length == 0
              ?
                <div style={{ padding: 10, textAlign: 'center' }}>暂无数据</div>
              :
                _.map(hwViewList, (item) => {
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
    hwViewListReducer: state.hwViewListReducer.toJS()
  }
}

export default connect(mapStateToProps)(HwViewListContainer)
