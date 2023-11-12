
async function agregar(link){

    fetch(link, {
        method: 'POST',        
    });

}

async function comprar(idcart){

    fetch(`http://localhost:8080/api/carts/${idcart}/purchase`, {
        method: 'PUT',        
    }).then(
        window.location = `http://localhost:8080/products`
    );
   
}


function logout(){

    fetch('http://localhost:8080/logout', {
        method: 'GET',
    });

}