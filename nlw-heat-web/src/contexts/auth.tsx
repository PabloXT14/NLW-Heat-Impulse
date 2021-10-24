import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

type User = {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
}

type AuthContextData = {
    user: User | null;
    signInUrl: string;
    signOut: () => void;
}


export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
    children: ReactNode;
}

type AuthResponse = {
    token: string;
    user: {
        id: string;
        avatar_url: string;
        name: string;
        login: string;
    }
}

export function AuthProvider(props: AuthProvider) {

    const [user, setUser] = useState<User | null>(null)

    const signInUrl = `https://github.com/login/oauth/authorize?scope-user&client_id=2cf48012f8efe7ebac5c`


    /* ENVIANDO CÓDIGO DO GITHUB P/ O BACK-END */
    async function signIn(githubCode: string) {
        const response = await api.post<AuthResponse>('authenticate', {
            code: githubCode,
        });

        const { token, user } = response.data;

        localStorage.setItem('@dowhile:token', token);

        api.defaults.headers.common.authorization = `Bearer ${token}`

        setUser(user);
    }


    /* FUNÇÃO LOGOUT */
    function signOut() {
        setUser(null);
        localStorage.removeItem('@dowhile:token');
    }

    /* CHECANDO SE USUÁRIO JÁ LOGOU (PEGANDO TOKEN GUARDADO NO LOCALSTOAGE) */
    useEffect(() => {
        const token = localStorage.getItem('@dowhile:token')

        if (token) {
            api.defaults.headers.common.authorization = `Bearer ${token}`

            api.get<User>('profile').then(response => {
                setUser(response.data);
            })
        }

    }, [])


    /* PEGANDO CÓDIGO DE LOGIN DO GITHUB (NA URL) */
    useEffect(() => {
        const url = window.location.href;
        const hasGithubCode = url.includes('?code=');

        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split('?code=')

            window.history.pushState({}, '', urlWithoutCode);
            signIn(githubCode);
        }
    }, []);

    return (
        /* AuthContext.Provider:
            Faz com que todos os Componentes da aplicação tenhas acesso aos seguintes dados 
        */
        <AuthContext.Provider value={{ signInUrl, user, signOut }}>
            {props.children}
        </AuthContext.Provider>
    );
}


