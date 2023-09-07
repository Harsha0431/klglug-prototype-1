import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SelectButton } from 'primereact/selectbutton';
import { getAllStudentList } from '../services/AdminStudentList';
import { Button } from 'primereact/button';



function CreditList() {
    const [list, setList] = useState([]);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    const fetchStudents = async()=>{
        const data = await getAllStudentList();
        setList(data) ;
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="card">
            <DataTable value={list} size={'normal'} tableStyle={{ minWidth: '50rem' }}aginator rows={1} rowsPerPageOptions={[5, 10, 25, 50]}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                <Column field="id" header="ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="points" header="Points"></Column>
                <Column field="credits" header="Credits"></Column>
            </DataTable>
        </div>
    );
}

export default CreditList