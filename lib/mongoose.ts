import mongoose from 'mongoose'

let isConnected: boolean= false


export const connectToDatabase= async () => {
  mongoose.set('strictQuery', true);

  if(!process.env.MONGODB_URI){
    return console.log("MISSING MONGODB URL");
  }
  
  if(isConnected){
    return console.log("Mongodb is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL as string, {
      dbName: "development",
    });

    isConnected= true;
    console.log("Mongodb is Connected");
  } catch (error) {
    console.log("Error from connectotdb", error)
  }
}