import { createContext, useEffect, useState } from "react";

interface setUserDataParams {
    name?: string;
    username?: string;
    isGithubUser?: boolean;
    profileImageUrl?: string;
}

interface UserContextData {
    name: string;
    username: string;
    currentlyUsername: string;
    isGithubUser: boolean;
    profileImageUrl: string;
    setUserData: (params: setUserDataParams) => void;
}

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps ) {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [isGithubUser, setIsGithubUser] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [currentlyUsername, setCurrentlyUsername] = useState('');

    useEffect(() => {
        updateDataFromLocal();
    }, []);

    useEffect(() => {
        localStorage.setItem('currentlyUsername', currentlyUsername);
    }, [currentlyUsername]);

    useEffect(() => {

        let userData = {
            name,
            username,
            isGithubUser,
            profileImageUrl 
        };

        if(username){
            setCurrentlyUsername(username);
            localStorage.setItem(`userdata_${username}`, JSON.stringify(userData))
        }
        
    }, [username, name, isGithubUser, profileImageUrl]);

    function updateDataFromLocal() {
        let currentlyUsername = localStorage.getItem('currentlyUsername');
        let userData = JSON.parse(localStorage.getItem(`userdata_${currentlyUsername}`));
        
        if(currentlyUsername)
            setCurrentlyUsername(currentlyUsername);

        if(userData) {
            setName(userData.name);
            setIsGithubUser(userData.isGithubUser);
            setProfileImageUrl(userData.profileImageUrl);
        } 
    }

    function setUserData( { name = '', username = '', isGithubUser = false, profileImageUrl}: setUserDataParams) {
        if(username)
            setUsername(username);

        if(name) 
            setName(name);        

        if(isGithubUser)
            setIsGithubUser(isGithubUser);
        
        if(profileImageUrl != undefined)
            setProfileImageUrl(profileImageUrl);
    }

    return (
        <UserContext.Provider
            value={{
                username,
                name,
                isGithubUser,
                profileImageUrl,
                setUserData,
                currentlyUsername
            }}
        >
            { children }
        </UserContext.Provider>
    );

}