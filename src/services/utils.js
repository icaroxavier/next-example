import axios from 'axios';

export function buscaCep(params){
     return axios({
          method: 'get',
          url: `https://viacep.com.br/ws/${params}/json/`
     });
}

export function getEstados(){
     return axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
}

export function getCidades(){
     return axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/distritos')
}
