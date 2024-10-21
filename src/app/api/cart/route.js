import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Helper function to get the user ID from the token
async function getUserId() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth');
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token.value, JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db('your_database_name');
  const cart = await db.collection('carts').findOne({ userId: new ObjectId(userId) });

  return NextResponse.json(cart ? cart.items : []);
}

export async function POST(request) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { product, quantity } = await request.json();

  const client = await clientPromise;
  const db = client.db('your_database_name');

  const result = await db.collection('carts').updateOne(
    { userId: new ObjectId(userId) },
    { 
      $push: { items: { ...product, quantity } },
      $setOnInsert: { userId: new ObjectId(userId) }
    },
    { upsert: true }
  );

  const updatedCart = await db.collection('carts').findOne({ userId: new ObjectId(userId) });

  return NextResponse.json(updatedCart.items);
}

export async function PUT(request) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { productId, quantity } = await request.json();

  const client = await clientPromise;
  const db = client.db('your_database_name');

  await db.collection('carts').updateOne(
    { userId: new ObjectId(userId), "items.asin": productId },
    { $set: { "items.$.quantity": quantity } }
  );

  const updatedCart = await db.collection('carts').findOne({ userId: new ObjectId(userId) });

  return NextResponse.json(updatedCart.items);
}

export async function DELETE(request) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  const client = await clientPromise;
  const db = client.db('your_database_name');

  await db.collection('carts').updateOne(
    { userId: new ObjectId(userId) },
    { $pull: { items: { asin: productId } } }
  );

  const updatedCart = await db.collection('carts').findOne({ userId: new ObjectId(userId) });

  return NextResponse.json(updatedCart.items);
}
