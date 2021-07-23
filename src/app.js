import Post from './Post'
import './styles/style.css'
import AplLogo from './assets/logo'
import json from './assets/json'
import csv from './assets/data.csv'
import xml from './assets/data.xml'

const post = new Post('Webpack Post Title', AplLogo)

console.log('Post to string:', post.toString());

console.log('JSON:', json);
console.log('XML:', xml);
console.log('CSV:', csv);