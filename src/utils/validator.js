export const checkValidity = (value, rules) => {
	let isValid = true
	if (!rules) {
		return true
	}

	if (rules.required) {
		isValid = value.trim() !== '' && isValid
	}

	/* More rules will be added */

	return isValid
}
