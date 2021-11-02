import React from 'react';
import {
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    ColorValue,
    ActivityIndicator
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';


//Setando tipagem do botao (que virao pelo props)
type Props = TouchableOpacityProps & {
    title: string;
    color: ColorValue;
    backgroundColor: ColorValue;
    icon?: React.ComponentProps<typeof AntDesign>["name"];
    isLoading?: boolean;
}

export function Button({
    title,
    color,
    backgroundColor,
    icon,
    isLoading = false,
    ...rest
}: Props) {
    return (
        /* Componente Button */
        <TouchableOpacity
            style={[styles.button, { backgroundColor }]}
            activeOpacity={0.7}//definindo opacidade do efeito de touch do button
            disabled={isLoading}
            {...rest}
        >

            {/* Verificando qual componente mostrar */}
            {
                isLoading ?
                    /* Icone de loading  */
                    <ActivityIndicator color={color} />
                    :
                    <>
                        {/* Icone do Button */}
                        <AntDesign name={icon} size={24} style={styles.icon} />

                        {/* Texto do button */}
                        <Text style={[styles.title, { color }]}>
                            {title}
                        </Text>
                    </>
            }



        </TouchableOpacity>
    );
}