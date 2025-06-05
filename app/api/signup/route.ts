import { auth, db } from '@/app/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  try {
    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Store extra user info in Firestore
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      username,
      email,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Signup error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
