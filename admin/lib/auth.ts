import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { findUserByEmail } from "@/db/controllers/authController";

export const authOptions:NextAuthOptions = {
	secret:process.env.NEXTAUTH_SECRET,
	session:{
		strategy:'jwt'
	},
	pages:{
		signIn: '/sign-in',
	},
	providers: [
		CredentialsProvider({
		  name: 'Credentials',
		  credentials: {
			email: { label: "Email", type: "email", placeholder: "yourid@mail.com" },
			password: { label: "Password", type: "password" }
		  },
		  async authorize(credentials) {
			if(!credentials?.email || !credentials?.password){
				return null;
			}

			const existingUser = await findUserByEmail(credentials.email);
			console.log("existingUser : ",existingUser);
			if(!existingUser){
				return null;
			}

			const passwordMatch = await compare(credentials.password,existingUser.password);

			if(!passwordMatch){
				return null;
			}

			return {
				id:`${existingUser.id}`,
				username:existingUser.username,
				email:existingUser.email,
			}
			
		  }
		})
	  ],
	  callbacks:{
		async jwt({ token,user }) {		
			if(user){
				return {
					...token,
					username:user.username,
					id:user.id
				}
			}	
			return token
		  },
		async session({ session, token }) {
			return {
				...session,
				user:{
					...session.user,
					username: token.username,
					id:token.id
				}
			}

		  }

	  }
}