import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import { handleOnDragEnd } from '../../screens/dashboard/dashboardActions'
import TicketStatusBoard from '../ticketStatusBoard'
import './styles.scss'

function getStatusColumns(statusList, tickets = {}) {
	return statusList.map(status => {
		const ticketsPerStatus = Object.keys(tickets)
			.filter(ticketKey => tickets[ticketKey].status === status)
			.map(ticketKey => ({ ...tickets[ticketKey], id: ticketKey }))

		return (
			<TicketStatusBoard
				key={`state_${status}`}
				name={status}
				tickets={ticketsPerStatus}
			/>
		)
	})
}

const SprintBoard = () => {
	const { ticketStates, tickets } = useSelector(state => state.dashboard)
	const dispatch = useDispatch()
	const dispatchFunc = action => dispatch(action)

	const statusColumns = getStatusColumns(ticketStates, tickets, dispatch)
	return (
		<section className='sprint-board'>
			<DragDropContext
				onDragEnd={event =>
					handleOnDragEnd(event, tickets, dispatchFunc)
				}
			>
				{statusColumns}
			</DragDropContext>
		</section>
	)
}

export default SprintBoard