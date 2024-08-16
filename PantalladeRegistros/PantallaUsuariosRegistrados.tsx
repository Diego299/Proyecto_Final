import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

interface CuestionarioRegistro {
  id: number;
  Nombre: string;
  email: string;
  NumberTelefono: string;
}

export const PantallaUsuariosRegistrados = () => {
  const [users, setUsers] = useState<CuestionarioRegistro[]>([]);
  const [selectedUser, setSelectedUser] = useState<CuestionarioRegistro | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem('users');
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        }
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    try {
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      Alert.alert('Éxito', 'Usuario eliminado con éxito!');
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el usuario.');
    }
  };

  const renderItem = ({ item }: { item: CuestionarioRegistro }) => (
    <View style={styles.itemContainer}>
      <Text>Nombre: {item.Nombre}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Número de Teléfono: {item.NumberTelefono}</Text>
      <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
        <Text style={styles.deleteButton}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios Registrados</Text>
      <FlatList
        data={users}
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
  },
  deleteButton: {
    color: 'red',
    fontSize: 16,
  },
});