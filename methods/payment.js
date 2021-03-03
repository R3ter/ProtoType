import paypal from 'paypal-rest-sdk'

paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AaGc8ED5D1BnEyTYObpfJkyJ9k7bK3ySfEN8U5WAAJdlNmbZ9C-ZpurIiQI8-ynxa90B56WZFHAkRmjd',
    'client_secret': 'EO5XuSXjrvVjscJzkMRJ-tIX4SpbYGdwo9VneK_7PU0zz8bb4lW_49Mf0yf9j9ouyOdB-TYhsDrZCrOp'
})

var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": true,
        "cancel_url": false
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "class",
                "sku": "item",
                "price": "1.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
}
const Pay=()=>{
    paypal.payment.create(create_payment_json,()=>{
        console.log("succ")
    },()=>{
        console.log("falied")
    })
}

export {Pay}