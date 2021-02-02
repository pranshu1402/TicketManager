import * as actionTypes from '../../reduxStore/actionTypes'

function updateTicketStatus(tickets, ticketID, newStatus, dispatchFunc) {
	if (!ticketID) return tickets

	const ticketToUpdate = { ...tickets[ticketID] }
	ticketToUpdate.status = newStatus

	if (ticketToUpdate.timer) {
		clearTimeout(ticketToUpdate.timer)
	}

	if (newStatus === 'DONE') {
		const newTimer = setStatusUpdateTimer(dispatchFunc, tickets, ticketID)
		ticketToUpdate.timer = newTimer
	} else {
		ticketToUpdate.timer = null
	}

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

/* handle dropping of item */
export const handleOnDragEnd = (event, tickets, dispatchFunc) => {
	if (!event.destination) return

	const ticketId = event.draggableId
	const status = event.destination.droppableId

	dispatchFunc({
		type: actionTypes.UPDATE_TICKET_STATUS,
		tickets: updateTicketStatus(tickets, ticketId, status, dispatchFunc)
	})
}
