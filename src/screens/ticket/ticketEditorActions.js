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

export const editTicketStatusActions = (newFormData, ticketActions, key) => {
	const newFieldData = newFormData[key]
	newFieldData.elementConfig.options = ticketActions[newFieldData.value]
}

/* Form Submission */
export const submitFormHandler = (formId, formData) => {
	const newTicket = {}
	for (let formElementIdentifier in formData) {
		let newValue = formData[formElementIdentifier].value

		/* Replacing Not fixed tickets with In progress state for displaying in correct bucket */
		if (newValue === 'Not Fix') {
			newValue = 'IN-PROGRESS'
		}

		newTicket[formElementIdentifier] = newValue
	}
	return newTicket
}

/* Form validations */
export const validateFormInputs = formData => {
	let formIsValid = true
	const updatedFormData = { ...formData }

	for (let inputIdentifier in formData) {
		const updatedFormElement = { ...updatedFormData[inputIdentifier] }

		updatedFormElement.touched = true
		updatedFormElement.valid = checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		)
		updatedFormData[inputIdentifier] = updatedFormElement
		formIsValid = formIsValid && updatedFormElement.valid
	}

	return { updatedFormData, formIsValid }
}

export const validateFormInput = (formData, inputIdentifier) => {
	const updatedFormData = { ...formData }
	const updatedFormElement = {
		...updatedFormData[inputIdentifier]
	}

	updatedFormElement.valid = checkValidity(
		updatedFormElement.value,
		updatedFormElement.validation
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
	updatedFormElement.valid = true

	updatedFormData[inputIdentifier] = updatedFormElement

	return updatedFormData
}
