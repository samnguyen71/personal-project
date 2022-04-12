import React, { useState } from "react";
import {getInsertionSortAnimations} from '../sortingAlgorithms/insertionsortAlgorithm';
import '../styles/SortingVisualizer.css';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';

const BootstrapButton = styled(Button)({
  borderRadius: 6,
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 14,
  padding: '4px 8px',
  border: '1px solid #383838',
  lineHeight: 1.5,
  backgroundColor: '#212121',
  height: '31px',
  width: '145px',
  fontFamily: [
    'Roboto',
    'sans-serif',
  ].join(','),
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: '#383838',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#212121',
    borderColor: '#383838',
  },
  '&:focus': {
    boxShadow: 'none',
    backgroundColor: '#212121',
  },
});


const IOSSlider = styled(Slider)(({ theme }) => ({
    color: '#cbcfd3',
    height: 2,
    width: '355px',
    padding: '15px 0',
    '& .MuiSlider-thumb': {
      height: 18,
      width: 18,
      backgroundColor: '#cbcfd3',
      boxShadow: iOSBoxShadow,
      '&:focus, &:hover, &.Mui-active': {
        boxShadow:
          '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        '@media (hover: none)': {
          boxShadow: iOSBoxShadow,
        },
      },
    },
    '& .MuiSlider-valueLabel': {
      fontSize: 14,
      fontWeight: 'normal',
      bottom: 10,
      backgroundColor: 'unset',
      color: '#cbcfd3',
      '&:before': {
        display: 'none',
      },
      '& *': {
        background: 'transparent',
        color: '#cbcfd3',
      },
    },
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-rail': {
      opacity: 0.5,
      backgroundColor: '#cbcfd3',
    },
    '& .MuiSlider-mark': {
      backgroundColor: '#cbcfd3',
      height: 8,
      width: 1,
      '&.MuiSlider-markActive': {
        opacity: 1,
        backgroundColor: 'currentColor',
      },
    },
  }));

  const SOISlider = styled(Slider)(({ theme }) => ({
    color: '#cbcfd3',
    height: 2,
    width: '335px',
    padding: '15px 0',
    '& .MuiSlider-thumb': {
      height: 18,
      width: 18,
      backgroundColor: '#cbcfd3',
      boxShadow: iOSBoxShadow,
      '&:focus, &:hover, &.Mui-active': {
        boxShadow:
          '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        '@media (hover: none)': {
          boxShadow: iOSBoxShadow,
        },
      },
    },
    '& .MuiSlider-valueLabel': {
      fontSize: 14,
      fontWeight: 'normal',
      bottom: 10,
      backgroundColor: 'unset',
      color: '#cbcfd3',
      '&:before': {
        display: 'none',
      },
      '& *': {
        background: 'transparent',
        color: '#cbcfd3',
      },
    },
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-rail': {
      opacity: 0.5,
      backgroundColor: '#cbcfd3',
    },
    '& .MuiSlider-mark': {
      backgroundColor: '#cbcfd3',
      height: 8,
      width: 1,
      '&.MuiSlider-markActive': {
        opacity: 1,
        backgroundColor: 'currentColor',
      },
    },
  }));
  
  const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

  const marks = [
    {
      value: 0,
    },
    {
      value: 100,
    },
  ];

  const soimarks = [
    {
      value: 4,
    },
    {
      value: 300,
    },
  ];
  
// animation speed
const speed = 1;

// array size
const arraySize = 300;


export default class InsertionsortVisualizer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < arraySize; i++) {
      array.push(random(1, 550));
    }
    this.setState({array});
  }

  insertionSort() {
    const [animations,sortArray] = getInsertionSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
        const isColorChange = (animations[i][0] === "comparision1") || (animations[i][0] === "comparision2");
        const arrayBars = document.getElementsByClassName('array-bar');
        if(isColorChange === true) {
            const color = (animations[i][0] === "comparision1") ? "red" : "white";
            const [temp, barOneIndex, barTwoIndex] = animations[i];
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            },i * speed);
        }
        else {
            const [temp, barIndex, newHeight] = animations[i];
            const barStyle = arrayBars[barIndex].style;
            setTimeout(() => {
                barStyle.height = `${newHeight}px`;
            },i * speed);  
        }
    }
    // this.setState({array: sortArray})
    const RESTORE_TIME = parseInt(speed*animations.length/2 + 3000);
    setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME); 
}
  render() {
    const {array} = this.state;
    
    
    return (

      <main>
      <div className="btn-toggle" >
      </div>
      <header>
        <h1> Insertion Sort </h1>
        <Stack spacing={3} direction="column">
        <Stack spacing={2} direction="row">
            <Typography gutterBottom>Array Size</Typography>
            <Box sx={{ width: 954 }}></Box>
            <Typography gutterBottom>Speed (ms)</Typography>
        </Stack>
        <Stack spacing={3} direction="row">
            <FormControl variant="standard"> 
            <SOISlider
              defaultValue={arraySize}
              marks={soimarks}
              valueLabelDisplay="on"
              min={4}
              max={300}
            />
            </FormControl>
            <BootstrapButton 
                variant="contained" 
                disableRipple 
                endIcon={<PlayArrowOutlinedIcon />} 
                onClick={() => {
                    this.insertionSort();
                  }}
            >
                Run
            </BootstrapButton>
            <BootstrapButton 
                variant="contained" 
                disableRipple
                endIcon={<RefreshIcon />} 
                onClick={() => {
                  this.resetArray();
                  }}
            >
                New Array
            </BootstrapButton>
            <Box sx={{ width: 340 }}></Box>
            <IOSSlider
              defaultValue = {speed}
              marks={marks}
              valueLabelDisplay="on"
            />
        </Stack>
        <p></p>
        </Stack>
      </header>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: 'white',
              height: `${value/1.05}px`,
            }}></div>
        ))}
      </div>
    </main>
    );
  }
}

function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

