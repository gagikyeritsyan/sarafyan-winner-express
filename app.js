const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

require('dotenv').config();

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/api/user', require('./routes/users'));
app.use('/api/body_image', require('./routes/body_image'));
app.use('/api/header_main_logo', require('./routes/header_main_logo'));
app.use('/api/header_navbar', require('./routes/header_navbar'));
app.use('/api/header_languages', require('./routes/header_languages'));
app.use('/api/home_intro', require('./routes/home_intro'));
app.use('/api/about_title', require('./routes/about_title'));
app.use('/api/product', require('./routes/product'));
app.use('/api/gallery_title', require('./routes/gallery_title'));
app.use('/api/gallery_content', require('./routes/gallery_content'));
app.use('/api/contact_title', require('./routes/contact_title'));
app.use('/api/contact_info', require('./routes/contact_info'));
app.use('/api/winery_info', require('./routes/winery_info'));
app.use('/api/winery_images', require('./routes/winery_image'));
app.use('/api/winery_our_story', require('./routes/winery_our_story'));
app.use('/api/gallery_products', require('./routes/gallery_product'));
app.use('/api/contact_us', require('./routes/contact_us'));
app.use('/api/contact_message', require('./routes/contact_message'));
app.use('/api/footers', require('./routes/footer'));
app.use('/api/list_endpoints', require('./routes/endpoints'));


app.listen(process.env.PORT || 5001, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})