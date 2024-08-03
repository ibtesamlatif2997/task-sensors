import { Button, TextField, Input, InputAdornment, IconButton, InputLabel, FormControl } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { APIService } from '../../services/api.service';
import { Password } from '../../types/types';


export default function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const login = async () => {
        const params:any = {
            username: username,
            password: password
        };
        const resp = await APIService.login(params)
        localStorage.setItem("access_token", resp.access_token);

        navigate("/");
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div>
            <div>
                <div>Login</div>
            </div>
            <br />
            <div >
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Username</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type='text'
                        onChange={event => setUsername(event.target.value)}
                    />
                </FormControl>
            </div>
            <br />
            <div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={event => setPassword(event.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </div>
            <br />
            <div >
                <Button variant="contained" onClick={login}>Login</Button>
            </div>
        </div>
    )
}