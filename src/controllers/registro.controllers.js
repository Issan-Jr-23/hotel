import User from "../models/user.model.js";
export const resgistro = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        const token = jwt.sign({ _id: user._id }, 'YOUR_SECRET_KEY');  // Cambia 'YOUR_SECRET_KEY' por una clave secreta
        res.status(201).send({ success: true, token });
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
};