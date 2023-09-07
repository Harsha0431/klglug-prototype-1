import React , { useEffect, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { addStudentToDB } from '../../services/AddStudentToDB';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';







function AddStudentDialog({onCloseDialog}) {
    const [visible, setVisible] = useState(true);
    const [points , setPoints] = useState(-1);
    const [credits , setCreditsValue] = useState(0);
    const [id , setId] = useState(0);
    const [error , setError] = useState(false);
    const successAlert = {name: 'success' , message: 'Student Added successfully'};
    const errorAlert = {name: 'error' , message: 'Failed to Add Student'};
    const [openBackdropLoading, setOpenBackdropLoading] = useState(false);
    const [showSuccessMessage , setShowSuccessMessage] = useState(false);
    const [alertStatus , setAlertStatus] = useState('');
    const [role, setRole] = useState('');
    const items = [
        { name: 'student', value: 1 },
        { name: 'faculty', value: 2 },
        { name: 'admin', value: 3 }
    ];



    const onChangeValidateId = ()=>{
        const re = /^[2][0-9]{9}$/;
        const idObj = document.getElementById('student-id') ;
        setId(idObj.value);
        if(!re.test(idObj.value)){
            idObj.style.borderColor='red';
        }
        else{
            idObj.style.borderColor = 'green';
        }
    }


    const handleClose = () => {
        setVisible(false);
        onCloseDialog();
    };

    const addStudent = ()=>{
        const idObj = document.getElementById('student-id');
        const name = document.getElementById('student-name').value.toUpperCase();
        // const id = document.getElementById('student-id').value;
        let re = /^[2][0-9]{9}$/;
        if(!re.test(id) || name.length===0 || points===-1 || points.length===0){
            if(name.length===0)
                document.getElementById('student-name').style.borderColor = 'red';
            else
                document.getElementById('student-name').style.borderColor = 'green';
            if(points.length===0 || points===-1)
                document.getElementById('student-points').style.borderColor = 'red';
            else
            document.getElementById('student-points').style.borderColor = 'green';
            setError(true);
            return;
        }
        console.log("Name : " + name + " ID : " + id + "points : " + points + " credits : " + credits);
        uploadToDatabase(name);
    }

    const uploadToDatabase = async (name) => {
        setOpenBackdropLoading(true);
        let response;
        try {
            response = await addStudentToDB({ name, id, points });
        } catch (error) {
            console.log('Error Here Client:', error);
        }
        setOpenBackdropLoading(false);
        if(JSON.stringify(response.code) == '1') {
            setAlertStatus(successAlert);
        }
        else{
            setAlertStatus(errorAlert);
        }
        // alert(typeof(JSON.stringify(response.code)) + "  Status : " + JSON.stringify(response.code));
        setShowSuccessMessage(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setShowSuccessMessage(false);
        if(JSON.stringify(response.code) == '1') {
            handleClose();
            
            window.location.reload();
        }
    };

    const footerContent = (
        <div>
            <Button label="CANCEL" icon="pi pi-times" onClick={handleClose} className="p-button-text" />
            <Button label="ADD Student" icon="pi pi-check" onClick={addStudent} autoFocus />
        </div>
    );


    const calculateCredits = (points)=>{
        return (points/40).toFixed(2);
    }

    const setCredits = ()=>{
        let points = document.getElementById('student-points').value ;
        let credits = calculateCredits(points);
        setCreditsValue(credits);
        setPoints(points);
        document.getElementById('student-credits').innerHTML = credits ;
    }

    return (
        <form action=''>
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackdropLoading}
                >
                    <CircularProgress color="inherit" /><br/>
                    <span id='backdrop-loading-text'></span>
                </Backdrop>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={showSuccessMessage}
                >
                    <Alert severity={alertStatus.name}>
                        <AlertTitle>Success</AlertTitle>
                            {alertStatus.message}  <strong></strong>
                    </Alert>
                </Backdrop>
            </div>
        <div className="card flex flex-wrap-wrap justify-content-flex-start align-content-center" style={{flexDirection:'row'}}>
            <Dialog headerStyle={{color:'red' , textAlign:'center'}} header={error?'Invalid Inputs':''} visible={visible} onHide={handleClose} style={{ width: 'auto' , minWidth:'40vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} footer={footerContent}>
                <div style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start',flexWrap:'wrap',flexDirection:'column'}}>
                    <div style={{display:'flex',gap:'5vh' , flexWrap:'wrap',justifyContent:'flex-start',paddingTop:'4vh'}}>

                        <span className="p-float-label">
                            <InputText id="student-name" keyfilter={''} size={35} /> 
                            <label htmlFor="student-name">Name</label>
                        </span>

                        <span className="p-float-label">
                            <InputText id="student-id" keyfilter={'int'} onChange={onChangeValidateId}/>
                            <label htmlFor="student-id">Student ID</label>
                        </span>
                    </div>

                    <div style={{display:'flex',gap:'3vh' , flexWrap:'wrap',justifyContent:'flex-start',paddingTop:'4vh'}}>
                        <span className="p-float-label">
                            <InputText id="student-points" onChange={setCredits} keyfilter={'pnum'} size={10}/>
                            <label htmlFor="student-points">Points</label>
                        </span>

                        <span className="p-float-label">
                            <InputText id="student-credits" value={credits} keyfilter={'num'} size={10} disabled/>
                            <label htmlFor="student-credits">Credits</label>
                        </span>
                    </div>

                </div>
                
            </Dialog>
        </div>
        </form>
    );
}

export default AddStudentDialog;