import React, { useState } from 'react';
import { useSearchParams } from 'react-router';
import Header from './header';
import API from '../../api';
import { validatePassword } from '../../validations/validations';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [clicked, setClicked] = useState(false);
    const [searchParams] = useSearchParams();

    const handleSubmit = async () => {
        setClicked(true);

        if(newPassword !== confirmPassword){
            setMessage("Passwords don't match.");
            return;
        }

        const validPassword = validatePassword(newPassword);
        if(validPassword.status === false){
            setMessage(validPassword.message);
            return;
        }

        try{
            const token = searchParams.get('token');
            const response = await API.post('/reset-password', 
                { 
                    token: token, 
                    password: newPassword 
                }
            );
            setMessage(response.data.message);
        }catch(err){
            setMessage(err.response.data.message);
        }
    }

  return (
    <div className="background">
        <Header />
        <div className="form">
            <h2>Reset Password</h2>
            <div className="field">
                <input
                    value={newPassword}
                    type="password"
                    placeholder='New Password'
                    onChange={(e) => { setNewPassword(e.target.value) }}
                />
            </div>
            <div className="field">
                <input
                    value={confirmPassword}
                    type="password"
                    placeholder='Confirm New Password'
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                />
            </div>
            <div className="field">
                <button
                    className="submit button"
                    type="submit"
                    onClick={handleSubmit}
                >RESET</button>
            </div>
            {clicked && <div>{message}</div>}
        </div>
    </div>
  )
}

export default ResetPassword;