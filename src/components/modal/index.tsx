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
    const { modal, setModal, titleModal, imgModal, setImgModal} = useContext(GlobalContext);

    function handleClose() {
        setImgModal(null);
        setModal(false);
    };

    if(modal){
        return( 
            <div className={styles.container}>
                <div className={styles.modal}>
                    <div className={styles.description}>
                        <p className={lexend.className}>{titleModal}</p>
                        <div className={styles.btnClose} onClick={()=>handleClose()}>X</div>
                    </div>
                    {imgModal ? 
                        <div className={styles.divImg}>
                            <Image alt="Teste" height={500} width={500} src={`${imgModal}`}/>
                        </div>
                    :null}
                </div>
            </div>
        )
    }
}