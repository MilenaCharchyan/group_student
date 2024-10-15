import React from 'react';
import './style.scss';

const ErrorPage: React.FC = () => {
    return (
        <div className="error-page">
        <div className="error-code">404</div>
        <div className="error-message">Oops! The page you are looking for does not exist.</div>
        <a className="back-link" href="/">Go back to Homepage</a>
    </div>
    );
};

export default ErrorPage;
