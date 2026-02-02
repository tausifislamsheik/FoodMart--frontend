import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import React from "react";
import { Toaster } from "sonner";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <Footer />
        <Toaster richColors />
      </ThemeProvider>
    </div>
  );
};

export default CommonLayout;
