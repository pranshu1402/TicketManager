/* Create Ticket */
/* Edit Ticket */
import * as actionTypes from '../../reduxStore/actionTypes'
import { handleEditTicketInitiation } from './ticketEditorActions'

const initialState = {
	ticketId: null,
	formData: {
		title: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Please Enter Ticket Title'
			},
			value: '',
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		description: {
			elementType: 'textarea',
			elementConfig: {
				type: 'text',
				placeholder: 'Please enter issue description'
			},
			value: '',
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		type: {
			elementType: 'select',
			elementConfig: {
				options: [
					{ value: 'Story', displayValue: 'Story' },
					{ value: 'Spike', displayValue: 'Spike' },
					{ value: 'Task', displayValue: 'Task' },
					{ value: 'Bug', displayValue: 'Bug' }
				]
			},
			value: 'Story',
			validation: {},
			valid: true
		},
		status: {
			elementType: 'select',
			elementConfig: {
				options: [
					{ value: 'IN-PROGRESS', displayValue: 'IN-PROGRESS' },
					{ value: 'DONE', displayValue: 'DONE' },
					{ value: 'CLOSE', displayValue: 'CLOSE' }
				]
			},
			value: 'IN-PROGRESS',
			validation: {},
			valid: true
		}
	}
}

const ticketReducer = (state = initialState, action) => {
	let newState
	switch (action.type) {
		case actionTypes.EDIT_TICKET_DETAILS_INIT:
			const newFormData = handleEditTicketInitiation(
				action.ticketData,
				state.formData
			)
			newState = {
				...state,
				formData: newFormData,
				ticketId: action.ticketId
			}
			break
		case actionTypes.UPDATE_EDIT_TICKET_FORM_DATA:
			newState = {
				...state,
				formData: action.updatedFormData
			}

			break
		default:
			newState = state
	}

	return newState
}

export default ticketReducer
