import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Motos {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

export const PantallaCompras = () => {
  const [purchases, setPurchases] = useState<Motos[]>([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const storedPurchases = await AsyncStorage.getItem('purchasedMotos');
        if (storedPurchases) {
          setPurchases(JSON.parse(storedPurchases));
        }
      } catch (error) {
        console.error('Error al obtener las compras:', error);
      }
    };

    fetchPurchases();
  }, []);

  const handleDelete = async (id: number) => {
    Alert.alert(
      'Eliminar Compra',
      '¿Estás seguro de que quieres eliminar esta compra?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              const updatedPurchases = purchases.filter(purchase => purchase.id !== id);
              setPurchases(updatedPurchases);
              await AsyncStorage.setItem('purchasedMotos', JSON.stringify(updatedPurchases));
            } catch (error) {
              console.error('Error al eliminar la compra:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: Motos }) => (
    <View style={styles.itemContainer}>
      <Text>Nombre: {item.name}</Text>
      <Text>Precio: {item.price}</Text>
      <Text>Cantidad: {item.quantity}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compras Realizadas</Text>
      <FlatList
        data={purchases}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#ff4d4d',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
