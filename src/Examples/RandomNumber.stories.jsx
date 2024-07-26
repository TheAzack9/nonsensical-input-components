import styled from 'styled-components'
import { BsFillTelephoneFill } from 'react-icons/bs';
import { fn } from '@storybook/test';
import RandomNumber from "./RandomNumber";

export default {
    title: 'Number/RandomNumber',
    tags: ['autodocs'],
    render: (args) => {
        return (
            <div>
                <span>Enter a number:</span>
                <RandomNumber {...args} />
            </div>
        )
    }
}

export const Default = {

};


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

export const ExampleUsage = {
    args: {
        selectText: "Is this your phone number?",
    },
    render: (args) => {
        return (
            <Wrapper>
              <Rounded>
                <BsFillTelephoneFill size={70} color={"#c5d9d5"} />
              </Rounded>
              <Title>Please enter your phone number:</Title>
              <RandomNumber minValue={10000000} maxValue={99999999} {...args} />
            </Wrapper >
        )
    }
}