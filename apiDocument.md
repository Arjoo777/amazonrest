//Page 1
Default API
LOCAL: http://localhost:2500/
LIVE: https://amazon-site.herokuapp.com/

API for getting all categories[GET]
LOCAL: http://localhost:2500/category/gifts
LIVE: https://amazon-site.herokuapp.com/category/clothes

API for all items from sub-category[GET] (from electronics)
LOCAL: http://localhost:2500/electronics/201  (201-Mobile, 202-Laptop, 203-TV, 204-Appliances)
LIVE : https://amazon-site.herokuapp.com/electronics/201

API for all items from sub-category[GET] (from clothes)
LOCAL: http://localhost:2500/clothes/101
LIVE: https://amazon-site.herokuapp.com/clothes/101


Page 2

API for particular item details[GET]
LOCAL: http://localhost:2500/item/clothes?itemId=20
LIVE: https://amazon-site.herokuapp.com/item/clothes?itemId=20

Filter By Popularity(Top rated items) [GET]
LOCAL: http://localhost:2500/filter/stars/gifts
LIVE : https://amazon-site.herokuapp.com/filter/stars/gifts

Sort By Price (Low To High) [GET]
LOCAL: http://localhost:2500/filter/price/clothes
LIVE: https://amazon-site.herokuapp.com/filter/price/clothes

Sort By Price (High to Low) [GET]
LOCAL: http://localhost:2500/filter/price/clothes?sort=-1
LIVE: https://amazon-site.herokuapp.com/filter/price/clothes?sort=-1

Filter By Price [GET]
LOCAL: http://localhost:2500/filter/price/gifts?lcost=400&hcost=500
LIVE: https://amazon-site.herokuapp.com/filter/price/gifts?lcost=400&hcost=500

Filter By Newest First [GET]
LOCAL: http://localhost:2500/filter/new/clothes (stars above 4 are newest)
LIVE: https://amazon-site.herokuapp.com/filter/new/clothes

Filter By Discount [GET]
LOCAL: http://localhost:2500/filter/discount/electronics/50
LIVE: https://amazon-site.herokuapp.com/filter/discount/electronics/50


Page 3
API To Place Order [POST]
LOCAL: localhost:2500/placeOrder
LIVE : https://amazon-site.herokuapp.com/placeOrder
JSON-DATA:
{
        "orderId":1,
        "name": "Rahul",
        "email": "rahul@gmail.com",
        "address": "Wagholi",
        "phone": 768768686,
        "cost": 787,
	    "item":[3,4]
}

Page 4
API for List Of Orders[GET]
LOCAL: localhost:2500/orders, localhost:2500/orders?email=rahul@gmail.com (by eamil)
LIVE: https://amazon-site.herokuapp.com/orders

API for updating order by Id[PUT]
LOCAL: localhost:2500/updateOrder/2
LIVE: https://amazon-site.herokuapp.com/updateOrder/2
JSON-DATA:
{
    "status":"delivered",
    "bank_name":"HDFC",
    "date":"17/10/2022"
}

API for deleting order by Id[DELETE]
LOCAL: localhost:2500/deleteOrder/634d2127f8553cf3c592035b
LIVE: https://amazon-site.herokuapp.com/deleteOrder/634d2127f8553cf3c592035b

