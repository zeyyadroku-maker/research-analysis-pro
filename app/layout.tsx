import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './providers/ThemeProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-geist-sans', // Mapping to our config
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://syllogos.ai'), // Replace with actual domain
  title: {
    default: 'Syllogos | AI Research Analysis & Credibility Assessment',
    template: '%s | Syllogos'
  },
  description: 'Evaluate research credibility with transparent AI. Syllogos provides confidence scores, bias detection, and evidence-based analysis for academic papers.',
  keywords: ['AI research analysis', 'academic paper checker', 'bias detection', 'research credibility', 'OpenAlex', 'Claude AI'],
  authors: [{ name: 'Syllogos Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://syllogos.ai',
    title: 'Syllogos - The AI That Shows Its Work',
    description: 'Scientific paper analysis with transparent confidence scores and bias detection.',
    siteName: 'Syllogos',
    images: [
      {
        url: '/og-image.png', // Ensure this exists
        width: 1200,
        height: 630,
        alt: 'Syllogos Platform Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Syllogos | Transparent AI Research Analysis',
    description: 'Don\'t just read papers. Analyze them with AI that admits uncertainty.',
    creator: '@syllogos_ai',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="bg-white dark:bg-dark-950 transition-colors duration-300 ease-in-out selection:bg-accent-primary/30 selection:text-accent-primary">
        <ThemeProvider>
          <div className="fixed inset-0 bg-mesh-light dark:bg-mesh-dark pointer-events-none z-0 opacity-60 dark:opacity-40" />
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}