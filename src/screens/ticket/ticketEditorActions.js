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
}

/* Form validations */
export const formInputChangedHandler = (event, inputIdentifier, formData) => {
	const updatedFormData = {
		...formData
	}
	const updatedFormElement = {
		...formData[inputIdentifier]
	}
	updatedFormElement.value = event.target.value
	updatedFormElement.valid = checkValidity(
		updatedFormElement.value,
		updatedFormElement.validation
	)
	updatedFormElement.touched = true
	updatedFormData[inputIdentifier] = updatedFormElement

	let formIsValid = true
	for (let inputIdentifier in updatedFormData) {
		formIsValid = updatedFormData[inputIdentifier].valid && formIsValid
	}

	return { updatedFormData, formIsValid }
}
