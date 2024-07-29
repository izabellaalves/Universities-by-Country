import { api } from "../repositories/countries";

export async function listarPaises() {
    try {

        const resposta = await api.get('all');
        
        const nomesPaises = resposta.data.map(pais => pais.name.common);

        return nomesPaises;
    } catch (erro) {
        throw new Error('Erro ao listar os países');
    }
}
