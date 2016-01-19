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
var hex = {
  rgb: function (hexColor) {
    var regex1 = /^0x([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/i;
    var regex2 = /^0x([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/i;
    var matches;
    if ((matches = hexColor.match(regex1)) != null) {
      return [ parseInt(matches[1] + matches[1], 16), parseInt(matches[2] + matches[2], 16), parseInt(matches[3] + matches[3], 16), 1 ];
    } else if ((matches = hexColor.match(regex2)) != null) {
      return [ parseInt(matches[1], 16), parseInt(matches[2], 16), parseInt(matches[3], 16) ];
    }
  },
  rgba: function (hexColor) {
    var rgba = this.rgb(hexColor);
    return [ rgba[0], rgba[1], rgba[2], 1 ];
  },
  fromString: function (hex) {
    hex = hex.replace(/^#*/, '0x');
    if (hex <= 0xFFFFFF) {
      return hex;
    }
  },
  toString: function (hex) {
    return hex.replace(/^0x/i, '#');
  }
};
var rgb = {
  hex: function (rgbColor) {
    var r = Number(rgbColor[0]).toString(16);
    var g = Number(rgbColor[1]).toString(16);
    var b = Number(rgbColor[2]).toString(16);
    return (r.length === 1 ? "0" : "") + r + (g.length === 1 ? "0" : "") + g + (b.length === 1 ? "0" : "") + b;
  },
  hsl: function (rgb) {
    var R = rgb[0] / 255, G = rgb[1] / 255, B = rgb[2] / 255;
    var M = Math.max(R, G, B);
    var m = Math.min(R, G, B);
    var C = M - m;
    var H = 0;
    switch (M) {
      case m: {
        H = 0;
        break;
      }
      case R: {
        H = ((G - B) / C) + (G < B ? 6 : 0);
        break;
      }
      case G: {
        H = ((B - R) / C) + 2;
        break;
      }
      case B: {
        H = ((R - G) / C) + 4;
        break;
      }
    }
    var L = (1 / 2) * (M + m);
    var S = C == 0 ? 0 : C / (1 - Math.abs(2 * L - 1));
    return [ 60 * H, S, L ];
  },
  fromString: function (rgb) {
    var match;
    rgb = rgb.replace(/ /g, "");
    if ((match = rgb.match(/^rgb\(([0-9]+),([0-9]+),([0-9]+)\)$/i)) != null) {
      return [ match[1], match[2], match[3] ];
    } else if ((match = rgb.match(/^\[?([0-9]+),([0-9]+),([0-9]+)\]?$/)) != null) {
      return [ match[1], match[2], match[3] ];
    }
  },
  toString: function (rgb) {
    return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
  }
};
var rgba = {
  hex: function (rgbaColor) {
    return colorConverter.rgb.hex(rgbaColor);
  },
  fromString: function (rgba) {
    var match;
    rgba = rgba.replace(/ /g, "");
    if ((match = rgb.match(/^rgba\(([0-9]+),([0-9]+),([0-9]+),([0-9]+)\)$/i)) != null) {
      return [ match[1], match[2], match[3], match[4] ];
    } else if ((match = rgb.match(/^\[?([0-9]+),([0-9]+),([0-9]+),([0-9]+)\]?$/)) != null) {
      return [ match[1], match[2], match[3], match[4] ];
    }
  },
  toString: function (rgb) {
    return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + rgb[3] + ')';
  }
};
var hsl = {
  rgb: function (hsl) {
  }
};
var colorConverter = {
  hex: hex,
  rgb: rgb,
  rgba: rgba
};

module.exports = colorConverter;