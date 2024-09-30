import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import { EBook, User } from "../../../types";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import paths from "../../../routes/paths";

type TableColumn = {
  name: string;
  key: keyof EBook;
};


export default function UserDetail() {
  const { userId } = useParams();
  const { loading, data, sendRequest } = useRequest<User>();

  useEffect(() => {
    sendRequest({ method: 'GET', url: `/api/users/${userId}` })
  }, [userId]);


  console.log('data', data);
  console.log('loading', loading);
  if (!data) return <div>Loading...</div>

  const { username, email, name } = data || {};
  return (
    <div>
      <Typography component="h3" variant="h3" sx={{ my: 2 }}> User Details </Typography>
      <p>Name: {name}</p>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <Box sx={{ mt: 2 }}>
        <Typography component="h4" variant="h4" sx={{ my: 2 }}> Books </Typography>
        <EBooksList user={data} />
      </Box>
    </div>
  );
}


function EBooksList({ user }: { user: User }) {
  const { id: userId } = user;

  const { loading, data, sendRequest } = useRequest<EBook[]>();


  useEffect(() => {
    sendRequest({ method: 'GET', url: `/api/ebooks?ownerId=${userId}` })
  }, [userId]);

  if (!data?.length) return <div>Loading...</div>
  if (loading) return <div>Loading...</div>



  const tableStructure: TableColumn[] = [
    { name: 'Name', key: 'name' },
    { name: 'Status', key: 'status' },
    { name: 'Price', key: 'price' },
  ];

  return (
    <div>
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
            {data.map((ebook) => (
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
    </div>
  )
}