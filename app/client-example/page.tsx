import {  getServerSession } from "auth"
import ClientExample from "@/components/client-example"
import { SessionProviderSafe } from "@/components/auth-components"

export default async function ClientPage() {
  const session = await getServerSession()
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    } // filter out sensitive data
  }

  return (
    <SessionProviderSafe session={session}>
      <ClientExample />
    </SessionProviderSafe>
  )
}
