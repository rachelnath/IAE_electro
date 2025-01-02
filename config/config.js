import { Sequelize } from "sequelize";

const db = new Sequelize({
    host:"localhost",
    dialect:"mysql",
    username:"root",
    password:"",
    database:"e_commerce"
})
export default db