import {Contact} from "../models/Contact.models.js"

const createcontact=async(req,res)=>{
    try {
        const{firstname,lastname,email,phone,message}=req.body;
        if(!firstname || !lastname || !email || !phone || !message)
        {
            return res.json("all fields are requires");
        }
        const conatctdata=new Contact({
            firstname,
            lastname,
            email,
            phone,
            message
        })
        const response=await conatctdata.save();
        return res.staus(201).json(response)
    } catch (error) {
        console.error('Error in createContact:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}