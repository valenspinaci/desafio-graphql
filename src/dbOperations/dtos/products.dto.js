class ProductDto{
    constructor({title}){
        this.product = title;
    }
}

export const convertProductToDto = (products)=>{
    if(Array.isArray(products)){
        return products.map(product => new ProductDto(product))
    }else{
        return new ProductDto(product)
    }
}

export{ProductDto}
