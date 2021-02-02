import ReactDOM from 'react-dom'

const Portal = ({ children }) =>
	ReactDOM.createPortal(children, document.querySelector('#portal-root'))

export default Portal
