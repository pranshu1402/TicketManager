import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const composeEnhancers =
	(process.env.NODE_ENV === 'development'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null) || compose

const middleware = composeEnhancers
	? composeEnhancers(applyMiddleware(thunk))
	: applyMiddleware(thunk)

const store = createStore(reducers, middleware)

export default store
