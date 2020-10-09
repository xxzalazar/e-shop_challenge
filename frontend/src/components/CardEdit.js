import React, {useState} from 'react'
import { connect } from "react-redux"
import adminActions from '../redux/actions/adminActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight, faCheck} from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'reactstrap'

const CardEdit = (props) => {

    const [tooltipOpenConfirm, setTooltipOpenConfirm] = useState(false)
    const [tooltipOpenConfirmPrice, setTooltipOpenConfirmPrice] = useState(false)
    const [tooltipOpenPlus, setTooltipOpenPlus] = useState(false)
    const [tooltipOpenLess, setTooltipOpenLess] = useState(false)
    const [tooltipOpenConfirmDelete, setTooltipOpenConfirmDelete] = useState(false)

    const toggleConfirm = () => {
        setTooltipOpenConfirm(!tooltipOpenConfirm)
    }
    const togglePlus = () => {
        setTooltipOpenPlus(!tooltipOpenPlus)
    }
    const toggleLess = () => {
        setTooltipOpenLess(!tooltipOpenLess)
    }
    const toggleConfirmPrice = () => {
        setTooltipOpenConfirmPrice(!tooltipOpenConfirmPrice)
    }
    const toggleConfirmDelete = () => {
        setTooltipOpenConfirmDelete(!tooltipOpenConfirmDelete)
    }

    const [modify, setModify] = useState({
        cantModifyStock: 0,
        cantModifyPrice: 0,
        viewMoreStock: false,
        viewMorePrice: false,
        viewMoreDelete: false,
    })

    const viewSwitch = (aProperty) => {
        
        if(aProperty === 'stock') {
            setModify({
                ...modify,
                viewMoreStock: !modify.viewMoreStock,
            })}

        if(aProperty === 'price'){
            setModify({
                ...modify,
                viewMorePrice: !modify.viewMorePrice,
            })}

        if(aProperty === 'delete')
            setModify({
                ...modify,
                viewMoreDelete: !modify.viewMoreDelete,
            })
    }

    const readInput = e => {
        
        setModify({
            ...modify,
            [e.target.name]: (e.target.name === 'cantModifyStock') ? parseInt(e.target.value) : e.target.value
        })
    }

    const editCant = async (cantModify, aProperty) => {
        

        if(aProperty === 'oneStock') {
            (props.product.stock + cantModify < 0) 
                ? await props.modifyStock( (-props.product.stock), props.product._id ) 
                : await props.modifyStock( cantModify, props.product._id )
        }
        else{
            (cantModify < 0) 
                ? await props.modifyTotal( 0, props.product._id, aProperty) 
                : await props.modifyTotal( cantModify, props.product._id, aProperty )
            viewSwitch(aProperty)
        }

        props.getProducts()
            
    }

    const deleteProduct = async() => {
        await props.deleteProduct(props.product._id)
        props.getProducts()
    }

    const styleProperty = {
        paddingTop: "2px",
        paddingBottom: "2px",
        borderRadius: "0.5rem",
        background: "white",
        justifyContent: "space-between",
        marginBottom: "10px",
        marginLeft: "10px"
    }

    return (
        <>
            <div style={{
                padding: "3%",
                marginTop: "3%",
                marginBottom: "3%",
                background: "#85cc88a4",
            }} className="container ">

                <div className="row">
                    <div className="col-md-3 col-sm-12">
                        <div className="profile-img" style={{
                            backgroundImage: `url(${props.product.photo})`, 
                            height: '38vh', 
                            width: '20vw',
                            marginRight:"90%",
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                        </div>
                    </div>
                    <div className="flex col-md-9">
                        <div style={styleProperty} className="row col-md-12" >
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <div className="flex text-primary">{props.product.name}</div>
                            </div>
                        </div>
                        
                        <div style={styleProperty} className="row col-md-12" >
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <div className="flex">Categoría: <span className="text-danger">{props.product.category}</span></div>
                            </div>
                        </div>
                        <div style={styleProperty} className="row col-md-12" >
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <div className="flex">Descripción: {props.product.description}</div>
                            </div>
                        </div>
                        <div style={styleProperty} className="row col-md-12" >
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <div className="flex">Stock: {props.product.stock}</div>
                            </div>
                            {modify.viewMoreStock && 
                                <>
                                    <div>
                                        <span id="TooltipPlus" className="flex"><button onClick={() => editCant(-1, 'oneStock')} className='btn btn-secondary'><FontAwesomeIcon icon={faCaretLeft}/></button></span>
                                        <Tooltip placement="top" isOpen={tooltipOpenPlus} target="TooltipPlus" toggle={togglePlus}>-1</Tooltip>
                                    
                                        <span id="TooltipLess" className="flex ml-1"><button onClick={() => editCant(1, 'oneStock')} className='btn btn-secondary'><FontAwesomeIcon icon={faCaretRight}/></button></span>
                                        <Tooltip placement="top" isOpen={tooltipOpenLess} target="TooltipLess" toggle={toggleLess}>+1</Tooltip>
                                    </div>    
                                    <input type='number' name='cantModifyStock' onChange={readInput} placeholder='Quantity to modify'/>

                                    <span  id="TooltipConfirm" className="flex"><button onClick={() => editCant(modify.cantModifyStock, 'stock')} className='btn btn-secondary'><FontAwesomeIcon icon={faCheck}/></button></span>
                                    <Tooltip placement="top" isOpen={tooltipOpenConfirm} target="TooltipConfirm" toggle={toggleConfirm}>Confirm</Tooltip>
                                
                                </>
                            }
                            <button onClick={() => viewSwitch('stock')} className='btn btn-primary'>{modify.viewMoreStock ? "Cancel" : 'Modify stock'}</button>
                        </div>
                        <div style={styleProperty} className="row col-md-12" >
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <div className="flex">Price: {props.product.price}$</div>
                            </div>
                            {modify.viewMorePrice && 
                                <>
                                    <input type='number' name='cantModifyPrice' onChange={readInput} placeholder='New price'/>
                                    <span id="TooltipConfirmPrice" className="flex"><button onClick={() => editCant(modify.cantModifyPrice, 'price')} className='btn btn-secondary'><FontAwesomeIcon icon={faCheck}/></button></span>
                                    <Tooltip placement="top" isOpen={tooltipOpenConfirmPrice} target="TooltipConfirmPrice" toggle={toggleConfirmPrice}>Confirm</Tooltip>
                                </>
                            }
                            <span><button onClick={() => viewSwitch('price')} className='btn btn-primary'>{modify.viewMorePrice ? "Cancel" : 'Modify price'}</button></span>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div style={styleProperty} className="row col-md-12" >
                                    <div className="flex">Views: {props.product.views}</div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div style={styleProperty} className="row col-md-12" >
                                    <div className="flex">Rating: {props.product.rating}</div>
                                </div>
                            </div>
                        </div>
                        <div className="row col-md-12 justify-content-center">
                            {modify.viewMoreDelete && 
                                <>
                                    <span  id="TooltipConfirmDelete" className="flex"><button onClick={() => deleteProduct()} className='btn btn-secondary'><FontAwesomeIcon icon={faCheck}/></button></span>
                                    <Tooltip placement="top" isOpen={tooltipOpenConfirmDelete} target="TooltipConfirmDelete" toggle={toggleConfirmDelete}>Confirmar</Tooltip>
                                </>
                            }
                            <button onClick={() => viewSwitch('delete')} className='btn btn-danger ml-1'>{modify.viewMoreDelete ? "Cancel" : 'Delete'}</button>
                        </div>
                    </div>
                </div>

            </div>
        </> 
    )
}

const mapDispatchToProps = {
    deleteProduct: adminActions.deleteProduct,
    modifyStock: adminActions.modifyStock,
    modifyTotal: adminActions.modifyTotal,
    getProducts: adminActions.getProducts
}

export default connect(null, mapDispatchToProps)(CardEdit)