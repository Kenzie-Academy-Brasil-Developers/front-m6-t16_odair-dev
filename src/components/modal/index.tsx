'use client';
import { useContext } from 'react';
import { GlobalContext } from '@/providers/GlobalContext';
import styles from './styles.module.scss';
import { Lexend } from "next/font/google";
import Image from 'next/image';


const lexend = Lexend({
    subsets: ['latin'],
    weight: ['100','200','300','400','500','600','700','800','900']
})

export default function Modal(){
    const { modal, setModal, titleModal, setTitleModal, imgModal, setImgModal } = useContext(GlobalContext);

    function handleClose() {
        if(modal){
            setModal(false);
            setTitleModal("Ford F-1000");
            setImgModal("https://quatrorodas.abril.com.br/wp-content/uploads/2015/11/F-1000-picape-modelo-1986-da-Ford-testada-pela-revista-Quatro-Rodas-1.jpg");
        }else{
            setModal(true);
            setTitleModal(null);
            setImgModal(null);
        }
    };

    return(
        <div className={styles.container}>
            <div className={styles.modal}>
                <div className={styles.description}>
                    <p className={lexend.className}>{titleModal}</p>
                    <div className={styles.btnClose} onClick={()=>handleClose()}>X</div>
                </div>
                <div className={styles.divImg}>
                    {imgModal ? <Image alt="Teste" height={500} width={500} src={`${imgModal}`}/> : null}
                </div>
            </div>
        </div>
    )
}