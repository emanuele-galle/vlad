import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Vlad Barber Milano - Barbiere'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0c0c0c',
          backgroundImage:
            'radial-gradient(circle at 25% 25%, #1a1a1a 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1a1a1a 0%, transparent 50%)',
        }}
      >
        {/* Decorative top border */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #d4a855, transparent)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
          }}
        >
          {/* Logo/Name */}
          <h1
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: 'white',
              marginBottom: 20,
              letterSpacing: '0.05em',
            }}
          >
            Vlad Barber
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: 36,
              color: '#d4a855',
              marginBottom: 40,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Il Tuo Barbiere di Fiducia
          </p>

          {/* Divider */}
          <div
            style={{
              width: '200px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #d4a855, transparent)',
              marginBottom: 40,
            }}
          />

          {/* Location */}
          <p
            style={{
              fontSize: 28,
              color: '#999',
            }}
          >
            Milano - Via Domenica Cimarosa 5
          </p>
        </div>

        {/* Decorative bottom border */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #d4a855, transparent)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
