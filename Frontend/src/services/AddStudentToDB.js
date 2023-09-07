const URI = "http://localhost:8080/api/student"


export const addStudentToDB = async (data)=>{
    // console.log("Requested for Add student API service");
    const response = await fetch(URI , {
            method:'POST' ,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    )
    return response.json();

}