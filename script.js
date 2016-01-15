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
var hexElt = $('#hex');
var rgbElt = $('#rgb');
var hslElt = $('#hsl');


var backgroundChange = function (color){
  $('body').css('background-color', color);
}

var hexChange = function () {
  var hexVal = hexElt.val();
  var rgbVal = colorConverter.hexToRgb(hexVal);
  rgbElt.val('rgb(' + rgbVal[0] + ', ' + rgbVal[1] + ', ' + rgbVal[2] + ')');
  backgroundChange(colorConverter.rgbToString(rgbVal));
}

var rgbChange = function () {
  var rgbVal = colorConverter.stringToRgb(rgbElt.val());
  var hexVal = '#' + colorConverter.rgbToHex(rgbVal);
  hexElt.val(hexVal);
  backgroundChange(colorConverter.rgbToString(rgbVal));
}

hexElt.change(function (event) {
  hexChange();
}).keyup(function (event) {
  hexChange();
});

rgbElt.change(function (event) {
  rgbChange();
}).keyup(function (event) {
  rgbChange();
});
