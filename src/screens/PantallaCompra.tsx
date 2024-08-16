import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../theme/Styles';
import { Button } from 'react-native';

interface Motos {
  id: number;
  name: string;
  price: string;
  image: string;
}

type RootStackParamList = {
  PantallaCompra: { motocicleta: Motos };
  Compras: undefined;
};

type MotorcycleDetailsRouteProp = RouteProp<RootStackParamList, 'PantallaCompra'>;

export const PantallaCompra = () => {
  const route = useRoute<MotorcycleDetailsRouteProp>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { motocicleta } = route.params;

  const [cantidad, setCantidad] = useState(1);
  const [total, setTotal] = useState(parseFloat(motocicleta.price.replace('$', '').replace(',', '')));
  const [maxCantidad] = useState(5);
  const [purchasedQuantity, setPurchasedQuantity] = useState(0);

  useEffect(() => {
    const checkPurchasedQuantity = async () => {
      try {
        const purchasedData = await AsyncStorage.getItem('purchasedMotos');
        if (purchasedData) {
          const purchasedMotos = JSON.parse(purchasedData);
          const moto = purchasedMotos.find((moto: Motos) => moto.id === motocicleta.id);
          setPurchasedQuantity(moto ? moto.quantity : 0);
        }
      } catch (error) {
        console.error('Error al obtener las motos compradas:', error);
      }
    };

    checkPurchasedQuantity();
  }, [motocicleta.id]);

  const handleIncrement = () => {
    if (cantidad < maxCantidad - purchasedQuantity) {
      setCantidad(cantidad + 1);
      setTotal(total + parseFloat(motocicleta.price.replace('$', '').replace(',', '')));
    } else {
      Alert.alert('Límite de compra alcanzado', `No puedes comprar más de ${maxCantidad - purchasedQuantity} motos de este tipo.`);
    }
  };

  const handleDecrement = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
      setTotal(total - parseFloat(motocicleta.price.replace('$', '').replace(',', '')));
    }
  };

  const handleCompletePurchase = async () => {
    try {
      let purchasedMotos = await AsyncStorage.getItem('purchasedMotos');
      let updatedMotos = purchasedMotos ? JSON.parse(purchasedMotos) : [];

      const existingMotoIndex = updatedMotos.findIndex((moto: Motos) => moto.id === motocicleta.id);
      if (existingMotoIndex >= 0) {
        updatedMotos[existingMotoIndex].quantity += cantidad;
      } else {
        updatedMotos.push({ ...motocicleta, quantity: cantidad });
      }

      await AsyncStorage.setItem('purchasedMotos', JSON.stringify(updatedMotos));

      Alert.alert(`Compra finalizada con éxito. Total: $${total.toFixed(2)}`);
      navigation.goBack();
    } catch (error) {
      console.error('Error al finalizar la compra:', error);
    }
  };

  return (
    <View style={styles.container1}>
       <Button
                title="Ver Motos Compradas"
                onPress={() => navigation.navigate('Compras')}
            />
      <Text style={styles.PantallaPrincipalTitle1}>Carrito de Compra</Text>
      <Image
        source={{ uri: motocicleta.image }}
        style={styles.productImage1}
        resizeMode="cover"
      />
      <Text style={styles.productName1}>{motocicleta.name}</Text>
      <Text style={styles.productPrice1}>Precio: {motocicleta.price}</Text>
      <View style={styles.quantityContainer1}>
        <TouchableOpacity style={styles.quantityButton1} onPress={handleDecrement}>
          <Text style={styles.quantityButtonText1}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText1}>{cantidad}</Text>
        <TouchableOpacity style={styles.quantityButton1} onPress={handleIncrement}>
          <Text style={styles.quantityButtonText1}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.totalAmount1}>Total: ${total.toFixed(2)}</Text>
      <TouchableOpacity style={styles.purchaseButton1} onPress={handleCompletePurchase}>
        <Text style={styles.purchaseButtonText1}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
};
