import { useParams } from 'react-router-dom'

const Ticket = () => {
	const { ticketId } = useParams()
	return <div>{`Displaying Ticket ${ticketId}`}</div>
}

export default Ticket
