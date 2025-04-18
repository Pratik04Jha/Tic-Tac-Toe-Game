import Footer from "./components/Sections/Footer";
import Navbar from "./components/Sections/Navbar";
import "./globals.css";


export const metadata = {
  title: "Tic Tac Toe",
  description: "This is the best tic tac toe game you have ever seen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-hidden" suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
