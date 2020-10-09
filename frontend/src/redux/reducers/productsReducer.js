const initialState = {
    products: [],
    cartProducts: []
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS_USER':
            return {
                ...state,
                products: action.payload,
            }
        case 'ADD_TO_CART':

            
            var exist = false
            var newProducts =  state.cartProducts
            
            newProducts.map(product => {
                if (product.product._id === action.payload.product._id){
                    exist = true
                    
                    product.quantity = product.quantity + action.payload.quantity
                }
            })
            
            if (exist){
                localStorage.setItem('cart', JSON.stringify(newProducts))
                return {
                    ...state,
                    cartProducts:newProducts
                }
            }else{
                newProducts.push(action.payload)
                localStorage.setItem('cart', JSON.stringify(newProducts))
                return{
                    ...state,
                    cartProducts: newProducts
                }
            }
            
        case 'UP_QUANTITY':
            var newProducts = state.cartProducts
            
            newProducts.map(product =>{
                if (product.product._id === action.payload){
                    product.quantity +=1
                }
            })
            localStorage.setItem('cart', JSON.stringify(newProducts))
                return {...state , cartProducts:newProducts}   
        case 'DOWN_QUANTITY':
            var newProducts = state.cartProducts
            
            newProducts.map(product =>{
                if (product.product._id === action.payload){
                    product.quantity -=1
                }
            })
            localStorage.setItem('cart', JSON.stringify(newProducts))
                return {...state , cartProducts:newProducts}   
        case "DELETE_PRODUCT":
            var newProducts = state.cartProducts.filter( product =>
                product.product._id !== action.payload
            )
            localStorage.setItem('cart', JSON.stringify(newProducts))
            return{
                ...state,
                cartProducts: newProducts
            }
        case "FORCE_CART":
            var cart = JSON.parse(localStorage.getItem('cart'))
            
            return{
                ...state,
                cartProducts: cart
            }

        case "DELETE_CART":
        localStorage.removeItem('cart')
            return{
                ...state,
                cartProducts:[]
            }
        default:
            return state
    }
}

export default productsReducer