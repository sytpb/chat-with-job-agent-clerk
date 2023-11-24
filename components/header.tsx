import Link from 'next/link'
import * as React from 'react'

import { clearChats } from '@/app/actions'
import { auth } from '@/auth'
import { ClearHistory } from '@/components/clear-history'
import { Sidebar } from '@/components/sidebar'
import { SidebarFooter } from '@/components/sidebar-footer'
import { SidebarList } from '@/components/sidebar-list'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  IconNextChat,
  IconSeparator
} from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'

export async function Header() {
  const session = await auth()
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        {session?.user ? (
          <></>
        ) : (
          <Link href="/" target="_blank" rel="nofollow">
            <IconNextChat className="mr-2 h-6 w-6 dark:hidden" inverted />
            <IconNextChat className="mr-2 hidden h-6 w-6 dark:block" />
          </Link>
        )}
        <div className="flex items-center">

          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <Button variant="link" asChild className="-ml-2">
              <Link href="/sign-in?callbackUrl=/">Login</Link>
            </Button>
          )}
        </div>
      </div>

    </header>
  )
}


const remove = () => {
  return (
    <>
      <Sidebar>
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          {/* @ts-ignore */}
          <SidebarList userId={session?.user?.id} />
        </React.Suspense>
        <SidebarFooter>
          <ThemeToggle />
          <ClearHistory clearChats={clearChats} />
        </SidebarFooter>
      </Sidebar>


      <IconSeparator className="h-6 w-6 text-muted-foreground/50" />
    </>

  )

}
