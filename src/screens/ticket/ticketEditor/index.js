import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Modal from '../../../components/ui/modal'
import Input from '../../../components/ui/input'
import * as actionTypes from '../../../reduxStore/actionTypes'
import {
	formInputChangedHandler,
	submitFormHandler,
	validateFormInput,
	validateFormInputs
} from '../ticketEditorActions'

const TicketEditor = () => {
	const [isEditorOpen, handleEditorState] = useState(true)
	const [isFormLoading, setFormLoading] = useState(false)

	const { formData, ticketId } = useSelector(state => state.ticket)
	const dispatch = useDispatch()

	const closeEditor = () => {
		handleEditorState(false)
	}

	const ticketSubmitHandler = event => {
		event.preventDefault()
		const formIsValid = validateFormInputs()
		/* send updated data to server */
		if (formIsValid) {
			setFormLoading(true)

			/* simulating the promises here */
			new Promise((resolve, reject) => {
				const newTicket = submitFormHandler(ticketId, formData)
				resolve(newTicket)
			})
				.then(newTicketData =>
					dispatch({
						type: ticketId
							? actionTypes.EDIT_TICKET_DETAILS
							: actionTypes.ADD_NEW_TICKET,
						newTicketData,
						ticketId
					})
				)
				.then(() => {
					dispatch({
						type: actionTypes.TICKET_EDITOR_CLOSED
					})
				})
				.catch(() => {
					setFormLoading(false)
				})

			/* After successfull update close the editor and redirect to homepage */
			setTimeout(closeEditor, 1000)
		} else {
			const firstErrorElement = document.querySelector(
				'.inputElement.is-invalid'
			)
			firstErrorElement?.focus()
			return false
		}
	}

	const inputUpdateHandler = (event, inputIdentifier) => {
		const updatedFormData = formInputChangedHandler(
			event,
			inputIdentifier,
			formData
		)

		dispatch({
			type: actionTypes.UPDATE_EDIT_TICKET_FORM_DATA,
			updatedFormData
		})
	}

	const onInputBlur = (event, inputIdentifier) => {
		const updatedFormData = validateFormInput(formData, inputIdentifier)

		dispatch({
			type: actionTypes.UPDATE_EDIT_TICKET_FORM_DATA,
			updatedFormData
		})
	}

	const formElementsArray = []

	for (let key in formData) {
		formElementsArray.push({
			id: key,
			config: formData[key]
		})
	}

	return isEditorOpen ? (
		<Modal
			isOpen={isEditorOpen}
			closeModal={closeEditor}
			heading={'Ticket Editor'}
		>
			<form onSubmit={ticketSubmitHandler}>
				{formElementsArray &&
					formElementsArray.map(formElement => (
						<Input
							key={formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							labelText={formElement.config.label}
							value={formElement.config.value}
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							touched={formElement.config.touched}
							changed={event =>
								inputUpdateHandler(event, formElement.id)
							}
							blurHandler={event =>
								onInputBlur(event, formElement.id)
							}
						/>
					))}
				<div className='mb-3'>
					<button
						type='submit'
						className='btn btn-primary'
						disabled={isFormLoading}
					>
						{isFormLoading ? `SUBMIT...` : `SUBMIT`}
					</button>
				</div>
			</form>
		</Modal>
	) : (
		<Redirect to='/' />
	)
}

export default TicketEditor
