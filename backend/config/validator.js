const Joi = require("@hapi/joi")


const validador = {
    validarDatos: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().min(4).required().trim().error(() => { return res.json ({ message: 'Lo siento, el nombre debe contener más de 3 caracteres', });}),
            surname: Joi.string().min(4).required().trim().error(() => { return res.json ({ message: 'Lo siento, el apellido debe contener más de 3 caracteres.', });}),
            user: Joi.string().min(4).trim().required().error(() => { return res.json ({ message: 'Lo siento, el usuario debe contener más de 3 caracteres.', });}),
            password: Joi.string().min(6).trim().required().error(() => { return res.json ({ message: 'La clave debe contener más de 6 caracteres.', });}),
            mail: Joi.string().email().required().trim().error(() => { return res.json ({ message: 'El email debe contener "@" y ".com, .net ..."', });}),
            logInGoogle: Joi.boolean()
        })

        const validacion = schema.validate(req.body, { abortEarly: false })
        if (validacion.error !== undefined) {
            return res.json({
                success: false,
                error: ('Error'),
                message: validacion.error
            })
        }
        
        next()

    }
}


module.exports = validador