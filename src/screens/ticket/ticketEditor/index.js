import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Modal from '../../../components/ui/modal'
import Input from '../../../components/ui/input'
import * as actionTypes from '../../../reduxStore/actionTypes'
import {
	formInputChangedHandler,
	submitFormHandler,
	validateFormInputs
} from '../ticketEditorActions'

/* on form submit successfull redirect application to homepage */

/* handle form validations here */
const TicketEditor = () => {
	const [isEditorOpen, handleEditorState] = useState(true)
	const [isFormValid, setFormValidity] = useState(true)
	const [isFormLoading, setFormLoading] = useState(false)

	const { formData, formId } = useSelector(state => state.ticket)
	const dispatch = useDispatch()

	const closeEditor = () => {
		handleEditorState(false)
	}

	const ticketSubmitHandler = () => {
		/* send updated data to server */
		if (validateFormInputs()) {
			setFormValidity(true)
			setFormLoading(true)

			/* simulating the promises here */
			new Promise((resolve, reject) => {
				submitFormHandler(formId, formData)
				resolve()
			}).then(response => {
				dispatch({
					type: actionTypes.ADD_NEW_TICKET,
					newTicketData: response
				})
			})
			/* After successfull update close the editor and redirect to homepage */
			setTimeout(closeEditor, 1000)
		} else {
			setFormValidity(false)
		}
	}

	const inputUpdateHandler = (event, id) => {
		const updatedFormData = formInputChangedHandler(event, id, formData)

		const formIsValid = validateFormInputs(updatedFormData)
		setFormValidity(formIsValid)

		if (formIsValid) {
			dispatch({
				type: actionTypes.UPDATE_EDIT_TICKET_FORM_DATA,
				updatedFormData
			})
		} else {
			const firstErrorElement = document.querySelector(
				'.inputElement.invalid'
			)
			firstErrorElement?.focus()
		}
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
			{isFormValid ? null : (
				<div className='alert alert-danger'>{`Please provide data in all fields`}</div>
			)}
			<form onSubmit={ticketSubmitHandler}>
				{formElementsArray &&
					formElementsArray.map(formElement => (
						<Input
							key={formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							touched={formElement.config.touched}
							changed={event =>
								inputUpdateHandler(event, formElement.id)
							}
						/>
					))}
				<div className='mb-3'>
					<button
						type='submit'
						className='btn btn-primary'
						disabled={!isFormValid || isFormLoading}
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
