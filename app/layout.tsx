import Image from "next/image";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { SignedIn, UserButton } from "@clerk/nextjs";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI of Yantao',
  description: 'AI agent created by yantao',
  icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <header className="sticky top-0 z-10">
            <nav className="relative backdrop-filter backdrop-blur-xl bg-opacity-30 bg-gray-50 border-b border-gray-200">
              <span className="absolute left-4 lg:left-10 w-8 h-8 inset-y-0 my-auto">
                <Image
                  fill
                  src={"/icon.png"}
                  alt="logo"
                />
              </span>

              <div className="max-w-6xl mx-auto px-4">
                <div className="absoulte flex items-center  justify-end h-14">
                  <div className="flex space-x-4">
                    <span className="text-2xl text-gray-900 font-semibold">Welcome to my AI site</span>
                    <SignedIn>
                      <UserButton afterSignOutUrl="/sign-in" />
                    </SignedIn>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <div className="grow" />

          <main className="grow bg-muted/50 min-h-screen">{children}</main>
        </body>
      </ClerkProvider>
    </html>
  )
}
