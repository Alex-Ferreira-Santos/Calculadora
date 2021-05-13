import React from 'react';
import {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

export default function App() {
  // Mapeamento de teclas
  const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, "x", 6, 5, 4, '-', 3, 2, 1, '+', 0, '.', '+/-', '=']

  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")
  const [lastButton, setLastButton] = useState("")


  function calculator(){
    const splitNumbers = currentNumber.split(' ')
    let total = 0
    let number = []
    let operators = ['+']
    

    for (let index = 0; index < splitNumbers.length; index+=2) {
      if(index + 1 > splitNumbers.length){
        break
      }
      number.push(Number(splitNumbers[index]))
      operators.push(splitNumbers[index+1])
    }

    for (let index = 0; index < number.length; index++) {
      let firstNumber = number[index]
      let operator = operators[index]
      console.log(firstNumber,operator,total)
      switch(operator){
        case '+': 
          total +=firstNumber
          break
        case '-': 
          total -=firstNumber
          break
        case 'x':
          total *=firstNumber
          break
        case '/': 
          total /=firstNumber
          break
        /*case '%':
          total = (firstNumber/100 * number[index + 1])*/
      }  
    }
    setCurrentNumber(total)
      
    // Faz ação referente tecla pressionada
  }

  function handleInput(buttonPressed){
    switch(buttonPressed){
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
        return
      case 'LIMPAR': // Limpa todo o conteúdo
        setLastNumber("") 
        setCurrentNumber("") 
        return
      case '=':
        setLastNumber(currentNumber + " = ")
        calculator()
        return
      case '+/-':
        return
    }

    if(['+','-','x','/','%'].includes(buttonPressed)){
      if(buttonPressed === '%'){
        setCurrentNumber(currentNumber + " " + buttonPressed + "x ")
      }else{
        setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      }
      setLastButton(buttonPressed)
      return
    }
    setLastButton(buttonPressed)
    setCurrentNumber(currentNumber + buttonPressed)
    
  }


  return (
    <View style={styles.container}>

      {/* Area onde o resultado é exibido */}
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      {/* Area onde os botões são exibidos*/}
      <View style={styles.buttons}>

        {buttons.map((button) => 
          button === '=' ? // Mapeamento do botão =
        <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, {backgroundColor: '#3dd0e3'}]}>
          <Text style={[styles.textButton, {color: "white", fontSize: 30}]}>{button}</Text>
        </TouchableOpacity>
          : // Mapeamento dos outros botões
          <TouchableOpacity onPress={() => handleInput(button)} key={button} style={styles.button}>
            <Text style={[styles.textButton, {color: typeof(button) === 'number' ? 'black': '#0093a6'}]}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#f5f5f5"
  },
  resultText: {
    color: "#282F38",
    fontSize: 32,
    fontWeight: "bold",
    padding: 12,
    textAlign: "right"
  },
  historyText:{
    color: "#7c7c7c",
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90, 
    minHeight: 90,
    flex: 2,
  },
  textButton: {
    color: "#7c7c7c",
    fontSize: 20,
  } 
});