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

var validElt = function (elt) {
  elt.removeClass('error').addClass('valid');
}


var errorElt = function (elt) {
  elt.removeClass('valid').addClass('error');
}

var hexChange = function (hexVal) {
  rgbElt.val(colorConverter.rgb.toString(colorConverter.hex.rgb(hexVal)));
  hslElt.val(colorConverter.hsl.toString(colorConverter.hex.hsl(hexVal)));
  backgroundChange(colorConverter.hex.toString(hexVal));
}

var rgbChange = function (rgbVal) {
  hexElt.val(colorConverter.hex.toString(colorConverter.rgb.hex(rgbVal)));
  hslElt.val(colorConverter.hsl.toString(colorConverter.rgb.hsl(rgbVal)));
  backgroundChange(colorConverter.rgb.toString(rgbVal));
}
var hslChange = function (hslVal) {
  hexElt.val(colorConverter.hex.toString(colorConverter.hsl.hex(hslVal)));
  rgbElt.val(colorConverter.rgb.toString(colorConverter.hsl.rgb(hslVal)));
  backgroundChange(colorConverter.hsl.toString(hslVal));
}
hexElt.change(function (event) {
  var hexVal = colorConverter.hex.fromString(hexElt.val());
  if (hexVal){
    validElt(hexElt);
    hexChange(hexVal);
  }else {
    errorElt(hexElt);
  }
}).keyup(function (event) {
  var hexVal = colorConverter.hex.fromString(hexElt.val());
  if (hexVal){
    validElt(hexElt);
    hexChange(hexVal);
  }else {
    errorElt(hexElt);
  }
});

rgbElt.change(function (event) {
  var rgbVal = colorConverter.rgb.fromString(rgbElt.val());
  if(rgbVal){
    validElt(rgbElt);
    rgbChange(rgbVal);
  }else {
    errorElt(rgbElt);
  }
}).keyup(function (event) {
  var rgbVal = colorConverter.rgb.fromString(rgbElt.val());
  if(rgbVal){
    validElt(rgbElt);
    rgbChange(rgbVal);
  }else {
    errorElt(rgbElt);
  }
});


hslElt.change(function (event) {
  var hslVal = colorConverter.hsl.fromString(hslElt.val());
  if(hslVal){
    validElt(hslElt);
    hslChange(hslVal);
  }else {
    errorElt(hslElt);
  }
}).keyup(function (event) {
  var hslVal = colorConverter.hsl.fromString(hslElt.val());
  if(hslVal){
    validElt(hslElt);
    hslChange(hslVal);
  } else {
    errorElt(hslElt);
  }
});