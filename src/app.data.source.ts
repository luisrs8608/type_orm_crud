import {DataSource} from 'typeorm';

const AppDataSource = new DataSource({
    "type": "postgres",
    "host": "localhost",
    "port": 5433,
    "username": "postgres",
    "password": "postgres",
    "database": "typeorm_test",
    "synchronize": true,
    "logging": false,
    "entities": [
       "dist/models/**/*.js"
    ]
})
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export {AppDataSource}