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
<binary-functions hide="{hide}">
  <material-card ref="first-color-card">
    <material-input ref="color" placeholder="First color" valid="{colorConverter.rgb.isValid}"></material-input>
  </material-card>
    <material-card ref="second-color-card">
      <material-input ref="color" placeholder="Second color" valid="{colorConverter.rgb.isValid}"></material-input>
    </material-card>
  <material-card ref="function-card">
    <material-input ref="percent" placeholder="Function percent" valid=""></material-input>
    <select ref="function">
      <option value="mix">mix</option>
    </select>
    <material-input ref="result" placeholder="Function result" valid=""></material-input>
  </material-card>
  <script>
    this.on('mount', function () {
      var self = this;
      var firstColorCard = this.refs['first-color-card'];
      var secondColorCard = this.refs['second-color-card'];
      var functionCard = this.refs['function-card'];
      firstColorCard.refs['color'].card = firstColorCard;
      secondColorCard.refs['color'].card = secondColorCard;
      firstColorCard.refs['color'].validate = secondColorCard.refs['color'].validate = function (value) {
        if (!value || value.length == 0) {
          return true;
        }
        this.typeValue = colorConverter.getStringTypeAndValue(value);
        return this.typeValue !== undefined;
      };
      firstColorCard.refs['color'].on('valueChanged', self.onColorChange(firstColorCard, secondColorCard, functionCard));
      secondColorCard.refs['color'].on('valueChanged', self.onColorChange(firstColorCard, secondColorCard, functionCard));
      functionCard.refs['function'].onchange = functionCard.refs['function'].onclick = functionCard.refs['function'].onkeyup = self.onColorChange(firstColorCard, secondColorCard, functionCard);
      functionCard.refs['percent'].on('valueChanged', self.onColorChange(firstColorCard, secondColorCard, functionCard));
    });
    this.onColorChange = function (firstColorCard, secondColorCard, functionCard) {
      return function (value) {
        if ((!this.error && value && value.length > 0) || value instanceof Event) {
          var percent = functionCard.refs['percent'].value;
          var firstTypeValue = firstColorCard.refs['color'].typeValue;
          var secondTypeValue = secondColorCard.refs['color'].typeValue;
          if (this.name === 'color') {
            this.card.root.style.backgroundColor = colorConverter[this.typeValue.type].toString(this.typeValue.value);
          }
          if (firstTypeValue && secondTypeValue && !functionCard.refs['percent'].error && percent.length > 0) {
            var firstColor = firstTypeValue.value;
            var secondColor = secondTypeValue.value;
            if (firstTypeValue.type !== 'rgba') {
              firstColor = colorConverter[firstTypeValue.type].rgba(firstTypeValue.value);
            }
            if (secondTypeValue.type !== 'rgba') {
              secondColor = colorConverter[secondTypeValue.type].rgba(secondTypeValue.value);
            }
            functionCard.refs['result'].value = functionCard.root.style.backgroundColor = colorConverter.rgba.toString(colorFunctions[functionCard.refs['function'].value](firstColor, secondColor, parseFloat(percent)));
            functionCard.refs['result'].update();
          }
        }
      }
    }
  </script>
</binary-functions>