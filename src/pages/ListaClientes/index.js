import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DatabaseConnection } from '../../database/database';

const db = DatabaseConnection.getConnection();

export default function ListaClientes() {
    const [clientes, setClientes] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            carregaClientes();
        });

        return unsubscribe;
    }, [navigation]);

    const carregaClientes = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Clientes',
                [],
                (_, { rows }) => {
                    setClientes(rows._array);
                }
            );
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DetalheCliente', { id: item.id })}>
            <Text style={styles.itemText}>{item.nome}</Text>
        </TouchableOpacity>
    );

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleNavigateToCadastro = () => {
        navigation.navigate('Cadastro');
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={clientes}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ flexGrow: 1 }}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhum cliente cadastrado.</Text>}
            />
            <TouchableOpacity style={styles.button} onPress={handleGoBack}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleNavigateToCadastro}>
                <Text style={styles.buttonText}>Cadastrar Novo Cliente</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        backgroundColor: '#fff',
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
