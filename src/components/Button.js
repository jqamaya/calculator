import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions
} from 'react-native';

const screen = Dimensions.get('window');
const buttonWidth = screen.width / 4;

export default ({ onPress, text, size, theme, disabled, isPressed }) => {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  if (size === 'double') {
    buttonStyles.push(styles.buttonDouble);
  }

  if (theme === 'secondary') {
    buttonStyles.push(styles.buttonSecondary);
    textStyles.push(styles.textSecondary);
  } else if (theme === 'accent') {
    buttonStyles.push(styles.buttonAccent);
    textStyles.push(styles.textAccent);
  }

  if (isPressed) {
      buttonStyles.push(styles.buttonPressed);
  }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles} disabled={disabled}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 36
  },
  textAccent: {
    color: 'white',
    fontSize: 42
  },
  textSecondary: {
    color: 'black',
  },
  button: {
    backgroundColor: '#505050',
    flex: 1,
    height: Math.floor(buttonWidth - 15),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Math.floor(buttonWidth),
    margin: 7,
  },
  buttonDouble: {
    width: screen.width / 2 - 15,
  },
  buttonSecondary: {
    backgroundColor: '#D4D4D2'
  },
  buttonAccent: {
    backgroundColor: '#FF9500'
  },
  buttonPressed: {
      backgroundColor: '#FFF'
  },
});