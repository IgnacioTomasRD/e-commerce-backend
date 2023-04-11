import { Request, Response } from "express";
import { PostModel } from "model/post";
import { PostBaseModel } from "model/postBase";
import { Product, ProductModel } from "model/product";
import { StatusPostModel } from "model/statusPost";
import { TypeOfStatusPost } from "model/typeOfStatusPost";
import mongoose, { Types } from "mongoose";

export const postController = {
    save: async function(req: Request,res: Response){
        try {
            const {productId,name,description,price,stock} = req.body;
            const product = await ProductModel.findById(new Types.ObjectId(productId));
            const newState = await createNewState();
            const postBase = await PostBaseModel.create({product,name,description,price,stock,states: [newState]});
            postBase.save();
            res.send(postBase);
        } catch (error:any) {
            res.send(error.message);
        }
    },
    findAll: async function(req: Request,res: Response){
        const posts = await PostModel.find();
        return res.send(posts);
    }
}

async function createNewState(){
    return await StatusPostModel.create({typeOfStatusPost: TypeOfStatusPost.active, date: new Date(),isActive:true});
}