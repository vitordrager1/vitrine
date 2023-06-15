import React from 'react'

import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Show,
  HStack,//horizontal stack | o VSTACH é = a vertical
  VStack,
  StackDivider,
  Text,
  useDisclosure,
  IconButton,
  Hide,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useMediaQuery,
  Spacer,
  ButtonGroup,
  Heading,
  Menu,
  MenuGroup,
  MenuList,
  MenuButton,
  MenuItem,
  MenuDivider,
  Image,
  Spinner
} from '@chakra-ui/react'

import { useCallback, useEffect, useState } from "react";


import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import axios from "axios";
const Categoria = () => {
    const [categorias, setCategorias] = useState([]);
    const getCategorias = useCallback(async (paramOffset) => {
        try {

            const { data } = await axios.get('http://localhost/admin/api/categorias');
            setCategorias(data)
            // console.log(data)

        } catch (error) {
            console.log(error)
        } 
    }, [])

    useEffect(() => {
        getCategorias()
    }, [])

    const renderCategorias = () => {
        if(!categorias.length) {
            return (
                <Spinner />
            )
        }

        return (
            <Menu>
                <MenuButton>Categorias</MenuButton>
                <MenuList>
                    <MenuGroup>
                        {/* {
                            categorias.map(cat => {
                                <MenuItem key={cat.id}>{cat.categoria}</MenuItem>
                            })
                        } */}
                        <MenuItem>Teste</MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
        )
    }

    return (
        <Box>
            {renderCategorias}
        </Box>
    )

}

export default Categoria