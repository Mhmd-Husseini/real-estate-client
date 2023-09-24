import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { sendRequest } from './../../config/request'; 

function GoogleCallback() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        sendRequest({method: 'GET',route: `/guest/auth/callback${location.search}`,includeHeaders: true})
            .then((response) => {
                setLoading(false);
                setData(response);
                if (response.user && response.user.token) {
                    localStorage.setItem('token', response.user.token);
                    navigate('/');
                }
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [location.search, navigate]);

    if (loading) {
        return <div></div>;
    } else {
        return null;
    }
}

export default GoogleCallback;
