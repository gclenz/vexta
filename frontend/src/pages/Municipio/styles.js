import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem auto 0;
  max-width: 1000px;
  overflow-x: auto;
`;

export const Content = styled.div`
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: 0px 4px 5px rgba(125, 125, 125, 0.1);
  padding: 1rem;
  width: 100%;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-self: center;
    align-items: center;

    h1 {
      margin-top: 0;
      padding-top: 0;
    }

    button .deleteButton {
      background-color: #ff2323;

      &:hover {
        background-color: ${darken(0.05, '#FF2323')};
      }
    }

    button {
      margin: 0;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      max-width: 100%;
    }
  }

  input {
    background-color: #fff;
    box-shadow: none;
    margin: 1rem;
    max-width: 100%;
  }
`;
