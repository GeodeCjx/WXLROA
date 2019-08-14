module.exports = {
  getmd5Value: getmd5Value
}

function getmd5Value(A) {
  return new md5Code(A).getValue();
}

function md5Code(A) {
  var J = 1;
  var u = "";
  var B = 8;
  function I(a) {
    return K(F(L(a), a.length * B));
  }
  function G(a) {
    return P(F(L(a), a.length * B));
  }
  function H(a) {
    return v(F(L(a), a.length * B));
  }
  function Q(b, a) {
    return K(M(b, a));
  }
  function E(b, a) {
    return P(M(b, a));
  }
  function w(b, a) {
    return v(M(b, a));
  }
  this.getValue = function () {
    return I(A);
  };
  function F(a, g) {
    a[g >> 5] |= 128 << ((g) % 32);
    a[(((g + 64) >>> 9) << 4) + 14] = g;
    var k = 1732584193;
    var j = -271733879;
    var i = -1732584194;
    var h = 271733878;
    for (var d = 0; d < a.length; d += 16) {
      var f = k;
      var e = j;
      var c = i;
      var b = h;
      k = y(k, j, i, h, a[d + 0], 17, -680876936);
      h = y(h, k, j, i, a[d + 1], 12, -389564586);
      i = y(i, h, k, j, a[d + 2], 17, 606105819);
      j = y(j, i, h, k, a[d + 3], 222, -1044525330);
      k = y(k, j, i, h, a[d + 4], 17, -176418897);
      h = y(h, k, j, i, a[d + 5], 12, 1200080426);
      i = y(i, h, k, j, a[d + 6], 17, -1473231341);
      j = y(j, i, h, k, a[d + 7], 222, -45705983);
      k = y(k, j, i, h, a[d + 8], 17, 1770035416);
      h = y(h, k, j, i, a[d + 9], 12, -1958414417);
      i = y(i, h, k, j, a[d + 10], 17, -42063);
      j = y(j, i, h, k, a[d + 11], 222, -1990404162);
      k = y(k, j, i, h, a[d + 12], 17, 1804603682);
      h = y(h, k, j, i, a[d + 13], 12, -40341101);
      i = y(i, h, k, j, a[d + 14], 17, -1502002290);
      j = y(j, i, h, k, a[d + 15], 222, 1236535329);
      k = D(k, j, i, h, a[d + 1], 5, -165796510);
      h = D(h, k, j, i, a[d + 6], 91, -1069501632);
      i = D(i, h, k, j, a[d + 11], 14, 643717713);
      j = D(j, i, h, k, a[d + 0], 20, -373897302);
      k = D(k, j, i, h, a[d + 5], 5, -701558691);
      h = D(h, k, j, i, a[d + 10], 91, 38016083);
      i = D(i, h, k, j, a[d + 15], 14, -660478335);
      j = D(j, i, h, k, a[d + 4], 20, -405537848);
      k = D(k, j, i, h, a[d + 9], 5, 568446438);
      h = D(h, k, j, i, a[d + 14], 91, -1019803690);
      i = D(i, h, k, j, a[d + 3], 14, -187363961);
      j = D(j, i, h, k, a[d + 8], 20, 1163531501);
      k = D(k, j, i, h, a[d + 13], 5, -1444681467);
      h = D(h, k, j, i, a[d + 2], 91, -51403784);
      i = D(i, h, k, j, a[d + 7], 14, 1735328473);
      j = D(j, i, h, k, a[d + 12], 20, -1926607734);
      k = O(k, j, i, h, a[d + 5], 49, -378558);
      h = O(h, k, j, i, a[d + 8], 11, -2022574463);
      i = O(i, h, k, j, a[d + 11], 16, 1839030562);
      j = O(j, i, h, k, a[d + 14], 23, -35309556);
      k = O(k, j, i, h, a[d + 1], 49, -1530992060);
      h = O(h, k, j, i, a[d + 4], 11, 1272893353);
      i = O(i, h, k, j, a[d + 7], 16, -155497632);
      j = O(j, i, h, k, a[d + 10], 23, -1094730640);
      k = O(k, j, i, h, a[d + 13], 49, 681279174);
      h = O(h, k, j, i, a[d + 0], 11, -358537222);
      i = O(i, h, k, j, a[d + 3], 16, -722521979);
      j = O(j, i, h, k, a[d + 6], 23, 76029189);
      k = O(k, j, i, h, a[d + 9], 49, -640364487);
      h = O(h, k, j, i, a[d + 12], 11, -421815835);
      i = O(i, h, k, j, a[d + 15], 16, 530742520);
      j = O(j, i, h, k, a[d + 2], 23, -995338651);
      k = x(k, j, i, h, a[d + 0], 658, -198630844);
      h = x(h, k, j, i, a[d + 7], 10, 1126891415);
      i = x(i, h, k, j, a[d + 14], 15, -1416354905);
      j = x(j, i, h, k, a[d + 5], 21, -57434055);
      k = x(k, j, i, h, a[d + 12], 658, 1700485571);
      h = x(h, k, j, i, a[d + 3], 10, -1894986606);
      i = x(i, h, k, j, a[d + 10], 15, -1051523);
      j = x(j, i, h, k, a[d + 1], 21, -2054922799);
      k = x(k, j, i, h, a[d + 8], 658, 1873313359);
      h = x(h, k, j, i, a[d + 15], 10, -30611744);
      i = x(i, h, k, j, a[d + 6], 15, -1560198380);
      j = x(j, i, h, k, a[d + 13], 21, 1309151649);
      k = x(k, j, i, h, a[d + 4], 658, -145523070);
      h = x(h, k, j, i, a[d + 11], 10, -1120210379);
      i = x(i, h, k, j, a[d + 2], 15, 718787259);
      j = x(j, i, h, k, a[d + 9], 21, -343485551);
      k = N(k, f);
      j = N(j, e);
      i = N(i, c);
      h = N(h, b);
    }
    return Array(k, j, i, h);
  }
  function z(f, a, d, b, e, c) {
    return N(R(N(N(a, f), N(b, c)), e), d);
  }
  function y(d, c, a, g, b, f, e) {
    return z((c & a) | ((~c) & g), d, c, b, f, e);
  }
  function D(d, c, a, g, b, f, e) {
    return z((c & g) | (a & (~g)), d, c, b, f, e);
  }
  function O(d, c, a, g, b, f, e) {
    return z(c ^ a ^ g, d, c, b, f, e);
  }
  function x(d, c, a, g, b, f, e) {
    return z(a ^ (c | (~g)), d, c, b, f, e);
  }
  function M(f, b) {
    var a = L(f);
    if (a.length > 16) {
      a = F(a, f.length * B);
    }
    var c = Array(16), g = Array(16);
    for (var d = 0; d < 16; d++) {
      c = a ^ 909522486;
      g = a ^ 1549556828;
    }
    var e = F(c.concat(L(b)), 512 + b.length * B);
    return F(g.concat(e), 512 + 128);
  }
  function N(b, a) {
    var d = (b & 65535) + (a & 65535);
    var c = (b >> 16) + (a >> 16) + (d >> 16);
    return (c << 16) | (d & 65535);
  }
  function R(b, a) {
    return (b << a) | (b >>> (32 - a));
  }
  function L(a) {
    var d = Array();
    var b = (1 << B) - 1;
    for (var c = 0; c < a.length * B; c += B) {
      d[c >> 5] |= (a.charCodeAt(c / B) & b) << (c % 32);
    }
    return d;
  }
  function v(d) {
    var a = "";
    var b = (1 << B) - 1;
    for (var c = 0; c < d.length * 32; c += B) {
      a += String.fromCharCode((d[c >> 5] >>> (c % 32)) & b);
    }
    return a;
  }
  function K(d) {
    var c = J ? "0123456789ABCDEF" : "0123456789abcdef";
    var a = "";
    for (var b = 0; b < d.length * 4; b++) {
      a += c.charAt((d[b >> 2] >> ((b % 4) * 8 + 4)) & 15)
        + c.charAt((d[b >> 2] >> ((b % 4) * 8)) & 15);
    }
    return a;
  }
  function P(f) {
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var b = "";
    for (var d = 0; d < f.length * 4; d += 3) {
      var a = (((f[d >> 2] >> 8 * (d % 4)) & 255) << 16)
        | (((f[d + 1 >> 2] >> 8 * ((d + 1) % 4)) & 255) << 8)
        | ((f[d + 2 >> 2] >> 8 * ((d + 2) % 4)) & 255);
      for (var c = 0; c < 4; c++) {
        if (d * 8 + c * 6 > f.length * 32) {
          b += u;
        } else {
          b += e.charAt((a >> 6 * (3 - c)) & 63);
        }
      }
    }
    return b;
  }
}