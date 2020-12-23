import 'reflect-metadata';
import { CommentEntity, CommentModel } from '../entities/Comment.Entity';
import { JsonController, Post, Get, Put, Authorized, Patch, Body, Res, Req } from 'routing-controllers';
import * as Entities from '../entities';
//import { Op } from 'sequelize';

import { Addcomment } from './requests/Addcomment';


@JsonController('/comment')
export class CommentController {

    constructor() {

    }
    @Get('/loadcomment')
    async loadCommentList(@Res() response: any, @Req() request: any): Promise<any> {

        try {

            const productId = 682;
            // const orderId = -1;
            // const userId = -1;
            const commentEntity = CommentEntity(Entities.DBs.Comment + Entities.Prefixes.CommentProductPrefix + productId, Entities.dbConnection);
            await commentEntity.sync();

            const r = await commentEntity.findAll()
            console.log('-------------------------------');
            console.log(r);
            console.log('-------------------------------');

            const successResponse: any = {
                status: 1,
                message: 'load commemt is ok',
                data: r
            };
            return response.status(200).send(successResponse);


        } catch (error) {
            const successResponse: any = {
                status: 0,
                message: 'load commemt error',
                data: error
            };

            return response.status(401).send(successResponse);
        }

        //commentEntity.findAndCountAll({ where: { [Op.or]: [orderId, userId] } }).then(r => {

        // });
        // return response.status(200).send(
        //     {status:0,message:'NO PROBLEM'}
        // )

    }
    //
    @Post('/comment')
    @Authorized('customer')
    loadComment() {
        const commentId = -1;
        const productId = -1;
        const commentEntity = CommentEntity(Entities.DBs.Comment + Entities.Prefixes.CommentProductPrefix + productId, Entities.dbConnection);

        commentEntity.findByPk(commentId).then(r => {

        });
    }
    // customer only
    @Put('/comment')
    @Authorized('customer')
    async insertcoment(@Body({ validate: true }) Addcomment: Array<Addcomment>, @Req() request: any, @Res() response: any) {
        try {
            console.log(request);
            const transaction = await Entities.dbConnection.transaction();
            const comArray: CommentModel[] = [];
            for (let index = 0; index < Addcomment.length; index++) {
                const addcomment = Addcomment[index];

                const productId = addcomment.productId;

                const newComment = {} as CommentModel;
                newComment.orderId = addcomment.orderId
                newComment.productId = addcomment.productId
                newComment.content = addcomment.content
                newComment.status = 'Nomal'
                newComment.userId = -1
                newComment.parentId = 0
                newComment.score = addcomment.score

                const commentEntity = CommentEntity(Entities.DBs.Comment + Entities.Prefixes.CommentProductPrefix + productId, Entities.dbConnection);
                await commentEntity.sync();
                let c = commentEntity.build(newComment);
                comArray.push(await c.save({ transaction }));

            }
            let c = 0;
            comArray.forEach((v, i, a) => {
                if (!v.updatedAt) {
                    c++
                }
            });
            if (!c) {
                await transaction.commit();
                const successResponse: any = {
                    status: 1,
                    message: 'Your commemt is ok',
                };
                return response.status(200).send(successResponse);
            } else {
                await transaction.rollback();
                const successResponse: any = {
                    status: 0,
                    message: 'Error Comment',
                };
                return response.status(402).send(successResponse);
            }


        } catch (error) {
            const successResponse: any = {
                status: 0,
                message: error,
            };
            return response.status(401).send(successResponse);
        }



    }
    // customer only
    @Patch('/comment')
    reviseComment() {

    }

    // admin only
    @Post('/hide-comment')
    hideComment() {

    }






}