import mongoose from "mongoose";

const URI_MONGO = process.env.URI_MONGO;

if (!URI_MONGO) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null
  }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(URI_MONGO, opts).then((mongoose) => {
      console.log('mongo db conectado');
      return mongoose
    }).catch(e =>{
      console.log("ocurrió un error")
      console.error(e)
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}


export default dbConnect;