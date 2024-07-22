import mongoose from "mongoose";
import usersModel from "../../models/user.model.js";

export default class User {
    getUsers = async () => {
        try {
            let users = await usersModel.find()
            return users
        } catch (error) {
            console.log(error)
            return null
        }
    }

    getUserById = async (uid) => {
        try {
            let user = await usersModel.findById(uid)
            return user;
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            throw new Error("Ocurrió un error al obtener el usuario");
        }
    }

    saveUser = async (user) => {
        try {
            let result = await usersModel.create(user)
            return result
        } catch (error) {
            console.log(error)
        }
    }

    updateUser = async (id, user) => {
        try {
            let result = await usersModel.updateOne({ _id: id }, { $set: user })
            return result
        } catch (error) {
            console.log(error)
        }
    }
}