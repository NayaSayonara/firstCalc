import {Paper, styled, Grid, Button} from '@mui/material';
import Container from '@mui/material/Container';
import React, {useState} from 'react';
import { GridDigitButton } from './GridDigitButton';
import { GridOperationButton } from './GridOperationButton';

const OutputContanier = styled('div')(({theme}) =>({
  width:"100%",
  textAlign: 'left',
  height: "2em",
  padding: theme.spacing(2),
  fontSize: "4em",
  overflow:"hidden"

}))
const CalculatorBase = styled(Paper)(({theme})=>({
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  borderRadius: 15
}))
function App() {
  
  const [currentValue,setCurrentValue] = useState("0");
  const [operation,setOperation] = useState("");
  const [preValue,setPreValue] = useState("");
  const [overwrite,setOverwrite] = useState(true);


  const calculate = () => { 
    if (!preValue || !operation) return currentValue;

    const curr = parseFloat(currentValue);
    const prev = parseFloat(preValue);

    let res;
    switch (operation) {
      case "÷":
        res = prev / curr;
        break;
        case "*":
        res = prev * curr;
        break;
        case "-":
        res = prev - curr;
        break;
        case "+":
        res = prev + curr;
        break;
    }
return res;
  }

const equals = () => {
  const val = calculate();
  setCurrentValue(`${val}`);
  setPreValue("");
  setOperation("");
  setOverwrite(true);
}

  const clear = () => {
    setPreValue("");
    setOperation("");
    setCurrentValue("0");
    setOverwrite(true);
  }

  const del = () => {
    setCurrentValue("0");
    setOverwrite(true);
  }

  const percent = () =>{
    const curr = parseFloat(currentValue);
    setCurrentValue((curr / 100).toString());
  }

  const selectOperation = (operation:string) => {
    if (preValue){
      const val = calculate();
      setCurrentValue(`${val}`);
      setPreValue(`${val}`);
    }
    else{
      setPreValue(currentValue);
    }
    
    setOperation(operation);
    setOverwrite(true);
  }

  const setDigit = (digit:string) => {

    if(currentValue[0] === "0" && digit ==="0") return;
    if(currentValue.includes(".") && digit ===".") return;

    if (overwrite && digit !== "."){
      setCurrentValue(digit)
    }
    else {
    setCurrentValue(`${currentValue}${digit}`);
    }
    setOverwrite(false);
  }
  return (
    <Container maxWidth="sm">
      <CalculatorBase elevation={3}>
<Grid container spacing={1}>
  <Grid item xs={12}>
    <OutputContanier>{currentValue}</OutputContanier>
  </Grid>
  <Grid item container columnSpacing={1}>
    <GridOperationButton operation={"AC"} selectOperation={clear} selectedOperation={operation} />
    <GridOperationButton operation={"C"} selectOperation={del} selectedOperation={operation} />
    <GridOperationButton operation={"%"} selectOperation={percent} selectedOperation={operation} />
    <GridOperationButton operation={"÷"} selectOperation={selectOperation} selectedOperation={operation} />
  </Grid>
<Grid item container columnSpacing={1}>
  <GridDigitButton digit={"7"} enterDigit={setDigit} />
  <GridDigitButton digit={"8"} enterDigit={setDigit} />
  <GridDigitButton digit={"9"} enterDigit={setDigit} />
  <GridOperationButton operation={"*"} selectOperation={selectOperation} selectedOperation={operation} />
</Grid>
<Grid item container columnSpacing={1}>
  <GridDigitButton digit={"4"} enterDigit={setDigit} />
  <GridDigitButton digit={"5"} enterDigit={setDigit} />
  <GridDigitButton digit={"6"} enterDigit={setDigit} />
  <GridOperationButton operation={"-"} selectOperation={selectOperation} selectedOperation={operation} />
</Grid>
<Grid item container columnSpacing={1}>
  <GridDigitButton digit={"1"} enterDigit={setDigit} />
  <GridDigitButton digit={"2"} enterDigit={setDigit} />
  <GridDigitButton digit={"3"} enterDigit={setDigit} />
  <GridOperationButton operation={"+"} selectOperation={selectOperation} selectedOperation={operation} />
</Grid>
<Grid item container columnSpacing={1}>
  <GridDigitButton digit={"0"} enterDigit={setDigit} xs={6}/>
  <GridDigitButton digit={"."} enterDigit={setDigit} />
  <Grid item xs={3}>
    <Button fullWidth variant="contained" onClick={equals}>
      =
    </Button>
  </Grid>
</Grid>


</Grid>
      </CalculatorBase>

    </Container>
  );
}

export default App;
