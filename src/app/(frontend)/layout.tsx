import type { Metadata, Viewport } from 'next'
import { Cinzel, Cormorant_Garamond, Montserrat } from 'next/font/google'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import { ToastProvider } from '@/components/Toast'
import { ClientAuthProvider } from '@/components/auth/ClientAuthProvider'

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600'],
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0c0c0c',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Vlad Barber | Barbiere a Milano (MI)',
    template: '%s | Vlad Barber - Barbiere Milano',
  },
  description:
    'Vlad, barbiere professionista a Milano dal 2021. Taglio capelli uomo, barba, meches e trattamenti personalizzati. Prenota online. Via Domenica Cimarosa 5, 20144 Milano (MI).',
  keywords: [
    'barbiere milano',
    'vlad barbiere',
    'vlad barber milano',
    'taglio capelli uomo milano',
    'barba milano',
    'meches uomo lombardia',
    'barbiere milano',
    'barber shop lombardia',
    'parrucchiere uomo milano',
    'barbiere lombardia',
    'taglio barba professionale',
    'prenotazione barbiere online',
  ],
  authors: [{ name: 'Vlad Barber' }],
  creator: 'Vlad',
  publisher: 'Vlad Barber',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: '/',
    siteName: 'Vlad Barber',
    title: 'Vlad Barber | Barbiere a Milano',
    description:
      'Vlad, il tuo barbiere di fiducia a Milano dal 2021. Taglio capelli, barba e meches. Prenota online il tuo appuntamento.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vlad Barber | Barbiere Milano',
    description:
      'Vlad, barbiere professionista. Taglio, barba e meches. Prenota online.',
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
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
}

// Schema.org JSON-LD for Local Business
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BarberShop',
  '@id': 'https://vladbarber.it/#organization',
  name: 'Vlad Barber',
  alternateName: ['Vlad Barber'],
  description:
    'Vlad, barbiere professionista a Milano dal 2021. Taglio capelli uomo, barba, meches e trattamenti personalizzati. Prenota online il tuo appuntamento.',
  url: 'https://vladbarber.it',
  logo: 'https://vladbarber.it/images/logo/vlad-logo.webp',
  image: [
    'https://vladbarber.it/images/hero-bg.webp',
  ],
  telephone: '+39 320 564 0409',
  email: 'info@vladbarber.it',
  founder: {
    '@type': 'Person',
    name: 'Vlad',
    jobTitle: 'Barbiere Professionista',
    worksFor: {
      '@id': 'https://vladbarber.it/#organization',
    },
  },
  foundingDate: '2025',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Domenica Cimarosa 5',
    addressLocality: 'Milano',
    addressRegion: 'MI',
    postalCode: '20144',
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.4654,
    longitude: 9.1659,
  },
  hasMap: 'https://www.google.com/maps?q=45.4654,9.1659',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
  ],
  priceRange: '€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Contanti, Carta di Credito, Bancomat',
  areaServed: [
    {
      '@type': 'City',
      name: 'Milano',
    },
    {
      '@type': 'State',
      name: 'Milano',
    },
  ],
  sameAs: ['https://www.instagram.com/vlad_barber_shop/'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servizi Barbiere',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Taglio',
          description: 'Taglio capelli con 1 shampoo incluso',
        },
        price: '10',
        priceCurrency: 'EUR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Meches',
          description: 'Meches per un look personalizzato',
        },
        price: '30',
        priceCurrency: 'EUR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Barba',
          description: 'Rifinitura e styling della barba',
        },
        price: '5',
        priceCurrency: 'EUR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Taglio + Barba',
          description: 'Pacchetto taglio capelli e barba',
        },
        price: '15',
        priceCurrency: 'EUR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Taglio + Meches',
          description: 'Taglio capelli con meches',
        },
        price: '40',
        priceCurrency: 'EUR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Taglio + Barba + Meches',
          description: 'Pacchetto completo',
        },
        price: '45',
        priceCurrency: 'EUR',
      },
    ],
  },
}

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Vlad Barber" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Vlad Barber" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0c0c0c" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vladbarber.it' },
                { '@type': 'ListItem', position: 2, name: 'Servizi', item: 'https://vladbarber.it/servizi' },
                { '@type': 'ListItem', position: 3, name: 'Prenota', item: 'https://vladbarber.it/prenota' },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${cinzel.variable} ${cormorant.variable} ${montserrat.variable} antialiased`}
        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
      >
        {/* Skip Link for Accessibility */}
        <a href="#main-content" className="skip-link">
          Vai al contenuto principale
        </a>

        <ClientAuthProvider>
          <ToastProvider>
            <main id="main-content">
              {children}
            </main>
          </ToastProvider>
        </ClientAuthProvider>

        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
