import React from 'react'

const Input = props => {
	let inputElement = null
	const inputClasses = ['inputElement form-control']

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push('is-invalid')
	}

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
					onBlur={props.blurHandler}
				/>
			)
			break
		case 'textarea':
			inputElement = (
				<textarea
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
					onBlur={props.blurHandler}
				/>
			)
			break
		case 'select':
			inputElement = (
				<select
					className={inputClasses.join(' ')}
					value={props.value}
					onChange={props.changed}
				>
					{props.elementConfig.options.map(option => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			)
			break
		default:
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			)
	}

	const feedbackMessage =
		props.errorMessage || `${props.labelText} is required`

	return (
		<div className='input-container mb-3'>
			<label className='form-label'>{props.labelText}</label>
			{inputElement}
			{props.invalid ? (
				<div class='invalid-feedback'>
					<span>{feedbackMessage}</span>
				</div>
			) : null}
		</div>
	)
}

export default Input
