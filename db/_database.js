const Sequelize = require('sequelize')


const sequelize = new Sequelize({
    host: 'localhost',
    database: 'app',
    username: 'postgres',
    password: 1234,
    dialect: 'postgres',
    port: 5432,
    logging: true

});

module.exports = sequelize


async function teste(){
    try{
        let result = sequelize.authenticate()
        console.log('Sucesso ao conectar ao Banco........')
    }catch(err){
        console.log(err)

    }

}

teste()
