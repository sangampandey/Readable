// pages/NotFound.js
import React from 'react';
import {Link} from 'react-router-dom';
import PageNotFound from '../assets/images/PageNotFound.png';

const NotFound = () => (
    <div>
        <img alt="Not found" src={PageNotFound} style={{display: 'block', margin: 'auto', position: 'relative'}}/>
        <Link to="/" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Return to Home Page</Link>
    </div>
);
export default NotFound;