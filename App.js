/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
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

const App: () => Node = () => {
  const [count, setCount] = useState('0 ');
  const [dec, setDec] = useState('1');
  const [shouldConvertToRoman, setShouldConvertToRoman] = useState(false);

  const removeWhiteSpaces = (value) => {
    return value.replace(/\s/g, '')
  }

  const isOperator = (val) => {
    return (
      val == '+' 
      || val == '*' 
      || val == '-' 
      || val == '/'
    )
  }

  const isRoman = (val) => {
    return (
      val == 'I' 
      || val == 'II' 
      || val == 'III' 
      || val == 'IV' 
      || val == 'V' 
      || val == 'VI' 
      || val == 'VII' 
      || val == 'VIII' 
      || val == 'IX'
    )
  }

  const handleInput = (val) => {
    const integer = removeWhiteSpaces(val)
    const value = convert(val)

    const trim = removeWhiteSpaces(value)
    const trimCount = removeWhiteSpaces(count)
    const lastIndexVal = trimCount[trimCount.length - 1]

    if (isOperator(trim) && isOperator(lastIndexVal)) {
      setCount(count);
      setDec(dec);
    } else {
      if (trimCount == '0') {
        if (isOperator(trim)) {
          setCount(count); 
          setDec(dec);
        } else {
          setCount(value); 
          setDec(integer);
        }
      } else {
        if ((trimCount == 'I' && isRoman(trim))) {
          setCount(value); 
          setDec(integer)
        } else {
          setCount(count.concat(value)); 
          setDec(dec.concat(integer))
        }
      }
    }
  }

  const compute = () => {
    if (shouldConvertToRoman) {
      const stringList = eval(dec).toString()
      const mask = convert(stringList)

      setDec(stringList)
      setCount((mask.toString()) + ' ')
    } else {
      setCount((eval(removeWhiteSpaces(count)).toString()) + ' ')
    }
  }

  const convert = (val = '') => {
    if (shouldConvertToRoman) {
      return (convertToRoman(val).length != 0 ? convertToRoman(val) : val) + (' ')
    }
    return (convertToArabic(val) ? convertToArabic(val) : val) + (' ')
  }

  const chartRoman = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ];

  const convertToRoman = (val) => (
    chartRoman.reduce((acc, numeral) => {
      const [romVal, remainder] = acc;
      const [roman, value] = numeral;
      return [romVal + roman.repeat(remainder / value), remainder % value];
    }, ['', val])[0]
  )

  const chartArabic = {
    I: 1,
    IV: 4,
    V: 5,
    IX: 9,
    X: 10,
    XL: 40,
    L: 50,
    XC: 90,
    C: 100,
    CD: 400,
    D: 500,
    CM: 900,
    M: 1000
  }

  const convertToArabic = (val) => {
    const dec = val.slice(0, 2);
    if (!val) {
      return 0;
    }
    return dec in chartArabic
      ? chartArabic[dec] + convertToArabic(val.slice(2)) 
      : chartArabic[val[0]] + convertToArabic(val.slice(1));
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' />

      <Text style={styles.value}>
        {count}
      </Text>
      <Row>
        <Button
          text='C'
          theme='secondary'
          onPress={() => { setCount(shouldConvertToRoman ? 'I ' : '0 '); setDec('1') }}
        />
        {/* Arabic */}
        <Button
          text={'AR'}
          theme='secondary'
          isPressed={shouldConvertToRoman === false}
          onPress={() => { 
            setShouldConvertToRoman(!shouldConvertToRoman); 
            convert(); 
            setCount(!shouldConvertToRoman ? 'I ' : '0 '); 
          }}
        />
        {/* Roman Numeral */}
        <Button
          text={'RN'}
          theme='secondary'
          isPressed={shouldConvertToRoman === true}
          onPress={() => { 
            setShouldConvertToRoman(!shouldConvertToRoman); 
            convert(); 
            setCount(!shouldConvertToRoman ? 'I ' : '0 '); 
          }}
        />
        <Button
          text='÷'
          theme='accent'
          onPress={() => handleInput('/')}
        />
      </Row>

      <Row>
        <Button text={shouldConvertToRoman ? 'VII' : '7'} onPress={() => handleInput('7')} />
        <Button text={shouldConvertToRoman ? 'VIII' : '8'} onPress={() => handleInput('8')} />
        <Button text={shouldConvertToRoman ? 'IX' : '9'} onPress={() => handleInput('9')} />
        <Button
          text='×'
          theme='accent'
          onPress={() => handleInput('*')}
        />
      </Row>

      <Row>
        <Button text={shouldConvertToRoman ? 'IV' : '4'} onPress={() => handleInput('4')} />
        <Button text={shouldConvertToRoman ? 'V' : '5'} onPress={() => handleInput('5')} />
        <Button text={shouldConvertToRoman ? 'VI' : '6'} onPress={() => handleInput('6')} />
        <Button
          text='—'
          theme='accent'
          onPress={() => handleInput('-')}
        />
      </Row>

      <Row>
        <Button text={shouldConvertToRoman ? 'I' : '1'} onPress={() => handleInput('1')} />
        <Button text={shouldConvertToRoman ? 'II' : '2'} onPress={() => handleInput('2')} />
        <Button text={shouldConvertToRoman ? 'III' : '3'} onPress={() => handleInput('3')} />
        <Button
          text='+'
          theme='accent'
          onPress={() => handleInput('+')}
        />
      </Row>

      <Row>
        {
          shouldConvertToRoman ? null : 
          <Button
            text='0'
            size='double'
            onPress={() => handleInput('0')}
          />
        }

        <Button
          text='='
          theme='accent'
          onPress={() => compute()}
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
