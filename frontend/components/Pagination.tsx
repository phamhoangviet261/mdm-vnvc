import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { usePageContext } from './context/PageContext';

export default function PaginationRounded({count}) {

  const PageContext = usePageContext();
  function handlePagination (event) {
    PageContext.updatePage(event.target.textContent);
  }
  return (
    <Stack>
      <Pagination count={count} variant="outlined" shape="rounded" onChange={handlePagination}/>
    </Stack>
  );
}
