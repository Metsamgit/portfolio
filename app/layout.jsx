import './globals.css'

export const metadata = {
  title: 'Nathan Jupin - Cybersecurity Portfolio',
  description: 'Portfolio cybersécurité - SOC Analyst, CTF Player, Pentester en formation',
  keywords: ['cybersecurity', 'portfolio', 'SOC', 'CTF', 'pentest', 'security'],
  authors: [{ name: 'Nathan Jupin' }],
  openGraph: {
    title: 'Nathan Jupin - Cybersecurity Portfolio',
    description: 'Portfolio cybersécurité - SOC Analyst, CTF Player, Pentester en formation',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
