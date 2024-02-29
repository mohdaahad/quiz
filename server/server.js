const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const os = require('os');
const cookieParser = require("cookie-parser");
const path = require('path')
const app = express();
require('dotenv').config()

const wifiIPv4 = Object.values(os.networkInterfaces()).flatMap(interfaceData =>
  interfaceData.find(item => item.family === 'IPv4' && !item.internal)?.address
);

const corsOptions = {
  origin: ["http://localhost:3000", `http://${wifiIPv4[0]}:3000`,'https://65e08b217ebc8c163e01f446--jade-frangipane-551b5c.netlify.app'],
  methods: ["POST", "GET"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: "mysecret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 },
  })
);


// // Import routes
const homeRoutes = require('./routes/home');
const jsonRoutes = require('./routes/json');
const signupRoutes = require('./routes/signup');
const usersRoutes = require('./routes/users');
const scoreRoutes = require('./routes/attempts');
const signinRoutes = require('./routes/signin');
const logoutRoutes = require('./routes/logout');
const getIPRoutes = require('./routes/getIP');
const classesRoutes = require('./routes/classes');
const coursesRoutes = require('./routes/courses');
const resultRoutes = require('./routes/results');
const quizzes = require('./routes/quizzes');

// // Use API routes
app.use(express.static(path.join(__dirname + "/build")))
app.use('/', signinRoutes);
app.use('/', homeRoutes);
app.use('/', signupRoutes);
app.use('/', jsonRoutes);
app.use('/', usersRoutes);
app.use('/', scoreRoutes);
app.use('/', logoutRoutes);
app.use('/', getIPRoutes);
app.use('/', classesRoutes);
app.use('/', coursesRoutes);
app.use('/', resultRoutes);
app.use('/', quizzes);

// const port = 8081;


const port = process.env.PORT || 8081;
const sessionSecret = process.env.SESSION_SECRET || "mysecret";

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});