import axios from 'axios'

export const FETCH_ACCOUNTS = 'fetch_accounts'
export const fetchAccounts = (req) => async dispatch => {
  const res = await axios.post('http://localhost:9000/load',req)
  dispatch({
    type: FETCH_ACCOUNTS,
    payload: res.data
  });
};
