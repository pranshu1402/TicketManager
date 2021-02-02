import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import DashBoard from './dashboard'
import Ticket from './ticket'

const RouteManager = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/ticket/:ticketId'>
					<Ticket />
				</Route>
				<Route path='/'>
					<DashBoard />
				</Route>
				<Redirect to='/' />
			</Switch>
		</Router>
	)
}

export default RouteManager
