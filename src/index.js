import './css/style.css'; // This imports the CSS that we want to use; As long as CSS // is loaded with style-loader + css-loader
import { initialInit } from './modules/DOM';
import { weatherAPI } from './modules/WeatherAPI';

initialInit();