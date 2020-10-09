import usersReducer from '../reducers/usersReducer'
import adminReducer from '../reducers/adminReducer'
import productsReducer from '../reducers/productsReducer'
const { combineReducers } = require('redux')

const rootReducer = combineReducers({
    usersRed: usersReducer,
    adminRed: adminReducer,
    productsRed: productsReducer
})

export default rootReducer