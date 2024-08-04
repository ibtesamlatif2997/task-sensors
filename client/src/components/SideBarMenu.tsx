import React, { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom'


export default function SideBarMenu() {
    const navigate = useNavigate();

    return (
        <div>
            <Sidebar>
                <Menu
                    menuItemStyles={{
                        button: {
                            // the active class will be added automatically by react router
                            // so we can use it to style the active menu item
                            [`&.active`]: {
                                backgroundColor: '#13395e',
                                color: '#b6c8d9',
                            },
                        },
                    }}
                >
                    <MenuItem component={<Link to="/" />}> Dashboard</MenuItem>
                    <MenuItem component={<Link to="/configure" />}> Configuration</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    )
}