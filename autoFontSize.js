$.fn.extend({
	autoFontSize : function(opt) {
		//
		// opt:
		// 	maxFontSize:	the maximum size of font size
		// 		default:	110
		//
		// 	minFontSize: 	the minimum size of font size
		// 		default:	10
		//
		// 	spacing:		the spacing of font upper limit and lower limit
		// 		deafult:	5
		//
		// 	content:		the text which need to change size
		// 		default:	target's text
		//
		// 	center:			does it need to put to location(can choose center, vertical or horizontal)
		// 		default:	false
		//
		// 	wScale:			width scale value
		// 		default		1
		//
		// 	hScale:			height scale value
		// 		default		1
		//
		var t = this;
		var opt = opt || {};
		var area = $("body").append("<div id='autoFontArea' style='display:none'></div>")
			.children("#autoFontArea");
		var css = {};

		var width = t.width() * (opt.wScale || 1);
		var height = t.height() * (opt.hScale || 1);
		var max = opt.maxFontSize || 110;
		var min = opt.minFontSize || 10;
		var limit = opt.spacing || 5;
		var text = opt.content || t.text();
		var center = opt.center || false;

		area.text(text);

		css["font-size"] = testFontSize((max - 3 * min) / 2) - 1;
		function testFontSize(font) {
			if(Math.abs(max - min) < limit) {
				return Math.min(min, font);
			}
			area.css({
				height: "100%",
				width: "auto",
				"font-size": font
			});

			if(area.width() > width && font > min && font - min > limit) {
				max = font;
				return testFontSize(min + (font - min) / 2);
			}

			area.css({
				height: "auto",
				width: "100%",
				"font-size": font
			});
			if(area.height() > height && font > min && font - min > limit) {
				max = font;
				return testFontSize(min + (font - min) / 2);
			}else {
				min = font;
				return testFontSize(font + (max - font) / 2);
			}
		}
		if(center) {
			area.css({
				width: "auto",
				height: "auto",
				"font-size": css["font-size"]
			});
			if(center == "center") {
				css["left"] = (width - area.width()) / 2;
				css["top"] = Math.max(0, (height - area.height()) / 2);
			}else if(center == "vertical") {
				css["top"] = Math.max(0, (height - area.height()) / 2);
			}else if(center == "horizontal") {
				css["left"] = (width - area.width()) / 2;
			}
		}
		area.remove();
		return t.css(css);
	}
});
