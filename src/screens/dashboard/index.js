import SprintBoard from '../../components/sprintBoard'
import { Link } from 'react-router-dom'
import './styles.scss'

const DashBoard = () => (
	<div className='dashboard'>
		{/* SideBar for other links */}
		<div className='dashboard-header'>
			<h2>DASHBOARD</h2>
			<Link to='create' className='btn btn-primary'>
				Create
			</Link>
		</div>
		<SprintBoard />
	</div>
)

export default DashBoard
