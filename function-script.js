/*
 * Copyright (C) 2016  Jones Magloire @Joxit
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var percentElt = $('#percent');
var selectElt = $('#function_selected');
var resElt = $('#fonction_res');


var fBackgroundChange = function (color){
console.log(color)
  $('.function').css('background-color', color);
}

var validElt = function (elt) {
  elt.removeClass('error').addClass('valid');
}

var errorElt = function (elt) {
  elt.removeClass('valid').addClass('error');
}

var percentChange = function (percentVal) {
  var color = colorConverter.rgb.fromString(rgbElt.val()) || colorConverter.rgba.fromString(rgbElt.val());
  if (!color) {
    return;
  } else if (color.length == 3) {
    color.push(1.0);
  }
  var resColor = null;
  switch (selectElt.val()) {
    case "saturate":
      resColor = colorFunctions.saturate(color, percentVal)
      break;
    case "desaturate":
      resColor = colorFunctions.saturate(color, -percentVal)
      break;
    case "lighten":
      resColor = colorFunctions.lighten(color, percentVal)
      break;
    case "darken":
      resColor = colorFunctions.lighten(color, -percentVal)
      break;
    case "fadein":
      resColor = colorFunctions.fade(color, percentVal)
      break;
    case "fadeout":
      resColor = colorFunctions.fade(color, -percentVal)
      break;
    case "spin":
      resColor = colorFunctions.spin(color, percentVal)
      break;
  }
  if(resColor) {
    var colorString = colorConverter.rgba.toString(resColor);
    resElt.val(colorString);
    fBackgroundChange(colorString);
  }
}

selectElt.change(function (event) {
  var percentVal = percentElt.val();
  if(percentVal && percentVal.length > 0) {
    percentChange(percentElt.val());
  }
});
