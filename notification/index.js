const express = require("express");
const notifier  = require("node-notifier");
const app = express();

app.use(express.json());

app.get('/', function(req,res){
  res.set('Content-Type', 'text/plain');
  res.send("hello world");
});

app.get("/health", (req, res) => res.status(200).send());

app.post("/notify/login", (req, res) =>{
  notify(req.body, reply => res.send(reply))
})

app.post("/notify/logout", (req, res) =>{
  notify(req.body, reply => res.send(reply))
})

const notify = ({title, message}, cb) =>{
  notifier.notify(
    {
      title: title || "Message title",
      message: message || "Message body",
      sound: true,
      wait: true,
      reply: true,
      closelabel: "Completed",
      timeout: 5
    },
    (err, response, reply) =>{
      cb(reply)
    }
  )
}

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`server is up and running on port: ${port}`));
