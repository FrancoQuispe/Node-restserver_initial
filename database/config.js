const mongoose = require('mongoose');


const dbConnection = async() =>{

    try {

        await mongoose.connect(process.env.MONGODB_CDN);
        console.log('Base de datos online');
        
    } catch (error) {

        console.log(error);
        throw new Error('Error a la hora de inicar la base de datos');

    }

}

module.exports = {
    dbConnection
}