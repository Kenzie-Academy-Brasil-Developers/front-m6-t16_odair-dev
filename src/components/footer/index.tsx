"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import Logo from "@/img/Logo_white.svg";
import Home from "@/img/btnHome.svg";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  function goBack() {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.maxSize}>
        <div>
          <Image src={Logo} alt="Logotipo" onClick={() => goBack()} />
        </div>
        <div>
          <p>© 2022 - Todos os direitos reservados.</p>
        </div>
        <div>
          <a href="#topHome">
            <Image src={Home} alt="Home" />
          </a>
        </div>
      </div>
    </div>
  );
}
