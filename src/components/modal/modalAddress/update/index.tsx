"use client";
import { useContext } from "react";
import { GlobalContext } from "@/providers/GlobalContext";
import styles from "./styles.module.scss";
import { Lexend } from "next/font/google";
import { useForm } from "react-hook-form";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

type Inputs = {
  cep: string;
  state: string;
  city: string;
  street: string;
  number: number;
  complement: string;
};

export default function ModalUpdateAddress() {
  const {
    user,
    modalUpdateAddress,
    setModalUpdateAddress,
    patchAddress,
    deleteAddress,
    registerAddress,
  } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  function handleClose() {
    setModalUpdateAddress(false);
  }

  async function onSubmit(data: any) {
    if (user?.Address) {
      const dataFormated = { ...data, number: Number(data.number) };
      await patchAddress(dataFormated, user!.Address.id);
      setModalUpdateAddress(false);
    } else {
      const dataFormated = { ...data, number: Number(data.number) };
      registerAddress({ ...dataFormated, user_id: user!.id });
      location.reload();
    }
  }

  async function onDelete(id: string) {
    await deleteAddress(id);
    setModalUpdateAddress(false);
    location.reload();
  }

  if (modalUpdateAddress) {
    if (user?.Address) {
      return (
        <div className={styles.container}>
          <div className={styles.modal}>
            <div className={styles.description}>
              <p className={lexend.className}>Editar endereço</p>
              <div className={styles.btnClose} onClick={() => handleClose()}>
                X
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className={styles.pInfo}>Informações de endereço</p>
              <label htmlFor="inpCep" className={styles.lblRegister}>
                CEP
              </label>
              <input
                type="text"
                id="inpCep"
                required
                className={styles.inpRegister}
                placeholder="00000-000"
                {...register("cep")}
                defaultValue={user?.Address.cep}
              />
              <div className={styles.divGroup}>
                <div className={styles.divSide}>
                  <label htmlFor="inpState" className={styles.lblRegister}>
                    Estado
                  </label>
                  <input
                    type="text"
                    id="inpState"
                    required
                    className={styles.inpRegister}
                    placeholder="Digitar Estado"
                    {...register("state")}
                    defaultValue={user?.Address.state}
                  />
                </div>
                <div className={styles.divSide}>
                  <label htmlFor="inpCity" className={styles.lblRegister}>
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="inpCity"
                    required
                    className={styles.inpRegister}
                    placeholder="Digitar cidade"
                    {...register("city")}
                    defaultValue={user?.Address.city}
                  />
                </div>
              </div>
              <label htmlFor="inpStreet" className={styles.lblRegister}>
                Rua
              </label>
              <input
                type="text"
                id="inpStreet"
                required
                className={styles.inpRegister}
                placeholder="Rua do paraná"
                {...register("street")}
                defaultValue={user?.Address.street}
              />
              <div className={styles.divGroup}>
                <div className={styles.divSide}>
                  <label htmlFor="inpNumber" className={styles.lblRegister}>
                    Número
                  </label>
                  <input
                    type="number"
                    id="inpNumber"
                    required
                    className={styles.inpRegister}
                    placeholder="Digitar número"
                    {...register("number")}
                    defaultValue={user?.Address.number}
                  />
                </div>
                <div className={styles.divSide}>
                  <label htmlFor="inpComplement" className={styles.lblRegister}>
                    Complemento
                  </label>
                  <input
                    type="text"
                    id="inpComplement"
                    required
                    className={styles.inpRegister}
                    placeholder="Ex: apart 307"
                    {...register("complement")}
                    defaultValue={user?.Address.complement}
                  />
                </div>
              </div>
              <div className={styles.divBtns}>
                <div className={styles.btnDelete} onClick={() => handleClose()}>
                  Cancelar
                </div>
                <button>Salvar alterações</button>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.container}>
          <div className={styles.modal}>
            <div className={styles.description}>
              <p className={lexend.className}>Cadastrar endereço</p>
              <div className={styles.btnClose} onClick={() => handleClose()}>
                X
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className={styles.pInfo}>Informações de endereço</p>
              <label htmlFor="inpCep" className={styles.lblRegister}>
                CEP
              </label>
              <input
                type="text"
                id="inpCep"
                required
                className={styles.inpRegister}
                placeholder="00000-000"
                {...register("cep")}
              />
              <div className={styles.divGroup}>
                <div className={styles.divSide}>
                  <label htmlFor="inpState" className={styles.lblRegister}>
                    Estado
                  </label>
                  <input
                    type="text"
                    id="inpState"
                    required
                    className={styles.inpRegister}
                    placeholder="Digitar Estado"
                    {...register("state")}
                  />
                </div>
                <div className={styles.divSide}>
                  <label htmlFor="inpCity" className={styles.lblRegister}>
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="inpCity"
                    required
                    className={styles.inpRegister}
                    placeholder="Digitar cidade"
                    {...register("city")}
                  />
                </div>
              </div>
              <label htmlFor="inpStreet" className={styles.lblRegister}>
                Rua
              </label>
              <input
                type="text"
                id="inpStreet"
                required
                className={styles.inpRegister}
                placeholder="Rua do paraná"
                {...register("street")}
              />
              <div className={styles.divGroup}>
                <div className={styles.divSide}>
                  <label htmlFor="inpNumber" className={styles.lblRegister}>
                    Número
                  </label>
                  <input
                    type="number"
                    id="inpNumber"
                    required
                    className={styles.inpRegister}
                    placeholder="Digitar número"
                    {...register("number")}
                  />
                </div>
                <div className={styles.divSide}>
                  <label htmlFor="inpComplement" className={styles.lblRegister}>
                    Complemento
                  </label>
                  <input
                    type="text"
                    id="inpComplement"
                    required
                    className={styles.inpRegister}
                    placeholder="Ex: apart 307"
                    {...register("complement")}
                  />
                </div>
              </div>
              <div className={styles.divBtns}>
                <div className={styles.btnDelete} onClick={() => handleClose()}>
                  Cancelar
                </div>
                <button>Cadastrar Endereço</button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}
