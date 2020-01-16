import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem auto 0;
  max-width: 1000px;
  overflow-x: auto;

  .busca {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    flex: 1;

    section {
      margin: 0 1rem 1rem;

      p {
        margin-bottom: 0.5rem;
      }

      input,
      select {
        margin: 0;
        width: 100%;
      }
    }
  }

  @media screen and (max-width: 680px) {
    .busca {
      flex-direction: column;

      section {
        width: 100%;
      }
    }
  }
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
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      color: red;
      font-weight: bold;
      margin-bottom: 1rem;
    }
  }

  .campoCnpj {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    align-self: center;

    input {
      flex: 1;
    }

    button {
      flex: 1;
      margin-bottom: 0;
    }
  }

  input {
    background-color: #fff;
    box-shadow: none;
    margin: 1rem;
    max-width: 100%;
  }
`;
