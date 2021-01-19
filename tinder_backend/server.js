import express from "express"
import mongoose from "mongoose"
import Cards from "./dbCards.js"
import Cors from "cors"
    

//App config
const app=express();//creating instance of server
const port=process.env.PORT || 8001;//it will find 8001 local server first if not found it will give any port that is available

const connection_url='mongodb+srv://admin:nVPRCTvYQWC0oN81@cluster0.atzbq.mongodb.net/tinderdb?retryWrites=true&w=majority'

//Middleware
app.use(express.json());
app.use(Cors());


//DB Config
mongoose.connect(connection_url,{
    //parameters to make database smooth
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})


//API endpoints
app.get('/',(req,res) => res.status(200).send("Hello World"));

//posting data
app.post('/tinder/cards', (req,res) => {
    const dbCard=req.body;

    Cards.create(dbCard, (err,data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)//creating database if there is no error
        }
    });
});

//retreiving everything from database
app.get('/tinder/cards', (req,res) => {
    Cards.find((err,data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    });
});


//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));