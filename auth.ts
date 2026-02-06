import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const response = await fetch(`${process.env.API}/auth/signin`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "Content-type": "application/json",
              "User-Agent": "Mozilla/5.0",
            },
          });

          const payload = await response.json();

          // تأكد أن الاستجابة ناجحة (Status 200)
          if (response.ok && payload?.token && payload?.user) {
            return {
              id: payload.user._id || payload.user.email,
              name: payload.user.name,
              email: payload.user.email,
              accessToken: payload.token, // غيرت الاسم لـ accessToken لتمييزه
              userData: payload.user,     // حفظ بيانات المستخدم كاملة
            };
          }
          return null;
        } catch (error) {
          console.error("Authorize Error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // الـ user يكون متاحاً فقط عند تسجيل الدخول أول مرة
      if (user) {
        token.accessToken = user.accessToken;
        token.userData = user.userData;
      }
      return token;
    },
    async session({ session, token }) {
      // تمرير البيانات من الـ JWT إلى الـ Session لتظهر في المتصفح
      session.accessToken = token.accessToken as string;
      session.user = token.userData as any; 
      return session;
    }
  }
};