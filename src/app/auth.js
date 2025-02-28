import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import DBConnection from "./utils/configure/db";
import UserModel from "./utils/models/user";
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      // async authorize(credentials) {
      //   await DBConnection();
      //   console.log("loggedInUser_credentials", credentials);
      //   const user = await UserModel.findOne({
      //     email: credentials.email,
      //     password: credentials.password,
      //   });
      //   console.log("auth_user", user);
      //   if (!user) {
      //     return null;
      //   } else {
      //     return {
      //       name: user.username,
      //       email: user.email,
      //       password: user.password,
      //     };
      //   }
      // },

      //or
      async authorize(credentials) {
        await DBConnection();
        console.log("loggedInUser_credentials", credentials);
        const user = await UserModel.findOne({
          email: credentials.email,
        });
        console.log("auth_user", user);
        if (!user) {
          return null;
        }
        if (credentials.password !== user.password) {
          return null;
        }
        return {
          name: user.username,
          email: user.email,
          password: user.password,
          role: user.role,
        };
      },
    }),
  ],
  secret: process.env.SECRET_KEY,
  callbacks: {
    async jwt({ token, user }) {
      // console.log("user", user); //undefined
      // console.log("token", token);
      // if you login with admin credentials
      //  { email: "admin@resort.com", exp: 1742470367, iat:1739878367, jti : "7fac4d1a-e5a6-488d-a9fd-0c4c76cf3360",
      //   name : "admin", role: "admin", sub : "fe3f8fe7-41a2-497a-a930-b72a5dbc28c8",
      //   userId : "fe3f8fe7-41a2-497a-a930-b72a5dbc28c8", username :  "admin"}

      //if you login with user credentials
      // {name: 'sathish', email: 'sathish91577@gmail.com', sub: 'd2d6309d-d87d-4425-93b3-6351883cf2fd',
      //   userId: 'd2d6309d-d87d-4425-93b3-6351883cf2fd', username: 'sathish', …}
      if (user) {
        token.userId = user.id;
        token.username = user.name;
        token.role = user.role;
        token.email = user.email;
        console.log("token, user is there", token);
        // token, user is there {
        //   name: 'admin',
        //   email: 'admin@resort.com',
        //   picture: undefined,
        //   sub: 'cdf7bcdd-1216-4d7b-b5e6-480993b84d1d',
        //   userId: 'cdf7bcdd-1216-4d7b-b5e6-480993b84d1d',
        //   username: 'admin',
        //   role: 'admin'
        // }

        // token, user is there {
        //   name: 'sathish',
        //   email: 'sathish91577@gmail.com',
        //   picture: undefined,
        //   sub: 'e93dac6b-cb02-4d33-83c5-bd6e1733e2c0',
        //   userId: 'e93dac6b-cb02-4d33-83c5-bd6e1733e2c0',
        //   username: 'sathish',
        //   role: 'user'
        // }
        console.log("user, user is there", user);
        // user, user is there {
        //   name: 'admin',
        //   email: 'admin@resort.com',
        //   password: 'Admin@',
        //   role: 'admin',
        //   id: 'cdf7bcdd-1216-4d7b-b5e6-480993b84d1d'
        // }

        // user, user is there {
        //   name: 'sathish',
        //   email: 'sathish91577@gmail.com',
        //   password: 'Sathish91577@',
        //   role: 'user',
        //   id: 'e93dac6b-cb02-4d33-83c5-bd6e1733e2c0'
        // }
      }
      return token;
    },
    async session({ session, token }) {
      session.userId = token.userId;
      session.username = token.username;
      session.role = token.role;
      session.email = token.email;
      return session;
    },
  },
  // pages: {
  //   signIn: "/login",
  // },
});
