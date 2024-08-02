import React, { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';



export default function SideBarMenu() {

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
                    <MenuItem > Dashboard</MenuItem>
                    <MenuItem > Configuration</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    )
}