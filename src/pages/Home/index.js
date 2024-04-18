import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DatabaseConnection } from '../../database/database';

const db = DatabaseConnection.getConnection();

export default function App() {
    const navigation = useNavigation();

    const goToCadastro = () => {
        navigation.navigate('Cadastro');
    }

    const goToListaClientes = () => {
        navigation.navigate('ListaClientes');
    }

    const goToPesquisaCliente = () => {
        navigation.navigate('PesquisaCliente');
    }

    const handleDeleteDatabase = () => {
        Alert.alert(
            'Excluir Banco de Dados',
            'Tem certeza de que deseja excluir todos os dados do banco de dados?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Confirmar',
                    onPress: () => {
                        db.transaction(tx => {
                            tx.executeSql(
                                'DROP TABLE IF EXISTS Clientes',
                                [],
                                () => console.log('Tabela Clientes excluída com sucesso'),
                                (_, error) => console.error('Erro ao excluir tabela Clientes:', error)
                            );
                            tx.executeSql(
                                'DROP TABLE IF EXISTS Telefones',
                                [],
                                () => console.log('Tabela Telefones excluída com sucesso'),
                                (_, error) => console.error('Erro ao excluir tabela Telefones:', error)
                            );
                            tx.executeSql(
                                'DROP TABLE IF EXISTS tbl_telefones_has_tbl_pessoa',
                                [],
                                () => console.log('Tabela tbl_telefones_has_tbl_pessoa excluída com sucesso'),
                                (_, error) => console.error('Erro ao excluir tabela tbl_telefones_has_tbl_pessoa:', error)
                            );
                        }, null, () => {
                            console.log('Banco de dados excluído com sucesso');
                            // Recarregar a tela ou executar outras ações necessárias após excluir o banco de dados
                        });
                    }
                }
            ]
        );
    };

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS Clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, data_nasc TEXT)",
                [],
                () => console.log("Tabela 'Clientes' criada"),
                (error) => console.log("Erro ao criar tabela 'Clientes':", error)
            );
        
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS Telefones (id INTEGER PRIMARY KEY AUTOINCREMENT, cliente_id INTEGER, numero TEXT, FOREIGN KEY(cliente_id) REFERENCES Clientes(id))",
                [],
                () => console.log("Tabela 'Telefones' criada"),
                (error) => console.log("Erro ao criar tabela 'Telefones':", error)
            );
        
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS tbl_telefones_has_tbl_pessoa (id_telefone INTEGER, id_pessoa INTEGER, CONSTRAINT fk_tbl_telefone_id FOREIGN KEY (id_telefone) REFERENCES tbl_telefones (id), CONSTRAINT fk_tbl_pessoa_id FOREIGN KEY (id_pessoa) REFERENCES tbl_clientes (id))",
                [],
                () => console.log("Tabela 'tbl_telefones_has_tbl_pessoa'"),
                (error) => console.log("Erro ao criar tabela 'tbl_telefones_has_tbl_pessoa':", error)
            );
        });        
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={goToCadastro} style={styles.button}>
                <Text style={styles.buttonText}>Ir para Cadastro</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToListaClientes} style={styles.button}>
                <Text style={styles.buttonText}>Ir para Lista de Clientes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToPesquisaCliente} style={styles.button}>
                <Text style={styles.buttonText}>Ir para Pesquisa de Cliente</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteDatabase} style={[styles.button, { backgroundColor: 'red' }]}>
                <Text style={styles.buttonText}>Excluir Banco de Dados</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
