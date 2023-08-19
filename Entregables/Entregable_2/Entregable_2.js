/**
 [Tutor] Gabriel
Hola, Adrian! Cómo estás? La entrega está aprobada!
Al ejecutar se crea el json, el id es autoincremental, se agregan los productos y se validan los campos.

Como detalles se encuentra un await innecesario en la linea 38: let existe = fs.existsSync(this.#path);
Este metodo es sincronico, por lo que el await no haría nada, de  hecho, cuando esto pasa,
verás tres puntitos por debajo de un await, en donde te dirá que no tiene efecto la expresión.

Me gustó mucho que hayas decidido encapsular la lógica de leerArchivo y agregarListaProductoArchivo,
sin embargo también hay writeFile en los métodos, por lo que hay mucho código replicado, 
muy probablemente haya sido porque empezaste creando código y agregaste estos métodos de leerArchivo y 
agregarLista posteriormente. De cualquier forma, la idea es correcta, también es importante siempre 
ordenar el código y ver en que afecta esta nueva idea al proyecto en el que uno está trabajando.

Felicitaciones por la entrega!
Nos vemos en clase!

17/08 16:35
*/
const fs = require('fs');

class  ProducManager{
    static id = 0;
    #path = '';

    constructor(path_file){
        try{
            if(path_file.trim().length != 0){
                this.#path = path_file;
                console.log("Ruta de archivo guardada");
                return true;
            }
            
            console.log("La ruta debe contener algun dato");
            return false;
        }
        catch (error){
            console.log("La ruta debe contener algun dato");
            return false;
        }
    }


    async addPoduct(title,description,price,thumbnail,code,stock) {      
    
        try {

            if(this.validarDatos(title,description,price,thumbnail,code,stock)){
                return false;
            }

            await this.obtenerUltimoID();
            const pruducto = {
                id: ProducManager.id ++,
                title,description,price,thumbnail,code,stock
            };
            //let existe = await fs.existsSync(this.#path);
            //coreccion 
            let existe = fs.existsSync(this.#path);
            if (existe) {
                const contenidoArchivo = await this.leerArchivo();
                contenidoArchivo.push(pruducto);
                await this.agregarListaProductoArchivo(contenidoArchivo);
            }
            else {                
                const listaProductos = [];
                listaProductos.push(pruducto);        
                await this.agregarListaProductoArchivo(listaProductos);
            }
        } catch (error) {
          console.log(error);
        }
    }

    async leerArchivo() {
        const data = await fs.promises.readFile(this.#path, 'utf-8');        
        return JSON.parse(data);
    }
    
    //se agrego este metodo como correccion
    async escribirEnArchivo(data) {
        await fs.promises.writeFile(
            this.#path,
            JSON.stringify(data, null, '\t')
        );
    }
    
    async agregarListaProductoArchivo(lista) {
        try{
            this.escribirEnArchivo(lista);
            console.log('Producto agregado');
        }catch(e){
            console.log('Error al agregar el producto');
        }
    }

    async obtenerUltimoID() {  
        if (fs.existsSync(this.#path) && ProducManager.id === 0) {
            const contenidoArchivo = await this.leerArchivo();
            let newID = contenidoArchivo.reduce((prev,current) => {
                let ultimoID = prev.id > current.id ? prev : current;
                return ultimoID;
            });
            ProducManager.id = newID.id + 1 ;
        }
    }

    async deleteProduct(id) {
        const productos = await this.leerArchivo();
        const productosFiltrados = productos.filter(({id}) => id != id);
        this.escribirEnArchivo(productosFiltrados);
    }

    async getProducts() {
        const productos = await this.leerArchivo();
        return productos;
    }

    async getProductById(id) {
        const productos = await this.leerArchivo();
        const producto = productos.filter((producto) => producto.id === id);
        return producto;
    }


    async updateProductById(id,title,description,price,thumbnail,code,stock) {
        if(this.validarDatos(title,description,price,thumbnail,code,stock)){
            return false;
        }
        const productos = await this.leerArchivo();
        const productosActualizado = productos.filter((producto) => {
            if(producto.id === id){
                producto.title = title;
                producto.description = description;
                producto.price = price;
                producto.thumbnail = thumbnail;
                producto.code = code;
                producto.stock = stock;                
            }
            return producto;
        });
        this.escribirEnArchivo(productosActualizado);
    }

    validarDatos(title,description,price,thumbnail,code,stock){
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Todos los valores del producto tienen que ser enviados.');
            return true;
        }
        return false;
    }

}

const probarClase = async () => {
    const productos = new ProducManager('./productos.json');
    await productos.addPoduct('Jugo','Agua con azucar y colorante',200,'../Img/Jugo.png','BD35',10);
    await productos.addPoduct('Libro','contiene informacion de ...',35000,'../Img/Libro.png','WJSTR',20);
    await productos.addPoduct('Helado','Helado de manzana con sabor a limon',4000,'../Img/Helado.png','2ETLRO',35);    

    productos.getProducts().then((resultado) => {console.log(resultado)});
    await productos.deleteProduct(2);
    await productos.updateProductById(0,'Jugo','100% exprimido',200,'../Img/Jugo.png','BD35',10);
    productos.getProductById(0).then((resultado) => {console.log(resultado)});
};
  

probarClase();



