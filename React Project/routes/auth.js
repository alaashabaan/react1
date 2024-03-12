const router=require("express").Router();
const {User}=require("../models/user")
const Joi=require("joi")
const bcrypt= require("bcrypt");

// router.post("/", async (req, res) => {
//     try {
//         const { error } = validate(req.body);
//         if (error)
//             return res.status(400).send({ message: error.details[0].message });
//         const user = await User.findOne({ email: req.body.email });
//         if (!user)
//             return res.status(401).send({ message: "Invalid mail or password" });
//         const validPassword = await bcrypt.compare(
//             req.body.password, user.password
//         );
//         if (!validPassword)
//             return res.status(401).send({ message: "Invalid mail or password" });

//         const token = user.generateAuthToken();
//         res.status(200).send({ data: token, message: "Logged in successfully" })

//     } catch (error) {
//         res.status(500).send({ message: "internal server error" });
//     }
// })

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            if (error.details && error.details.length > 0) {
                return res.status(400).send({ message: error.details[0].message });
            } else {
                return res.status(400).send({ message: error.message });
            }
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: "Invalid mail or password" });
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );
        if (!validPassword)
            return res.status(401).send({ message: "Invalid mail or password" });

        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully" })

    } catch (error) {
        res.status(500).send({ message: "internal server error" });
    }
})


const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"), // Added email() for email validation
        password: Joi.string().required().label("Password"), // Removed Joi.passwordComplexity()
    });
    return schema.validate(data);
};


module.exports=router;