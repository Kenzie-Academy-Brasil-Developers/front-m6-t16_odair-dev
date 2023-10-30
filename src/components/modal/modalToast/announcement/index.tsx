"use client";
import { useContext } from "react";
import { GlobalContext } from "@/providers/GlobalContext";
import styles from "./styles.module.scss";
import { Lexend } from "next/font/google";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function ModalToastNewAnnouncement() {
  const { modalToastNewAnnouncement, setModalToastNewAnnouncement } =
    useContext(GlobalContext);

  function handleClose() {
    setModalToastNewAnnouncement(false);
  }

  if (modalToastNewAnnouncement) {
    return (
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.description}>
            <p className={lexend.className}>Sucesso!</p>
            <div className={styles.btnClose} onClick={() => handleClose()}>
              X
            </div>
          </div>
          <p className={`${lexend.className} ${styles.pTitle}`}>
            Seu anúncio foi criado com sucesso!
          </p>
          <p className={`${lexend.className} ${styles.pText}`}>
            Agora você poderá ver seus negócios crescendo em grande escala
          </p>
        </div>
      </div>
    );
  }
}
