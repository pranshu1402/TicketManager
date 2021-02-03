import { checkValidity } from '../../utils/validator'

/* Edit Ticket Initialization */
export const handleEditTicketInitiation = (ticketData, formData) => {
	const newFormData = {}
	Object.keys(formData).forEach(data => {
		/* deep cloning */
		const newFieldData = JSON.parse(JSON.stringify(formData[data]))
		newFieldData.value = ticketData[data]
		newFormData[data] = newFieldData
	})

	return newFormData
}

/* Form Submission */
export const submitFormHandler = (formId, formData) => {
	const newTicket = {}
	for (let formElementIdentifier in formData) {
		newTicket[formElementIdentifier] = formData[formElementIdentifier].value
	}
	return newTicket
}

/* Form validations */
export const validateFormInputs = formData => {
	let formIsValid = true
	for (let inputIdentifier in formData) {
		const formElement = formData[inputIdentifier]
		formIsValid =
			checkValidity(
				formElement.value,
				formElement.validation,
				formElement.touched
			) && formIsValid
	}

	return formIsValid
}

export const validateFormInput = (formData, inputIdentifier) => {
	const updatedFormData = { ...formData }
	const updatedFormElement = {
		...updatedFormData[inputIdentifier]
	}

	updatedFormElement.valid = checkValidity(
		updatedFormElement.value,
		updatedFormElement.validation,
		updatedFormElement.touched
	)

	updatedFormData[inputIdentifier] = updatedFormElement

	return updatedFormData
}

export const formInputChangedHandler = (event, inputIdentifier, formData) => {
	const updatedFormData = {
		...formData
	}
	const updatedFormElement = {
		...formData[inputIdentifier]
	}
	updatedFormElement.value = event.target.value
	updatedFormElement.touched = true

	updatedFormData[inputIdentifier] = updatedFormElement

	return updatedFormData
}
