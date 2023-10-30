"use client";
import { useContext, useState, useEffect } from "react";
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

export default function ModalUpdateAnnouncement() {
  const {
    getAdvertiser,
    updateAnnouncement,
    setModalUpdateAnnouncement,
    patchAnnouncement,
    deleteImagesByAnnouncement,
    registerManyImages,
    setModalToastDelete,
    setAnnouncementToDelete,
  } = useContext(GlobalContext);
  const [imagesModal, setImagesModal] = useState<number[]>([]);
  const [moreImagesModal, setMoreImagesModal] = useState<number[]>([]);

  useEffect(() => {
    const size = updateAnnouncement?.image.length;
    let qtd = [];
    for (let cont = 0; cont <= size!; cont++) {
      if (cont > 1) {
        qtd.push(cont);
      }
    }
    setImagesModal(qtd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function moreImages() {
    if (moreImagesModal.length == 0) {
      if (imagesModal.length) {
        let qtd = [imagesModal[imagesModal.length - 1] + 1];
        setMoreImagesModal(qtd);
      } else {
        setMoreImagesModal([2]);
      }
    }
    if (moreImagesModal.length > 0) {
      let qtd = moreImagesModal;
      qtd.push(moreImagesModal[moreImagesModal.length - 1] + 1);
      setMoreImagesModal(qtd);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  function handleClose() {
    setModalUpdateAnnouncement(false);
  }

  async function onSubmit(data: any) {
    const dataFormated = {
      ...data,
      year: Number(data.year),
      price: Number(data.price),
      fipe: Number(data.fipe),
      km: Number(data.km),
    };
    await deleteImagesByAnnouncement(updateAnnouncement!.id);
    await registerManyImages(dataFormated.image, updateAnnouncement!.id);
    delete dataFormated["image"];
    patchAnnouncement(dataFormated, updateAnnouncement!.id);
    getAdvertiser(updateAnnouncement!.user.id);
    setModalUpdateAnnouncement(false);
  }

  async function onDelete(id: string) {
    setModalUpdateAnnouncement(false);
    setAnnouncementToDelete(id);
    setModalToastDelete(true);
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.description}>
          <p className={lexend.className}>Editar anúncio</p>
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
            defaultValue={updateAnnouncement?.mark}
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
            defaultValue={updateAnnouncement?.model}
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
                defaultValue={updateAnnouncement?.year}
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
                defaultValue={
                  updateAnnouncement?.fuel == "GASOLINA" ? "GASOLINA" : "ETANOL"
                }
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
                defaultValue={updateAnnouncement?.km}
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
                defaultValue={updateAnnouncement?.color}
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
                defaultValue={updateAnnouncement?.fipe}
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
                defaultValue={updateAnnouncement?.price}
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
            defaultValue={updateAnnouncement?.description}
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
            defaultValue={
              updateAnnouncement?.image[0]
                ? updateAnnouncement.image[0].url
                : ""
            }
          />
          {imagesModal.map((i) => (
            <div key={i} className={styles.divMoreImages}>
              <label htmlFor="inpImg" className={styles.lblRegister}>
                {i - 1}º Imagem da galeria
              </label>
              <input
                type="url"
                id="inpImg"
                required
                className={styles.inpRegister}
                placeholder="https://image.com"
                {...register(`image.${i - 1}.url`)}
                defaultValue={updateAnnouncement?.image[i - 1].url}
              />
            </div>
          ))}

          {moreImagesModal.map((i) => (
            <div key={i} className={styles.divMoreImages}>
              <label htmlFor="inpImg" className={styles.lblRegister}>
                {i - 1}º Imagem da galeria
              </label>
              <input
                type="url"
                id="inpImg"
                required
                className={styles.inpRegister}
                placeholder="https://image.com"
                {...register(`image.${i - 1}.url`)}
              />
            </div>
          ))}

          <div className={styles.btnMoreImages} onClick={() => moreImages()}>
            Adicionar campo para imagem da galeria
          </div>
          <div className={styles.divBtns}>
            <div
              onClick={() => onDelete(updateAnnouncement!.id)}
              className={styles.btnDelete}
            >
              Excluir anúncio
            </div>
            <button>Salvar alterações</button>
          </div>
        </form>
      </div>
    </div>
  );
}
