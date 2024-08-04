import { Button, TextField, Input, InputAdornment, IconButton, InputLabel, FormControl, Container } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { APIService } from '../../services/api.service';
import { Password } from '../../types/types';

import Alert from '@mui/material/Alert';


export default function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const login = async () => {
        try {
            if (username === "") {
                setError("Please provide username.")
                return;
            }
            if (password === "") {
                setError("Please provide password.")
                return;
            }

            const params: Password = {
                username: username,
                password: password
            };
            const resp = await APIService.login(params)
            localStorage.setItem("access_token", resp.access_token);
            navigate("/");
        }
        catch (err) {
            setError("The username or password is incorrect.")
        }
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div>
            {error !== "" &&
                <Alert variant="outlined" severity="error" onClose={() => { setError("") }}>
                    {error}
                </Alert>
            }
            <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: "center", marginTop: "100px" }}>
                <div>Login</div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-username">Username</InputLabel>
                    <Input
                        required
                        id="standard-adornment-username"
                        type='text'
                        onChange={event => setUsername(event.target.value)}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        required
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

                <div>
                    <Button variant="contained" onClick={login}>Login</Button>
                </div>
            </div>
        </div>
    )
}