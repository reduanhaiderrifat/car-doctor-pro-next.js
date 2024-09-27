import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Homepage/shared/Navbar";
import Footer from "./components/Homepage/shared/Footer";
import AuthProvider from "@/services/AuthProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title:{
    default: "Car Doctor",
    template:'%s | Car Doctor'
  },
  description: "Car Reaparing Workshop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="mytheme">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased `}
          >
          <AuthProvider>
          <Navbar></Navbar>
          <div style={{ minHeight: "calc(100vh - 288px)" }}>{children}</div>
          <Footer />
      </AuthProvider>
      <ToastContainer />
        </body>
    </html>
  );
}
