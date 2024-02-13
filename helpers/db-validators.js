const Role = require('../models/Role');
const User = require('../models/User');

const isRoleValid = async (role = '') => {

    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`The role: ${role} is not valid.`);
    }
}

const emailExist = async (email = '') => {

    // Verificar si el email existe
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`The email: ${email}, is already exist.`);
    }
}

const userExistById = async (id) => {

    // Verificar si el email existe
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`The id: ${id} is not exist: ${id}`);
    }
}

module.exports = {
    isRoleValid,
    emailExist,
    userExistById
}

