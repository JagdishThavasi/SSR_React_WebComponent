import React, { Component } from 'react'
import dropList from './dropList'
class Pagination extends Component {
  constructor(props) {
  super(props)
}
componentDidMount(){
  document.querySelector('drop-list[showPage]').addEventListener('pageChange', (event) => { this.props.pageChange(event.target.pageNumber)})
  document.querySelector('drop-list[showRecord]').addEventListener('recordChange', (event) => { this.props.recordChange(event.target.recordNumber)})
}
render() {
  return (
    <div className = 'paginationContainer txtCenter'>
      <drop-list name='Pages' total={this.props.accounts.length} selectednumber={this.props.curPage} frequency={this.props.curRecord} showPage>
      </drop-list>
      <drop-list name='Records' total='100' frequency='25' selectednumber={this.props.curRecord} showRecord>
      </drop-list>
    </div>
  );
}
}

export default Pagination
