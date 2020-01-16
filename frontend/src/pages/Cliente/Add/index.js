import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import api from '../../../services/api';
import history from '../../../services/history';

import Header from '../../../components/Header';
import { Container, Content } from '../styles';

import 'react-toastify/dist/ReactToastify.css';

const schema = Yup.object().shape({
  documento: Yup.number('O documento deve ser um número.')
    .integer('O documento deve ser um número inteiro.')
    .positive('O documento deve ser um número positivo.')
    .required('O documento (CNPJ/CPF) é obrigatório.'),
  nome: Yup.string().required('O nome é obrigatório.'),
  endereco: Yup.string().required('O endereço é obrigatório.'),
  municipioId: Yup.number()
    .integer()
    .positive()
    .required('O ID do municipio é obrigatório.'),
});

export default function Clientes() {
  const [dados, setDados] = useState();
  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [endereco, setEndereco] = useState('');
  // const [municipioId, setMunicipioId] = useState();
  const [municipios, setMunicipios] = useState([]);

  async function carregaMunicipios() {
    const { data } = await api.get('/municipios');

    setMunicipios(data);
  }

  const options = municipios.map(item => {
    return {
      id: item.id,
      title: `${item.nome}/${item.uf}`,
    };
  });

  async function checaCNPJ(cnpj) {
    if (documento.length <= 11) {
      toast.error('O número informado não é um CNPJ.');
    }

    const { data } = await api.get(`/cnpj/${cnpj}`);

    if (data.status === 'ERROR') {
      toast.error(data.message);
    }

    setEndereco(
      `${data.logradouro}, ${data.numero}, ${data.bairro} - ${data.cep}`
    );
    setNome(data.nome);
    toast.success('CNPJ consultado com sucesso!');
  }

  async function criarCliente({ municipioId }) {
    try {
      const response = await api.post('/clientes', {
        documento,
        endereco,
        municipio_id: Number(municipioId),
        nome,
      });

      toast.success(`Cliente ${response.data.nome} criado!`);
      history.push('/');
    } catch (err) {
      toast.error('Não foi possível cadastrar o cliente.');
    }
  }

  useEffect(() => {
    carregaMunicipios();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Content>
          <header>
            <h1>Adicionar cliente</h1>
            <button type="button" onClick={() => history.push('/')}>
              Voltar
            </button>
          </header>
          <Form schema={schema} onSubmit={criarCliente}>
            <div className="campoCnpj">
              <Input
                name="documento"
                id="documento"
                placeholder="CPF/CNPJ"
                value={documento}
                onChange={event => setDocumento(event.target.value)}
                label="CPF/CNPJ"
              />
              {documento.length > 11 ? (
                <button type="button" onClick={() => checaCNPJ(documento)}>
                  Checar CNPJ
                </button>
              ) : null}
            </div>

            <Input
              name="nome"
              id="nome"
              placeholder="Nome do cliente"
              value={nome}
              onChange={event => setNome(event.target.value)}
              label="Nome"
            />

            <Input
              name="endereco"
              id="endereco"
              placeholder="Endereço do cliente"
              value={endereco}
              onChange={event => setEndereco(event.target.value)}
              label="Endereço"
            />

            <Select
              name="municipioId"
              options={options}
              placeholder="Selecione um municipio"
              label="Municipio"
              // value={municipioId}
              // onChange={event => setMunicipioId(event.target.value)}
            />

            <button type="submit">Criar</button>
          </Form>
        </Content>
      </Container>
    </>
  );
}
