/* Fetch Tickets */
/* Fetch Board State */
import * as actionTypes from '../../reduxStore/actionTypes'

const initialState = {
	ticketStates: ['IN-PROGRESS', 'DONE', 'CLOSE'],
	ticketTypes: ['Story', 'Spike', 'Task', 'Bug'],
	tickets: {
		t01: {
			title: 'Ticket of type Story',
			description:
				'As a user I would like to drag & drop the tickets in dashboard for a better UX',
			status: 'IN-PROGRESS',
			assignee: '',
			type: 'Story'
		},
		t02: {
			title: 'Ticket of type Spike',
			description: '',
			status: 'IN-PROGRESS',
			assignee: '',
			type: 'Spike'
		},
		t03: {
			title: 'Ticket of type Task',
			description: '',
			status: 'IN-PROGRESS',
			assignee: '',
			type: 'Task'
		},
		t04: {
			title: 'Ticket of type Bug',
			description: '',
			status: 'IN-PROGRESS',
			assignee: '',
			type: 'Bug'
		}
	}
}

const dashboardReducer = (state = initialState, action) => {
	let newState
	switch (action.type) {
		case actionTypes.SET_BOARD_STATE:
			newState = { ...state, ...action.stateData }
			break
		case actionTypes.AUTO_CLOSE_TICKET:
			newState = {
				...state,
				tickets: action.tickets
			}
			break
		case actionTypes.UPDATE_TICKET_STATUS:
			newState = {
				...state,
				tickets: action.tickets
			}
			break
		case actionTypes.ADD_NEW_TICKET:
			const ticketNum = Object.keys(state.tickets).length
			newState = {
				...state,
				tickets: {
					...state.tickets,
					[`t${ticketNum + 1}`]: action.newTicketData
				}
			}
			break
		default:
			newState = state
	}

	return newState
}

export default dashboardReducer
