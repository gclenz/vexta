import React from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import api from '../../../services/api';
import history from '../../../services/history';

import Header from '../../../components/Header';
import { Container, Content } from '../styles';

import 'react-toastify/dist/ReactToastify.css';

const schema = Yup.object().shape({
  nome: Yup.string().required('A razão social é obrigatória.'),
  uf: Yup.string().required('O endereço é obrigatório.'),
});

export default function Municipios() {
  async function criarMunicipio({ nome, uf }) {
    const response = await api.post('/municipios', {
      nome,
      uf,
    });

    toast.success(`Municipio ${response.data.nome} adicionado!`);
    history.push('/municipios');
  }

  return (
    <>
      <Header />
      <Container>
        <Content>
          <header>
            <h1>Adicionar municipio</h1>
            <button type="button" onClick={() => history.push('/')}>
              Voltar
            </button>
          </header>
          <Form schema={schema} onSubmit={criarMunicipio}>
            <label htmlFor="nome">Nome</label>
            <Input name="nome" id="nome" placeholder="Nome do municipio" />

            <label htmlFor="uf">Unidade Federal</label>
            <Input name="uf" id="uf" placeholder="Unidade Federal" />

            <button type="submit">Adicionar</button>
          </Form>
        </Content>
      </Container>
    </>
  );
}
