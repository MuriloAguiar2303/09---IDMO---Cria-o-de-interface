import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DatabaseConnection } from '../../database/database'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation, StackActions } from '@react-navigation/native'

// Abra ou crie o banco de dados SQLite
const db = new DatabaseConnection.getConnection;

export default function App() {

    const navigation = useNavigation();

    const Cadastro = () => {
        navigation.navigate('Cadastro');
    }

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS Clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, data_nasc DATE)",
                [],
                () => console.log("Tabela 'Clientes' criada"),
                (error) => console.log("Erro ao criar tabela 'Clientes':", error)
            );
    
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS Telefones (id INTEGER PRIMARY KEY AUTOINCREMENT, numero TEXT)",
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
        <SafeAreaProvider>
            <SafeAreaView>
                <TouchableOpacity onPress={Cadastro}></TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  
});