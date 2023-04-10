import React from 'react';
import { Outlet } from 'react-router-dom';
const WithoutAppFrame = () => {
    return (
        <>
            <Outlet />
        </>
    );
}

export default WithoutAppFrame;
