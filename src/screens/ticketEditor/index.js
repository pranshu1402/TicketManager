import { useState, useSelector } from 'react'
import { Redirect } from 'react-router-dom'
import Modal from '../../components/ui/modal'

/* on form submit successfull redirect application to homepage */

/* handle form validations here */
const TicketEditor = props => {
	const [isEditorOpen, handleEditorState] = useState(true)
	const [formState, updateFormState] = useSelector(
		state => state.ticketEditor
	)

	const closeEditor = () => {
		handleEditorState(false)
	}

	const ticketSubmitHandler = () => {
		/* send updated data to server */
		/* After successfull update close the editor and redirect to homepage */
		setTimeout(closeEditor, 500)
		closeEditor()
	}

	return isEditorOpen ? (
		<Modal
			isOpen={isEditorOpen}
			closeModal={closeEditor}
			heading={'Ticket Editor'}
		>
			<div>Inside ticket creator</div>
			<form onSubmit={ticketSubmitHandler}></form>
		</Modal>
	) : (
		<Redirect to='/' />
	)
}

export default TicketEditor
