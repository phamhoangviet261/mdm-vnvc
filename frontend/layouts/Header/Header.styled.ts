import { IconButton } from '@mui/material';
import styled from 'styled-components'
import { theme } from "styles/theme"
export const MenuContainer = styled.ul`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	list-style: none;
	> li {
		padding: 0 25px;
		> a {
			position: relative;
			display: block;
			padding: 10px 0;
			color: ${theme?.colors?.blue0};
			text-decoration: none;
			font-weight: bold;
			&:before {
				position: absolute;
				right: 50%;
				bottom: 0;
				left: 50%;
				border-top: 2px solid ${theme?.colors?.pink4};
				content: '';
				transition: 0.2s all linear;
			}
			&:hover {
				&:before {
					right: 10%;
					left: 10%;
					transition: 0.2s all linear;
				}
			}
		}
		&.active {
			> a {
				&:before {
					right: 10%;
					left: 10%;
					transition: 0.2s all linear;
				}
			}
		}
	}
`

export const IconButtonStyled = styled(IconButton)`
	color: #fff;
`

export const HeaderStyled = styled.header`
	max-height: 96px;
	position: fixed;
	z-index: 1501;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	pointer-events: none;
	.header-container {
		width: 100%;
		padding-top: 26px;
		padding-bottom: 26px;
		border-bottom: 1px solid ${theme?.colors?.grey4};
		background-color: ${theme?.colors?.white};
		pointer-events: auto;
		
	}
	}
`
export const HeaderWrapper = styled.div`
	display: flex;
	.menu-container {
		display: flex;
		justify-content: center;
		flex: 1;
		.form-search {
			margin-left: 16px;
			display: flex;
			align-items: center;
			& > input {
				width: 124px;
				border: 1px solid ${theme?.colors?.blue0};
				border-radius: 4px;
				padding: 6px;
				outline: none;
				color: ${theme?.colors?.blue0};
			}
			& > button {
				margin-left: 8px;
				& svg {
					font-size: 26px;
				}
				& path {
					fill: ${theme?.colors?.blue0};
				}
			}
			& > button:hover {
				opacity: .8;
			}
		}
	}
	.account-logo {
		display: flex;
		align-items: center;
		cursor: pointer;
		& svg {
			font-size: 30px;
		}
		& path {
			color: ${theme?.colors?.blue0};
		}
}
`
