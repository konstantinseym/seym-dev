import React from 'react'

export const metadata = {
  description: 'SEYM.DEV content management system',
  title: 'SEYM.DEV CMS',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
