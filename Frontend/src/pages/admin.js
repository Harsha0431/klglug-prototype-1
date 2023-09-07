import React , {useState , useEffect} from 'react'
import './admin.css'
import StudentTable from '../components/Admin/StudentTable'
import { getAllStudentList } from '../services/AdminStudentList';





function Admin() {
    const [list , setList] = useState([]);
    const fetchList = async ()=>{
        await getAllStudentList().then( (data)=>setList(data)).catch( (err) =>console.log(err) ) ;
    }

    useEffect(() => {
        fetchList(); // Call fetchList function inside useEffect to fetch data after component mount
    }, []);

    return (
        <>
            <StudentTable list={list}/>
        </>
    )
}

export default Admin