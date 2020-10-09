const User = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")



const usersController = {

    createAccount: async (req, res) => {
        const { username, password, mail, name, surname, logInGoogle} = req.body
        let error = false
        const passwordHash = bcryptjs.hashSync(password.trim(), 10)
        
            const newUser = new User({ 
                name: name.trim().charAt(0).toUpperCase() + name.slice(1), 
                surname: surname.trim().charAt(0).toUpperCase() + surname.slice(1), 
                mail: mail.trim(), 
                username: username.trim(), 
                password: passwordHash, 
                logInGoogle})

            try{
                const res = await newUser.save()
                
            }
            catch(err){
                error = err
            }
            finally{
            if (error){
                res.json({
                    success: false,
                    response: error
                })
            }else{
            jwt.sign({ ...newUser }, process.env.SECRETORKEY, {}, (error, token) => {
                if (error) {
                    res.json({ success: false, error })
                } else {
                    res.json({ success: true, response:{token, name: newUser.name, username: newUser.username, role: newUser.role} })
                }
            })
            }
        }
        
    },


    userLogin: async (req, res) => {
        const { username, password } = req.body
        const userExist = await User.findOne({ username })

        if (!userExist) {
            res.json({
                success: false, message: "Usuario y/o contraseña incorrectos"
            })
        } else {
            const passwordMatches = bcryptjs.compareSync(password, userExist.password)

            if (!passwordMatches) {
                res.json({
                    success: false, message: "Usuario y/o contraseña incorrectos"
                })
            } 
            else {
                jwt.sign({ ...userExist }, process.env.SECRETORKEY, {}, (error, token) => {
                    
                    if (error) {
                        res.json({ success: false, error: "Ha ocurrido un error" })
                    } else {
                        res.json({success: true, 
                            response:{
                            token,
                            name: userExist.name,
                            username: userExist.username,
                            role: userExist.role
                            }
                        })
                    }
                })
            }

        }
    },

    tokenVerificator: (req, res) => {
        
        const name = req.user.name
        const username = req.user.username
        const token = req.user.token
        const role = req.user.role
        
        res.json({
            success: true, 
            response: {name, username, token, role}
        })
    
    },
    
    getUsersExist: async (req,res) =>{
        
        const username = req.body.username
        const userExist = await User.findOne({username})
        if (userExist){
            res.json({
                success:true,
                response: userExist
            })
        }else{
            res.json({
                success:false
            })
        }
    },
    getUserAddress: async (req,res) =>{
        
        const idUser = req.user._id
        
        const userExist = await User.findOne({_id:idUser})
        if (userExist) {
            res.json({
                success:true,
                response: userExist
            })
        }else{
            res.json({
                success:false
            })
        }
    },
    updateAddress: async (req, res) =>{
        const idUser = req.user._id
       
        const {address, city, province} = req.body
        const error = false 
        const userExist = await User.findOne({_id:idUser})

        if (userExist){
            var userUpdate = await User.updateOne({_id:idUser}, {address, city, province})
          
        } else {
            error = true
        }
        res.json({
            success: error ? false : true,
            response: error ? "User not updated" : "User updated"
        })

    },
    getUserInformation: async (req, res) => {
     
        const user = await User.findOne({...req.params})
        const {name, surname, province, city, address, DNI, username,} = user
        res.json({
            success: user ? true : false,
            userInfo:{
                name, surname, province, city, address, DNI, username
            }
        })
    },
    modifyCommentById: (req, res) => {
		const { commentId, comment } = req.body
		Comment.findByIdAndUpdate(commentId, { comment }, { new: true })
			.then(comment => res.json({ success: true, comment }))
			.catch(error => res.json({ success: false, error }))
	},
    editUser: async(req, res)=>{
      
        const user = await User.findOneAndUpdate({username: req.body.username},{$set:{...req.body}}, {new: true})
        .then(user=>{
          
            res.json({success:true, user: user})})
        .catch(err=>{
           
            res.json({success:false}, err)})
    }
}


module.exports = usersController