import { api } from "../repositories/countries";

export async function listarPaises() {
    try {

        const resposta = await api.get('all');
        
        const nomesPaises = resposta.data.map(pais => pais.name.common);
        console.log(nomesPaises);

        return nomesPaises;
    } catch (erro) {
        console.error('Erro ao listar os países:', erro);
    }
}
