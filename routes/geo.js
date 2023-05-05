
const router = require('express').Router();
const axios = require('axios');
const cors = require('cors');
const { map } = require('../app');

router.use(cors());

/* GET home page. */
router.get('/', async function (req, res, next) {
    // https://api.ipgeolocation.io/ipgeo?apiKey=d64aa29252fe4a60b04461f4b28adbab&ip=
    // let remote = req.socket.remoteAddress;
    let remote = "135.0.223.180";
    let url = `https://api.ipgeolocation.io/ipgeo?apiKey=d64aa29252fe4a60b04461f4b28adbab&ip=${remote}`;
    let fetch = await axios.get(url);

    let lat = fetch.data.latitude;
    let lng = fetch.data.longitude;
    // console.log(fetch.data);
    res.json({ lat: lat, lng: lng });
});

/* GET home page. */
router.get('/hydrants', async function (req, res, next) {

    let url = `https://www.gatineau.ca/upload/donneesouvertes/BORNE_FONTAINE.json`;
    let fetch = await axios.get(url);
    let mapData = fetch.data.features;
    let outData = [];
    let outCount = mapData.length > 20 ? 20 : mapData.length;

    for (let i = 0; i < outCount; i++) {
        let rnd = Math.floor(Math.random() * mapData.length);
        let out = {
            "lat": mapData[rnd].geometry.coordinates[1],
            "lng": mapData[rnd].geometry.coordinates[0],
            "setId": i,
            "spec": mapData[rnd].properties.SPECIFIQUE
        };
        outData.push(out);
    }
    res.json(outData);
});




module.exports = router;