'use client';
import { Inter } from 'next/font/google';
import styles from './styles.module.scss';
import Image from "next/image";
import { Lexend } from "next/font/google";
import { GlobalContext } from "@/providers/GlobalContext";
import Modal from "@/components/modal";
import { useContext, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';

const lexend = Lexend({
    subsets: ['latin'],
    weight: ['100','200','300','400','500','600','700','800','900']
})

const inter = Inter({ subsets: ['latin'] })

type Inputs = {
    comment: string;
}

interface IId{
    id: string;
}
interface IParams{
    params: IId;
}

export default function DetailProduct({params}:IParams){
    const { registerComment, announcement, getAnnouncement, setModal, setImgModal, setTitleModal, modal, user, getAdvertiser } = useContext(GlobalContext);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()

    useEffect(()=>{
        getAnnouncement(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    async function onSubmit(data:any){
        const dataFormated = {...data, announcement_id: params.id}
        await registerComment(dataFormated);
        reset({ comment: ""});
    }

    function handleImg(url:string){
        setModal(true);
        setTitleModal(`${announcement?.mark} - ${announcement?.model}`);
        setImgModal(`${url}`);
    }

    function goAdvertiser(){
        if(announcement){
            router.push(`/advertiser/${announcement.user.id}`);
        }
    }

    if(announcement){
        return(
            <div className={styles.container}>
                <Modal />
                <div className={styles.divBlue}></div>
                <div className={styles.maxSize} id='topHome'>
                    <div className={styles.left}>
                        <div className={styles.divImg}>
                            {(announcement.image).length>0 ?
                                <Image 
                                    src={`${announcement.image[0].url}`}
                                    alt={`${announcement.model}`}  
                                    height={500} 
                                    width={500}    
                                />
                            : null}
                        </div>
                        <div className={styles.divDescription}>
                            <p className={lexend.className}>{announcement.mark} - {announcement.model}</p>
                            <div className={styles.divDetail}>
                                <div className={styles.divKmYear}>
                                    <div>
                                        <p>{announcement.year}</p>
                                    </div>
                                    <div>
                                        <p>{announcement.km} KM</p>
                                    </div>
                                </div>
                                <div className={styles.divPrice}>
                                    <p className={lexend.className}>
                                        {(announcement.price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.carDescription}>
                            <p className={lexend.className}>Descrição</p>
                            <p className={styles.description}>{announcement.description}</p>
                        </div>
                        <div className={styles.comments}>
                            <p className={lexend.className}>Comentários</p>
                            {announcement.comment.map((i)=>(
                                <div className={styles.cardComment} key={i.id}>
                                    <div className={styles.headerComment}>
                                        <div className={styles.circle}>{(i.user.name[0]).toLocaleUpperCase()}</div>
                                        <p className={styles.pName}>{i.user.name}</p>
                                        <p className={styles.days}>•</p>
                                        <p className={styles.days}>
                                            {
                                                `${((new Date().valueOf() - new Date(i.createdAt).valueOf())/(1000*60*60*24)) > 1 ? 
                                                    `há ${Math.trunc((new Date().valueOf() - new Date(i.createdAt).valueOf())/(1000*3600*24))} dias` 
                                                : 
                                                    `há ${Math.trunc((new Date().valueOf() - new Date(i.createdAt).valueOf())/(1000*3600))} horas`
                                                }`
                                            }
                                        </p>
                                    </div>
                                    <p className={styles.textComment}>{i.comment}</p>
                                </div>
                            ))}
                        </div>
                        {user ?
                            <div className={styles.newComment}>
                                <form  onSubmit={handleSubmit(onSubmit)}>
                                    <div className={styles.headerComment}>
                                        <div className={styles.circle}>{(user.name[0]).toLocaleUpperCase()}</div>
                                        <p className={styles.pName}>{user.name}</p>
                                    </div>
                                    <textarea 
                                        className={`${styles.textNewComment} ${inter.className}`}
                                        required
                                        placeholder='Carro muito confortável, foi uma ótima experiência de compra...'
                                        {...register('comment')}
                                    ></textarea>
                                    <button className={styles.btnNewComment}>Comentar</button>
                                </form>
                                <button className={styles.commentDefault}>Gostei muito!</button>
                                <button className={styles.commentDefault}>Incrível</button>
                                <button className={styles.commentDefault}>Recomendar  para meus amigos!</button>
                            </div>
                        :
                            <div className={styles.newComment}>
                                <form>
                                    <textarea 
                                        className={`${styles.textNewComment} ${inter.className}`}
                                        placeholder='Digitar comentário' 
                                        disabled
                                    ></textarea>
                                    <button className={styles.btnNewCommentDisabled} disabled>Comentar</button>
                                </form>
                                <button className={styles.commentDefault} disabled>Gostei muito!</button>
                                <button className={styles.commentDefault} disabled>Incrível</button>
                                <button className={styles.commentDefault} disabled>Recomendar  para meus amigos!</button>
                                </div>
                        }
                    </div>
                    <div className={styles.right}>
                        <div className={styles.divImgRight}>
                            <p className={lexend.className}>Fotos</p>
                            <div className={styles.allImages}>
                                {(announcement.image).length>0 ?
                                    announcement.image.map((i)=>(
                                        <div className={styles.miniCard} onClick={()=>handleImg(i.url)} key={i.id}>
                                            <Image 
                                                src={`${i.url}`}
                                                alt={`${announcement.mark} - ${announcement.model}`}  
                                                height={500} 
                                                width={500}    
                                            />
                                        </div>
                                    )
                                ): null} 
                            </div>
                        </div>
                        <div className={styles.owner}>
                            <div className={styles.circle}>{(announcement.user.name[0]).toUpperCase()}</div>
                            <p className={`${styles.name} ${lexend.className}`}>{announcement.user.name}</p>
                            <p className={styles.description}>{announcement.user.description}</p>
                            <button className={styles.btnHome} onClick={()=>goAdvertiser()}>Ver todos os anuncios</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}