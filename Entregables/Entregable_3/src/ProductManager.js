const fs = require('fs');

class  ProductManager{
    static id = 1;
    #path = './src/productos.json';
    #listaProductos = [];

    constructor(){
        try{
            this.productosDefault();
        }
        catch (error){
            console.log("La ruta debe contener algun dato");
            return false;
        }
    }

    async productosDefault(){
       this.addPoductArray('Jugo','Agua con azucar y colorante',200,'../Img/Jugo.png','BD35',10);
       this.addPoductArray('Libro','Contiene informacion de ...',35000,'../Img/Libro.png','WJSTR',20);
       this.addPoductArray('Helado','Helado de manzana con sabor a limon',4000,'../Img/Helado.png','2ETLRO',35); 
       this.addPoductArray('Cafe','100% grano molido',4500,'../Img/Cafe.png','EF1MG',40);
       this.addPoductArray('Especias','mescla de especias para cocinar',1000,'../Img/Especias.png','SEPM26',30);
       this.addPoductArray('Arroz','Arroz Grado 2 Bolsa, 1 kg',1600,'../Img/Arroz.png','ZA2G1',60);
       this.addPoductArray('Empanadas','Empanadas congeladas',2500,'../Img/Empanadas.png','PM18C',25);
       this.addPoductArray('Doritos','Doritos Queso',800,'../Img/Doritos.png','SD81Q',100);
       this.addPoductArray('Galletas','Galleta Nik Bocado',500,'../Img/Galletas.png','G10N3',600);
       this.addPoductArray('Manzana','Manzana Royal Bolsa, 1 kg',1700,'../Img/Manzana.png','ZNM1R',30);

       this.escribirEnArchivo(this.#listaProductos);
    }


    addPoductArray(title,description,price,thumbnail,code,stock) {      
    
        try {
            const pruducto = {
                id: ProductManager.id ++,
                title,description,price,thumbnail,code,stock
            };
            this.#listaProductos.push(pruducto);
           
        } catch (error) {
          console.log(error);
        }
    }

    async escribirEnArchivo(data) {
        await fs.promises.writeFile(
            this.#path,
            JSON.stringify(data, null, '\t')
        );
    }

    async getProductsLimit(limit) {
        const productos = await this.leerArchivo();
        return productos.slice(0,limit);
    }

    async leerArchivo() {
        const data = await fs.promises.readFile(this.#path, 'utf-8');        
        return JSON.parse(data);
    }

    async getProductById(id) {
        const productos = await this.leerArchivo();
        const producto = productos.filter((producto) => producto.id === id);
        return producto;
    }
  
}

module.exports = ProductManager;