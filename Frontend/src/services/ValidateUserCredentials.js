const URI = "http://localhost:8080/api/login" ;

export const ValidateUser = async (data)=>{

    const response = await fetch(URI , {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })


    return response.json();

}
