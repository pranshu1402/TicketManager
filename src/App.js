import Layout from './hoc/layout'
import RouteManager from './pages/routes'
import './AppStyles.scss'

const App = () => {
	return (
		<Layout>
			<RouteManager />
		</Layout>
	)
}

export default App
