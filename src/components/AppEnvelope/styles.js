import styled from 'styled-components';

export const AppEnvelopeWrapper = styled.div`

  width: 100vw;
  height: 100vh;

  .main-layout {
    width: 100%;
    height: 100%;

    header {
      color: white;
    }

    .ant-layout-content {
      overflow-y: auto;
      width: 100%;
      height: 100%;
    }
    aside {
      color: white;
      display: flex;
      background-color: #f44;

      .topRow{
        height: 64px;
        min-height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          font-weight: 300;
          font-size: 20px;
          text-shadow: 2px 2px #025;
          cursor: pointer;
        }
      }

      .menu-column {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0px 20px;
        padding-top: 50px;

        .menu-button {
          border-radius: 8px;
          border: 1px solid white;
          margin-bottom: 20px;

          width: 100%;
          padding: 2px 5px;
          display: flex;
          align-items: center;
          gap: 10px;


          :hover {
            cursor: pointer;
            background-color: #112640;
            transition:500ms ease-in-out;
          }
        }
      }

      .ant-layout-sider-children{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100vh;


        .sider-logo-row{
          height: 64px;
          /* background-color: black; */
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;

          img:hover {
            cursor: pointer
          }
        }

        .logout-button {
          margin-top: 20px;
          margin-bottom: 20px;
          border-radius: 20px;
          color: white;
          font-weight: 500;
          background-color: red;
          border: 0px;
          width: 70%;

          :hover {
            background-color: #f44;
          }
        }
      }


    }
  }

`;
