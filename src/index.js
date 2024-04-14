const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');

const sortMiddleware = require('./app/middlewares/SortMiddleware')

const route = require('./routes');
const db = require('./config/db');

// connect to DB
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// Custom middlewares
app.use(sortMiddleware)

// HTTP Logger
app.use(morgan('combined'));

// Template engine
const hbs = handlebars.create({
    helpers: {
        sum: (a, b) => a + b,
        sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default'

            const icons = {
                default: 'bi bi-funnel',
                asc: 'bi bi-sort-up',
                desc: 'bi bi-sort-down'
            }

            const icon = icons[sortType]

            const types = {
                default: 'desc',
                asc: 'desc',
                desc: 'asc'
            }

            const type = types[sortType]

            return `
                <a href="?_sort&column=${field}&type=${type}">
                    <i class="${icon}"></i>
                </a>
            `
        }
    },
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
