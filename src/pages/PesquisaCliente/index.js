import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DatabaseConnection } from '../../database/database';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const db = DatabaseConnection.getConnection();

export default function PesquisaCliente() {
    const navigation = useNavigation();
    const [input, setInput] = useState('');
    const [resultados, setResultados] = useState([]);

    const handleSearch = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT Clientes.nome, Clientes.data_nasc,Telefones.numero FROM Clientes join WHERE nome LIKE ? OR data_nasc LIKE ?',
                [`%${input}%`, `%${input}%`],
                (_, { rows }) => {
                    setResultados(rows._array);
                }
            );
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DetalhesCliente', { id: item.id })}>
            <Text style={styles.itemText}>{item.nome}</Text>
        </TouchableOpacity>
    );

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaProvider>
        <View style={styles.container}>
            <Text style={styles.title}>Pesquisar Cliente</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o nome ou data de nascimento do cliente"
                value={input}
                onChangeText={text => setInput(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>Pesquisar</Text>
            </TouchableOpacity>
            <FlatList
                data={resultados}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ flexGrow: 1 }}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhum cliente encontrado.</Text>}
            />
            <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
                <Text style={styles.goBackButtonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
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
    goBackButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    goBackButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
});
