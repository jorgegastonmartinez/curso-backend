// aqui esta el Schema del usuario
// al ser "unique: true", dice que tiene que ser unico ese email
// en password podria ir al bcript 

import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
});

const firstCollection = mongoose.model(userCollection, userSchema);

export default firstCollection;