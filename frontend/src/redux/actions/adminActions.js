import axios from "axios"

const adminActions = {

    newProduct: (aProduct) => {
        return async (dispatch, getState) => {
            const res = await axios.post("http://127.0.0.1:4000/api/items", aProduct)

            dispatch({
                type: 'SEND_PRODUCT'
            })
            
            return {
                success: true,
                res: res,
            }

        }
    },

    getProducts: () => {
        return async (dispatch, getState) => {
            
            const res = await axios.get("http://127.0.0.1:4000/api/items")

            dispatch({
                type: 'GET_PRODUCTS',
                payload: res.data.products,
            })
        }
    },

    modifyStock: (cantStock, idProduct) => {
        return async(dispatch, getState) => {
            const res = await axios.put(`http://127.0.0.1:4000/api/items/stocks/${idProduct}`, {cantStock})
        }
    },

    modifyTotal: (cantModify, idProduct, aProperty) => {
        return async(dispatch, getState) => {
            const res = await axios.put(`http://127.0.0.1:4000/api/items/total/${idProduct}`, {cantModify, aProperty})
        }
    },

    deleteProduct: (idProduct) => {
        return async(dispatch, getState) => {
            const res = await axios.delete(`http://127.0.0.1:4000/api/items/${idProduct}`)
        }
    }
}

export default adminActions