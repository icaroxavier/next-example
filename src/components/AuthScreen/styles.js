import styled from 'styled-components';

export const AuthScreenWrapper = styled.div`

  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e5e5e5;
  padding: 3% 3%;

  .login-box {
    padding: 3%;
    padding-bottom: ${({isLoginScreen}) => isLoginScreen ? '6%' : '3%'};
    height: max-content;

    label {
      font-size: 16px;
      color: #00000099;
    }

    overflow-y: auto;

    img:hover {
      cursor: pointer;
    }

    width: 30vw;
    @media (max-width: 1600px){
      width: 40vw;
    }
    @media (max-width: 1200px){
      width: 45vw;
    }
    @media (max-width: 1024px){
      width: 50vw;
    }
    @media (max-width: 768px){
      width: 70vw;
    }
    @media (max-width: 480px){
      width: 95vw;
    }



    background: #f8f8f8;
    box-shadow: 0px 0px 21px rgba(154, 154, 154, 0.26);
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      margin-top: 15px;
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 19px;
      color: #343434;
      margin-bottom: 50px;

    }

    form {

      .ant-form-item {
        /* margin-bottom: 20px; */
      }

      width: 100%;

      .ant-picker {
        border-radius: 8px;
        width: 100%;
        .ant-picker-input {

        }
      }
      .ant-select-selector {
        border-radius: 8px;
      }
      .ant-input-number {
        border-radius: 8px;
        width: 100%;
      }
      .ant-input {
        border-radius: 8px;
      }

      .ant-input-password {
        border-radius: 8px;
      }
    }

    .login-button {
      margin-top: 10px;
      background-color: #3399ff;
      border-radius: 50px;
      width: 100%;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      height: 50px;
      min-height: 5vh;
      color: #FFFFFF;
    }
    .back-button {


      border-radius: 50px;
      width: 100%;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      height: 35px;


    }
  }
`;
