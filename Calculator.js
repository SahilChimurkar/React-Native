import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  const [value, setValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [prevValue, setPrevValue] = useState(null);

  const handleNumber = (num) => {
    if (value === '0') {
      setValue(num.toString());
    } else {
      setValue(value + num);
    }
  };

  const handleOperator = (op) => {
    setOperator(op);
    setPrevValue(value);
    setValue('0');
  };

  const calculate = () => {
    const current = parseFloat(value);
    const previous = parseFloat(prevValue);

    if (operator === '+') return previous + current;
    if (operator === '-') return previous - current;
    if (operator === '*') return previous * current;
    if (operator === '/') return previous / current;
  };

  const handleEqual = () => {
    const result = calculate();
    setValue(result.toString());
    setOperator(null);
    setPrevValue(null);
  };

  const handleClear = () => {
    setValue('0');
    setOperator(null);
    setPrevValue(null);
  };

  const Button = ({ onPress, text, color = '#28a745', textColor = 'white', width = '23%' }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: color, width: width }
      ]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>
          {value}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <Button text="C" onPress={handleClear} color="#dc3545" />
        <Button text="±" onPress={() => setValue((-parseFloat(value)).toString())} />
        <Button text="%" onPress={() => setValue((parseFloat(value) / 100).toString())} />
        <Button text="÷" onPress={() => handleOperator('/')} />
      </View>

      <View style={styles.buttonRow}>
        <Button text="7" onPress={() => handleNumber(7)} />
        <Button text="8" onPress={() => handleNumber(8)} />
        <Button text="9" onPress={() => handleNumber(9)} />
        <Button text="×" onPress={() => handleOperator('*')} />
      </View>

      <View style={styles.buttonRow}>
        <Button text="4" onPress={() => handleNumber(4)} />
        <Button text="5" onPress={() => handleNumber(5)} />
        <Button text="6" onPress={() => handleNumber(6)} />
        <Button text="-" onPress={() => handleOperator('-')} />
      </View>

      <View style={styles.buttonRow}>
        <Button text="1" onPress={() => handleNumber(1)} />
        <Button text="2" onPress={() => handleNumber(2)} />
        <Button text="3" onPress={() => handleNumber(3)} />
        <Button text="+" onPress={() => handleOperator('+')} />
      </View>

      <View style={styles.buttonRow}>
        <Button text="0" onPress={() => handleNumber(0)} width="48%" />
        <Button text="." onPress={() => setValue(value + '.')} />
        <Button text="=" onPress={handleEqual} />
      </View>

      <Text style={styles.signature}>Calc by Claude</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  display: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    fontSize: 64,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    elevation: 3,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  signature: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    color: '#666',
    fontSize: 16,
  }
});
