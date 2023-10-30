"use client";
import { useContext } from "react";
import { GlobalContext } from "@/providers/GlobalContext";
import styles from "./styles.module.scss";
import { Lexend } from "next/font/google";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function ModalToastDelete() {
  const {
    modalToastDelete,
    setModalToastDelete,
    announcementToDelete,
    setAnnouncementToDelete,
    deleteAnnouncement,
    getAdvertiser,
    user,
  } = useContext(GlobalContext);

  function handleClose() {
    setModalToastDelete(false);
  }

  async function handleDelete() {
    setModalToastDelete(false);
    if (announcementToDelete) {
      await deleteAnnouncement(announcementToDelete);
    }
    getAdvertiser(user!.id);
  }

  async function handleCancel() {
    setAnnouncementToDelete(null);
    setModalToastDelete(false);
  }

  if (modalToastDelete) {
    return (
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.description}>
            <p className={lexend.className}>Excluir anúncio</p>
            <div className={styles.btnClose} onClick={() => handleClose()}>
              X
            </div>
          </div>
          <p className={`${lexend.className} ${styles.pTitle}`}>
            Tem certeza que deseja remover este anúncio?
          </p>
          <p className={`${lexend.className} ${styles.pText}`}>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente sua
            conta e removerá seus dados de nossos servidores.
          </p>
          <div className={styles.divBtns}>
            <button className={styles.btnCancel} onClick={() => handleCancel()}>
              Cancelar
            </button>
            <button className={styles.btnDelete} onClick={() => handleDelete()}>
              Sim, excluir anúncio
            </button>
          </div>
        </div>
      </div>
    );
  }
}
