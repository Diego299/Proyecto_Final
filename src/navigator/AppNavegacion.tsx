import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PRIMARY_COLOR } from '../Constantes/Constante';
import { PantallaInicioSesion } from '../screens/Inicio';
import { PantallaRegistro } from '../screens/Registro';
import { PantallaInicio } from '../screens/PantallaPrincipal';
import { PantallaCompra } from '../screens/PantallaCompra';
import { PantallaUsuariosRegistrados } from '../../PantalladeRegistros/PantallaUsuariosRegistrados';
import { PantallaCompras } from '../../PantalladeRegistros/PantallaCompras';

const Stack = createStackNavigator();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: PRIMARY_COLOR,
                },
            }}>
            <Stack.Screen name="InicioSesion" options={{ headerShown: false }} component={PantallaInicioSesion} />
            <Stack.Screen name="Registro" options={{ headerShown: false }} component={PantallaRegistro} />
            <Stack.Screen name="PantallaInicio" options={{ headerShown: false }} component={PantallaInicio} />
            <Stack.Screen name="PantallaCompra" options={{ headerShown: false }} component={PantallaCompra} />
            <Stack.Screen name="UsuariosRegistrados" component={PantallaUsuariosRegistrados} />
            <Stack.Screen name="Compras" component={PantallaCompras} />
        </Stack.Navigator>
    );
};
