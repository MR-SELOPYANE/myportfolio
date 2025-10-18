import "./globals.css";
import RootClientWrapper from "./RootClientWrapper";

export const metadata = {
  title: "KE Selopyane Portfolio",
  description: "Futuristic portfolio website of Kabelo Selopyane",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-space-900 text-stars-100">
        <RootClientWrapper>{children}</RootClientWrapper>
      </body>
    </html>
  );
}
