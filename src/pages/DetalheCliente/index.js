import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DatabaseConnection } from '../../database/database';

const db = DatabaseConnection.getConnection();

export default function DetalhesCliente() {
    const [cliente, setCliente] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;

    useEffect(() => {
        loadCliente();
    }, []);

    const loadCliente = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Clientes WHERE id = ?',
                [id],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        setCliente(rows.item(0));
                    } else {
                        Alert.alert('Erro', 'Cliente não encontrado.');
                        navigation.goBack();
                    }
                },
                (_, error) => {
                    Alert.alert('Erro', 'Erro ao buscar cliente.');
                    console.error(error);
                    navigation.goBack();
                }
            );
        });
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {cliente ? (
                <View>
                    <Text style={styles.label}>Nome:</Text>
                    <Text style={styles.value}>{cliente.nome}</Text>
                    <Text style={styles.label}>Data de Nascimento:</Text>
                    <Text style={styles.value}>{cliente.data_nasc}</Text>
                </View>
            ) : (
                <Text style={styles.error}>Carregando...</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleGoBack}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        marginBottom: 20,
    },
    error: {
        fontSize: 16,
        color: 'red',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
