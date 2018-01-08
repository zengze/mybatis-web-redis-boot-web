import React , {Component} from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { List, PullToRefresh, SwipeAction, SearchBar } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import wrAdmaBActions from '../actions';
import BaseComponent from '../../../../common/BaseComponent';

class WrAdmaBListContainer extends BaseComponent {

  constructor (props) {
    super(props);
    Object.assign(this.actions,wrAdmaBActions);
  	this.state = {
			listParam: {
  			current : "0",
  			pageSize : "10",
  			field : "",
  			keywords:"",
  			order:"",
  			columnKey:"",
		  },
      down: true,
      height: document.documentElement.clientHeight,
		};
  }

  componentDidMount() {
    this.getObjList(this.getQueryParams(this.state.listParam));

    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei,
    }), 0);
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
          <div style={{ fontWeight: 'bold' }}>{item.orgNm}</div>
          <Brief>{'组织机构代码：' + item.orgCd}</Brief>
          <Brief>{'所属机构类型：' + item.orgTp}</Brief>
          <Brief>{'地址：' + item.addr}</Brief>
          <Brief>{'办公室电话：' + item.tel}</Brief>
        </Item>
      </SwipeAction>
    )
  }

  render() {
    const { data:wrAdmaBList,loading:wrAdmaBListLoading } = this.props.wrAdmaBListReducer;

    return (
      <div>
        <SearchBar
          placeholder="Search"
          cancelText={'查询'} />
        <PullToRefresh
          ref={el => this.ptr = el}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
          direction={this.state.down ? 'down' : 'up'}
          refreshing={this.state.wrAdmaBListLoading}
          distanceToRefresh={50}
          onRefresh={() => {
            this.getObjList(this.getQueryParams(this.state.listParam));
          }}
        >
          <List>
            {
              wrAdmaBList.length == 0
              ?
                <div style={{ padding: 10, textAlign: 'center' }}>暂无数据</div>
              :
                _.map(wrAdmaBList, (item) => {
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
    wrAdmaBListReducer: state.wrAdmaBListReducer.toJS()
  }
}

export default connect(mapStateToProps)(WrAdmaBListContainer)
