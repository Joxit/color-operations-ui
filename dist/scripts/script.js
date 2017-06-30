/*!
 * color-operation-ui
 * Copyright (C) 2016-2017  Jones Magloire @Joxit
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
var hex={rgb:function(r){var n=/^0x([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/i,o=/^0x([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/i;return r&&null!=r.match(n)?[(r>>8)+16*(r>>8),((240&r)>>4)+16*((240&r)>>4),(15&r)+16*(15&r)]:r&&null!=r.match(o)?[r>>16,(65280&r)>>8,255&r]:void 0},rgba:function(r){var n=this.rgb(r);return[n[0],n[1],n[2],1]},hsl:function(r){var n=this.rgb(r);return colorConverter.rgb.hsl(n)},fromString:function(r){if(r||console.log("Undefined hex"),r=r.replace(/^#*/,"0x"),r<=16777215&&(5==r.length||8==r.length))return r},toString:function(r){return r?r.replace(/^(0x)?/i,"#"):void console.log("Undefined hex")},isValid:function(r){return void 0!=this.fromString(r)}},rgb={hex:function(r){if(!r)return void console.log("Undefined rgb");var n=Number(r[0]).toString(16),o=Number(r[1]).toString(16),e=Number(r[2]).toString(16);return(1===n.length?"0":"")+n+(1===o.length?"0":"")+o+(1===e.length?"0":"")+e},rgba:function(r){return[r[0],r[1],r[2],1]},hsl:function(r){if(!r||!Array.isArray(r)||3!=r.length)return void console.log("Undefined rgb");var n=r[0]/255,o=r[1]/255,e=r[2]/255,t=Math.max(n,o,e),i=Math.min(n,o,e),l=t-i,a=0;switch(t){case i:a=0;break;case n:a=(o-e)/l+(o<e?6:0);break;case o:a=(e-n)/l+2;break;case e:a=(n-o)/l+4}var g=.5*(t+i),u=0==l?0:l/(1-Math.abs(2*g-1));return[60*a,u,g]},fromString:function(r){if(!r)return void console.log("Undefined rgb");var n;return r=r.replace(/ /g,""),(null!=(n=r.match(/^rgb\(([0-9]+),([0-9]+),([0-9]+)\)$/i))||null!=(n=r.match(/^\[?([0-9]+),([0-9]+),([0-9]+)\]?$/)))&&n[1]<=255&&n[2]<=255&&n[3]<=255?[n[1],n[2],n[3]]:void 0},toString:function(r){return r&&Array.isArray(r)&&3==r.length?"rgb("+r[0]+","+r[1]+","+r[2]+")":void console.log("Undefined rgb")},convertFromString:function(r){return colorConverter.hex.rgb(colorConverter.hex.fromString(r))||colorConverter.hsl.rgb(colorConverter.hsl.fromString(r))||colorConverter.rgb.fromString(r)},isValid:function(r){return void 0!=this.fromString(r)}},rgba={hex:function(r){return r?colorConverter.rgb.hex(r):void console.log("Undefined rgba")},fromString:function(r){if(!r)return void console.log("Undefined rgba");var n;return r=r.replace(/ /g,""),null!=(n=r.match(/^rgba\(([0-9]+),([0-9]+),([0-9]+),([0-9.]+)\)$/i))||null!=(n=r.match(/^\[?([0-9]+),([0-9]+),([0-9]+),([0-9.]+)\]?$/))?[parseInt(n[1]),parseInt(n[2]),parseInt(n[3]),parseInt(n[4])]:void 0},toString:function(r){return r&&Array.isArray(r)&&r.length>=4?"rgba("+Math.round(r[0])+","+Math.round(r[1])+","+Math.round(r[2])+","+r[3]+")":void console.log("Undefined rgba")},isValid:function(r){return void 0!=this.fromString(r)}},hsl={hex:function(r){var n;return r&&(n=colorConverter.hsl.rgb(r))?colorConverter.rgb.hex(n):void console.log("Undefined hsl")},rgb:function(r){if(!r)return void console.log("Undefined hsl");var n,o=r[0],e=r[1],t=r[2],i=(1-Math.abs(2*t-1))*e,l=i*(1-Math.abs(o/60%2-1)),a=t-i/2;return o<60?n=[i+a,l+a,a]:o<120?n=[l+a,i+a,a]:o<180?n=[a,i+a,l+a]:o<240?n=[a,l+a,i+a]:o<300?n=[l+a,a,i+a]:o<360&&(n=[i+a,a,l+a]),n?[Math.round(255*n[0]),Math.round(255*n[1]),Math.round(255*n[2])]:void 0},rgba:function(r){var n=this.rgba(r);return[n[0],n[1],n[2],1]},fromString:function(r){if(!r)return void console.log("Undefined hsl");var n;if(r=r.replace(/ /g,""),null!=(n=r.match(/^hsl\(([0-9.]+),([0-9.]+)(%?),([0-9.]+)(%?)\)$/i))||null!=(n=r.match(/^\[?([0-9.]+),([0-9.]+)(%?),([0-9.]+)(%?)\]?$/))){var r=[n[1],"%"==n[3]?n[2]/100:n[2],"%"==n[5]?n[4]/100:n[4]];if(r[0]<=360&&r[1]<=1&&r[2]<=1)return r}},toString:function(r){return r&&Array.isArray(r)&&3==r.length?"hsl("+(1*r[0]).toFixed(2)+", "+(100*r[1]).toFixed(2)+"%, "+(100*r[2]).toFixed(2)+"%)":void console.log("Undefined hsl")},isValid:function(r){return void 0!=this.fromString(r)}},colorConverter={hex:hex,rgb:rgb,rgba:rgba,hsl:hsl,isValid:function(r){return colorConverter.hex.isValid(r)||colorConverter.rgb.isValid(r)||colorConverter.rgba.isValid(r)||colorConverter.hsl.isValid(r)},getStringTypeAndValue:function(r){var n=colorConverter.hex.fromString(r),o=colorConverter.rgb.fromString(r),e=colorConverter.rgba.fromString(r),t=colorConverter.hsl.fromString(r);return n?{value:n,type:"hex"}:o?{value:o,type:"rgb"}:e?{value:e,type:"rgba"}:t?{value:t,type:"hsl"}:void 0}};"undefined"!=typeof module&&(module.exports=colorConverter),riot.mount("app");