import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import history from '../../services/history';
import api from '../../services/api';

import Header from '../../components/Header';

import { Container } from './styles';

export default function Cliente() {
  const [clientes, setClientes] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState();
  const [municipio, setMunicipio] = useState();
  const [uf, setUf] = useState();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const ufs = [...new Set(municipios.map(item => item.uf))];

  async function carregaClientes() {
    const { data } = await api.get('/clientes', {
      params: {
        page,
        perPage,
        nome,
        documento,
        municipio,
        uf,
      },
    });

    setClientes(data);
  }

  useEffect(() => {
    async function carregaMunicipios() {
      const { data } = await api.get('/municipios');

      setMunicipios(data);
    }

    carregaMunicipios();
  }, []);

  useEffect(() => {
    carregaClientes();
  }, [nome, documento, municipio, uf, page, perPage]);

  return (
    <>
      <Header />
      <Container>
        <div className="busca">
          <section>
            <p>Buscar por nome</p>
            <input
              type="text"
              name="nome"
              value={nome}
              onChange={event => setNome(event.target.value)}
              placeholder="Digite um nome"
            />
          </section>
          <section>
            <p>Buscar por CPF/CNPJ</p>
            <input
              type="text"
              name="documento"
              value={documento}
              onChange={event => setDocumento(event.target.value)}
              placeholder="Digite um CPF/CNPJ"
            />
          </section>
          <section>
            <p>Municipios</p>
            <select
              name="municipio"
              onChange={event => setMunicipio(event.target.value)}
            >
              <option value="">Selecione um municipio</option>
              {municipios.map(item => (
                <option key={item.id} value={item.nome}>
                  {item.nome}
                </option>
              ))}
            </select>
          </section>
          <section>
            <p>UF</p>
            <select name="uf" onChange={event => setUf(event.target.value)}>
              <option value="">Selecione uma UF</option>
              {ufs.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </section>
        </div>
        <button type="button" onClick={() => history.push('/clientes/add')}>
          Adicionar cliente
        </button>
        <span>Clique/toque no nome do cliente para editar.</span>
        <table>
          <caption>Clientes</caption>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CNPJ/CPF</th>
              <th>Endereço</th>
              <th>Municipio</th>
              <th>UF</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(item => (
              <tr key={item.id}>
                <td data-label="Nome">
                  <Link to={`clientes/edit/${item.id}`}>{item.nome}</Link>
                </td>
                <td data-label="CNPJ/CPF">{item.documento}</td>
                <td data-label="Endereço">{item.endereco}</td>
                <td data-label="Municipio">{item.municipio.nome}</td>
                <td data-label="UF">{item.municipio.uf}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <section className="pagination">
          <p>Quantidade por página</p>
          <select
            name="per_page"
            onChange={event => setPerPage(event.target.value)}
          >
            <option defaultChecked value="10">
              10
            </option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <div>
            {page > 1 ? (
              <button type="button" onClick={() => setPage(page - 1)}>
                Voltar
              </button>
            ) : null}
            {page > 2 ? (
              <button type="button" onClick={() => setPage(1)}>
                Início
              </button>
            ) : null}
            <button type="button" onClick={() => setPage(page + 1)}>
              Avançar
            </button>
          </div>
        </section>
      </Container>
    </>
  );
}
