import mongoose from 'mongoose';
import { server } from '../config';

export const dbConnection = async () => {
    await mongoose.connect(server.DATABASE_URL)
        .then(async () => {
            console.error('Database Connected.',);

        })
        .catch((err) => {
            console.error('Database Connection error', err);
            process.exit();
        });
}


