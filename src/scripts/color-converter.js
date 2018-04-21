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
const colorConverter = {};
colorConverter.hex = {
  rgb: function(hexColor) {
    var regex1 = /^0x([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/i;
    var regex2 = /^0x([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/i;
    if (hexColor && hexColor.match(regex1) != null) {
      return [(hexColor >> 8) + (hexColor >> 8) * 16, ((hexColor & 0x0F0) >> 4) + ((hexColor & 0x0F0) >> 4) * 16,
        (hexColor & 0x00F) + (hexColor & 0x00F) * 16
      ];
    } else if (hexColor && hexColor.match(regex2) != null) {
      return [hexColor >> 16, (hexColor & 0x00FF00) >> 8, hexColor & 0x0000FF];
    }
  },
  rgba: function(hexColor) {
    var rgba = this.rgb(hexColor);
    return rgba ? [rgba[0], rgba[1], rgba[2], 1] : null;
  },
  hsl: function(hexColor) {
    var rgb = this.rgb(hexColor);
    return rgb ? colorConverter.rgb.hsl(rgb) : null;
  },
  hsla: function(hexColor) {
    var hsl = this.hsl(hexColor);
    return hsl ? [hsl[0], hsl[1], hsl[2], 1] : true;
  },
  fromString: function(hex) {
    if (!hex) {
      return;
    }
    hex = hex.replace(/^#*/, '0x');
    if (hex <= 0xFFFFFF && (hex.length == 5 || hex.length == 8)) {
      return hex;
    }
  },
  toString: function(hex) {
    if (hex) {
      return hex.replace(/^(0x)?/i, '#');
    }
  },
  isValid: function(hex) {
    return this.fromString(hex) != undefined;
  }
};

colorConverter.rgb = {
  hex: function(rgb) {
    if (!rgb) {
      return;
    }
    var r = Number(rgb[0]).toString(16);
    var g = Number(rgb[1]).toString(16);
    var b = Number(rgb[2]).toString(16);
    return (r.length === 1 ? "0" : "") + r + (g.length === 1 ? "0" : "") + g + (b.length === 1 ? "0" : "") + b;
  },
  rgba: function(rgb) {
    return rgb ? [rgb[0], rgb[1], rgb[2], 1] : null;
  },
  hsl: function(rgb) {
    if (!rgb || !Array.isArray(rgb) || rgb.length < 3) {
      return;
    }
    var R = rgb[0] / 255,
      G = rgb[1] / 255,
      B = rgb[2] / 255;
    var M = Math.max(R, G, B);
    var m = Math.min(R, G, B);
    var C = M - m;
    var H = 0;
    switch (M) {
      case m:
        {
          H = 0;
          break;
        }
      case R:
        {
          H = ((G - B) / C) + (G < B ? 6 : 0);
          break;
        }
      case G:
        {
          H = ((B - R) / C) + 2;
          break;
        }
      case B:
        {
          H = ((R - G) / C) + 4;
          break;
        }
    }
    var L = (1 / 2) * (M + m);
    var S = C == 0 ? 0 : C / (1 - Math.abs(2 * L - 1));
    return [60 * H, S, L];
  },
  hsla: function(rgb) {
    var hsl = this.hsl(rgb);
    return hsl ? [hsl[0], hsl[1], hsl[2], 1] : null;
  },
  fromString: function(rgb) {
    if (!rgb) {
      return;
    }
    var match;
    rgb = rgb.replace(/ /g, "");
    if (((match = rgb.match(/^rgb\(([0-9]+),([0-9]+),([0-9]+)\)$/i)) != null) ||
      ((match = rgb.match(/^\[?([0-9]+),([0-9]+),([0-9]+)\]?$/)) != null)) {
      if (match[1] <= 255 && match[2] <= 255 && match[3] <= 255) {
        return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
      }
    }
  },
  toString: function(rgb) {
    if (rgb && Array.isArray(rgb) && rgb.length == 3) {
      return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
    }
  },
  convertFromString: function(color) {
    return colorConverter.hex.rgb(colorConverter.hex.fromString(color)) ||
      colorConverter.hsl.rgb(colorConverter.hsl.fromString(color)) || colorConverter.rgb.fromString(color);
  },
  isValid: function(hex) {
    return this.fromString(hex) != undefined;
  }
};

colorConverter.rgba = {
  hex: function(rgbaColor) {
    return rgbaColor ? colorConverter.rgb.hex(rgbaColor) : null;
  },
  rgb: function(rgbaColor) {
    return rgbaColor ? [rgbaColor[0], rgbaColor[1], rgbaColor[2]] : null;
  },
  hsl: function(rgbaColor) {
    return colorConverter.rgb.hsl(rgbaColor);
  },
  hsla: function(rgbaColor) {
    var hsl = colorConverter.rgb.hsl(rgbaColor);
    return hsl ? [hsl[0], hsl[1], hsl[2], rgbaColor[3]] : null;
  },
  fromString: function(rgba) {
    if (!rgba) {
      return;
    }
    var match;
    rgba = rgba.replace(/ /g, "");
    if ((match = rgba.match(/^rgba\(([0-9]+),([0-9]+),([0-9]+),([0-9.]+)\)$/i)) != null ||
      (match = rgba.match(/^\[?([0-9]+),([0-9]+),([0-9]+),([0-9.]+)\]?$/)) != null) {
      return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), parseInt(match[4])];
    }
  },
  toString: function(rgb) {
    if (rgb && Array.isArray(rgb) && rgb.length >= 4) {
      return 'rgba(' + Math.round(rgb[0]) + ',' + Math.round(rgb[1]) + ',' + Math.round(rgb[2]) + ',' + rgb[3] + ')';
    }
  },
  isValid: function(hex) {
    return this.fromString(hex) != undefined;
  }
};

colorConverter.hsl = {
  hex: function(hsl) {
    var rgb = colorConverter.hsl.rgb(hsl);
    return rgb ? colorConverter.rgb.hex(rgb) : null;
  },
  rgb: function(hsl) {
    if (!hsl) {
      return;
    }
    var H = hsl[0],
      S = hsl[1],
      L = hsl[2];
    var C = (1 - Math.abs(2 * L - 1)) * S;
    var X = C * (1 - Math.abs((H / 60) % 2 - 1));
    var m = L - C / 2;
    var rgb;
    if (H < 60) {
      rgb = [C + m, X + m, m];
    } else if (H < 120) {
      rgb = [X + m, C + m, m];
    } else if (H < 180) {
      rgb = [m, C + m, X + m];
    } else if (H < 240) {
      rgb = [m, X + m, C + m];
    } else if (H < 300) {
      rgb = [X + m, m, C + m];
    } else if (H < 360) {
      rgb = [C + m, m, X + m];
    }
    if (rgb) {
      return [Math.round(rgb[0] * 255), Math.round(rgb[1] * 255), Math.round(rgb[2] * 255)];
    }
  },
  rgba: function(hsl) {
    var rgba = this.rgb(hsl);
    return rgba ? [rgba[0], rgba[1], rgba[2], 1] : null;
  },
  hsla: function(hsl) {
    return hsl ? [hsl[0], hsl[1], hsl[2], 1] : null;
  },
  fromString: function(hslString) {
    if (hslString) {
      var match;
      hslString = hslString.replace(/ /g, "");
      if (((match = hslString.match(/^hsl\(([0-9.]+),([0-9.]+)(%?),([0-9.]+)(%?)\)$/i)) != null) ||
        ((match = hslString.match(/^\[?([0-9.]+),([0-9.]+)(%?),([0-9.]+)(%?)\]?$/)) != null)) {
        var hsl = [parseFloat(match[1]), match[3] == '%' ? match[2] / 100 : parseFloat(match[2]), match[5] == '%' ? match[4] / 100 : parseFloat(match[4])];
        if (hsl[0] < 360 && hsl[1] <= 1 && hsl[2] <= 1) {
          return hsl;
        }
      }
    }
  },
  toString: function(hsl) {
    if (hsl && Array.isArray(hsl) && hsl.length == 3) {
      return 'hsl(' + (hsl[0] * 1).toFixed(2) + ', ' + (hsl[1] * 100).toFixed(2) + '%, ' + (hsl[2] * 100).toFixed(2) +
        '%)';
    }
  },
  isValid: function(hex) {
    return this.fromString(hex) != undefined;
  }
};

colorConverter.hsla = {
  hex: function(hsla) {
    return colorConverter.hsl.hex(hsla);
  },
  rgb: function(hsla) {
    return colorConverter.hsl.rgb(hsla)
  },
  rgba: function(hsla) {
    var rgba = this.rgb(hsla);
    return rgba ? [rgba[0], rgba[1], rgba[2], hsla[3]] : null;
  },
  hsl: function(hsla) {
    return hsla ? [hsla[0], hsla[1], hsla[2]] : null;
  },
  fromString: function(hsla) {
    if (hsla) {
      var match;
      hsla = hsla.replace(/ /g, "");
      if (((match = hsla.match(/^hsla\(([0-9.]+),([0-9.]+)(%?),([0-9.]+)(%?),([0-9.]+)\)$/i)) != null) ||
        ((match = hsla.match(/^\[?([0-9.]+),([0-9.]+)(%?),([0-9.]+)(%?),([0-9.]+)\]?$/)) != null)) {
        var hsla = [parseFloat(match[1]), match[3] == '%' ? match[2] / 100 : parseFloat(match[2]), match[5] == '%' ? match[4] / 100 : parseFloat(match[4]), parseFloat(match[6])];
        if (hsla[0] < 360 && hsla[1] <= 1 && hsla[2] <= 1) {
          return hsla;
        }
      }
    }
  },
  toString: function(hsla) {
    if (hsla && Array.isArray(hsla) && hsla.length == 4) {
      return 'hsla(' + (hsla[0] * 1).toFixed(2) + ', ' + (hsla[1] * 100).toFixed(2) + '%, ' + (hsla[2] * 100).toFixed(2) +
        '%,' + hsla[3] + ')';
    }
  },
  isValid: function(hsla) {
    return this.fromString(hsla) != undefined;
  }
};

colorConverter.isValid = function(value) {
  return colorConverter.hex.isValid(value) || colorConverter.rgb.isValid(value) || colorConverter.rgba.isValid(value) || colorConverter.hsl.isValid(value) || colorConverter.hsla.isValid(value);
};

colorConverter.getStringTypeAndValue = function(value) {
  var hex = colorConverter.hex.fromString(value);
  var rgb = colorConverter.rgb.fromString(value);
  var rgba = colorConverter.rgba.fromString(value);
  var hsl = colorConverter.hsl.fromString(value);
  var hsla = colorConverter.hsla.fromString(value);
  if (hex) {
    return { value: hex, type: 'hex' };
  } else if (rgb) {
    return { value: rgb, type: 'rgb' };
  } else if (rgba) {
    return { value: rgba, type: 'rgba' };
  } else if (hsl) {
    return { value: hsl, type: 'hsl' };
  } else if (hsla) {
    return { value: hsla, type: 'hsla' };
  }
};

if (typeof module !== 'undefined') {
  module.exports = colorConverter;
}
if (typeof window !== 'undefined') {
  window.colorConverter = colorConverter;
}