var express = require('express');
var app = express();

var router = express.Router();
var PORT = 80;


app.post("/echo", (req, res) => {

  if (req.body === undefined) {
    throw new Error("express.json middleware not installed");
  }
  if (!Object.keys(req.body).length) {
    // E.g curl -v -XPOST http://localhost:5000/echo
    if (!req.get("content-Type")) {
      return res.status(400).send("no content-type header\n");
    }
    // E.g. curl -v -XPOST -d '{"foo": "bar"}' http://localhost:5000/echo
    if (!req.get("content-Type").includes("application/json")) {
      return res.status(400).send("content-type not application/json\n");
    }
    // E.g. curl -XPOST -H 'content-type:application/json' http://localhost:5000/echo
    return res.status(400).send("no data payload included\n");
  }

  // At this point 'req.body' is *something*.
  // For example, you might want to `console.log(req.body.foo)`
  var x = req.body;
  
  
}); 

app.listen(PORT, function(err){
   if (err) console.log(err);

});



const { Client, Environment, ApiError } = require("square");

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

try {
  const response = await client.terminalApi.createTerminalCheckout({
    idempotencyKey: 'blart34343432',
    checkout: {
      amountMoney: {
        amount: 80,
        currency: 'USD'
      },
      referenceId: '232323',
      note: 'hamburger',
      deviceOptions: {
        deviceId: 'dbb5d83a-7838-11ea-bc55-0242ac130003',
        skipReceiptScreen: true
      },
      paymentType: 'MANUAL_CARD_ENTRY'
    }
  });

  console.log(response.result);
} catch(error) {
  console.log(error);
}
