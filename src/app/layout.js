import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "Kevin Universe",
  description:
    "  Personalized intros and title sequences in the style of you most loved movies and shows",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="mt-20"></main>
        {children}
        <Footer />
      </body>
    </html>
  );
}
