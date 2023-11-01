"use client";

import { SessionProvider, SessionProviderProps, signIn, signOut } from "next-auth/react"
import { Button } from "./ui/button"

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  function doSignin() {
    signIn(provider, { callbackUrl: "/" })
  }
  return (
      <Button onClick={doSignin} {...props}>Sign In</Button>
  )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  function doSignout() {
    signOut({ callbackUrl: "/" });
  }
  return (
    <Button variant="ghost" onClick={doSignout} className="w-full p-0" {...props}>
      Sign Out
    </Button>
  )
}

export function SessionProviderSafe({ children, ...props}: SessionProviderProps) {
  return <SessionProvider {...props}>{children}</SessionProvider>

}