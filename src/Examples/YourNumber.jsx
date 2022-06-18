import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import { BsFillTelephoneFill } from 'react-icons/bs';


const YesButton = styled.button`
  display: inline-block;
  background-color: green;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  display: inline;
  width: 5em;
  height: 3em;
`;

const NoButton = styled.button`
  display: inline-block;
  background-color: red;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  display: inline;
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

const ButtonWrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: row;
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

function YourNumber() {
  const [correctNumber, setCorrectNumber] = useState(false);
  const [number, setNumber] = useState(Math.floor(Math.random() * 1000000000))

  let newNumber = () => {
    setTimeout(() => {
      setNumber(Math.floor(Math.random() * 1000000000))
    }, 16)

  }

  return (
    <Wrapper>
      <Rounded>
        <BsFillTelephoneFill size={70} color={"#c5d9d5"} />
      </Rounded>
      <Title>Is This your Number</Title>
      {correctNumber === false ? <>
        {number}
        <ButtonWrapper>
          <NoButton onClick={newNumber}>No</NoButton>
          <YesButton onClick={() => setCorrectNumber(true)}>Yes</YesButton>
        </ButtonWrapper> </>

        : <p>{number} is your number</p>
      }
    </Wrapper >
  )
}

export default YourNumber

