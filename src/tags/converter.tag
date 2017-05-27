<!--
 Copyright (C) 2016-2017  Jones Magloire @Joxit

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 -->
<converter hide="{hide}">
  <material-card>
    <material-input ref="hex" placeholder="Hexadecimal" valid="{colorConverter.hex.isValid}"></material-input>
    <material-input ref="rgb" placeholder="Red Green Blue" valid="{colorConverter.rgb.isValid}"></material-input>
    <material-input ref="hsl" placeholder="Hue Saturation Light" valid="{colorConverter.hsl.isValid}"></material-input>
  </material-card>
  <script>
    this.on('mount', function () {
      var self = this;
      var card = this.tags['material-card'];
      card.refs.hex.validate = function (value) {
        if (!value || value.length == 0) {
          return true;
        }
        return colorConverter.hex.isValid(value)
      };
      card.refs.rgb.validate = function (value) {
        if (!value || value.length == 0) {
          return true;
        }
        return colorConverter.rgb.isValid(value)
      };
      card.refs.hsl.validate = function (value) {
        if (!value || value.length == 0) {
          return true;
        }
        return colorConverter.hsl.isValid(value)
      };
      card.refs.hex.on("valueChanged", self.onInputChange(card, 'hex'));
      card.refs.rgb.on("valueChanged", self.onInputChange(card, 'rgb'));
      card.refs.hsl.on("valueChanged", self.onInputChange(card, 'hsl'));
    });

    this.onInputChange = function (card, type) {
      var f = {
        hex: {
          'a': 'rgb',
          'b': 'hsl',
          fromString: colorConverter.hex.fromString
        },
        rgb: {
          'a': 'hex',
          'b': 'hsl',
          fromString: function (value) {
            return colorConverter.rgb.fromString(value) || colorConverter.rgba.fromString(value);
          }
        },
        hsl: {
          'a': 'hex',
          'b': 'rgb',
          fromString: colorConverter.hsl.fromString
        }
      }
      return function (value) {
        if (!this.error && value && value.length > 0) {
          var val = f[type].fromString(value);
          ['a', 'b'].forEach(function (i) {
            card.refs[f[type][i]].value = colorConverter[f[type][i]].toString(colorConverter[type][f[type][i]](val));
            card.refs[f[type][i]].update();
            card.refs[f[type][i]].isValid(true);
          });
          card.root.style.backgroundColor = colorConverter[type].toString(val);
        }
      };
    };
  </script>
</converter>