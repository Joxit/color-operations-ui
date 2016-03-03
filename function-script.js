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
  $('.function').css('background-color', color);
}

var validElt = function (elt) {
  elt.removeClass('error').addClass('valid');
}

var errorElt = function (elt) {
  elt.removeClass('valid').addClass('error');
}

var percentChange = function (percentVal) {
  var color = colorConverter.rgb.fromString(rgbElt.val()).push(1.0);
  
  colorFunctions.lighten(color, 0.5)
}

selectElt.change(function (event) {
  var percentVal = percentElt.val();
  if(percentVal && percentVal.length > 0) {
    percentChange(percentElt.val());
  }
});
