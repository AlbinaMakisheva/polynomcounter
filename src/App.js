import './App.css';
import { useState, useEffect} from 'react';
import { Slider, Stack, Typography, TextField, Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

function App() {

  //data for first part
  const [val, setVal]= useState(0);
  const [coef, setCoef] = useState([0,0,0,0,0,0]);

  //data for function
  let [xf, setXf]= useState(0);
  const [pf, setPf]= useState(0);

  //data for graph
  const [from, setFrom]= useState(0);
  const [to, setTo]= useState(0);
  const [array, setArr]= useState([]);

  useEffect(()=> countTable,[array]);
  useEffect(() => { countF(coef, xf) }, [coef, xf, val]);


  // change power of pol f
  const changeSlider=(e)=>{

    let newVal= parseFloat(e.target.value);
    setVal(newVal);

    // change the rest of coefs to zero if val becomes less
    if (coef.length > newVal) {
      const newCoef = [...coef];
        for (let i = coef.length; i > newVal; i--) {
          newCoef[i] = 0;
        }
      setCoef(newCoef);
   } 
  }

  // set coefs vals
  const changeCoef=(e, index)=>{
    const newCoef = [...coef]; 

    const c = parseFloat(e.target.value);
    newCoef[index] = isNaN(c) ? 0 : c;

    setCoef(newCoef);

   countF(newCoef, xf);
  }

  // create textfields for coefs
  const textFields = [];
  for (let i = -1; i < val; i++) {
    textFields.push(<TextField label={`a ${i + 1}`} value={coef[`${i + 1}`]} onChange={(e) => changeCoef(e, `${i + 1}`)} />);
  }

  // count P function
  const countF=(newCoef, xf)=>{
    const xVal = parseFloat(xf);
    const newx = isNaN(xVal) ? 0 : xVal;
    const Presult = newCoef[5] * Math.pow(newx, 5) + newCoef[4] * Math.pow(newx, 4)+ newCoef[3] * Math.pow(newx, 3) + newCoef[2] * Math.pow(newx, 2) + newCoef[1] * newx + newCoef[0];
    setPf(Presult);
  }


  // count nums from-to
  const countTable=()=>{
    const result = [];

    const fromVal= parseFloat(from);
    const newfrom = isNaN(fromVal) ? 0 : fromVal;

    const toVal = parseFloat(to);
    const newto = isNaN(toVal) ? 0 : toVal;

    for (let i = newfrom; i <= newto; i++) {
      result.push({x: i, y: coef[5] * Math.pow(i, 5) + coef[4] * Math.pow(i, 4)+ coef[3] * Math.pow(i, 3) + coef[2] * Math.pow(i, 2) + coef[1] * i + coef[0]});
    }
    setArr(result);
  }


  return (
    <div className="App">
      <header>
        <Typography variant='h3'>Polynom Counter</Typography>
      </header>
      
      <Stack spacing={10} direction="column" padding={10} alignItems="center">

  {/* First part (power slider) */}
        <Slider aria-label='Polynom slider' 
                color= 'secondary'
                value={val}
                step={1}
                valueLabelDisplay="on"
                min={0}
                max={5}
                onChange={changeSlider}/>

  {/* Second part (coefs) */}
        <Stack spacing={3} direction="row"  alignItems="center">
          <Typography sx={{'font-size': '20px'}}>Koeficenty:</Typography>
          {textFields}
        </Stack> 

  {/* Third part (count) */}
        <Stack spacing={5} margin={10} direction="row" alignItems="center">
        <Typography sx={{'font-size': '20px'}}>Vypocet:</Typography>
        <Typography sx={{'font-size': '20px'}}>P(<TextField className='input' label='x'
                                onChange={(e)=>
                                          setXf(e.target.value)}/>)={pf}
        </Typography>
        </Stack>

        <Stack spacing={5} margin={10} direction="row" alignItems="center">
        <Typography sx={{'font-size': '20px'}}>Tabulka:</Typography>
        <Typography><TextField label='od' className='input' onChange={(e)=>{
                                                            setFrom(e.target.value)
                                                            countTable()}}/>
                    <TextField label='do' className='input' onChange={(e)=>{
                                                            setTo(e.target.value)
                                                            countTable()}}/></Typography>
        </Stack>

        <Stack spacing={5} direction="row" padding={10}  alignItems="center">

  {/* Table */}
        <Table aria-label="collapsible table" >
        <TableHead>
          <TableRow>
            <TableCell>x</TableCell>
            <TableCell align="right">P(x)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {array.map((el)=>(
              <TableRow key={el.x}>
                <TableCell>{el.x}</TableCell>
                <TableCell align="right">{el.y}</TableCell>
              </TableRow>
          ))}
        </TableBody>
        </Table>

  {/* Graph */}
        <LineChart width={400} height={400} data={array}>
          <Line type='monotone' dataKey='y' stroke='#000000' />
          <XAxis dataKey='x' />
          <YAxis/>
        </LineChart>

        </Stack>
      </Stack>
    </div>
  );
}

export default App;
