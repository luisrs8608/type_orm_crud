import { Request, Response } from "express"
import { AppDataSource } from "../app.data.source"
import { User } from "../models/User"

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const results = await AppDataSource.getRepository(User).find();
    return res.json(results);
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const result = await AppDataSource.getRepository(User).findOneBy({id: parseInt(req.params['id'])});
    return res.json(result);
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    let result;
    let status = 201
    try {
        const userRepository = AppDataSource.getRepository(User)
        const newUser = userRepository.create(req.body);
        result = await userRepository.save(newUser);
    } catch (error) {
        console.log(error)
        result = error
        status = 500
    }
    return res.status(status).json(result);
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const result = await AppDataSource.getRepository(User).findOneBy({id: parseInt(req.params['id'])});
    if(result) {
        AppDataSource.getRepository(User).merge(result, req.body)
        const results = await AppDataSource.getRepository(User).save(result)
        return res.json(results)
    }
    return res.status(404).json({msg: 'Not User found'})
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const results = await AppDataSource.getRepository(User).delete(req.params.id);
    return res.json(results)
};
