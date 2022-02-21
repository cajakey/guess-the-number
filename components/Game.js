import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Color from '../components/Color';

const random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  return randomNumber;
};

const randomNumber = random(1, 100);

const Game = props => {
  const [guess, setGuess] = useState(props.userGuess);
  const [count, setCount] = useState(0);

  const low = useRef(1);
  const high = useRef(100);

  useEffect(() => {
    if (guess === randomNumber) {
      props.onGameOver(count);
    }
  });

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && guess < randomNumber) || (direction === 'higher' && guess > randomNumber)) {
      Alert.alert('Incorrect guess!', 'You are going in the wrong direction', [
        { text: 'OK', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      high.current = guess;
    } else {
      low.current = guess;
    }
    const nextGuess = random(low.current, high.current, guess)
    setGuess(nextGuess);
    setCount(curCount => curCount + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Your Guess</Text>
      <NumberContainer>{guess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} color={Color.secondary} />
        </View>
        <View style={styles.button}>
          <Button title="HIGHER" onPress={nextGuessHandler.bind(this, 'higher')} color={Color.primary} />
        </View>
      </Card>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  },
  button: {
    width: 75
  }
});

export default Game;