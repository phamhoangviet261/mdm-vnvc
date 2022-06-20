import { FC, useEffect, useState } from 'react'

import { MainStyled } from './Main.styled'
import { LayoutProps } from 'models/index';

function Main({children}: LayoutProps){
	
	return <MainStyled>
		{children}
	</MainStyled>
}

export default Main
