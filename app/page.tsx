import { redirect } from "next/navigation";

import { Chat } from '@/components/chat'
import { nanoid } from '@/lib/utils'
import { auth, clerkClient } from "@clerk/nextjs";

export const runtime = 'edge'

export default async function IndexPage() {
  const id = nanoid()
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const user = await clerkClient.users.getUser(userId);
  //console.log(user)
  return (
    <>
      {
        !!user ? 
        <Chat id={id} /> :
        <h1>Sorry, Happen Error</h1>
      }
    </>
  )
}