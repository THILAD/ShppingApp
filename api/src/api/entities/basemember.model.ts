import { BaseModel } from './base.model';
import * as bcryptjs from "bcryptjs";
export class BaseMemberModel extends BaseModel {
    userName!: string;
    password!: string;
    phoneNumber!: number;
    email!: string;
    isActive:boolean;
    hashPassword(password:string):string{        
        return this.password= bcryptjs.hashSync(password,bcryptjs.genSaltSync())
    }
    validPassword(password:string):boolean{
        if (bcryptjs.compareSync(password, this.password)) return true;
    return false;
    }
}