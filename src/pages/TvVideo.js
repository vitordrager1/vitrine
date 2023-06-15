import {React, useCallback, useEffect, useState } from "react";

import { SimpleGrid, Spinner, Flex, IconButton, Heading, Text } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProdutoCard from '../components/ProdutoCard'

const Pagination = ({request, offset}) => {

    const nextPage = () => {
        request(offset + 20)
    }

    const previousPage = () => {
        if (offset === 0) return
        request(offset - 20)
    }

    return (
        <Flex gap={4}>
            <IconButton onClick={previousPage} icon={<ArrowLeftIcon/>}/>
            <IconButton onClick={nextPage} icon={<ArrowRightIcon/>}/>
        </Flex>
    )
}
const Informatica = () => {
    const [loading, setLoading] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [offset, setOffset] = useState(0);

    // const {data} = await axios.get('https://dummyjson.com/produtos'), {
    //   params: {
    //     limit: 10, offset: paramOffset
    //   }
    // }
      const getproduto = useCallback(async (paramOffset) => {
        try {
            setLoading(true)
            const { data } = await axios.get('http://localhost/admin/api/categoria/3', {
                    params: {
                    limit: 20,
                    offset: paramOffset
                }
            });
            // const promiseArray = data.results.map(produto => { return axios.get(produto.url)})
            // const promiseResult = await Promise.all(promiseArray)
            // const produtoData = promiseResult.map(result => result.data)
            // console.log(data.produtos.map(p=>p.id))
            setProdutos(data)
            // console.log(produtos)
            // console.log(data)
            // console.log(data.produtos.map(p=>p.id))
            setOffset(paramOffset)
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false)
            // console.log(produtos.length)
        }
    }, [])
      useEffect(() => {
        getproduto(0)
    }, [])
    // produtos = JSON.parse(produtos)
    const renderProdutoList = () => {
      // const produtoLength = produtos.produtos
        if(loading || !produtos.length) {
            return (
                <Text> Produtos não encontrados </Text>
                // <Spinner />
            )
        }

        return (
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))' padding={4}>
                {
                    produtos.map(produto =>  {
                        return (
                            // console.log(produto)
                            <ProdutoCard key={produto.id} produto={produto}/>
                        )
                    })
                }
                <Pagination offset={offset} request={getproduto}/>
            </SimpleGrid>
        )
    }
  
  return (
    <div>
    <div className="container">
        {/* <Header title="Produtos"/> */}
        <Navbar/>
        <Heading p={"5"}>Tv e Vídeo</Heading>
        {renderProdutoList()}
    </div>
    <div className="footer-container">
        <Footer footer="Desenvolvido pela Tropa dos Picaretas!"/>
    </div>
</div>
  );
};

export default Informatica;