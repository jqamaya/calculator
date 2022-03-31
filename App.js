/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Row from './src/components/Row';
import Button from './src/components/Button';

import { handleNumber, handleEqual } from './src/util/Calculator';
import { convertToArabic, convertToRoman } from './src/util/Converter';

const App: () => Node = () => {
  const [shouldConvertToRoman, setShouldConvertToRoman] = useState(false);
  
  const [display, setDisplay] = useState('0 ');
  const [currentValue, setCurrentValue] = useState("0")
  const [previousValue, setPreviousValue] = useState(null)
  const [operator, setOperator] = useState(null)

  React.useEffect(() => {
    convert(currentValue)
  }, [shouldConvertToRoman]);

  React.useEffect(() => {
    setDisplay(currentValue)
  }, [currentValue]);

  const handleOperator = (value) => {
    setOperator(value)
    setPreviousValue(currentValue)
    setCurrentValue('0')
  }

  const handleClear = () => {
    setCurrentValue('0')
    setPreviousValue(null)
    setOperator(null)
    setDisplay('0')
  }

  const calculate = () => {
    let currentState = {
      currentValue,
      previousValue,
      operator,
    }
    currentState = handleEqual(currentState)
    setCurrentValue(currentState.currentValue)
    setPreviousValue(currentState.previousValue)
    setOperator(currentState.operator)
  }

  const handleTap = (type, value = null) => {
    switch (type) {
      case 'number': 
        setCurrentValue(handleNumber(value, currentValue))
        break;
      case 'operator':
        handleOperator(value)
        break;
      case 'equal':
        calculate()
        break;
      case 'clear':
        handleClear()
        break;
      default:
        // nothing to do
        break;
    }
  }

  const convert = (val) => {
    let valToDisplay = ''
    if (shouldConvertToRoman) {
      valToDisplay = convertToRoman(val)
    } else {
      valToDisplay = convertToArabic(val)
    }
    setCurrentValue(valToDisplay)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' />

      <Text style={styles.value}>
        {display}
      </Text>
      <Row>
        <Button
          text='C'
          theme='secondary'
          onPress={() => {
            handleTap('clear')
          }}
        />
        {/* Arabic */}
        <Button
          text={'AR'}
          theme='secondary'
          isPressed={shouldConvertToRoman === false}
          onPress={() => { 
            setShouldConvertToRoman(false);
          }}
        />
        {/* Roman Numeral */}
        <Button
          text={'RN'}
          theme='secondary'
          isPressed={shouldConvertToRoman === true}
          onPress={() => { 
            setShouldConvertToRoman(true);
          }}
        />
        <Button
          text='÷'
          theme='accent'
          onPress={() => handleTap('operator', '/')}
        />
      </Row>

      <Row>
        <Button text={shouldConvertToRoman ? 'VII' : '7'} onPress={() => handleTap('number', '7')} />
        <Button text={shouldConvertToRoman ? 'VIII' : '8'} onPress={() => handleTap('number', '8')} />
        <Button text={shouldConvertToRoman ? 'IX' : '9'} onPress={() => handleTap('number', '9')} />
        <Button
          text='×'
          theme='accent'
          onPress={() => handleTap('operator', '*')}
        />
      </Row>

      <Row>
        <Button text={shouldConvertToRoman ? 'IV' : '4'} onPress={() => handleTap('number', '4')} />
        <Button text={shouldConvertToRoman ? 'V' : '5'} onPress={() => handleTap('number', '5')} />
        <Button text={shouldConvertToRoman ? 'VI' : '6'} onPress={() => handleTap('number', '6')} />
        <Button
          text='—'
          theme='accent'
          onPress={() => handleTap('operator', '-')}
        />
      </Row>

      <Row>
        <Button text={shouldConvertToRoman ? 'I' : '1'} onPress={() => handleTap('number', '1')} />
        <Button text={shouldConvertToRoman ? 'II' : '2'} onPress={() => handleTap('number', '2')} />
        <Button text={shouldConvertToRoman ? 'III' : '3'} onPress={() => handleTap('number', '3')} />
        <Button
          text='+'
          theme='accent'
          onPress={() => handleTap('operator', '+')}
        />
      </Row>

      <Row>
        {
          shouldConvertToRoman ? null : 
          <Button
            text='0'
            size='double'
            onPress={() => handleTap('number', '0')}
          />
        }

        <Button
          text='='
          theme='accent'
          onPress={() => handleTap('equal')}
        />
      </Row>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    justifyContent: 'flex-end'
  },
  value: {
    color: 'white',
    fontSize: 40,
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 10
  }
});
 
export default App;
