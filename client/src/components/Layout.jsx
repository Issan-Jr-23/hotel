// Layout.js
import React from 'react';
import Navbar from './NavMenu.jsx';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}

export default Layout;
