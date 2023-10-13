import styles from './styles.module.scss';
//Faço as minhas componentizações através dos mixins quando componentes pequenos
//Os botões estão padronizados em: src/scss/abstracts/_mixin.scss 
//aqui apenas exemplifico o seu uso.
export default function btnExemplo(){
    return(
        <div className={styles.container}>
            <div className={styles.left}>
                <button className={styles.btnTeste1}>Text Button</button>
                <button className={styles.btnTeste2}>Text Button</button>
                <button className={styles.btnTeste3}>Text Button</button>
                <button className={styles.btnTeste4}>Text Button</button>
                <button className={styles.btnTeste5}>Text Button</button>
                <button className={styles.btnTeste6}>Text Button</button>
                <button className={styles.btnTeste7}>Text Button</button>
                <button className={styles.btnTeste8}>Text Button</button>
                <button className={styles.btnTeste9}>Text Button</button>
                <button className={styles.btnTeste10}>Text Button</button>
                <button className={styles.btnTeste11}>Text Button</button>
                <button className={styles.btnTeste12}>Text Button</button>
            </div>
            <div className={styles.right}>
            <button className={styles.btnTeste1}>Text Button</button>
                <button className={styles.btnTeste2}>Text Button</button>
                <button className={styles.btnTeste3}>Text Button</button>
                <button className={styles.btnTeste4}>Text Button</button>
                <button className={styles.btnTeste5}>Text Button</button>
                <button className={styles.btnTeste6}>Text Button</button>
                <button className={styles.btnTeste7}>Text Button</button>
                <button className={styles.btnTeste8}>Text Button</button>
                <button className={styles.btnTeste9}>Text Button</button>
                <button className={styles.btnTeste10}>Text Button</button>
                <button className={styles.btnTeste11}>Text Button</button>
                <button className={styles.btnTeste12}>Text Button</button>
            </div>
        </div>
    )
}