import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { GlobalStyles } from '../styles/global-styles';
import 'antd/dist/antd.css'
import { Provider } from 'react-redux';
import store from '../redux/store'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

function MyApp({ Component, pageProps }) {
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
