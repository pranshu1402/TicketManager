import Layout from './hoc/layout'
import RouteManager from './screens/routes'
import './AppStyles.scss'

const App = () => {
	return (
		<Layout>
			<RouteManager />
		</Layout>
	)
}

export default App
