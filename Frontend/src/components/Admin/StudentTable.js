import React, { useState, useEffect, useCallback } from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { getAllStudentList } from '../../services/AdminStudentList';
import './StudentTable.css';
import TextField from '@mui/material/TextField';
import { Button, Checkbox } from '@mui/material';
import { updateStudent } from '../../services/UpdateStudentRecord';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Message } from 'primereact/message';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AddStudentDialog from './AddStudentDialog';
import {Link} from 'react-router-dom';






export default function CheckboxRowSelectionDemo(props) {
    const [list, setList] = useState(props.list);
    const [filteredData, setFilteredData] = useState(props.list);
    const editBtnText = ['Edit', 'Update'];
    const [editBtnColor, setEditBtnColor] = useState('primary');
    const [editBtnVarient, setEditBtnVarient] = useState('contained');
    const [checkBoxDisplay, setCheckBoxDisplay] = useState('none');
    const [checkedList,setCheckedList] = useState([]);
    const [openBackdropLoading, setOpenBackdropLoading] = useState(false);
    const [showSuccessMessage , setShowSuccessMessage] = useState(false);
    const [editInProgress , setEditInProgress] = useState(false);
    const [alertStatus , setAlertStatus] = useState('');
    const [updateSuccessfull , setUpdateSuccessfull] = useState(true);
    const successAlert = {name: 'success' , message: 'Updated successfully'}
    const errorAlert = {name: 'error' , message: 'Failed to update'}
    const [openStudentAddDialog , setOpenStudentAddDialog] = useState(false);


    function filterTable() {
        let input, filter;
        input = document.getElementById("searchId");
        filter = input.value.toUpperCase();

        let filteredList = list.filter(data => {
            // Match the search query with both name and ID
            return (
                data.name.toUpperCase().indexOf(filter) > -1 ||
                data.id.toString().toUpperCase().indexOf(filter) > -1
            );
        });

        // Update the state with the filtered data
        setFilteredData(filteredList);

        // Show "Not found" message if no matching data is found
        const notFound = document.getElementById("notFoundMessage");
        const footer = document.getElementById("card-footer");
        if (filteredList.length === 0) {
            notFound.style.display = "block";
            footer.style.display = "none";
        } else {
            notFound.style.display = "none";
            footer.style.display = "";
        }
    }

    const fetchData = async () => {
        await getAllStudentList().then((data) => setList(data)).catch((err) => console.log(err));
        setFilteredData(list);
    }



    const handleEditClick = async () => {
        setEditInProgress(true);
        const checkBox_head = document.getElementById("checkbox-column");
        const text = document.getElementById('edit-btn-text');
        if (text.textContent === editBtnText[0]) {
            setCheckBoxDisplay('block');
            checkBox_head.style.display = "";
            text.innerHTML = editBtnText[1];
            setEditBtnColor('error');
            setEditBtnVarient('outlined');
        }
        else {
            setCheckBoxDisplay('none');
            checkBox_head.style.display = "none";
            text.innerHTML = editBtnText[0];
            setEditBtnColor('primary');
            setEditBtnVarient('contained');
            if(checkedList.length !== 0){
                setOpenBackdropLoading(true);
                document.getElementById('backdrop-loading-text').innerHTML = 'Loading...'
                await Promise.all( checkedList.map(
                        async (id)=>{
                            const points = document.getElementById(`student-points-${id}`).textContent;
                            return await updateStudent(id , {points}).then(()=>{
                            }).catch(err =>{setUpdateSuccessfull(false)})
                        }
                    )
                )
                if(!updateSuccessfull)
                    setAlertStatus(errorAlert);
                else{
                    setAlertStatus(successAlert);
                }
                // await new Promise((resolve) => setTimeout(resolve, 500));
                setOpenBackdropLoading(false);
                setShowSuccessMessage(true);
                setShowSuccessMessage(true);
                await new Promise((resolve) => setTimeout(resolve, 800));
                setShowSuccessMessage(false);
                window.location.reload();
            }
            setEditInProgress(false);
        }
    }

    useEffect(() => {
        setOpenBackdropLoading(true);
        fetchData();
        setOpenBackdropLoading(false)
    }, [props.list]);

    // useEffect(() => {
    //     setOpenBackdropLoading(true);
    //     fetchData();
    //     setOpenBackdropLoading(false);
    // }, [handleEditClick]);


    const handleCheckClick = (event , id)=>{
        window.console.clear(); // Not Working
        if(checkedList.includes(id)){
            setCheckedList((prevCheckedList) =>
                prevCheckedList.filter((item) => item !== id)
            );
        }
        else{
            setCheckedList([...checkedList , id]) ;
        }
    }


    const handleDialogClose = () => {
        setOpenStudentAddDialog(false);
    };

    return (
        <div className="card">
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
            <div className="searchContainer">
                <TextField inputMode='numeric' id="searchId" name="searchId" onChange={() => filterTable()} label="Search ID" variant="outlined" />
            </div>
            <div className="table-container">
                <table id="studentTable" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr className='table-row'>
                            <td id='checkbox-column' style={{ overflow: 'hidden', textOverflow: '', display: 'none' }} align='center'></td>
                            <td id='id-column'>ID</td>
                            <td id='name-column'>Name</td>
                            <td id='points-column'>Points</td>
                            <td id='credits-column'>Credits</td>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((data) => {
                            return (
                                <tr key={data.id}> 
                                    <td id='checkbox-column-body' style={{ display: `${checkBoxDisplay}` }}><Checkbox onClick={(event)=>handleCheckClick(event , data.id)} /></td>
                                    <td id={`student-id-${data.id}`}>{data.id}</td>
                                    <td >{data.name}</td>
                                    <td id={`student-points-${data.id}`} value="" contentEditable={checkedList.includes(data.id)} ><span>{data.points}</span></td>
                                    <td id={`student-credits-${data.id}`}>{data.credits}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <p id="notFoundMessage" className="notFound" style={{ display: 'none' }}>No record found</p>

                <footer id='card-footer'>
                    <Button variant='contained' style={{display:editInProgress?'none':''}} onClick={()=>setOpenStudentAddDialog(true)}>Add Student</Button>
                    <Button id='edit-btn-text' color={editBtnColor} variant={editBtnVarient} onClick={() => handleEditClick()}>Edit</Button>
                </footer>
            </div>

            {openStudentAddDialog && 
                <AddStudentDialog onCloseDialog={handleDialogClose}/>
            }
        </div>
    );
}
