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
var percentMixElt = $('#percent-mix');
var colorMix1Elt = $('#color-mix1');
var colorMix2Elt = $('#color-mix2');
var resMixElt = $('#mix_res');

functionScript.eltVal = function (elt, val) {
  if (elt.hasClass('mdl-textfield__input')) {
    var isDirty = elt.parent().hasClass('is-dirty');
    if(val.length == 0 && isDirty) {
      elt.parent().removeClass('is-dirty');
    } else if (val.length != 0 && !isDirty) {
      elt.parent().addClass('is-dirty');
    }
  }
  elt.val(val);
}

functionScript.validElt = function (elt) {
  if (!elt.hasClass('mdl-textfield__input')) {
    elt.removeClass('error').addClass('valid');
  } else if (!elt.parent().hasClass('is-valid')) {
    elt.parent().removeClass('is-invalid').addClass('is-valid');
  }
}

functionScript.errorElt = function (elt) {
  if (!elt.hasClass('mdl-textfield__input')) {
    elt.removeClass('valid').addClass('error');
  } else if (!elt.parent().hasClass('is-invalid')) {
    elt.parent().removeClass('is-valid').addClass('is-invalid');
  }
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
    functionScript.eltVal(resElt, colorString);
    $('.function').css('background-color', colorString);
  }
}

functionScript.onFunctionUpdate = function (event) {
  var percentVal = percentElt.val();
  if (percentVal && percentVal.length > 0) {
    functionScript.percentChange(percentElt.val());
  }
}

functionScript.onColorMixChange = function (elt, classUpdate, callback) {
  return function (event) {
    var rgbVal = colorConverter.rgb.fromString(elt.val()) || colorConverter.rgba.fromString(elt.val());
    var hslVal = colorConverter.hsl.fromString(elt.val());
    var hexVal = colorConverter.hex.fromString(elt.val());

    if (!rgbVal && !hslVal && !hexVal) {
      functionScript.errorElt(elt);
      return;
    }

    var color = colorConverter.rgb.toString(rgbVal) || colorConverter.rgba.toString(rgbVal)
        || colorConverter.hsl.toString(hslVal) || colorConverter.hex.toString(hexVal);

    functionScript.validElt(elt);
    $(classUpdate).css('background-color', color);
    callback(event);
  }
}

functionScript.onMixFunctionUpdate = function (event) {
  var percentVal = percentMixElt.val();
  if (!percentVal || percentVal.length == 0) {
    return;
  }

  var val1 = colorMix1Elt.val();
  var val2 = colorMix2Elt.val();
  var color1 = colorConverter.rgb.convertFromString(val1) || colorConverter.rgba.fromString(val1);
  var color2 = colorConverter.rgb.convertFromString(val2) || colorConverter.rgba.fromString(val2);

  if (!color1 || !color2) {
    return;
  }
  if (color1.length == 3) {
    color1.push(1.0);
  }
  if (color2.length == 3) {
    color2.push(1.0);
  }

  var resColor = colorFunctions.mix(color1, color2, percentVal)
  if (resColor) {
    var colorString = colorConverter.rgba.toString(resColor);
    functionScript.eltVal(resMixElt, colorString);
    $('.function-mix').css('background-color', colorString);
  }

}

percentElt.on('change keyup click', functionScript.onFunctionUpdate).ready(functionScript.onFunctionUpdate);

selectElt.on('change keyup click', functionScript.onFunctionUpdate);

colorElt.on('change keyup click', functionScript.onColorChange).ready(functionScript.onColorChange);

colorMix1Elt.on('change keyup click',
    functionScript.onColorMixChange(colorMix1Elt, '.mix1-color', functionScript.onMixFunctionUpdate)).ready(
    functionScript.onColorMixChange(colorMix1Elt, '.mix1-color', functionScript.onMixFunctionUpdate));

colorMix2Elt.on('change keyup click',
    functionScript.onColorMixChange(colorMix2Elt, '.mix2-color', functionScript.onMixFunctionUpdate)).ready(
    functionScript.onColorMixChange(colorMix2Elt, '.mix2-color', functionScript.onMixFunctionUpdate));

percentMixElt.on('change keyup click', functionScript.onMixFunctionUpdate).ready(functionScript.onMixFunctionUpdate);
