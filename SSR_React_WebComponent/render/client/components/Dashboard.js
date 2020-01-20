import React, { Component } from 'react'
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { fetchAccounts } from '../actions'
import AccountHeader from './AccountHeader'
import AccountList from './AccountList'
import LoadMore from './LoadMore'
//import Pagination from './Pagination'

const Pagination = Loadable({
  loader: () => import('./Pagination'),
  loading() {
    return <div>Loading...</div>
  }
});
class Dashboard extends Component {
  constructor(props) {
  super(props)
  this.state = { lazyLoad: true, sortName: true, ascOrder: true, curPage: 0, curRecord: 50 }
  this.loadMore = this.loadMore.bind(this)
  this.sortList = this.sortList.bind(this)
  this.pageChange = this.pageChange.bind(this)
  this.recordChange = this.recordChange.bind(this)
}
  componentDidMount() {
    this.props.fetchAccounts({"startPoint": 0, "endPoint": 3, "type": "acntName", "order": "true"})
  }

  loadMore(){
    this.setState({lazyLoad: false})
    this.props.fetchAccounts({"startPoint": 0, "endPoint": 50, "type": (this.state.sortName ? 'acntName' : 'availableCash'), "order": this.state.ascOrder})
  }

  sortList(type){
    //type === 'acntName'? (this.setState((prevState, props) => prevState.sortName?{sortName: true, ascorder: false}:{sortName: true, ascorder: true})) : (this.setState((prevState, props) => !prevState.sortName? {sortName: false, ascorder: true} : {sortName: false, ascOrder: false}))
    if(type === 'acntName'){
      this.setState((prevState, props) => {
        let sortOrder = prevState.sortName ? (prevState.ascOrder ? false : true) : true
        this.props.fetchAccounts({"startPoint": 0, "endPoint": 50, "type": type, "order": sortOrder})
        return {sortName: true, ascOrder: sortOrder}
      })
    }else{
      this.setState((prevState, props) => {
        let sortOrder = prevState.sortName ? true : (prevState.ascOrder ? false : true)
        this.props.fetchAccounts({"startPoint": 0, "endPoint": 50, "type": type, "order": sortOrder})
        return {sortName: false, ascOrder: sortOrder}
      })
    }
  }

  pageChange(val){
    this.setState(() => {
      this.props.fetchAccounts({"startPoint": val, "endPoint": Number(val) + Number(this.state.curRecord), "type": (this.state.sortName ? 'acntName' : 'availableCash'), "order": this.state.ascOrder})
      return{curPage: val}
    })
  }

  recordChange(val){
    this.setState(() => {
      this.props.fetchAccounts({"startPoint": this.state.curPage, "endPoint": Number(val) + Number(this.state.curPage), "type": (this.state.sortName ? 'acntName' : 'availableCash'), "order": this.state.ascOrder})
      return{curRecord: val}
    })
  }

  render() {
    return (
      <section className="container-fluid">
        <Pagination {...this.props} pageChange={this.pageChange} recordChange={this.recordChange} curRecord={this.state.curRecord} curPage={this.state.curPage} />
        <AccountHeader sortList = {this.sortList} sortName = {this.state.sortName} ascOrder = {this.state.ascOrder} />
        <AccountList {...this.props} lazyLoad={this.state.lazyLoad} />
        {this.state.lazyLoad &&
        <LoadMore loadMore = {this.loadMore} />
         }
      </section>
    );
  }
}
AccountList.propTypes = {
  accounts: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  return { accounts: state.accounts }
}

function loadData(store) {
  return store.dispatch(fetchAccounts({"startPoint": 0, "endPoint": 3, "type": "acntName", "order": "true"}))
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchAccounts })(Dashboard)
};
