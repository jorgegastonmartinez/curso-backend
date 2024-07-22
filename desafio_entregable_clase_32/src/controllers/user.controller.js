import mongoose from 'mongoose';
import User from '../dao/user/user.dao.js'

const usersService = new User()

export const getUsers = async (req, res) => {
    let result = await usersService.getUsers()
    res.send({ status: "success", result })
}

export const getUserById = async (req, res) => {
    const { uid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(uid)) {
        return res.status(400).send({ status: "error", message: "El usuario buscado, no existe" });
    }
    try {
        const user = await usersService.getUserById(uid);
        if (!user) {
            return res.status(404).send({ status: "error", message: "Usuario no encontrado" });
        }

        res.send({ status: "success", result: user });
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).send({ status: "error", message: "Error al obtener el usuario" });
    }
};

export const saveUser = async (req, res) => {
    const user = req.body
    let result = await usersService.saveUser(user)
    res.send({ status: "success", result })
}