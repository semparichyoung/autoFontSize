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
		// 	center:			does it need to put to location(by left and top)
		// 		default:	false
		//
		var t = this;
		var opt = opt || {};
		var area = $("body").append("<div id='autoFontArea' style='display:none'></div>")
			.children("#autoFontArea");
		var css = {};

		var width = t.width();
		var height = t.height();
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

			if(area.width() > width && font > minF && font - minF > limit) {
				max = font;
				return testFontSize(min + (font - min) / 2);
			}

			area.css({
				height: "auto",
				width: "100%",
				"font-size": font
			});
			if(area.height() > height && font > min && font - min > limit) {
				maxF = font;
				return testFontSize(min + (font - min) / 2);
			}else {
				return max;
			}
		}
		if(center) {
			area.css({
				width: "auto",
				height: "auto",
				"font-size": css["font-size"]
			});
			css["left"] = (width - area.width()) / 2;
			css["top"] = Math.max(0, (height - area.height()) / 2);
		}
		console.log(css);
		return css;
	}
});