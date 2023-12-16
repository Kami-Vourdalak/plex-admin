import { Router } from "express";
import * as userController from '../controllers/user.controller.ts'

export const users = Router()

users.route('/users')
    .get(userController.getUsers)
    .post(userController.createUser)

users.route('/users/sync')
    .post(userController.syncUsers)

users.route('/users/:userId')
    .get(userController.getUser)