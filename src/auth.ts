import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/db/mongodb"
import ResendProvider from "next-auth/providers/resend"
import type { NextAuthConfig } from "next-auth"
import { MagicLinkTemplate } from "@/components/email/MagicLinkTemplate"
import * as React from "react"
import { renderAsync } from "@react-email/components"


export const config = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    ResendProvider({
      name: 'Resend',
      from: 'onboarding@resend.dev',
      apiKey: process.env.RESEND_API_KEY,
      async sendVerificationRequest({
        identifier: email,
        url,
        provider
      }) {
        const { host } = new URL(url)
        
        try {
          const html = await renderAsync(
            React.createElement(MagicLinkTemplate, {
              url,
              host,
            })
          )

          const text = `Sign in to ${host}\n${url}\n\n`

          const result = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${provider.apiKey}`,
            },
            body: JSON.stringify({
              from: provider.from,
              to: email,
              subject: `Sign in to DateDash`,
              html,
              text,
            }),
          })

          if (!result.ok) {
            const error = await result.json()
            throw new Error(JSON.stringify(error))
          }
        } catch (error) {
          console.error("Failed to send verification email:", error)
          throw new Error(`Email delivery failed: ${error}`)
        }
      }
    })
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
  },
  debug: process.env.NODE_ENV === 'development'
} satisfies NextAuthConfig

export const { auth, handlers: { GET, POST }, signIn, signOut } = NextAuth(config)