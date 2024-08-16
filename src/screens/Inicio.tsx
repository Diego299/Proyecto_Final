import React, { useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { TitleComponent } from '../Componentes/Titulo';
import { InputComponent } from '../Componentes/Aporte';
import { ButtonComponent } from '../Componentes/Boton';
import { BodyComponent } from '../Componentes/Cuerpo';
import { PRIMARY_COLOR } from '../Constantes/Constante';
import { styles } from '../theme/Styles';

interface FormLogin {
    email: string;
    password: string;
    username: string;
    phoneNumber: string;
    rememberMe: boolean;
}

interface User {
    id: number;
    email: string;
    password: string;
}

type RootStackParamList = {
    InicioSesion: undefined;
    Registro: undefined;
    PantallaInicio: undefined;
};

export const PantallaInicioSesion = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [formLogin, setFormLogin] = useState<FormLogin>({
        email: '',
        password: '',
        username: '',
        phoneNumber: '',
        rememberMe: false,
    });
    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

    const handleSetValues = (name: string, value: string) => {
        setFormLogin({ ...formLogin, [name]: value });
    };

    const handleSignIn = async () => {
        if (!formLogin.email || !formLogin.password || !formLogin.username || !formLogin.phoneNumber) {
            Alert.alert('Error', 'Por favor, ingrese valores en todos los campos!');
            return;
        }

        const user = await verifyUser();
        if (!user) {
            Alert.alert('Error', 'Correo y/o contraseña incorrecta!');
            return;
        }

        navigation.navigate('PantallaInicio');
    };

    const verifyUser = async (): Promise<User | null> => {
        try {
            const users = JSON.parse(await AsyncStorage.getItem('users') || '[]');
            return users.find((user: User) => user.email === formLogin.email && user.password === formLogin.password) || null;
        } catch (error) {
            Alert.alert('Error', 'No se pudo verificar al usuario.');
            return null;
        }
    };

    return (
        <View style={styles.globalTitle}>
            <StatusBar backgroundColor={PRIMARY_COLOR} />
            <TitleComponent title='Iniciar Sesión' />
            <BodyComponent>
                <Text style={styles.titleHeaderBody}>Bienvenido a la Interfaz Principal</Text>
                <Text style={styles.textBody}>Realiza tus consultas de manera más rápida y eficaz</Text>
                <View style={styles.contentInput}>
                    <InputComponent placeholder='Nombre de usuario' handleSetValues={handleSetValues} name='username' />
                    <InputComponent placeholder='Correo' handleSetValues={handleSetValues} name='email' />
                    <InputComponent
                        placeholder='Contraseña'
                        handleSetValues={handleSetValues}
                        name='password'
                        isPassword={hiddenPassword}
                        hasIcon={true}
                        setHiddenPaswword={() => setHiddenPassword(!hiddenPassword)}
                    />
                    <InputComponent placeholder='Número de teléfono' handleSetValues={handleSetValues} name='phoneNumber' />
                </View>
                <ButtonComponent textButton='Iniciar' onPress={handleSignIn} />
                <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                    <Text style={styles.textRedirection}>¿No tienes una cuenta? Regístrate ahora</Text>
                </TouchableOpacity>
            </BodyComponent>
        </View>
    );
};
