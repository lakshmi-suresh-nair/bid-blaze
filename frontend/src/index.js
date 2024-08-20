import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Import the global stylesheet
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'animate.css'; // Import Animate.css for animations
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}> {/* Make sure to replace with your actual Google Client ID */}
            <App />
        </GoogleOAuthProvider>
    </React.StrictMode>
);
