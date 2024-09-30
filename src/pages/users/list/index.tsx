import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useRequest from '../../../hooks/useRequest';
import { Button, Container } from '@mui/material';
import { User } from '../../../types';
import { Link } from 'react-router-dom';
import paths from '../../../routes/paths';

type TableColumn = {
  name: string;
  key: keyof User;
};


export default function BasicTable() {
  const { loading, data: users, sendRequest } = useRequest<User[]>();

  useEffect(() => {
    const fetchData = async () => {
      await sendRequest({ method: 'GET', url: 'api/users' }).catch((err) => {
        console.log(err);
      });
    };
    fetchData();
  }, [])

  if (loading) return <p>Loading...</p>

  if (!users?.length) return <p>No users found</p>

  const tableStructure: TableColumn[] = [
    { name: 'Name', key: 'name' },
    { name: 'Username', key: 'username' },
    { name: 'Email', key: 'email' },
    { name: 'Registered At', key: 'created_at' },
  ]
  return (
    <Container>
      <h1>Users</h1>
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
            {users.map((user) => (
              <TableRow
                key={user.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {tableStructure.map(column => (
                  <TableCell key={column.key}>{user[column.key]}</TableCell>
                ))}
                <TableCell align="right">
                  <Button variant="outlined"><Link to={`${paths.USERS}/${user.id}`} > Details </Link></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}