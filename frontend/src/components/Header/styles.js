import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background-color: #fff;
  box-shadow: 0px 3px 10px rgba(125, 125, 125, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0 2rem;

  img {
    height: 50px;
    max-width: 100%;
  }
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  max-width: 900px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    a {
      color: #27aaa2;
      cursor: pointer;
      font-weight: bold;
      margin: 0.25rem;
      padding: 0.25rem;

      &:hover {
        color: ${darken(0.05, '#27AAA2')};
      }
    }
  }
`;
