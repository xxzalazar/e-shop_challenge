import React,{useEffect, useRef, useState} from 'react';
import { withRouter } from 'react-router-dom'

const Paypal = (props) => {

    

    const redirect = () => {
        props.history.push('/gracias')
    }

    const paypal = useRef()
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) =>{
                return actions.order.create({
                    intent:'CAPTURE',
                    purchase_units:[
                        {description: 'Felices las vacas', amount:{
                            value: parseFloat(Number(props.total).toFixed(2)),
                            currency_code: 'USD'
                        }}
                    ]
                })
            },
            onApprove: async(data, actions)=>{
                const order= await actions.order.capture()
                console.log(order)
                redirect()
            },
            onError: (err)=>{
                console.log(err)
                redirect()
            }
        }).render(paypal.current)
    },[])

    return (
        
        <>
          <div ref={paypal}></div>  
        </>
    )
}

export default withRouter(Paypal)