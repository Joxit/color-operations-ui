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
<app>
  <header>
    <material-navbar>
      <div class="title">Color Operations UI</div>
    </material-navbar>
    <material-tabs useLine="true" tabs="{this.tabs}" tabchanged={this.tabChanged}></material-tabs>
  </header>
  <main>
    <converter></converter>
    <unary-functions></unary-functions>
    <binary-functions></binary-functions>
  </main>
  <footer>
    <material-footer>
      <a class="material-footer-logo" href="https://joxit.github.io/color-operations-ui/">Color Operations UI</a>
      <ul class="material-footer-link-list">
        <li>
          <a href="https://github.com/Joxit/color-operations-ui">Contribute on GitHub</a>
        </li>
        <li>
          <a href="https://github.com/Joxit/color-operations-ui/blob/master/LICENSE">Privacy &amp; Terms</a>
        </li>
      </ul>
    </material-footer>
  </footer>
  <script>
    var self = this;
    this.tabs = [
      {
        title: 'Converter',
        tag: 'converter'
      }, {
        title: 'Unary Functions',
        tag: 'unary-functions'
      }, {
        title: 'Binary Functions',
        tag: 'binary-functions'
      }
    ];
    this.tabChanged = function (tab) {
      self.tabs.forEach(function (e) {
        if (tab.tag === e.tag) {
          self.tags[e.tag].update({hide: false});
        } else {
          self.tags[e.tag].update({hide: true});
        }
      });
    };
    this.on('mount', function () {
      this.tabChanged({tag: 'converter'})
    });
  </script>
</app>