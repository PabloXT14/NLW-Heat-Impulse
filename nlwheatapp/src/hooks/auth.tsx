//ContextAPI: nos permite criar variaveis/states que poderao ser utlizadas em qualquer lugar da nossa aplicacao
import React, { createContext, useContext, useEffect, useState } from "react";
//Biblioteca de armazenagem do expo
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSessions from 'expo-auth-session';//variavel que nos permite autenticar com aplicacoes externas, como github
import { api } from "../services/api";



const CLIENT_ID = '9ec55dfd150849f9b5b7';
const SCOPE = 'read:user';
//noma da chave/lugar que vai salvar o user no storage do expo
const USER_STORAGE = '@nlwheat:user';//@chave:value
//noma da chave/lugar que vai salvar o token no storage do expo
const TOKEN_STORAGE = '@nlwheat:token';//@chave:value

//tipagem do usuario
type User = {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
}

//tipagem dos dados de autenticacao
type AuthContextData = {
    user: User | null;
    isSigningIn: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

//tipagem do provedor da nossa autentica (funcao que vai enviar o componente principal da nossa aplicacao-Home-)
type AuthProviderProps = {
    children: React.ReactNode;
}

//tipagem da resposta de autenticacao (com o github)
type AuthResponse = {
    token: string;//token enviado pelo back-end
    user: User;//dados do usuario vindo do back-end
}

//tipagem do condigo enviado ao se autenticar com o github (este que vai nos permitir a criacao de um token)
type AuthorizationResponse = {
    params: {
        code?: string;
        error?: string;
    },
    type?: string;
}


//Contexto de Autenticacao
export const AuthContext = createContext({} as AuthContextData)


//Funcao que retorna/pega todo nosso principal componente (Home)
function AuthProvider({ children }: AuthProviderProps) {
    //State que checa se user esta logado
    const [isSigningIn, setIsSigningIn] = useState(true);
    //State do user, com todos os seus dados principais
    const [user, setUser] = useState<User | null>(null)





    //Funcao de login
    async function signIn() {
        try {
            // var controle de autenticacao
            setIsSigningIn(true);

            //url para realizar a autenticacao
            const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`

            //dados(code) enviados de volta apos a altenticacao com a url
            const authSessionResponse = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse;

            //verificando se autenticacao deu sucesso e se nao foi negado
            if (authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
                //passando code para o back-end
                const authResponse = await api.post('/authenticate', { code: authSessionResponse.params.code });

                //dados enviados de volta do back-end
                const { user, token } = authResponse.data as AuthResponse;

                //enviando para o cabeçalho de todas as requisiçoes o token recebido
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                //salvo user e token no Storage do Expo
                await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
                await AsyncStorage.setItem(TOKEN_STORAGE, token);

                //atualiando state
                setUser(user);
            }

        } catch (error) {

        } finally {
            //terminol de logar
            setIsSigningIn(false);
        }


    }

    //funcao de logout
    async function signOut() {
        //resetando estado/dados do user
        setUser(null);
        //apagando dados do usuario do storage do expo
        await AsyncStorage.removeItem(USER_STORAGE);
        await AsyncStorage.removeItem(TOKEN_STORAGE);
    }

    //Recarregando dados do user (mesmo quando da um reload na aplicacao)
    useEffect(() => {
        async function loadUserStorageData() {
            //pegando dados do storage
            const userStorage = await AsyncStorage.getItem(USER_STORAGE);
            const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

            //reenviando dados para o back-end
            if (userStorage && tokenStorage) {
                api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;
                setUser(JSON.parse(userStorage));
            }

            //terminol de relogar
            setIsSigningIn(false);
        }

        loadUserStorageData();
    }, []);


    return (
        <AuthContext.Provider value={{
            signIn,
            signOut,
            user,
            isSigningIn
        }}>
            {/* 
                Compartilhando as todas as fucoes acima com todos os filhos/componentes da nossa aplicacao 
            */}
            {children}
        </AuthContext.Provider>

    );
}




/* Configurao para exportar o context */
function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export {
    AuthProvider,
    useAuth
}


