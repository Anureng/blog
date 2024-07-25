"use client"
import React, { useState } from 'react'

const DecodeToken = () => {
    const [decodedTokeni, setDecodedTokeni] = useState<any>('');

    const decodeToken = (token: string) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    };

    const token = localStorage.getItem('accessToken');
    if (token) {
        const decoded = decodeToken(token);
        setDecodedTokeni(decoded);
    }

    return [decodedTokeni, decodeToken]
}

export default DecodeToken
