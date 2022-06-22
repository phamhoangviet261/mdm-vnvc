import styled from 'styled-components'

import { theme } from './theme'

export const LogoContainer = styled.div`
	position: relative;
	display: block;
	width: 105px !important;
	height: 42px;
	cursor: pointer;
`
export const Layout = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`

export const Section = styled.section<{ paddingVertical?: number }>`
	padding-top: 100px;
	padding-bottom: 100px;
	background-color: ${theme?.colors?.white};
	color: ${theme?.colors?.text};
	
`

export const TermContainer = styled.ul`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	margin: -5px -12px;
	list-style: none;
	> li {
		padding: 5px 12px;
		a {
			color: ${(props) => props.theme?.colors?.gray4};
			text-decoration: none;
		}
	}
`
