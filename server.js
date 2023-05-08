const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isEmail } = require('validator');

const app = express();
// request data collect korar jonne midleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// connect to MongoDB
// mongoose
//   .connect('mongodb://127.0.0.1:27017/ToDo')
//   .then(() => {
//     console.log('Db connect');
//   })
//   .catch((err) => {
//     console.log('Db not connect');
//     console.log(err);
//   });

//Async await function use kore mongoDB connect

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/ToDo');
    console.log('DB connet');
  } catch (error) {
    console.log('DB not connet');
    console.log(error);
  }
};

// define schema for registration

const usersSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address.'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please provide a valid email address.'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: [6, 'Password must be at least 6 characters.'],
  },
  task: [
    {
      item: {
        type: String,
      },
    },
  ],
});

// define schema for login

const loginSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide your email address.'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please provide a valid email address.'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: [6, 'Password must be at least 6 characters.'],
  },
});

// create model

const Users = mongoose.model('Users', usersSchema);
const UsersLogin = mongoose.model('UsersLogin', loginSchema);

// routers
app.get('/', (req, res) => {
  res.send('Ok');
});

// register router

app.post('/register', async (req, res) => {
  try {
    //For testing purpous

    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    // const newUsers = new Users({
    //   name,
    //   email,
    //   password,
    // });

    //data comeing from frontend

    const newUsers = new Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      task: req.body.task,
    });
    // console.log(newUsers);
    const { email } = newUsers;
    // database e email already ache kina seta chenck kora hocce
    const findData = await Users.findOne({
      email: email,
    });
    // email already databse e na thakle new ID create kora hobe
    if (!findData) {
      const usersData = await newUsers.save();
      console.log(findData);

      res.status(200).send('Successfull');
    } else {
      res.json('fail');
      res.status(200).send('Already exist');
    }
  } catch (error) {
    // res.json('noOk');
    res.status(500).send({ message: error.message });
  }
});

// login router
app.post('/login', async (req, res) => {
  try {
    const newUsers = new UsersLogin({
      email: req.body.email,
      password: req.body.password,
    });
    const { email, password } = newUsers;
    // database e email already ache kina seta chenck kora hocce
    const findData = await Users.findOne({
      email: email,
      password: password,
    });
    // email already databse e na thakle new ID create kora hobe
    if (findData) {
      // const usersData = await newUsers.save();
      console.log(findData);
      res.json(findData);

      res.status(200).send('Successfull');
    } else {
      res.json('fail');
      res.status(200).send('Register first to login');
    }
  } catch (error) {
    res.json({ message: error.message });
    res.status(500).send({ message: error.message });
  }
});

// delet router

app.delete('/api/deletetodo', async (req, res) => {
  try {
    // const id = req.params.id;
    console.log('from delete server ' + req.body);
    const id = req.body.id;
    const objectid = req.body.objectid;
    console.log('from delet ' + id);
    // ei call back function just delete korbe
    // const deleteUserId = await Users.updateOne(
    //   { _id: id },
    //   { $pull: { task: { _id: objectid } } }
    // );

    //eikhane findByIdAndUpdate use koray delete korar pore puro object k return korbe
    if (id && objectid) {
      const deleteUserId = await Users.findByIdAndUpdate(
        { _id: id },
        { $pull: { task: { _id: objectid } } },
        { new: true }
      );

      res.send(deleteUserId);
      // console.log(deleteUserId);
    } else {
      console.log('Id missing');
      res.send('Id  is messing');
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

// create item router

app.put('/create', async (req, res) => {
  try {
    const id = req.body.id;
    const item = req.body.item;
    console.log(res.body);
    if (id && item) {
      const pushUserTask = await Users.findByIdAndUpdate(
        { _id: id },
        { $push: { task: { item: item } } },
        { new: true }
      );
      res.send(pushUserTask);
    } else {
      res.send('Id or task is messing');
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

// listening port
app.listen(5000, async () => {
  console.log('Server connected');
  await connectDB();
});
