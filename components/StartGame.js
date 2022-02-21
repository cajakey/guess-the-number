import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Color from '../components/Color';

const StartGame = props => {
  const [value, setValue] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const inputHandler = inputText => {
    setValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetHandler = () => {
    setValue('');
    setConfirm(false);
  };

  const confirmHandler = () => {
    const chosenNumber = parseInt(value);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number should be between 1 to 99',
        [{ text: 'OK', style: 'destructive', onPress: resetHandler }]
      );
      return;
    }
    setConfirm(true);
    setSelectedNumber(chosenNumber);
    setValue('');
    Keyboard.dismiss();
  };

  let output;

  if (confirm) {
    output = (
      <Card style={styles.selectedContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title="START" onPress={() => props.onStartGame(selectedNumber)} color={Color.primary} />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback 
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>New Game</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={inputHandler}
            value={value}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Reset" onPress={resetHandler} color={Color.secondary} />
            </View>
            <View style={styles.button}>
              <Button title="Confirm" onPress={confirmHandler} color={Color.primary} />
            </View>
          </View>
        </Card>
        {output}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: 100
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  selectedContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
});

export default StartGame;