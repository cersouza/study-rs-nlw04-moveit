import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/components/InputUserData.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import Swal from 'sweetalert2';

interface UserData {
    name: string;
    profileImageUrl: string;
}

export function InputUserData() {   
    const { _username } = useRouter().query;
    const [inputIsGithubUser, setInputIsGithubUser] = useState(false);
    const [inputUsername, setInputUsername] = useState('');
    const { setUserData } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        let isGitHubUser = JSON.parse(localStorage.getItem('isGitHubUser'));
        setInputIsGithubUser(isGitHubUser);

        if(_username) {
            setInputUsername(_username.toString());
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('isGitHubUser', JSON.stringify(inputIsGithubUser));
    }, [inputIsGithubUser]);

    async function handleRedirectPage() {

        setUserData({
            name: inputUsername,
            username: inputUsername,
            isGithubUser: inputIsGithubUser,
            profileImageUrl: ''
        });

        if(inputUsername && inputIsGithubUser) {
            const { name, profileImageUrl } = await getDataFromGithub();                 

            if(!name) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Não encontramos esse usuário no GitHub',
                    text: 'Verifique se você digitou corretamente.'
                });

                return;
            }

            setUserData({ name, profileImageUrl });
        }
        
        if(inputUsername)
            router.push('challenge');

    }

    async function getDataFromGithub(): Promise<UserData> {
        const userData: UserData = {
            name: null,
            profileImageUrl: null
        };

        try {
            const res = await axios.get(`https://api.github.com/users/${inputUsername}`);        
            userData.name = res.data.name;
            userData.profileImageUrl = res.data.avatar_url;
        } catch (err) {
            console.log(err)
        }    

        return userData;
    }

    function handleIsGitHubVerify() {
        setInputIsGithubUser(!inputIsGithubUser);
    }

    function handleEnterKey(e) {
        if(e.key === 'Enter' && inputUsername) {
            handleRedirectPage();
        }            
    }

    return(
        <div className={styles.overlay}>
            <div className={styles.backgroundContainer}>
                <div className={styles.InputUserDataContainer}>   
                <img src="logo.svg" alt="MoveIt"/>       
                    <h1>Bem-vindo</h1>
                    <p>
                        <img src="/github-logo.svg" alt="Seta pra direita"/>
                        <span>
                        Digite abaixo seu nome<br/>
                        ou usuário do GitHub
                        </span>
                    </p>     

                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            placeholder="Digite seu nome ou username"
                            onChange={ (e) => setInputUsername(e.target.value)}
                            defaultValue={ inputUsername }
                            onKeyUp={handleEnterKey}
                        />

                        <button
                            type="button"
                            disabled={ !inputUsername }
                            onClick={handleRedirectPage}
                        >
                            <img src="/arrow-right.svg" alt="Seta pra direita"/>
                        </button>                
                    </div>     
                    
                
                    <div className={styles.isGithubContainer}>
                        <a 
                            type="button"
                            onClick={ handleIsGitHubVerify }
                        >
                            Este é seu usuário do GitHub? <mark>{ inputIsGithubUser ? 'SIM' : 'NÃO' }</mark>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}