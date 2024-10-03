'use client'

import { Button, TableContainer, Box, Paper, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LoginBtn from "@/components/LoginBtn";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import TableComponent from "@/components/TableComponent";
import AdminTable from "@/components/AdminTable";

export default function Dashboard() {
  const router = useRouter();
  const [linksData, setLinksData] = useState(null);

  const handleCreateLink = () => {
    router.push("/dashboard/create");
  };

  const fetchLinks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "links"));
      
     
      const linkList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLinksData(linkList);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []); 

  return (
    <TableContainer component={Paper} sx={{ width: "100vw"}}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: 2 }}>
        <Button variant="contained" color="success" onClick={handleCreateLink}>
          <AddIcon /> Create New Link
        </Button>
        <LoginBtn />
      </Box>
      <AdminTable data={linksData} fetchLinks={fetchLinks} />
    </TableContainer>
  );
}
