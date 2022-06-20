import { useState } from 'react';
import styled from 'styled-components'


const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const Button = styled.input`
  display: inline-block;
  background-color: green;
  color: black;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  display: block;
  width: auto;
  height: 3em;
`;

const TextForm = () => {
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${content}`)
      }

        return (
            <form onSubmit={handleSubmit}>
            <label>
              <Input
                type="text" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
            <Button type="submit" />
          </form>
        );
}

export default TextForm
