import supertest from "supertest";
import {expect} from "chai";
import {app} from "../server.js";
import { response } from "express";

const request = supertest(app);

describe("Products endpoints", ()=>{
    it("Get products", async()=>{
        const response = await request.get("/api/products");
        expect(response._body.status).equal("Success")
    })
    it("Get product by id", async()=>{
        const id = "640cee8962b6f47844f0c539" 
        const response = await request.get(`/api/products/${id}`)
        expect(response._body.status).equal("Success")
    })
    it("Upload product", async()=>{
        const body = {
            "title" : "Campera",
            "price" : 4800,
            "thumbnail" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0MXhkY6a6V037qSC1EWlmohGTIa53CPedTF0_xMdKbgyf_zhem7Ul3Ujxg5ZBd2-PE5E&usqp=CAU",
            "stock" : 7,
            "codigo" : "aaabbbccc"
            }
        const response = await request.post("/api/products").send(body);
        expect(response._body.status).equal("Success")
    })
    it("Update product", async()=>{
        const id = "640cedb8553cd053d662381f"
        const body = {
            "title" : "Camisa",
            "price" : 4800,
            "thumbnail" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0MXhkY6a6V037qSC1EWlmohGTIa53CPedTF0_xMdKbgyf_zhem7Ul3Ujxg5ZBd2-PE5E&usqp=CAU",
            "stock" : 7,
            "codigo" : "aaabbbccc"
            }
        const response = await request.put(`/api/products/${id}`).send(body);
        expect(response._body.status).equal("Success")
    })
    it("Delete product", async()=>{
        const id = "640cf50811f8f28ff8eab178";
        const response = await request.delete(`/api/products/${id}`);
        expect(response._body.status).equal("Success")
    })
})