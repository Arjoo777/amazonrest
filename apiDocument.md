//Page 1
Default API
LOCAL: http://localhost:2500/
LIVE: https://amazon-site.herokuapp.com/

API for getting all categories[GET]
LOCAL: http://localhost:2500/category/gifts
LIVE: https://amazon-site.herokuapp.com/category

API for all items from sub-category[GET]
LOCAL: http://localhost:2500/electronics/201  (201-Mobile, 202-Laptop, 203-TV, 204-Appliances)
LIVE : https://app2fkartapi.herokuapp.com/item/clothes


Page 2

API for particular item details[GET]
LOCAL: http://localhost:2500/item/clothes?itemId=20
LIVE:

Filter By Popularity(Top rated items) [GET]
LOCAL: http://localhost:2500/filter/stars/gifts
Live : 

Sort By Price (Low To High) [GET]
LOCAL: http://localhost:2500/filter/price/clothes

Sort By Price (High to Low) [GET]
LOCAL: http://localhost:2500/filter/price/clothes?sort=-1

Filter By Price [GET]
LOCAL: http://localhost:2500/filter/price/gifts?lcost=400&hcost=500
LIVE:

Filter By Newest First [GET]
LOCAL: http://localhost:2500/filter/new/clothes (stars above 4 are newest)
LIVE:

Filter By Discount [GET]
LOCAL: http://localhost:2500/filter/discount/electronics/50

Page 3
API To Place Order [POST]
LOCAL: localhost:2500/placeOrder
Live : https://app2fkartapi.herokuapp.com/cart/add
JSON-DATA:
{
        "orderId":3,
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
LIVE: 

API for updating order by Id[PUT]
LOCAL: localhost:2500/updateOrder/2
LIVE:
JSON-DATA:
{
    "status":"delivered",
    "bank_name":"HDFC",
    "date":"17/10/2022"
}

API for deleting order by Id[DELETE]
LOCAL: localhost:2500/deleteOrder/634d2127f8553cf3c592035b
LIVE:

