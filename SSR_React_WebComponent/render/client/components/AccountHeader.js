import React from 'react'
import PropTypes from 'prop-types'

const AccountHeader = ({sortList,sortName,ascOrder}) => {
  return(
    <ul className="heading float">
      <li className={`left ${sortName ? "selected" : ""}`}>
        <a className="padLft10 font-size-8" onClick ={() => sortList('acntName')}>
          <span>
            Account
          </span>
        </a>
        {sortName &&
        <i className={`arrow ${ascOrder ? "down" : "up"}`} />
        }
      </li>
      <li className={`right padRght5 ${!sortName ? "selected" : ""}`}>
        <a className="font-size-8" onClick ={() => sortList('availableCash')}>
          <span>Available Cash
          </span>
          <span className="zero">Today's Change</span>
        </a>
        {!sortName &&
        <i className={`arrow ${ascOrder ? "down" : "up"}`} />
        }
      </li>
    </ul>
  )
}
AccountHeader.propTypes = {
  sortList: PropTypes.func.isRequired,
  sortName: PropTypes.bool.isRequired,
  ascOrder: PropTypes.bool.isRequired
}
export default AccountHeader
