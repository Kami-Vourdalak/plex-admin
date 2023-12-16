import { Request, Response } from "express"
import { UserModel } from "../models/user.model.ts"
import axios from "axios"

export async function getUsers(_: Request, res: Response) {
    const users = await UserModel.find()

    res.send(users)
}

export async function getUser(req: Request, res: Response) {
    const user = await UserModel.findById(req.params.id)
    res.send(user)
}

export async function createUser(req: Request, res: Response) {
    const user = await UserModel.create({
        userName: req.body.userName,
        libraries: req.body.libraries,
        expirationDate: new Date(),
    })
    res.status(201).send(user)
}

export async function syncUsers(_req: Request, res: Response) {
    const plexUsers = await axios.get("http://plex.sincrack.com:34400/accounts?X-Plex-Token=1fTJRL1dmmVkzYm1TELs")
    console.log(plexUsers.data)
    console.log(plexUsers.data.MediaContainer)
    plexUsers.data.MediaContainer.Account.forEach(async (plexUser: any) => {
        const foundUser = await UserModel.findOne({ plexId: plexUser.plexId })
        console.log('foundUser',!!foundUser)
        if (!foundUser) {
            await UserModel.create({
                userName: plexUser.name,
                libraries: [],
                plexId: plexUser.id,
            })        
        }
    })

    res.send('ok')
}
