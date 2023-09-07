const URI = "http://localhost:8080/api/student"

export const getAllStudentList =async () =>{
    const response = await fetch(URI);
    return response.json();
}