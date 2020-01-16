import * as Yup from 'yup';
import { Op } from 'sequelize';
import Cliente from '../models/Cliente';
import Municipio from '../models/Municipio';
import api from '../../services/api';

class ClienteController {
  async index(req, res) {
    const { page } = req.query || 1;
    const { perPage } = req.query || 10;

    const busca = {
      nome: '',
      documento: '',
      municipio: {
        nome: '',
        uf: '',
      },
    };

    if (req.query.nome) {
      busca.nome = req.query.nome;
    }

    if (req.query.documento) {
      busca.documento = req.query.documento;
    }

    if (req.query.municipio) {
      busca.municipio.nome = req.query.municipio;
    }

    if (req.query.uf) {
      busca.municipio.uf = req.query.uf;
    }

    const clientes = await Cliente.findAll({
      include: [
        {
          model: Municipio,
          attributes: ['nome', 'uf'],
          as: 'municipio',
          where: {
            nome: { [Op.like]: `%${busca.municipio.nome}%` },
            uf: { [Op.like]: `%${busca.municipio.uf}%` },
          },
        },
      ],
      where: {
        nome: { [Op.like]: `%${busca.nome}%` },
        documento: { [Op.like]: `%${busca.documento}%` },
      },
      offset: perPage * page - perPage,
      limit: Number(perPage),
      order: [['nome', 'ASC']],
    });

    return res.status(200).json(clientes);
  }

  async show(req, res) {
    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
      return res.status(400).json({ erro: 'Cliente não encontrado.' });
    }

    return res.status(200).json(cliente);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      documento: Yup.number()
        .integer()
        .positive()
        .required('O documento (CNPJ/CPF) é obrigatório.'),
      nome: Yup.string().required('A razão social é obrigatória.'),
      endereco: Yup.string().required('O endereço é obrigatório.'),
      municipio_id: Yup.number()
        .integer()
        .positive()
        .required('O ID do municipio é obrigatório.'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'A validação dos dados falhou. Cheque os dados e tente novamente.',
      });
    }

    const clienteExiste = await Cliente.findOne({
      where: { documento: req.body.documento },
    });

    if (clienteExiste) {
      return res
        .status(400)
        .json({ error: 'Esse cliente já está cadastrado.' });
    }

    if (req.body.documento.length > 11) {
      const { data } = await api.get(
        `https://www.receitaws.com.br/v1/cnpj/${req.body.documento}`
      );

      if (data.status === 'ERROR') {
        return res.status(400).json({ error: 'Esse CNPJ é invalido.' });
      }
    }

    const municipioExiste = await Municipio.findByPk(req.body.municipio_id);

    if (!municipioExiste) {
      return res
        .status(400)
        .json({ error: 'Esse municipio não está está cadastrado.' });
    }

    const cliente = await Cliente.create(req.body);

    return res.status(201).json(cliente);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      endereco: Yup.string(),
      municipio_id: Yup.number()
        .integer()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'A validação dos dados falhou. Cheque os dados e tente novamente.',
      });
    }

    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
      return res.status(400).json({ erro: 'Cliente não encontrado.' });
    }

    if (req.body.documento) {
      return res
        .status(400)
        .json({ erro: 'Você não pode alterar o CPF/CNPJ.' });
    }

    if (req.body.municipio_id) {
      const municipio = await Municipio.findByPk(req.body.municipio_id);

      if (!municipio) {
        return res.status(400).json({ erro: 'Municipio não encontrado.' });
      }
    }

    cliente.update(req.body);

    return res.status(200).json(cliente);
  }

  async delete(req, res) {
    try {
      const clienteExiste = await Cliente.findByPk(req.params.id);

      if (!clienteExiste) {
        return res.status(400).json({ erro: 'Cliente não encontrado.' });
      }

      await Cliente.destroy({
        where: { id: req.params.id },
      });

      return res
        .status(200)
        .json({ mensagem: 'Cliente deletado com sucesso.' });
    } catch (error) {
      return res.status(400).json({ erro: 'O cliente não pode ser deletado.' });
    }
  }
}

export default new ClienteController();
