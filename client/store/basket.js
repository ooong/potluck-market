import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_BASKET_ITEM = 'GET_BASKET_ITEM'
const REMOVE_BASKET_ITEM = 'REMOVE_BASKET_ITEM'

/**
 * INITIAL STATE
 */
const defaultBasket = []
/**
 * ACTION CREATORS
 *
 */
export const addToBasket = item => ({ type: ADD_BASKET_ITEM, item })
export const removeFromBasket = itemId => ({ type: REMOVE_BASKET_ITEM, itemId })
/**
 * THUNK CREATORS
 */
export const createContract = (item) =>
  dispatch =>
    axios.post('/web3', item)
      .then(result => {
        console.log('Web3 RESULT: ', result)
      })
      .catch(err => console.log(err))
/**
 * REDUCER
 */
export default function(state = defaultBasket, action) {
  switch (action.type) {
    case ADD_BASKET_ITEM:
        return [...state, action.item]

    case REMOVE_BASKET_ITEM:
    return state.filter(item => {
        return item.id !== +action.itemId
      })

    default:
      return state
  }
}