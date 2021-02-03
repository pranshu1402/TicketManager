export const checkValidity = (value, rules, touched) => {
	let isValid = true
	if (!rules) {
		return true
	}

	if (rules.required && touched) {
		isValid = value.trim() !== '' && isValid
	}

	/* More rules will be added */

	return isValid
}
