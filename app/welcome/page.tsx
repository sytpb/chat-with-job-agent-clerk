'use client'
 
import { useSignIn, useUser} from '@clerk/nextjs'

import { redirect, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'


export default function Home() {
  
  console.log("accetp....  .....")
  const searchParams = useSearchParams()
 
  const signInToken = searchParams.get('token')


  const { signIn, setActive } = useSignIn();
  const { user } = useUser();
  const [signInProcessed, setSignInProcessed] = useState<boolean>(false);
  console.log(user,signIn)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const aFunc = async () => {
    try {
      // Create a signIn with the token, note that you need to use the "ticket" strategy.
      const res = await signIn?.create({
        strategy: "ticket",
        ticket: signInToken as string,
      });

      if(setActive) {
        setActive({session: res?.createdSessionId, beforeEmit:( )=>{
          console.log("22222222222222222222222")

        }})

      }


    } catch (err) {
      setSignInProcessed(true);
    }
  };

  useEffect(() => {
    console.log("1111111111111111")

    aFunc();
    
  }, [aFunc]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">


      <h1>sigout</h1>
    </main>
  )
}
