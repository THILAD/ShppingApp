import { BuildOptions, DataTypes, Model, ModelAttributes, Sequelize } from "sequelize";
import { BaseModel } from "./base.model";
// import * as bcryptjs from 'bcryptjs';
//1. attribute
export interface CommentAttributes extends BaseModel {
    orderId: number;
    productId: number;
    content: string;
    status: string;
    userId: number;
    parentId: number;
    score:number;
}
// 2. model
export interface CommentModel extends Model<CommentAttributes>, CommentAttributes {
    // prototype: {
    //     validPassword: (password: string) => boolean;
    //     hashPassword: (password: string) => string;
    // };
}
// 3. example
export class Comment extends Model<CommentModel, CommentAttributes> {
    // prototype: {
    //     validPassword: (password: string) => boolean;
    //     hashPassword: (password: string) => string;
    // };
}
//4. static
export type CommentStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): CommentModel;
};
// 5. entity
export const CommentEntity = (name: string, sequelize: Sequelize): CommentStatic => {

    
    const attributes: ModelAttributes<CommentModel> = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull:false
        },
        orderId: {
            type: DataTypes.INTEGER, allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER, allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER, allowNull: false
        },
        parentId: {
            type: DataTypes.INTEGER, allowNull: true
        },
        score: {
            type: DataTypes.INTEGER, allowNull: false
        },

    content: {
            type: DataTypes.TEXT, allowNull: false
        },
        status: {
            type: DataTypes.STRING, allowNull: false,
        },
        
    } as ModelAttributes<CommentModel>;
    // 6. define
    let x = sequelize.define(name, attributes, { tableName: name, freezeTableName: true });
    
    // 7. define method
    // x.prototype.hashPassword = function (password: string): string {
    //     if(!password) return '';
    //     return this.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync())
    // }
    // x.prototype.validPassword = function (password: string): boolean {
    //     if (bcryptjs.compareSync(password+this.userName+this.phoneNumber, this.password)) return true;
    //     return false;
    // }
    // // 8. before create
    // x.beforeCreate(async (user, options) => {
    //     if (user.changed('password')) {
    //         return bcryptjs.hash(user.password+user.userName+user.phoneNumber, bcryptjs.genSaltSync())
    //         .then(hash => {
    //             user.password = hash;
    //         })
    //         .catch(err => {
    //             throw new Error(err);
    //         });
    //     }
    // });
    // x.beforeUpdate(async (user, options) => {
    //     if (user.changed('password')) {
    //         return bcryptjs.hash(user.password+user.userName+user.phoneNumber, bcryptjs.genSaltSync())
    //         .then(hash => {
    //             user.password = hash;
    //         })
    //         .catch(err => {
    //             throw new Error(err);
    //         });
    //     }
       
    // });
    return x;
}