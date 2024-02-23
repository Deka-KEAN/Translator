
const express=require("express");

// using google-translate-api to translate english to french
const translate = require('translate-google')
const bodyParser=require("body-parser");
const cors=require("cors");
const zod=require("zod");
const app=express();
app.use(cors());
app.use(bodyParser.json());

const port=process.env.PORT || 3000;

// zod validation for api body
const textSchema=zod.object({
    text:zod.string()
}).strict();

app.get("/translate",(req,res)=>{
    res.status(200).sendFile('index.html')
});

app.post("/translate", async (req,res)=>{
    const validation=req.body;
    const checking=textSchema.safeParse(validation);
    console.log(checking);
    if(!checking.success){
        return res.status(400).json({
            message : "Incorrect Inputs (Please send one parameter {text : value})"
        });
    }
    const data=req.body.text;

    await translate(data, {to: 'fr'}).then(data => {
        console.log(data);
        res.status(200).json({
            translation:data
        });
        // console.log(res)
    }).catch(err => {
        // console.error(err)
        res.json({
            error: "Error while translating"
        })
    })
});

app.listen(port,()=>console.log("Port listening"));






