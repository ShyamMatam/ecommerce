import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10, // Adjust this value based on your needs
  });

  const db = client.db();

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function POST(request) {
  console.log('Register API called');
  try {
    const { email, password } = await request.json();

    console.log('Request body:', { email, password: '******' });

    if (!email || !password) {
      console.log('Missing email or password');
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    console.log('Connecting to database');
    const { db } = await connectToDatabase();
    console.log('Connected to database successfully');

    console.log('Checking for existing user');
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    console.log('Hashing password');
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Creating new user');
    const result = await db.collection('users').insertOne({ email, password: hashedPassword });

    console.log('User created successfully');
    return NextResponse.json({ message: 'User created successfully', userId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    // Log the full error stack
    console.error(error.stack);
    return NextResponse.json({ message: 'Internal server error', error: error.message, stack: error.stack }, { status: 500 });
  }
}
