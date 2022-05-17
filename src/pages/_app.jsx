import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { GlobalStyles } from '../styles/global-styles';
import 'antd/dist/antd.css'
import {Provider} from 'react-redux';
import store from '../redux/store'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import Router, {useRouter} from "next/router";
import {useEffect} from "react";
import {stopRedirecting} from "../redux/utils/actions";

function MyApp({ Component, pageProps }) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { loadingGlobal, redirectTo } = useAppSelector(store => store.utils)


  useEffect(() => {
    if(redirectTo){
      dispatch(stopRedirecting())
      router.push(redirectTo).then(r => false)
    }
  }, [dispatch, redirectTo, router])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyles />
      </ThemeProvider>
    </Provider>
  );
}

const makeStore = () => store

export default withRedux(makeStore)(withReduxSaga(MyApp))
