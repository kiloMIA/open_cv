const UserModel = require("../models/userModel")
const bcrypt = require("bcryptjs");
const path = require("path")
const User = require("../models/userModel");

exports.find = (req, res) => {
    User.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message: err.message || "ERROR: User is not found during the search"})
        })
};
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "There should be something, in order to update information"
        });
    }

    const id = req.params.id;

    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
exports.destroy = async (req, res) => {
    await UserModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        } else {
            res.send({
                message: "User deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
exports.create = async (req, res) => {
    const {name, surname, email, password: plainTextPassword } = req.body
    if (plainTextPassword.length <= 8) {
        return res.json({
            status:'error',
            error: "Invalid password, should be at least 8 characters"
        })
    }
    const pass = req.body.checkPass
    const password = await bcrypt.hash(plainTextPassword, 10)
    if (pass !== plainTextPassword) {
        return res.send({
            status:'error',
            error: "Passwords are not the same"
        })
    }

    try {
        const response = await UserModel.create({
            name,
            surname,
            email,
            password
        })
        console.log("User has been created" + response)
    } catch (e) {
        if (e.code === 11000) {
            return res.json({
                status: 'error',
                error: "Email is already in use!"
            })
        }
        console.log(e)
        return res.json({status: 'error', error: "An error occurred, please, try again"})
    }
    res.render(path.resolve("views/index.ejs"))
}
exports.login = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email: email}).lean()
    if (!user) {
        return res.json({status:'error', error:"Invalid email/password"})
    }

    if (await bcrypt.compare(password, user.password)) {
        const token = {
            id: user._id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            password: user.password
        }

        return res.render(path.resolve('views/index.ejs'), {users: token})
    }

    res.json({status:'error', error:"Invalid email/password"})
}
exports.logout = (req, res) => {
    res.clearCookie("token")
    return res.json({
        message: "User sign out successful"
    })
    return res.render(path.resolve('views/index.ejs'), {users: token})
}
