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
<unary-functions hide="{hide}">
  <material-card ref="color-card">
    <material-input ref="color" placeholder="Function color" valid="{colorConverter.isValid}"></material-input>
  </material-card>
  <material-card ref="function-card">
    <material-input ref="percent" placeholder="Function percent" valid="/^[0-9]+(\.[0-9]+)?%?$|^$/"></material-input>
    <select ref="function">
      <option value="saturate">saturate</option>
      <option value="desaturate">desaturate</option>
      <option value="lighten">lighten</option>
      <option value="darken">darken</option>
      <option value="fade">fadein</option>
      <option value="fadeout">fadeout</option>
      <option value="spin">spin</option>
    </select>
    <material-input ref="result" placeholder="Function result" valid="" disabled="true"></material-input>
  </material-card>
  <script>
    [
      {
        f: 'desaturate',
        n: 'saturate'
      }, {
        f: 'darken',
        n: 'lighten'
      }, {
        f: 'fadeout',
        n: 'fade'
      }
    ].forEach(function (e) {
      colorFunctions[e.f] = function (c, p) {
        return colorFunctions[e.n](c, -p);
      }
    });
    this.on('mount', function () {
      var self = this;
      var colorCard = this.refs['color-card'];
      var functionCard = this.refs['function-card'];
      colorCard.refs['color'].validate = function (value) {
        if (!value || value.length == 0) {
          return true;
        }
        this.typeValue = colorConverter.getStringTypeAndValue(value);
        return this.typeValue !== undefined;
      };
      colorCard.refs['color'].on('valueChanged', self.onColorChange(colorCard, functionCard));
      functionCard.refs['function'].onchange = functionCard.refs['function'].onclick = functionCard.refs['function'].onkeyup = self.onColorChange(colorCard, functionCard);
      functionCard.refs['percent'].on('valueChanged', self.onColorChange(colorCard, functionCard));
    });
    this.onColorChange = function (colorCard, functionCard) {
      return function (value) {
        if ((!this.error && value && value.length > 0) || value instanceof Event) {
          var percent = functionCard.refs['percent'].value;
          var typeValue = colorCard.refs['color'].typeValue;
          if (this.name === 'color') {
            colorCard.root.style.backgroundColor = colorConverter[typeValue.type].toString(typeValue.value);
          }
          if (typeValue && !functionCard.refs['percent'].error && percent.length > 0) {
            var color = typeValue.value;
            if (typeValue.type !== 'rgba') {
              color = colorConverter[typeValue.type].rgba(typeValue.value);
            }
            console.log(functionCard.root.style.backgroundColor, colorFunctions[functionCard.refs['function'].value](color, parseFloat(percent)))
            functionCard.refs['result'].value = functionCard.root.style.backgroundColor = colorConverter.rgba.toString(colorFunctions[functionCard.refs['function'].value](color, parseFloat(percent)));
            functionCard.refs['result'].update();
          }
        }
      }
    }
  </script>
</unary-functions>