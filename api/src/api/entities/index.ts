
import * as sequelize from "sequelize";

// import { UserEntity } from "./Comment.Entity";


export const dbConnection = new sequelize.Sequelize(
    (process.env.DB_NAME = "test"),
    (process.env.DB_USER = "root"),
    (process.env.DB_PASSWORD = ""),
    {
        port: Number(process.env.DB_PORT) || 3306,
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        pool: {
            min: 0,
            max: 5,
            acquire: 30000,
            idle: 10000,
        },
    }
);
export enum DBs{
    Users = 'Users',
    Comment = 'Comment'
}
export enum Prefixes{
    CommentProductPrefix = 'CP',
}
// SOMETHING VERY IMPORTANT them Factory functions expect a
// sequelize instance as parameter give them `dbConfig`

// export const userEntity = UserEntity(DBs.Users, dbConnection);
// userEntity.sync();
// let uEnt = UserEntity(DBs.Users+'sfasfs',dbConnection);
export const SyncDatabase = async () => {
    console.log('sync all models');
    //await userEntity.sync({ force: true, alter: true });

}
