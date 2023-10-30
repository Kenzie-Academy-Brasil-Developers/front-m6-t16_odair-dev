"use client";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Lexend } from "next/font/google";
import { useContext, useState } from "react";
import { GlobalContext } from "@/providers/GlobalContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const addressSchema = z.object({
  cep: z.string().min(8, "CEP é obrigatório"),
  state: z.string().min(2, "Estado é obrigatório"),
  city: z.string().min(4, "Cidade é obrigatório"),
  street: z.string().min(4, "Rua é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().min(1, "Campo obrigatório"),
});

const schema = z
  .object({
    name: z.string().min(3, "Nome é obrigatório"),
    email: z
      .string()
      .min(6, "Email é obrigatório")
      .email("Formato inválido de e-mail"),
    cpf: z.string().min(11, "CPF é obrigatório"),
    phone: z.string().min(9, "Celular é obrigatório"),
    birth: z.string().min(6, "Data de nascimento é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatório"),
    Address: addressSchema,
    password: z.string().min(4, "Senha é obrigatória com 4 digitos"),
    confirmPassword: z.string().min(4, "Confirmação de senha é obrigatória"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Precisa ser idêntico a senha.",
    path: ["confirmPassword"],
  });

export type TSchemaRegisterForm = z.infer<typeof schema>;

export default function Register() {
  const { registerUser } = useContext(GlobalContext);
  const [type, setType] = useState<string>("COMPRADOR");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSchemaRegisterForm>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: any) {
    await registerUser({ ...data, type: type });
    reset({
      email: "",
      name: "",
      cpf: "",
      phone: "",
      birth: "",
      description: "",
      password: "",
      Address: {
        cep: "",
        state: "",
        city: "",
        street: "",
        number: "",
        complement: "",
      },
    });
  }

  function changeToCOMPRADOR() {
    if (type == "ANUNCIANTE") {
      setType("COMPRADOR");
    }
  }

  function changeToANUNCIANTE() {
    if (type == "COMPRADOR") {
      setType("ANUNCIANTE");
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={`${lexend.className} ${styles.pRegister}`}>Cadastro</p>
        <p className={styles.pInfo}>Informações pessoais</p>
        <label htmlFor="inpName" className={styles.lblRegister}>
          Nome
        </label>
        <input
          type="text"
          id="inpName"
          className={styles.inpRegister}
          placeholder="Ex. Samuel Leão"
          {...register("name")}
        />
        {errors.name?.message != undefined ? (
          <p className={styles.redText}>{errors.name?.message}</p>
        ) : null}
        <label htmlFor="inpEmail" className={styles.lblRegister}>
          Email
        </label>
        <input
          type="email"
          id="inpEmail"
          className={styles.inpRegister}
          placeholder="Ex. samuel@kenzie.com.br"
          {...register("email")}
        />
        {errors.email?.message != undefined ? (
          <p className={styles.redText}>{errors.email?.message}</p>
        ) : null}
        <label htmlFor="inpCpf" className={styles.lblRegister}>
          CPF
        </label>
        <input
          type="text"
          id="inpCpf"
          className={styles.inpRegister}
          placeholder="000.000.000-00"
          {...register("cpf")}
        />
        {errors.cpf?.message != undefined ? (
          <p className={styles.redText}>{errors.cpf?.message}</p>
        ) : null}
        <label htmlFor="inpPhone" className={styles.lblRegister}>
          Celular
        </label>
        <input
          type="text"
          id="inpPhone"
          className={styles.inpRegister}
          placeholder="(DDD) 90000-0000"
          {...register("phone")}
        />
        {errors.phone?.message != undefined ? (
          <p className={styles.redText}>{errors.phone?.message}</p>
        ) : null}
        <label htmlFor="inpBirth" className={styles.lblRegister}>
          Data de nascimento
        </label>
        <input
          type="date"
          id="inpBirth"
          className={styles.inpRegister}
          placeholder="00/00/0000"
          {...register("birth")}
        />
        {errors.birth?.message != undefined ? (
          <p className={styles.redText}>{errors.birth?.message}</p>
        ) : null}
        <label htmlFor="inpDescription" className={styles.lblRegister}>
          Descrição
        </label>
        <textarea
          id="inpDescription"
          className={styles.inpDescription}
          placeholder="Digitar descrição"
          {...register("description")}
        ></textarea>
        {errors.description?.message != undefined ? (
          <p className={styles.redText}>{errors.description?.message}</p>
        ) : null}
        <p className={styles.pInfo}>Informações de endereço</p>
        <label htmlFor="inpCep" className={styles.lblRegister}>
          CEP
        </label>
        <input
          type="text"
          id="inpCep"
          className={styles.inpRegister}
          placeholder="00000-000"
          {...register("Address.cep")}
        />
        {errors.Address?.cep?.message != undefined ? (
          <p className={styles.redText}>{errors.Address?.cep?.message}</p>
        ) : null}
        <div className={styles.divGroup}>
          <div className={styles.divSide}>
            <label htmlFor="inpState" className={styles.lblRegister}>
              Estado
            </label>
            <input
              type="text"
              id="inpState"
              className={styles.inpRegister}
              placeholder="Digitar Estado"
              {...register("Address.state")}
            />
            {errors.Address?.state?.message != undefined ? (
              <p className={styles.redText}>{errors.Address?.state?.message}</p>
            ) : null}
          </div>
          <div className={styles.divSide}>
            <label htmlFor="inpCity" className={styles.lblRegister}>
              Cidade
            </label>
            <input
              type="text"
              id="inpCity"
              className={styles.inpRegister}
              placeholder="Digitar cidade"
              {...register("Address.city")}
            />
            {errors.Address?.city?.message != undefined ? (
              <p className={styles.redText}>{errors.Address?.city?.message}</p>
            ) : null}
          </div>
        </div>
        <label htmlFor="inpStreet" className={styles.lblRegister}>
          Rua
        </label>
        <input
          type="text"
          id="inpStreet"
          className={styles.inpRegister}
          placeholder="Digitar rua"
          {...register("Address.street")}
        />
        {errors.Address?.street?.message != undefined ? (
          <p className={styles.redText}>{errors.Address?.street?.message}</p>
        ) : null}
        <div className={styles.divGroup}>
          <div className={styles.divSide}>
            <label htmlFor="inpNumber" className={styles.lblRegister}>
              Número
            </label>
            <input
              type="number"
              id="inpNumber"
              className={styles.inpRegister}
              placeholder="Digitar número"
              {...register("Address.number")}
            />
            {errors.Address?.number?.message != undefined ? (
              <p className={styles.redText}>
                {errors.Address?.number?.message}
              </p>
            ) : null}
          </div>
          <div className={styles.divSide}>
            <label htmlFor="inpComplement" className={styles.lblRegister}>
              Complemento
            </label>
            <input
              type="text"
              id="inpComplement"
              className={styles.inpRegister}
              placeholder="Ex: apart 307"
              {...register("Address.complement")}
            />
            {errors.Address?.complement?.message != undefined ? (
              <p className={styles.redText}>
                {errors.Address?.complement?.message}
              </p>
            ) : null}
          </div>
        </div>
        <p className={styles.pInfo}>Tipo de conta</p>
        <div className={styles.divGroup}>
          <div
            onClick={() => changeToCOMPRADOR()}
            className={type == "COMPRADOR" ? styles.onButton : styles.offButton}
          >
            Comprador
          </div>
          <div
            onClick={() => changeToANUNCIANTE()}
            className={type == "COMPRADOR" ? styles.offButton : styles.onButton}
          >
            Anunciante
          </div>
        </div>
        <label htmlFor="inpPassword" className={styles.lblRegister}>
          Senha
        </label>
        <input
          type="password"
          id="inpPassword"
          className={styles.inpRegister}
          placeholder="Digitar senha"
          {...register("password")}
        />
        {errors.password?.message != undefined ? (
          <p className={styles.redText}>{errors.password?.message}</p>
        ) : null}
        <label htmlFor="inpConfirmPassword" className={styles.lblRegister}>
          Confirmar Senha
        </label>
        <input
          type="password"
          id="inpConfirmPassword"
          className={styles.inpRegister}
          placeholder="Repetir a senha"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword?.message != undefined ? (
          <p className={styles.redText}>{errors.confirmPassword?.message}</p>
        ) : null}
        <button type="submit">Finalizar cadastro</button>
      </form>
    </div>
  );
}
