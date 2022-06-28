import '../styles/global.css'
import 'antd/dist/antd.css'

import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { GlobalStyles } from '../styles/global-styles';
import {Provider} from 'react-redux';
import store from '../redux/store'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import Router, {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {clearMessage, stopRedirecting} from "../redux/utils/actions";
import { Spin, notification, ConfigProvider } from 'antd';
import { AuthProvider } from '../contexts/AuthContext';
import ptBR from 'antd/lib/locale/pt_BR';


function MyApp({ Component, pageProps }) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { loadingGlobal, redirectTo, messageObject } = useAppSelector(store => store.utils)
  const [loadingRouteState, setLoadingRouteState] = useState(false);

  useEffect(() => {
    Router.onRouteChangeStart = () => {
      setLoadingRouteState(true);
    };

    Router.onRouteChangeComplete = () => {
      setLoadingRouteState(false);
    };

    Router.onRouteChangeError = () => {
      setLoadingRouteState(false);
    };
  }, []);

  useEffect(() => {
    if(redirectTo){
      dispatch(stopRedirecting())
      router.push(redirectTo).then(r => false)
    }
  }, [redirectTo])

  useEffect(() => {
    if(messageObject.message){
      dispatch(clearMessage())
      notification[messageObject.type || 'warning']({
        message: messageObject.title || '',
        description: messageObject.message
      })
    }

  }, [messageObject])


  return (
    <AuthProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ConfigProvider locale={ptBR}>
            <Spin id="global-spinner" spinning={loadingRouteState || loadingGlobal}>
              <Component {...pageProps} />
              <GlobalStyles />
            </Spin>
          </ConfigProvider>
        </ThemeProvider>
      </Provider>
    </AuthProvider>
  );
}

const makeStore = () => store

export default withRedux(makeStore)(withReduxSaga(MyApp))
