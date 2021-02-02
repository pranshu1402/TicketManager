import DashboardReducer from '../screens/dashboard/dashboardReducer'
import TicketReducer from '../screens/ticket/ticketReducer'
import { combineReducers } from 'redux'

const rootReducers = {
	dashboard: DashboardReducer,
	ticket: TicketReducer
}

export default combineReducers(rootReducers)
