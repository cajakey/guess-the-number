import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Color from '../components/Color';

const GameOver = props => {
  return (
    <View style={styles.screen}>
      <Text style={styles.gameOver}>GAME OVER</Text>
      <Text style={styles.round}>Number of rounds: {props.roundCount}</Text>
      <Button title="RESTART" onPress={props.onRestart} color={Color.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameOver: {
    fontSize: 20,
    marginBottom: 10
  },
  round: {
    marginBottom: 20
  }
});

export default GameOver;