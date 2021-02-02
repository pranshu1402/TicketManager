import './ticketCardStyle.scss'

const TicketCard = ({ ticketTitle, ticketType }) => {
	return (
		<div className='ticket-card card'>
			<h4 className='ticket-title card-title'>{ticketTitle}</h4>
			<span className='ticket-type card-text'>{ticketType}</span>
		</div>
	)
}

export default TicketCard
