import React from 'react'
import {formatter} from './formatter'
import PropTypes from 'prop-types'

const AccountCard = props => {
  const renderChangeAmount = () => {
    switch(props.differenceParam){
      case 'positive':
        return `+${props.changePercent}% / ${formatter(props.changeAmnt, props.currency)}`
      case 'negative':
        return `-${props.changePercent}% / ${formatter(props.changeAmnt, props.currency)}`
      default:
        return '0.00% / $0.00'
    }
  }
  return(
    <ul className="float">
      <li className="left">
        <span className="font-size-12 blue">
          <strong>{props.acntName}</strong>
        </span>
      </li>
      <li className="right padRght5">
        <p>
          <span>{formatter(props.availableCash, props.currency)}</span>
          <span className={props.differenceParam + " font-size-8"}>{renderChangeAmount()}</span>
        </p>
      </li>
    </ul>
  )
}
AccountCard.propTypes = {
  differenceParam: PropTypes.string.isRequired,
  changePercent: PropTypes.number.isRequired,
  acntName: PropTypes.string.isRequired,
  changeAmnt: PropTypes.number.isRequired,
  availableCash: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired
}
export default AccountCard
