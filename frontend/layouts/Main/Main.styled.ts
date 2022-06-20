import styled from 'styled-components'

export const MainStyled = styled.main<{ marginTop?: string }>`
	margin-top: ${({ marginTop }) => marginTop || '95px'};
	flex: 1;
`
