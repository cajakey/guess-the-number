import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Header from './components/Header';
import StartGame from './components/StartGame';
import Game from './components/Game';
import GameOver from './components/GameOver';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [round, setRound] = useState(0);

  const restartHandler = () => {
    setUserNumber(null);
  };

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = count => {
    if (count > 0) {
      setUserNumber(0);
      setRound(count);
    }
  }

  let content = <StartGame onStartGame={startGameHandler} />;
  
  if (userNumber) {
    content = <Game userGuess={userNumber} onGameOver={gameOverHandler} />;
  } else if (userNumber === 0) {
    content = <GameOver roundCount={round} onRestart={restartHandler} />
  }

  return (
    <View style={styles.screen}>
      <Header title="GUESS A NUMBER" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});