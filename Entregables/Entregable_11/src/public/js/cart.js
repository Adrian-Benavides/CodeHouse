
async function agregar(link){

    fetch(link, {
        method: 'POST',        
    });

}



function logout(){

    fetch('http://localhost:8080/logout', {
        method: 'GET',
    });

}