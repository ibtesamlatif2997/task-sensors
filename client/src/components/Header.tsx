import React, { useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom'


export default function Header() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("access_token")
        navigate("/login");
    }

    return (
        <div style={{ background: "#5d06ba", height: "50px" }}>
            <div style={{ marginTop: "10px" }}>Derq Traffic Data</div>
            <div>
                <LogoutIcon onClick={logout} />
            </div>
        </div>
    )
}