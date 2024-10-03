// components/TableComponent.js

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography
} from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useRouter } from 'next/navigation';

const AdminTable = ({ data, fetchLinks }) => {

    const router = useRouter()

    // Check if data exists and is an array
  if (!data || data.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ marginTop: "20px" }}>
        No data available for this category.
      </Typography>
    );
  }

  const handleEdit = (id)=>{
    router.push(`/dashboard/edit/${id}`)
  }
  const handleDelete = async (id)=>{
    try {
        await deleteDoc(doc(db, 'links', id))
        await fetchLinks()
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, margin: "auto" }} aria-label="link table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Category</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">URL</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Action</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <a href={row.link} target="_blank" rel="noopener noreferrer">
                  {row.link}
                </a>
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={()=> handleEdit(row?.id)}>
                    <EditIcon />
                </Button>

                <Button sx={{marginLeft: 2}} variant="contained" color="error" onClick={()=> handleDelete(row?.id)}>
                    <DeleteIcon />
                </Button>
                </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminTable;
