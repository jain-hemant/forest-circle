import mongoose from 'mongoose';

// Declare a global variable to cache the connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn; // Return existing connection
  }

  if (!cached.promise) {
    // Create new connection if none exists
    cached.promise = mongoose.connect(process.env.MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;