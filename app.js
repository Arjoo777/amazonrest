let express=require('express');
let app=express();
let dotenv=require('dotenv');
dotenv.config()
let morgan=require('morgan');
let fs = require('fs');
let port=process.env.PORT || 9800;

let cors = require('cors');
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = process.env.MongoLive;
let bodyParser = require('body-parser')
let db;

app.use(morgan('short',{stream:fs.createWriteStream('./app.logs')}))
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//////-----API----/////
app.get('/', (req, res) => {
    // res.send('Express Server Default');
    res.send('<h1>AMAZON DEFAULT API</h1>')
});

//list of category
//http://localhost:2500/category--my api

// https://app2fkartapi.herokuapp.com/list-apis
app.get('/category', (req, res) => {
    db.listCollections().toArray((err, collInfo) => {
        if (err) throw err;

        let arr = []
        for (c of collInfo)  
            arr.push(c.name);

        res.send(arr);
    });
});

//category details
app.get('/details/:id',(req,res) => {
    //let id = mongo.ObjectId(req.params.id)
    let id = Number(req.params.id)
    db.collection('category').find({category_id:id}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})


// api to get all items of any category 
//http://localhost:2500/category/gifts---my api
// http://localhost:9200/api/shirts
// https://app2fkartapi.herokuapp.com/api/shirts
app.get('/category/:categoryName', (req, res) => {
    let categoryName = req.params.categoryName;
    db.collection(categoryName).find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

// NOTE: /item, /filters return first 12 items by default

// api for search bar (returns 12 items by default)
//http://localhost:2500/item/tv---my api
//http://localhost:2500/item/tv?itemId=2--myapi
// http://localhost:9200/item/clothes
// http://localhost:9200/item/clothes?itemId=12
// https://app2fkartapi.herokuapp.com/item/clothes
// https://app2fkartapi.herokuapp.com/item/clothes?itemId=12
app.get('/item/:itemName', (req, res) => {
    let itemName = req.params.itemName;
    let itemId = req.query.itemId;
    let query = {};
    if(itemId) {
        query = {item_id: Number(itemId)};
    }
    db.collection(itemName).find(query).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// api for details page, clicking on popularity will send item type to js/db 
// filter by popularity

//http://localhost:2500/filter/stars/gifts--my api
// http://localhost:9200/filter/popularity/mouses
// http://localhost:9200/filter/popularity/refrigerators
// https://app2fkartapi.herokuapp.com/filter/popularity/mouses
// https://app2fkartapi.herokuapp.com/filter/popularity/refrigerators
app.get('/filter/stars/:item', (req, res) => {
    let itemName = req.params.item;
    let query = {stars:{$gt: 4}};

    db.collection(itemName).find(query).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
});



// filter by price
//http://localhost:2500/filter/price/mensclothing(low to high)---my api
//http://localhost:2500/filter/price/mensclothing?sort=-1(high to low)--my api
//http://localhost:2500/filter/price/tv?lcost=10000&hcost15000--my api
// http://localhost:9200/filter/price/bags
// http://localhost:9200/filter/price/bags?sort=-1
// https://app2fkartapi.herokuapp.com/filter/price/bags
// https://app2fkartapi.herokuapp.com/filter/price/bags?sort=-1
// https://app2fkartapi.herokuapp.com/filter/price/bags?lcost=50&hcost=1000
// https://app2fkartapi.herokuapp.com/filter/price/bags?sort=-1&lcost=50&hcost=1000
app.get('/filter/price/:item', (req, res) => {
    let itemName = req.params.item;

    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost); 
    let query = {new_price:{$gt: 50}};

    if(lcost && hcost) 
        query = {new_price:{$gt: lcost, $lt: hcost}};
    else if(!lcost && hcost) 
        query = {new_price:{$gt: 50, $lt: hcost}};
    else if(lcost && !hcost)
        query = {new_price:{$gt: lcost}};
    
    
    let sort_order = {new_price: 1};        // -1 to sort in desc order
    if(req.query.sort) {
        sort_order = {new_price: Number(req.query.sort)};
    }
    
    db.collection(itemName).find(query).sort(sort_order).toArray((err, result) => {
        if(err) throw err;
        res.send(result);
    })
})


// filter by newest first
//http://localhost:2500/filter/new/appliances--my api
// http://localhost:9200/filter/new/bags
// http://localhost:9200/filter/new/keyboards
// https://app2fkartapi.herokuapp.com/filter/new/bags
// https://app2fkartapi.herokuapp.com/filter/new/keyboards
app.get('/filter/new/:item', (req, res) => {
    let itemName = req.params.item;
    let query = { $and:[{stars: {$lt:4.2 , $gt: 3.5}}] };       // my criteria defining 'what is new data'

    db.collection(itemName).find(query).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// filter by discount
//http://localhost:2500/filter/discount/appliances/50--my api
// http://localhost:9200/filter/discount/mouses/70
// http://localhost:9200/filter/discount/powerbanks/50
// https://app2fkartapi.herokuapp.com/filter/discount/powerbanks/50
app.get('/filter/discount/:item/:discount', (req, res) => {
    let itemName = req.params.item;
    let discount = req.params.discount;

    let query = {discount:{$gt: Number(discount)}};
    db.collection(itemName).find(query).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// filter by special-price (offers)
// http://localhost:9200/filter/offers/mouses
// https://app2fkartapi.herokuapp.com/filter/offers/mouses
app.get('/filter/offers/:item', (req, res) => {
    let itemName = req.params.item;
    let sort_order = {discount: -1}     // max discount first (i.e. less cost items) : offer!

    db.collection(itemName).find().sort(sort_order).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


//place order


app.post('/placeOrder',(req,res) => {
    console.log(req.body);
    db.collection('orders').insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('Order Placed')
    })
})

//list of order

//by email ---localhost:2500/orders?email=rahul@gmail.com
app.get('/orders',(req,res) => {
    let email = req.query.email
    let query = {};
    if(email){
       // query={email:email}
        query={email}
    }
    db.collection('orders').find(query).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

app.put('/updateOrder/:id',(req,res) => {
    let oid = Number(req.params.id);
    db.collection('orders').updateOne(
        {orderId:oid},
        {
            $set:{
                "status":req.body.status,
                "bank_name":req.body.bank_name,
                "date":req.body.date
            }
        },(err,result) => {
            if(err) throw err;
            res.send('Order Updated')
        }
    )
})

app.delete('/deleteOrder/:id',(req,res) => {
    let _id = mongo.ObjectId(req.params.id);
    db.collection('orders').deleteOne({_id},(err,result) => {
        if(err) throw err;
        res.send('Order Deleted')
    })
})

//connection with mongo
MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log(`Error while connecting`);
    db = client.db('amazonsite')
    app.listen(port,() => {
        console.log(`Listing to port ${port}`)
    })
})


// app.listen(port,() => {
//     console.log(`Listening to port ${port}`)
// })