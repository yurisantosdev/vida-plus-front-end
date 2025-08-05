import type { Metadata } from 'next'
import './globals.css'
import ReduxProvider from '@/redux/ReduxProvider'

export const metadata: Metadata = {
  title: 'Vida+ | Gestão Inteligente de Veículos',
  description: 'Plataforma completa para gestão de veículos, manutenções, abastecimentos e controle financeiro. Simplifique a administração da sua frota com o Vida+.',
  keywords: 'gestão de veículos, manutenção automotiva, controle de frota, abastecimentos, vida plus',
  authors: [{ name: 'Vida+ Team' }],
  creator: 'Vida+',
  publisher: 'Vida+',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vidaplus.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Vida+ | Gestão Inteligente de Veículos',
    description: 'Plataforma completa para gestão de veículos, manutenções, abastecimentos e controle financeiro.',
    url: 'https://vidaplus.com.br',
    siteName: 'Vida+',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vida+ - Gestão Inteligente de Veículos',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vida+ | Gestão Inteligente de Veículos',
    description: 'Plataforma completa para gestão de veículos, manutenções, abastecimentos e controle financeiro.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Vida+" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
