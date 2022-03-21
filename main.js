// March 7th-14th ~ 50 GB ~ 3500 Videos in HQ
var request = require('request');
const fs = require('fs');
const https = require('https');

var pagination_key= [
    "A3VDIwOjI5OjQ3",
    "A3VDE4OjU0OjA3",
    "A3VDE2OjM0OjUx"];

for (let j = 0; j <=2; j++) { // 2 at a time
    var options = {
        'method': 'GET',
        'url': 'https://account.ring.com/api/cgw/evm/v2/history/devices/-?capabilities=offline_event,mobility,ringtercom&pagination_key=-' + pagination_key[j] + '-&start_time=-&limit=50',
        'headers': {
            'Accept': ' application/json, text/plain, */*',
            'Accept-Encoding': ' gzip: true, deflate, br',
            'Accept-Language': ' en-US,en;q=0.9',
            'Connection': ' keep-alive',
            'Cookie': ' ',
            'csrf-token': '',
            'Referer': '-',
            'sec-ch-ua': ' " Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
            'sec-ch-ua-mobile': ' ?0',
            'sec-ch-ua-platform': ' "Windows"',
            'Sec-Fetch-Dest': ' empty',
            'Sec-Fetch-Mode': ' cors',
            'Sec-Fetch-Site': ' same-origin',
            'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36',
            'X-API-VERSION': ' 1'
        }
    };

    request(options, function (error, response) {
        length = fs.readdirSync('C:\\Users\\STSC\\CLionProjects\\ring-bulk-downloader\\videos').length

        function save(url) {
            https.get(url, (res) => {
                const path = `${__dirname}/videos/` + length++ + `.mp4`;
                const filePath = fs.createWriteStream(path);
                res.pipe(filePath);
                filePath.on('finish', () => {
                    filePath.close();
                    console.log('Download Completed');
                })
            })
        }

        for (let i = 0; i <= 49; i++) {
            if (error) throw new Error(error);
            const obj = JSON.parse(response.body);
            const url = obj.items[i].visualizations.cloud_media_visualization.media[0].url;
            save(url);
        }
    });

}
