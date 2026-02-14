'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c0c0c]">
      <div className="text-center p-8 max-w-md">
        <h2
          className="text-2xl font-bold mb-4 text-white"
          style={{ fontFamily: 'var(--font-cinzel), serif' }}
        >
          Qualcosa è andato storto
        </h2>
        <p className="text-white/60 mb-6">
          Si è verificato un errore imprevisto. Riprova o torna alla pagina iniziale.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-[#d4a855] to-[#e8c882] text-[#0c0c0c] rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Riprova
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-[#d4a855]/30 text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            Torna alla Home
          </a>
        </div>
      </div>
    </div>
  )
}
