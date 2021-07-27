import * as $ from 'jquery'
import Post from '@models/Post'
import '@styles/style.css'
import AplLogo from '@/assets/logo'
import json from '@/assets/json'
import csv from '@/assets/data.csv'
import xml from '@/assets/data.xml'
import 'muicss/dist/js/mui.js';
import '@styles/main.scss';
import './babel.js';

const post = new Post('Webpack Post Title', AplLogo)

$('pre').addClass('code').html(post.toString());

console.log('Post to string:', post.toString());

console.log('JSON:', json);
console.log('XML:', xml);
console.log('CSV:', csv);