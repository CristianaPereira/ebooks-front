import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useRequest from '../../../hooks/useRequest';
import { Button, Container, Typography } from '@mui/material';
import { EBook } from '../../../types';
import { Link } from 'react-router-dom';
import paths from '../../../routes/paths';

type TableColumn = {
  name: string;
  key: keyof EBook;
};


export default function BasicTable() {
  const { loading, data: ebooks, sendRequest } = useRequest<EBook[]>();

  useEffect(() => {
    const fetchData = async () => {
      await sendRequest({ method: 'GET', url: 'api/ebooks' }).catch((err) => {
        console.log(err);
      });
    };
    fetchData();
  }, [])

  if (loading) return <p>Loading...</p>

  if (!ebooks?.length) return <p>No books found</p>

  const tableStructure: TableColumn[] = [
    { name: 'Name', key: 'name' },
    { name: 'Status', key: 'status' },
    { name: 'Price', key: 'price' },
  ];

  return (
    <Container>
      <Typography component="h3" variant="h3" sx={{ my: 2 }}> Books </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableStructure.map(column => (
                <TableCell key={column.key}>{column.name}</TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ebooks.map((ebook) => (
              <TableRow
                key={ebook.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {tableStructure.map(column => (
                  <TableCell key={column.key}>{ebook[column.key]}</TableCell>
                ))}
                <TableCell align="right">
                  <Button variant="outlined"><Link to={`${paths.EBOOKS}/${ebook.id}`} > Details </Link></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}