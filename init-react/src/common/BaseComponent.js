import React , {Component,PropTypes} from 'react'
import { connect } from 'react-redux'

class BaseComponent extends Component {

   constructor(props){

     super(props)
     this.dispatch = props.dispatch
   }
  actions = {
    getObjList: (data,...others) => console.log("no getObjList"),
    searchLike: (data,...others) => console.log("no searchLike"),
    updateObj: (id,...others) => console.log("no updateById"),
    addObj: (obj,...others) => console.log("no addobj"),
    getObjById:(id,...others)=>console.log("no objbyid"),
    changeState:(data,...others)=>console.log("no changeState"),
 }

 getObjList = (data,...others) => {
     this.dispatch(this.actions.getObjList(data,...others));
 }
 updateObj = (id,...others) => {
     this.dispatch(this.actions.updateObj(id,...others));

  }

 addObj = (obj,...others) => {
   this.dispatch(this.actions.addObj(obj,...others));
 }

 searchLike = (data,...others) => {
     this.dispatch(this.actions.searchLike(data,...others));
 }

 delObjById = (id,...others) => {

    this.dispatch(this.actions.delObjById(id,...others))
 }

 getObjById =(id,...others) =>{
    this.dispatch(this.actions.getObjById(id,...others))
 }
 //data中的数据为增加的数据
 //第二个参数必须是一个数组[],包含了要删除的元素
 changeState =(data,...others) =>{
     this.dispatch(this.actions.changeState(data,...others))
 }
  normalizeOrderDirection=(orderDirection) => {
    switch(orderDirection)
    {
      case "descend":
        return "desc";
      case "ascend":
        return "asc";
      default:
        return "asc";
    }
  }
  getQueryParams=(listParams) => {
    const  {
              current:pageNum,
              pageSize :numPerPage,
              field : field,
              keywords:keywords,
              order:orderDirection,
              columnKey:orderField,
            } = listParams;

    const queryParams = {
              ...listParams,
              pageNum:pageNum,
              numPerPage :numPerPage,
              field : field,
              keywords:keywords,
              orderDirection:this.normalizeOrderDirection(orderDirection),
              orderField:orderField,
            };
    return queryParams;
  }
//calculate value by token and enum arrays(its element format: {token:'xxx',name:'xxx'})
getEnumValue(enumToken,enumList){
   for (let item of enumList)
     {
     if(item.token == enumToken)
       {
         return item.name;
       }
   }
  return null;
}

filter4Search=(ObjectFields)=>{
    let columns= new Array();
    for(var column of ObjectFields)
    {
      if(column.query)
      columns.push(column);
    }
    return columns;
}
filter4List=(ObjectFields)=>{
    let columns= new Array();
    for(var column of ObjectFields)
    {
      if(!column.hide)
      columns.push(column);
    }
    return columns;
}
addUpdateDelBnts=(columns,delBntLabel="删除",updateBntLabel="修改") => {
         const renderData ={
          title: '操作',
          key: 'actions',
          render: (text, record) => (

            <div>
              <a onClick={() => this.delObjById(record.id,this.getQueryParams(this.state.listParam))}>
                删除
              </a>
              <span className="ant-divider" />
              <a onClick={() => this.getObjById(record.id)}>
                修改
              </a>
            </div>


          ),
        };
        columns.push(renderData);
        return columns;
}




}
export default BaseComponent;
