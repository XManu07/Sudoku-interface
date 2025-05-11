import "./globals.css";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}