import React, { useState } from 'react';
import { Alert, Keyboard, TextInput, View } from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm() {
    //State de armazenagem do content da mensagem
    const [message, setMessage] = useState('');
    //State para saber se a mensagem esta sendo enviada ou nao
    const [sendingMessage, setSendingMessage] = useState(false);

    //Funcao gerenciamento do envio da message p/ o back-end
    async function handleMessageSubmit() {
        const messageFormatted = message.trim();//limpando espcos em branco no inicio e fim

        //teste só pra ter certeza
        if (messageFormatted.length > 0) {
            setSendingMessage(true);
            await api.post('/messages', { message: messageFormatted });//enviando p/ a rota de messages do back-end

            setMessage('');//limpando state message (e o input)
            Keyboard.dismiss();//fechando teclado
            setSendingMessage(false);//resetando status de envio de mensagens
            Alert.alert('Mensagem enviada com sucesso!');
        } else {
            //mensagem de alerta caso o input esteja vazio
            Alert.alert('Escreva a mensagem para enviar.')
        }

    }

    return (
        <View style={styles.container}>
            {/* Input para digitar message para enviar */}
            <TextInput
                keyboardAppearance='dark'//aparencia do teclado para digitar
                placeholder="Qual sua expectativa para o evento"
                placeholderTextColor={COLORS.GRAY_PRIMARY}
                multiline
                maxLength={140}//qnt total de caracters aceitos
                onChangeText={setMessage}
                value={message}
                style={styles.input}
                editable={!sendingMessage}
            />

            {/* Button send message  */}
            <Button
                title="Enviar mensagem"
                color={COLORS.WHITE}
                backgroundColor={COLORS.PINK}
                isLoading={sendingMessage}
                onPress={handleMessageSubmit}
            />
        </View>
    );
}