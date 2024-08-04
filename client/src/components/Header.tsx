import React, { useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom'


export default function Header() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("access_token")
        // eslint-disable-next-line no-restricted-globals
        location.href = "/login";
    }

    return (
        <div style={{ display: "flex", justifyContent: "space-between", background: "#5d06ba", height: "30px", padding: "12px" }}>
            <div>Derq Traffic Data</div>
            <div>
                <LogoutIcon onClick={logout} />
            </div>
        </div>
    )
}