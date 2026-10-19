import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Monis.rent | Interactive Bali Workspace Designer',
  description: 'Curate and rent your dream digital nomad workspace in Bali. Standing desks, ergonomic seating, multi-monitors, and tropical lifestyle gear delivered to your villa.',
  openGraph: {
    title: 'Monis.rent | Bali Workspace Designer',
    description: 'Design and rent your dream Bali workstation with instant villa delivery.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
