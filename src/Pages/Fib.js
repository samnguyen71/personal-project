import React from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 6,
    position: 'relative',
    backgroundColor: '#212121',
    border: '1px solid #383838',
    fontSize: 14,
    label: "Outlined",
    width: '145px',
    padding: '4px 8px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    fontFamily: [
      'Roboto', 'sans-serif'
    ].join(','),
    '&:focus': {
      borderColor: '#383838',
    },
  },
}));



export default class Fib extends React.Component {


  render() {
      return (
        <main>
          <div className="btn-toggle">
          </div>
          <header>
            <h1> Calculating nth Fibonacci Number Using Recursion</h1>
            <p>Define <i>n</i> (<i>n</i> must be ≤ 7) </p>
            <p>
            <FormControl variant="standard"> 
              <BootstrapInput 
              placeholder="n"
              />
            </FormControl>
            </p>
          </header> 
        </main>
      );
    }
};
