import styles from './styles.module.scss'

export default function Comment(){
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.circle}>JL</div>
                <p className={styles.name}>Julia Lima</p>
                <p className={styles.time}>há 3 dias</p>
            </div>
            <div className={styles.comment}>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
        </div>
    )
}