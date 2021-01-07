const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const fname = req.body.firstName;
  const lname = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/7f09757ed0";
  const options = {
    method: "POST",
    auth: "pranjal:460055806f8148d6f00cd431a125a90a-us7"
  }
  const request = https.request(url, options, function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(proess.env.PORT||3000,function(){
  console.log("Server is running on port 3000");
});


//listid: 7f09757ed0
// 460055806f8148d6f00cd431a125a90a-us7
