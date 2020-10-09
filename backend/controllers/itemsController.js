const Product = require('../models/itemModel');
const nodeMailer = require('nodemailer')


var transport = nodeMailer.createTransport({
    port:465, 
    host:"smtp.gmail.com",
    auth: {
        pass: "123456789Emi",
        user: "emiruffini5@gmail.com"
    },
    tls: { rejectUnauthorized: false }
})

const itemsController = {
    newProduct: async (req, res) => {
        const newProduct = new Product({...req.body})
        newProduct
        .save()
        .then(resp => res.json({ success: true, response: newProduct }))
        .catch(error => res.json({ success: false, error }))
    },
    getProducts: async (req, res) => {
        const products = await Product.find()
		res.json({ success: true, products })
    },
    deleteProductById: (req, res) => {
        var id = req.params.id
        Product.findByIdAndDelete({_id: id})
        .then(() => res.json({success: true, res: "El producto ha sido eliminado con éxito."}))
        .catch(err=>res.json({success:false, error: err}))	
    },
    getProductById: async (req,res) => {
        var id = req.params.id
        
        try{
        const product= await Product.findOne({_id:id})
        
        res.json({
            success: true,
            response: {product}
        })
        }catch(error){
            res.json({
                success: false,
                error
            })
        }
    },
    modifyStockProduct: async (req,res) => {

        const idProduct = req.params.id
        const { cantStock } = req.body

        const productModify = await Product.findOne({ _id: idProduct })

        const newCantStock = productModify.stock + cantStock

        await Product.findOneAndUpdate({ _id: idProduct }, { stock: newCantStock })
        
        res.json({
            success:true,
            productModify
        })
    },
    modifyPropertyTotalProduct: async (req, res) => {
        const idProduct = req.params.id
        const { cantModify, aProperty } = req.body

        const newModify = await Product.findOneAndUpdate({ _id: idProduct }, { [aProperty]: cantModify })

        res.json({
            success:true,
            newModify
        })
    },

    confirmBuy: async (req, res) =>{

        /* Productos que compró */
        const products= req.body
        
        /* Datos del usuario */
        const email = req.user.mail
        const nombre = req.user.name
        const dirección = req.user.address
        const ciudad = req.user.city
        const banner = "https://i.postimg.cc/prKfvphR/productos.jpg"
        const logo = "https://i.postimg.cc/rmdndBws/logo.png"

        /* Productos que compró (datos a renderizar) */
        var listaDeProductos = ''

        products.map((productoComprado) => {
            listaDeProductos += `<hr>
            <li>
                <div style= "display: flex;
                        justify-content: space-between;
                        align-items: center;">
                    
                    <img src="${productoComprado.product.photo}" 
                    alt="Imagen del producto" 
                    style="height: 100px; border: 2px solid black">

                    <pre>   ${productoComprado.product.name}, cantidad: ${productoComprado.quantity}, precio $ ${productoComprado.product.price} c/u.</pre>
                       
                </div>
                <p>Total: $ ${productoComprado.quantity * productoComprado.product.price} </p> 
            </li>
            <hr>
            `
        })

        

        try{
            const asyncRes = await Promise.all(products.map(async (product) => {
                
                const productSaved = await Product.findOne({_id : product.product._id})
                const newStock = productSaved.stock - product.quantity
                const act = await Product.updateOne({_id:productSaved._id}, {stock:newStock}) 
              
            }));
            console.log(products)
            https://postimg.cc/QKx9kNJy
            var mailOptions = {
                from: "Felices Las Vacas <notresponse@notreply.com>",
                sender: "Felices Las Vacas <notresponse@notreply.com>",
                to: `${email}`,
                subject: "Compra confirmada",
                html:  `<div style="height: 100vh;
                            width: 100%;overflow-y: scroll">
                        <img src= "${banner}"  style="height: 50vh;
                        width: 100%;">
                        
                    <div > 
                        <h1 style="color: #048f55;">Hola ${nombre}!</h1>
                        <h4 style="color: #048f55;">Su pedido ha sido confirmado, estamos procediendo a despachar su pedido de:</h4>
                        <ul> ${listaDeProductos} </ul>
                        <br>
                        <h2 style="color: #048f55;"><pre> A despachar en la dirección indicada como:  ${dirección}, ${ciudad}</pre>
                            <br>
                            Esperamos verlo devuelta pronto!
                        </h2>
                        <br>
                        <h4 style="color: #048f55; font-weight: bold;">Ante cualquier cambio de dirección o por cualquier consulta, puede comunicarse con nosotros haciendo click <a href="mailto:feliceslasvacas@gmail.com?Subject=Aquí%20el%20asunto%20del%20mail"> ${' '} aquí ${' '} </a>, o vía web.</h4>
                        <div style="display: flex; 
                            align-items: center;
                            justify-content: space-around;
                            margin: 4vh;
                            margin-top: 10vh;
                            margin-bottom: 10vh;">

                            <img src= "${logo}"  style="height: 100px;
                            width: 100px;
                            margin-left: 15vw;">

                            <h4 style="font-weight: bolder;
                                        margin-left: 15vw;">
                                Equipo de Felices las Vacas.
                            </h4>
                        
                        </div>
                    </div>
                </div>`,
                
            }
            transport.sendMail(mailOptions, (error, info) => {
                res.send("email enviado")
            })
            res.json({
                success:true,
                response: "compra confirmada"
            })
        }catch(error){
            res.json({
                success:false,
               response: error
            })
        }
    }
}
module.exports= itemsController