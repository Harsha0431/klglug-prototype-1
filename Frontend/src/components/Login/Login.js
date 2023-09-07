import React , { useState } from 'react'
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import './Login.css'
import { Button } from '@mui/material';
import {ValidateUser} from '../../services/ValidateUserCredentials';
import AlertMessage from '../OtherComponents/AlertMessageError';
import Backdrop from '@mui/material/Backdrop';




function Login() {
    const [userId , setUserId] = useState('');
    const [userPassword , setPassword] = useState('');
    const [idError , setIdError] = useState(false);
    const [passwordError , setPasswordError] = useState(false);
    const [showAlertMessage , setShowAlertErrorMessage] = useState(false) ;
    const [alertMessage , setAlertMessage] = useState('');
    const navigate = useNavigate();
    
    const handleNavigate = ()=>{
        navigate('/');
    }

    const onChangeUserId = (event)=>{
        setIdError(false);
        const userId = event.target.value;
        setUserId(userId);
    }

    const onChangeUserPassword = (event)=>{
        setPasswordError(false);
        const password = event.target.value;
        setPassword(password);
    }

    const checkCredentials = ()=>{
        if(userId==='' && userPassword ===''){
            setIdError(true);
            setPasswordError(true);
            return false ;
        }
        else if(userId === ''){
            setIdError(true);
            setPasswordError(false);
            return false ;
        }
        else if(userPassword===''){
            setIdError(false);
            setPasswordError(true);
            return false;
        }
        return true;
    }

    const validateCredentials = async (event) =>{
        event.preventDefault()
        if(checkCredentials()){
            setIdError(false);
            setPasswordError(false);
            const response = await ValidateUser({id:userId , password:userPassword});
            if(response.status === 1){
                if(response.role=="admin")
                    navigate('/admin');
            }
            else if(response.status === 10){
                setShowAlertErrorMessage(true);
                setAlertMessage('Invalid Login Credentials');
                setTimeout(()=>{} , 500);
                await new Promise((resolver)=>setTimeout(resolver , 3000));
                setShowAlertErrorMessage(false);
                setAlertMessage('');
                // setOpenBackdrop(true);
            }
        }
    }

    const header = ()=>{
        document.getElementById('user-id').innerHTML = '';
        return(
            <AlertMessage message={alertMessage}/>
        )
    }

    return (
        <div className="card">
            <div className="flex flex-wrap justify-content-center align-items-center gap-2 mb-2">
                
                <Dialog className='login-dialog-box text-center'  header={showAlertMessage?header:""} visible={'true'} position={'top'} onHide={handleNavigate} draggable={false} resizable={false}>
                <form onSubmit={validateCredentials}>
                    <div className="flex flex-column flex-wrap align-items-center justify-content-center mt-2" style={{display:'flex' , justifyContent:'center' , alignItems:'center' , gap:'1rem'}}>
                        <TextField helperText={idError?'Invalid Username':''} error={idError} onChange={onChangeUserId} id='user-id' label="Username" variant="outlined" className='login-input-box'/>
                        <TextField error={passwordError} helperText={passwordError?'Invalid password':''} type='password' onChange={onChangeUserPassword} value={userPassword} id='user-password' label="Password" className='login-input-box' variant="outlined" />
                    </div>
                    <div style={{display:'flex' , marginTop:'1rem' , justifyContent:'center' , alignItems:'center'}}>
                    <Button type='submit' onSubmit={validateCredentials} onClick={validateCredentials} variant="contained" style={{width:'auto',fontSize:'22px'}}>
                        LOGIN
                    </Button>
                        {/* <Button label="Login" icon="pi pi-user" className="w-10rem mx-auto"></Button> */} 
                    </div>
                    </form>
                </Dialog>
            </div>
        </div>
    )
}

export default Login