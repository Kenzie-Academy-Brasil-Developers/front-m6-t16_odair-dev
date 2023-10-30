"use client";
import { useContext } from "react";
import { GlobalContext } from "@/providers/GlobalContext";
import styles from "./styles.module.scss";
import { Lexend } from "next/font/google";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

type Inputs = {
  email: string;
  name: string;
  cpf: string;
  phone: string;
  birth: string;
  description: string;
  password: string;
  type: string;
};

export default function ModalUpdateUser() {
  const router = useRouter();
  const {
    user,
    setUser,
    setToken,
    setModalUpdateUser,
    modalUpdateUser,
    deleteUser,
    patchUser,
  } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  function handleClose() {
    setModalUpdateUser(false);
  }

  async function onSubmit(data: any) {
    patchUser(data, user!.id);
    setModalUpdateUser(false);
  }

  async function onDelete(id: string) {
    await deleteUser(id);
    destroyCookie(null, "motors.token");
    setUser(null);
    setToken(null);
    router.push("/");
    setModalUpdateUser(false);
    location.reload();
  }

  if (modalUpdateUser) {
    return (
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.description}>
            <p className={lexend.className}>Editar perfil</p>
            <div className={styles.btnClose} onClick={() => handleClose()}>
              X
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className={styles.pInfo}>Informações pessoais</p>
            <label htmlFor="inpName" className={styles.lblRegister}>
              Nome
            </label>
            <input
              type="text"
              id="inpName"
              required
              className={styles.inpRegister}
              placeholder="Samuel Leão"
              {...register("name")}
              defaultValue={user?.name}
            />
            <label htmlFor="inpEmail" className={styles.lblRegister}>
              Email
            </label>
            <input
              type="text"
              id="inpEmail"
              required
              className={styles.inpRegister}
              placeholder="samuel@kenzie.com.br"
              {...register("email")}
              defaultValue={user?.email}
            />
            <label htmlFor="inpCpf" className={styles.lblRegister}>
              CPF
            </label>
            <input
              type="text"
              id="inpCpf"
              required
              className={styles.inpRegister}
              placeholder="000.000.000-00"
              {...register("cpf")}
              defaultValue={user?.cpf}
            />
            <label htmlFor="inpPhone" className={styles.lblRegister}>
              Celular
            </label>
            <input
              type="text"
              id="inpPhone"
              required
              className={styles.inpRegister}
              placeholder="(051) 999.999.999"
              {...register("phone")}
              defaultValue={user?.phone}
            />
            <label htmlFor="inpBirth" className={styles.lblRegister}>
              Data de nascimento
            </label>
            <input
              type="date"
              id="inpBirth"
              required
              className={styles.inpRegister}
              placeholder="01/01/1999"
              {...register("birth")}
              defaultValue={user!.birth.slice(0, 10)}
            />
            <label htmlFor="inpDescription" className={styles.lblRegister}>
              Descrição
            </label>
            <textarea
              id="inpDescription"
              required
              className={styles.inpDescription}
              placeholder="Digitar descrição"
              {...register("description")}
              defaultValue={user?.description}
            ></textarea>
            <div className={styles.divBtns}>
              <div onClick={() => handleClose()} className={styles.btnCancel}>
                Cancelar
              </div>
              <div
                onClick={() => onDelete(user!.id)}
                className={styles.btnDelete}
              >
                Excluir Perfil
              </div>
              <button>Salvar alterações</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
