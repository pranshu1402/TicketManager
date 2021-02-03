import { BrowserRouter, Switch, Route } from 'react-router-dom'
import DashBoard from './dashboard'
import Ticket from './ticket'
import TicketEditor from './ticket/ticketEditor'

const RouteManager = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/ticket/:ticketId'>
					<Ticket />
				</Route>
				<Route exact path='/create'>
					<TicketEditor />
				</Route>
				<Route exact path='/edit'>
					<TicketEditor />
				</Route>
				<Route path='/'>
					<DashBoard />
				</Route>
			</Switch>
		</BrowserRouter>
	)
}

export default RouteManager
