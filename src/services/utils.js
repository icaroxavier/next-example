import axios from 'axios';

export function getCepInfo(params){
     return axios.get(`https://viacep.com.br/ws/${params}/json/`);
}

export function getEstados(){
     return axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
}

export function getMunicipios(params){
  return params?.uf ?
  axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${params.uf}/municipios`)
  :
  axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
}
