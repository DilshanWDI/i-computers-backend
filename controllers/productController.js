import Product from "../models/Product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "Access denied. Admins only.",
        });
        return;
    }

    try {
        const existingProduct = await Product.findOne({
            prodctId: req.body.prodctId
        })
        if (existingProduct != null) {
            res.status(400).json({
                message: "Product With this Product id alredy exists"
            })
            return
        }
        const newProduct = new Product({
            prodctId: req.body.prodctId,
            name: req.body.name,
            altNames: req.body.altNames,
            price: req.body.price,
            labelledPrice: req.body.labelledPrice,
            description: req.body.description,
            images: req.body.images,
            brand: req.body.brand,
            model: req.body.model,
            category: req.body.category,
            isAvailable: req.body.isAvailable,
            stock: req.body.stock
        })

        await newProduct.save()
        res.status(201).json({
            message: "Product Created Successfully",

        })

    } catch (error) {
        res.status(500).json({
            message: "error Creating product"
        })
    }

}
export async function getAllProducts(req, res) {
    try {
        if (!isAdmin(req)) {
            const products = await Product.find()
            res.status(200).json(products)
        } else {
            const products = await Product.find({ isAvailable: true })
            res.status(200).json(products)
        }

    } catch (error) {
        f
        res.status(500).json({
            message: "error fetching products"
        })
    }
}

export async function deleteProduct(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "Access denied. Admins only.",
        });
        return;
    }

    try {
        await Product.deleteOne({
            prodctId: req.params.prodctId
        })
        res.json({
            message: "Product Deleted Successfully"
        })


    } catch (error) {
        res.status(500).json({
            message: "error deleting product"
        })
    }
}

export async function updateProduct(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "Access denied. Admins only.",
        });
        return;
    }

    try {
        await Product.updateOne({
            prodctId: req.params.prodctId
        }, {
            name: req.body.name,
            altNames: req.body.altNames,
            price: req.body.price,
            labelledPrice: req.body.labelledPrice,
            description: req.body.description,
            images: req.body.images,
            brand: req.body.brand,
            model: req.body.model,
            category: req.body.category,
            isAvailable: req.body.isAvailable,
            stock: req.body.stock

        })
        res.json({
            message: "Product Updated Successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "error updating product"
        })
    }
}

export async function getProductById(req, res) {
    try {
        const product = await Product.findOne({
            prodctId: req.params.prodctId
        })
        if (product == null) {
            res.status(404).json({
                message: "Product Not Found"
            })
        } else {
            if (product.isAvailable) {
                res.status(200).json(product)
            } else {
                if (isAdmin(req))  {
                    {
                        res.status(403).json(product)
                    }
                } else {
                  res.status(403).json({
                    message: "acess denid"
                  })
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "error fetching product"
        })
    }
}