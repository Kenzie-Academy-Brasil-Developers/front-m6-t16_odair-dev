import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/scss/main.scss";
import { GlobalProvider } from "@/providers/GlobalContext";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ModalUpdateUser from "@/components/modal/modalUser/update";
import ModalUpdateAddress from "@/components/modal/modalAddress/update";
import ModalToastRegister from "@/components/modal/modalToast/register";
import ModalToastDelete from "@/components/modal/modalToast/delete";
import ModalToastNewAnnouncement from "@/components/modal/modalToast/announcement";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kenzie Veículos",
  description: "Site de comercialização de veículos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <ModalUpdateUser />
          <ModalUpdateAddress />
          <ModalToastRegister />
          <ModalToastDelete />
          <ModalToastNewAnnouncement />
          <Header />
          {children}
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}
