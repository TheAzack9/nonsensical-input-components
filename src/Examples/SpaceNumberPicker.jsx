import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import { BsFillTelephoneFill } from 'react-icons/bs';


const Button = styled.button`
  display: inline-block;
  background-color: #c5d9d5;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  display: block;
  width: 5em;
  height: 3em;
`;

const Rounded = styled.div`
  border: 3px solid #c5d9d5;
  font-size: 1em;
  border-radius: 50%;
  width: 6em;
  height: 6em;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: 1em;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  height:50vh;
  width:30%;
  display: flex;
  align-items: center;
  flex-direction: column;

`;

const Placeholder = styled.p`
    color: lightgray;
    font-size:1.4em;
    font-weight:700;
`;

const Number = styled.p`
    color: black;
    font-size:1.4em;
    font-weight:700;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #2E3C40;
  margin:0px;
  font-size:1.4em;
  font-weight:700;
  line-height: 1;
  padding-bottom: 2em;
  padding-top: 2em;
  margin: 0 0 0.142857143em;
`;

function SpaceNumberPicker() {
  const [number, setNumber] = useState(0)
  const [currentNumber, setCurrentNumber] = useState([])


  let counter = (minimum, maximum) => {
    setTimeout(() => {
      setNumber(Math.round(Math.random() * (maximum - minimum) + minimum))
    }, 16)

  }
  let stopNumber = () => {
    setCurrentNumber([...currentNumber, number])
  }

  counter(0, 9);

  return (
    <Wrapper>
      <Rounded>
        <BsFillTelephoneFill size={70} color={"#c5d9d5"} />
      </Rounded>
      <Title>Call enquiry</Title>
      {currentNumber.length !== 0 ? <Number>{currentNumber}</Number> : <Placeholder>Enter your phonenumber</Placeholder>}
      {currentNumber.length !== 8 ? <Button onClick={stopNumber}>{number} </Button> : <Button>Send in</Button> }
    </Wrapper >
  )
}

export default SpaceNumberPicker