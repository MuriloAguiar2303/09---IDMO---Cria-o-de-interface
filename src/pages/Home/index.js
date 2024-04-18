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

    const config = () => {
        navigation.navigate('Config');
    }
    const allFilms = () => {
        navigation.navigate('AllFilms');
    }

    /**
  * Função dentro do useEffect que cria a tabela caso ela não exista
  */
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS filmes (id INTEGER PRIMARY KEY AUTOINCREMENT, filme TEXT NOT NULL, genero TEXT NOT NULL, classificacao TEXT NOT NULL, data DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW', 'localtime')))",
                [], //[]: Este é o array de parâmetros. Como não estamos usando nenhum parâmetro na consulta SQL, deixamos esse array vazio.
                () => console.log('Tabela criada com sucesso'),//retorno de  sucesso
                // '_' É um parâmetro que representa o resultado da transação SQL, por convenção utiliza-se o underscore. para indicar que estamos ignorando esse valor.
                (_, error) => console.error(error) //retorno de  erro
            );
        });
    }, []);
    /**
    * Função utilizada para deletar as tabelas e a base de dados
    */



    return (
        <SafeAreaProvider>
            <SafeAreaView>

            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  
});