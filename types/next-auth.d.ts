// next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name: string;
      email: string;
      // أضف أي حقول أخرى ترجع من الـ API
    }
  }
  interface User {
    accessToken?: string;
    userData?: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    userData?: any;
  }
}