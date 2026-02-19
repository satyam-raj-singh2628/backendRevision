const express = require("express");
const Userdata = require("./mockData.json");
const fs = require("fs");

const app = express();
app.use(express.urlencoded({ extended: true })); // this is for parsing application/x-www-form-urlencoded

app
  .route("/users/:id")
  .get((req, res) => {
    console.log("GET request", req.params);
    // res.send(Userdata);
    res.send(Userdata.find((user) => user.id === parseInt(req.params.id)));
  })
  .patch((req, res) => {
    console.log("PATCH request", req.params.id);
    console.log("PATCH request", req.params, req.body);

    const updatedUser = Userdata.map((user) => {
      return user.id === parseInt(req.params.id)
        ? { ...user, ...req.body }
        : user;
    });

    console.log(updatedUser, "qpp");

    fs.writeFile("mockData.json", JSON.stringify(updatedUser), (err) => {
      if (err) {
        console.error("Error writing to file", err);
      } else {
        res.send("PATCH request received");
      }
    });
  })
  .delete((req, res) => {
    const filteredUser = Userdata.filter(
      (user) => user.id !== parseInt(req.params.id),
    );

    fs.writeFile("mockData.json", JSON.stringify(filteredUser), (err) => {
      console.log(err);
    });
    res.send("DELETE request received");
  });

app.post("/api/users", (req, res) => {
  console.log("POST request", req.body);
  console.log(Userdata, "qq");
  Userdata.push({ ...req.body, id: Userdata.length + 1 });
  fs.writeFile("mockData.json", JSON.stringify(Userdata), (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      res.send("POST request received");
    }
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
