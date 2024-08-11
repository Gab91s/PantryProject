'use client'
import Image from "next/image";
import { firestore } from "@/firebase";
import { useState, useEffect } from "react";
import { deleteDoc, collection, getDocs, query, setDoc, getDoc, doc } from "firebase/firestore";
import { Box, Stack, Typography, Modal, TextField, Button, style } from '@mui/material';

document.body.style.background = "#eaeded";
export default function Home() {
  const [inventory, setInventory] = useState ([])
  const [open, setOpen] = useState (false)
  const [itemName, setItemName] = useState ('')

  const updateInventory = async () => {
    const snapshot = query (collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
    console.log(inventoryList)
  }

  useEffect(() => {
    updateInventory()
}, [])

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()) {
      const {quantity} = docSnap.data()
      await setDoc (docRef, {quantity: quantity + 1})
      }
      else {
        await setDoc(docRef, {quantity: 1})
      }

    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()) {
      const {quantity} = docSnap.data()
      if (quantity === 1){
        await deleteDoc(docRef)
      } else {
        await setDoc (docRef, {quantity: quantity - 1})
      }
    }

    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display="flex" 
      flexDirection={"column"}
      justifyContent="center" 
      alignItems="center"
      gap={2}
    >
      <Modal 
        open={open} 
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        arial-describedby="modal-modal-description"
      >
        <Box 
          position="absolute" 
          top="50%" 
          left="50%"
          sx={{ transform: 'translate(-50%,-50%)' }}
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <Typography 
            id="modal-modal-title"
            variant="h6"
            component={"h2"}
          >
            Add Item
          </Typography>
          <Stack width="100%" direction="column" spacing={2}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
              }}
            >
            </TextField>
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
              >

              Add Item

              </Button>
          </Stack>
        </Box>
      </Modal>
      <Button
        variant="contained"
        onClick={() => {
          handleOpen()
        }}
      >
        Add New Item
      </Button>
      <Box border="1px solid #333">
        <Box
          width="800px"
          height="100px"
          bgcolor="#ffd700"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        <Typography variant="h2" color="#333">
          Inventory Management
        </Typography>
      </Box>
    </Box>
    <Stack 
      width={"800px"}
      height={"300px"}
      spacing={2}
      overflow={"auto"}
    >
      {
        inventory.map(({name, quantity}) => (
          <Box 
            key={name} 
            width={"100%"} 
            minHeight={"150px"} 
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            bgcolor={"#f0f0f0"}
            p={5}
          >
            <Typography
              variant="h3"
              color="#333"
              textAlign="center"
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography
              variant="h3"
              color="#333"
              textAlign="center"
            >
              {quantity}
            </Typography>
            <stack direction="row" spacing={6}>
              <Button
                 variant="contained"
                 onClick={() => {
                   addItem(name)
                 }}
              >
                Add
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  removeItem(name)
                }}
               >
                Remove        
               </Button>
              </stack>
          </Box>
        ))
      }
    </Stack>
    </Box>
  )
}
