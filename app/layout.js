import './globals.css';

export const metadata = {
  title: 'Web Anime',
  description: 'Streaming anime subtitle Indonesia',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-900 text-white min-h-screen">
        <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-blue-400">
              🎬 Web Anime
            </a>
            <div className="flex gap-4 text-sm">
              <a href="/" className="hover:text-blue-400">Home</a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-800 border-t border-gray-700 mt-12 py-6 text-center text-gray-400 text-sm">
          <p>© 2026 Web Anime.</p>
        </footer>
      </body>
    </html>
  );
}
