import axios from 'axios';

export function getCepInfo(params){
     return axios.get(`https://viacep.com.br/ws/${params}/json/`);
}

export function getEstados(){
     return axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
}

export function getCidades(){
     return axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/distritos')
}
