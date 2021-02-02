import React from 'react'

const Layout = ({ children }) => {
	return (
		<div className='app container'>
			{/* <Header /> */}
			<main>{children}</main>
			{/* <Footer /> */}
		</div>
	)
}

export default Layout
