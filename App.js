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
    if(splitNumbers.findIndex(element => element === 'x') > 0){
      let val = splitNumbers.indexOf('x')
      splitNumbers[val] = '*'
    }

    if(splitNumbers.findIndex(element => element === '%x') > 0){
      let val = splitNumbers.indexOf('%x')
      let sum = Number(splitNumbers[val-1])/100 * Number(splitNumbers[val+1])
      splitNumbers.splice(splitNumbers.indexOf('%x') - 1,3)
      splitNumbers[val - 1] = `${sum}`
    }
  
    let total = ''
    

    for (let index = 0; index < splitNumbers.length; index++) {
      total = `${total} ${splitNumbers[index]}`
    }
    setCurrentNumber(eval(total))
      
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
        if(currentNumber.length != 0){
          const splitNumbers = currentNumber.split(' ')
          let expression = ''
          if(splitNumbers.length-1 >= 0){
            splitNumbers[splitNumbers.length - 1] = ` ${-splitNumbers[splitNumbers.length - 1]}` 
          }else{
            splitNumbers[splitNumbers.length - 1] = ` ${Math.abs(splitNumbers[splitNumbers.length - 1])}` 
          }
          console.log(splitNumbers)
          for (let index = 0; index < splitNumbers.length; index++) {
            expression+= splitNumbers[index]
          }
          setCurrentNumber(expression)
        }
        return
    }
  
    if(['+','-','x','/','%'].includes(buttonPressed) && currentNumber.length === 0){
      return
    }

    if(['+','-','x','/','%'].includes(lastButton) && ['+','-','x','/','%'].includes(buttonPressed)){
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
    setCurrentNumber(currentNumber + buttonPressed)
    setLastButton(buttonPressed)
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