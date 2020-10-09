const initialState = {
    name: "",
    username: "",
    token: "",
    role:"",
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                name: action.payload.name,
                username: action.payload.username,
                token: action.payload.token,
                role: action.payload.role,
            }
        case 'UPDATE_USER':

            return {
                ...state,
                name: action.payload.name,
                username: action.payload.username,
                token: action.payload.token,
                role: action.payload.role
            }

        case "UNLOG_USER_FROM_APP":
            localStorage.clear()
            return{
                ...state,
                username:"",
                token:"",
                name:"",
                role:""
            }
            
        default:
            return state
    }
}


export default usersReducer