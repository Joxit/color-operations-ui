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

var hexChange = function (hexVal) {
  var rgbVal = colorConverter.hex.rgb(hexVal);
  if(!rgbVal) {
    return;
  }
  rgbElt.val('rgb(' + rgbVal[0] + ', ' + rgbVal[1] + ', ' + rgbVal[2] + ')');
  backgroundChange(colorConverter.rgb.toString(rgbVal));
}

var rgbChange = function (rgbVal) {
  var hexVal = '#' + colorConverter.rgb.hex(rgbVal);
  if (!rgbVal){
    return;
  }
  hexElt.val(hexVal);
  backgroundChange(colorConverter.rgb.toString(rgbVal));
}

hexElt.change(function (event) {
  var hexVal = colorConverter.hex.fromString(hexElt.val());
  if (hexVal){
    hexChange(hexVal);
  }
}).keyup(function (event) {
  var hexVal = colorConverter.hex.fromString(hexElt.val());
  if (hexVal){
    hexChange(hexVal);
  }
});

rgbElt.change(function (event) {
  var rgbVal = colorConverter.rgb.fromString(rgbElt.val());
  if(rgbVal){
    rgbChange(rgbVal);
  }
}).keyup(function (event) {
  var rgbVal = colorConverter.rgb.fromString(rgbElt.val());
  if(rgbVal){
    rgbChange(rgbVal);
  }
});
