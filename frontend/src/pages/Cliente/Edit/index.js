import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Input, Select } from '@rocketseat/unform';
import AsyncSelect from 'react-select/async';
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
});

export default function Clientes({ match }) {
  const [cliente, setCliente] = useState({});
  const [municipios, setMunicipios] = useState([]);
  const id = match.params.idCliente;

  async function carregaCliente() {
    const { data } = await api.get(`/clientes/${id}`);

    setCliente(data);
  }

  async function editaCliente({ nome, municipioId, endereco }) {
    const response = await api.patch(`/clientes/${id}`, {
      nome,
      municipio_id: municipioId,
      endereco,
    });

    toast.success(`Cliente ${response.data.nome} editado!`);
    carregaCliente();
  }

  async function deletaCliente() {
    try {
      await api.delete(`/clientes/${id}`);

      toast.success('Cliente deletado com sucesso.');
      history.push('/');
    } catch (err) {
      toast.error('O cliente não pode ser deletado.');
    }
  }

  async function carregaMunicipios() {
    const { data } = await api.get('/municipios');

    setMunicipios(data);
  }

  useEffect(() => {
    carregaCliente();
    carregaMunicipios();
  }, [id]);

  const options = municipios.map(item => {
    return {
      id: item.id,
      title: `${item.nome}/${item.uf}`,
    };
  });

  return (
    <>
      <Header />
      <Container>
        <Content>
          <header>
            <h1>Editar cliente</h1>
            <button
              className="deleteButton"
              type="button"
              onClick={deletaCliente}
            >
              Deletar
            </button>
            <button type="button" onClick={() => history.push('/')}>
              Voltar
            </button>
          </header>
          <Form schema={schema} onSubmit={editaCliente} initialData={cliente}>
            <label htmlFor="nome">Nome</label>
            <Input name="nome" id="nome" placeholder="Nome do cliente" />

            <label htmlFor="documento">CPF/CNPJ</label>
            <Input
              name="documento"
              id="documento"
              placeholder="CPF/CNPJ"
              readOnly
            />

            <label htmlFor="endereco">Endereço</label>
            <Input
              name="endereco"
              id="endereco"
              placeholder="Endereço do cliente"
            />

            <label htmlFor="municipioId">Municipio</label>
            <Select
              name="municipioId"
              placeholder="Selecione um novo municipio"
              defaultValue={options.find(
                item => item.id === cliente.municipio_id
              )}
              options={options}
            />

            <button type="submit">Editar</button>
          </Form>
        </Content>
      </Container>
    </>
  );
}
