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
	min-height: 100vh,
	display: flex,
	flex-direction: column,
`

export const Section = styled.section<{ paddingVertical?: number }>`
	padding-top: ${({ paddingVertical }) =>
		(typeof paddingVertical === 'number' ? paddingVertical : 100) + 'px'};
	padding-bottom: ${({ paddingVertical }) =>
		(typeof paddingVertical === 'number' ? paddingVertical : 100) + 'px'};
	background-color: ${({ theme }) => theme?.colors?.darkPurple4};
	color: ${({ theme }) => theme?.colors?.white || '#fff'};
	@media screen and (max-width: 1700px) {
		padding-top: ${({ paddingVertical }) =>
			(typeof paddingVertical === 'number'
				? (paddingVertical as number) / 1.2
				: 80) + 'px'};
		padding-bottom: ${({ paddingVertical }) =>
			(typeof paddingVertical === 'number'
				? (paddingVertical as number) / 1.2
				: 80) + 'px'};
	}
	@media screen and (max-width: 1400px) {
		padding-top: ${({ paddingVertical }) =>
			(typeof paddingVertical === 'number'
				? (paddingVertical as number) / 1.44
				: 70) + 'px'};
		padding-bottom: ${({ paddingVertical }) =>
			(typeof paddingVertical === 'number'
				? (paddingVertical as number) / 1.44
				: 70) + 'px'};
	}
	@media screen and (max-width: 992px) {
		padding-top: ${({ paddingVertical }) =>
			(typeof paddingVertical === 'number'
				? (paddingVertical as number) / 1.728
				: 60) + 'px'};
		padding-bottom: ${({ paddingVertical }) =>
			(typeof paddingVertical === 'number'
				? (paddingVertical as number) / 1.728
				: 60) + 'px'};
	}
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
