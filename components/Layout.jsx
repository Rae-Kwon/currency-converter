import React from 'react'

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <header>
                <h1 className="logo">Logo</h1>
                <input type="checkbox" id="nav-toggle" className="nav-toggle"/>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Currency History</a></li>
                    </ul>
                </nav>
                <label htmlFor="nav-toggle" className="nav-toggle-label">
                    <span></span>
                </label>
            </header>
            {children}
        </div>
    )
}

export default Layout