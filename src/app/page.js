"use client"

import { useEffect, useState } from "react";
import ResponsiveNavbar from "@/components/ResponsiveNavbar";
import TableComponent from "@/components/TableComponent";
import { Box, Card, CardContent, CardHeader, Typography, Button } from "@mui/material";
import LoginBtn from "@/components/LoginBtn";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import UserAuth from "@/hooks/useAuth";


export default function Home() {
  const [linksData, setLinksData] = useState(null);
  const user = UserAuth()

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

  // State to keep track of the selected category
  const category =  [...new Set(linksData?.map(item => item.category))]
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedData, setSelectedData] = useState(null)
console.log(linksData, selectedData)

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };


  useEffect(()=>{
    linksData?.forEach((item)=> {
      const filter = category[0] === item?.category;
      setSelectedCategory(item?.category)
    })
  } , [linksData])

  useEffect(()=>{
   const selectedDataFilter = linksData?.filter((item)=> selectedCategory === item?.category);
   setSelectedData(selectedDataFilter)
  }, [selectedCategory])


  return (
    <div>
      <ResponsiveNavbar categories={category} onCategoryChange={handleCategoryChange} />
      <div style={{ marginTop: "80px" }}>
        <Card>
          <CardContent>
            <TableComponent data={selectedData} />
          </CardContent>
        </Card>

        <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "aqua", padding: "10px"}}>
       <LoginBtn />
     {
      user &&  <Button variant="contained">
      <Link href={"/dashboard"}>Dashboard</Link>
      </Button>
     }
       </Box>
      </div>
    </div>
  );
}
