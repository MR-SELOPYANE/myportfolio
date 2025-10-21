import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-stars-100 flex h-screen overflow-hidden bg-space-900">
        
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          
          {/* Navbar */}
          <Navbar />

          {/* Page Content — NO BOTTOM BORDER, CLEAN SPACE */}
          <main className="flex-1 overflow-y-auto p-6 m-4 glass-panel backdrop-blur-xl shadow-[0_0_30px_rgba(56,189,248,0.2)] animate-float">
            {children}
          </main>

          {/* Footer — REMOVED border-t TO ELIMINATE GREEN LINE */}
          <footer className="p-4 text-center text-stars-200 text-sm glass-panel mx-4 mb-4 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
            © {new Date().getFullYear()}{" "}
            <span className="text-neon-blue text-glow font-semibold">KE Selopyane</span>. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}