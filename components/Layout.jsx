import React from 'react'

const Layout = ({ children }) => {
    return (
        <div>
            <ul>
                <li>Home</li>
                <li>Currency History</li>
            </ul>
            {children}
        </div>
    )
}

export default Layout