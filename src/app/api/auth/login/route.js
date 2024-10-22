import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request) {
  console.log('Login API called');
  try {
    const { email, password } = await request.json();

    console.log('Request body:', { email, password: '******' });

    if (!email || !password) {
      console.log('Missing email or password');
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    console.log('Connecting to database');
    const { db } = await connectToDatabase();
    console.log('Connected to database');

    console.log('Finding user');
    const user = await db.collection('users').findOne({ email });
    
    if (!user) {
      console.log('User not found');
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    console.log('Comparing passwords');
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Invalid password');
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    console.log('Login successful');
    return NextResponse.json({ message: 'Login successful', user: { id: user._id, email: user.email } }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
