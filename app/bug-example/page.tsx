import {  getServerSession } from "auth"
import CustomLink from "@/components/custom-link"
import SessionData from "@/components/session-data"

export default async function BugPage() {
  const session = await getServerSession();
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Bug Example Reproduction</h1>
      <p>
        This page is server-rendered as a{" "}
        <CustomLink href="https://nextjs.org/docs/app/building-your-application/rendering/server-components">
          React Server Component
        </CustomLink>
        . It gets the session data on the server using{" "}
        <CustomLink href="https://nextjs.authjs.dev#auth">
          <code>auth()</code>
        </CustomLink>{" "}
        method.
      </p>
      <SessionData session={session} />

      <h2 className="text-xl font-bold">Bug Example</h2>

      {session ? (<p>
        In this example, the user is already authenticated. But the authentication is not passed as a header
      </p>) : (<p>
        You must SignIn before testing the next part
      </p>)}
      {session && (<iframe
        src={"/api/bug-repo"}
        width="100%"
        style={{ height: "65vh"}}
        ></iframe>)}
    </div>
  )
}
