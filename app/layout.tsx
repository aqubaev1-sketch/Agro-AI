import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/auth-context';
import { LanguageProvider } from '@/context/language-context';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Agro AI — Диагностика болезней растений по фотографии',
  description:
    'Минималистичный сервис диагностики болезней растений по фото с помощью нейросетей. Определение патогена, симптомы и схема лечения за 3 секунды.',
  openGraph: {
    title: 'Agro AI — Диагностика болезней растений',
    description:
      'Определите болезнь растения по одной фотографии: точный диагноз нейросетью, симптомы и понятный план лечения.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agro AI — Диагностика болезней растений',
    description: 'Интеллектуальный определитель патогенов и болезней растений по фото.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="min-h-screen bg-[#fafaf9] text-neutral-900 antialiased flex flex-col font-sans selection:bg-green-100 selection:text-green-900">
        <LanguageProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
