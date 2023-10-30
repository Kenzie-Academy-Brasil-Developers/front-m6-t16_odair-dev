"use client";
import { useContext, useState } from "react";
import { GlobalContext } from "@/providers/GlobalContext";
import styles from "./styles.module.scss";
import { Lexend } from "next/font/google";
import { useForm } from "react-hook-form";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

type ImageUrl = {
  url: string;
};

type Inputs = {
  mark: string;
  model: string;
  year: number;
  fuel: string;
  km: number;
  color: string;
  price: number;
  fipe: number;
  description: string;
  image: ImageUrl[];
};

export default function ModalRegisterAnnouncement() {
  const { modal, setModal, registerAnnouncement } = useContext(GlobalContext);
  const [imagesModal, setImagesModal] = useState<number[]>([1, 2]);

  function moreImages() {
    let qtd = [...imagesModal];
    qtd.push(imagesModal.length + 1);
    setImagesModal(qtd);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  function handleClose() {
    setModal(false);
  }

  async function onSubmit(data: any) {
    const dataFormated = {
      ...data,
      year: Number(data.year),
      price: Number(data.price),
      fipe: Number(data.fipe),
      km: Number(data.km),
    };
    registerAnnouncement(dataFormated);
    setModal(false);
  }

  if (modal) {
    return (
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.description}>
            <p className={lexend.className}>Criar anúncio</p>
            <div className={styles.btnClose} onClick={() => handleClose()}>
              X
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className={styles.pInfo}>Informações do veículo</p>
            <label htmlFor="inpMark" className={styles.lblRegister}>
              Marca
            </label>
            <input
              type="text"
              id="inpMark"
              required
              className={styles.inpRegister}
              placeholder="Chevrolet"
              {...register("mark")}
            />
            <label htmlFor="inpModel" className={styles.lblRegister}>
              Modelo
            </label>
            <input
              type="text"
              id="inpModel"
              required
              className={styles.inpRegister}
              placeholder="camaro ss 6.2 v8 16v"
              {...register("model")}
            />
            <div className={styles.divGroup}>
              <div className={styles.divSide}>
                <label htmlFor="inpYear" className={styles.lblRegister}>
                  Ano
                </label>
                <input
                  type="number"
                  id="inpYear"
                  required
                  className={styles.inpRegister}
                  placeholder="2018"
                  {...register("year")}
                />
              </div>
              <div className={styles.divSide}>
                <label htmlFor="inpFuel" className={styles.lblRegister}>
                  Combustível
                </label>
                <select
                  id="inpFuel"
                  required
                  className={styles.inpRegister}
                  placeholder="Gasolina / Etanol"
                  {...register("fuel")}
                  defaultValue={"GASOLINA"}
                >
                  <option value="GASOLINA">Gasolina</option>
                  <option value="ETANOL">Etanol</option>
                </select>
              </div>
            </div>
            <div className={styles.divGroup}>
              <div className={styles.divSide}>
                <label htmlFor="inpKm" className={styles.lblRegister}>
                  Quilometragem
                </label>
                <input
                  type="number"
                  id="inpKm"
                  required
                  className={styles.inpRegister}
                  placeholder="30.000"
                  {...register("km")}
                />
              </div>
              <div className={styles.divSide}>
                <label htmlFor="inpColor" className={styles.lblRegister}>
                  Cor
                </label>
                <input
                  type="text"
                  id="inpColor"
                  required
                  className={styles.inpRegister}
                  placeholder="Branco"
                  {...register("color")}
                />
              </div>
            </div>
            <div className={styles.divGroup}>
              <div className={styles.divSide}>
                <label htmlFor="inpFipe" className={styles.lblRegister}>
                  Preço tabela FIPE
                </label>
                <input
                  type="number"
                  id="inpFipe"
                  required
                  className={styles.inpRegister}
                  placeholder="48.000,00"
                  {...register("fipe")}
                />
              </div>
              <div className={styles.divSide}>
                <label htmlFor="inpPrice" className={styles.lblRegister}>
                  Preço
                </label>
                <input
                  type="number"
                  id="inpPrice"
                  required
                  className={styles.inpRegister}
                  placeholder="50.000,00"
                  {...register("price")}
                />
              </div>
            </div>
            <label htmlFor="inpDescription" className={styles.lblRegister}>
              Descrição
            </label>
            <textarea
              id="inpDescription"
              required
              className={styles.inpDescription}
              placeholder="Digitar descrição"
              {...register("description")}
            ></textarea>
            <label htmlFor="inpImg" className={styles.lblRegister}>
              Imagem da capa
            </label>
            <input
              type="url"
              id="inpImg"
              required
              className={styles.inpRegister}
              placeholder="https://image.com"
              {...register("image.0.url")}
            />
            {imagesModal.map((i) => (
              <div key={i} className={styles.divMoreImages}>
                <label htmlFor="inpImg" className={styles.lblRegister}>
                  {i}º Imagem da galeria
                </label>
                <input
                  type="url"
                  id="inpImg"
                  required
                  className={styles.inpRegister}
                  placeholder="https://image.com"
                  {...register(`image.${i}.url`)}
                />
              </div>
            ))}
            <div className={styles.btnMoreImages} onClick={() => moreImages()}>
              Adicionar campo para imagem da galeria
            </div>
            <button>Criar anúncio</button>
          </form>
        </div>
      </div>
    );
  }
}
