let joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            // console.log(req.body.judulCampaign)
            const result = joi.validate(req.body, schema);
            if (result.error){
                return res.status(400).json(result.error);
            }

            if (!req.value) {
                req.value = {};
            }
            req.value['body'] = result.value;
            next();
        }
    },
    schemas: {
        login: joi.object().keys({
            username: joi.string().required(),
            password: joi.string().required(),
        }),
        addUser: joi.object().keys({
            name: joi.string().required(),
            username: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required(),
            otoritas: joi.string().required(),
        }),
        editUser: joi.object().keys({
            name: joi.string().optional(),
            username: joi.string().optional(),
            email: joi.string().email().optional(),
            password: joi.string().optional(),
            otoritas: joi.string().optional(),
        }),
    }
}