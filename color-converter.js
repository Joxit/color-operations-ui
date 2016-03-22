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
    if (hexColor && hexColor.match(regex1) != null) {
      return [ (hexColor >> 8) + (hexColor >> 8) * 16, ((hexColor & 0x0F0) >> 4) + ((hexColor & 0x0F0) >> 4) * 16,
          (hexColor & 0x00F) + (hexColor & 0x00F) * 16 ];
    } else if (hexColor && hexColor.match(regex2) != null) {
      return [ hexColor >> 16, (hexColor & 0x00FF00) >> 8, hexColor & 0x0000FF ];
    }
  },
  rgba: function (hexColor) {
    var rgba = this.rgb(hexColor);
    return [ rgba[0], rgba[1], rgba[2], 1 ];
  },
  hsl: function (hexColor) {
    var rgb = this.rgb(hexColor);
    return colorConverter.rgb.hsl(rgb);
  },
  fromString: function (hex) {
    if (!hex) {
      console.log('Undefined hex');
    }
    hex = hex.replace(/^#*/, '0x');
    if (hex <= 0xFFFFFF && (hex.length == 5 || hex.length == 8)) {
      return hex;
    }
  },
  toString: function (hex) {
    if (hex) {
      return hex.replace(/^(0x)?/i, '#');
    }
    console.log('Undefined hex');
  }
};
var rgb = {
  hex: function (rgbColor) {
    if (!rgbColor) {
      console.log('Undefined rgb');
      return;
    }
    var r = Number(rgbColor[0]).toString(16);
    var g = Number(rgbColor[1]).toString(16);
    var b = Number(rgbColor[2]).toString(16);
    return (r.length === 1 ? "0" : "") + r + (g.length === 1 ? "0" : "") + g + (b.length === 1 ? "0" : "") + b;
  },
  hsl: function (rgb) {
    if (!rgb || !Array.isArray(rgb) || rgb.length != 3) {
      console.log('Undefined rgb');
      return;
    }
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
    if (!rgb) {
      console.log('Undefined rgb');
      return;
    }
    var match;
    rgb = rgb.replace(/ /g, "");
    if (((match = rgb.match(/^rgb\(([0-9]+),([0-9]+),([0-9]+)\)$/i)) != null)
        || ((match = rgb.match(/^\[?([0-9]+),([0-9]+),([0-9]+)\]?$/)) != null)) {
      if (match[1] <= 255 && match[2] <= 255 && match[3] <= 255) {
        return [ match[1], match[2], match[3] ];
      }
    }
  },
  toString: function (rgb) {
    if (rgb && Array.isArray(rgb) && rgb.length == 3) {
      return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
    }
    console.log('Undefined rgb');
  },
  convertFromString: function (color) {
    return colorConverter.hex.rgb(colorConverter.hex.fromString(color))
        || colorConverter.hsl.rgb(colorConverter.hsl.fromString(color)) || colorConverter.rgb.fromString(color);
  }
};
var rgba = {
  hex: function (rgbaColor) {
    if (rgbaColor) {
      return colorConverter.rgb.hex(rgbaColor);
    }
    console.log('Undefined rgba');
  },
  fromString: function (rgba) {
    if (!rgba) {
      console.log('Undefined rgba');
      return;
    }
    var match;
    rgba = rgba.replace(/ /g, "");
    if ((match = rgba.match(/^rgba\(([0-9]+),([0-9]+),([0-9]+),([0-9.]+)\)$/i)) != null
        || (match = rgba.match(/^\[?([0-9]+),([0-9]+),([0-9]+),([0-9.]+)\]?$/)) != null) {
      return [ parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), parseInt(match[4]) ];
    }
  },
  toString: function (rgb) {
    if (rgb && Array.isArray(rgb) && rgb.length >= 4) {
      return 'rgba(' + Math.round(rgb[0]) + ',' + Math.round(rgb[1]) + ',' + Math.round(rgb[2]) + ',' + rgb[3] + ')';
    }
    console.log('Undefined rgba');
  }
};
var hsl = {
  hex: function (hsl) {
    var rgb;
    if (hsl && (rgb = colorConverter.hsl.rgb(hsl))) {
      return colorConverter.rgb.hex(rgb);
    }
    console.log('Undefined hsl');
  },
  rgb: function (hsl) {
    if (!hsl) {
      console.log('Undefined hsl');
      return;
    }
    var H = hsl[0], S = hsl[1], L = hsl[2];
    var C = (1 - Math.abs(2 * L - 1)) * S;
    var X = C * (1 - Math.abs((H / 60) % 2 - 1));
    var m = L - C / 2;
    var rgb;
    if (H < 60) {
      rgb = [ C + m, X + m, m ];
    } else if (H < 120) {
      rgb = [ X + m, C + m, m ];
    } else if (H < 180) {
      rgb = [ m, C + m, X + m ];
    } else if (H < 240) {
      rgb = [ m, X + m, C + m ];
    } else if (H < 300) {
      rgb = [ X + m, m, C + m ];
    } else if (H < 360) {
      rgb = [ C + m, m, X + m ];
    }
    if (rgb) {
      return [ Math.round(rgb[0] * 255), Math.round(rgb[1] * 255), Math.round(rgb[2] * 255) ];
    }
  },
  fromString: function (hsl) {
    if (!hsl) {
      console.log('Undefined hsl');
      return;
    }
    var match;
    hsl = hsl.replace(/ /g, "");
    if (((match = hsl.match(/^hsl\(([0-9.]+),([0-9.]+)(%?),([0-9.]+)(%?)\)$/i)) != null)
        || ((match = hsl.match(/^\[?([0-9.]+),([0-9.]+)(%?),([0-9.]+)(%?)\]?$/)) != null)) {
      var hsl = [ match[1], match[3] == '%' ? match[2] / 100 : match[2], match[5] == '%' ? match[4] / 100 : match[4] ];
      if (hsl[0] <= 360 && hsl[1] <= 1 && hsl[2] <= 1) {
        return hsl;
      }
    }
  },
  toString: function (hsl) {
    if (hsl && Array.isArray(hsl) && hsl.length == 3) {
      return 'hsl(' + (hsl[0] * 1).toFixed(2) + ', ' + (hsl[1] * 100).toFixed(2) + '%, ' + (hsl[2] * 100).toFixed(2)
          + '%)';
    }
    console.log('Undefined hsl');
  }

};
var colorConverter = {
  hex: hex,
  rgb: rgb,
  rgba: rgba,
  hsl: hsl
};

module.exports = colorConverter;
