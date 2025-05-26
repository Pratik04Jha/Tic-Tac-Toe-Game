import Footer from "./components/Sections/Footer";
// import Navbar from "./components/Sections/Navbar";
import "./globals.css";
import Head from "next/head";

export const metadata = {
  title: "Tic Tac Toe",
  description: "This is the best tic tac toe game you have ever seen",
  icons: {
    icon: "/icon.png",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </Head>
      <body className="bg-black text-white overflow-hidden" suppressHydrationWarning>
        {/* <Navbar /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
