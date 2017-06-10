var mongoose = require('mongoose');
var Film = mongoose.model('Film');

exports.addfilm = function(req, res) {
	var type = "1";
	var film_name = "神偷奶爸3";
	var film_ename = "Despicable Me 3";
	var film_classify = "喜剧,动画,冒险";
	var film_long = "美国 / 90分钟";
	var film_detail = "影片将延续前两部的温馨搞笑风格，聚焦格鲁和露西的婚后生活，继续讲述格鲁和三个女儿的爆笑故事。";
	var picture_url = "/static/films/images/coming/despicable.jpg";
	var video_link = "https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400&v=20161117&vid=f050603jqm8&auto=0";
	var show_date = new Date("2017,7,7");

	console.log("adding");
	var film = new Film({film_name: film_name});
		film.set('type', type);
		film.set('film_ename', film_ename);
		film.set('film_detail', film_detail);
		film.set('picture_url', picture_url);
		film.set('video_link', video_link);
		film.set('show_date', show_date);
		film.save(function(err) {
			if(err) {
				console.log(err);
				//req.session.error = 'error';
				res.status(404);
				res.end();
			} else {
				console.log("ok");
				//req.session.msg = 'success';
				res.status(200).json(data);
				res.end();
			}
		});
}


exports.getFilmList = function(req, res) {
	var type = req.body.type;
	Film.find({type: type})
		.exec(function(err, films){
			if(!films) {
				
			}
		});
}

