import {NextResponse} from 'next/server'
import User from '@/prisma'
import {ConnectMongoDB} from '@/lib/mongodb'

export async function POST(request) {
    const {email} = await request.json()
    await ConnectMongoDB();
    await User.create({email})
    return NextResponse.json({"message": "User registered"}, {status:201})
}