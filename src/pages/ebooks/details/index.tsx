import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import { EBook, } from "../../../types";
import { Typography } from "@mui/material";


export default function UserDetail() {
  const { ebookId } = useParams();
  const { loading, data, sendRequest } = useRequest<EBook>();

  useEffect(() => {
    sendRequest({ method: 'GET', url: `/api/ebooks/${ebookId}` })
  }, [ebookId]);

  if (!data || loading) return <div>Loading...</div>

  const { status, name, price } = data || {};
  return (
    <div>
      <Typography component="h3" variant="h3" sx={{ my: 2 }}> Book Details </Typography>
      <p>Name: {name}</p>
      <p>Status: {status}</p>
      <p>Price: {price}€</p>
    </div>
  );
}
