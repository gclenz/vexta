import api from '../../services/api';

class ClienteController {
  async show(req, res) {
    const { cnpj } = req.params;

    const { data } = await api.get(
      `https://www.receitaws.com.br/v1/cnpj/${cnpj}`
    );

    return res.status(200).json(data);
  }
}

export default new ClienteController();
