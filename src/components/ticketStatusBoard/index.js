import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'
import TicketCard from '../ticketCard'
import './ticketStatusStyles.scss'

function getTicketCards(tickets = [], statusName) {
	const isCardDraggable = statusName !== 'CLOSE'
	return tickets.map((ticket, index) =>
		isCardDraggable ? (
			<Draggable
				key={`${ticket.id}_${ticket.status}`}
				draggableId={ticket.id}
				index={index}
			>
				{provided => (
					<li
						className='ticket-card-wrapper'
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<Link
							to={{
								pathname: `/ticket/${ticket.id}`,
								ticketDetails: ticket
							}}
						>
							<TicketCard
								ticketTitle={ticket.title}
								ticketType={ticket.type}
							/>
						</Link>
					</li>
				)}
			</Draggable>
		) : (
			<Link
				key={`${ticket.id}_${ticket.status}`}
				to={{
					pathname: `/ticket/${ticket.id}`,
					ticketDetails: ticket
				}}
			>
				<li className='ticket-card-wrapper'>
					<TicketCard
						// id={ticket.id}
						ticketTitle={ticket.title}
						ticketType={ticket.type}
					/>
				</li>
			</Link>
		)
	)
}

const TicketStatusBoard = ({ name, tickets }) => {
	const ticketCards = getTicketCards(tickets, name)
	return (
		<div className='card ticket-status-board'>
			<h3 className='card-header ticket-status-title'>{name}</h3>

			<Droppable droppableId={name}>
				{provided => (
					<ul
						className='ticket-cards-container'
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{ticketCards}
						{provided.placeholder}
					</ul>
				)}
			</Droppable>
		</div>
	)
}

export default TicketStatusBoard
