import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import { createUser, findUserByEmail } from "@/lib/db/authController";
;

export async function POST(
	req:Request
)  {
	try {
		const body = await req.json();
		const {email , username , password} = body;

		const existingUserbyEmail = await findUserByEmail(email);

		if(existingUserbyEmail){
			return NextResponse.json({user:null,message:"email exists"},{status:409});

		}
		const hashedPassword = await hash(password,10);
		const newUser = await createUser(email,username,hashedPassword);
	
		return NextResponse.json({user: newUser , message:"User created !!"},{status:201});

	} catch (error) {
		console.log("[AUTH_POST] : ",error);
		return NextResponse.json({ message:"something went wrong !!"},{status:500});
	}
}

