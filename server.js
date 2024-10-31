const express=require('express');
const session=require('express-session');
const bodyParser=require('body-parser');
const app=express();
const port=3000;

const attendanceData ={
    'user1':{ 
        password: 'password1',
        present: 20, 
        absent: 5, 
        previous_months: {
            'January': 18,
            'February': 22,
            'March': 20,
            'April': 15,
            'May': 25,
            'June': 18,
        }
    },
    'user2':{ 
        password: 'password2',
        present: 15, 
        absent: 10, 
        previous_months: {
            'January': 12,
            'February': 14,
            'March': 15,
            'April': 20,
            'May': 18,
            'June': 22,
        }
    },
    'user3':{ 
        password: 'password3',
        present: 18, 
        absent: 7, 
        previous_months: {
            'January': 22,
            'February': 12,
            'March': 19,
            'April': 16,
            'May': 22,
            'June': 16,
        }
    },
    'user4':{ 
        password: 'password4',
        present: 19, 
        absent: 6, 
        previous_months: {
            'January': 24,
            'February': 12,
            'March': 10,
            'April': 25,
            'May': 18,
            'June': 19,
        }
    },
    'user5':{ 
        password: 'password5',
        present: 16, 
        absent: 9, 
        previous_months: {
            'January': 16,
            'February': 15,
            'March': 20,
            'April': 18,
            'May': 19,
            'June': 10,
        }
    },
    'user6':{ 
        password: 'password6',
        present: 18, 
        absent: 7, 
        previous_months: {
            'January': 19,
            'February': 12,
            'March': 14,
            'April': 18,
            'May': 18,
            'June': 23,
        }
    },
    'user7':{ 
        password: 'password7',
        present: 13, 
        absent: 12, 
        previous_months: {
            'January': 14,
            'February': 18,
            'March': 19,
            'April': 17,
            'May': 25,
            'June': 14,
        }
    },
    'user8':{ 
        password: 'password8',
        present: 17, 
        absent: 8, 
        previous_months: {
            'January': 18,
            'February': 22,
            'March': 20,
            'April': 15,
            'May': 25,
            'June': 18,
        }
    },
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.redirect('/login');
});
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login',(req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    if (attendanceData[username] && attendanceData[username].password === password) {
        req.session.username = username;
        res.redirect('/dashboard');
    } else {
        res.redirect('/login');
    }
});

app.get('/dashboard',(req, res) =>{
    if (!req.session.username) {
        return res.redirect('/login');
    }
    const user = req.session.username;
    const data = attendanceData[user];
    res.render('dashboard',{ user, data });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
