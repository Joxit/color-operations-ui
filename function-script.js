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
var functionScript = {};
var percentElt = $('#percent');
var selectElt = $('#function_selected');
var resElt = $('#fonction_res');
var colorElt = $('#color');

functionScript.validElt = function (elt) {
  elt.removeClass('error').addClass('valid');
}

functionScript.errorElt = function (elt) {
  elt.removeClass('valid').addClass('error');
}

functionScript.onColorChange = function (event) {
  var rgbVal = colorConverter.rgb.fromString(colorElt.val()) || colorConverter.rgba.fromString(colorElt.val());
  var hslVal = colorConverter.hsl.fromString(colorElt.val());
  var hexVal = colorConverter.hex.fromString(colorElt.val());

  if (!rgbVal && !hslVal && !hexVal) {
    functionScript.errorElt(colorElt);
    return;
  }

  var color = colorConverter.rgb.toString(rgbVal) || colorConverter.rgba.toString(rgbVal)
      || colorConverter.hsl.toString(hslVal) || colorConverter.hex.toString(hexVal);

  functionScript.validElt(colorElt);
  $('.function-color').css('background-color', color);
  functionScript.onFunctionUpdate(event);
}

functionScript.percentChange = function (percentVal) {
  var val = colorElt.val() || rgbElt.val();
  var color = colorConverter.rgb.convertFromString(val) || colorConverter.rgba.fromString(val);
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
  if (resColor) {
    var colorString = colorConverter.rgba.toString(resColor);
    resElt.val(colorString);
    $('.function').css('background-color', colorString);
  }
}

functionScript.onFunctionUpdate = function (event) {
  var percentVal = percentElt.val();
  if (percentVal && percentVal.length > 0) {
    functionScript.percentChange(percentElt.val());
  }
}

percentElt.on('change keyup click', functionScript.onFunctionUpdate).ready(functionScript.onFunctionUpdate);

selectElt.on('change keyup click', functionScript.onFunctionUpdate);

colorElt.on('change keyup click', functionScript.onColorChange).ready(functionScript.onColorChange);
