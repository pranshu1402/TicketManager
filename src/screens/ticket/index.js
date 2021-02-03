import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useParams, Redirect, Link } from 'react-router-dom'
import { EDIT_TICKET_DETAILS_INIT } from '../../reduxStore/actionTypes'
import './styles.scss'

const Ticket = () => {
	const { ticketId } = useParams()
	const { ticketDetails } = useLocation()
	const [editStatus, setEditStatus] = useState(false)
	const dispatch = useDispatch()

	if (!ticketDetails) {
		return <Redirect to='/' />
	}

	const handleTicketEdit = () => {
		dispatch({
			type: EDIT_TICKET_DETAILS_INIT,
			ticketData: ticketDetails,
			ticketId
		})

		setEditStatus(true)
	}

	return editStatus ? (
		<Redirect to='/edit' />
	) : (
		<div className='card ticket'>
			<header className='card-header ticket-header'>
				<h2 className='card-title'>{`${ticketDetails.type} | ${ticketDetails.title}`}</h2>
				<div className='button-container'>
					<button
						className='btn btn-primary'
						onClick={handleTicketEdit}
					>
						Edit Ticket
					</button>
					<Link to='/' className='btn btn-primary'>
						Dashboard
					</Link>
				</div>
			</header>
			<section className='card-body ticket-details'>
				<p className='card-text ticket-description'>
					{ticketDetails.description}
				</p>
				<div className='card-text other-details'>
					<div className='ticket-status'>
						<button className='btn btn-primary' disabled>
							{ticketDetails.status}
						</button>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Ticket
