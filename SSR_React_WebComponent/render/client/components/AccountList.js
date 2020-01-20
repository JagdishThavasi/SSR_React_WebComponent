import React from 'react'
import PropTypes from 'prop-types'
import AccountCard from './AccountCard'
const AccountList = props => {
  const loadAccountList = (accountList) => accountList.map((account,index) => <li key={index}><AccountCard {...account} /></li>),
 renderAccounts = props.lazyLoad ? loadAccountList(props.accounts.acntData.slice(0,3)) : loadAccountList(props.accounts.acntData);
  return (
    <ul className="datalist">
      {renderAccounts}
    </ul>
  )
}
AccountList.propTypes = {
  accounts: PropTypes.object.isRequired,
  lazyLoad: PropTypes.bool.isRequired
}
export default AccountList
