import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { api } from '../../services/api';
import { Message, MessageProps } from '../Message';
import { io } from 'socket.io-client';//biblioteca para podermos conectar nossa aplicacao com o back-end em modo realtime (para mostrar em tempo real as novas messages)
import { MESSAGES_EXAMPLE } from '../../utils/messages';

import { styles } from './styles';

let messageQueue: MessageProps[] = MESSAGES_EXAMPLE;//teste inicial
//let messageQueue: MessageProps[] = [];

//envento para verificar e armazena as novas menssagens enviadas para o back-end
const socket = io(String(api.defaults.baseURL));
socket.on('new_message', (newMessage) => {
    messageQueue.push(newMessage);
})

export function MessageList() {
    //State das messages
    const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

    //buscando pelas 3last messages no back-end
    useEffect(() => {
        async function fetchMessages() {
            const messagesResponse = await api.get<MessageProps[]>('messages/last3');
            setCurrentMessages(messagesResponse.data);
        }

        fetchMessages();
    }, [])

    //temporarizador para mostrar as novas mensagens que chegam
    useEffect(() => {
        //mostrando novas msg a cada 3s
        const timer = setInterval(() => {
            //verificando se tem novas mensagens na fila
            if (messageQueue.length > 0) {
                setCurrentMessages(prevState => [messageQueue[0], prevState[0], prevState[1]]);
                //limpando lista de new messages
                messageQueue.shift();
            }

            return () => clearInterval(timer);
        }, 3000);
    }, [])


    return (
        //View de rolagem da mostrar + mensagens
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}//style do container considerando a rolagem
            keyboardShouldPersistTaps='never'//sume o teclado ao clicar na lista de messages
        >
            {/* Buscando e mostrando messages */}
            {currentMessages.map((message) => <Message key={message.id} data={message} />)}


        </ScrollView>
    );
}