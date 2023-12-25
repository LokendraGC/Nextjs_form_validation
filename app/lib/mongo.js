const {MONGO_URI} = process.env;

console.log({ MONGO_URI });
export const connectStr = MONGO_URI;