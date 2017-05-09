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
  <material-card>
    <material-input ref="c1" placeholder="First color" valid=""></material-input>
    <material-input ref="c2" placeholder="Second color" valid=""></material-input>
  </material-card>
  <material-card>
    <material-input ref="percent" placeholder="Function percent" valid=""></material-input>
    <material-combo>
      <option value="mix">mix</option>
    </material-combo>
    <material-input ref="result" placeholder="Function result" valid=""></material-input>
  </material-card>
  <script>
    this.on('mount', function () {});
  </script>
</binary-functions>