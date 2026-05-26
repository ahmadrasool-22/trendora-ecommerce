const express=require("express");
const router=express.Router();

const {addProduct,sendProduct,removeProduct,quantityINC,quantityDEC,getUserCart}=require("../controller/cartController");

router.post("/",addProduct);
router.get("/",sendProduct);
router.get("/:userId",getUserCart);
router.post("/remove",removeProduct);
router.post("/incquantity",quantityINC);
router.post("/decquantity",quantityDEC);


module.exports=router;