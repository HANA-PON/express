var express = require('express');
var router = express.Router();
var request = require('request');

const apiKey = 'VZIN9E45bw1j8n7FWEKxR3cZQrfpkEQd'; // ニューヨーク・タイムズのAPIキーを設定
const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=`;

router.get('/', async (req, res) => {
    const query = req.query.q || 'world'; // デフォルトの検索クエリを設定
    request(`${url}${query}`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            // 必要な情報のみを抽出
            const articles = data.response.docs.map(doc => ({
                headline: doc.headline.main,
                snippet: doc.snippet,
                url: doc.web_url,
                multimedia: doc.multimedia
            }));
            res.json(articles);
        } else {
            res.status(500).send("Unable to retrieve news data");
        }
    });
});

module.exports = router;
