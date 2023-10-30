"use client";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Lexend } from "next/font/google";
import { useContext } from "react";
import { GlobalContext } from "@/providers/GlobalContext";
import { useRouter } from "next/navigation";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { signIn } = useContext(GlobalContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  async function onSubmit(data: any) {
    await signIn(data);
    reset({ email: "", password: "" });
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={`${lexend.className} ${styles.pLogin}`}>Login</p>
        <label htmlFor="inpEmail" className={styles.lblLogin}>
          Email
        </label>
        <input
          type="email"
          id="inpEmail"
          required
          className={styles.inpLogin}
          placeholder="Digitar email"
          {...register("email")}
        />
        <label htmlFor="inpPassword" className={styles.lblLogin}>
          Senha
        </label>
        <input
          type="password"
          id="inpPassword"
          required
          className={styles.inpLogin}
          placeholder="Digitar senha"
          {...register("password")}
        />
        <p className={styles.forgotPassword}>Esqueci minha senha</p>
        <button className={styles.btnLogin} type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}
