import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Portal from '../../../hoc/portal'
import './style.scss'

const Modal = ({
	isOpen,
	closeModal,
	heading,
	children,
	isDismissRequired
}) => (
	<Portal>
		<div className={`modal-window ${isOpen ? '-open' : ''}`}>
			<div className='modal-curtain' onClick={closeModal}></div>
			<div className='modal-dialog'>
				<div className='modal-content'>
					<header className='modal-header'>
						<h3 className='modal-title'>{heading}</h3>
						<button
							type='button'
							onClick={closeModal}
							className='btn btn-close'
						>
							x
						</button>
					</header>
					<div className='modal-body'>{children}</div>
					<div className='modal-footer'>
						{isDismissRequired ? (
							<button
								className='btn btn-danger'
								onClick={closeModal}
							>
								DISMISS
							</button>
						) : (
							''
						)}
					</div>
				</div>
			</div>
		</div>
	</Portal>
)

export default Modal
