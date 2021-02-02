import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Layout from './hoc/layout'
import Board from './pages/board'
import Ticket from './pages/ticket'
import './AppStyles.scss'

const App = () => {
	return (
		<Layout>
			<Router>
				<Switch>
					<Route exact path='/ticket/:ticketId'>
						<Ticket />
					</Route>
					<Route path='/'>
						<Board />
					</Route>
					<Redirect to='/' />
				</Switch>
			</Router>
		</Layout>
	)
}

export default App
