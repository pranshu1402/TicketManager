import React from 'react'
// import './inputStyles.scss'

const Input = props => {
	let inputElement = null
	const inputClasses = ['inputElement form-control']

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push('invalid')
	}

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
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

	return (
		<div className='input-container mb-3'>
			<label className='label'>{props.label}</label>
			{inputElement}
		</div>
	)
}

export default Input
