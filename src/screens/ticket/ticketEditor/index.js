import { useEffect, useState } from 'react'
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
	const [isFormValid, setFormValidity] = useState(true)

	const { formData, ticketId } = useSelector(state => state.ticket)
	const dispatch = useDispatch()

	useEffect(() => {
		focusFirstErrorField()
	}, [isFormValid])

	const closeEditor = () => {
		handleEditorState(false)
	}

	const ticketSubmitHandler = event => {
		event.preventDefault()
		const { updatedFormData, formIsValid } = validateFormInputs(formData)

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
					setFormValidity(true)
					setFormLoading(false)
				})

			/* After successfull update close the editor and redirect to homepage */
			setTimeout(closeEditor, 1000)
		} else {
			setFormValidity(false)
			dispatch({
				type: actionTypes.UPDATE_EDIT_TICKET_FORM_DATA,
				updatedFormData
			})

			return false
		}
	}

	const focusFirstErrorField = () => {
		const firstErrorElement = document.querySelector(
			'.inputElement.is-invalid'
		)
		firstErrorElement?.focus()
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

	return isEditorOpen ? (
		<Modal
			isOpen={isEditorOpen}
			closeModal={closeEditor}
			heading={'Ticket Editor'}
		>
			<form onSubmit={ticketSubmitHandler}>
				{Object.keys(formData).map(dataKey => {
					const formElement = formData[dataKey]
					return (
						<Input
							key={dataKey}
							elementType={formElement.elementType}
							elementConfig={formElement.elementConfig}
							labelText={formElement.label}
							value={formElement.value}
							invalid={!formElement.valid}
							shouldValidate={formElement.validation}
							touched={formElement.touched}
							changed={event =>
								inputUpdateHandler(event, dataKey)
							}
							blurHandler={event => onInputBlur(event, dataKey)}
						/>
					)
				})}
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
