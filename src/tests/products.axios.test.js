import axios from "axios";

const URL = "http://localhost:8080/api/products";

const getProducts = async() =>{
    try {
        const response = await axios.get(URL);
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

const getProductById = async(id) =>{
    try {
        const response = await axios.get(`${URL}/${id}`);
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

const uploadProduct = async(body) =>{
    try {
        await axios.post(URL, body);
        console.log(body)
    } catch (error) {
        console.log(error)
    }
}

const updateProduct = async(body, id) =>{
    try {
        await axios.put(`${URL}/${id}`, body);
        console.log(body)
    } catch (error) {
        console.log(error)
    }
}

const deleteProductById = async(id) =>{
    try {
        await axios.delete(`${URL}/${id}`)
        console.log(`Producto eliminado con el id ${id}`)
    } catch (error) {
        console.log(error)
    }
}

//getProducts()

//getProductById("63fd0f8b6620f1dd6d8e1e1d")

//uploadProduct({
//    "title" : "Gorro",
//    "price" : 600,
//    "thumbnail" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0MXhkY6a6V037qSC1EWlmohGTIa53CPedTF0_xMdKbgyf_zhem7Ul3Ujxg5ZBd2-PE5E&usqp=CAU",
//    "stock" : 10,
//    "codigo" : "aaabbbccc"
//    })

//updateProduct({
//        "title" : "Medias",
//        "price" : 400,
//        "thumbnail" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0MXhkY6a6V037qSC1EWlmohGTIa53CPedTF0_xMdKbgyf_zhem7Ul3Ujxg5ZBd2-PE5E&usqp=CAU",
//        "stock" : 20,
//        "codigo" : "aaabbbccc"
//        }, "63fd0f8b6620f1dd6d8e1e1d")

//deleteProductById("63fd0f8b6620f1dd6d8e1e1d")