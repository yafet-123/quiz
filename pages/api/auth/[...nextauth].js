
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            id: 'user-credentials',
            name: 'user-credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
                userType: { label: "User Type", type: "select", options: ['user'] },
            },
            async authorize(credentials, req) {
                const payload = {
                    username: credentials.username,
                    password: credentials.password,
                };
                     
                let user
                console.log(payload)
                const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/login`,{
                    "username": payload.username,
                    "password": payload.password
                }).then(function (response) {
                    user = response.data
                        
                }).catch(function (error) {
                    throw new Error('Login Failed')
                });

                return user;
            },
        }),
        CredentialsProvider({
            id: 'student-credentials',
            name: 'student-credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
                userType: { label: "User Type", type: "select", options: ['student'] },
            },
            async authorize(credentials, req) {
                const payload = {
                    username: credentials.username,
                    password: credentials.password,
                };
                    
                let student
                console.log(payload)
                const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/loginStudent`,{
                    "username": payload.username,
                    "password": payload.password
                }).then(function (response) {
                    student = response.data
                        
                }).catch(function (error) {
                    throw new Error('Login Failed')
                });

                return student;
            },
        }),
        CredentialsProvider({
            id: 'teacher-credentials',
            name: 'teacher-credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
                userType: { label: "User Type", type: "select", options: ['teacher'] },
            },
            async authorize(credentials, req) {
                const payload = {
                    username: credentials.username,
                    password: credentials.password,
                };
                    
                let teacher
                console.log(payload)
                const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/loginTeacher`,{
                    "username": payload.username,
                    "password": payload.password
                }).then(function (response) {
                    teacher = response.data
                        
                }).catch(function (error) {
                    throw new Error('Login Failed')
                });

                return teacher;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/Admin/Login/signin-user',
        error:`/auth/login-error`
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.userId;
                token.accessToken = user.token;
                token.role = user.role;
            }
            return token;
        },

        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.user_id = token.userId;
            session.user.role = token.role;
            session.user.accessTokenExpires = token.accessTokenExpires;

            return session;
        },
    },
});
