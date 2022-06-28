import { AuthScreenWrapper } from './styles';
import {Input, Button, DatePicker, Select, Form} from 'antd'
import moment from 'moment';
import { useMemo, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import {MaskedInput} from "antd-mask-input";
import {onlyNumbers} from "../../shared/functions";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deleteCepInfo, getCepInfoRequest, getMunicipiosRequest, getEstadosRequest } from '../../redux/utils/actions';

export function AuthScreenComponent({ isLoginScreen }) {

  const { signIn, register } = useContext(AuthContext)
  const { cepInfo, municipios, estados } = useAppSelector(store => store.utils)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const [formLogin] = Form.useForm()

  useEffect(() => {
    !isLoginScreen && dispatch(getMunicipiosRequest())
    !isLoginScreen && dispatch(getEstadosRequest())
  }, [])

  useEffect(() => {
    if(cepInfo){
      getMunicipios({uf: cepInfo.uf}).then(response => {
        form?.setFieldsValue(
          {
            state: cepInfo.uf,
            city: response.data?.find(cidade => cidade.nome === cepInfo.localidade)?.nome || form.getFieldValue('city'),
            district: cepInfo.bairro,
            street: cepInfo.logradouro
          }
        )
      })
    }
  }, [cepInfo])

  const handleLogin = async (params) => {
    await signIn(params)
  }

  const handleRegistrar = async (params) => {
    await register(params)
  }

  const onFinishLogin = (values) => {
    handleLogin(values)
  };

  const onFinishLoginFailed = (errorInfo) => {
    console.log('Login Failed:', errorInfo);
  };

  const onFinishRegistrar = (values) => {
    const { username, password, age, firstName, lastName, gender, cpf,
      email, phone, cep, city, complement, district, number, state, street } = values

    const format = "YYYY-MM-DD"
    const formatedAge = age.format(format)

    handleRegistrar({
      username: username.trim(),
      password,
      age: formatedAge,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      gender,
      email,
      phone: onlyNumbers(phone),
      cpf: onlyNumbers(cpf),
      address: {
        cep: onlyNumbers(cep),
        city,
        complement,
        country: "BRA",
        district,
        number,
        state,
        street
      }
    })
  }

  const onFinishRegistrarFailed = (errorInfo) => {
    console.log('Registrar failed:', errorInfo);
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  };



  const DynamicPhone = (props) => {
    const cellphoneMask = '(00) 0 0000-0000';
    const phoneMask = '(00) 0000-0000';

    // always memoize dynamic masks
    const mask = useMemo(
      () => [
        {
          mask: cellphoneMask,
          lazy: true,
        },
        {
          mask: phoneMask,
          lazy: true,
        },
      ],
      []
    );

    return (
      <MaskedInput
        {...props}
        mask={mask}
        maskOptions={{
          dispatch: function (appended, dynamicMasked) {
            const isCellPhone = dynamicMasked.unmaskedValue[2] === '9';
            return dynamicMasked.compiledMasks[isCellPhone ? 0 : 1];
          },
        }}
      />
    );
  };

  return (
    <AuthScreenWrapper isLoginScreen={isLoginScreen}>
      <div className="login-box">
        <div style={{width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Image priority={true} layout='fixed' width={100} height={100} src={'/assets/images/logo.png'} alt="Logo" onClick={() => isLoginScreen ? router.push('/') : router.push("/login")}></Image>
        </div>
        <span className="title">Next Example</span>
        {isLoginScreen ?
          <Form
            initialValues={{remember: false}}
            onFinish={onFinishLogin}
            onFinishFailed={onFinishLoginFailed}
            autoComplete="off"
            form={formLogin}
            name='login'
            scrollToFirstError
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira o seu usuário!',
                }
              ]}
            >
              <Input  size={'large'} className='input-custom' placeholder='Usuário'/>
            </Form.Item>
            <Form.Item
              style={{marginBottom: '4px'}}
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira a sua senha!',
                }
              ]}
            >
              <Input.Password  size={'large'} className='input-custom' placeholder="Senha"/>

            </Form.Item>
            <span style={{width: '100%', display: 'flex', flexDirection: 'row-reverse', marginBottom: '30px'}}><Link href={"/recuperar-senha"}><a style={{color: 'blue'}}>Esqueceu a senha?</a></Link></span>
            <Form.Item style={{marginBottom: '4px'}}>
              <Button className='login-button' type="primary" htmlType="submit">
                Entrar
              </Button>

            </Form.Item>
            <span style={{paddingLeft: '10px'}}>Ou <Link href={"/registrar"}><a style={{color: 'blue'}}>registre-se agora!</a></Link></span>
          </Form>
          :
          <Form
            form={form}
            layout='vertical'
            onFinish={onFinishRegistrar}
            onFinishFailed={onFinishRegistrarFailed}
            autoComplete="off"
            name="registro"
            scrollToFirstError
          >
            <h2>Dados pessoais</h2>
            <Form.Item
              name="firstName"
              label="Nome"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira o seu nome!',
                },
                {
                  max: 16,
                  message: 'O tamanho máximo é de 16 caracteres!'
                },
                {
                  min: 2,
                  message: 'O tamanho mínimo é de 2 caracteres!'
                }
              ]}
            >
              <Input  size={'large'} className='input-custom' placeholder='Nome'/>
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Sobrenome"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira o seu sobrenome!',
                },
                {
                  max: 16,
                  message: 'O tamanho máximo é de 16 caracteres!'
                },
                {
                  min: 2,
                  message: 'O tamanho mínimo é de 2 caracteres!'
                }
              ]}
            >
              <Input  size={'large'} className='input-custom' placeholder='Sobrenome'/>
            </Form.Item>
            <Form.Item
              name="age"
              label="Data de nascimento"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira a sua data de nascimento!',
                },
                (params) => ({
                  validator(_, value) {
                    if (value && value?.diff(new Date(), 'days') <= 0) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('A data de nascimento não pode ser maior do que a atual!'));
                  },
                }),
              ]}
            >
              <DatePicker disabledDate={disabledDate} size={'large'} picker="date" format={"DD/MM/yyyy"} className='input-custom' placeholder={'Data de nascimento'}/>
            </Form.Item>
            <Form.Item
              name="gender"
              label="Sexo"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira o seu sexo!',
                },
              ]}
            >
              <Select size={'large'} placeholder='Sexo'>
                <Select.Option value="MALE">Masculino</Select.Option>
                <Select.Option value="FEMALE">Feminino</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="cpf"
              label="CPF"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const numbers = onlyNumbers(value)
                    if (numbers.length === 11) {
                      const reg = new RegExp('([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})')
                      const resultado = reg.test(numbers)
                      console.log("RESULTADO", resultado)
                      if(resultado){
                        return Promise.resolve();
                      } else {
                        return Promise.reject(new Error('Esse não é um CPF válido!'));
                      }

                    } else if (numbers.length === 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Esse não é um CPF válido!'));
                  },
                }),
              ]}
            >
              <MaskedInput placeholder='CPF' size='large' mask='000.000.000-00'></MaskedInput>
            </Form.Item>
            <h2>Informações adicionais</h2>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'Esse não é um e-mail válido!',
                },
              ]}
            >
              <Input size={'large'} className='input-custom' placeholder='E-mail'/>
            </Form.Item>
            <Form.Item
              name="phone"
              label="Telefone"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const numbers = onlyNumbers(value)
                    if (numbers[2] !== '9' && numbers.length === 10 || (numbers[2] === '9' && numbers.length === 11)) {
                      return Promise.resolve();
                    } else if (numbers.length === 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Esse não é um número de telefone válido!'));
                  },
                }),
              ]}
            >
              <DynamicPhone size={'large'} placeholder={'Telefone'}/>
            </Form.Item>
            <Form.Item
              name="cep"
              label="CEP"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const numbers = onlyNumbers(value)
                    if (numbers.length === 8) {
                      dispatch(getCepInfoRequest(numbers))
                      return Promise.resolve();
                    } else if (numbers.length === 0) {
                      cepInfo && dispatch(deleteCepInfo())
                      return Promise.resolve();
                    }
                    cepInfo && dispatch(deleteCepInfo())
                    return Promise.reject(new Error('Esse não é um CEP válido!'));
                  },
                }),
              ]}
            >
              <MaskedInput size={'large'} className='input-custom' placeholder='CEP' mask={'00000-000'}/>
            </Form.Item>
            <Form.Item
              name="state"
              label="Estado"
              rules={[]}>
              <Select
                placeholder="Estado"
                size='large'
                showSearch
                optionFilterProp="children"
                onChange={value => {
                  form.setFieldsValue({city: ''})
                  dispatch(getMunicipiosRequest({uf: value}))
                }}
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                {estados?.length > 0 && estados.map(estado => {
                  return <Select.Option value={estado.sigla} key={estado.id}>{estado.nome}</Select.Option>
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="city"
              label="Município"
              rules={[]}>
              <Select
                placeholder="Município"
                size='large'
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                {municipios?.length > 0 && municipios.map(cidade => {
                  const estado = form.getFieldValue('state')
                  if(estado && false) {

                  } else {
                    return <Select.Option value={cidade.nome} key={cidade.id}>{cidade.nome}</Select.Option>
                  }
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="district"
              label="Bairro"
              rules={[]}>
              <Input size='large'></Input>
            </Form.Item>
            <Form.Item
              name="street"
              label="Endereço"
              rules={[]}>
              <Input size='large'></Input>
            </Form.Item>
            <Form.Item
              name="number"
              label="Número"
              rules={[]}>
              <Input size='large'></Input>
            </Form.Item>
            <Form.Item
              name="complement"
              label="Complemento"
              rules={[]}>
              <Input size='large'></Input>
            </Form.Item>

            <h2>Cadastro</h2>
            <Form.Item
              name="username"
              label="Usuário"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira o seu usuário!',
                },
                {
                  max: 15,
                  message: 'O tamanho máximo é de 16 caracteres!'
                },
                {
                  min: 5,
                  message: 'O tamanho mínimo é de 3 caracteres!'
                }
              ]}
            >
              <Input size={'large'} className='input-custom' placeholder='Usuário'/>
            </Form.Item>
            <Form.Item
              name="password"
              label="Senha"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira a sua senha!',
                },
                {
                  max: 16,
                  message: 'O tamanho máximo é de 16 caracteres!'
                },
                {
                  min: 6,
                  message: 'O tamanho mínimo é de 8 caracteres!'
                }
              ]}
            >
              <Input.Password  size={'large'} className='input-custom' placeholder="Senha"/>
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirmar senha"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira a confirmação da sua senha!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('As duas senhas não são iguais!'));
                  },
                }),
              ]}
            >
              <Input.Password  size={'large'} className='input-custom' placeholder="Confirmar senha"/>
            </Form.Item>
            <Form.Item>
              <Button className='login-button' type="primary" htmlType="submit">
                Registrar
              </Button>
            </Form.Item>
            <Link href="/login">
              <Button className='back-button'>Voltar</Button>
            </Link>
          </Form>
        }

      </div>
    </AuthScreenWrapper>
  );
}
