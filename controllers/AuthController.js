const { response, request } = require('express');

const login = (req = request, res = response) => {
    console.log("hi")

}

module.exports = { login }