import Keycloak from "next-auth/providers/keycloak"

import { type AuthOptions, getServerSession as getSession } from "next-auth"
import { cache } from "react"

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    Keycloak({
      issuer: "https://ohmvision.com/auth/realms/next-auth-bugs",
      clientId: "next-auth-repro",
      // this is not sensitive at the moment since the realm was created for public bug reproduction
      clientSecret: "u9QbdxKjurvp5UqD5vsc3D3mc6Ft1km8",
      authorization: { params: { scope: "openid email profile" } },
    }),
  ],
  secret: "123456"
} satisfies AuthOptions

export const getServerSession = cache(() => getSession(config));
