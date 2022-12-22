import styled from 'styled-components'
import {
  BOX_BACKGROUND_COLOR,
  BOX_SHADOW,
  FONT_FAMILY,
  MAIN_THEME_COLOR,
} from '../../styles/style-constants'

export const Logo = styled.img`
  width: 100px;
`

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 20px;
  height: 90%;
`
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: ${BOX_BACKGROUND_COLOR};
  box-shadow: ${BOX_SHADOW};
`
export const LabelForm = styled.label`
  width: 90%;
  height: 30%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`
export const InputForm = styled.input`
  border-radius: 3px;
  border-width: 0.5px;
`
export const TextLabel = styled.p`
  margin: 0;
  font-size: 16px;
  display: flex;
  width: 100%;
  font-family: ${FONT_FAMILY};
`
export const ButtonLabel = styled.button`
  height: 50px;
  width: 40%;
  border-radius: 30px;
  border: 0;
  background-color: ${MAIN_THEME_COLOR};
  font-family: ${FONT_FAMILY};
  font-size: 20px;
`
export const LabelTitle = styled.h1`
  font-family: ${FONT_FAMILY};
  font-size: 30px;
  font-weight: bold;
`
export const ContainerInput = styled.div`
  height: 40%;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`
export const FooterForm = styled.div`
  margin: 0;
  font-family: ${FONT_FAMILY};
  font-weight: lighter;
  font-size: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  gap: 10px;
`

export const LinkFooter = styled.p`
  color: ${MAIN_THEME_COLOR};
  text-decoration: none;
`
