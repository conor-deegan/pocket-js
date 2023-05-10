import mongoose from 'mongoose';

const connect = async (dbURI: string): Promise<string> => {
    try {
        mongoose.set('strictQuery', false);
        const connection = await mongoose.connect(dbURI);
        return connection.connections[0].name;
    } catch (error) {
        throw new Error(error);
    }
};

export { connect };
