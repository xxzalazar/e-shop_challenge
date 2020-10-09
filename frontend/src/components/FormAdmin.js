import React, { useState } from 'react'
import { connect } from "react-redux"
import adminActions from '../redux/actions/adminActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const FormAdmin = (props) => {

    const listCategory = ['secos', 'refrigerados', 'congelados']

    const validationMinLength = ['name', 'description', 'category']
    const validationMinNumeric = ['price', 'stock']

    const [newProduct, setNewProduct] = useState({
        name:'',
        price:0,
        description:'',
        stock:0,
        category:'',
        photo:'',
        photo1:'',
    })

    const [errors, setErrors] = useState(newProduct)

    const readInput = e => {  

        let valueInput

        (e.target.name === 'price' || e.target.name === 'stock') 
            ? valueInput = parseInt(e.target.value) 
            : (e.target.name === 'category') 
                ? valueInput = listCategory[e.target.value - 1] 
                : valueInput = e.target.value
        
        setNewProduct({
            ...newProduct,
            [e.target.name]: valueInput
        })
    }

    const sendInfo = async e => {
        
        e.preventDefault()

        const errorsCopy = errors
        
        validationMinLength.map(property => {
            errorsCopy[property] = ((newProduct[property].length === 0)
            ? `The product must have a ${property}`
            : ""
        )})

        validationMinNumeric.map(property => {
            errorsCopy[property] = ((newProduct[property] <= 0)
            ? `the product must have a ${property} greater than 0`
            : 0
        )})

        setErrors({...errorsCopy})

        

        if (errors.name === "" && errors.price === 0 && errors.description === "" && errors.stock=== "" && errors.category=== "" && errors.rating=== 0 && errors.views === 0) {
            
          

            const response = await props.newProduct(newProduct)

            if (response.success) {
                
                
            }
            
        }
    }

    return (
        <>
            <div style={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'space-between',
                marginBottom:'5%'
            }}>

                <div className="input-group">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon3">Nombre</span>
                        </div>
                        <input name='name' onChange={readInput} type="text" className="form-control"/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon3">Precio</span>
                            <span className="input-group-text">$</span>
                        </div>
                        <input name='price' onChange={readInput} type="number" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon3">Descripción</span>
                        </div>
                        <input name='description' onChange={readInput} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon3">Stock</span>
                        </div>
                        <input name='stock' onChange={readInput} type="number" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Categoría</label>
                        </div>
                        <select name='category' onChange={readInput} className="custom-select" id="inputGroupSelect01">
                            <option defaultValue>Elegir..</option>
                            <option value="1">Secos</option>
                            <option value="2">Refrigerados</option>
                            <option value="3">Congelados</option>
                        </select>
                    </div>
                </div>

                <div className="row d-flex">
                    <div className=" d-flex col-md-12 p-2">
                        <button onClick={sendInfo} className="btn btn-success btn-lg btn-block" ><FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon> Enviar </button>
                    </div>
                </div>
                
                {/* <label style={colorWhite}>Photo Product</label>
                <input style={{
                    borderRadius: '3vw'
                }} type='text' name='photo' placeholder='Write the product photo (url)'
                    onChange={readInput} />

                <label style={colorWhite}>Photo1 Product</label>
                <input style={{
                    borderRadius: '3vw'
                }} type='text' name='photo1' placeholder='Write the product photo1 (url)'
                    onChange={readInput} />   */}

            </div>
        </>
    )
}

const mapDispatchToProps = {
    newProduct: adminActions.newProduct,
}

export default connect(null, mapDispatchToProps)(FormAdmin)