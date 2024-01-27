
async function eliminar(email){

    fetch(`http://localhost:8080/api/users/${email}`, {
        method: 'delete',        
    }).then( response => {
        if(response.status == '200'){
            window.location = `http://localhost:8080/users`
        }else {
            // Si la respuesta es un error (código 400), maneja el mensaje de error
            response.json().then(errorResponse => {
                const errorMessage = errorResponse.error;
                const info = document.getElementById('info'); 
                info.textContent = errorMessage;
            });
        }
    });;

}

async function premium(idUser){

    fetch(`http://localhost:8080/api/users/premium/${idUser}`, {
        method: 'PUT',        
    }).then( response => {
        if(response.status == '200'){
            window.location = `http://localhost:8080/users`
        }else {
            // Si la respuesta es un error (código 400), maneja el mensaje de error
            response.json().then(errorResponse => {
                const errorMessage = errorResponse.error;
                const info = document.getElementById('info'); 
                info.textContent = errorMessage;
            });
        }
    });
   
}


function logout(){

    fetch('http://localhost:8080/logout', {
        method: 'GET',
    });

}