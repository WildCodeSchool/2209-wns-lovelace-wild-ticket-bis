import styled from 'styled-components';

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 20px;
  height: 90%;
`;
export const FormContainer = styled.form`
  height: 50vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: 10px;
  align-items: center;
  justify-content: center;
  background-color: #dedede;
  border-radius: 25px;
`;
export const LabelForm = styled.label`
  width: 90%;
  height: 30%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;
export const InputForm = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: 0;
`;
export const TextLabel = styled.p`
  margin: 0;
  font-family: QuickSand;
  font-size: 25px;
  display: flex;
  width: 100%;
`;
export const ButtonLabel = styled.button`
  height: 50px;
  width: 40%;
  border-radius: 30px;
  border: 0;
  background-color: #ff9442;
  font-family: QuickSand;
  font-size: 20px;
`;
export const LabelTitle = styled.h1`
  font-family: QuickSand;
  font-size: 30px;
  font-weight: bold;
`;
export const ContainerInput = styled.div`
  height: 40%;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;
export const FooterForm = styled.div`
  margin: 0;
  font-family: QuickSand;
  font-weight: lighter;
  font-size: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  gap:10px;
`;

export const LinkFooter = styled.p`
  color: #ff9442;
  text-decoration: none;
`;
