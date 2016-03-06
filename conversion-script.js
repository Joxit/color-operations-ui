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

var cBackgroundChange = function (color) {
  $('.conversion').css('background-color', color);
}

var validElt = function (elt) {
  elt.removeClass('error').addClass('valid');
}

var errorElt = function (elt) {
  elt.removeClass('valid').addClass('error');
}

var onHexChange = function (event) {
  var hexVal = colorConverter.hex.fromString(hexElt.val());
  if (!hexVal) {
    errorElt(hexElt);
    return;
  }
  
  validElt(hexElt);
  rgbElt.val(colorConverter.rgb.toString(colorConverter.hex.rgb(hexVal)));
  hslElt.val(colorConverter.hsl.toString(colorConverter.hex.hsl(hexVal)));
  cBackgroundChange(colorConverter.hex.toString(hexVal));
  onFunctionUpdate(event);
}

var onRgbChange = function (event) {
  var rgbVal = colorConverter.rgb.fromString(rgbElt.val()) || colorConverter.rgba.fromString(rgbElt.val());
  if (!rgbVal) {
    errorElt(rgbElt);
    return;
  }
  
  validElt(rgbElt);
  hexElt.val(colorConverter.hex.toString(colorConverter.rgb.hex(rgbVal)));
  hslElt.val(colorConverter.hsl.toString(colorConverter.rgb.hsl(rgbVal)));
  if (rgbVal.length == 4) {
    cBackgroundChange(colorConverter.rgba.toString(rgbVal));
  } else {
    cBackgroundChange(colorConverter.rgb.toString(rgbVal));
  }
  onFunctionUpdate(event);
}

var onHslChange = function (event) {
  var hslVal = colorConverter.hsl.fromString(hslElt.val());
  if (!hslVal) {
    errorElt(hslElt);
    return;
  }

  validElt(hslElt);
  hexElt.val(colorConverter.hex.toString(colorConverter.hsl.hex(hslVal)));
  rgbElt.val(colorConverter.rgb.toString(colorConverter.hsl.rgb(hslVal)));
  cBackgroundChange(colorConverter.hsl.toString(hslVal));
  onFunctionUpdate(event);
}

hexElt.on('change keyup click', onHexChange).ready(onHexChange);

rgbElt.on('change keyup click', onRgbChange).ready(onRgbChange);

hslElt.on('change keyup click', onHslChange).ready(onHslChange);