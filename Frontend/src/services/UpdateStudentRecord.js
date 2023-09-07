const URI = "http://localhost:8080/api/student"


export const updateStudent = async (id, data) => {
    const response = await fetch(`${URI}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};