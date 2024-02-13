const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, { useNewUrlParser: true });

        console.log('Database connected successfully.');

    } catch (error) {
        console.log(error);
        throw new Error('Database error connection.');
    }
}

module.exports = {
    dbConnection
}
