import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    expirationDate: {
        type: Date,
        required: false,
    },
    libraries: {
        type: [String],
        required: true,
    },
    plexId: {
        type: Number,
        required: true,
    }
})

export interface User {
    id: string;
    username: string;
    expirationDate: Date;
    libraries: string[];
}

export const UserModel = model<User>('User', userSchema);


// import axios from 'axios'
// const plexUsers = await axios.get('http://79.117.18.221:34400/accounts?X-Plex-Token=1fTJRL1dmmVkzYm1TELs')
