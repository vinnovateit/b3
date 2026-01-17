import "./globals.css";

export const metadata = {
  title: "Yantra Hero",
  description: "B³ – Build. Block. Break.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
