"use client";
import { useContext } from "react";
import { GlobalContext } from "@/providers/GlobalContext";
import styles from "./styles.module.scss";
import { Lexend } from "next/font/google";
import { useRouter } from "next/navigation";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function ModalToast() {
  const { modalToastRegister, setModalToastRegister } =
    useContext(GlobalContext);
  const router = useRouter();

  function handleClose() {
    setModalToastRegister(false);
  }

  function handleLogin() {
    setModalToastRegister(false);
    router.push("/login");
  }

  if (modalToastRegister) {
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
            Sua conta foi criada com sucesso!
          </p>
          <p className={`${lexend.className} ${styles.pText}`}>
            Agora você poderá ver seus negócios crescendo em grande escala
          </p>
          <button className={styles.btnLogin} onClick={() => handleLogin()}>
            Ir para o login
          </button>
        </div>
      </div>
    );
  }
}
