import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import api from '../../../services/api';
import history from '../../../services/history';

import Header from '../../../components/Header';
import { Container, Content } from '../styles';

import 'react-toastify/dist/ReactToastify.css';

const schema = Yup.object().shape({
  documento: Yup.number()
    .integer()
    .positive()
    .required('O documento (CNPJ/CPF) é obrigatório.'),
  nome: Yup.string().required('A razão social é obrigatória.'),
  endereco: Yup.string().required('O endereço é obrigatório.'),
  municipioId: Yup.number()
    .integer()
    .positive()
    .required('O ID do municipio é obrigatório.'),
});

export default function Municipios({ match }) {
  const [municipio, setMunicipio] = useState([]);
  const id = match.params.idMunicipio;

  async function carregaMunicipio() {
    const { data } = await api.get(`/municipios/${id}`);

    setMunicipio(data);
  }

  async function editaMunicipio({ nome, estado }) {
    const response = await api.patch(`/municipios/${id}`, {
      nome,
      estado,
    });

    toast.success(`Municipio ${response.data.nome} editado!`);
    carregaMunicipio();
  }

  async function deletaMunicipio() {
    try {
      await api.delete(`/municipios/${id}`);

      toast.success('Municipio deletado com sucesso.');
      history.push('/municipios');
    } catch (err) {
      toast.error('O municipio não pode ser deletado.');
    }
  }

  useEffect(() => {
    carregaMunicipio();
  }, [id]);

  return (
    <>
      <Header />
      <Container>
        <Content>
          <header>
            <h1>Editar municipio</h1>
            <button
              className="deleteButton"
              type="button"
              onClick={deletaMunicipio}
            >
              Deletar
            </button>
            <button type="button" onClick={() => history.push('/municipios')}>
              Voltar
            </button>
          </header>
          <Form
            schema={schema}
            onSubmit={editaMunicipio}
            initialData={municipio}
          >
            <label htmlFor="nome">Nome</label>
            <Input name="nome" id="nome" placeholder="Nome do municipio" />

            <label htmlFor="estado">Sigla do estado</label>
            <Input
              name="estado"
              id="estado"
              placeholder="Sigla do estado"
              readOnly
            />

            <button type="submit">Editar</button>
          </Form>
        </Content>
      </Container>
    </>
  );
}
