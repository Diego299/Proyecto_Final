import React, { useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { InputComponent } from '../Componentes/Aporte';
import { ButtonComponent } from '../Componentes/Boton';
import { BodyComponent } from '../Componentes/Cuerpo';
import { TitleComponent } from '../Componentes/Titulo';
import { PRIMARY_COLOR } from '../Constantes/Constante';
import { styles } from '../theme/Styles';
import { Button } from 'react-native';

interface CuestionarioRegistro {
  id?: number;
  Nombre: string;
  email: string;
  password: string;
  confirmacionPassword: string;
  NumberTelefono: string;
}

type RootStackParamList = {
  InicioSesion: undefined;
  UsuariosRegistrados: undefined;
};

export const PantallaRegistro = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [users, setUsers] = useState<CuestionarioRegistro[]>([]);
  const [formRegister, setFormRegister] = useState<CuestionarioRegistro>({
    Nombre: '',
    email: '',
    password: '',
    confirmacionPassword: '',
    NumberTelefono: '',
  });

  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState<boolean>(true);

  const handleSetValues = (name: string, value: string) => {
    setFormRegister({ ...formRegister, [name]: value });
  };

  const handleRegister = async () => {
    if (
      !formRegister.Nombre ||
      !formRegister.email ||
      !formRegister.password ||
      !formRegister.confirmacionPassword ||
      !formRegister.NumberTelefono
    ) {
      Alert.alert('Error', 'Por favor, complete todos los campos!');
      return;
    }

    if (formRegister.password !== formRegister.confirmacionPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden!');
      return;
    }

    const newUser = {
      ...formRegister,
      id: users.length + 1,
    };

    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);

    try {
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      Alert.alert('Éxito', 'Usuario registrado con éxito!');
      setFormRegister({
        Nombre: '',
        email: '',
        password: '',
        confirmacionPassword: '',
        NumberTelefono: '',
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el usuario.');
    }
  };

  return (
    <View>
      <View>
        <Button
          title="Ver Usuarios Registrados"
          onPress={() => navigation.navigate('UsuariosRegistrados')}
        />
      </View>
      <StatusBar backgroundColor={PRIMARY_COLOR} />
      <TitleComponent title="Crear Cuenta" />
      <BodyComponent>
        <View>
          <Text style={styles.titleHeaderBody}>Segunda Interfaz</Text>
          <Text style={styles.textBody}>
            Completa los siguientes campos para crear una cuenta
          </Text>
        </View>
        <View style={styles.contentInput}>
          <InputComponent
            placeholder="Nombre completo"
            handleSetValues={handleSetValues}
            name="Nombre"
          />
          <InputComponent
            placeholder="Correo"
            handleSetValues={handleSetValues}
            name="email"
          />
          <InputComponent
            placeholder="Contraseña"
            handleSetValues={handleSetValues}
            name="password"
            isPassword={hiddenPassword}
            hasIcon={true}
            setHiddenPaswword={() => setHiddenPassword(!hiddenPassword)}
          />
          <InputComponent
            placeholder="Confirmar Contraseña"
            handleSetValues={handleSetValues}
            name="confirmacionPassword"
            isPassword={hiddenConfirmPassword}
            hasIcon={true}
            setHiddenPaswword={() => setHiddenConfirmPassword(!hiddenConfirmPassword)}
          />
          <InputComponent
            placeholder="Número de teléfono"
            handleSetValues={handleSetValues}
            name="NumberTelefono"
          />
        </View>
        <ButtonComponent textButton="Registrarse" onPress={handleRegister} />
        <TouchableOpacity onPress={() => navigation.navigate('InicioSesion')}>
          <Text style={styles.textRedirection}>
            ¿Ya tienes una cuenta? Inicia sesión aquí
          </Text>
        </TouchableOpacity>
      </BodyComponent>
    </View>
  );
};