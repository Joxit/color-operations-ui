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
var colorConverter = {
  hexToRgb: function (hexColor) {
    var regex1 = /^#*([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
    var regex2 = /^#*([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
    if (hexColor.match(regex1)) {
      var matches = regex1.exec(hexColor);
      return [ parseInt(matches[1] + matches[1], 16), parseInt(matches[2] + matches[2], 16), parseInt(matches[3] + matches[3], 16), 1 ];
    }
    if (hexColor.match(regex2)) {
      var matches = regex2.exec(hexColor);
      return [ parseInt(matches[1], 16), parseInt(matches[2], 16), parseInt(matches[3], 16), 1 ];
    }
  },
  hexToRgba: function (hexColor) {
    var rgb = this.hexToRgb(hexColor);
    return [ rgb[0], rgb[1], rgb[2], 1 ];
  },
  rgbToHex: function (rgbColor) {
    var r = Number(rgbColor[0]).toString(16);
    var g = Number(rgbColor[1]).toString(16);
    var b = Number(rgbColor[2]).toString(16);
    return (r.length === 1 ? "0" : "") + r + (g.length === 1 ? "0" : "") + g + (b.length === 1 ? "0" : "") + b;
  },
  rgbaToHex: function (rgbaColor) {
    return this.rgbToHex(rgbaColor);
  }
};

module.exports = colorConverter;