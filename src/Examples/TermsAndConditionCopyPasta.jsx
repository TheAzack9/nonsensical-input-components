import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import { FcDocument } from 'react-icons/fc';
import { TextForm, Popup } from "../lib"

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

const ShowTermsButton = styled.button`
  display: inline-block;
  background-color: #c5d9d5;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  display: block;
  width: auto;
  height: 3em;
`;


const TermsAndConditionCopyPasta = () => {
  const [visibility, setVisibility] = useState(false);

  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  return (
    <Wrapper>
      <Rounded>
        <FcDocument size={70} color={"#c5d9d5"} />
      </Rounded>
      <Title>Before you can continue, you need to accept the terms and conditions</Title>
      <TextForm />
      <Popup
        onClose={popupCloseHandler}
        show={visibility}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et doloremque repudiandae officiis dolor provident! Maiores dolores itaque, nesciunt quisquam reiciendis eos quas illum voluptatem blanditiis eum rerum odio ipsa perferendis.
        </p>
      </Popup>
      <ShowTermsButton onClick={(e) => setVisibility(!visibility)}>Show Terms and Conditions</ShowTermsButton>
      </Wrapper >
  )
}

export default TermsAndConditionCopyPasta