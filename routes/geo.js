
const router = require('express').Router();
const axios = require('axios');
const cors = require('cors');

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



module.exports = router;