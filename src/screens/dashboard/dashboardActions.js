import * as actionTypes from '../../reduxStore/actionTypes'

function updateTicketStatus(tickets, ticketID, newStatus) {
	if (!ticketID) return tickets

	const ticketToUpdate = { ...tickets[ticketID] }
	ticketToUpdate.status = newStatus

	tickets[ticketID] = ticketToUpdate

	return { ...tickets }
}

function setStatusUpdateTimer(ticketUpdateHandler, tickets, ticketId) {
	const timer = setTimeout(() => {
		ticketUpdateHandler({
			type: actionTypes.AUTO_CLOSE_TICKET,
			tickets: updateTicketStatus(tickets, ticketId, 'CLOSE')
		})
	}, 5000)

	return timer
}

export const handleTicketTimer = (tickets, dispatchFunc) => {
	Object.keys(tickets).map(ticketKey => {
		const ticketToUpdate = { ...tickets[ticketKey] }

		if (ticketToUpdate.status === 'DONE') {
			if (!ticketToUpdate.timer) {
				const newTimer = setStatusUpdateTimer(
					dispatchFunc,
					tickets,
					ticketKey
				)
				ticketToUpdate.timer = newTimer
			}
		} else {
			clearTimeout(ticketToUpdate.timer)
			ticketToUpdate.timer = null
		}

		tickets[ticketKey] = ticketToUpdate
		return ''
	})
}

/* handle dropping of item */
export const handleOnDragEnd = (event, tickets, dispatchFunc) => {
	if (!event.destination) return

	const ticketId = event.draggableId
	const status = event.destination.droppableId

	const updatedTickets = updateTicketStatus(tickets, ticketId, status)

	handleTicketTimer(updatedTickets, dispatchFunc)

	dispatchFunc({
		type: actionTypes.UPDATE_TICKET_STATUS,
		tickets: updatedTickets
	})
}
