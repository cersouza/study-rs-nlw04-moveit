import styles from '../styles/components/FooterPage.module.css';

interface FooterPageProps {
    modeStyle?: 'dark' | 'light';
}

export default function FooterPage (props: FooterPageProps) {
    return (
        <footer className={`${styles.footerPageContainer} ${ props.modeStyle == 'light' ? styles.footerPageContainerLight : ''}`}>
            <p>Desenvolvido com ❤️ por <a href="https://github.com/cersouza/" target="_blank">cersouza </a>Durante a #NLW04 da <a href="https://rocketseat.com.br/" target="_blank">RocketSeat</a></p>
        </footer>
    );
}