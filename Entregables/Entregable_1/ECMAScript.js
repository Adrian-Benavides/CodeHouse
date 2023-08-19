class  ProducManager{
    static id = 1;
    #productos;

    constructor(){
        this.#productos = [];
    }

    addProduct(title,description,price,thumbnail,code,stock){

        if(title === null || title.length === 0 || title === undefined){ 
            console.log('Title invalido');  
            return false;
        }
        if(description === null || description.length === 0 || description === undefined){ 
            console.log('Description invalido');  
            return false;
        }
        if(price === null || price <= 0 || price === undefined){ 
            console.log('Price invalido');  
            return false;
        }
        if(thumbnail === null || thumbnail.length === 0 || thumbnail === undefined){ 
            console.log('Thumbnail invalido');  
            return false;
        }
        if(code === null || code.length === 0 || code === undefined){ 
            console.log('Code invalido');  
            return false;
        }
        if(stock === null || stock === undefined || stock <= 0 ){ 
            console.log('Stock invalido');  
            return false;
        }

        if(!this.existeCode(code)){
            let producto = { 
                id :  ProducManager.id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };
            this.#productos.push(producto);
            ProducManager.id++;
            console.log('Producto agregado');
            return true;
        }else{
            console.log('El code ya existe');
            return false;
        }

    }

    getProductById(id){
        let encontrado = this.#productos.find( (producto) => producto.id == id);
        if(!encontrado){
            console.log("Not found")
            return false;
        }
        return true;
    }

    existeCode(code){
        return this.#productos.find( (producto) => producto.code == code);
    }

    getProducts(){
        console.log(this.#productos);
    }

}


const ListaProductos = new ProducManager();

ListaProductos.addProduct('','','','','','');
ListaProductos.addProduct('Jugo','Agua con azucar y colorante',200,'../Img/Jugo.png','BD35',10);
ListaProductos.addProduct('Libro','contiene informacion de ...',35000,'../Img/Libro.png','WJSTR',20);
ListaProductos.addProduct('Helado','Helado de manzana con sabor a limon',4000,'../Img/Helado.png','2ETLRO',35);

ListaProductos.getProductById(5);
ListaProductos.getProductById(2);
ListaProductos.getProducts();
