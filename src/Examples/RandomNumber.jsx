import React from 'react'
import { useState, useCallback, useRef } from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
  transition: all 0.3s;
`;

const InputStyle = styled.input`
  min-width: 150px;
  min-height: 30px;
  border: 1px solid #ccc;
`;

const ButtonWrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 5px;
  margin: 5px 0;
`;

const YesButton = styled.button`
  display: inline-block;
  background-color: green;
  font-size: 1em;
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
  padding: 0.25em 1em;
  border-radius: 3px;
  display: inline;
  width: 5em;
  height: 3em;
`;


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function RandomNumber(props) {
  const { selectText, minValue, maxValue, ...rest } = props;

  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const updateNumber = useCallback(() => {
    inputRef.current.value = getRandomNumber(minValue, maxValue);
  }, [])

  const onFocus = useCallback(() => {
    setFocused(true);
    if(!inputRef.current.value) {
      updateNumber();
    }
  }, [updateNumber]);

  const setCorrectNumber = useCallback(() => {
    setFocused(false);
    inputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
  }, []);

  return (
    <Wrapper onFocus={onFocus}>
      {focused && <div>{selectText}</div>}
      <InputStyle type="number" {...rest} ref={inputRef} readOnly={focused} />
      {focused && (
        <ButtonWrapper>
          <NoButton onClick={updateNumber}>No</NoButton>
          <YesButton onClick={setCorrectNumber}>Yes</YesButton>
        </ButtonWrapper>
      )}
    </Wrapper>
  )
}

RandomNumber.defaultProps = {
  minValue: 0,
  maxValue: 100000,
  selectText: "Is this your number?"
}

export default RandomNumber

