import { signIn, signOut, useSession } from "next-auth/react"

export default function AuthButton() {
    const { data: session } = useSession();
    if(session) {
      return (
        <>
        <button onClick={() => signOut()} className="text-sm font-medium hover:text-gray-300 transition-colors">Sign Out</button>
        </>
      );
    }
    return (
      <>
      <button onClick={() => signIn()} className="text-sm font-medium hover:text-gray-300 transition-colors">Sign In</button>
      </>
    )
  }