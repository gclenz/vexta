import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';
import { Container, Content } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <div>
          <Link to="/">
            <img src={logo} alt="Logo da Vexta" />
          </Link>
        </div>
        <nav>
          <Link to="/">Clientes</Link>
          <Link to="/municipios">Municipios</Link>
        </nav>
      </Content>
    </Container>
  );
}
