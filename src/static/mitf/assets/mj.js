const Sa = (function (c, a) {
  c = c || this
  const h = c.window
  const p = c.document
  const d = new function () {
    const e = /^(statics|enumerable|beans|preserve)$/
    const t = []
    const n = t.slice
    const i = Object.create
    const r = Object.getOwnPropertyDescriptor
    const s = Object.defineProperty
    const u = t.forEach || function (_, v) {
      for (let b = 0, T = this.length; b < T; b++)
        _.call(v, this[b], b, this)
    }
    const o = function (_, v) {
      for (const b in this)
        this.hasOwnProperty(b) && _.call(v, this[b], b, this)
    }
    const l = Object.assign || function (_) {
      for (let v = 1, b = arguments.length; v < b; v++) {
        const T = arguments[v]
        for (const x in T)
          T.hasOwnProperty(x) && (_[x] = T[x])
      }
      return _
    }
    const f = function (_, v, b) {
      if (_) {
        const T = r(_, 'length');
        (T && typeof T.value == 'number' ? u : o).call(_, v, b = b || _)
      }
      return b
    }
    function g(_, v, b, T, x) {
      const S = {}
      function I(N, L) {
        L = L || (L = r(v, N)) && (L.get ? L : L.value),
        typeof L == 'string' && L[0] === '#' && (L = _[L.substring(1)] || L)
        const R = typeof L == 'function'; let D = L; const V = x || R && !L.base ? L && L.get ? N in _ : _[N] : null; let z;
        (!x || !V) && (R && V && (L.base = V),
        R && T !== !1 && (z = N.match(/^([gs]et|is)(([A-Z])(.*))$/)) && (S[z[3].toLowerCase() + z[4]] = z[2]),
        (!D || R || !D.get || typeof D.get != 'function' || !y.isPlainObject(D)) && (D = {
          value: D,
          writable: !0,
        }),
        (r(_, N) || {
          configurable: !0,
        }).configurable && (D.configurable = !0,
        D.enumerable = b ?? !z),
        s(_, N, D))
      }
      if (v) {
        for (var m in v)
          v.hasOwnProperty(m) && !e.test(m) && I(m)
        for (var m in S) {
          const w = S[m]
          const E = _[`set${w}`]
          const A = _[`get${w}`] || E && _[`is${w}`]
          A && (T === !0 || A.length === 0) && I(m, {
            get: A,
            set: E,
          })
        }
      }
      return _
    }
    function y() {
      for (let _ = 0, v = arguments.length; _ < v; _++) {
        const b = arguments[_]
        b && l(this, b)
      }
      return this
    }
    return g(y, {
      inject(_) {
        if (_) {
          const v = _.statics === !0 ? _ : _.statics
          const b = _.beans
          const T = _.preserve
          v !== _ && g(this.prototype, _, _.enumerable, b, T),
          g(this, v, null, b, T)
        }
        for (let x = 1, S = arguments.length; x < S; x++)
          this.inject(arguments[x])
        return this
      },
      extend() {
        for (var _ = this, v, b, T = 0, x, S = arguments.length; T < S && !(v && b); T++) {
          x = arguments[T],
          v = v || x.initialize,
          b = b || x.prototype
        }
        return v = v || function () {
          _.apply(this, arguments)
        }
        ,
        b = v.prototype = b || i(this.prototype),
        s(b, 'constructor', {
          value: v,
          writable: !0,
          configurable: !0,
        }),
        g(v, this),
        arguments.length && this.inject.apply(v, arguments),
        v.base = _,
        v
      },
    }).inject({
      enumerable: !1,
      initialize: y,
      set: y,
      inject() {
        for (let _ = 0, v = arguments.length; _ < v; _++) {
          const b = arguments[_]
          b && g(this, b, b.enumerable, b.beans, b.preserve)
        }
        return this
      },
      extend() {
        const _ = i(this)
        return _.inject.apply(_, arguments)
      },
      each(_, v) {
        return f(this, _, v)
      },
      clone() {
        return new this.constructor(this)
      },
      statics: {
        set: l,
        each: f,
        create: i,
        define: s,
        describe: r,
        clone(_) {
          return l(new _.constructor(), _)
        },
        isPlainObject(_) {
          const v = _ != null && _.constructor
          return v && (v === Object || v === y || v.name === 'Object')
        },
        pick(_, v) {
          return _ !== a ? _ : v
        },
        slice(_, v, b) {
          return n.call(_, v, b)
        },
      },
    })
  }()

  d.inject({
    enumerable: !1,
    toString() {
      return this._id != null
        ? (this._class || 'Object') + (this._name ? ` '${this._name}'` : ` @${this._id}`)
        : `{ ${d.each(this, function (e, t) {
        if (!t.startsWith('_')) {
          const n = typeof e
          this.push(`${t}: ${n === 'number' ? k.instance.number(e) : n === 'string' ? `'${e}'` : e}`)
        }
      }, []).join(', ')} }`
    },
    getClassName() {
      return this._class || ''
    },
    importJSON(e) {
      return d.importJSON(e, this)
    },
    exportJSON(e) {
      return d.exportJSON(this, e)
    },
    toJSON() {
      return d.serialize(this)
    },
    set(e, t) {
      return e && d.filter(this, e, t, this._prioritize),
      this
    },
  }, {
    beans: !1,
    statics: {
      exports: {},
      extend: function e() {
        const t = e.base.apply(this, arguments)
        const n = t.prototype._class
        return n && !d.exports[n] && (d.exports[n] = t),
        t
      },
      equals(e, t) {
        if (e === t)
          return !0
        if (e && e.equals)
          return e.equals(t)
        if (t && t.equals)
          return t.equals(e)
        if (e && t && typeof e == 'object' && typeof t == 'object') {
          if (Array.isArray(e) && Array.isArray(t)) {
            var n = e.length
            if (n !== t.length)
              return !1
            for (; n--;) {
              if (!d.equals(e[n], t[n]))
                return !1
            }
          }
          else {
            const i = Object.keys(e)
            var n = i.length
            if (n !== Object.keys(t).length)
              return !1
            for (; n--;) {
              const r = i[n]
              if (!(t.hasOwnProperty(r) && d.equals(e[r], t[r])))
                return !1
            }
          }
          return !0
        }
        return !1
      },
      read(e, t, n, i) {
        if (this === d) {
          const r = this.peek(e, t)
          return e.__index++,
          r
        }
        const s = this.prototype
        const u = s._readIndex
        const o = t || u && e.__index || 0
        const l = e.length
        let f = e[o]
        if (i = i || l - o,
        f instanceof this || n && n.readNull && f == null && i <= 1) {
          return u && (e.__index = o + 1),
          f && n && n.clone ? f.clone() : f
        }
        if (f = d.create(s),
        u && (f.__read = !0),
        f = f.initialize.apply(f, o > 0 || o + i < l ? d.slice(e, o, o + i) : e) || f,
        u) {
          e.__index = o + f.__read
          const g = f.__filtered
          g && (e.__filtered = g,
          f.__filtered = a),
          f.__read = a
        }
        return f
      },
      peek(e, t) {
        return e[e.__index = t || e.__index || 0]
      },
      remain(e) {
        return e.length - (e.__index || 0)
      },
      readList(e, t, n, i) {
        for (var r = [], s, u = t || 0, o = i ? u + i : e.length, l = u; l < o; l++)
          r.push(Array.isArray(s = e[l]) ? this.read(s, 0, n) : this.read(e, l, n, 1))
        return r
      },
      readNamed(e, t, n, i, r) {
        const s = this.getNamed(e, t)
        const u = s !== a
        if (u) {
          let o = e.__filtered
          if (!o) {
            const l = this.getSource(e)
            o = e.__filtered = d.create(l),
            o.__unfiltered = l
          }
          o[t] = a
        }
        return this.read(u ? [s] : e, n, i, r)
      },
      readSupported(e, t) {
        const n = this.getSource(e)
        const i = this
        let r = !1
        return n && Object.keys(n).forEach((s) => {
          if (s in t) {
            const u = i.readNamed(e, s)
            u !== a && (t[s] = u),
            r = !0
          }
        }),
        r
      },
      getSource(e) {
        let t = e.__source
        if (t === a) {
          const n = e.length === 1 && e[0]
          t = e.__source = n && d.isPlainObject(n) ? n : null
        }
        return t
      },
      getNamed(e, t) {
        const n = this.getSource(e)
        if (n)
          return t ? n[t] : e.__filtered || n
      },
      hasNamed(e, t) {
        return !!this.getNamed(e, t)
      },
      filter(e, t, n, i) {
        let r
        function s(g) {
          if (!(n && g in n) && !(r && g in r)) {
            const y = t[g]
            y !== a && (e[g] = y)
          }
        }
        if (i) {
          for (var u = {}, o = 0, l, f = i.length; o < f; o++) {
            (l = i[o]) in t && (s(l),
            u[l] = !0)
          }
          r = u
        }
        return Object.keys(t.__unfiltered || t).forEach(s),
        e
      },
      isPlainValue(e, t) {
        return d.isPlainObject(e) || Array.isArray(e) || t && typeof e == 'string'
      },
      serialize(e, t, n, i) {
        t = t || {}
        const r = !i; let s
        if (r && (t.formatter = new k(t.precision),
        i = {
          length: 0,
          definitions: {},
          references: {},
          add(y, _) {
            const v = `#${y._id}`
            let b = this.references[v]
            if (!b) {
              this.length++
              const T = _.call(y)
              const x = y._class
              x && T[0] !== x && T.unshift(x),
              this.definitions[v] = T,
              b = this.references[v] = [v]
            }
            return b
          },
        }),
        e && e._serialize) {
          s = e._serialize(t, i)
          const u = e._class
          u && !e._compactSerialize && (r || !n) && s[0] !== u && s.unshift(u)
        }
        else if (Array.isArray(e)) {
          s = []
          for (var o = 0, l = e.length; o < l; o++)
            s[o] = d.serialize(e[o], t, n, i)
        }
        else if (d.isPlainObject(e)) {
          s = {}
          for (var f = Object.keys(e), o = 0, l = f.length; o < l; o++) {
            const g = f[o]
            s[g] = d.serialize(e[g], t, n, i)
          }
        }
        else { typeof e == 'number' ? s = t.formatter.number(e, t.precision) : s = e }
        return r && i.length > 0 ? [['dictionary', i.definitions], s] : s
      },
      deserialize(e, t, n, i, r) {
        let s = e
        const u = !n
        const o = u && e && e.length && e[0][0] === 'dictionary'
        if (n = n || {},
        Array.isArray(e)) {
          let l = e[0]
          const f = l === 'dictionary'
          if (e.length == 1 && l.startsWith('#'))
            return n.dictionary[l]
          l = d.exports[l],
          s = []
          for (let g = l ? 1 : 0, y = e.length; g < y; g++)
            s.push(d.deserialize(e[g], t, n, f, o))
          if (l) {
            const _ = s
            t ? s = t(l, _, u || r) : s = new l(_)
          }
        }
        else if (d.isPlainObject(e)) {
          s = {},
          i && (n.dictionary = s)
          for (const v in e)
            s[v] = d.deserialize(e[v], t, n)
        }
        return o ? s[1] : s
      },
      exportJSON(e, t) {
        const n = d.serialize(e, t)
        return t && t.asString == !1 ? n : JSON.stringify(n)
      },
      importJSON(e, t) {
        return d.deserialize(typeof e == 'string' ? JSON.parse(e) : e, (n, i, r) => {
          const s = r && t && t.constructor === n
          const u = s ? t : d.create(n.prototype)
          if (i.length === 1 && u instanceof oe && (s || !(u instanceof ct))) {
            const o = i[0]
            d.isPlainObject(o) && (o.insert = !1,
            s && (i = i.concat([oe.INSERT])))
          }
          return (s ? u.set : n).apply(u, i),
          s && (t = null),
          u
        })
      },
      push(e, t) {
        const n = t.length
        if (n < 4096) { e.push.apply(e, t) }
        else {
          const i = e.length
          e.length += n
          for (let r = 0; r < n; r++)
            e[i + r] = t[r]
        }
        return e
      },
      splice(e, t, n, i) {
        const r = t && t.length
        const s = n === a
        n = s ? e.length : n,
        n > e.length && (n = e.length)
        for (var u = 0; u < r; u++)
          t[u]._index = n + u
        if (s) {
          return d.push(e, t),
          []
        }
        const o = [n, i]
        t && d.push(o, t)
        for (var l = e.splice.apply(e, o), u = 0, f = l.length; u < f; u++)
          l[u]._index = a
        for (var u = n + r, f = e.length; u < f; u++)
          e[u]._index = u
        return l
      },
      capitalize(e) {
        return e.replace(/\b[a-z]/g, (t) => {
          return t.toUpperCase()
        })
      },
      camelize(e) {
        return e.replace(/-(.)/g, (t, n) => {
          return n.toUpperCase()
        })
      },
      hyphenate(e) {
        return e.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
      },
    },
  })
  const M = {
    on(e, t) {
      if (typeof e != 'string') {
        d.each(e, function (s, u) {
          this.on(u, s)
        }, this)
      }
      else {
        const n = this._eventTypes
        const i = n && n[e]
        let r = this._callbacks = this._callbacks || {}
        r = r[e] = r[e] || [],
        !r.includes(t) && (r.push(t),
        i && i.install && r.length === 1 && i.install.call(this, e))
      }
      return this
    },
    off(e, t) {
      if (typeof e != 'string') {
        d.each(e, function (u, o) {
          this.off(o, u)
        }, this)
        return
      }
      const n = this._eventTypes; const i = n && n[e]; const r = this._callbacks && this._callbacks[e]; let s
      return r && (!t || (s = r.indexOf(t)) !== -1 && r.length === 1
        ? (i && i.uninstall && i.uninstall.call(this, e),
          delete this._callbacks[e])
        : s !== -1 && r.splice(s, 1)),
      this
    },
    once(e, t) {
      return this.on(e, function n() {
        t.apply(this, arguments),
        this.off(e, n)
      })
    },
    emit(e, t) {
      let n = this._callbacks && this._callbacks[e]
      if (!n)
        return !1
      const i = d.slice(arguments, 1)
      const r = t && t.target && !t.currentTarget
      n = n.slice(),
      r && (t.currentTarget = this)
      for (let s = 0, u = n.length; s < u; s++) {
        if (n[s].apply(this, i) == !1) {
          t && t.stop && t.stop()
          break
        }
      }
      return r && delete t.currentTarget,
      !0
    },
    responds(e) {
      return !!(this._callbacks && this._callbacks[e])
    },
    attach: '#on',
    detach: '#off',
    fire: '#emit',
    _installEvents(e) {
      const t = this._eventTypes
      const n = this._callbacks
      const i = e ? 'install' : 'uninstall'
      if (t) {
        for (const r in n) {
          if (n[r].length > 0) {
            let s = t[r]
            let u = s && s[i]
            u && u.call(this, r)
          }
        }
      }
    },
    statics: {
      inject: function e(t) {
        const n = t._events
        if (n) {
          const i = {}
          d.each(n, (r, s) => {
            const u = typeof r == 'string'
            let o = u ? r : s
            const l = d.capitalize(o)
            const f = o.substring(2).toLowerCase()
            i[f] = u ? {} : r,
            o = `_${o}`,
            t[`get${l}`] = function () {
              return this[o]
            }
            ,
            t[`set${l}`] = function (g) {
              const y = this[o]
              y && this.off(f, y),
              g && this.on(f, g),
              this[o] = g
            }
          }),
          t._eventTypes = i
        }
        return e.base.apply(this, arguments)
      },
    },
  }
  var F = d.extend({
    _class: 'PaperScope',
    initialize: function e() {
      ae = this,
      this.settings = new d({
        applyMatrix: !0,
        insertItems: !0,
        handleSize: 4,
        hitTolerance: 0,
      }),
      this.project = null,
      this.projects = [],
      this.tools = [],
      this._id = e._id++,
      e._scopes[this._id] = this
      const t = e.prototype
      if (!this.support) {
        const n = Je.getContext(1, 1) || {}
        t.support = {
          nativeDash: 'setLineDash' in n || 'mozDash' in n,
          nativeBlendModes: nn.nativeModes,
        },
        Je.release(n)
      }
      if (!this.agent) {
        const i = c.navigator.userAgent.toLowerCase()
        const r = (/(darwin|win|mac|linux|freebsd|sunos)/.exec(i) || [])[0]
        const s = r === 'darwin' ? 'mac' : r
        const u = t.agent = t.browser = {
          platform: s,
        }
        s && (u[s] = !0),
        i.replace(/(opera|chrome|safari|webkit|firefox|msie|trident|atom|node|jsdom)\/?\s*([.\d]+)(?:.*version\/([.\d]+))?(?:.*rv\:v?([.\d]+))?/g, (o, l, f, g, y) => {
          if (!u.chrome) {
            const _ = l === 'opera' ? g : /^(node|trident)$/.test(l) ? y : f
            u.version = _,
            u.versionNumber = parseFloat(_),
            l = {
              trident: 'msie',
              jsdom: 'node',
            }[l] || l,
            u.name = l,
            u[l] = !0
          }
        }),
        u.chrome && delete u.webkit,
        u.atom && delete u.chrome
      }
    },
    version: '0.12.17',
    getView() {
      const e = this.project
      return e && e._view
    },
    getPaper() {
      return this
    },
    execute(e, t) {},
    install(e) {
      const t = this
      d.each(['project', 'view', 'tool'], (i) => {
        d.define(e, i, {
          configurable: !0,
          get() {
            return t[i]
          },
        })
      })
      for (const n in this)
        !n.startsWith('_') && this[n] && (e[n] = this[n])
    },
    setup(e) {
      return h.paper = this,
      this.project = new ye(e),
      this
    },
    createCanvas(e, t) {
      return Je.getCanvas(e, t)
    },
    activate() {
      ae = this
    },
    clear() {
      for (var e = this.projects, t = this.tools, n = e.length - 1; n >= 0; n--)
        e[n].remove()
      for (var n = t.length - 1; n >= 0; n--)
        t[n].remove()
    },
    remove() {
      this.clear(),
      delete F._scopes[this._id]
    },
    statics: new function () {
      function e(t) {
        return t += 'Attribute',
        function (n, i) {
          return n[t](i) || n[t](`data-paper-${i}`)
        }
      }
      return {
        _scopes: {},
        _id: 0,
        get(t) {
          return this._scopes[t] || null
        },
        getAttribute: e('get'),
        hasAttribute: e('has'),
      }
    }(),
  })
  const Z = d.extend(M, {
    initialize(e) {
      this._scope = ae,
      this._index = this._scope[this._list].push(this) - 1,
      (e || !this._scope[this._reference]) && this.activate()
    },
    activate() {
      if (!this._scope)
        return !1
      const e = this._scope[this._reference]
      return e && e !== this && e.emit('deactivate'),
      this._scope[this._reference] = this,
      this.emit('activate', e),
      !0
    },
    isActive() {
      return this._scope[this._reference] === this
    },
    remove() {
      return this._index == null
        ? !1
        : (d.splice(this._scope[this._list], null, this._index, 1),
          this._scope[this._reference] == this && (this._scope[this._reference] = null),
          this._scope = null,
          !0)
    },
    getView() {
      return this._scope.getView()
    },
  })
  const q = {
    findItemBoundsCollisions(e, t, n) {
      function i(u) {
        for (var o = new Array(u.length), l = 0; l < u.length; l++) {
          const f = u[l].getBounds()
          o[l] = [f.left, f.top, f.right, f.bottom]
        }
        return o
      }
      const r = i(e)
      let s = !t || t === e ? r : i(t)
      return this.findBoundsCollisions(r, s, n || 0)
    },
    findCurveBoundsCollisions(e, t, n, i) {
      function r(_) {
        for (var v = Math.min, b = Math.max, T = new Array(_.length), x = 0; x < _.length; x++) {
          const S = _[x]
          T[x] = [v(S[0], S[2], S[4], S[6]), v(S[1], S[3], S[5], S[7]), b(S[0], S[2], S[4], S[6]), b(S[1], S[3], S[5], S[7])]
        }
        return T
      }
      const s = r(e)
      let u = !t || t === e ? s : r(t)
      if (i) {
        for (var o = this.findBoundsCollisions(s, u, n || 0, !1, !0), l = this.findBoundsCollisions(s, u, n || 0, !0, !0), f = [], g = 0, y = o.length; g < y; g++) {
          f[g] = {
            hor: o[g],
            ver: l[g],
          }
        }
        return f
      }
      return this.findBoundsCollisions(s, u, n || 0)
    },
    findBoundsCollisions(e, t, n, i, r) {
      const s = !t || e === t
      let u = s ? e : e.concat(t)
      let o = e.length
      let l = u.length
      function f(se, ue, Ie) {
        for (var Ee = 0, de = se.length; Ee < de;) {
          const ve = de + Ee >>> 1
          u[se[ve]][ue] < Ie ? Ee = ve + 1 : de = ve
        }
        return Ee - 1
      }
      for (var g = i ? 1 : 0, y = g + 2, _ = i ? 0 : 1, v = _ + 2, b = new Array(l), T = 0; T < l; T++)
        b[T] = T
      b.sort((se, ue) => {
        return u[se][g] - u[ue][g]
      })
      for (var x = [], S = new Array(o), T = 0; T < l; T++) {
        const I = b[T]
        let m = u[I]
        let w = s ? I : I - o
        let E = I < o
        let A = s || !E
        let N = E ? [] : null
        if (x.length) {
          const L = f(x, y, m[g] - n) + 1
          if (x.splice(0, L),
          s && r) {
            N = N.concat(x)
            for (var R = 0; R < x.length; R++) {
              var D = x[R]
              S[D].push(w)
            }
          }
          else {
            for (var V = m[v], z = m[_], R = 0; R < x.length; R++) {
              var D = x[R]
              var G = u[D]
              var H = D < o
              var K = s || D >= o;
              (r || (E && K || A && H) && V >= G[_] - n && z <= G[v] + n) && (E && K && N.push(s ? D : D - o),
              A && H && S[D].push(w))
            }
          }
        }
        if (E && (e === t && N.push(I),
        S[I] = N),
        x.length) {
          const $ = m[y]
          let W = f(x, y, $)
          x.splice(W + 1, 0, I)
        }
        else { x.push(I) }
      }
      for (var T = 0; T < S.length; T++) {
        const te = S[T]
        te && te.sort((ue, Ie) => {
          return ue - Ie
        })
      }
      return S
    },
  }
  var k = d.extend({
    initialize(e) {
      this.precision = d.pick(e, 5),
      this.multiplier = 10 ** this.precision
    },
    number(e) {
      return this.precision < 16 ? Math.round(e * this.multiplier) / this.multiplier : e
    },
    pair(e, t, n) {
      return this.number(e) + (n || ',') + this.number(t)
    },
    point(e, t) {
      return this.number(e.x) + (t || ',') + this.number(e.y)
    },
    size(e, t) {
      return this.number(e.width) + (t || ',') + this.number(e.height)
    },
    rectangle(e, t) {
      return this.point(e, t) + (t || ',') + this.size(e, t)
    },
  })
  k.instance = new k()
  var O = new function () {
    const e = [[0.5773502691896257], [0, 0.7745966692414834], [0.33998104358485626, 0.8611363115940526], [0, 0.5384693101056831, 0.906179845938664], [0.2386191860831969, 0.6612093864662645, 0.932469514203152], [0, 0.4058451513773972, 0.7415311855993945, 0.9491079123427585], [0.1834346424956498, 0.525532409916329, 0.7966664774136267, 0.9602898564975363], [0, 0.3242534234038089, 0.6133714327005904, 0.8360311073266358, 0.9681602395076261], [0.14887433898163122, 0.4333953941292472, 0.6794095682990244, 0.8650633666889845, 0.9739065285171717], [0, 0.26954315595234496, 0.5190961292068118, 0.7301520055740494, 0.8870625997680953, 0.978228658146057], [0.1252334085114689, 0.3678314989981802, 0.5873179542866175, 0.7699026741943047, 0.9041172563704749, 0.9815606342467192], [0, 0.2304583159551348, 0.44849275103644687, 0.6423493394403402, 0.8015780907333099, 0.9175983992229779, 0.9841830547185881], [0.10805494870734367, 0.31911236892788974, 0.5152486363581541, 0.6872929048116855, 0.827201315069765, 0.9284348836635735, 0.9862838086968123], [0, 0.20119409399743451, 0.3941513470775634, 0.5709721726085388, 0.7244177313601701, 0.8482065834104272, 0.937273392400706, 0.9879925180204854], [0.09501250983763744, 0.2816035507792589, 0.45801677765722737, 0.6178762444026438, 0.755404408355003, 0.8656312023878318, 0.9445750230732326, 0.9894009349916499]]
    const t = [[1], [0.8888888888888888, 0.5555555555555556], [0.6521451548625461, 0.34785484513745385], [0.5688888888888889, 0.47862867049936647, 0.23692688505618908], [0.46791393457269104, 0.3607615730481386, 0.17132449237917036], [0.4179591836734694, 0.3818300505051189, 0.27970539148927664, 0.1294849661688697], [0.362683783378362, 0.31370664587788727, 0.22238103445337448, 0.10122853629037626], [0.3302393550012598, 0.31234707704000286, 0.26061069640293544, 0.1806481606948574, 0.08127438836157441], [0.29552422471475287, 0.26926671930999635, 0.21908636251598204, 0.1494513491505806, 0.06667134430868814], [0.2729250867779006, 0.26280454451024665, 0.23319376459199048, 0.18629021092773426, 0.1255803694649046, 0.05566856711617366], [0.24914704581340277, 0.2334925365383548, 0.20316742672306592, 0.16007832854334622, 0.10693932599531843, 0.04717533638651183], [0.2325515532308739, 0.22628318026289723, 0.2078160475368885, 0.17814598076194574, 0.13887351021978725, 0.09212149983772845, 0.04048400476531588], [0.2152638534631578, 0.2051984637212956, 0.18553839747793782, 0.15720316715819355, 0.12151857068790319, 0.08015808715976021, 0.03511946033175186], [0.2025782419255613, 0.19843148532711158, 0.1861610000155622, 0.16626920581699392, 0.13957067792615432, 0.10715922046717194, 0.07036604748810812, 0.03075324199611727], [0.1894506104550685, 0.18260341504492358, 0.16915651939500254, 0.14959598881657674, 0.12462897125553388, 0.09515851168249279, 0.062253523938647894, 0.027152459411754096]]
    const n = Math.abs
    const i = Math.sqrt
    const r = Math.pow
    const s = Math.log2 || function (y) {
      return Math.log(y) * Math.LOG2E
    }
    const u = 1e-12
    const o = 112e-18
    function l(y, _, v) {
      return y < _ ? _ : y > v ? v : y
    }
    function f(y, _, v) {
      function b(L) {
        const R = L * 134217729
        const D = L - R
        const V = D + R
        const z = L - V
        return [V, z]
      }
      let T = _ * _ - y * v
      const x = _ * _ + y * v
      if (n(T) * 3 < x) {
        const S = b(y)
        const I = b(_)
        const m = b(v)
        const w = _ * _
        const E = I[0] * I[0] - w + 2 * I[0] * I[1] + I[1] * I[1]
        const A = y * v
        const N = S[0] * m[0] - A + S[0] * m[1] + S[1] * m[0] + S[1] * m[1]
        T = w - A + (E - N)
      }
      return T
    }
    function g() {
      const y = Math.max.apply(Math, arguments)
      return y && (y < 1e-8 || y > 1e8) ? 2 ** -Math.round(s(y)) : 0
    }
    return {
      EPSILON: u,
      MACHINE_EPSILON: o,
      CURVETIME_EPSILON: 1e-8,
      GEOMETRIC_EPSILON: 1e-7,
      TRIGONOMETRIC_EPSILON: 1e-8,
      ANGULAR_EPSILON: 1e-5,
      KAPPA: 4 * (i(2) - 1) / 3,
      isZero(y) {
        return y >= -u && y <= u
      },
      isMachineZero(y) {
        return y >= -o && y <= o
      },
      clamp: l,
      integrate(y, _, v, b) {
        for (var T = e[b - 2], x = t[b - 2], S = (v - _) * 0.5, I = S + _, m = 0, w = b + 1 >> 1, E = b & 1 ? x[m++] * y(I) : 0; m < w;) {
          const A = S * T[m]
          E += x[m++] * (y(I + A) + y(I - A))
        }
        return S * E
      },
      findRoot(y, _, v, b, T, x, S) {
        for (let I = 0; I < x; I++) {
          const m = y(v)
          const w = m / _(v)
          const E = v - w
          if (n(w) < S) {
            v = E
            break
          }
          m > 0
            ? (T = v,
              v = E <= b ? (b + T) * 0.5 : E)
            : (b = v,
              v = E >= T ? (b + T) * 0.5 : E)
        }
        return l(v, b, T)
      },
      solveQuadratic(y, _, v, b, T, x) {
        let S; let I = 1 / 0
        if (n(y) < u) {
          if (n(_) < u)
            return n(v) < u ? -1 : 0
          S = -v / _
        }
        else {
          _ *= -0.5
          let m = f(y, _, v)
          if (m && n(m) < o) {
            const w = g(n(y), n(_), n(v))
            w && (y *= w,
            _ *= w,
            v *= w,
            m = f(y, _, v))
          }
          if (m >= -o) {
            const E = m < 0 ? 0 : i(m)
            const A = _ + (_ < 0 ? -E : E)
            A === 0
              ? (S = v / y,
                I = -S)
              : (S = A / y,
                I = v / A)
          }
        }
        let N = 0
        const L = T == null
        const R = T - u
        const D = x + u
        return isFinite(S) && (L || S > R && S < D) && (b[N++] = L ? S : l(S, T, x)),
        I !== S && isFinite(I) && (L || I > R && I < D) && (b[N++] = L ? I : l(I, T, x)),
        N
      },
      solveCubic(y, _, v, b, T, x, S) {
        const I = g(n(y), n(_), n(v), n(b)); let m; let w; let E; let A; let N
        I && (y *= I,
        _ *= I,
        v *= I,
        b *= I)
        function L(W) {
          m = W
          const te = y * m
          w = te + _,
          E = w * m + v,
          A = (te + w) * m + E,
          N = E * m + b
        }
        if (n(y) < u) {
          y = _,
          w = v,
          E = b,
          m = 1 / 0
        }
        else if (n(b) < u) {
          w = _,
          E = v,
          m = 0
        }
        else {
          L(-(_ / y) / 3)
          const R = N / y
          const D = n(R) ** (1 / 3)
          const V = R < 0 ? -1 : 1
          const z = -A / y
          const G = z > 0 ? 1.324717957244746 * Math.max(D, i(z)) : D
          let H = m - V * G
          if (H !== m) {
            do {
              L(H),
              H = A === 0 ? m : m - N / A / (1 + o)
            }
            while (V * H > V * m)
            n(y) * m * m > n(b / m) && (E = -b / m,
            w = (E - v) / m)
          }
        }
        let K = O.solveQuadratic(y, w, E, T, x, S)
        const $ = x == null
        return isFinite(m) && (K === 0 || K > 0 && m !== T[0] && m !== T[1]) && ($ || m > x - u && m < S + u) && (T[K++] = $ ? m : l(m, x, S)),
        K
      },
    }
  }()
  const B = {
    _id: 1,
    _pools: {},
    get(e) {
      if (e) {
        let t = this._pools[e]
        return t || (t = this._pools[e] = {
          _id: 1,
        }),
        t._id++
      }
      else { return this._id++ }
    },
  }
  var C = d.extend({
    _class: 'Point',
    _readIndex: !0,
    initialize(t, n) {
      const i = typeof t
      const r = this.__read
      let s = 0
      if (i === 'number') {
        const u = typeof n == 'number'
        this._set(t, u ? n : t),
        r && (s = u ? 2 : 1)
      }
      else if (i === 'undefined' || t === null) {
        this._set(0, 0),
        r && (s = t === null ? 1 : 0)
      }
      else {
        const o = i === 'string' ? t.split(/[\s,]+/) || [] : t
        s = 1,
        Array.isArray(o)
          ? this._set(+o[0], +(o.length > 1 ? o[1] : o[0]))
          : 'x' in o
            ? this._set(o.x || 0, o.y || 0)
            : 'width' in o
              ? this._set(o.width || 0, o.height || 0)
              : 'angle' in o
                ? (this._set(o.length || 0, 0),
                  this.setAngle(o.angle || 0))
                : (this._set(0, 0),
                  s = 0)
      }
      return r && (this.__read = s),
      this
    },
    set: '#initialize',
    _set(e, t) {
      return this.x = e,
      this.y = t,
      this
    },
    equals(e) {
      return this === e || e && (this.x === e.x && this.y === e.y || Array.isArray(e) && this.x === e[0] && this.y === e[1]) || !1
    },
    clone() {
      return new C(this.x, this.y)
    },
    toString() {
      const e = k.instance
      return `{ x: ${e.number(this.x)}, y: ${e.number(this.y)} }`
    },
    _serialize(e) {
      const t = e.formatter
      return [t.number(this.x), t.number(this.y)]
    },
    getLength() {
      return Math.sqrt(this.x * this.x + this.y * this.y)
    },
    setLength(e) {
      if (this.isZero()) {
        const t = this._angle || 0
        this._set(Math.cos(t) * e, Math.sin(t) * e)
      }
      else {
        const n = e / this.getLength()
        O.isZero(n) && this.getAngle(),
        this._set(this.x * n, this.y * n)
      }
    },
    getAngle() {
      return this.getAngleInRadians.apply(this, arguments) * 180 / Math.PI
    },
    setAngle(e) {
      this.setAngleInRadians.call(this, e * Math.PI / 180)
    },
    getAngleInDegrees: '#getAngle',
    setAngleInDegrees: '#setAngle',
    getAngleInRadians() {
      if (arguments.length) {
        const e = C.read(arguments)
        const t = this.getLength() * e.getLength()
        if (O.isZero(t))
          return NaN
        const n = this.dot(e) / t
        return Math.acos(n < -1 ? -1 : n > 1 ? 1 : n)
      }
      else { return this.isZero() ? this._angle || 0 : this._angle = Math.atan2(this.y, this.x) }
    },
    setAngleInRadians(e) {
      if (this._angle = e,
      !this.isZero()) {
        const t = this.getLength()
        this._set(Math.cos(e) * t, Math.sin(e) * t)
      }
    },
    getQuadrant() {
      return this.x >= 0 ? this.y >= 0 ? 1 : 4 : this.y >= 0 ? 2 : 3
    },
  }, {
    beans: !1,
    getDirectedAngle() {
      const e = C.read(arguments)
      return Math.atan2(this.cross(e), this.dot(e)) * 180 / Math.PI
    },
    getDistance() {
      const e = arguments
      const t = C.read(e)
      const n = t.x - this.x
      const i = t.y - this.y
      const r = n * n + i * i
      const s = d.read(e)
      return s ? r : Math.sqrt(r)
    },
    normalize(e) {
      e === a && (e = 1)
      const t = this.getLength()
      const n = t !== 0 ? e / t : 0
      const i = new C(this.x * n, this.y * n)
      return n >= 0 && (i._angle = this._angle),
      i
    },
    rotate(e, t) {
      if (e === 0)
        return this.clone()
      e = e * Math.PI / 180
      let n = t ? this.subtract(t) : this
      const i = Math.sin(e)
      const r = Math.cos(e)
      return n = new C(n.x * r - n.y * i, n.x * i + n.y * r),
      t ? n.add(t) : n
    },
    transform(e) {
      return e ? e._transformPoint(this) : this
    },
    add() {
      const e = C.read(arguments)
      return new C(this.x + e.x, this.y + e.y)
    },
    subtract() {
      const e = C.read(arguments)
      return new C(this.x - e.x, this.y - e.y)
    },
    multiply() {
      const e = C.read(arguments)
      return new C(this.x * e.x, this.y * e.y)
    },
    divide() {
      const e = C.read(arguments)
      return new C(this.x / e.x, this.y / e.y)
    },
    modulo() {
      const e = C.read(arguments)
      return new C(this.x % e.x, this.y % e.y)
    },
    negate() {
      return new C(-this.x, -this.y)
    },
    isInside() {
      return Y.read(arguments).contains(this)
    },
    isClose() {
      const e = arguments
      const t = C.read(e)
      const n = d.read(e)
      return this.getDistance(t) <= n
    },
    isCollinear() {
      const e = C.read(arguments)
      return C.isCollinear(this.x, this.y, e.x, e.y)
    },
    isColinear: '#isCollinear',
    isOrthogonal() {
      const e = C.read(arguments)
      return C.isOrthogonal(this.x, this.y, e.x, e.y)
    },
    isZero() {
      const e = O.isZero
      return e(this.x) && e(this.y)
    },
    isNaN() {
      return isNaN(this.x) || isNaN(this.y)
    },
    isInQuadrant(e) {
      return this.x * (e > 1 && e < 4 ? -1 : 1) >= 0 && this.y * (e > 2 ? -1 : 1) >= 0
    },
    dot() {
      const e = C.read(arguments)
      return this.x * e.x + this.y * e.y
    },
    cross() {
      const e = C.read(arguments)
      return this.x * e.y - this.y * e.x
    },
    project() {
      const e = C.read(arguments)
      const t = e.isZero() ? 0 : this.dot(e) / e.dot(e)
      return new C(e.x * t, e.y * t)
    },
    statics: {
      min() {
        const e = arguments
        const t = C.read(e)
        const n = C.read(e)
        return new C(Math.min(t.x, n.x), Math.min(t.y, n.y))
      },
      max() {
        const e = arguments
        const t = C.read(e)
        const n = C.read(e)
        return new C(Math.max(t.x, n.x), Math.max(t.y, n.y))
      },
      random() {
        return new C(Math.random(), Math.random())
      },
      isCollinear(e, t, n, i) {
        return Math.abs(e * i - t * n) <= Math.sqrt((e * e + t * t) * (n * n + i * i)) * 1e-8
      },
      isOrthogonal(e, t, n, i) {
        return Math.abs(e * n + t * i) <= Math.sqrt((e * e + t * t) * (n * n + i * i)) * 1e-8
      },
    },
  }, d.each(['round', 'ceil', 'floor', 'abs'], function (e) {
    const t = Math[e]
    this[e] = function () {
      return new C(t(this.x), t(this.y))
    }
  }, {}))
  const Q = C.extend({
    initialize(t, n, i, r) {
      this._x = t,
      this._y = n,
      this._owner = i,
      this._setter = r
    },
    _set(e, t, n) {
      return this._x = e,
      this._y = t,
      n || this._owner[this._setter](this),
      this
    },
    getX() {
      return this._x
    },
    setX(e) {
      this._x = e,
      this._owner[this._setter](this)
    },
    getY() {
      return this._y
    },
    setY(e) {
      this._y = e,
      this._owner[this._setter](this)
    },
    isSelected() {
      return !!(this._owner._selection & this._getSelection())
    },
    setSelected(e) {
      this._owner._changeSelection(this._getSelection(), e)
    },
    _getSelection() {
      return this._setter === 'setPosition' ? 4 : 0
    },
  })
  var J = d.extend({
    _class: 'Size',
    _readIndex: !0,
    initialize(t, n) {
      const i = typeof t
      const r = this.__read
      let s = 0
      if (i === 'number') {
        const u = typeof n == 'number'
        this._set(t, u ? n : t),
        r && (s = u ? 2 : 1)
      }
      else if (i === 'undefined' || t === null) {
        this._set(0, 0),
        r && (s = t === null ? 1 : 0)
      }
      else {
        const o = i === 'string' ? t.split(/[\s,]+/) || [] : t
        s = 1,
        Array.isArray(o)
          ? this._set(+o[0], +(o.length > 1 ? o[1] : o[0]))
          : 'width' in o
            ? this._set(o.width || 0, o.height || 0)
            : 'x' in o
              ? this._set(o.x || 0, o.y || 0)
              : (this._set(0, 0),
                s = 0)
      }
      return r && (this.__read = s),
      this
    },
    set: '#initialize',
    _set(e, t) {
      return this.width = e,
      this.height = t,
      this
    },
    equals(e) {
      return e === this || e && (this.width === e.width && this.height === e.height || Array.isArray(e) && this.width === e[0] && this.height === e[1]) || !1
    },
    clone() {
      return new J(this.width, this.height)
    },
    toString() {
      const e = k.instance
      return `{ width: ${e.number(this.width)}, height: ${e.number(this.height)} }`
    },
    _serialize(e) {
      const t = e.formatter
      return [t.number(this.width), t.number(this.height)]
    },
    add() {
      const e = J.read(arguments)
      return new J(this.width + e.width, this.height + e.height)
    },
    subtract() {
      const e = J.read(arguments)
      return new J(this.width - e.width, this.height - e.height)
    },
    multiply() {
      const e = J.read(arguments)
      return new J(this.width * e.width, this.height * e.height)
    },
    divide() {
      const e = J.read(arguments)
      return new J(this.width / e.width, this.height / e.height)
    },
    modulo() {
      const e = J.read(arguments)
      return new J(this.width % e.width, this.height % e.height)
    },
    negate() {
      return new J(-this.width, -this.height)
    },
    isZero() {
      const e = O.isZero
      return e(this.width) && e(this.height)
    },
    isNaN() {
      return isNaN(this.width) || isNaN(this.height)
    },
    statics: {
      min(e, t) {
        return new J(Math.min(e.width, t.width), Math.min(e.height, t.height))
      },
      max(e, t) {
        return new J(Math.max(e.width, t.width), Math.max(e.height, t.height))
      },
      random() {
        return new J(Math.random(), Math.random())
      },
    },
  }, d.each(['round', 'ceil', 'floor', 'abs'], function (e) {
    const t = Math[e]
    this[e] = function () {
      return new J(t(this.width), t(this.height))
    }
  }, {}))
  const ne = J.extend({
    initialize(t, n, i, r) {
      this._width = t,
      this._height = n,
      this._owner = i,
      this._setter = r
    },
    _set(e, t, n) {
      return this._width = e,
      this._height = t,
      n || this._owner[this._setter](this),
      this
    },
    getWidth() {
      return this._width
    },
    setWidth(e) {
      this._width = e,
      this._owner[this._setter](this)
    },
    getHeight() {
      return this._height
    },
    setHeight(e) {
      this._height = e,
      this._owner[this._setter](this)
    },
  })
  var Y = d.extend({
    _class: 'Rectangle',
    _readIndex: !0,
    beans: !0,
    initialize(t, n, i, r) {
      const s = arguments; const u = typeof t; let o
      if (u === 'number'
        ? (this._set(t, n, i, r),
          o = 4)
        : u === 'undefined' || t === null
          ? (this._set(0, 0, 0, 0),
            o = t === null ? 1 : 0)
          : s.length === 1 && (Array.isArray(t)
            ? (this._set.apply(this, t),
              o = 1)
            : t.x !== a || t.width !== a
              ? (this._set(t.x || 0, t.y || 0, t.width || 0, t.height || 0),
                o = 1)
              : t.from === a && t.to === a && (this._set(0, 0, 0, 0),
              d.readSupported(s, this) && (o = 1))),
      o === a) {
        const l = C.readNamed(s, 'from'); const f = d.peek(s); let g = l.x; let y = l.y; let _; let v
        if (f && f.x !== a || d.hasNamed(s, 'to')) {
          const b = C.readNamed(s, 'to')
          _ = b.x - g,
          v = b.y - y,
          _ < 0 && (g = b.x,
          _ = -_),
          v < 0 && (y = b.y,
          v = -v)
        }
        else {
          const T = J.read(s)
          _ = T.width,
          v = T.height
        }
        this._set(g, y, _, v),
        o = s.__index
      }
      const x = s.__filtered
      return x && (this.__filtered = x),
      this.__read && (this.__read = o),
      this
    },
    set: '#initialize',
    _set(e, t, n, i) {
      return this.x = e,
      this.y = t,
      this.width = n,
      this.height = i,
      this
    },
    clone() {
      return new Y(this.x, this.y, this.width, this.height)
    },
    equals(e) {
      const t = d.isPlainValue(e) ? Y.read(arguments) : e
      return t === this || t && this.x === t.x && this.y === t.y && this.width === t.width && this.height === t.height || !1
    },
    toString() {
      const e = k.instance
      return `{ x: ${e.number(this.x)}, y: ${e.number(this.y)}, width: ${e.number(this.width)}, height: ${e.number(this.height)} }`
    },
    _serialize(e) {
      const t = e.formatter
      return [t.number(this.x), t.number(this.y), t.number(this.width), t.number(this.height)]
    },
    getPoint(e) {
      const t = e ? C : Q
      return new t(this.x, this.y, this, 'setPoint')
    },
    setPoint() {
      const e = C.read(arguments)
      this.x = e.x,
      this.y = e.y
    },
    getSize(e) {
      const t = e ? J : ne
      return new t(this.width, this.height, this, 'setSize')
    },
    _fw: 1,
    _fh: 1,
    setSize() {
      const e = J.read(arguments)
      const t = this._sx
      const n = this._sy
      const i = e.width
      const r = e.height
      t && (this.x += (this.width - i) * t),
      n && (this.y += (this.height - r) * n),
      this.width = i,
      this.height = r,
      this._fw = this._fh = 1
    },
    getLeft() {
      return this.x
    },
    setLeft(e) {
      if (!this._fw) {
        const t = e - this.x
        this.width -= this._sx === 0.5 ? t * 2 : t
      }
      this.x = e,
      this._sx = this._fw = 0
    },
    getTop() {
      return this.y
    },
    setTop(e) {
      if (!this._fh) {
        const t = e - this.y
        this.height -= this._sy === 0.5 ? t * 2 : t
      }
      this.y = e,
      this._sy = this._fh = 0
    },
    getRight() {
      return this.x + this.width
    },
    setRight(e) {
      if (!this._fw) {
        const t = e - this.x
        this.width = this._sx === 0.5 ? t * 2 : t
      }
      this.x = e - this.width,
      this._sx = 1,
      this._fw = 0
    },
    getBottom() {
      return this.y + this.height
    },
    setBottom(e) {
      if (!this._fh) {
        const t = e - this.y
        this.height = this._sy === 0.5 ? t * 2 : t
      }
      this.y = e - this.height,
      this._sy = 1,
      this._fh = 0
    },
    getCenterX() {
      return this.x + this.width / 2
    },
    setCenterX(e) {
      this._fw || this._sx === 0.5
        ? this.x = e - this.width / 2
        : (this._sx && (this.x += (e - this.x) * 2 * this._sx),
          this.width = (e - this.x) * 2),
      this._sx = 0.5,
      this._fw = 0
    },
    getCenterY() {
      return this.y + this.height / 2
    },
    setCenterY(e) {
      this._fh || this._sy === 0.5
        ? this.y = e - this.height / 2
        : (this._sy && (this.y += (e - this.y) * 2 * this._sy),
          this.height = (e - this.y) * 2),
      this._sy = 0.5,
      this._fh = 0
    },
    getCenter(e) {
      const t = e ? C : Q
      return new t(this.getCenterX(), this.getCenterY(), this, 'setCenter')
    },
    setCenter() {
      const e = C.read(arguments)
      return this.setCenterX(e.x),
      this.setCenterY(e.y),
      this
    },
    getArea() {
      return this.width * this.height
    },
    isEmpty() {
      return this.width === 0 || this.height === 0
    },
    contains(e) {
      return e && e.width !== a || (Array.isArray(e) ? e : arguments).length === 4 ? this._containsRectangle(Y.read(arguments)) : this._containsPoint(C.read(arguments))
    },
    _containsPoint(e) {
      const t = e.x
      const n = e.y
      return t >= this.x && n >= this.y && t <= this.x + this.width && n <= this.y + this.height
    },
    _containsRectangle(e) {
      const t = e.x
      const n = e.y
      return t >= this.x && n >= this.y && t + e.width <= this.x + this.width && n + e.height <= this.y + this.height
    },
    intersects() {
      const e = Y.read(arguments)
      const t = d.read(arguments) || 0
      return e.x + e.width > this.x - t && e.y + e.height > this.y - t && e.x < this.x + this.width + t && e.y < this.y + this.height + t
    },
    intersect() {
      const e = Y.read(arguments)
      const t = Math.max(this.x, e.x)
      const n = Math.max(this.y, e.y)
      const i = Math.min(this.x + this.width, e.x + e.width)
      const r = Math.min(this.y + this.height, e.y + e.height)
      return new Y(t, n, i - t, r - n)
    },
    unite() {
      const e = Y.read(arguments)
      const t = Math.min(this.x, e.x)
      const n = Math.min(this.y, e.y)
      const i = Math.max(this.x + this.width, e.x + e.width)
      const r = Math.max(this.y + this.height, e.y + e.height)
      return new Y(t, n, i - t, r - n)
    },
    include() {
      const e = C.read(arguments)
      const t = Math.min(this.x, e.x)
      const n = Math.min(this.y, e.y)
      const i = Math.max(this.x + this.width, e.x)
      const r = Math.max(this.y + this.height, e.y)
      return new Y(t, n, i - t, r - n)
    },
    expand() {
      const e = J.read(arguments)
      const t = e.width
      const n = e.height
      return new Y(this.x - t / 2, this.y - n / 2, this.width + t, this.height + n)
    },
    scale(e, t) {
      return this.expand(this.width * e - this.width, this.height * (t === a ? e : t) - this.height)
    },
  }, d.each([['Top', 'Left'], ['Top', 'Right'], ['Bottom', 'Left'], ['Bottom', 'Right'], ['Left', 'Center'], ['Top', 'Center'], ['Right', 'Center'], ['Bottom', 'Center']], function (e, t) {
    const n = e.join('')
    const i = /^[RL]/.test(n)
    t >= 4 && (e[1] += i ? 'Y' : 'X')
    const r = e[i ? 0 : 1]
    const s = e[i ? 1 : 0]
    const u = `get${r}`
    const o = `get${s}`
    const l = `set${r}`
    const f = `set${s}`
    const g = `get${n}`
    const y = `set${n}`
    this[g] = function (_) {
      const v = _ ? C : Q
      return new v(this[u](), this[o](), this, y)
    }
    ,
    this[y] = function () {
      const _ = C.read(arguments)
      this[l](_.x),
      this[f](_.y)
    }
  }, {
    beans: !0,
  }))
  const Me = Y.extend({
    initialize(t, n, i, r, s, u) {
      this._set(t, n, i, r, !0),
      this._owner = s,
      this._setter = u
    },
    _set(e, t, n, i, r) {
      return this._x = e,
      this._y = t,
      this._width = n,
      this._height = i,
      r || this._owner[this._setter](this),
      this
    },
  }, new function () {
    const e = Y.prototype
    return d.each(['x', 'y', 'width', 'height'], function (t) {
      const n = d.capitalize(t)
      const i = `_${t}`
      this[`get${n}`] = function () {
        return this[i]
      }
      ,
      this[`set${n}`] = function (r) {
        this[i] = r,
        this._dontNotify || this._owner[this._setter](this)
      }
    }, d.each(['Point', 'Size', 'Center', 'Left', 'Top', 'Right', 'Bottom', 'CenterX', 'CenterY', 'TopLeft', 'TopRight', 'BottomLeft', 'BottomRight', 'LeftCenter', 'TopCenter', 'RightCenter', 'BottomCenter'], function (t) {
      const n = `set${t}`
      this[n] = function () {
        this._dontNotify = !0,
        e[n].apply(this, arguments),
        this._dontNotify = !1,
        this._owner[this._setter](this)
      }
    }, {
      isSelected() {
        return !!(this._owner._selection & 2)
      },
      setSelected(t) {
        const n = this._owner
        n._changeSelection && n._changeSelection(2, t)
      },
    }))
  }(),
  )
  var le = d.extend({
    _class: 'Matrix',
    initialize: function e(t, n) {
      const i = arguments
      const r = i.length
      let s = !0
      if (r >= 6 ? this._set.apply(this, i) : r === 1 || r === 2 ? t instanceof e ? this._set(t._a, t._b, t._c, t._d, t._tx, t._ty, n) : Array.isArray(t) ? this._set.apply(this, n ? t.concat([n]) : t) : s = !1 : r ? s = !1 : this.reset(),
      !s)
        throw new Error('Unsupported matrix parameters')
      return this
    },
    set: '#initialize',
    _set(e, t, n, i, r, s, u) {
      return this._a = e,
      this._b = t,
      this._c = n,
      this._d = i,
      this._tx = r,
      this._ty = s,
      u || this._changed(),
      this
    },
    _serialize(e, t) {
      return d.serialize(this.getValues(), e, !0, t)
    },
    _changed() {
      const e = this._owner
      e && (e._applyMatrix ? e.transform(null, !0) : e._changed(25))
    },
    clone() {
      return new le(this._a, this._b, this._c, this._d, this._tx, this._ty)
    },
    equals(e) {
      return e === this || e && this._a === e._a && this._b === e._b && this._c === e._c && this._d === e._d && this._tx === e._tx && this._ty === e._ty
    },
    toString() {
      const e = k.instance
      return `[[${[e.number(this._a), e.number(this._c), e.number(this._tx)].join(', ')}], [${[e.number(this._b), e.number(this._d), e.number(this._ty)].join(', ')}]]`
    },
    reset(e) {
      return this._a = this._d = 1,
      this._b = this._c = this._tx = this._ty = 0,
      e || this._changed(),
      this
    },
    apply(e, t) {
      const n = this._owner
      return n
        ? (n.transform(null, d.pick(e, !0), t),
          this.isIdentity())
        : !1
    },
    translate() {
      const e = C.read(arguments)
      const t = e.x
      const n = e.y
      return this._tx += t * this._a + n * this._c,
      this._ty += t * this._b + n * this._d,
      this._changed(),
      this
    },
    scale() {
      const e = arguments
      const t = C.read(e)
      const n = C.read(e, 0, {
        readNull: !0,
      })
      return n && this.translate(n),
      this._a *= t.x,
      this._b *= t.x,
      this._c *= t.y,
      this._d *= t.y,
      n && this.translate(n.negate()),
      this._changed(),
      this
    },
    rotate(e) {
      e *= Math.PI / 180
      const t = C.read(arguments, 1)
      const n = t.x
      const i = t.y
      const r = Math.cos(e)
      const s = Math.sin(e)
      const u = n - n * r + i * s
      const o = i - n * s - i * r
      const l = this._a
      const f = this._b
      const g = this._c
      const y = this._d
      return this._a = r * l + s * g,
      this._b = r * f + s * y,
      this._c = -s * l + r * g,
      this._d = -s * f + r * y,
      this._tx += u * l + o * g,
      this._ty += u * f + o * y,
      this._changed(),
      this
    },
    shear() {
      const e = arguments
      const t = C.read(e)
      const n = C.read(e, 0, {
        readNull: !0,
      })
      n && this.translate(n)
      const i = this._a
      const r = this._b
      return this._a += t.y * this._c,
      this._b += t.y * this._d,
      this._c += t.x * i,
      this._d += t.x * r,
      n && this.translate(n.negate()),
      this._changed(),
      this
    },
    skew() {
      const e = arguments
      const t = C.read(e)
      const n = C.read(e, 0, {
        readNull: !0,
      })
      const i = Math.PI / 180
      const r = new C(Math.tan(t.x * i), Math.tan(t.y * i))
      return this.shear(r, n)
    },
    append(e, t) {
      if (e) {
        const n = this._a
        const i = this._b
        const r = this._c
        const s = this._d
        const u = e._a
        const o = e._c
        const l = e._b
        const f = e._d
        const g = e._tx
        const y = e._ty
        this._a = u * n + l * r,
        this._c = o * n + f * r,
        this._b = u * i + l * s,
        this._d = o * i + f * s,
        this._tx += g * n + y * r,
        this._ty += g * i + y * s,
        t || this._changed()
      }
      return this
    },
    prepend(e, t) {
      if (e) {
        const n = this._a
        const i = this._b
        const r = this._c
        const s = this._d
        const u = this._tx
        const o = this._ty
        const l = e._a
        const f = e._c
        const g = e._b
        const y = e._d
        const _ = e._tx
        const v = e._ty
        this._a = l * n + f * i,
        this._c = l * r + f * s,
        this._b = g * n + y * i,
        this._d = g * r + y * s,
        this._tx = l * u + f * o + _,
        this._ty = g * u + y * o + v,
        t || this._changed()
      }
      return this
    },
    appended(e) {
      return this.clone().append(e)
    },
    prepended(e) {
      return this.clone().prepend(e)
    },
    invert() {
      const e = this._a
      const t = this._b
      const n = this._c
      const i = this._d
      const r = this._tx
      const s = this._ty
      const u = e * i - t * n
      let o = null
      return u && !isNaN(u) && isFinite(r) && isFinite(s) && (this._a = i / u,
      this._b = -t / u,
      this._c = -n / u,
      this._d = e / u,
      this._tx = (n * s - i * r) / u,
      this._ty = (t * r - e * s) / u,
      o = this),
      o
    },
    inverted() {
      return this.clone().invert()
    },
    concatenate: '#append',
    preConcatenate: '#prepend',
    chain: '#appended',
    _shiftless() {
      return new le(this._a, this._b, this._c, this._d, 0, 0)
    },
    _orNullIfIdentity() {
      return this.isIdentity() ? null : this
    },
    isIdentity() {
      return this._a === 1 && this._b === 0 && this._c === 0 && this._d === 1 && this._tx === 0 && this._ty === 0
    },
    isInvertible() {
      const e = this._a * this._d - this._c * this._b
      return e && !isNaN(e) && isFinite(this._tx) && isFinite(this._ty)
    },
    isSingular() {
      return !this.isInvertible()
    },
    transform(e, t, n) {
      return arguments.length < 3 ? this._transformPoint(C.read(arguments)) : this._transformCoordinates(e, t, n)
    },
    _transformPoint(e, t, n) {
      const i = e.x
      const r = e.y
      return t || (t = new C()),
      t._set(i * this._a + r * this._c + this._tx, i * this._b + r * this._d + this._ty, n)
    },
    _transformCoordinates(e, t, n) {
      for (let i = 0, r = 2 * n; i < r; i += 2) {
        const s = e[i]
        const u = e[i + 1]
        t[i] = s * this._a + u * this._c + this._tx,
        t[i + 1] = s * this._b + u * this._d + this._ty
      }
      return t
    },
    _transformCorners(e) {
      const t = e.x
      const n = e.y
      const i = t + e.width
      const r = n + e.height
      const s = [t, n, i, n, i, r, t, r]
      return this._transformCoordinates(s, s, 4)
    },
    _transformBounds(e, t, n) {
      for (var i = this._transformCorners(e), r = i.slice(0, 2), s = r.slice(), u = 2; u < 8; u++) {
        const o = i[u]
        const l = u & 1
        o < r[l] ? r[l] = o : o > s[l] && (s[l] = o)
      }
      return t || (t = new Y()),
      t._set(r[0], r[1], s[0] - r[0], s[1] - r[1], n)
    },
    inverseTransform() {
      return this._inverseTransform(C.read(arguments))
    },
    _inverseTransform(e, t, n) {
      const i = this._a
      const r = this._b
      const s = this._c
      const u = this._d
      const o = this._tx
      const l = this._ty
      const f = i * u - r * s
      let g = null
      if (f && !isNaN(f) && isFinite(o) && isFinite(l)) {
        const y = e.x - this._tx
        const _ = e.y - this._ty
        t || (t = new C()),
        g = t._set((y * u - _ * s) / f, (_ * i - y * r) / f, n)
      }
      return g
    },
    decompose() {
      const e = this._a; const t = this._b; const n = this._c; const i = this._d; const r = e * i - t * n; const s = Math.sqrt; const u = Math.atan2; const o = 180 / Math.PI; let l; let f; let g
      if (e !== 0 || t !== 0) {
        const y = s(e * e + t * t)
        l = Math.acos(e / y) * (t > 0 ? 1 : -1),
        f = [y, r / y],
        g = [u(e * n + t * i, y * y), 0]
      }
      else if (n !== 0 || i !== 0) {
        const _ = s(n * n + i * i)
        l = Math.asin(n / _) * (i > 0 ? 1 : -1),
        f = [r / _, _],
        g = [0, u(e * n + t * i, _ * _)]
      }
      else {
        l = 0,
        g = f = [0, 0]
      }
      return {
        translation: this.getTranslation(),
        rotation: l * o,
        scaling: new C(f),
        skewing: new C(g[0] * o, g[1] * o),
      }
    },
    getValues() {
      return [this._a, this._b, this._c, this._d, this._tx, this._ty]
    },
    getTranslation() {
      return new C(this._tx, this._ty)
    },
    getScaling() {
      return this.decompose().scaling
    },
    getRotation() {
      return this.decompose().rotation
    },
    applyToContext(e) {
      this.isIdentity() || e.transform(this._a, this._b, this._c, this._d, this._tx, this._ty)
    },
  }, d.each(['a', 'b', 'c', 'd', 'tx', 'ty'], function (e) {
    const t = d.capitalize(e)
    const n = `_${e}`
    this[`get${t}`] = function () {
      return this[n]
    }
    ,
    this[`set${t}`] = function (i) {
      this[n] = i,
      this._changed()
    }
  }, {}))
  var Se = d.extend({
    _class: 'Line',
    initialize(t, n, i, r, s) {
      let u = !1
      arguments.length >= 4
        ? (this._px = t,
          this._py = n,
          this._vx = i,
          this._vy = r,
          u = s)
        : (this._px = t.x,
          this._py = t.y,
          this._vx = n.x,
          this._vy = n.y,
          u = i),
      u || (this._vx -= this._px,
      this._vy -= this._py)
    },
    getPoint() {
      return new C(this._px, this._py)
    },
    getVector() {
      return new C(this._vx, this._vy)
    },
    getLength() {
      return this.getVector().getLength()
    },
    intersect(e, t) {
      return Se.intersect(this._px, this._py, this._vx, this._vy, e._px, e._py, e._vx, e._vy, !0, t)
    },
    getSide(e, t) {
      return Se.getSide(this._px, this._py, this._vx, this._vy, e.x, e.y, !0, t)
    },
    getDistance(e) {
      return Math.abs(this.getSignedDistance(e))
    },
    getSignedDistance(e) {
      return Se.getSignedDistance(this._px, this._py, this._vx, this._vy, e.x, e.y, !0)
    },
    isCollinear(e) {
      return C.isCollinear(this._vx, this._vy, e._vx, e._vy)
    },
    isOrthogonal(e) {
      return C.isOrthogonal(this._vx, this._vy, e._vx, e._vy)
    },
    statics: {
      intersect(e, t, n, i, r, s, u, o, l, f) {
        l || (n -= e,
        i -= t,
        u -= r,
        o -= s)
        const g = n * o - i * u
        if (!O.isMachineZero(g)) {
          const y = e - r
          const _ = t - s
          let v = (u * _ - o * y) / g
          const b = (n * _ - i * y) / g
          const T = 1e-12
          const x = -T
          const S = 1 + T
          if (f || x < v && v < S && x < b && b < S) {
            return f || (v = v <= 0 ? 0 : v >= 1 ? 1 : v),
            new C(e + v * n, t + v * i)
          }
        }
      },
      getSide(e, t, n, i, r, s, u, o) {
        u || (n -= e,
        i -= t)
        const l = r - e
        const f = s - t
        let g = l * i - f * n
        return !o && O.isMachineZero(g) && (g = (l * n + l * n) / (n * n + i * i),
        g >= 0 && g <= 1 && (g = 0)),
        g < 0 ? -1 : g > 0 ? 1 : 0
      },
      getSignedDistance(e, t, n, i, r, s, u) {
        return u || (n -= e,
        i -= t),
        n === 0 ? i > 0 ? r - e : e - r : i === 0 ? n < 0 ? s - t : t - s : ((r - e) * i - (s - t) * n) / (i > n ? i * Math.sqrt(1 + n * n / (i * i)) : n * Math.sqrt(1 + i * i / (n * n)))
      },
      getDistance(e, t, n, i, r, s, u) {
        return Math.abs(Se.getSignedDistance(e, t, n, i, r, s, u))
      },
    },
  })
  var ye = Z.extend({
    _class: 'Project',
    _list: 'projects',
    _reference: 'project',
    _compactSerialize: !0,
    initialize(t) {
      Z.call(this, !0),
      this._children = [],
      this._namedChildren = {},
      this._activeLayer = null,
      this._currentStyle = new Kt(null, null, this),
      this._view = Ke.create(this, t || Je.getCanvas(1, 1)),
      this._selectionItems = {},
      this._selectionCount = 0,
      this._updateVersion = 0
    },
    _serialize(e, t) {
      return d.serialize(this._children, e, !0, t)
    },
    _changed(e, t) {
      if (e & 1) {
        const n = this._view
        n && (n._needsUpdate = !0,
        !n._requested && n._autoUpdate && n.requestUpdate())
      }
      const i = this._changes
      if (i && t) {
        const r = this._changesById
        const s = t._id
        const u = r[s]
        u
          ? u.flags |= e
          : i.push(r[s] = {
            item: t,
            flags: e,
          })
      }
    },
    clear() {
      for (let e = this._children, t = e.length - 1; t >= 0; t--)
        e[t].remove()
    },
    isEmpty() {
      return !this._children.length
    },
    remove: function e() {
      return e.base.call(this)
        ? (this._view && this._view.remove(),
          !0)
        : !1
    },
    getView() {
      return this._view
    },
    getCurrentStyle() {
      return this._currentStyle
    },
    setCurrentStyle(e) {
      this._currentStyle.set(e)
    },
    getIndex() {
      return this._index
    },
    getOptions() {
      return this._scope.settings
    },
    getLayers() {
      return this._children
    },
    getActiveLayer() {
      return this._activeLayer || new ct({
        project: this,
        insert: !0,
      })
    },
    getSymbolDefinitions() {
      const e = []
      const t = {}
      return this.getItems({
        class: ft,
        match(n) {
          const i = n._definition
          const r = i._id
          return t[r] || (t[r] = !0,
          e.push(i)),
          !1
        },
      }),
      e
    },
    getSymbols: 'getSymbolDefinitions',
    getSelectedItems() {
      const e = this._selectionItems
      const t = []
      for (const n in e) {
        const i = e[n]
        const r = i._selection
        r & 1 && i.isInserted() ? t.push(i) : r || this._updateSelection(i)
      }
      return t
    },
    _updateSelection(e) {
      const t = e._id
      const n = this._selectionItems
      e._selection
        ? n[t] !== e && (this._selectionCount++,
        n[t] = e)
        : n[t] === e && (this._selectionCount--,
        delete n[t])
    },
    selectAll() {
      for (let e = this._children, t = 0, n = e.length; t < n; t++)
        e[t].setFullySelected(!0)
    },
    deselectAll() {
      const e = this._selectionItems
      for (const t in e)
        e[t].setFullySelected(!1)
    },
    addLayer(e) {
      return this.insertLayer(a, e)
    },
    insertLayer(e, t) {
      if (t instanceof ct) {
        t._remove(!1, !0),
        d.splice(this._children, [t], e, 0),
        t._setProject(this, !0)
        const n = t._name
        n && t.setName(n),
        this._changes && t._changed(5),
        this._activeLayer || (this._activeLayer = t)
      }
      else { t = null }
      return t
    },
    _insertItem(e, t, n) {
      return t = this.insertLayer(e, t) || (this._activeLayer || this._insertItem(a, new ct(oe.NO_INSERT), !0)).insertChild(e, t),
      n && t.activate && t.activate(),
      t
    },
    getItems(e) {
      return oe._getItems(this, e)
    },
    getItem(e) {
      return oe._getItems(this, e, null, null, !0)[0] || null
    },
    importJSON(e) {
      this.activate()
      const t = this._activeLayer
      return d.importJSON(e, t && t.isEmpty() && t)
    },
    removeOn(e) {
      const t = this._removeSets
      if (t) {
        e === 'mouseup' && (t.mousedrag = null)
        const n = t[e]
        if (n) {
          for (const i in n) {
            const r = n[i]
            for (const s in t) {
              const u = t[s]
              u && u != n && delete u[r._id]
            }
            r.remove()
          }
          t[e] = null
        }
      }
    },
    draw(e, t, n) {
      this._updateVersion++,
      e.save(),
      t.applyToContext(e)
      for (let i = this._children, r = new d({
          offset: new C(0, 0),
          pixelRatio: n,
          viewMatrix: t.isIdentity() ? null : t,
          matrices: [new le()],
          updateMatrix: !0,
        }), s = 0, u = i.length; s < u; s++)
        i[s].draw(e, r)
      if (e.restore(),
      this._selectionCount > 0) {
        e.save(),
        e.strokeWidth = 1
        const o = this._selectionItems
        const l = this._scope.settings.handleSize
        const f = this._updateVersion
        for (const g in o)
          o[g]._drawSelection(e, t, l, o, f)
        e.restore()
      }
    },
  })
  var oe = d.extend(M, {
    statics: {
      extend: function e(t) {
        return t._serializeFields && (t._serializeFields = d.set({}, this.prototype._serializeFields, t._serializeFields)),
        e.base.apply(this, arguments)
      },
      INSERT: {
        insert: !0,
      },
      NO_INSERT: {
        insert: !1,
      },
    },
    _class: 'Item',
    _name: null,
    _applyMatrix: !0,
    _canApplyMatrix: !0,
    _canScaleStroke: !1,
    _pivot: null,
    _visible: !0,
    _blendMode: 'normal',
    _opacity: 1,
    _locked: !1,
    _guide: !1,
    _clipMask: !1,
    _selection: 0,
    _selectBounds: !0,
    _selectChildren: !1,
    _serializeFields: {
      name: null,
      applyMatrix: null,
      matrix: new le(),
      pivot: null,
      visible: !0,
      blendMode: 'normal',
      opacity: 1,
      locked: !1,
      guide: !1,
      clipMask: !1,
      selected: !1,
      data: {},
    },
    _prioritize: ['applyMatrix'],
  }, new function () {
    const e = ['onMouseDown', 'onMouseUp', 'onMouseDrag', 'onClick', 'onDoubleClick', 'onMouseMove', 'onMouseEnter', 'onMouseLeave']
    return d.each(e, function (t) {
      this._events[t] = {
        install(n) {
          this.getView()._countItemEvent(n, 1)
        },
        uninstall(n) {
          this.getView()._countItemEvent(n, -1)
        },
      }
    }, {
      _events: {
        onFrame: {
          install() {
            this.getView()._animateItem(this, !0)
          },
          uninstall() {
            this.getView()._animateItem(this, !1)
          },
        },
        onLoad: {},
        onError: {},
      },
      statics: {
        _itemHandlers: e,
      },
    })
  }()
  , {
    initialize() {},
    _initialize(e, t) {
      const n = e && d.isPlainObject(e)
      const i = n && e.internal === !0
      const r = this._matrix = new le()
      const s = n && e.project || ae.project
      const u = ae.settings
      return this._id = i ? null : B.get(),
      this._parent = this._index = null,
      this._applyMatrix = this._canApplyMatrix && u.applyMatrix,
      t && r.translate(t),
      r._owner = this,
      this._style = new Kt(s._currentStyle, this, s),
      i || n && e.insert == !1 || !u.insertItems && !(n && e.insert == !0) ? this._setProject(s) : (n && e.parent || s)._insertItem(a, this, !0),
      n && e !== oe.NO_INSERT && e !== oe.INSERT && this.set(e, {
        internal: !0,
        insert: !0,
        project: !0,
        parent: !0,
      }),
      n
    },
    _serialize(e, t) {
      const n = {}
      const i = this
      function r(s) {
        for (const u in s) {
          const o = i[u]
          d.equals(o, u === 'leading' ? s.fontSize * 1.2 : s[u]) || (n[u] = d.serialize(o, e, u !== 'data', t))
        }
      }
      return r(this._serializeFields),
      this instanceof We || r(this._style._defaults),
      [this._class, n]
    },
    _changed(e) {
      const t = this._symbol
      const n = this._parent || t
      const i = this._project
      e & 8 && (this._bounds = this._position = this._decomposed = a),
      e & 16 && (this._globalMatrix = a),
      n && e & 72 && oe._clearBoundsCache(n),
      e & 2 && oe._clearBoundsCache(this),
      i && i._changed(e, this),
      t && t._changed(e)
    },
    getId() {
      return this._id
    },
    getName() {
      return this._name
    },
    setName(e) {
      if (this._name && this._removeNamed(),
      e === `${+e}`)
        throw new Error('Names consisting only of numbers are not supported.')
      const t = this._getOwner()
      if (e && t) {
        const n = t._children
        const i = t._namedChildren;
        (i[e] = i[e] || []).push(this),
        e in n || (n[e] = this)
      }
      this._name = e || a,
      this._changed(256)
    },
    getStyle() {
      return this._style
    },
    setStyle(e) {
      this.getStyle().set(e)
    },
  }, d.each(['locked', 'visible', 'blendMode', 'opacity', 'guide'], function (e) {
    const t = d.capitalize(e)
    const n = `_${e}`
    const i = {
      locked: 256,
      visible: 265,
    }
    this[`get${t}`] = function () {
      return this[n]
    }
    ,
    this[`set${t}`] = function (r) {
      r != this[n] && (this[n] = r,
      this._changed(i[e] || 257))
    }
  }, {}), {
    beans: !0,
    getSelection() {
      return this._selection
    },
    setSelection(e) {
      if (e !== this._selection) {
        this._selection = e
        const t = this._project
        t && (t._updateSelection(this),
        this._changed(257))
      }
    },
    _changeSelection(e, t) {
      const n = this._selection
      this.setSelection(t ? n | e : n & ~e)
    },
    isSelected() {
      if (this._selectChildren) {
        for (let e = this._children, t = 0, n = e.length; t < n; t++) {
          if (e[t].isSelected())
            return !0
        }
      }
      return !!(this._selection & 1)
    },
    setSelected(e) {
      if (this._selectChildren) {
        for (let t = this._children, n = 0, i = t.length; n < i; n++)
          t[n].setSelected(e)
      }
      this._changeSelection(1, e)
    },
    isFullySelected() {
      const e = this._children
      const t = !!(this._selection & 1)
      if (e && t) {
        for (let n = 0, i = e.length; n < i; n++) {
          if (!e[n].isFullySelected())
            return !1
        }
        return !0
      }
      return t
    },
    setFullySelected(e) {
      const t = this._children
      if (t) {
        for (let n = 0, i = t.length; n < i; n++)
          t[n].setFullySelected(e)
      }
      this._changeSelection(1, e)
    },
    isClipMask() {
      return this._clipMask
    },
    setClipMask(e) {
      this._clipMask != (e = !!e) && (this._clipMask = e,
      e && (this.setFillColor(null),
      this.setStrokeColor(null)),
      this._changed(257),
      this._parent && this._parent._changed(2048))
    },
    getData() {
      return this._data || (this._data = {}),
      this._data
    },
    setData(e) {
      this._data = e
    },
    getPosition(e) {
      const t = e ? C : Q
      const n = this._position || (this._position = this._getPositionFromBounds())
      return new t(n.x, n.y, this, 'setPosition')
    },
    setPosition() {
      this.translate(C.read(arguments).subtract(this.getPosition(!0)))
    },
    _getPositionFromBounds(e) {
      return this._pivot ? this._matrix._transformPoint(this._pivot) : (e || this.getBounds()).getCenter(!0)
    },
    getPivot() {
      const e = this._pivot
      return e ? new Q(e.x, e.y, this, 'setPivot') : null
    },
    setPivot() {
      this._pivot = C.read(arguments, 0, {
        clone: !0,
        readNull: !0,
      }),
      this._position = a
    },
  }, d.each({
    getStrokeBounds: {
      stroke: !0,
    },
    getHandleBounds: {
      handle: !0,
    },
    getInternalBounds: {
      internal: !0,
    },
  }, function (e, t) {
    this[t] = function (n) {
      return this.getBounds(n, e)
    }
  }, {
    beans: !0,
    getBounds(e, t) {
      const n = t || e instanceof le
      const i = d.set({}, n ? t : e, this._boundsOptions);
      (!i.stroke || this.getStrokeScaling()) && (i.cacheItem = this)
      const r = this._getCachedBounds(n && e, i).rect
      return arguments.length ? r : new Me(r.x, r.y, r.width, r.height, this, 'setBounds')
    },
    setBounds() {
      const e = Y.read(arguments)
      let t = this.getBounds()
      const n = this._matrix
      const i = new le()
      let r = e.getCenter()
      i.translate(r),
      (e.width != t.width || e.height != t.height) && (n.isInvertible() || (n.set(n._backup || new le().translate(n.getTranslation())),
      t = this.getBounds()),
      i.scale(t.width !== 0 ? e.width / t.width : 0, t.height !== 0 ? e.height / t.height : 0)),
      r = t.getCenter(),
      i.translate(-r.x, -r.y),
      this.transform(i)
    },
    _getBounds(e, t) {
      const n = this._children
      return !n || !n.length
        ? new Y()
        : (oe._updateBoundsCache(this, t.cacheItem),
          oe._getBounds(n, e, t))
    },
    _getBoundsCacheKey(e, t) {
      return [e.stroke ? 1 : 0, e.handle ? 1 : 0, t ? 1 : 0].join('')
    },
    _getCachedBounds(e, t, n) {
      e = e && e._orNullIfIdentity()
      const i = t.internal && !n
      const r = t.cacheItem
      const s = i ? null : this._matrix._orNullIfIdentity()
      const u = r && (!e || e.equals(s)) && this._getBoundsCacheKey(t, i)
      let o = this._bounds
      if (oe._updateBoundsCache(this._parent || this._symbol, r),
      u && o && u in o) {
        var l = o[u]
        return {
          rect: l.rect.clone(),
          nonscaling: l.nonscaling,
        }
      }
      const f = this._getBounds(e || s, t)
      const g = f.rect || f
      const y = this._style
      const _ = f.nonscaling || y.hasStroke() && !y.getStrokeScaling()
      if (u) {
        o || (this._bounds = o = {})
        var l = o[u] = {
          rect: g.clone(),
          nonscaling: _,
          internal: i,
        }
      }
      return {
        rect: g,
        nonscaling: _,
      }
    },
    _getStrokeMatrix(e, t) {
      const n = this.getStrokeScaling() ? null : t && t.internal ? this : this._parent || this._symbol && this._symbol._item
      const i = n ? n.getViewMatrix().invert() : e
      return i && i._shiftless()
    },
    statics: {
      _updateBoundsCache(e, t) {
        if (e && t) {
          const n = t._id
          const i = e._boundsCache = e._boundsCache || {
            ids: {},
            list: [],
          }
          i.ids[n] || (i.list.push(t),
          i.ids[n] = t)
        }
      },
      _clearBoundsCache(e) {
        const t = e._boundsCache
        if (t) {
          e._bounds = e._position = e._boundsCache = a
          for (let n = 0, i = t.list, r = i.length; n < r; n++) {
            const s = i[n]
            s !== e && (s._bounds = s._position = a,
            s._boundsCache && oe._clearBoundsCache(s))
          }
        }
      },
      _getBounds(e, t, n) {
        let i = 1 / 0
        let r = -i
        let s = i
        let u = r
        let o = !1
        n = n || {}
        for (let l = 0, f = e.length; l < f; l++) {
          const g = e[l]
          if (g._visible && !g.isEmpty(!0)) {
            const y = g._getCachedBounds(t && t.appended(g._matrix), n, !0)
            const _ = y.rect
            i = Math.min(_.x, i),
            s = Math.min(_.y, s),
            r = Math.max(_.x + _.width, r),
            u = Math.max(_.y + _.height, u),
            y.nonscaling && (o = !0)
          }
        }
        return {
          rect: isFinite(i) ? new Y(i, s, r - i, u - s) : new Y(),
          nonscaling: o,
        }
      },
    },
  }), {
    beans: !0,
    _decompose() {
      return this._applyMatrix ? null : this._decomposed || (this._decomposed = this._matrix.decompose())
    },
    getRotation() {
      const e = this._decompose()
      return e ? e.rotation : 0
    },
    setRotation(e) {
      const t = this.getRotation()
      if (t != null && e != null) {
        const n = this._decomposed
        this.rotate(e - t),
        n && (n.rotation = e,
        this._decomposed = n)
      }
    },
    getScaling() {
      const e = this._decompose()
      const t = e && e.scaling
      return new Q(t ? t.x : 1, t ? t.y : 1, this, 'setScaling')
    },
    setScaling() {
      const e = this.getScaling()
      const t = C.read(arguments, 0, {
        clone: !0,
        readNull: !0,
      })
      if (e && t && !e.equals(t)) {
        const n = this.getRotation()
        const i = this._decomposed
        const r = new le()
        const s = O.isZero
        if (s(e.x) || s(e.y)) {
          r.translate(i.translation),
          n && r.rotate(n),
          r.scale(t.x, t.y),
          this._matrix.set(r)
        }
        else {
          const u = this.getPosition(!0)
          r.translate(u),
          n && r.rotate(n),
          r.scale(t.x / e.x, t.y / e.y),
          n && r.rotate(-n),
          r.translate(u.negate()),
          this.transform(r)
        }
        i && (i.scaling = t,
        this._decomposed = i)
      }
    },
    getMatrix() {
      return this._matrix
    },
    setMatrix() {
      const e = this._matrix
      e.set.apply(e, arguments)
    },
    getGlobalMatrix(e) {
      let t = this._globalMatrix
      if (t) {
        for (var n = this._parent, i = []; n;) {
          if (!n._globalMatrix) {
            t = null
            for (let r = 0, s = i.length; r < s; r++)
              i[r]._globalMatrix = null
            break
          }
          i.push(n),
          n = n._parent
        }
      }
      if (!t) {
        t = this._globalMatrix = this._matrix.clone()
        var n = this._parent
        n && t.prepend(n.getGlobalMatrix(!0))
      }
      return e ? t : t.clone()
    },
    getViewMatrix() {
      return this.getGlobalMatrix().prepend(this.getView()._matrix)
    },
    getApplyMatrix() {
      return this._applyMatrix
    },
    setApplyMatrix(e) {
      (this._applyMatrix = this._canApplyMatrix && !!e) && this.transform(null, !0)
    },
    getTransformContent: '#getApplyMatrix',
    setTransformContent: '#setApplyMatrix',
  }, {
    getProject() {
      return this._project
    },
    _setProject(e, t) {
      if (this._project !== e) {
        this._project && this._installEvents(!1),
        this._project = e
        for (let n = this._children, i = 0, r = n && n.length; i < r; i++)
          n[i]._setProject(e)
        t = !0
      }
      t && this._installEvents(!0)
    },
    getView() {
      return this._project._view
    },
    _installEvents: function e(t) {
      e.base.call(this, t)
      for (let n = this._children, i = 0, r = n && n.length; i < r; i++)
        n[i]._installEvents(t)
    },
    getLayer() {
      for (let e = this; e = e._parent;) {
        if (e instanceof ct)
          return e
      }
      return null
    },
    getParent() {
      return this._parent
    },
    setParent(e) {
      return e.addChild(this)
    },
    _getOwner: '#getParent',
    getChildren() {
      return this._children
    },
    setChildren(e) {
      this.removeChildren(),
      this.addChildren(e)
    },
    getFirstChild() {
      return this._children && this._children[0] || null
    },
    getLastChild() {
      return this._children && this._children[this._children.length - 1] || null
    },
    getNextSibling() {
      const e = this._getOwner()
      return e && e._children[this._index + 1] || null
    },
    getPreviousSibling() {
      const e = this._getOwner()
      return e && e._children[this._index - 1] || null
    },
    getIndex() {
      return this._index
    },
    equals(e) {
      return e === this || e && this._class === e._class && this._style.equals(e._style) && this._matrix.equals(e._matrix) && this._locked === e._locked && this._visible === e._visible && this._blendMode === e._blendMode && this._opacity === e._opacity && this._clipMask === e._clipMask && this._guide === e._guide && this._equals(e) || !1
    },
    _equals(e) {
      return d.equals(this._children, e._children)
    },
    clone(e) {
      const t = new this.constructor(oe.NO_INSERT)
      var n = this._children
      const i = d.pick(e ? e.insert : a, e === a || e === !0)
      const r = d.pick(e ? e.deep : a, !0)
      n && t.copyAttributes(this),
      (!n || r) && t.copyContent(this),
      n || t.copyAttributes(this),
      i && t.insertAbove(this)
      let s = this._name
      const u = this._parent
      if (s && u) {
        for (var n = u._children, o = s, l = 1; n[s];)
          s = `${o} ${l++}`
        s !== o && t.setName(s)
      }
      return t
    },
    copyContent(e) {
      for (let t = e._children, n = 0, i = t && t.length; n < i; n++)
        this.addChild(t[n].clone(!1), !0)
    },
    copyAttributes(e, t) {
      this.setStyle(e._style)
      for (let n = ['_locked', '_visible', '_blendMode', '_opacity', '_clipMask', '_guide'], i = 0, r = n.length; i < r; i++) {
        const s = n[i]
        e.hasOwnProperty(s) && (this[s] = e[s])
      }
      t || this._matrix.set(e._matrix, !0),
      this.setApplyMatrix(e._applyMatrix),
      this.setPivot(e._pivot),
      this.setSelection(e._selection)
      const u = e._data
      const o = e._name
      this._data = u ? d.clone(u) : null,
      o && this.setName(o)
    },
    rasterize(e, t) {
      let n, i, r
      d.isPlainObject(e)
        ? (n = e.resolution,
          i = e.insert,
          r = e.raster)
        : (n = e,
          i = t),
      r || (r = new Pt(oe.NO_INSERT))
      const s = this.getStrokeBounds()
      const u = (n || this.getView().getResolution()) / 72
      const o = s.getTopLeft().floor()
      const l = s.getBottomRight().ceil()
      const f = new J(l.subtract(o))
      const g = f.multiply(u)
      if (r.setSize(g, !0),
      !g.isZero()) {
        const y = r.getContext(!0)
        const _ = new le().scale(u).translate(o.negate())
        y.save(),
        _.applyToContext(y),
        this.draw(y, new d({
          matrices: [_],
        })),
        y.restore()
      }
      return r._matrix.set(new le().translate(o.add(f.divide(2))).scale(1 / u)),
      (i === a || i) && r.insertAbove(this),
      r
    },
    contains() {
      const e = this._matrix
      return e.isInvertible() && !!this._contains(e._inverseTransform(C.read(arguments)))
    },
    _contains(e) {
      const t = this._children
      if (t) {
        for (let n = t.length - 1; n >= 0; n--) {
          if (t[n].contains(e))
            return !0
        }
        return !1
      }
      return e.isInside(this.getInternalBounds())
    },
    isInside() {
      return Y.read(arguments).contains(this.getBounds())
    },
    _asPathItem() {
      return new ke.Rectangle({
        rectangle: this.getInternalBounds(),
        matrix: this._matrix,
        insert: !1,
      })
    },
    intersects(e, t) {
      return e instanceof oe ? this._asPathItem().getIntersections(e._asPathItem(), null, t, !0).length > 0 : !1
    },
  }, new function () {
    function e() {
      const i = arguments
      return this._hitTest(C.read(i), qe.getOptions(i))
    }
    function t() {
      const i = arguments
      const r = C.read(i)
      const s = qe.getOptions(i)
      const u = []
      return this._hitTest(r, new d({
        all: u,
      }, s)),
      u
    }
    function n(i, r, s, u) {
      const o = this._children
      if (o) {
        for (let l = o.length - 1; l >= 0; l--) {
          const f = o[l]
          const g = f !== u && f._hitTest(i, r, s)
          if (g && !r.all)
            return g
        }
      }
      return null
    }
    return ye.inject({
      hitTest: e,
      hitTestAll: t,
      _hitTest: n,
    }),
    {
      hitTest: e,
      hitTestAll: t,
      _hitTestChildren: n,
    }
  }()
  , {
    _hitTest(e, t, n) {
      if (this._locked || !this._visible || this._guide && !t.guides || this.isEmpty())
        return null
      const i = this._matrix
      const r = n ? n.appended(i) : this.getGlobalMatrix().prepend(this.getView()._matrix)
      const s = Math.max(t.tolerance, 1e-12)
      const u = t._tolerancePadding = new J(ke._getStrokePadding(s, i._shiftless().invert()))
      if (e = i._inverseTransform(e),
      !e || !this._children && !this.getBounds({
        internal: !0,
        stroke: !0,
        handle: !0,
      }).expand(u.multiply(2))._containsPoint(e))
        return null
      const o = !(t.guides && !this._guide || t.selected && !this.isSelected() || t.type && t.type !== d.hyphenate(this._class) || t.class && !(this instanceof t.class)); const l = t.match; const f = this; let g; let y
      function _(m) {
        return m && l && !l(m) && (m = null),
        m && t.all && t.all.push(m),
        m
      }
      function v(m, w) {
        const E = w ? g[`get${w}`]() : f.getPosition()
        if (e.subtract(E).divide(u).length <= 1) {
          return new qe(m, f, {
            name: w ? d.hyphenate(w) : m,
            point: E,
          })
        }
      }
      const b = t.position
      const T = t.center
      const x = t.bounds
      if (o && this._parent && (b || T || x)) {
        if ((T || x) && (g = this.getInternalBounds()),
        y = b && v('position') || T && v('center', 'Center'),
        !y && x) {
          for (let S = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight', 'LeftCenter', 'TopCenter', 'RightCenter', 'BottomCenter'], I = 0; I < 8 && !y; I++)
            y = v('bounds', S[I])
        }
        y = _(y)
      }
      return y || (y = this._hitTestChildren(e, t, r) || o && _(this._hitTestSelf(e, t, r, this.getStrokeScaling() ? null : r._shiftless().invert())) || null),
      y && y.point && (y.point = i.transform(y.point)),
      y
    },
    _hitTestSelf(e, t) {
      if (t.fill && this.hasFill() && this._contains(e))
        return new qe('fill', this)
    },
    matches(e, t) {
      function n(u, o) {
        for (const l in u) {
          if (u.hasOwnProperty(l)) {
            const f = u[l]
            let g = o[l]
            if (d.isPlainObject(f) && d.isPlainObject(g)) {
              if (!n(f, g))
                return !1
            }
            else if (!d.equals(f, g)) { return !1 }
          }
        }
        return !0
      }
      const i = typeof e
      if (i === 'object') {
        for (const r in e) {
          if (e.hasOwnProperty(r) && !this.matches(r, e[r]))
            return !1
        }
        return !0
      }
      else {
        if (i === 'function')
          return e(this)
        if (e === 'match')
          return t(this)
        let s = /^(empty|editable)$/.test(e) ? this[`is${d.capitalize(e)}`]() : e === 'type' ? d.hyphenate(this._class) : this[e]
        if (e === 'class') {
          if (typeof t == 'function')
            return this instanceof t
          s = this._class
        }
        if (typeof t == 'function')
          return !!t(s)
        if (t) {
          if (t.test)
            return t.test(s)
          if (d.isPlainObject(t))
            return n(t, s)
        }
        return d.equals(s, t)
      }
    },
    getItems(e) {
      return oe._getItems(this, e, this._matrix)
    },
    getItem(e) {
      return oe._getItems(this, e, this._matrix, null, !0)[0] || null
    },
    statics: {
      _getItems: function e(t, n, i, r, s) {
        if (!r) {
          const u = typeof n == 'object' && n
          const o = u && u.overlapping
          const l = u && u.inside
          var f = o || l
          var _ = f && Y.read([f])
          r = {
            items: [],
            recursive: u && u.recursive !== !1,
            inside: !!l,
            overlapping: !!o,
            rect: _,
            path: o && new ke.Rectangle({
              rectangle: _,
              insert: !1,
            }),
          },
          u && (n = d.filter({}, n, {
            recursive: !0,
            inside: !0,
            overlapping: !0,
          }))
        }
        const g = t._children
        const y = r.items
        var _ = r.rect
        i = _ && (i || new le())
        for (let v = 0, b = g && g.length; v < b; v++) {
          const T = g[v]
          const x = i && i.appended(T._matrix)
          let S = !0
          if (_) {
            var f = T.getBounds(x)
            if (!_.intersects(f))
              continue
            _.contains(f) || r.overlapping && (f.contains(_) || r.path.intersects(T, x)) || (S = !1)
          }
          if (S && T.matches(n) && (y.push(T),
          s) || (r.recursive !== !1 && e(T, n, x, r, s),
          s && y.length > 0))
            break
        }
        return y
      },
    },
  }, {
    importJSON(e) {
      const t = d.importJSON(e, this)
      return t !== this ? this.addChild(t) : t
    },
    addChild(e) {
      return this.insertChild(a, e)
    },
    insertChild(e, t) {
      const n = t ? this.insertChildren(e, [t]) : null
      return n && n[0]
    },
    addChildren(e) {
      return this.insertChildren(this._children.length, e)
    },
    insertChildren(e, t) {
      const n = this._children
      if (n && t && t.length > 0) {
        t = d.slice(t)
        for (var i = {}, r = t.length - 1; r >= 0; r--) {
          var s = t[r]
          const u = s && s._id
          !s || i[u]
            ? t.splice(r, 1)
            : (s._remove(!1, !0),
              i[u] = !0)
        }
        d.splice(n, t, e, 0)
        for (var o = this._project, l = o._changes, r = 0, f = t.length; r < f; r++) {
          var s = t[r]
          const g = s._name
          s._parent = this,
          s._setProject(o, !0),
          g && s.setName(g),
          l && s._changed(5)
        }
        this._changed(11)
      }
      else { t = null }
      return t
    },
    _insertItem: '#insertChild',
    _insertAt(e, t) {
      const n = e && e._getOwner()
      const i = e !== this && n ? this : null
      return i && (i._remove(!1, !0),
      n._insertItem(e._index + t, i)),
      i
    },
    insertAbove(e) {
      return this._insertAt(e, 1)
    },
    insertBelow(e) {
      return this._insertAt(e, 0)
    },
    sendToBack() {
      const e = this._getOwner()
      return e ? e._insertItem(0, this) : null
    },
    bringToFront() {
      const e = this._getOwner()
      return e ? e._insertItem(a, this) : null
    },
    appendTop: '#addChild',
    appendBottom(e) {
      return this.insertChild(0, e)
    },
    moveAbove: '#insertAbove',
    moveBelow: '#insertBelow',
    addTo(e) {
      return e._insertItem(a, this)
    },
    copyTo(e) {
      return this.clone(!1).addTo(e)
    },
    reduce(e) {
      const t = this._children
      if (t && t.length === 1) {
        const n = t[0].reduce(e)
        return this._parent
          ? (n.insertAbove(this),
            this.remove())
          : n.remove(),
        n
      }
      return this
    },
    _removeNamed() {
      const e = this._getOwner()
      if (e) {
        const t = e._children
        const n = e._namedChildren
        const i = this._name
        const r = n[i]
        const s = r ? r.indexOf(this) : -1
        s !== -1 && (t[i] == this && delete t[i],
        r.splice(s, 1),
        r.length ? t[i] = r[0] : delete n[i])
      }
    },
    _remove(e, t) {
      const n = this._getOwner()
      const i = this._project
      const r = this._index
      return this._style && this._style._dispose(),
      n
        ? (this._name && this._removeNamed(),
          r != null && (i._activeLayer === this && (i._activeLayer = this.getNextSibling() || this.getPreviousSibling()),
          d.splice(n._children, null, r, 1)),
          this._installEvents(!1),
          e && i._changes && this._changed(5),
          t && n._changed(11, this),
          this._parent = null,
          !0)
        : !1
    },
    remove() {
      return this._remove(!0, !0)
    },
    replaceWith(e) {
      const t = e && e.insertBelow(this)
      return t && this.remove(),
      t
    },
    removeChildren(e, t) {
      if (!this._children)
        return null
      e = e || 0,
      t = d.pick(t, this._children.length)
      for (var n = d.splice(this._children, null, e, t - e), i = n.length - 1; i >= 0; i--)
        n[i]._remove(!0, !1)
      return n.length > 0 && this._changed(11),
      n
    },
    clear: '#removeChildren',
    reverseChildren() {
      if (this._children) {
        this._children.reverse()
        for (let e = 0, t = this._children.length; e < t; e++)
          this._children[e]._index = e
        this._changed(11)
      }
    },
    isEmpty(e) {
      const t = this._children
      const n = t ? t.length : 0
      if (e) {
        for (let i = 0; i < n; i++) {
          if (!t[i].isEmpty(e))
            return !1
        }
        return !0
      }
      return !n
    },
    isEditable() {
      for (let e = this; e;) {
        if (!e._visible || e._locked)
          return !1
        e = e._parent
      }
      return !0
    },
    hasFill() {
      return this.getStyle().hasFill()
    },
    hasStroke() {
      return this.getStyle().hasStroke()
    },
    hasShadow() {
      return this.getStyle().hasShadow()
    },
    _getOrder(e) {
      function t(u) {
        const o = []
        do
          o.unshift(u)
        while (u = u._parent)
        return o
      }
      for (let n = t(this), i = t(e), r = 0, s = Math.min(n.length, i.length); r < s; r++) {
        if (n[r] != i[r])
          return n[r]._index < i[r]._index ? 1 : -1
      }
      return 0
    },
    hasChildren() {
      return this._children && this._children.length > 0
    },
    isInserted() {
      return this._parent ? this._parent.isInserted() : !1
    },
    isAbove(e) {
      return this._getOrder(e) === -1
    },
    isBelow(e) {
      return this._getOrder(e) === 1
    },
    isParent(e) {
      return this._parent === e
    },
    isChild(e) {
      return e && e._parent === this
    },
    isDescendant(e) {
      for (let t = this; t = t._parent;) {
        if (t === e)
          return !0
      }
      return !1
    },
    isAncestor(e) {
      return e ? e.isDescendant(this) : !1
    },
    isSibling(e) {
      return this._parent === e._parent
    },
    isGroupedWith(e) {
      for (let t = this._parent; t;) {
        if (t._parent && /^(Group|Layer|CompoundPath)$/.test(t._class) && e.isDescendant(t))
          return !0
        t = t._parent
      }
      return !1
    },
  }, d.each(['rotate', 'scale', 'shear', 'skew'], function (e) {
    const t = e === 'rotate'
    this[e] = function () {
      const n = arguments
      const i = (t ? d : C).read(n)
      const r = C.read(n, 0, {
        readNull: !0,
      })
      return this.transform(new le()[e](i, r || this.getPosition(!0)))
    }
  }, {
    translate() {
      const e = new le()
      return this.transform(e.translate.apply(e, arguments))
    },
    transform(e, t, n) {
      const i = this._matrix
      const r = e && !e.isIdentity()
      let s = n && this._canApplyMatrix || this._applyMatrix && (r || !i.isIdentity() || t && this._children)
      if (!r && !s)
        return this
      if (r) {
        !e.isInvertible() && i.isInvertible() && (i._backup = i.getValues()),
        i.prepend(e, !0)
        const u = this._style
        const o = u.getFillColor(!0)
        const l = u.getStrokeColor(!0)
        o && o.transform(e),
        l && l.transform(e)
      }
      if (s && (s = this._transformContent(i, t, n))) {
        const f = this._pivot
        f && i._transformPoint(f, f, !0),
        i.reset(!0),
        n && this._canApplyMatrix && (this._applyMatrix = !0)
      }
      const g = this._bounds
      const y = this._position;
      (r || s) && this._changed(25)
      const _ = r && g && e.decompose()
      if (_ && _.skewing.isZero() && _.rotation % 90 === 0) {
        for (const v in g) {
          const b = g[v]
          if (b.nonscaling) { delete g[v] }
          else if (s || !b.internal) {
            const T = b.rect
            e._transformBounds(T, T)
          }
        }
        this._bounds = g
        const x = g[this._getBoundsCacheKey(this._boundsOptions || {})]
        x && (this._position = this._getPositionFromBounds(x.rect))
      }
      else { r && y && this._pivot && (this._position = e._transformPoint(y, y)) }
      return this
    },
    _transformContent(e, t, n) {
      const i = this._children
      if (i) {
        for (let r = 0, s = i.length; r < s; r++)
          i[r].transform(e, t, n)
        return !0
      }
    },
    globalToLocal() {
      return this.getGlobalMatrix(!0)._inverseTransform(C.read(arguments))
    },
    localToGlobal() {
      return this.getGlobalMatrix(!0)._transformPoint(C.read(arguments))
    },
    parentToLocal() {
      return this._matrix._inverseTransform(C.read(arguments))
    },
    localToParent() {
      return this._matrix._transformPoint(C.read(arguments))
    },
    fitBounds(e, t) {
      e = Y.read(arguments)
      const n = this.getBounds()
      const i = n.height / n.width
      const r = e.height / e.width
      const s = (t ? i > r : i < r) ? e.width / n.width : e.height / n.height
      const u = new Y(new C(), new J(n.width * s, n.height * s))
      u.setCenter(e.getCenter()),
      this.setBounds(u)
    },
  }), {
    _setStyles(e, t, n) {
      const i = this._style
      const r = this._matrix
      if (i.hasFill() && (e.fillStyle = i.getFillColor().toCanvasStyle(e, r)),
      i.hasStroke()) {
        e.strokeStyle = i.getStrokeColor().toCanvasStyle(e, r),
        e.lineWidth = i.getStrokeWidth()
        const s = i.getStrokeJoin()
        const u = i.getStrokeCap()
        const o = i.getMiterLimit()
        if (s && (e.lineJoin = s),
        u && (e.lineCap = u),
        o && (e.miterLimit = o),
        ae.support.nativeDash) {
          const l = i.getDashArray()
          const f = i.getDashOffset()
          l && l.length && ('setLineDash' in e
            ? (e.setLineDash(l),
              e.lineDashOffset = f)
            : (e.mozDash = l,
              e.mozDashOffset = f))
        }
      }
      if (i.hasShadow()) {
        const g = t.pixelRatio || 1
        const y = n._shiftless().prepend(new le().scale(g, g))
        const _ = y.transform(new C(i.getShadowBlur(), 0))
        const v = y.transform(this.getShadowOffset())
        e.shadowColor = i.getShadowColor().toCanvasStyle(e),
        e.shadowBlur = _.getLength(),
        e.shadowOffsetX = v.x,
        e.shadowOffsetY = v.y
      }
    },
    draw(e, t, n) {
      const i = this._updateVersion = this._project._updateVersion
      if (!(!this._visible || this._opacity === 0)) {
        const r = t.matrices
        let s = t.viewMatrix
        const u = this._matrix
        const o = r[r.length - 1].appended(u)
        if (o.isInvertible()) {
          s = s ? s.appended(o) : o,
          r.push(o),
          t.updateMatrix && (this._globalMatrix = o)
          const l = this._blendMode; const f = O.clamp(this._opacity, 0, 1); const g = l === 'normal'; const y = nn.nativeModes[l]; const _ = g && f === 1 || t.dontStart || t.clip || (y || g && f < 1) && this._canComposite(); const v = t.pixelRatio || 1; let b; let T; let x
          if (!_) {
            const S = this.getStrokeBounds(s)
            if (!S.width || !S.height) {
              r.pop()
              return
            }
            x = t.offset,
            T = t.offset = S.getTopLeft().floor(),
            b = e,
            e = Je.getContext(S.getSize().ceil().add(1).multiply(v)),
            v !== 1 && e.scale(v, v)
          }
          e.save()
          const I = n ? n.appended(u) : this._canScaleStroke && !this.getStrokeScaling(!0) && s
          const m = !_ && t.clipItem
          const w = !I || m
          if (_
            ? (e.globalAlpha = f,
              y && (e.globalCompositeOperation = l))
            : w && e.translate(-T.x, -T.y),
          w && (_ ? u : s).applyToContext(e),
          m && t.clipItem.draw(e, t.extend({
            clip: !0,
          })),
          I) {
            e.setTransform(v, 0, 0, v, 0, 0)
            const E = t.offset
            E && e.translate(-E.x, -E.y)
          }
          this._draw(e, t, s, I),
          e.restore(),
          r.pop(),
          t.clip && !t.dontFinish && e.clip(this.getFillRule()),
          _ || (nn.process(l, e, b, f, T.subtract(x).multiply(v)),
          Je.release(e),
          t.offset = x)
        }
      }
    },
    _isUpdated(e) {
      const t = this._parent
      if (t instanceof ot)
        return t._isUpdated(e)
      let n = this._updateVersion === e
      return !n && t && t._visible && t._isUpdated(e) && (this._updateVersion = e,
      n = !0),
      n
    },
    _drawSelection(e, t, n, i, r) {
      const s = this._selection
      let u = s & 1
      const o = s & 2 || u && this._selectBounds
      const l = s & 4
      if (this._drawSelected || (u = !1),
      (u || o || l) && this._isUpdated(r)) {
        let f; const g = this.getSelectedColor(!0) || (f = this.getLayer()) && f.getSelectedColor(!0); const y = t.appended(this.getGlobalMatrix(!0)); const _ = n / 2
        if (e.strokeStyle = e.fillStyle = g ? g.toCanvasStyle(e) : '#009dec',
        u && this._drawSelected(e, y, i),
        l) {
          const v = this.getPosition(!0)
          const b = this._parent
          const T = b ? b.localToGlobal(v) : v
          const x = T.x
          const S = T.y
          e.beginPath(),
          e.arc(x, S, _, 0, Math.PI * 2, !0),
          e.stroke()
          for (var I = [[0, -1], [1, 0], [0, 1], [-1, 0]], m = _, w = n + 1, E = 0; E < 4; E++) {
            const A = I[E]
            const N = A[0]
            const L = A[1]
            e.moveTo(x + N * m, S + L * m),
            e.lineTo(x + N * w, S + L * w),
            e.stroke()
          }
        }
        if (o) {
          const R = y._transformCorners(this.getInternalBounds())
          e.beginPath()
          for (var E = 0; E < 8; E++)
            e[E ? 'lineTo' : 'moveTo'](R[E], R[++E])
          e.closePath(),
          e.stroke()
          for (var E = 0; E < 8; E++)
            e.fillRect(R[E] - _, R[++E] - _, n, n)
        }
      }
    },
    _canComposite() {
      return !1
    },
  }, d.each(['down', 'drag', 'up', 'move'], function (e) {
    this[`removeOn${d.capitalize(e)}`] = function () {
      const t = {}
      return t[e] = !0,
      this.removeOn(t)
    }
  }, {
    removeOn(e) {
      for (const t in e) {
        if (e[t]) {
          const n = `mouse${t}`
          let i = this._project
          let r = i._removeSets = i._removeSets || {}
          r[n] = r[n] || {},
          r[n][this._id] = this
        }
      }
      return this
    },
  }), {
    tween(e, t, n) {
      n || (n = t,
      t = e,
      e = null,
      n || (n = t,
      t = null))
      const i = n && n.easing
      const r = n && n.start
      const s = n != null && (typeof n == 'number' ? n : n.duration)
      const u = new Sn(this, e, t, s, i, r)
      function o(l) {
        u._handleFrame(l.time * 1e3),
        u.running || this.off('frame', o)
      }
      return s && this.on('frame', o),
      u
    },
    tweenTo(e, t) {
      return this.tween(null, e, t)
    },
    tweenFrom(e, t) {
      return this.tween(e, null, t)
    },
  })
  var We = oe.extend({
    _class: 'Group',
    _selectBounds: !1,
    _selectChildren: !0,
    _serializeFields: {
      children: [],
    },
    initialize(t) {
      this._children = [],
      this._namedChildren = {},
      this._initialize(t) || this.addChildren(Array.isArray(t) ? t : arguments)
    },
    _changed: function e(t) {
      e.base.call(this, t),
      t & 2050 && (this._clipItem = a)
    },
    _getClipItem() {
      let e = this._clipItem
      if (e === a) {
        e = null
        for (let t = this._children, n = 0, i = t.length; n < i; n++) {
          if (t[n]._clipMask) {
            e = t[n]
            break
          }
        }
        this._clipItem = e
      }
      return e
    },
    isClipped() {
      return !!this._getClipItem()
    },
    setClipped(e) {
      const t = this.getFirstChild()
      t && t.setClipMask(e)
    },
    _getBounds: function e(t, n) {
      const i = this._getClipItem()
      return i
        ? i._getCachedBounds(i._matrix.prepended(t), d.set({}, n, {
          stroke: !1,
        }))
        : e.base.call(this, t, n)
    },
    _hitTestChildren: function e(t, n, i) {
      const r = this._getClipItem()
      return (!r || r.contains(t)) && e.base.call(this, t, n, i, r)
    },
    _draw(e, t) {
      const n = t.clip
      const i = !n && this._getClipItem()
      t = t.extend({
        clipItem: i,
        clip: !1,
      }),
      n
        ? (e.beginPath(),
          t.dontStart = t.dontFinish = !0)
        : i && i.draw(e, t.extend({
          clip: !0,
        }))
      for (let r = this._children, s = 0, u = r.length; s < u; s++) {
        const o = r[s]
        o !== i && o.draw(e, t)
      }
    },
  })
  var ct = We.extend({
    _class: 'Layer',
    initialize() {
      We.apply(this, arguments)
    },
    _getOwner() {
      return this._parent || this._index != null && this._project
    },
    isInserted: function e() {
      return this._parent ? e.base.call(this) : this._index != null
    },
    activate() {
      this._project._activeLayer = this
    },
    _hitTestSelf() {},
  })
  var je = oe.extend({
    _class: 'Shape',
    _applyMatrix: !1,
    _canApplyMatrix: !1,
    _canScaleStroke: !0,
    _serializeFields: {
      type: null,
      size: null,
      radius: null,
    },
    initialize(t, n) {
      this._initialize(t, n)
    },
    _equals(e) {
      return this._type === e._type && this._size.equals(e._size) && d.equals(this._radius, e._radius)
    },
    copyContent(e) {
      this.setType(e._type),
      this.setSize(e._size),
      this.setRadius(e._radius)
    },
    getType() {
      return this._type
    },
    setType(e) {
      this._type = e
    },
    getShape: '#getType',
    setShape: '#setType',
    getSize() {
      const e = this._size
      return new ne(e.width, e.height, this, 'setSize')
    },
    setSize() {
      const e = J.read(arguments)
      if (!this._size) { this._size = e.clone() }
      else if (!this._size.equals(e)) {
        const t = this._type
        let n = e.width
        let i = e.height
        t === 'rectangle'
          ? this._radius.set(J.min(this._radius, e.divide(2).abs()))
          : t === 'circle'
            ? (n = i = (n + i) / 2,
              this._radius = n / 2)
            : t === 'ellipse' && this._radius._set(n / 2, i / 2),
        this._size._set(n, i),
        this._changed(9)
      }
    },
    getRadius() {
      const e = this._radius
      return this._type === 'circle' ? e : new ne(e.width, e.height, this, 'setRadius')
    },
    setRadius(e) {
      const t = this._type
      if (t === 'circle') {
        if (e === this._radius)
          return
        var n = e * 2
        this._radius = e,
        this._size._set(n, n)
      }
      else if (e = J.read(arguments),
      !this._radius) { this._radius = e.clone() }
      else {
        if (this._radius.equals(e))
          return
        if (this._radius.set(e),
        t === 'rectangle') {
          var n = J.max(this._size, e.multiply(2))
          this._size.set(n)
        }
        else { t === 'ellipse' && this._size._set(e.width * 2, e.height * 2) }
      }
      this._changed(9)
    },
    isEmpty() {
      return !1
    },
    toPath(e) {
      const t = new ke[d.capitalize(this._type)]({
        center: new C(),
        size: this._size,
        radius: this._radius,
        insert: !1,
      })
      return t.copyAttributes(this),
      ae.settings.applyMatrix && t.setApplyMatrix(!0),
      (e === a || e) && t.insertAbove(this),
      t
    },
    toShape: '#clone',
    _asPathItem() {
      return this.toPath(!1)
    },
    _draw(e, t, n, i) {
      const r = this._style
      const s = r.hasFill()
      const u = r.hasStroke()
      const o = t.dontFinish || t.clip
      const l = !i
      if (s || u || o) {
        const f = this._type
        const g = this._radius
        const y = f === 'circle'
        if (t.dontStart || e.beginPath(),
        l && y) { e.arc(0, 0, g, 0, Math.PI * 2, !0) }
        else {
          const _ = y ? g : g.width
          const v = y ? g : g.height
          const b = this._size
          const T = b.width
          const x = b.height
          if (l && f === 'rectangle' && _ === 0 && v === 0) { e.rect(-T / 2, -x / 2, T, x) }
          else {
            const S = T / 2
            const I = x / 2
            const m = 1 - 0.5522847498307936
            const w = _ * m
            const E = v * m
            const A = [-S, -I + v, -S, -I + E, -S + w, -I, -S + _, -I, S - _, -I, S - w, -I, S, -I + E, S, -I + v, S, I - v, S, I - E, S - w, I, S - _, I, -S + _, I, -S + w, I, -S, I - E, -S, I - v]
            i && i.transform(A, A, 32),
            e.moveTo(A[0], A[1]),
            e.bezierCurveTo(A[2], A[3], A[4], A[5], A[6], A[7]),
            S !== _ && e.lineTo(A[8], A[9]),
            e.bezierCurveTo(A[10], A[11], A[12], A[13], A[14], A[15]),
            I !== v && e.lineTo(A[16], A[17]),
            e.bezierCurveTo(A[18], A[19], A[20], A[21], A[22], A[23]),
            S !== _ && e.lineTo(A[24], A[25]),
            e.bezierCurveTo(A[26], A[27], A[28], A[29], A[30], A[31])
          }
        }
        e.closePath()
      }
      !o && (s || u) && (this._setStyles(e, t, n),
      s && (e.fill(r.getFillRule()),
      e.shadowColor = 'rgba(0,0,0,0)'),
      u && e.stroke())
    },
    _canComposite() {
      return !(this.hasFill() && this.hasStroke())
    },
    _getBounds(e, t) {
      let n = new Y(this._size).setCenter(0, 0)
      const i = this._style
      const r = t.stroke && i.hasStroke() && i.getStrokeWidth()
      return e && (n = e._transformBounds(n)),
      r ? n.expand(ke._getStrokePadding(r, this._getStrokeMatrix(e, t))) : n
    },
  }, new function () {
    function e(n, i, r) {
      const s = n._radius
      if (!s.isZero()) {
        for (let u = n._size.divide(2), o = 1; o <= 4; o++) {
          const l = new C(o > 1 && o < 4 ? -1 : 1, o > 2 ? -1 : 1)
          const f = l.multiply(u)
          const g = f.subtract(l.multiply(s))
          const y = new Y(r ? f.add(l.multiply(r)) : f, g)
          if (y.contains(i)) {
            return {
              point: g,
              quadrant: o,
            }
          }
        }
      }
    }
    function t(n, i, r, s) {
      const u = n.divide(i)
      return (!s || u.isInQuadrant(s)) && u.subtract(u.normalize()).multiply(i).divide(r).length <= 1
    }
    return {
      _contains: function n(i) {
        if (this._type === 'rectangle') {
          const r = e(this, i)
          return r ? i.subtract(r.point).divide(this._radius).getLength() <= 1 : n.base.call(this, i)
        }
        else { return i.divide(this.size).getLength() <= 0.5 }
      },
      _hitTestSelf: function n(i, r, s, u) {
        let o = !1
        const l = this._style
        const f = r.stroke && l.hasStroke()
        const g = r.fill && l.hasFill()
        if (f || g) {
          const y = this._type
          const _ = this._radius
          const v = f ? l.getStrokeWidth() / 2 : 0
          const b = r._tolerancePadding.add(ke._getStrokePadding(v, !l.getStrokeScaling() && u))
          if (y === 'rectangle') {
            const T = b.multiply(2)
            const x = e(this, i, T)
            if (x) { o = t(i.subtract(x.point), _, b, x.quadrant) }
            else {
              const S = new Y(this._size).setCenter(0, 0)
              const I = S.expand(T)
              const m = S.expand(T.negate())
              o = I._containsPoint(i) && !m._containsPoint(i)
            }
          }
          else { o = t(i, _, b) }
        }
        return o ? new qe(f ? 'stroke' : 'fill', this) : n.base.apply(this, arguments)
      },
    }
  }()
  , {
    statics: new function () {
      function e(t, n, i, r, s) {
        const u = d.create(je.prototype)
        return u._type = t,
        u._size = i,
        u._radius = r,
        u._initialize(d.getNamed(s), n),
        u
      }
      return {
        Circle() {
          const t = arguments
          const n = C.readNamed(t, 'center')
          const i = d.readNamed(t, 'radius')
          return e('circle', n, new J(i * 2), i, t)
        },
        Rectangle() {
          const t = arguments
          const n = Y.readNamed(t, 'rectangle')
          const i = J.min(J.readNamed(t, 'radius'), n.getSize(!0).divide(2))
          return e('rectangle', n.getCenter(!0), n.getSize(!0), i, t)
        },
        Ellipse() {
          const t = arguments
          const n = je._readEllipse(t)
          const i = n.radius
          return e('ellipse', n.center, i.multiply(2), i, t)
        },
        _readEllipse(t) {
          let n, i
          if (d.hasNamed(t, 'radius')) {
            n = C.readNamed(t, 'center'),
            i = J.readNamed(t, 'radius')
          }
          else {
            const r = Y.readNamed(t, 'rectangle')
            n = r.getCenter(!0),
            i = r.getSize(!0).divide(2)
          }
          return {
            center: n,
            radius: i,
          }
        },
      }
    }(),
  })
  var Pt = oe.extend({
    _class: 'Raster',
    _applyMatrix: !1,
    _canApplyMatrix: !1,
    _boundsOptions: {
      stroke: !1,
      handle: !1,
    },
    _serializeFields: {
      crossOrigin: null,
      source: null,
    },
    _prioritize: ['crossOrigin'],
    _smoothing: 'low',
    beans: !0,
    initialize(t, n) {
      if (!this._initialize(t, n !== a && C.read(arguments))) {
        let i; const r = typeof t; const s = r === 'string' ? p.getElementById(t) : r === 'object' ? t : null
        if (s && s !== oe.NO_INSERT) {
          if (s.getContext || s.naturalHeight != null) { i = s }
          else if (s) {
            const u = J.read(arguments)
            u.isZero() || (i = Je.getCanvas(u))
          }
        }
        i ? this.setImage(i) : this.setSource(t)
      }
      this._size || (this._size = new J(),
      this._loaded = !1)
    },
    _equals(e) {
      return this.getSource() === e.getSource()
    },
    copyContent(e) {
      const t = e._image
      const n = e._canvas
      if (t) { this._setImage(t) }
      else if (n) {
        const i = Je.getCanvas(e._size)
        i.getContext('2d').drawImage(n, 0, 0),
        this._setImage(i)
      }
      this._crossOrigin = e._crossOrigin
    },
    getSize() {
      const e = this._size
      return new ne(e ? e.width : 0, e ? e.height : 0, this, 'setSize')
    },
    setSize(e, t) {
      const n = J.read(arguments)
      if (n.equals(this._size)) { t && this.clear() }
      else if (n.width > 0 && n.height > 0) {
        const i = !t && this.getElement()
        this._setImage(Je.getCanvas(n)),
        i && this.getContext(!0).drawImage(i, 0, 0, n.width, n.height)
      }
      else {
        this._canvas && Je.release(this._canvas),
        this._size = n.clone()
      }
    },
    getWidth() {
      return this._size ? this._size.width : 0
    },
    setWidth(e) {
      this.setSize(e, this.getHeight())
    },
    getHeight() {
      return this._size ? this._size.height : 0
    },
    setHeight(e) {
      this.setSize(this.getWidth(), e)
    },
    getLoaded() {
      return this._loaded
    },
    isEmpty() {
      const e = this._size
      return !e || e.width === 0 && e.height === 0
    },
    getResolution() {
      const e = this._matrix
      const t = new C(0, 0).transform(e)
      const n = new C(1, 0).transform(e).subtract(t)
      const i = new C(0, 1).transform(e).subtract(t)
      return new J(72 / n.getLength(), 72 / i.getLength())
    },
    getPpi: '#getResolution',
    getImage() {
      return this._image
    },
    setImage(e) {
      const t = this
      function n(i) {
        const r = t.getView()
        const s = i && i.type || 'load'
        r && t.responds(s) && (ae = r._scope,
        t.emit(s, new Zt(i)))
      }
      this._setImage(e),
      this._loaded
        ? setTimeout(n, 0)
        : e && tt.add(e, {
          load(i) {
            t._setImage(e),
            n(i)
          },
          error: n,
        })
    },
    _setImage(e) {
      this._canvas && Je.release(this._canvas),
      e && e.getContext
        ? (this._image = null,
          this._canvas = e,
          this._loaded = !0)
        : (this._image = e,
          this._canvas = null,
          this._loaded = !!(e && e.src && e.complete)),
      this._size = new J(e ? e.naturalWidth || e.width : 0, e ? e.naturalHeight || e.height : 0),
      this._context = null,
      this._changed(1033)
    },
    getCanvas() {
      if (!this._canvas) {
        const e = Je.getContext(this._size)
        try {
          this._image && e.drawImage(this._image, 0, 0),
          this._canvas = e.canvas
        }
        catch {
          Je.release(e)
        }
      }
      return this._canvas
    },
    setCanvas: '#setImage',
    getContext(e) {
      return this._context || (this._context = this.getCanvas().getContext('2d')),
      e && (this._image = null,
      this._changed(1025)),
      this._context
    },
    setContext(e) {
      this._context = e
    },
    getSource() {
      const e = this._image
      return e && e.src || this.toDataURL()
    },
    setSource(e) {
      const t = new c.Image()
      const n = this._crossOrigin
      n && (t.crossOrigin = n),
      e && (t.src = e),
      this.setImage(t)
    },
    getCrossOrigin() {
      const e = this._image
      return e && e.crossOrigin || this._crossOrigin || ''
    },
    setCrossOrigin(e) {
      this._crossOrigin = e
      const t = this._image
      t && (t.crossOrigin = e)
    },
    getSmoothing() {
      return this._smoothing
    },
    setSmoothing(e) {
      this._smoothing = typeof e == 'string' ? e : e ? 'low' : 'off',
      this._changed(257)
    },
    getElement() {
      return this._canvas || this._loaded && this._image
    },
  }, {
    beans: !1,
    getSubCanvas() {
      const e = Y.read(arguments)
      const t = Je.getContext(e.getSize())
      return t.drawImage(this.getCanvas(), e.x, e.y, e.width, e.height, 0, 0, e.width, e.height),
      t.canvas
    },
    getSubRaster() {
      const e = Y.read(arguments)
      const t = new Pt(oe.NO_INSERT)
      return t._setImage(this.getSubCanvas(e)),
      t.translate(e.getCenter().subtract(this.getSize().divide(2))),
      t._matrix.prepend(this._matrix),
      t.insertAbove(this),
      t
    },
    toDataURL() {
      const e = this._image
      const t = e && e.src
      if (t.startsWith('data:'))
        return t
      const n = this.getCanvas()
      return n ? n.toDataURL.apply(n, arguments) : null
    },
    drawImage(e) {
      const t = C.read(arguments, 1)
      this.getContext(!0).drawImage(e, t.x, t.y)
    },
    getAverageColor(e) {
      let t, n
      if (e
        ? e instanceof Ft
          ? (n = e,
            t = e.getBounds())
          : typeof e == 'object' && ('width' in e ? t = new Y(e) : 'x' in e && (t = new Y(e.x - 0.5, e.y - 0.5, 1, 1)))
        : t = this.getBounds(),
      !t)
        return null
      const i = 32
      const r = Math.min(t.width, i)
      const s = Math.min(t.height, i)
      let u = Pt._sampleContext
      u ? u.clearRect(0, 0, i + 1, i + 1) : u = Pt._sampleContext = Je.getContext(new J(i)),
      u.save()
      const o = new le().scale(r / t.width, s / t.height).translate(-t.x, -t.y)
      o.applyToContext(u),
      n && n.draw(u, new d({
        clip: !0,
        matrices: [o],
      })),
      this._matrix.applyToContext(u)
      const l = this.getElement()
      const f = this._size
      l && u.drawImage(l, -f.width / 2, -f.height / 2),
      u.restore()
      for (var g = u.getImageData(0.5, 0.5, Math.ceil(r), Math.ceil(s)).data, y = [0, 0, 0], _ = 0, v = 0, b = g.length; v < b; v += 4) {
        let T = g[v + 3]
        _ += T,
        T /= 255,
        y[0] += g[v] * T,
        y[1] += g[v + 1] * T,
        y[2] += g[v + 2] * T
      }
      for (var v = 0; v < 3; v++)
        y[v] /= _
      return _ ? Xe.read(y) : null
    },
    getPixel() {
      const e = C.read(arguments)
      const t = this.getContext().getImageData(e.x, e.y, 1, 1).data
      return new Xe('rgb', [t[0] / 255, t[1] / 255, t[2] / 255], t[3] / 255)
    },
    setPixel() {
      const e = arguments
      const t = C.read(e)
      const n = Xe.read(e)
      const i = n._convert('rgb')
      const r = n._alpha
      const s = this.getContext(!0)
      const u = s.createImageData(1, 1)
      const o = u.data
      o[0] = i[0] * 255,
      o[1] = i[1] * 255,
      o[2] = i[2] * 255,
      o[3] = r != null ? r * 255 : 255,
      s.putImageData(u, t.x, t.y)
    },
    clear() {
      const e = this._size
      this.getContext(!0).clearRect(0, 0, e.width + 1, e.height + 1)
    },
    createImageData() {
      const e = J.read(arguments)
      return this.getContext().createImageData(e.width, e.height)
    },
    getImageData() {
      let e = Y.read(arguments)
      return e.isEmpty() && (e = new Y(this._size)),
      this.getContext().getImageData(e.x, e.y, e.width, e.height)
    },
    putImageData(e) {
      const t = C.read(arguments, 1)
      this.getContext(!0).putImageData(e, t.x, t.y)
    },
    setImageData(e) {
      this.setSize(e),
      this.getContext(!0).putImageData(e, 0, 0)
    },
    _getBounds(e, t) {
      const n = new Y(this._size).setCenter(0, 0)
      return e ? e._transformBounds(n) : n
    },
    _hitTestSelf(e) {
      if (this._contains(e)) {
        const t = this
        return new qe('pixel', t, {
          offset: e.add(t._size.divide(2)).round(),
          color: {
            get() {
              return t.getPixel(this.offset)
            },
          },
        })
      }
    },
    _draw(e, t, n) {
      const i = this.getElement()
      if (i && i.width > 0 && i.height > 0) {
        e.globalAlpha = O.clamp(this._opacity, 0, 1),
        this._setStyles(e, t, n)
        const r = this._smoothing
        const s = r === 'off'
        Ce.setPrefixed(e, s ? 'imageSmoothingEnabled' : 'imageSmoothingQuality', s ? !1 : r),
        e.drawImage(i, -this._size.width / 2, -this._size.height / 2)
      }
    },
    _canComposite() {
      return !0
    },
  })
  var ft = oe.extend({
    _class: 'SymbolItem',
    _applyMatrix: !1,
    _canApplyMatrix: !1,
    _boundsOptions: {
      stroke: !0,
    },
    _serializeFields: {
      symbol: null,
    },
    initialize(t, n) {
      this._initialize(t, n !== a && C.read(arguments, 1)) || this.setDefinition(t instanceof dt ? t : new dt(t))
    },
    _equals(e) {
      return this._definition === e._definition
    },
    copyContent(e) {
      this.setDefinition(e._definition)
    },
    getDefinition() {
      return this._definition
    },
    setDefinition(e) {
      this._definition = e,
      this._changed(9)
    },
    getSymbol: '#getDefinition',
    setSymbol: '#setDefinition',
    isEmpty() {
      return this._definition._item.isEmpty()
    },
    _getBounds(e, t) {
      const n = this._definition._item
      return n._getCachedBounds(n._matrix.prepended(e), t)
    },
    _hitTestSelf(e, t, n) {
      const i = t.extend({
        all: !1,
      })
      const r = this._definition._item._hitTest(e, i, n)
      return r && (r.item = this),
      r
    },
    _draw(e, t) {
      this._definition._item.draw(e, t)
    },
  })
  var dt = d.extend({
    _class: 'SymbolDefinition',
    initialize(t, n) {
      this._id = B.get(),
      this.project = ae.project,
      t && this.setItem(t, n)
    },
    _serialize(e, t) {
      return t.add(this, function () {
        return d.serialize([this._class, this._item], e, !1, t)
      })
    },
    _changed(e) {
      e & 8 && oe._clearBoundsCache(this),
      e & 1 && this.project._changed(e)
    },
    getItem() {
      return this._item
    },
    setItem(e, t) {
      e._symbol && (e = e.clone()),
      this._item && (this._item._symbol = null),
      this._item = e,
      e.remove(),
      e.setSelected(!1),
      t || e.setPosition(new C()),
      e._symbol = this,
      this._changed(9)
    },
    getDefinition: '#getItem',
    setDefinition: '#setItem',
    place(e) {
      return new ft(this, e)
    },
    clone() {
      return new dt(this._item.clone(!1))
    },
    equals(e) {
      return e === this || e && this._item.equals(e._item) || !1
    },
  })
  var qe = d.extend({
    _class: 'HitResult',
    initialize(t, n, i) {
      this.type = t,
      this.item = n,
      i && this.inject(i)
    },
    statics: {
      getOptions(e) {
        const t = e && d.read(e)
        return new d({
          type: null,
          tolerance: ae.settings.hitTolerance,
          fill: !t,
          stroke: !t,
          segments: !t,
          handles: !1,
          ends: !1,
          position: !1,
          center: !1,
          bounds: !1,
          guides: !1,
          selected: !1,
        }, t)
      },
    },
  })
  var pe = d.extend({
    _class: 'Segment',
    beans: !0,
    _selection: 0,
    initialize(t, n, i, r, s, u) {
      const o = arguments.length; let l; let f; let g; let y
      o > 0 && (t == null || typeof t == 'object'
        ? o === 1 && t && 'point' in t
          ? (l = t.point,
            f = t.handleIn,
            g = t.handleOut,
            y = t.selection)
          : (l = t,
            f = n,
            g = i,
            y = r)
        : (l = [t, n],
          f = i !== a ? [i, r] : null,
          g = s !== a ? [s, u] : null)),
      new Vt(l, this, '_point'),
      new Vt(f, this, '_handleIn'),
      new Vt(g, this, '_handleOut'),
      y && this.setSelection(y)
    },
    _serialize(e, t) {
      const n = this._point
      const i = this._selection
      const r = i || this.hasHandles() ? [n, this._handleIn, this._handleOut] : n
      return i && r.push(i),
      d.serialize(r, e, !0, t)
    },
    _changed(e) {
      const t = this._path
      if (t) {
        const n = t._curves; const i = this._index; let r
        n && ((!e || e === this._point || e === this._handleIn) && (r = i > 0 ? n[i - 1] : t._closed ? n[n.length - 1] : null) && r._changed(),
        (!e || e === this._point || e === this._handleOut) && (r = n[i]) && r._changed()),
        t._changed(41)
      }
    },
    getPoint() {
      return this._point
    },
    setPoint() {
      this._point.set(C.read(arguments))
    },
    getHandleIn() {
      return this._handleIn
    },
    setHandleIn() {
      this._handleIn.set(C.read(arguments))
    },
    getHandleOut() {
      return this._handleOut
    },
    setHandleOut() {
      this._handleOut.set(C.read(arguments))
    },
    hasHandles() {
      return !this._handleIn.isZero() || !this._handleOut.isZero()
    },
    isSmooth() {
      const e = this._handleIn
      const t = this._handleOut
      return !e.isZero() && !t.isZero() && e.isCollinear(t)
    },
    clearHandles() {
      this._handleIn._set(0, 0),
      this._handleOut._set(0, 0)
    },
    getSelection() {
      return this._selection
    },
    setSelection(e) {
      const t = this._selection
      const n = this._path
      this._selection = e = e || 0,
      n && e !== t && (n._updateSelection(this, t, e),
      n._changed(257))
    },
    _changeSelection(e, t) {
      const n = this._selection
      this.setSelection(t ? n | e : n & ~e)
    },
    isSelected() {
      return !!(this._selection & 7)
    },
    setSelected(e) {
      this._changeSelection(7, e)
    },
    getIndex() {
      return this._index !== a ? this._index : null
    },
    getPath() {
      return this._path || null
    },
    getCurve() {
      const e = this._path
      let t = this._index
      return e
        ? (t > 0 && !e._closed && t === e._segments.length - 1 && t--,
          e.getCurves()[t] || null)
        : null
    },
    getLocation() {
      const e = this.getCurve()
      return e ? new Ot(e, this === e._segment1 ? 0 : 1) : null
    },
    getNext() {
      const e = this._path && this._path._segments
      return e && (e[this._index + 1] || this._path._closed && e[0]) || null
    },
    smooth(e, t, n) {
      const i = e || {}
      const r = i.type
      const s = i.factor
      const u = this.getPrevious()
      const o = this.getNext()
      const l = (u || this)._point
      const f = this._point
      const g = (o || this)._point
      const y = l.getDistance(f)
      const _ = f.getDistance(g)
      if (!r || r === 'catmull-rom') {
        const v = s === a ? 0.5 : s
        const b = y ** v
        const T = b * b
        const x = _ ** v
        const S = x * x
        if (!t && u) {
          var I = 2 * S + 3 * x * b + T
          var m = 3 * x * (x + b)
          this.setHandleIn(m !== 0 ? new C((S * l._x + I * f._x - T * g._x) / m - f._x, (S * l._y + I * f._y - T * g._y) / m - f._y) : new C())
        }
        if (!n && o) {
          var I = 2 * T + 3 * b * x + S
          var m = 3 * b * (b + x)
          this.setHandleOut(m !== 0 ? new C((T * g._x + I * f._x - S * l._x) / m - f._x, (T * g._y + I * f._y - S * l._y) / m - f._y) : new C())
        }
      }
      else if (r === 'geometric') {
        if (u && o) {
          const w = l.subtract(g)
          const E = s === a ? 0.4 : s
          const A = E * y / (y + _)
          t || this.setHandleIn(w.multiply(A)),
          n || this.setHandleOut(w.multiply(A - E))
        }
      }
      else { throw new Error(`Smoothing method '${r}' not supported.`) }
    },
    getPrevious() {
      const e = this._path && this._path._segments
      return e && (e[this._index - 1] || this._path._closed && e[e.length - 1]) || null
    },
    isFirst() {
      return !this._index
    },
    isLast() {
      const e = this._path
      return e && this._index === e._segments.length - 1 || !1
    },
    reverse() {
      const e = this._handleIn
      const t = this._handleOut
      const n = e.clone()
      e.set(t),
      t.set(n)
    },
    reversed() {
      return new pe(this._point, this._handleOut, this._handleIn)
    },
    remove() {
      return this._path ? !!this._path.removeSegment(this._index) : !1
    },
    clone() {
      return new pe(this._point, this._handleIn, this._handleOut)
    },
    equals(e) {
      return e === this || e && this._class === e._class && this._point.equals(e._point) && this._handleIn.equals(e._handleIn) && this._handleOut.equals(e._handleOut) || !1
    },
    toString() {
      const e = [`point: ${this._point}`]
      return this._handleIn.isZero() || e.push(`handleIn: ${this._handleIn}`),
      this._handleOut.isZero() || e.push(`handleOut: ${this._handleOut}`),
      `{ ${e.join(', ')} }`
    },
    transform(e) {
      this._transformCoordinates(e, new Array(6), !0),
      this._changed()
    },
    interpolate(e, t, n) {
      const i = 1 - n
      const r = n
      const s = e._point
      const u = t._point
      const o = e._handleIn
      const l = t._handleIn
      const f = t._handleOut
      const g = e._handleOut
      this._point._set(i * s._x + r * u._x, i * s._y + r * u._y, !0),
      this._handleIn._set(i * o._x + r * l._x, i * o._y + r * l._y, !0),
      this._handleOut._set(i * g._x + r * f._x, i * g._y + r * f._y, !0),
      this._changed()
    },
    _transformCoordinates(e, t, n) {
      const i = this._point
      const r = !n || !this._handleIn.isZero() ? this._handleIn : null
      const s = !n || !this._handleOut.isZero() ? this._handleOut : null
      let u = i._x
      let o = i._y
      let l = 2
      return t[0] = u,
      t[1] = o,
      r && (t[l++] = r._x + u,
      t[l++] = r._y + o),
      s && (t[l++] = s._x + u,
      t[l++] = s._y + o),
      e && (e._transformCoordinates(t, t, l / 2),
      u = t[0],
      o = t[1],
      n
        ? (i._x = u,
          i._y = o,
          l = 2,
          r && (r._x = t[l++] - u,
          r._y = t[l++] - o),
          s && (s._x = t[l++] - u,
          s._y = t[l++] - o))
        : (r || (t[l++] = u,
          t[l++] = o),
          s || (t[l++] = u,
          t[l++] = o))),
      t
    },
  })
  var Vt = C.extend({
    initialize(t, n, i) {
      let r, s, u
      if (!t) { r = s = 0 }
      else if ((r = t[0]) !== a) { s = t[1] }
      else {
        let o = t;
        (r = o.x) === a && (o = C.read(arguments),
        r = o.x),
        s = o.y,
        u = o.selected
      }
      this._x = r,
      this._y = s,
      this._owner = n,
      n[i] = this,
      u && this.setSelected(!0)
    },
    _set(e, t) {
      return this._x = e,
      this._y = t,
      this._owner._changed(this),
      this
    },
    getX() {
      return this._x
    },
    setX(e) {
      this._x = e,
      this._owner._changed(this)
    },
    getY() {
      return this._y
    },
    setY(e) {
      this._y = e,
      this._owner._changed(this)
    },
    isZero() {
      const e = O.isZero
      return e(this._x) && e(this._y)
    },
    isSelected() {
      return !!(this._owner._selection & this._getSelection())
    },
    setSelected(e) {
      this._owner._changeSelection(this._getSelection(), e)
    },
    _getSelection() {
      const e = this._owner
      return this === e._point ? 1 : this === e._handleIn ? 2 : this === e._handleOut ? 4 : 0
    },
  })
  var re = d.extend({
    _class: 'Curve',
    beans: !0,
    initialize(t, n, i, r, s, u, o, l) {
      const f = arguments.length; let g; let y; let _; let v; let b; let T
      f === 3
        ? (this._path = t,
          g = n,
          y = i)
        : f
          ? f === 1
            ? 'segment1' in t
              ? (g = new pe(t.segment1),
                y = new pe(t.segment2))
              : 'point1' in t
                ? (_ = t.point1,
                  b = t.handle1,
                  T = t.handle2,
                  v = t.point2)
                : Array.isArray(t) && (_ = [t[0], t[1]],
                v = [t[6], t[7]],
                b = [t[2] - t[0], t[3] - t[1]],
                T = [t[4] - t[6], t[5] - t[7]])
            : f === 2
              ? (g = new pe(t),
                y = new pe(n))
              : f === 4
                ? (_ = t,
                  b = n,
                  T = i,
                  v = r)
                : f === 8 && (_ = [t, n],
                v = [o, l],
                b = [i - t, r - n],
                T = [s - o, u - l])
          : (g = new pe(),
            y = new pe()),
      this._segment1 = g || new pe(_, null, b),
      this._segment2 = y || new pe(v, T, null)
    },
    _serialize(e, t) {
      return d.serialize(this.hasHandles() ? [this.getPoint1(), this.getHandle1(), this.getHandle2(), this.getPoint2()] : [this.getPoint1(), this.getPoint2()], e, !0, t)
    },
    _changed() {
      this._length = this._bounds = a
    },
    clone() {
      return new re(this._segment1, this._segment2)
    },
    toString() {
      const e = [`point1: ${this._segment1._point}`]
      return this._segment1._handleOut.isZero() || e.push(`handle1: ${this._segment1._handleOut}`),
      this._segment2._handleIn.isZero() || e.push(`handle2: ${this._segment2._handleIn}`),
      e.push(`point2: ${this._segment2._point}`),
      `{ ${e.join(', ')} }`
    },
    classify() {
      return re.classify(this.getValues())
    },
    remove() {
      let e = !1
      if (this._path) {
        const t = this._segment2
        const n = t._handleOut
        e = t.remove(),
        e && this._segment1._handleOut.set(n)
      }
      return e
    },
    getPoint1() {
      return this._segment1._point
    },
    setPoint1() {
      this._segment1._point.set(C.read(arguments))
    },
    getPoint2() {
      return this._segment2._point
    },
    setPoint2() {
      this._segment2._point.set(C.read(arguments))
    },
    getHandle1() {
      return this._segment1._handleOut
    },
    setHandle1() {
      this._segment1._handleOut.set(C.read(arguments))
    },
    getHandle2() {
      return this._segment2._handleIn
    },
    setHandle2() {
      this._segment2._handleIn.set(C.read(arguments))
    },
    getSegment1() {
      return this._segment1
    },
    getSegment2() {
      return this._segment2
    },
    getPath() {
      return this._path
    },
    getIndex() {
      return this._segment1._index
    },
    getNext() {
      const e = this._path && this._path._curves
      return e && (e[this._segment1._index + 1] || this._path._closed && e[0]) || null
    },
    getPrevious() {
      const e = this._path && this._path._curves
      return e && (e[this._segment1._index - 1] || this._path._closed && e[e.length - 1]) || null
    },
    isFirst() {
      return !this._segment1._index
    },
    isLast() {
      const e = this._path
      return e && this._segment1._index === e._curves.length - 1 || !1
    },
    isSelected() {
      return this.getPoint1().isSelected() && this.getHandle1().isSelected() && this.getHandle2().isSelected() && this.getPoint2().isSelected()
    },
    setSelected(e) {
      this.getPoint1().setSelected(e),
      this.getHandle1().setSelected(e),
      this.getHandle2().setSelected(e),
      this.getPoint2().setSelected(e)
    },
    getValues(e) {
      return re.getValues(this._segment1, this._segment2, e)
    },
    getPoints() {
      for (var e = this.getValues(), t = [], n = 0; n < 8; n += 2)
        t.push(new C(e[n], e[n + 1]))
      return t
    },
  }, {
    getLength() {
      return this._length == null && (this._length = re.getLength(this.getValues(), 0, 1)),
      this._length
    },
    getArea() {
      return re.getArea(this.getValues())
    },
    getLine() {
      return new Se(this._segment1._point, this._segment2._point)
    },
    getPart(e, t) {
      return new re(re.getPart(this.getValues(), e, t))
    },
    getPartLength(e, t) {
      return re.getLength(this.getValues(), e, t)
    },
    divideAt(e) {
      return this.divideAtTime(e && e.curve === this ? e.time : this.getTimeAt(e))
    },
    divideAtTime(e, t) {
      const n = 1e-8
      const i = 1 - n
      let r = null
      if (e >= n && e <= i) {
        const s = re.subdivide(this.getValues(), e)
        const u = s[0]
        const o = s[1]
        const l = t || this.hasHandles()
        const f = this._segment1
        const g = this._segment2
        const y = this._path
        l && (f._handleOut._set(u[2] - u[0], u[3] - u[1]),
        g._handleIn._set(o[4] - o[6], o[5] - o[7]))
        const _ = u[6]
        const v = u[7]
        const b = new pe(new C(_, v), l && new C(u[4] - _, u[5] - v), l && new C(o[2] - _, o[3] - v))
        y
          ? (y.insert(f._index + 1, b),
            r = this.getNext())
          : (this._segment2 = b,
            this._changed(),
            r = new re(b, g))
      }
      return r
    },
    splitAt(e) {
      const t = this._path
      return t ? t.splitAt(e) : null
    },
    splitAtTime(e) {
      return this.splitAt(this.getLocationAtTime(e))
    },
    divide(e, t) {
      return this.divideAtTime(e === a ? 0.5 : t ? e : this.getTimeAt(e))
    },
    split(e, t) {
      return this.splitAtTime(e === a ? 0.5 : t ? e : this.getTimeAt(e))
    },
    reversed() {
      return new re(this._segment2.reversed(), this._segment1.reversed())
    },
    clearHandles() {
      this._segment1._handleOut._set(0, 0),
      this._segment2._handleIn._set(0, 0)
    },
    statics: {
      getValues(e, t, n, i) {
        const r = e._point
        const s = e._handleOut
        const u = t._handleIn
        const o = t._point
        const l = r.x
        const f = r.y
        const g = o.x
        const y = o.y
        const _ = i ? [l, f, l, f, g, y, g, y] : [l, f, l + s._x, f + s._y, g + u._x, y + u._y, g, y]
        return n && n._transformCoordinates(_, _, 4),
        _
      },
      subdivide(e, t) {
        const n = e[0]
        const i = e[1]
        const r = e[2]
        const s = e[3]
        const u = e[4]
        const o = e[5]
        const l = e[6]
        const f = e[7]
        t === a && (t = 0.5)
        const g = 1 - t
        const y = g * n + t * r
        const _ = g * i + t * s
        const v = g * r + t * u
        const b = g * s + t * o
        const T = g * u + t * l
        const x = g * o + t * f
        const S = g * y + t * v
        const I = g * _ + t * b
        const m = g * v + t * T
        const w = g * b + t * x
        const E = g * S + t * m
        const A = g * I + t * w
        return [[n, i, y, _, S, I, E, A], [E, A, m, w, T, x, l, f]]
      },
      getMonoCurves(e, t) {
        const n = []
        const i = t ? 0 : 1
        const r = e[i + 0]
        const s = e[i + 2]
        const u = e[i + 4]
        const o = e[i + 6]
        if (r >= s == s >= u && s >= u == u >= o || re.isStraight(e)) { n.push(e) }
        else {
          const l = 3 * (s - u) - r + o
          const f = 2 * (r + u) - 4 * s
          const g = s - r
          const y = 1e-8
          const _ = 1 - y
          const v = []
          const b = O.solveQuadratic(l, f, g, v, y, _)
          if (!b) { n.push(e) }
          else {
            v.sort()
            let T = v[0]
            let x = re.subdivide(e, T)
            n.push(x[0]),
            b > 1 && (T = (v[1] - T) / (1 - T),
            x = re.subdivide(x[1], T),
            n.push(x[0])),
            n.push(x[1])
          }
        }
        return n
      },
      solveCubic(e, t, n, i, r, s) {
        const u = e[t]
        const o = e[t + 2]
        const l = e[t + 4]
        const f = e[t + 6]
        let g = 0
        if (!(u < n && f < n && o < n && l < n || u > n && f > n && o > n && l > n)) {
          const y = 3 * (o - u)
          const _ = 3 * (l - o) - y
          const v = f - u - y - _
          g = O.solveCubic(v, _, y, u - n, i, r, s)
        }
        return g
      },
      getTimeOf(e, t) {
        const n = new C(e[0], e[1])
        const i = new C(e[6], e[7])
        const r = 1e-12
        const s = 1e-7
        const u = t.isClose(n, r) ? 0 : t.isClose(i, r) ? 1 : null
        if (u === null) {
          for (let o = [t.x, t.y], l = [], f = 0; f < 2; f++) {
for (let g = re.solveCubic(e, f, o[f], l, 0, 1), y = 0; y < g; y++) {
            var _ = l[y]
            if (t.isClose(re.getPoint(e, _), s))
              return _
          }
}
        }
        return t.isClose(n, s) ? 0 : t.isClose(i, s) ? 1 : null
      },
      getNearestTime(e, t) {
        if (re.isStraight(e)) {
          const n = e[0]
          const i = e[1]
          const r = e[6]
          const s = e[7]
          const u = r - n
          const o = s - i
          const l = u * u + o * o
          if (l === 0)
            return 0
          const f = ((t.x - n) * u + (t.y - i) * o) / l
          return f < 1e-12 ? 0 : f > 0.999999999999 ? 1 : re.getTimeOf(e, new C(n + f * u, i + f * o))
        }
        const g = 100
        let y = 1 / 0
        let _ = 0
        function v(x) {
          if (x >= 0 && x <= 1) {
            const S = t.getDistance(re.getPoint(e, x), !0)
            if (S < y) {
              return y = S,
              _ = x,
              !0
            }
          }
        }
        for (let b = 0; b <= g; b++)
          v(b / g)
        for (let T = 1 / (g * 2); T > 1e-8;)
          !v(_ - T) && !v(_ + T) && (T /= 2)
        return _
      },
      getPart(e, t, n) {
        const i = t > n
        if (i) {
          const r = t
          t = n,
          n = r
        }
        return t > 0 && (e = re.subdivide(e, t)[1]),
        n < 1 && (e = re.subdivide(e, (n - t) / (1 - t))[0]),
        i ? [e[6], e[7], e[4], e[5], e[2], e[3], e[0], e[1]] : e
      },
      isFlatEnough(e, t) {
        const n = e[0]
        const i = e[1]
        const r = e[2]
        const s = e[3]
        const u = e[4]
        const o = e[5]
        const l = e[6]
        const f = e[7]
        const g = 3 * r - 2 * n - l
        const y = 3 * s - 2 * i - f
        const _ = 3 * u - 2 * l - n
        const v = 3 * o - 2 * f - i
        return Math.max(g * g, _ * _) + Math.max(y * y, v * v) <= 16 * t * t
      },
      getArea(e) {
        const t = e[0]
        const n = e[1]
        const i = e[2]
        const r = e[3]
        const s = e[4]
        const u = e[5]
        const o = e[6]
        const l = e[7]
        return 3 * ((l - n) * (i + s) - (o - t) * (r + u) + r * (t - s) - i * (n - u) + l * (s + t / 3) - o * (u + n / 3)) / 20
      },
      getBounds(e) {
        for (var t = e.slice(0, 2), n = t.slice(), i = [0, 0], r = 0; r < 2; r++)
          re._addBounds(e[r], e[r + 2], e[r + 4], e[r + 6], r, 0, t, n, i)
        return new Y(t[0], t[1], n[0] - t[0], n[1] - t[1])
      },
      _addBounds(e, t, n, i, r, s, u, o, l) {
        function f(E, A) {
          const N = E - A
          const L = E + A
          N < u[r] && (u[r] = N),
          L > o[r] && (o[r] = L)
        }
        s /= 2
        const g = u[r] + s
        const y = o[r] - s
        if (e < g || t < g || n < g || i < g || e > y || t > y || n > y || i > y) {
          if (t < e != t < i && n < e != n < i) {
f(e, 0),
          f(i, 0)
}
          else {
            const _ = 3 * (t - n) - e + i
            let v = 2 * (e + n) - 4 * t
            let b = t - e
            let T = O.solveQuadratic(_, v, b, l)
            let x = 1e-8
            let S = 1 - x
            f(i, 0)
            for (let I = 0; I < T; I++) {
              const m = l[I]
              let w = 1 - m
              x <= m && m <= S && f(w * w * w * e + 3 * w * w * m * t + 3 * w * m * m * n + m * m * m * i, s)
            }
          }
        }
      },
    },
  }, d.each(['getBounds', 'getStrokeBounds', 'getHandleBounds'], function (e) {
    this[e] = function () {
      this._bounds || (this._bounds = {})
      let t = this._bounds[e]
      return t || (t = this._bounds[e] = ke[e]([this._segment1, this._segment2], !1, this._path)),
      t.clone()
    }
  }, {}), d.each({
    isStraight(e, t, n, i) {
      if (t.isZero() && n.isZero())
        return !0
      const r = i.subtract(e)
      if (r.isZero())
        return !1
      if (r.isCollinear(t) && r.isCollinear(n)) {
        const s = new Se(e, i)
        const u = 1e-7
        if (s.getDistance(e.add(t)) < u && s.getDistance(i.add(n)) < u) {
          const o = r.dot(r)
          const l = r.dot(t) / o
          const f = r.dot(n) / o
          return l >= 0 && l <= 1 && f <= 0 && f >= -1
        }
      }
      return !1
    },
    isLinear(e, t, n, i) {
      const r = i.subtract(e).divide(3)
      return t.equals(r) && n.negate().equals(r)
    },
  }, function (e, t) {
    this[t] = function (n) {
      const i = this._segment1
      const r = this._segment2
      return e(i._point, i._handleOut, r._handleIn, r._point, n)
    }
    ,
    this.statics[t] = function (n, i) {
      const r = n[0]
      const s = n[1]
      const u = n[6]
      const o = n[7]
      return e(new C(r, s), new C(n[2] - r, n[3] - s), new C(n[4] - u, n[5] - o), new C(u, o), i)
    }
  }, {
    statics: {},
    hasHandles() {
      return !this._segment1._handleOut.isZero() || !this._segment2._handleIn.isZero()
    },
    hasLength(e) {
      return (!this.getPoint1().equals(this.getPoint2()) || this.hasHandles()) && this.getLength() > (e || 0)
    },
    isCollinear(e) {
      return e && this.isStraight() && e.isStraight() && this.getLine().isCollinear(e.getLine())
    },
    isHorizontal() {
      return this.isStraight() && Math.abs(this.getTangentAtTime(0.5).y) < 1e-8
    },
    isVertical() {
      return this.isStraight() && Math.abs(this.getTangentAtTime(0.5).x) < 1e-8
    },
  }), {
    beans: !1,
    getLocationAt(e, t) {
      return this.getLocationAtTime(t ? e : this.getTimeAt(e))
    },
    getLocationAtTime(e) {
      return e != null && e >= 0 && e <= 1 ? new Ot(this, e) : null
    },
    getTimeAt(e, t) {
      return re.getTimeAt(this.getValues(), e, t)
    },
    getParameterAt: '#getTimeAt',
    getTimesWithTangent() {
      const e = C.read(arguments)
      return e.isZero() ? [] : re.getTimesWithTangent(this.getValues(), e)
    },
    getOffsetAtTime(e) {
      return this.getPartLength(0, e)
    },
    getLocationOf() {
      return this.getLocationAtTime(this.getTimeOf(C.read(arguments)))
    },
    getOffsetOf() {
      const e = this.getLocationOf.apply(this, arguments)
      return e ? e.getOffset() : null
    },
    getTimeOf() {
      return re.getTimeOf(this.getValues(), C.read(arguments))
    },
    getParameterOf: '#getTimeOf',
    getNearestLocation() {
      const e = C.read(arguments)
      const t = this.getValues()
      const n = re.getNearestTime(t, e)
      const i = re.getPoint(t, n)
      return new Ot(this, n, i, null, e.getDistance(i))
    },
    getNearestPoint() {
      const e = this.getNearestLocation.apply(this, arguments)
      return e && e.getPoint()
    },
  }, new function () {
    const e = ['getPoint', 'getTangent', 'getNormal', 'getWeightedTangent', 'getWeightedNormal', 'getCurvature']
    return d.each(e, function (t) {
      this[`${t}At`] = function (n, i) {
        const r = this.getValues()
        return re[t](r, i ? n : re.getTimeAt(r, n))
      }
      ,
      this[`${t}AtTime`] = function (n) {
        return re[t](this.getValues(), n)
      }
    }, {
      statics: {
        _evaluateMethods: e,
      },
    })
  }()
  , new function () {
    function e(i) {
      const r = i[0]
      const s = i[1]
      const u = i[2]
      const o = i[3]
      const l = i[4]
      const f = i[5]
      const g = i[6]
      const y = i[7]
      const _ = 9 * (u - l) + 3 * (g - r)
      const v = 6 * (r + l) - 12 * u
      const b = 3 * (u - r)
      const T = 9 * (o - f) + 3 * (y - s)
      const x = 6 * (s + f) - 12 * o
      const S = 3 * (o - s)
      return function (I) {
        const m = (_ * I + v) * I + b
        const w = (T * I + x) * I + S
        return Math.sqrt(m * m + w * w)
      }
    }
    function t(i, r) {
      return Math.max(2, Math.min(16, Math.ceil(Math.abs(r - i) * 32)))
    }
    function n(i, r, s, u) {
      if (r == null || r < 0 || r > 1)
        return null
      const o = i[0]
      const l = i[1]
      let f = i[2]
      let g = i[3]
      var y = i[4]
      var _ = i[5]
      const v = i[6]
      const b = i[7]
      const T = O.isZero
      T(f - o) && T(g - l) && (f = o,
      g = l),
      T(y - v) && T(_ - b) && (y = v,
      _ = b)
      const x = 3 * (f - o); const S = 3 * (y - f) - x; const I = v - o - x - S; const m = 3 * (g - l); const w = 3 * (_ - g) - m; const E = b - l - m - w; let A; let N
      if (s === 0) {
        A = r === 0 ? o : r === 1 ? v : ((I * r + S) * r + x) * r + o,
        N = r === 0 ? l : r === 1 ? b : ((E * r + w) * r + m) * r + l
      }
      else {
        const L = 1e-8
        const R = 1 - L
        if (r < L
          ? (A = x,
            N = m)
          : r > R
            ? (A = 3 * (v - y),
              N = 3 * (b - _))
            : (A = (3 * I * r + 2 * S) * r + x,
              N = (3 * E * r + 2 * w) * r + m),
        u) {
          A === 0 && N === 0 && (r < L || r > R) && (A = y - f,
          N = _ - g)
          const D = Math.sqrt(A * A + N * N)
          D && (A /= D,
          N /= D)
        }
        if (s === 3) {
          var y = 6 * I * r + 2 * S
          var _ = 6 * E * r + 2 * w
          const V = (A * A + N * N) ** (3 / 2)
          A = V !== 0 ? (A * _ - N * y) / V : 0,
          N = 0
        }
      }
      return s === 2 ? new C(N, -A) : new C(A, N)
    }
    return {
      statics: {
        classify(i) {
          const r = i[0]
          const s = i[1]
          const u = i[2]
          const o = i[3]
          const l = i[4]
          const f = i[5]
          const g = i[6]
          const y = i[7]
          const _ = r * (y - f) + s * (l - g) + g * f - y * l
          const v = u * (s - y) + o * (g - r) + r * y - s * g
          const b = l * (o - s) + f * (r - u) + u * s - o * r
          let T = 3 * b
          let x = T - v
          let S = x - v + _
          const I = Math.sqrt(S * S + x * x + T * T)
          const m = I !== 0 ? 1 / I : 0
          const w = O.isZero
          const E = 'serpentine'
          S *= m,
          x *= m,
          T *= m
          function A(D, V, z) {
            const G = V !== a
            let H = G && V > 0 && V < 1
            let K = G && z > 0 && z < 1
            return G && (!(H || K) || D === 'loop' && !(H && K)) && (D = 'arch',
            H = K = !1),
            {
              type: D,
              roots: H || K ? H && K ? V < z ? [V, z] : [z, V] : [H ? V : z] : null,
            }
          }
          if (w(S))
            return w(x) ? A(w(T) ? 'line' : 'quadratic') : A(E, T / (3 * x))
          const N = 3 * x * x - 4 * S * T
          if (w(N))
            return A('cusp', x / (2 * S))
          const L = N > 0 ? Math.sqrt(N / 3) : Math.sqrt(-N)
          const R = 2 * S
          return A(N > 0 ? E : 'loop', (x + L) / R, (x - L) / R)
        },
        getLength(i, r, s, u) {
          if (r === a && (r = 0),
          s === a && (s = 1),
          re.isStraight(i)) {
            let o = i
            s < 1 && (o = re.subdivide(o, s)[0],
            r /= s),
            r > 0 && (o = re.subdivide(o, r)[1])
            const l = o[6] - o[0]
            const f = o[7] - o[1]
            return Math.sqrt(l * l + f * f)
          }
          return O.integrate(u || e(i), r, s, t(r, s))
        },
        getTimeAt(i, r, s) {
          if (s === a && (s = r < 0 ? 1 : 0),
          r === 0)
            return s
          const u = Math.abs
          const o = 1e-12
          const l = r > 0
          const f = l ? s : 0
          const g = l ? 1 : s
          const y = e(i)
          const _ = re.getLength(i, f, g, y)
          const v = u(r) - _
          if (u(v) < o)
            return l ? g : f
          if (v > o)
            return null
          const b = r / _
          let T = 0
          function x(S) {
            return T += O.integrate(y, s, S, t(s, S)),
            s = S,
            T - r
          }
          return O.findRoot(x, y, s + b, f, g, 32, 1e-12)
        },
        getPoint(i, r) {
          return n(i, r, 0, !1)
        },
        getTangent(i, r) {
          return n(i, r, 1, !0)
        },
        getWeightedTangent(i, r) {
          return n(i, r, 1, !1)
        },
        getNormal(i, r) {
          return n(i, r, 2, !0)
        },
        getWeightedNormal(i, r) {
          return n(i, r, 2, !1)
        },
        getCurvature(i, r) {
          return n(i, r, 3, !1).x
        },
        getPeaks(i) {
          const r = i[0]
          const s = i[1]
          const u = i[2]
          const o = i[3]
          const l = i[4]
          const f = i[5]
          const g = i[6]
          const y = i[7]
          const _ = -r + 3 * u - 3 * l + g
          const v = 3 * r - 6 * u + 3 * l
          const b = -3 * r + 3 * u
          const T = -s + 3 * o - 3 * f + y
          const x = 3 * s - 6 * o + 3 * f
          const S = -3 * s + 3 * o
          const I = 1e-8
          const m = 1 - I
          const w = []
          return O.solveCubic(9 * (_ * _ + T * T), 9 * (_ * v + x * T), 2 * (v * v + x * x) + 3 * (b * _ + S * T), b * v + x * S, w, I, m),
          w.sort()
        },
      },
    }
  }()
  , new function () {
    function e(v, b, T, x, S, I, m) {
      const w = !m && T.getPrevious() === S
      const E = !m && T !== S && T.getNext() === S
      const A = 1e-8
      const N = 1 - A
      if (x !== null && x >= (w ? A : 0) && x <= (E ? N : 1) && I !== null && I >= (E ? A : 0) && I <= (w ? N : 1)) {
        const L = new Ot(T, x, null, m)
        const R = new Ot(S, I, null, m)
        L._intersection = R,
        R._intersection = L,
        (!b || b(L)) && Ot.insert(v, L, !0)
      }
    }
    function t(v, b, T, x, S, I, m, w, E, A, N, L, R) {
      if (++E >= 4096 || ++w >= 40)
        return E
      const D = 1e-9; const V = b[0]; const z = b[1]; const G = b[6]; const H = b[7]; const K = Se.getSignedDistance; const $ = K(V, z, G, H, b[2], b[3]); const W = K(V, z, G, H, b[4], b[5]); const te = $ * W > 0 ? 3 / 4 : 4 / 9; const se = te * Math.min(0, $, W); const ue = te * Math.max(0, $, W); const Ie = K(V, z, G, H, v[0], v[1]); const Ee = K(V, z, G, H, v[2], v[3]); const de = K(V, z, G, H, v[4], v[5]); const ve = K(V, z, G, H, v[6], v[7]); const Oe = n(Ie, Ee, de, ve); const Te = Oe[0]; const Ge = Oe[1]; let Re; let xe
      if ($ === 0 && W === 0 && Ie === 0 && Ee === 0 && de === 0 && ve === 0 || (Re = i(Te, Ge, se, ue)) == null || (xe = i(Te.reverse(), Ge.reverse(), se, ue)) == null)
        return E
      const ze = A + (N - A) * Re
      const De = A + (N - A) * xe
      if (Math.max(R - L, De - ze) < D) {
        var _t = (ze + De) / 2
        var gt = (L + R) / 2
        e(S, I, m ? x : T, m ? gt : _t, m ? T : x, m ? _t : gt)
      }
      else {
        v = re.getPart(v, Re, xe)
        const Et = R - L
        if (xe - Re > 0.8) {
          if (De - ze > Et) {
            var nt = re.subdivide(v, 0.5)
            var _t = (ze + De) / 2
            E = t(b, nt[0], x, T, S, I, !m, w, E, L, R, ze, _t),
            E = t(b, nt[1], x, T, S, I, !m, w, E, L, R, _t, De)
          }
          else {
            var nt = re.subdivide(b, 0.5)
            var gt = (L + R) / 2
            E = t(nt[0], v, x, T, S, I, !m, w, E, L, gt, ze, De),
            E = t(nt[1], v, x, T, S, I, !m, w, E, gt, R, ze, De)
          }
        }
        else { Et === 0 || Et >= D ? E = t(b, v, x, T, S, I, !m, w, E, L, R, ze, De) : E = t(v, b, T, x, S, I, m, w, E, ze, De, L, R) }
      }
      return E
    }
    function n(v, b, T, x) {
      const S = [0, v]; const I = [1 / 3, b]; const m = [2 / 3, T]; const w = [1, x]; const E = b - (2 * v + x) / 3; const A = T - (v + 2 * x) / 3; let N
      if (E * A < 0) { N = [[S, I, w], [S, m, w]] }
      else {
        const L = E / A
        N = [L >= 2 ? [S, I, w] : L <= 0.5 ? [S, m, w] : [S, I, m, w], [S, w]]
      }
      return (E || A) < 0 ? N.reverse() : N
    }
    function i(v, b, T, x) {
      return v[0][1] < T ? r(v, !0, T) : b[0][1] > x ? r(b, !1, x) : v[0][0]
    }
    function r(v, b, T) {
      for (let x = v[0][0], S = v[0][1], I = 1, m = v.length; I < m; I++) {
        const w = v[I][0]
        const E = v[I][1]
        if (b ? E >= T : E <= T)
          return E === T ? w : x + (T - S) * (w - x) / (E - S)
        x = w,
        S = E
      }
      return null
    }
    function s(v, b, T, x, S) {
      const I = O.isZero
      if (I(x) && I(S)) {
        const m = re.getTimeOf(v, new C(b, T))
        return m === null ? [] : [m]
      }
      for (var w = Math.atan2(-S, x), E = Math.sin(w), A = Math.cos(w), N = [], L = [], R = 0; R < 8; R += 2) {
        const D = v[R] - b
        const V = v[R + 1] - T
        N.push(D * A - V * E, D * E + V * A)
      }
      return re.solveCubic(N, 1, 0, L, 0, 1),
      L
    }
    function u(v, b, T, x, S, I, m) {
      for (let w = b[0], E = b[1], A = b[6], N = b[7], L = s(v, w, E, A - w, N - E), R = 0, D = L.length; R < D; R++) {
        const V = L[R]
        const z = re.getPoint(v, V)
        const G = re.getTimeOf(b, z)
        G !== null && e(S, I, m ? x : T, m ? G : V, m ? T : x, m ? V : G)
      }
    }
    function o(v, b, T, x, S, I) {
      const m = Se.intersect(v[0], v[1], v[6], v[7], b[0], b[1], b[6], b[7])
      m && e(S, I, T, re.getTimeOf(v, m), x, re.getTimeOf(b, m))
    }
    function l(v, b, T, x, S, I) {
      const m = 1e-12
      const w = Math.min
      const E = Math.max
      if (E(v[0], v[2], v[4], v[6]) + m > w(b[0], b[2], b[4], b[6]) && w(v[0], v[2], v[4], v[6]) - m < E(b[0], b[2], b[4], b[6]) && E(v[1], v[3], v[5], v[7]) + m > w(b[1], b[3], b[5], b[7]) && w(v[1], v[3], v[5], v[7]) - m < E(b[1], b[3], b[5], b[7])) {
        const A = y(v, b)
        if (A) {
          for (var N = 0; N < 2; N++) {
            const L = A[N]
            e(S, I, T, L[0], x, L[1], !0)
          }
        }
        else {
          const R = re.isStraight(v)
          const D = re.isStraight(b)
          const V = R && D
          const z = R && !D
          const G = S.length
          if ((V ? o : R || D ? u : t)(z ? b : v, z ? v : b, z ? x : T, z ? T : x, S, I, z, 0, 0, 0, 1, 0, 1),
          !V || S.length === G) {
            for (var N = 0; N < 4; N++) {
              const H = N >> 1
              const K = N & 1
              const $ = H * 6
              const W = K * 6
              const te = new C(v[$], v[$ + 1])
              const se = new C(b[W], b[W + 1])
              te.isClose(se, m) && e(S, I, T, H, x, K)
            }
          }
        }
      }
      return S
    }
    function f(v, b, T, x) {
      const S = re.classify(v)
      if (S.type === 'loop') {
        const I = S.roots
        e(T, x, b, I[0], b, I[1])
      }
      return T
    }
    function g(v, b, T, x, S, I) {
      const m = 1e-7
      const w = !b
      w && (b = v)
      for (var E = v.length, A = b.length, N = new Array(E), L = w ? N : new Array(A), R = [], D = 0; D < E; D++)
        N[D] = v[D].getValues(x)
      if (!w) {
        for (var D = 0; D < A; D++)
          L[D] = b[D].getValues(S)
      }
      for (let V = q.findCurveBoundsCollisions(N, L, m), z = 0; z < E; z++) {
        const G = v[z]
        const H = N[z]
        w && f(H, G, R, T)
        const K = V[z]
        if (K) {
          for (let $ = 0; $ < K.length; $++) {
            if (I && R.length)
              return R
            const W = K[$]
            if (!w || W > z) {
              const te = b[W]
              const se = L[W]
              l(H, se, G, te, R, T)
            }
          }
        }
      }
      return R
    }
    function y(v, b) {
      function T(ve) {
        const Oe = ve[6] - ve[0]
        const Te = ve[7] - ve[1]
        return Oe * Oe + Te * Te
      }
      const x = Math.abs
      const S = Se.getDistance
      const I = 1e-8
      const m = 1e-7
      let w = re.isStraight(v)
      let E = re.isStraight(b)
      let A = w && E
      const N = T(v) < T(b)
      const L = N ? b : v
      const R = N ? v : b
      const D = L[0]
      const V = L[1]
      const z = L[6] - D
      const G = L[7] - V
      if (S(D, V, z, G, R[0], R[1], !0) < m && S(D, V, z, G, R[6], R[7], !0) < m)
        !A && S(D, V, z, G, L[2], L[3], !0) < m && S(D, V, z, G, L[4], L[5], !0) < m && S(D, V, z, G, R[2], R[3], !0) < m && S(D, V, z, G, R[4], R[5], !0) < m && (w = E = A = !0)
      else if (A)
        return null
      if (w ^ E)
        return null
      for (var H = [v, b], K = [], $ = 0; $ < 4 && K.length < 2; $++) {
        const W = $ & 1
        const te = W ^ 1
        const se = $ >> 1
        const ue = re.getTimeOf(H[W], new C(H[te][se ? 6 : 0], H[te][se ? 7 : 1]))
        if (ue != null) {
          const Ie = W ? [se, ue] : [ue, se];
          (!K.length || x(Ie[0] - K[0][0]) > I && x(Ie[1] - K[0][1]) > I) && K.push(Ie)
        }
        if ($ > 2 && !K.length)
          break
      }
      if (K.length !== 2) { K = null }
      else if (!A) {
        const Ee = re.getPart(v, K[0][0], K[1][0])
        const de = re.getPart(b, K[0][1], K[1][1]);
        (x(de[2] - Ee[2]) > m || x(de[3] - Ee[3]) > m || x(de[4] - Ee[4]) > m || x(de[5] - Ee[5]) > m) && (K = null)
      }
      return K
    }
    function _(v, b) {
      const T = v[0]
      const x = v[1]
      const S = v[2]
      const I = v[3]
      const m = v[4]
      const w = v[5]
      const E = v[6]
      const A = v[7]
      const N = b.normalize()
      const L = N.x
      const R = N.y
      const D = 3 * E - 9 * m + 9 * S - 3 * T
      const V = 3 * A - 9 * w + 9 * I - 3 * x
      const z = 6 * m - 12 * S + 6 * T
      const G = 6 * w - 12 * I + 6 * x
      const H = 3 * S - 3 * T
      const K = 3 * I - 3 * x
      var $ = 2 * D * R - 2 * V * L
      const W = []
      if (Math.abs($) < O.CURVETIME_EPSILON) {
        const te = D * K - V * H
        var $ = D * G - V * z
        if ($ != 0) {
          const se = -te / $
          se >= 0 && se <= 1 && W.push(se)
        }
      }
      else {
        const ue = (z * z - 4 * D * H) * R * R + (-2 * z * G + 4 * V * H + 4 * D * K) * L * R + (G * G - 4 * V * K) * L * L
        const Ie = z * R - G * L
        if (ue >= 0 && $ != 0) {
          const Ee = Math.sqrt(ue)
          const de = -(Ie + Ee) / $
          const ve = (-Ie + Ee) / $
          de >= 0 && de <= 1 && W.push(de),
          ve >= 0 && ve <= 1 && W.push(ve)
        }
      }
      return W
    }
    return {
      getIntersections(v) {
        const b = this.getValues()
        const T = v && v !== this && v.getValues()
        return T ? l(b, T, this, v, []) : f(b, this, [])
      },
      statics: {
        getOverlaps: y,
        getIntersections: g,
        getCurveLineIntersections: s,
        getTimesWithTangent: _,
      },
    }
  }(),
  )
  var Ot = d.extend({
    _class: 'CurveLocation',
    initialize(t, n, i, r, s) {
      if (n >= 0.99999999) {
        const u = t.getNext()
        u && (n = 0,
        t = u)
      }
      this._setCurve(t),
      this._time = n,
      this._point = i || t.getPointAtTime(n),
      this._overlap = r,
      this._distance = s,
      this._intersection = this._next = this._previous = null
    },
    _setPath(e) {
      this._path = e,
      this._version = e ? e._version : 0
    },
    _setCurve(e) {
      this._setPath(e._path),
      this._curve = e,
      this._segment = null,
      this._segment1 = e._segment1,
      this._segment2 = e._segment2
    },
    _setSegment(e) {
      const t = e.getCurve()
      t
        ? this._setCurve(t)
        : (this._setPath(e._path),
          this._segment1 = e,
          this._segment2 = null),
      this._segment = e,
      this._time = e === this._segment1 ? 0 : 1,
      this._point = e._point.clone()
    },
    getSegment() {
      let e = this._segment
      if (!e) {
        const t = this.getCurve()
        const n = this.getTime()
        n === 0 ? e = t._segment1 : n === 1 ? e = t._segment2 : n != null && (e = t.getPartLength(0, n) < t.getPartLength(n, 1) ? t._segment1 : t._segment2),
        this._segment = e
      }
      return e
    },
    getCurve() {
      const e = this._path
      const t = this
      e && e._version !== this._version && (this._time = this._offset = this._curveOffset = this._curve = null)
      function n(i) {
        const r = i && i.getCurve()
        if (r && (t._time = r.getTimeOf(t._point)) != null) {
          return t._setCurve(r),
          r
        }
      }
      return this._curve || n(this._segment) || n(this._segment1) || n(this._segment2.getPrevious())
    },
    getPath() {
      const e = this.getCurve()
      return e && e._path
    },
    getIndex() {
      const e = this.getCurve()
      return e && e.getIndex()
    },
    getTime() {
      const e = this.getCurve()
      const t = this._time
      return e && t == null ? this._time = e.getTimeOf(this._point) : t
    },
    getParameter: '#getTime',
    getPoint() {
      return this._point
    },
    getOffset() {
      let e = this._offset
      if (e == null) {
        e = 0
        const t = this.getPath()
        const n = this.getIndex()
        if (t && n != null) {
          for (let i = t.getCurves(), r = 0; r < n; r++)
            e += i[r].getLength()
        }
        this._offset = e += this.getCurveOffset()
      }
      return e
    },
    getCurveOffset() {
      let e = this._curveOffset
      if (e == null) {
        const t = this.getCurve()
        const n = this.getTime()
        this._curveOffset = e = n != null && t && t.getPartLength(0, n)
      }
      return e
    },
    getIntersection() {
      return this._intersection
    },
    getDistance() {
      return this._distance
    },
    divide() {
      const e = this.getCurve()
      const t = e && e.divideAtTime(this.getTime())
      return t && this._setSegment(t._segment1),
      t
    },
    split() {
      const e = this.getCurve()
      const t = e._path
      const n = e && e.splitAtTime(this.getTime())
      return n && this._setSegment(t.getLastSegment()),
      n
    },
    equals(e, t) {
      let n = this === e
      if (!n && e instanceof Ot) {
        const i = this.getCurve()
        const r = e.getCurve()
        const s = i._path
        const u = r._path
        if (s === u) {
          const o = Math.abs
          const l = 1e-7
          const f = o(this.getOffset() - e.getOffset())
          const g = !t && this._intersection
          const y = !t && e._intersection
          n = (f < l || s && o(s.getLength() - f) < l) && (!g && !y || g && y && g.equals(y, !0))
        }
      }
      return n
    },
    toString() {
      const e = []
      const t = this.getPoint()
      const n = k.instance
      t && e.push(`point: ${t}`)
      const i = this.getIndex()
      i != null && e.push(`index: ${i}`)
      const r = this.getTime()
      return r != null && e.push(`time: ${n.number(r)}`),
      this._distance != null && e.push(`distance: ${n.number(this._distance)}`),
      `{ ${e.join(', ')} }`
    },
    isTouching() {
      const e = this._intersection
      if (e && this.getTangent().isCollinear(e.getTangent())) {
        const t = this.getCurve()
        const n = e.getCurve()
        return !(t.isStraight() && n.isStraight() && t.getLine().intersect(n.getLine()))
      }
      return !1
    },
    isCrossing() {
      const e = this._intersection
      if (!e)
        return !1
      const t = this.getTime()
      const n = e.getTime()
      const i = 1e-8
      const r = 1 - i
      const s = t >= i && t <= r
      const u = n >= i && n <= r
      if (s && u)
        return !this.isTouching()
      let o = this.getCurve()
      const l = o && t < i ? o.getPrevious() : o
      let f = e.getCurve()
      const g = f && n < i ? f.getPrevious() : f
      if (t > r && (o = o.getNext()),
      n > r && (f = f.getNext()),
      !l || !o || !g || !f)
        return !1
      const y = []
      function _(L, R) {
        const D = L.getValues()
        const V = re.classify(D).roots || re.getPeaks(D)
        const z = V.length
        const G = re.getLength(D, R && z ? V[z - 1] : 0, !R && z ? V[0] : 1)
        y.push(z ? G : G / 32)
      }
      function v(L, R, D) {
        return R < D ? L > R && L < D : L > R || L < D
      }
      s || (_(l, !0),
      _(o, !1)),
      u || (_(g, !0),
      _(f, !1))
      const b = this.getPoint()
      const T = Math.min.apply(Math, y)
      const x = s ? o.getTangentAtTime(t) : o.getPointAt(T).subtract(b)
      const S = s ? x.negate() : l.getPointAt(-T).subtract(b)
      const I = u ? f.getTangentAtTime(n) : f.getPointAt(T).subtract(b)
      const m = u ? I.negate() : g.getPointAt(-T).subtract(b)
      const w = S.getAngle()
      const E = x.getAngle()
      const A = m.getAngle()
      const N = I.getAngle()
      return !!(s ? v(w, A, N) ^ v(E, A, N) && v(w, N, A) ^ v(E, N, A) : v(A, w, E) ^ v(N, w, E) && v(A, E, w) ^ v(N, E, w))
    },
    hasOverlap() {
      return !!this._overlap
    },
  }, d.each(re._evaluateMethods, function (e) {
    const t = `${e}At`
    this[e] = function () {
      const n = this.getCurve()
      const i = this.getTime()
      return i != null && n && n[t](i, !0)
    }
  }, {
    preserve: !0,
  }), new function () {
    function e(t, n, i) {
      const r = t.length
      let s = 0
      let u = r - 1
      function o(b, T) {
        for (let x = b + T; x >= -1 && x <= r; x += T) {
          const S = t[(x % r + r) % r]
          if (!n.getPoint().isClose(S.getPoint(), 1e-7))
            break
          if (n.equals(S))
            return S
        }
        return null
      }
      for (; s <= u;) {
        const l = s + u >>> 1; const f = t[l]; var g
        if (i && (g = n.equals(f) ? f : o(l, -1) || o(l, 1))) {
          return n._overlap && (g._overlap = g._intersection._overlap = !0),
          g
        }
        const y = n.getPath()
        const _ = f.getPath()
        const v = y !== _ ? y._id - _._id : n.getIndex() + n.getTime() - (f.getIndex() + f.getTime())
        v < 0 ? u = l - 1 : s = l + 1
      }
      return t.splice(s, 0, n),
      n
    }
    return {
      statics: {
        insert: e,
        expand(t) {
          for (var n = t.slice(), i = t.length - 1; i >= 0; i--)
            e(n, t[i]._intersection, !1)
          return n
        },
      },
    }
  }(),
  )
  var Ft = oe.extend({
    _class: 'PathItem',
    _selectBounds: !1,
    _canScaleStroke: !0,
    beans: !0,
    initialize() {},
    statics: {
      create(e) {
        let t, n, i
        if (d.isPlainObject(e)
          ? (n = e.segments,
            t = e.pathData)
          : Array.isArray(e) ? n = e : typeof e == 'string' && (t = e),
        n) {
          const r = n[0]
          i = r && Array.isArray(r[0])
        }
        else { t && (i = (t.match(/m/gi) || []).length > 1 || /z\s*\S+/i.test(t)) }
        const s = i ? ot : ke
        return new s(e)
      },
    },
    _asPathItem() {
      return this
    },
    isClockwise() {
      return this.getArea() >= 0
    },
    setClockwise(e) {
      this.isClockwise() != (e = !!e) && this.reverse()
    },
    setPathData(e) {
      const t = e && e.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/ig); let n; let i = !1; let r; let s; let u = new C(); let o = new C()
      function l(m, w) {
        let E = +n[m]
        return i && (E += u[w]),
        E
      }
      function f(m) {
        return new C(l(m, 'x'), l(m + 1, 'y'))
      }
      this.clear()
      for (let g = 0, y = t && t.length; g < y; g++) {
        const _ = t[g]
        const v = _[0]
        const b = v.toLowerCase()
        n = _.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g)
        const T = n && n.length
        switch (i = v === b,
        r === 'z' && !/[mz]/.test(b) && this.moveTo(u),
        b) {
          case 'm':
          case 'l':
            for (var x = b === 'm', S = 0; S < T; S += 2) {
              this[x ? 'moveTo' : 'lineTo'](u = f(S)),
              x && (o = u,
              x = !1)
            }
            s = u
            break
          case 'h':
          case 'v':
            var I = b === 'h' ? 'x' : 'y'
            u = u.clone()
            for (var S = 0; S < T; S++) {
              u[I] = l(S, I),
              this.lineTo(u)
            }
            s = u
            break
          case 'c':
            for (var S = 0; S < T; S += 6)
              this.cubicCurveTo(f(S), s = f(S + 2), u = f(S + 4))
            break
          case 's':
            for (var S = 0; S < T; S += 4) {
              this.cubicCurveTo(/[cs]/.test(r) ? u.multiply(2).subtract(s) : u, s = f(S), u = f(S + 2)),
              r = b
            }
            break
          case 'q':
            for (var S = 0; S < T; S += 4)
              this.quadraticCurveTo(s = f(S), u = f(S + 2))
            break
          case 't':
            for (var S = 0; S < T; S += 2) {
              this.quadraticCurveTo(s = /[qt]/.test(r) ? u.multiply(2).subtract(s) : u, u = f(S)),
              r = b
            }
            break
          case 'a':
            for (var S = 0; S < T; S += 7)
              this.arcTo(u = f(S + 5), new J(+n[S], +n[S + 1]), +n[S + 2], +n[S + 4], +n[S + 3])
            break
          case 'z':
            this.closePath(1e-12),
            u = o
            break
        }
        r = b
      }
    },
    _canComposite() {
      return !(this.hasFill() && this.hasStroke())
    },
    _contains(e) {
      const t = e.isInside(this.getBounds({
        internal: !0,
        handle: !0,
      }))
        ? this._getWinding(e)
        : {}
      return t.onPath || !!(this.getFillRule() === 'evenodd' ? t.windingL & 1 || t.windingR & 1 : t.winding)
    },
    getIntersections(e, t, n, i) {
      const r = this === e || !e
      const s = this._matrix._orNullIfIdentity()
      const u = r ? s : (n || e._matrix)._orNullIfIdentity()
      return r || this.getBounds(s).intersects(e.getBounds(u), 1e-12) ? re.getIntersections(this.getCurves(), !r && e.getCurves(), t, s, u, i) : []
    },
    getCrossings(e) {
      return this.getIntersections(e, (t) => {
        return t.isCrossing()
      })
    },
    getNearestLocation() {
      for (var e = C.read(arguments), t = this.getCurves(), n = 1 / 0, i = null, r = 0, s = t.length; r < s; r++) {
        const u = t[r].getNearestLocation(e)
        u._distance < n && (n = u._distance,
        i = u)
      }
      return i
    },
    getNearestPoint() {
      const e = this.getNearestLocation.apply(this, arguments)
      return e && e.getPoint()
    },
    interpolate(e, t, n) {
      const i = !this._children
      const r = i ? '_segments' : '_children'
      const s = e[r]
      const u = t[r]
      const o = this[r]
      if (!s || !u || s.length !== u.length)
        throw new Error(`Invalid operands in interpolate() call: ${e}, ${t}`)
      const l = o.length
      const f = u.length
      if (l < f) {
        for (var g = i ? pe : ke, y = l; y < f; y++)
          this.add(new g())
      }
      else { l > f && this[i ? 'removeSegments' : 'removeChildren'](f, l) }
      for (var y = 0; y < f; y++)
        o[y].interpolate(s[y], u[y], n)
      i && (this.setClosed(e._closed),
      this._changed(9))
    },
    compare(e) {
      let t = !1
      if (e) {
        const n = this._children || [this]
        const i = e._children ? e._children.slice() : [e]
        const r = n.length
        const s = i.length
        const u = []
        let o = 0
        t = !0
        for (let l = q.findItemBoundsCollisions(n, i, O.GEOMETRIC_EPSILON), f = r - 1; f >= 0 && t; f--) {
          const g = n[f]
          t = !1
          const y = l[f]
          if (y) {
            for (let _ = y.length - 1; _ >= 0 && !t; _--) {
              g.compare(i[y[_]]) && (u[y[_]] || (u[y[_]] = !0,
              o++),
              t = !0)
            }
          }
        }
        t = t && o === s
      }
      return t
    },
  })
  var ke = Ft.extend({
    _class: 'Path',
    _serializeFields: {
      segments: [],
      closed: !1,
    },
    initialize(t) {
      this._closed = !1,
      this._segments = [],
      this._version = 0
      const n = arguments
      const i = Array.isArray(t) ? typeof t[0] == 'object' ? t : n : t && t.size === a && (t.x !== a || t.point !== a) ? n : null
      i && i.length > 0
        ? this.setSegments(i)
        : (this._curves = a,
          this._segmentSelection = 0,
          !i && typeof t == 'string' && (this.setPathData(t),
          t = null)),
      this._initialize(!i && t)
    },
    _equals(e) {
      return this._closed === e._closed && d.equals(this._segments, e._segments)
    },
    copyContent(e) {
      this.setSegments(e._segments),
      this._closed = e._closed
    },
    _changed: function e(t) {
      if (e.base.call(this, t),
      t & 8) {
        if (this._length = this._area = a,
        t & 32) { this._version++ }
        else if (this._curves) {
          for (let n = 0, i = this._curves.length; n < i; n++)
            this._curves[n]._changed()
        }
      }
      else { t & 64 && (this._bounds = a) }
    },
    getStyle() {
      const e = this._parent
      return (e instanceof ot ? e : this)._style
    },
    getSegments() {
      return this._segments
    },
    setSegments(e) {
      const t = this.isFullySelected()
      let n = e && e.length
      if (this._segments.length = 0,
      this._segmentSelection = 0,
      this._curves = a,
      n) {
        const i = e[n - 1]
        typeof i == 'boolean' && (this.setClosed(i),
        n--),
        this._add(pe.readList(e, 0, {}, n))
      }
      t && this.setFullySelected(!0)
    },
    getFirstSegment() {
      return this._segments[0]
    },
    getLastSegment() {
      return this._segments[this._segments.length - 1]
    },
    getCurves() {
      let e = this._curves
      const t = this._segments
      if (!e) {
        const n = this._countCurves()
        e = this._curves = new Array(n)
        for (let i = 0; i < n; i++)
          e[i] = new re(this, t[i], t[i + 1] || t[0])
      }
      return e
    },
    getFirstCurve() {
      return this.getCurves()[0]
    },
    getLastCurve() {
      const e = this.getCurves()
      return e[e.length - 1]
    },
    isClosed() {
      return this._closed
    },
    setClosed(e) {
      if (this._closed != (e = !!e)) {
        if (this._closed = e,
        this._curves) {
          const t = this._curves.length = this._countCurves()
          e && (this._curves[t - 1] = new re(this, this._segments[t - 1], this._segments[0]))
        }
        this._changed(41)
      }
    },
  }, {
    beans: !0,
    getPathData(e, t) {
      const n = this._segments; const i = n.length; const r = new k(t); const s = new Array(6); let u = !0; let o; let l; let f; let g; let y; let _; let v; let b; const T = []
      function x(I, m) {
        if (I._transformCoordinates(e, s),
        o = s[0],
        l = s[1],
        u) {
          T.push(`M${r.pair(o, l)}`),
          u = !1
        }
        else if (y = s[2],
        _ = s[3],
        y === o && _ === l && v === f && b === g) {
          if (!m) {
            const w = o - f
            const E = l - g
            T.push(w === 0 ? `v${r.number(E)}` : E === 0 ? `h${r.number(w)}` : `l${r.pair(w, E)}`)
          }
        }
        else { T.push(`c${r.pair(v - f, b - g)} ${r.pair(y - f, _ - g)} ${r.pair(o - f, l - g)}`) }
        f = o,
        g = l,
        v = s[4],
        b = s[5]
      }
      if (!i)
        return ''
      for (let S = 0; S < i; S++)
        x(n[S])
      return this._closed && i > 0 && (x(n[0], !0),
      T.push('z')),
      T.join('')
    },
    isEmpty() {
      return !this._segments.length
    },
    _transformContent(e) {
      for (let t = this._segments, n = new Array(6), i = 0, r = t.length; i < r; i++)
        t[i]._transformCoordinates(e, n, !0)
      return !0
    },
    _add(e, u) {
      for (var n = this._segments, i = this._curves, r = e.length, s = u == null, u = s ? n.length : u, o = 0; o < r; o++) {
        let l = e[o]
        l._path && (l = e[o] = l.clone()),
        l._path = this,
        l._index = u + o,
        l._selection && this._updateSelection(l, 0, l._selection)
      }
      if (s) { d.push(n, e) }
      else {
        n.splice.apply(n, [u, 0].concat(e))
        for (var o = u + r, f = n.length; o < f; o++)
          n[o]._index = o
      }
      if (i) {
        const g = this._countCurves()
        const y = u > 0 && u + r - 1 === g ? u - 1 : u
        let _ = y
        const v = Math.min(y + r, g)
        e._curves && (i.splice.apply(i, [y, 0].concat(e._curves)),
        _ += e._curves.length)
        for (var o = _; o < v; o++)
          i.splice(o, 0, new re(this, null, null))
        this._adjustCurves(y, v)
      }
      return this._changed(41),
      e
    },
    _adjustCurves(e, t) {
      for (var n = this._segments, i = this._curves, r, s = e; s < t; s++) {
        r = i[s],
        r._path = this,
        r._segment1 = n[s],
        r._segment2 = n[s + 1] || n[0],
        r._changed()
      }
      (r = i[this._closed && !e ? n.length - 1 : e - 1]) && (r._segment2 = n[e] || n[0],
      r._changed()),
      (r = i[t]) && (r._segment1 = n[t],
      r._changed())
    },
    _countCurves() {
      const e = this._segments.length
      return !this._closed && e > 0 ? e - 1 : e
    },
    add(e) {
      const t = arguments
      return t.length > 1 && typeof e != 'number' ? this._add(pe.readList(t)) : this._add([pe.read(t)])[0]
    },
    insert(e, t) {
      const n = arguments
      return n.length > 2 && typeof t != 'number' ? this._add(pe.readList(n, 1), e) : this._add([pe.read(n, 1)], e)[0]
    },
    addSegment() {
      return this._add([pe.read(arguments)])[0]
    },
    insertSegment(e) {
      return this._add([pe.read(arguments, 1)], e)[0]
    },
    addSegments(e) {
      return this._add(pe.readList(e))
    },
    insertSegments(e, t) {
      return this._add(pe.readList(t), e)
    },
    removeSegment(e) {
      return this.removeSegments(e, e + 1)[0] || null
    },
    removeSegments(e, t, n) {
      e = e || 0,
      t = d.pick(t, this._segments.length)
      const i = this._segments
      var r = this._curves
      const s = i.length
      const u = i.splice(e, t - e)
      const o = u.length
      if (!o)
        return u
      for (var l = 0; l < o; l++) {
        const f = u[l]
        f._selection && this._updateSelection(f, f._selection, 0),
        f._index = f._path = null
      }
      for (var l = e, g = i.length; l < g; l++)
        i[l]._index = l
      if (r) {
        for (var y = e > 0 && t === s + (this._closed ? 1 : 0) ? e - 1 : e, r = r.splice(y, o), l = r.length - 1; l >= 0; l--)
          r[l]._path = null
        n && (u._curves = r.slice(1)),
        this._adjustCurves(y, y)
      }
      return this._changed(41),
      u
    },
    clear: '#removeSegments',
    hasHandles() {
      for (let e = this._segments, t = 0, n = e.length; t < n; t++) {
        if (e[t].hasHandles())
          return !0
      }
      return !1
    },
    clearHandles() {
      for (let e = this._segments, t = 0, n = e.length; t < n; t++)
        e[t].clearHandles()
    },
    getLength() {
      if (this._length == null) {
        for (var e = this.getCurves(), t = 0, n = 0, i = e.length; n < i; n++)
          t += e[n].getLength()
        this._length = t
      }
      return this._length
    },
    getArea() {
      let e = this._area
      if (e == null) {
        const t = this._segments
        const n = this._closed
        e = 0
        for (let i = 0, r = t.length; i < r; i++) {
          const s = i + 1 === r
          e += re.getArea(re.getValues(t[i], t[s ? 0 : i + 1], null, s && !n))
        }
        this._area = e
      }
      return e
    },
    isFullySelected() {
      const e = this._segments.length
      return this.isSelected() && e > 0 && this._segmentSelection === e * 7
    },
    setFullySelected(e) {
      e && this._selectSegments(!0),
      this.setSelected(e)
    },
    setSelection: function e(t) {
      t & 1 || this._selectSegments(!1),
      e.base.call(this, t)
    },
    _selectSegments(e) {
      const t = this._segments
      const n = t.length
      const i = e ? 7 : 0
      this._segmentSelection = i * n
      for (let r = 0; r < n; r++)
        t[r]._selection = i
    },
    _updateSelection(e, t, n) {
      e._selection = n
      const i = this._segmentSelection += n - t
      i > 0 && this.setSelected(!0)
    },
    divideAt(e) {
      const t = this.getLocationAt(e); let n
      return t && (n = t.getCurve().divideAt(t.getCurveOffset())) ? n._segment1 : null
    },
    splitAt(e) {
      const t = this.getLocationAt(e)
      let n = t && t.index
      let i = t && t.time
      const r = 1e-8
      const s = 1 - r
      i > s && (n++,
      i = 0)
      const u = this.getCurves()
      if (n >= 0 && n < u.length) {
        i >= r && u[n++].divideAtTime(i)
        const o = this.removeSegments(n, this._segments.length, !0); let l
        return this._closed
          ? (this.setClosed(!1),
            l = this)
          : (l = new ke(oe.NO_INSERT),
            l.insertAbove(this),
            l.copyAttributes(this)),
        l._add(o, 0),
        this.addSegment(o[0]),
        l
      }
      return null
    },
    split(e, t) {
      let n; const i = t === a ? e : (n = this.getCurves()[e]) && n.getLocationAtTime(t)
      return i != null ? this.splitAt(i) : null
    },
    join(e, t) {
      const n = t || 0
      if (e && e !== this) {
        const i = e._segments
        const r = this.getLastSegment()
        let s = e.getLastSegment()
        if (!s)
          return this
        r && r._point.isClose(s._point, n) && e.reverse()
        const u = e.getFirstSegment()
        if (r && r._point.isClose(u._point, n)) {
          r.setHandleOut(u._handleOut),
          this._add(i.slice(1))
        }
        else {
          const o = this.getFirstSegment()
          o && o._point.isClose(u._point, n) && e.reverse(),
          s = e.getLastSegment(),
          o && o._point.isClose(s._point, n)
            ? (o.setHandleIn(s._handleIn),
              this._add(i.slice(0, i.length - 1), 0))
            : this._add(i.slice())
        }
        e._closed && this._add([i[0]]),
        e.remove()
      }
      const l = this.getFirstSegment()
      const f = this.getLastSegment()
      return l !== f && l._point.isClose(f._point, n) && (l.setHandleIn(f._handleIn),
      f.remove(),
      this.setClosed(!0)),
      this
    },
    reduce(e) {
      for (let t = this.getCurves(), n = e && e.simplify, i = n ? 1e-7 : 0, r = t.length - 1; r >= 0; r--) {
        const s = t[r]
        !s.hasHandles() && (!s.hasLength(i) || n && s.isCollinear(s.getNext())) && s.remove()
      }
      return this
    },
    reverse() {
      this._segments.reverse()
      for (let e = 0, t = this._segments.length; e < t; e++) {
        const n = this._segments[e]
        const i = n._handleIn
        n._handleIn = n._handleOut,
        n._handleOut = i,
        n._index = e
      }
      this._curves = null,
      this._changed(9)
    },
    flatten(e) {
      for (var t = new kt(this, e || 0.25, 256, !0), n = t.parts, i = n.length, r = [], s = 0; s < i; s++)
        r.push(new pe(n[s].curve.slice(0, 2)))
      !this._closed && i > 0 && r.push(new pe(n[i - 1].curve.slice(6))),
      this.setSegments(r)
    },
    simplify(e) {
      const t = new yn(this).fit(e || 2.5)
      return t && this.setSegments(t),
      !!t
    },
    smooth(e) {
      const t = this
      const n = e || {}
      const i = n.type || 'asymmetric'
      const r = this._segments
      const s = r.length
      const u = this._closed
      function o(Te, Ge) {
        let Re = Te && Te.index
        if (Re != null) {
          const xe = Te.path
          if (xe && xe !== t)
            throw new Error(`${Te._class} ${Re} of ${xe} is not part of ${t}`)
          Ge && Te instanceof re && Re++
        }
        else { Re = typeof Te == 'number' ? Te : Ge }
        return Math.min(Re < 0 && u ? Re % s : Re < 0 ? Re + s : Re, s - 1)
      }
      const l = u && n.from === a && n.to === a
      let f = o(n.from, 0)
      let g = o(n.to, s - 1)
      if (f > g) {
        if (u) { f -= s }
        else {
          const y = f
          f = g,
          g = y
        }
      }
      if (/^(?:asymmetric|continuous)$/.test(i)) {
        const _ = i === 'asymmetric'
        const v = Math.min
        const b = g - f + 1
        let T = b - 1
        const x = l ? v(b, 4) : 1
        let S = x
        let I = x
        const m = []
        if (u || (S = v(1, f),
        I = v(1, s - g - 1)),
        T += S + I,
        T <= 1)
          return
        for (var w = 0, E = f - S; w <= T; w++,
        E++)
          m[w] = r[(E < 0 ? E + s : E) % s]._point
        for (var A = m[0]._x + 2 * m[1]._x, N = m[0]._y + 2 * m[1]._y, L = 2, R = T - 1, D = [A], V = [N], z = [L], G = [], H = [], w = 1; w < T; w++) {
          const K = w < R
          const $ = K || _ ? 1 : 2
          const W = K ? 4 : _ ? 2 : 7
          const te = K ? 4 : _ ? 3 : 8
          const se = K ? 2 : _ ? 0 : 1
          const ue = $ / L
          L = z[w] = W - ue,
          A = D[w] = te * m[w]._x + se * m[w + 1]._x - ue * A,
          N = V[w] = te * m[w]._y + se * m[w + 1]._y - ue * N
        }
        G[R] = D[R] / z[R],
        H[R] = V[R] / z[R]
        for (var w = T - 2; w >= 0; w--) {
          G[w] = (D[w] - G[w + 1]) / z[w],
          H[w] = (V[w] - H[w + 1]) / z[w]
        }
        G[T] = (3 * m[T]._x - G[R]) / 2,
        H[T] = (3 * m[T]._y - H[R]) / 2
        for (var w = S, Ie = T - I, E = f; w <= Ie; w++,
        E++) {
          const Ee = r[E < 0 ? E + s : E]
          const de = Ee._point
          const ve = G[w] - de._x
          const Oe = H[w] - de._y;
          (l || w < Ie) && Ee.setHandleOut(ve, Oe),
          (l || w > S) && Ee.setHandleIn(-ve, -Oe)
        }
      }
      else {
        for (var w = f; w <= g; w++)
          r[w < 0 ? w + s : w].smooth(n, !l && w === f, !l && w === g)
      }
    },
    toShape(e) {
      if (!this._closed)
        return null
      const t = this._segments; let n; let i; let r; let s
      function u(_, v) {
        const b = t[_]
        const T = b.getNext()
        const x = t[v]
        const S = x.getNext()
        return b._handleOut.isZero() && T._handleIn.isZero() && x._handleOut.isZero() && S._handleIn.isZero() && T._point.subtract(b._point).isCollinear(S._point.subtract(x._point))
      }
      function o(_) {
        const v = t[_]
        const b = v.getPrevious()
        const T = v.getNext()
        return b._handleOut.isZero() && v._handleIn.isZero() && v._handleOut.isZero() && T._handleIn.isZero() && v._point.subtract(b._point).isOrthogonal(T._point.subtract(v._point))
      }
      function l(_) {
        const v = t[_]
        const b = v.getNext()
        const T = v._handleOut
        const x = b._handleIn
        const S = 0.5522847498307936
        if (T.isOrthogonal(x)) {
          const I = v._point
          const m = b._point
          const w = new Se(I, T, !0).intersect(new Se(m, x, !0), !0)
          return w && O.isZero(T.getLength() / w.subtract(I).getLength() - S) && O.isZero(x.getLength() / w.subtract(m).getLength() - S)
        }
        return !1
      }
      function f(_, v) {
        return t[_]._point.getDistance(t[v]._point)
      }
      if (!this.hasHandles() && t.length === 4 && u(0, 2) && u(1, 3) && o(1)
        ? (n = je.Rectangle,
          i = new J(f(0, 3), f(0, 1)),
          s = t[1]._point.add(t[2]._point).divide(2))
        : t.length === 8 && l(0) && l(2) && l(4) && l(6) && u(1, 5) && u(3, 7)
          ? (n = je.Rectangle,
            i = new J(f(1, 6), f(0, 3)),
            r = i.subtract(new J(f(0, 7), f(1, 2))).divide(2),
            s = t[3]._point.add(t[4]._point).divide(2))
          : t.length === 4 && l(0) && l(1) && l(2) && l(3) && (O.isZero(f(0, 2) - f(1, 3))
            ? (n = je.Circle,
              r = f(0, 2) / 2)
            : (n = je.Ellipse,
              r = new J(f(2, 0) / 2, f(3, 1) / 2)),
          s = t[1]._point),
      n) {
        const g = this.getPosition(!0)
        const y = new n({
          center: g,
          size: i,
          radius: r,
          insert: !1,
        })
        return y.copyAttributes(this, !0),
        y._matrix.prepend(this._matrix),
        y.rotate(s.subtract(g).getAngle() + 90),
        (e === a || e) && y.insertAbove(this),
        y
      }
      return null
    },
    toPath: '#clone',
    compare: function e(t) {
      if (!t || t instanceof ot)
        return e.base.call(this, t)
      const n = this.getCurves()
      const i = t.getCurves()
      const r = n.length
      const s = i.length
      if (!r || !s)
        return r == s
      for (var u = n[0].getValues(), o = [], l = 0, f, g = 0, y, _ = 0; _ < s; _++) {
        var x = i[_].getValues()
        o.push(x)
        var v = re.getOverlaps(u, x)
        if (v) {
          f = !_ && v[0][0] > 0 ? s - 1 : _,
          y = v[0][1]
          break
        }
      }
      for (var b = Math.abs, T = 1e-8, x = o[f], S; u && x;) {
        var v = re.getOverlaps(u, x)
        if (v) {
          const I = v[0][0]
          if (b(I - g) < T) {
            g = v[1][0],
            g === 1 && (u = ++l < r ? n[l].getValues() : null,
            g = 0)
            const m = v[0][1]
            if (b(m - y) < T) {
              if (S || (S = [f, m]),
              y = v[1][1],
              y === 1 && (++f >= s && (f = 0),
              x = o[f] || i[f].getValues(),
              y = 0),
              !u)
                return S[0] === f && S[1] === y
              continue
            }
          }
        }
        break
      }
      return !1
    },
    _hitTestSelf(e, t, n, i) {
      const r = this; const s = this.getStyle(); const u = this._segments; const o = u.length; const l = this._closed; const f = t._tolerancePadding; let g = f; let y; let _; let v; let b; let T; let x; const S = t.stroke && s.hasStroke(); const I = t.fill && s.hasFill(); const m = t.curves; const w = S ? s.getStrokeWidth() / 2 : I && t.tolerance > 0 || m ? 0 : null
      w !== null && (w > 0
        ? (y = s.getStrokeJoin(),
          _ = s.getStrokeCap(),
          v = s.getMiterLimit(),
          g = g.add(ke._getStrokePadding(w, i)))
        : y = _ = 'round')
      function E(G, H) {
        return e.subtract(G).divide(H).length <= 1
      }
      function A(G, H, K) {
        if (!t.selected || H.isSelected()) {
          const $ = G._point
          if (H !== $ && (H = H.add($)),
          E(H, g)) {
            return new qe(K, r, {
              segment: G,
              point: H,
            })
          }
        }
      }
      function N(G, H) {
        return (H || t.segments) && A(G, G._point, 'segment') || !H && t.handles && (A(G, G._handleIn, 'handle-in') || A(G, G._handleOut, 'handle-out'))
      }
      function L(G) {
        b.add(G)
      }
      function R(G) {
        const H = l || G._index > 0 && G._index < o - 1
        if ((H ? y : _) === 'round')
          return E(G._point, g)
        if (b = new ke({
          internal: !0,
          closed: !0,
        }),
        H ? G.isSmooth() || ke._addBevelJoin(G, y, w, v, null, i, L, !0) : _ === 'square' && ke._addSquareCap(G, _, w, null, i, L, !0),
        !b.isEmpty()) {
          let K
          return b.contains(e) || (K = b.getNearestLocation(e)) && E(K.getPoint(), f)
        }
      }
      if (t.ends && !t.segments && !l) {
        if (x = N(u[0], !0) || N(u[o - 1], !0))
          return x
      }
      else if (t.segments || t.handles) {
        for (var D = 0; D < o; D++) {
          if (x = N(u[D]))
            return x
        }
      }
      if (w !== null) {
        if (T = this.getNearestLocation(e),
        T) {
          const V = T.getTime()
          V === 0 || V === 1 && o > 1 ? R(T.getSegment()) || (T = null) : E(T.getPoint(), g) || (T = null)
        }
        if (!T && y === 'miter' && o > 1) {
          for (var D = 0; D < o; D++) {
            const z = u[D]
            if (e.getDistance(z._point) <= v * w && R(z)) {
              T = z.getLocation()
              break
            }
          }
        }
      }
      return !T && I && this._contains(e) || T && !S && !m
        ? new qe('fill', this)
        : T
          ? new qe(S ? 'stroke' : 'curve', this, {
            location: T,
            point: T.getPoint(),
          })
          : null
    },
  }, d.each(re._evaluateMethods, function (e) {
    this[`${e}At`] = function (t) {
      const n = this.getLocationAt(t)
      return n && n[e]()
    }
  }, {
    beans: !1,
    getLocationOf() {
      for (let e = C.read(arguments), t = this.getCurves(), n = 0, i = t.length; n < i; n++) {
        const r = t[n].getLocationOf(e)
        if (r)
          return r
      }
      return null
    },
    getOffsetOf() {
      const e = this.getLocationOf.apply(this, arguments)
      return e ? e.getOffset() : null
    },
    getLocationAt(e) {
      if (typeof e == 'number') {
        for (var t = this.getCurves(), n = 0, i = 0, r = t.length; i < r; i++) {
          const s = n
          const u = t[i]
          if (n += u.getLength(),
          n > e)
            return u.getLocationAt(e - s)
        }
        if (t.length > 0 && e <= this.getLength())
          return new Ot(t[t.length - 1], 1)
      }
      else if (e && e.getPath && e.getPath() === this) { return e }
      return null
    },
    getOffsetsWithTangent() {
      const e = C.read(arguments)
      if (e.isZero())
        return []
      for (var t = [], n = 0, i = this.getCurves(), r = 0, s = i.length; r < s; r++) {
        for (var u = i[r], o = u.getTimesWithTangent(e), l = 0, f = o.length; l < f; l++) {
          const g = n + u.getOffsetAtTime(o[l])
          !t.includes(g) && t.push(g)
        }
        n += u.length
      }
      return t
    },
  }), new function () {
    function e(n, i, r, s) {
      if (s <= 0)
        return
      const u = s / 2; const o = s - 2; const l = u - 1; const f = new Array(6); let g; let y
      function _(I) {
        const m = f[I]
        const w = f[I + 1];
        (g != m || y != w) && (n.beginPath(),
        n.moveTo(g, y),
        n.lineTo(m, w),
        n.stroke(),
        n.beginPath(),
        n.arc(m, w, u, 0, Math.PI * 2, !0),
        n.fill())
      }
      for (let v = 0, b = i.length; v < b; v++) {
        const T = i[v]
        const x = T._selection
        if (T._transformCoordinates(r, f),
        g = f[0],
        y = f[1],
        x & 2 && _(2),
        x & 4 && _(4),
        n.fillRect(g - u, y - u, s, s),
        o > 0 && !(x & 1)) {
          const S = n.fillStyle
          n.fillStyle = '#ffffff',
          n.fillRect(g - l, y - l, o, o),
          n.fillStyle = S
        }
      }
    }
    function t(n, i, r) {
      const s = i._segments; const u = s.length; const o = new Array(6); let l = !0; let f; let g; let y; let _; let v; let b; let T; let x
      function S(m) {
        if (r) {
          m._transformCoordinates(r, o),
          f = o[0],
          g = o[1]
        }
        else {
          const w = m._point
          f = w._x,
          g = w._y
        }
        if (l) {
          n.moveTo(f, g),
          l = !1
        }
        else {
          if (r) {
            v = o[2],
            b = o[3]
          }
          else {
            var E = m._handleIn
            v = f + E._x,
            b = g + E._y
          }
          v === f && b === g && T === y && x === _ ? n.lineTo(f, g) : n.bezierCurveTo(T, x, v, b, f, g)
        }
        if (y = f,
        _ = g,
        r) {
          T = o[4],
          x = o[5]
        }
        else {
          var E = m._handleOut
          T = y + E._x,
          x = _ + E._y
        }
      }
      for (let I = 0; I < u; I++)
        S(s[I])
      i._closed && u > 0 && S(s[0])
    }
    return {
      _draw(n, i, r, s) {
        const u = i.dontStart
        const o = i.dontFinish || i.clip
        const l = this.getStyle()
        const f = l.hasFill()
        const g = l.hasStroke()
        const y = l.getDashArray()
        const _ = !ae.support.nativeDash && g && y && y.length
        u || n.beginPath(),
        (f || g && !_ || o) && (t(n, this, s),
        this._closed && n.closePath())
        function v(m) {
          return y[(m % _ + _) % _]
        }
        if (!o && (f || g) && (this._setStyles(n, i, r),
        f && (n.fill(l.getFillRule()),
        n.shadowColor = 'rgba(0,0,0,0)'),
        g)) {
          if (_) {
            u || n.beginPath()
            for (var b = new kt(this, 0.25, 32, !1, s), T = b.length, x = -l.getDashOffset(), S, I = 0; x > 0;)
              x -= v(I--) + v(I--)
            for (; x < T;) {
              S = x + v(I++),
              (x > 0 || S > 0) && b.drawPart(n, Math.max(x, 0), Math.max(S, 0)),
              x = S + v(I++)
            }
          }
          n.stroke()
        }
      },
      _drawSelected(n, i) {
        n.beginPath(),
        t(n, this, i),
        n.stroke(),
        e(n, this._segments, i, ae.settings.handleSize)
      },
    }
  }()
  , new function () {
    function e(t) {
      const n = t._segments
      if (!n.length)
        throw new Error('Use a moveTo() command first')
      return n[n.length - 1]
    }
    return {
      moveTo() {
        const t = this._segments
        t.length === 1 && this.removeSegment(0),
        t.length || this._add([new pe(C.read(arguments))])
      },
      moveBy() {
        throw new Error('moveBy() is unsupported on Path items.')
      },
      lineTo() {
        this._add([new pe(C.read(arguments))])
      },
      cubicCurveTo() {
        const t = arguments
        const n = C.read(t)
        const i = C.read(t)
        const r = C.read(t)
        const s = e(this)
        s.setHandleOut(n.subtract(s._point)),
        this._add([new pe(r, i.subtract(r))])
      },
      quadraticCurveTo() {
        const t = arguments
        const n = C.read(t)
        const i = C.read(t)
        const r = e(this)._point
        this.cubicCurveTo(n.add(r.subtract(n).multiply(1 / 3)), n.add(i.subtract(n).multiply(1 / 3)), i)
      },
      curveTo() {
        const t = arguments
        const n = C.read(t)
        const i = C.read(t)
        const r = d.pick(d.read(t), 0.5)
        const s = 1 - r
        const u = e(this)._point
        const o = n.subtract(u.multiply(s * s)).subtract(i.multiply(r * r)).divide(2 * r * s)
        if (o.isNaN())
          throw new Error(`Cannot put a curve through points with parameter = ${r}`)
        this.quadraticCurveTo(o, i)
      },
      arcTo() {
        const t = arguments; const n = Math.abs; const i = Math.sqrt; const r = e(this); const s = r._point; let u = C.read(t); var o; const l = d.peek(t); var f = d.pick(l, !0); let g; let y; let _; let v
        if (typeof f == 'boolean') {
          var b = s.add(u).divide(2)
          var o = b.add(b.subtract(s).rotate(f ? -90 : 90))
        }
        else if (d.remain(t) <= 2) {
          o = u,
          u = C.read(t)
        }
        else if (!s.equals(u)) {
          const T = J.read(t)
          const x = O.isZero
          if (x(T.width) || x(T.height))
            return this.lineTo(u)
          const S = d.read(t)
          var f = !!d.read(t)
          const I = !!d.read(t)
          var b = s.add(u).divide(2)
          var m = s.subtract(b).rotate(-S)
          const w = m.x
          const E = m.y
          let A = n(T.width)
          let N = n(T.height)
          let L = A * A
          let R = N * N
          const D = w * w
          const V = E * E
          let z = i(D / L + V / R)
          if (z > 1 && (A *= z,
          N *= z,
          L = A * A,
          R = N * N),
          z = (L * R - L * V - R * D) / (L * V + R * D),
          n(z) < 1e-12 && (z = 0),
          z < 0)
            throw new Error('Cannot create an arc with the given arguments')
          g = new C(A * E / N, -N * w / A).multiply((I === f ? -1 : 1) * i(z)).rotate(S).add(b),
          v = new le().translate(g).rotate(S).scale(A, N),
          _ = v._inverseTransform(s),
          y = _.getDirectedAngle(v._inverseTransform(u)),
          !f && y > 0 ? y -= 360 : f && y < 0 && (y += 360)
        }
        if (o) {
          const G = new Se(s.add(o).divide(2), o.subtract(s).rotate(90), !0)
          const H = new Se(o.add(u).divide(2), u.subtract(o).rotate(90), !0)
          const K = new Se(s, u)
          const $ = K.getSide(o)
          if (g = G.intersect(H, !0),
          !g) {
            if (!$)
              return this.lineTo(u)
            throw new Error('Cannot create an arc with the given arguments')
          }
          _ = s.subtract(g),
          y = _.getDirectedAngle(u.subtract(g))
          const W = K.getSide(g, !0)
          W === 0 ? y = $ * n(y) : $ === W && (y += y < 0 ? 360 : -360)
        }
        if (y) {
          for (var te = 1e-5, se = n(y), ue = se >= 360 ? 4 : Math.ceil((se - te) / 90), Ie = y / ue, Ee = Ie * Math.PI / 360, de = 4 / 3 * Math.sin(Ee) / (1 + Math.cos(Ee)), ve = [], Oe = 0; Oe <= ue; Oe++) {
            var m = u
            let Te = null
            if (Oe < ue && (Te = _.rotate(90).multiply(de),
            v
              ? (m = v._transformPoint(_),
                Te = v._transformPoint(_.add(Te)).subtract(m))
              : m = g.add(_)),
            !Oe) { r.setHandleOut(Te) }
            else {
              let Ge = _.rotate(-90).multiply(de)
              v && (Ge = v._transformPoint(_.add(Ge)).subtract(m)),
              ve.push(new pe(m, Ge, Te))
            }
            _ = _.rotate(Ie)
          }
          this._add(ve)
        }
      },
      lineBy() {
        const t = C.read(arguments)
        const n = e(this)._point
        this.lineTo(n.add(t))
      },
      curveBy() {
        const t = arguments
        const n = C.read(t)
        const i = C.read(t)
        const r = d.read(t)
        const s = e(this)._point
        this.curveTo(s.add(n), s.add(i), r)
      },
      cubicCurveBy() {
        const t = arguments
        const n = C.read(t)
        const i = C.read(t)
        const r = C.read(t)
        const s = e(this)._point
        this.cubicCurveTo(s.add(n), s.add(i), s.add(r))
      },
      quadraticCurveBy() {
        const t = arguments
        const n = C.read(t)
        const i = C.read(t)
        const r = e(this)._point
        this.quadraticCurveTo(r.add(n), r.add(i))
      },
      arcBy() {
        const t = arguments
        const n = e(this)._point
        const i = n.add(C.read(t))
        const r = d.pick(d.peek(t), !0)
        typeof r == 'boolean' ? this.arcTo(i, r) : this.arcTo(i, n.add(C.read(t)))
      },
      closePath(t) {
        this.setClosed(!0),
        this.join(this, t)
      },
    }
  }()
  , {
    _getBounds(e, t) {
      const n = t.handle ? 'getHandleBounds' : t.stroke ? 'getStrokeBounds' : 'getBounds'
      return ke[n](this._segments, this._closed, this, e, t)
    },
    statics: {
      getBounds(e, t, n, i, r, s) {
        const u = e[0]
        if (!u)
          return new Y()
        let o = new Array(6)
        let l = u._transformCoordinates(i, new Array(6))
        const f = l.slice(0, 2)
        const g = f.slice()
        const y = new Array(2)
        function _(T) {
          T._transformCoordinates(i, o)
          for (let x = 0; x < 2; x++)
            re._addBounds(l[x], l[x + 4], o[x + 2], o[x], x, s ? s[x] : 0, f, g, y)
          const S = l
          l = o,
          o = S
        }
        for (let v = 1, b = e.length; v < b; v++)
          _(e[v])
        return t && _(u),
        new Y(f[0], f[1], g[0] - f[0], g[1] - f[1])
      },
      getStrokeBounds(e, t, n, i, r) {
        const s = n.getStyle()
        const u = s.hasStroke()
        const o = s.getStrokeWidth()
        const l = u && n._getStrokeMatrix(i, r)
        const f = u && ke._getStrokePadding(o, l)
        let g = ke.getBounds(e, t, n, i, r, f)
        if (!u)
          return g
        const y = o / 2
        const _ = s.getStrokeJoin()
        const v = s.getStrokeCap()
        const b = s.getMiterLimit()
        const T = new Y(new J(f))
        function x(A) {
          g = g.include(A)
        }
        function S(A) {
          g = g.unite(T.setCenter(A._point.transform(i)))
        }
        function I(A, N) {
          N === 'round' || A.isSmooth() ? S(A) : ke._addBevelJoin(A, N, y, b, i, l, x)
        }
        function m(A, N) {
          N === 'round' ? S(A) : ke._addSquareCap(A, N, y, i, l, x)
        }
        const w = e.length - (t ? 0 : 1)
        if (w > 0) {
          for (let E = 1; E < w; E++)
            I(e[E], _)
          t
            ? I(e[0], _)
            : (m(e[0], v),
              m(e[e.length - 1], v))
        }
        return g
      },
      _getStrokePadding(e, t) {
        if (!t)
          return [e, e]
        const n = new C(e, 0).transform(t)
        const i = new C(0, e).transform(t)
        const r = n.getAngleInRadians()
        const s = n.getLength()
        const u = i.getLength()
        const o = Math.sin(r)
        const l = Math.cos(r)
        const f = Math.tan(r)
        const g = Math.atan2(u * f, s)
        const y = Math.atan2(u, f * s)
        return [Math.abs(s * Math.cos(g) * l + u * Math.sin(g) * o), Math.abs(u * Math.sin(y) * l + s * Math.cos(y) * o)]
      },
      _addBevelJoin(e, t, n, i, r, s, u, o) {
        const l = e.getCurve()
        const f = l.getPrevious()
        const g = l.getPoint1().transform(r)
        let y = f.getNormalAtTime(1).multiply(n).transform(s)
        let _ = l.getNormalAtTime(0).multiply(n).transform(s)
        const v = y.getDirectedAngle(_)
        if ((v < 0 || v >= 180) && (y = y.negate(),
        _ = _.negate()),
        o && u(g),
        u(g.add(y)),
        t === 'miter') {
          const b = new Se(g.add(y), new C(-y.y, y.x), !0).intersect(new Se(g.add(_), new C(-_.y, _.x), !0), !0)
          b && g.getDistance(b) <= i * n && u(b)
        }
        u(g.add(_))
      },
      _addSquareCap(e, t, n, i, r, s, u) {
        let o = e._point.transform(i)
        const l = e.getLocation()
        const f = l.getNormal().multiply(l.getTime() === 0 ? n : -n).transform(r)
        t === 'square' && (u && (s(o.subtract(f)),
        s(o.add(f))),
        o = o.add(f.rotate(-90))),
        s(o.add(f)),
        s(o.subtract(f))
      },
      getHandleBounds(e, t, n, i, r) {
        const s = n.getStyle(); const u = r.stroke && s.hasStroke(); let o; let l
        if (u) {
          const f = n._getStrokeMatrix(i, r)
          const g = s.getStrokeWidth() / 2
          let y = g
          s.getStrokeJoin() === 'miter' && (y = g * s.getMiterLimit()),
          s.getStrokeCap() === 'square' && (y = Math.max(y, g * Math.SQRT2)),
          o = ke._getStrokePadding(g, f),
          l = ke._getStrokePadding(y, f)
        }
        for (var _ = new Array(6), v = 1 / 0, b = -v, T = v, x = b, S = 0, I = e.length; S < I; S++) {
          const m = e[S]
          m._transformCoordinates(i, _)
          for (let w = 0; w < 6; w += 2) {
            const E = w ? o : l
            const A = E ? E[0] : 0
            const N = E ? E[1] : 0
            const L = _[w]
            const R = _[w + 1]
            const D = L - A
            const V = L + A
            const z = R - N
            const G = R + N
            D < v && (v = D),
            V > b && (b = V),
            z < T && (T = z),
            G > x && (x = G)
          }
        }
        return new Y(v, T, b - v, x - T)
      },
    },
  })
  ke.inject({
    statics: new function () {
      const e = 0.5522847498307936
      const t = [new pe([-1, 0], [0, e], [0, -e]), new pe([0, -1], [-e, 0], [e, 0]), new pe([1, 0], [0, -e], [0, e]), new pe([0, 1], [e, 0], [-e, 0])]
      function n(r, s, u) {
        const o = d.getNamed(u)
        const l = new ke(o && (o.insert == !0 ? oe.INSERT : o.insert == !1 ? oe.NO_INSERT : null))
        return l._add(r),
        l._closed = s,
        l.set(o, oe.INSERT)
      }
      function i(r, s, u) {
        for (var o = new Array(4), l = 0; l < 4; l++) {
          const f = t[l]
          o[l] = new pe(f._point.multiply(s).add(r), f._handleIn.multiply(s), f._handleOut.multiply(s))
        }
        return n(o, !0, u)
      }
      return {
        Line() {
          const r = arguments
          return n([new pe(C.readNamed(r, 'from')), new pe(C.readNamed(r, 'to'))], !1, r)
        },
        Circle() {
          const r = arguments
          const s = C.readNamed(r, 'center')
          const u = d.readNamed(r, 'radius')
          return i(s, new J(u), r)
        },
        Rectangle() {
          const r = arguments; const s = Y.readNamed(r, 'rectangle'); let u = J.readNamed(r, 'radius', 0, {
            readNull: !0,
          }); const o = s.getBottomLeft(!0); const l = s.getTopLeft(!0); const f = s.getTopRight(!0); const g = s.getBottomRight(!0); let y
          if (!u || u.isZero()) { y = [new pe(o), new pe(l), new pe(f), new pe(g)] }
          else {
            u = J.min(u, s.getSize(!0).divide(2))
            const _ = u.width
            const v = u.height
            const b = _ * e
            const T = v * e
            y = [new pe(o.add(_, 0), null, [-b, 0]), new pe(o.subtract(0, v), [0, T]), new pe(l.add(0, v), null, [0, -T]), new pe(l.add(_, 0), [-b, 0], null), new pe(f.subtract(_, 0), null, [b, 0]), new pe(f.add(0, v), [0, -T], null), new pe(g.subtract(0, v), null, [0, T]), new pe(g.subtract(_, 0), [b, 0])]
          }
          return n(y, !0, r)
        },
        RoundRectangle: '#Rectangle',
        Ellipse() {
          const r = arguments
          const s = je._readEllipse(r)
          return i(s.center, s.radius, r)
        },
        Oval: '#Ellipse',
        Arc() {
          const r = arguments
          const s = C.readNamed(r, 'from')
          const u = C.readNamed(r, 'through')
          const o = C.readNamed(r, 'to')
          const l = d.getNamed(r)
          const f = new ke(l && l.insert == !1 && oe.NO_INSERT)
          return f.moveTo(s),
          f.arcTo(u, o),
          f.set(l)
        },
        RegularPolygon() {
          for (var r = arguments, s = C.readNamed(r, 'center'), u = d.readNamed(r, 'sides'), o = d.readNamed(r, 'radius'), l = 360 / u, f = u % 3 === 0, g = new C(0, f ? -o : o), y = f ? -1 : 0.5, _ = new Array(u), v = 0; v < u; v++)
            _[v] = new pe(s.add(g.rotate((v + y) * l)))
          return n(_, !0, r)
        },
        Star() {
          for (var r = arguments, s = C.readNamed(r, 'center'), u = d.readNamed(r, 'points') * 2, o = d.readNamed(r, 'radius1'), l = d.readNamed(r, 'radius2'), f = 360 / u, g = new C(0, -1), y = new Array(u), _ = 0; _ < u; _++)
            y[_] = new pe(s.add(g.rotate(f * _).multiply(_ % 2 ? l : o)))
          return n(y, !0, r)
        },
      }
    }(),
  })
  var ot = Ft.extend({
    _class: 'CompoundPath',
    _serializeFields: {
      children: [],
    },
    beans: !0,
    initialize(t) {
      this._children = [],
      this._namedChildren = {},
      this._initialize(t) || (typeof t == 'string' ? this.setPathData(t) : this.addChildren(Array.isArray(t) ? t : arguments))
    },
    insertChildren: function e(t, n) {
      let i = n
      const r = i[0]
      r && typeof r[0] == 'number' && (i = [i])
      for (let s = n.length - 1; s >= 0; s--) {
        const u = i[s]
        i === n && !(u instanceof ke) && (i = d.slice(i)),
        Array.isArray(u)
          ? i[s] = new ke({
            segments: u,
            insert: !1,
          })
          : u instanceof ot && (i.splice.apply(i, [s, 1].concat(u.removeChildren())),
          u.remove())
      }
      return e.base.call(this, t, i)
    },
    reduce: function e(t) {
      for (var n = this._children, i = n.length - 1; i >= 0; i--) {
        var r = n[i].reduce(t)
        r.isEmpty() && r.remove()
      }
      if (!n.length) {
        var r = new ke(oe.NO_INSERT)
        return r.copyAttributes(this),
        r.insertAbove(this),
        this.remove(),
        r
      }
      return e.base.call(this)
    },
    isClosed() {
      for (let e = this._children, t = 0, n = e.length; t < n; t++) {
        if (!e[t]._closed)
          return !1
      }
      return !0
    },
    setClosed(e) {
      for (let t = this._children, n = 0, i = t.length; n < i; n++)
        t[n].setClosed(e)
    },
    getFirstSegment() {
      const e = this.getFirstChild()
      return e && e.getFirstSegment()
    },
    getLastSegment() {
      const e = this.getLastChild()
      return e && e.getLastSegment()
    },
    getCurves() {
      for (var e = this._children, t = [], n = 0, i = e.length; n < i; n++)
        d.push(t, e[n].getCurves())
      return t
    },
    getFirstCurve() {
      const e = this.getFirstChild()
      return e && e.getFirstCurve()
    },
    getLastCurve() {
      const e = this.getLastChild()
      return e && e.getLastCurve()
    },
    getArea() {
      for (var e = this._children, t = 0, n = 0, i = e.length; n < i; n++)
        t += e[n].getArea()
      return t
    },
    getLength() {
      for (var e = this._children, t = 0, n = 0, i = e.length; n < i; n++)
        t += e[n].getLength()
      return t
    },
    getPathData(e, t) {
      for (var n = this._children, i = [], r = 0, s = n.length; r < s; r++) {
        const u = n[r]
        const o = u._matrix
        i.push(u.getPathData(e && !o.isIdentity() ? e.appended(o) : e, t))
      }
      return i.join('')
    },
    _hitTestChildren: function e(t, n, i) {
      return e.base.call(this, t, n.class === ke || n.type === 'path'
        ? n
        : d.set({}, n, {
          fill: !1,
        }), i)
    },
    _draw(e, t, n, i) {
      const r = this._children
      if (r.length) {
        t = t.extend({
          dontStart: !0,
          dontFinish: !0,
        }),
        e.beginPath()
        for (let s = 0, u = r.length; s < u; s++)
          r[s].draw(e, t, i)
        if (!t.clip) {
          this._setStyles(e, t, n)
          const o = this._style
          o.hasFill() && (e.fill(o.getFillRule()),
          e.shadowColor = 'rgba(0,0,0,0)'),
          o.hasStroke() && e.stroke()
        }
      }
    },
    _drawSelected(e, t, n) {
      for (let i = this._children, r = 0, s = i.length; r < s; r++) {
        const u = i[r]
        const o = u._matrix
        n[u._id] || u._drawSelected(e, o.isIdentity() ? t : t.appended(o))
      }
    },
  }, new function () {
    function e(t, n) {
      const i = t._children
      if (n && !i.length)
        throw new Error('Use a moveTo() command first')
      return i[i.length - 1]
    }
    return d.each(['lineTo', 'cubicCurveTo', 'quadraticCurveTo', 'curveTo', 'arcTo', 'lineBy', 'cubicCurveBy', 'quadraticCurveBy', 'curveBy', 'arcBy'], function (t) {
      this[t] = function () {
        const n = e(this, !0)
        n[t].apply(n, arguments)
      }
    }, {
      moveTo() {
        const t = e(this)
        const n = t && t.isEmpty() ? t : new ke(oe.NO_INSERT)
        n !== t && this.addChild(n),
        n.moveTo.apply(n, arguments)
      },
      moveBy() {
        const t = e(this, !0)
        const n = t && t.getLastSegment()
        const i = C.read(arguments)
        this.moveTo(n ? i.add(n._point) : i)
      },
      closePath(t) {
        e(this, !0).closePath(t)
      },
    })
  }()
  , d.each(['reverse', 'flatten', 'simplify', 'smooth'], function (e) {
    this[e] = function (t) {
      for (var n = this._children, i, r = 0, s = n.length; r < s; r++)
        i = n[r][e](t) || i
      return i
    }
  }, {}))
  Ft.inject(new function () {
    const e = Math.min
    const t = Math.max
    const n = Math.abs
    const i = {
      unite: {
        1: !0,
        2: !0,
      },
      intersect: {
        2: !0,
      },
      subtract: {
        1: !0,
      },
      exclude: {
        '1': !0,
        '-1': !0,
      },
    }
    function r(S) {
      return S._children || [S]
    }
    function s(S, I) {
      let m = S.clone(!1).reduce({
        simplify: !0,
      }).transform(null, !0, !0)
      if (I) {
        for (let w = r(m), E = 0, A = w.length; E < A; E++) {
          var S = w[E]
          !S._closed && !S.isEmpty() && (S.closePath(1e-12),
          S.getFirstSegment().setHandleIn(0, 0),
          S.getLastSegment().setHandleOut(0, 0))
        }
        m = m.resolveCrossings().reorient(m.getFillRule() === 'nonzero', !0)
      }
      return m
    }
    function u(S, I, m, w, E) {
      let A = new ot(oe.NO_INSERT)
      return A.addChildren(S, !0),
      A = A.reduce({
        simplify: I,
      }),
      E && E.insert == !1 || A.insertAbove(w && m.isSibling(w) && m.getIndex() < w.getIndex() ? w : m),
      A.copyAttributes(m, !0),
      A
    }
    function o(S) {
      return S.hasOverlap() || S.isCrossing()
    }
    function l(S, I, m, w) {
      if (w && (w.trace == !1 || w.stroke) && /^(subtract|intersect)$/.test(m))
        return f(S, I, m)
      const E = s(S, !0)
      const A = I && S !== I && s(I, !0)
      const N = i[m]
      N[m] = !0,
      A && (N.subtract || N.exclude) ^ (A.isClockwise() ^ E.isClockwise()) && A.reverse()
      const L = v(Ot.expand(E.getIntersections(A, o))); const R = r(E); const D = A && r(A); const V = []; const z = []; let G
      function H(Te) {
        for (let Ge = 0, Re = Te.length; Ge < Re; Ge++) {
          const xe = Te[Ge]
          d.push(V, xe._segments),
          d.push(z, xe.getCurves()),
          xe._overlapsOnly = !0
        }
      }
      function K(Te) {
        for (var Ge = [], Re = 0, xe = Te && Te.length; Re < xe; Re++)
          Ge.push(z[Te[Re]])
        return Ge
      }
      if (L.length) {
        H(R),
        D && H(D)
        for (var $ = new Array(z.length), W = 0, te = z.length; W < te; W++)
          $[W] = z[W].getValues()
        for (var se = q.findCurveBoundsCollisions($, $, 0, !0), ue = {}, W = 0; W < z.length; W++) {
          const Ie = z[W]
          const Ee = Ie._path._id
          const de = ue[Ee] = ue[Ee] || {}
          de[Ie.getIndex()] = {
            hor: K(se[W].hor),
            ver: K(se[W].ver),
          }
        }
        for (var W = 0, te = L.length; W < te; W++)
          T(L[W]._segment, E, A, ue, N)
        for (var W = 0, te = V.length; W < te; W++) {
          const ve = V[W]
          const Oe = ve._intersection
          ve._winding || T(ve, E, A, ue, N),
          Oe && Oe._overlap || (ve._path._overlapsOnly = !1)
        }
        G = x(V, N)
      }
      else {
        G = _(D ? R.concat(D) : R.slice(), (Te) => {
          return !!N[Te]
        })
      }
      return u(G, !0, S, I, w)
    }
    function f(S, I, m) {
      const w = s(S)
      const E = s(I)
      const A = w.getIntersections(E, o)
      const N = m === 'subtract'
      const L = m === 'divide'
      const R = {}
      const D = []
      function V(H) {
        if (!R[H._id] && (L || E.contains(H.getPointAt(H.getLength() / 2)) ^ N)) {
          return D.unshift(H),
          R[H._id] = !0
        }
      }
      for (let z = A.length - 1; z >= 0; z--) {
        const G = A[z].split()
        G && (V(G) && G.getFirstSegment().setHandleIn(0, 0),
        w.getLastSegment().setHandleOut(0, 0))
      }
      return V(w),
      u(D, !1, S, I)
    }
    function g(S, I) {
      for (let m = S; m;) {
        if (m === I)
          return
        m = m._previous
      }
      for (; S._next && S._next !== I;)
        S = S._next
      if (!S._next) {
        for (; I._previous;)
          I = I._previous
        S._next = I,
        I._previous = S
      }
    }
    function y(S) {
      for (let I = S.length - 1; I >= 0; I--)
        S[I].clearHandles()
    }
    function _(S, I, m) {
      const w = S && S.length
      if (w) {
        const E = d.each(S, function (se, ue) {
          this[se._id] = {
            container: null,
            winding: se.isClockwise() ? 1 : -1,
            index: ue,
          }
        }, {})
        const A = S.slice().sort((se, ue) => {
          return n(ue.getArea()) - n(se.getArea())
        })
        const N = A[0]
        const L = q.findItemBoundsCollisions(A, null, O.GEOMETRIC_EPSILON)
        m == null && (m = N.isClockwise())
        for (let R = 0; R < w; R++) {
          const D = A[R]
          const V = E[D._id]
          let z = 0
          const G = L[R]
          if (G) {
            for (let H = null, K = G.length - 1; K >= 0; K--) {
              if (G[K] < R) {
                H = H || D.getInteriorPoint()
                const $ = A[G[K]]
                if ($.contains(H)) {
                  const W = E[$._id]
                  z = W.winding,
                  V.winding += z,
                  V.container = W.exclude ? W.container : $
                  break
                }
              }
            }
          }
          if (I(V.winding) === I(z)) {
            V.exclude = !0,
            S[V.index] = null
          }
          else {
            const te = V.container
            D.setClockwise(te ? !te.isClockwise() : m)
          }
        }
      }
      return S
    }
    function v(S, I, m) {
      const w = I && []; const E = 1e-8; const A = 1 - E; let N = !1; const L = m || []; const R = m && {}; let D; let V; let z
      function G(Ge) {
        return `${Ge._path._id}.${Ge._segment1._index}`
      }
      for (var H = (m && m.length) - 1; H >= 0; H--) {
        var K = m[H]
        K._path && (R[G(K)] = !0)
      }
      for (var H = S.length - 1; H >= 0; H--) {
        const $ = S[H]; let W = $._time; const te = W; const se = I && !I($); var K = $._curve; var ue
        if (K && (K !== V
          ? (N = !K.hasHandles() || R && R[G(K)],
            D = [],
            z = null,
            V = K)
          : z >= E && (W /= z)),
        se) {
          D && D.push($)
          continue
        }
        else { I && w.unshift($) }
        if (z = te,
        W < E) { ue = K._segment1 }
        else if (W > A) { ue = K._segment2 }
        else {
          const Ie = K.divideAtTime(W, !0)
          N && L.push(K, Ie),
          ue = Ie._segment1
          for (let Ee = D.length - 1; Ee >= 0; Ee--) {
            const de = D[Ee]
            de._time = (de._time - W) / (1 - W)
          }
        }
        $._setSegment(ue)
        const ve = ue._intersection
        const Oe = $._intersection
        if (ve) {
          g(ve, Oe)
          for (let Te = ve; Te;) {
            g(Te._intersection, ve),
            Te = Te._next
          }
        }
        else { ue._intersection = Oe }
      }
      return m || y(L),
      w || S
    }
    function b(S, I, m, w, E) {
      const A = Array.isArray(I) ? I : I[m ? 'hor' : 'ver']; const N = m ? 1 : 0; const L = N ^ 1; const R = [S.x, S.y]; const D = R[N]; const V = R[L]; const z = 1e-9; const G = 1e-6; const H = D - z; const K = D + z; let $ = 0; let W = 0; let te = 0; let se = 0; let ue = !1; let Ie = !1; let Ee = 1; const de = []; let ve; let Oe
      function Te(Ye) {
        const ut = Ye[L + 0]
        const st = Ye[L + 6]
        if (!(V < e(ut, st) || V > t(ut, st))) {
          const vt = Ye[N + 0]
          const Ht = Ye[N + 2]
          const fn = Ye[N + 4]
          const jt = Ye[N + 6]
          if (ut === st) {
            (vt < K && jt > H || jt < K && vt > H) && (ue = !0)
            return
          }
          const Yt = V === ut ? 0 : V === st || H > t(vt, Ht, fn, jt) || K < e(vt, Ht, fn, jt) ? 1 : re.solveCubic(Ye, L, V, de, 0, 1) > 0 ? de[0] : 1
          const Dt = Yt === 0 ? vt : Yt === 1 ? jt : re.getPoint(Ye, Yt)[m ? 'y' : 'x']
          const Ct = ut > st ? 1 : -1
          const Tn = ve[L] > ve[L + 6] ? 1 : -1
          const $t = ve[N + 6]
          return V !== ut
            ? (Dt < H ? te += Ct : Dt > K ? se += Ct : ue = !0,
              Dt > D - G && Dt < D + G && (Ee /= 2))
            : (Ct !== Tn
                ? vt < H ? te += Ct : vt > K && (se += Ct)
                : vt != $t && ($t < K && Dt > K
                  ? (se += Ct,
                    ue = !0)
                  : $t > H && Dt < H && (te += Ct,
                  ue = !0)),
              Ee /= 4),
          ve = Ye,
          !E && Dt > H && Dt < K && re.getTangent(Ye, Yt)[m ? 'x' : 'y'] === 0 && b(S, I, !m, w, !0)
        }
      }
      function Ge(Ye) {
        const ut = Ye[L + 0]
        const st = Ye[L + 2]
        const vt = Ye[L + 4]
        const Ht = Ye[L + 6]
        if (V <= t(ut, st, vt, Ht) && V >= e(ut, st, vt, Ht)) {
          for (var fn = Ye[N + 0], jt = Ye[N + 2], Yt = Ye[N + 4], Dt = Ye[N + 6], Ct = H > t(fn, jt, Yt, Dt) || K < e(fn, jt, Yt, Dt) ? [Ye] : re.getMonoCurves(Ye, m), Tn, $t = 0, Oi = Ct.length; $t < Oi; $t++) {
            if (Tn = Te(Ct[$t]))
              return Tn
          }
        }
      }
      for (let Re = 0, xe = A.length; Re < xe; Re++) {
        const ze = A[Re]; const De = ze._path; const _t = ze.getValues(); var gt
        if ((!Re || A[Re - 1]._path !== De) && (ve = null,
        De._closed || (Oe = re.getValues(De.getLastCurve().getSegment2(), ze.getSegment1(), null, !w),
        Oe[L] !== Oe[L + 6] && (ve = Oe)),
        !ve)) {
          ve = _t
          for (let Et = De.getLastCurve(); Et && Et !== ze;) {
            const nt = Et.getValues()
            if (nt[L] !== nt[L + 6]) {
              ve = nt
              break
            }
            Et = Et.getPrevious()
          }
        }
        if (gt = Ge(_t))
          return gt
        if (Re + 1 === xe || A[Re + 1]._path !== De) {
          if (Oe && (gt = Ge(Oe)))
            return gt
          ue && !te && !se && (te = se = De.isClockwise(w) ^ m ? 1 : -1),
          $ += te,
          W += se,
          te = se = 0,
          ue && (Ie = !0,
          ue = !1),
          Oe = null
        }
      }
      return $ = n($),
      W = n(W),
      {
        winding: t($, W),
        windingL: $,
        windingR: W,
        quality: Ee,
        onPath: Ie,
      }
    }
    function T(S, I, m, w, E) {
      const A = []; const N = S; let L = 0; var z
      do {
        var R = S.getCurve()
        if (R) {
          var D = R.getLength()
          A.push({
            segment: S,
            curve: R,
            length: D,
          }),
          L += D
        }
        S = S.getNext()
      } while (S && !S._intersection && S !== N)
      for (var V = [0.5, 0.25, 0.75], z = {
          winding: 0,
          quality: -1,
        }, G = 0.001, H = 1 - G, K = 0; K < V.length && z.quality < 0.5; K++) {
        for (var D = L * V[K], $ = 0, W = A.length; $ < W; $++) {
          const te = A[$]
          const se = te.length
          if (D <= se) {
            var R = te.curve
            const ue = R._path
            const Ie = ue._parent
            const Ee = Ie instanceof ot ? Ie : ue
            const de = O.clamp(R.getTimeAt(D), G, H)
            const ve = R.getPointAtTime(de)
            const Oe = n(R.getTangentAtTime(de).y) < Math.SQRT1_2
            let Te = null
            if (E.subtract && m) {
              const Ge = Ee === I ? m : I
              const Re = Ge._getWinding(ve, Oe, !0)
              if (Ee === I && Re.winding || Ee === m && !Re.winding) {
                if (Re.quality < 1)
                  continue
                Te = {
                  winding: 0,
                  quality: 1,
                }
              }
            }
            Te = Te || b(ve, w[ue._id][R.getIndex()], Oe, !0),
            Te.quality > z.quality && (z = Te)
            break
          }
          D -= se
        }
      }
      for (var $ = A.length - 1; $ >= 0; $--)
        A[$].segment._winding = z
    }
    function x(S, I) {
      const m = []; let w
      function E(xe) {
        let ze
        return !!(xe && !xe._visited && (!I || I[(ze = xe._winding || {}).winding] && !(I.unite && ze.winding === 2 && ze.windingL && ze.windingR)))
      }
      function A(xe) {
        if (xe) {
          for (let ze = 0, De = w.length; ze < De; ze++) {
            if (xe === w[ze])
              return !0
          }
        }
        return !1
      }
      function N(xe) {
        for (let ze = xe._segments, De = 0, _t = ze.length; De < _t; De++)
          ze[De]._visited = !0
      }
      function L(xe, ze) {
        let De = xe._intersection
        const _t = De
        const gt = []
        ze && (w = [xe])
        function Et(nt, Ye) {
          for (; nt && nt !== Ye;) {
            const ut = nt._segment
            const st = ut && ut._path
            if (st) {
              const vt = ut.getNext() || st.getFirstSegment()
              const Ht = vt._intersection
              ut !== xe && (A(ut) || A(vt) || vt && E(ut) && (E(vt) || Ht && E(Ht._segment))) && gt.push(ut),
              ze && w.push(ut)
            }
            nt = nt._next
          }
        }
        if (De) {
          for (Et(De); De && De._previous;)
            De = De._previous
          Et(De, _t)
        }
        return gt
      }
      S.sort((xe, ze) => {
        const De = xe._intersection
        const _t = ze._intersection
        const gt = !!(De && De._overlap)
        const Et = !!(_t && _t._overlap)
        const nt = xe._path
        const Ye = ze._path
        return gt ^ Et ? gt ? 1 : -1 : !De ^ !_t ? De ? 1 : -1 : nt !== Ye ? nt._id - Ye._id : xe._index - ze._index
      })
      for (let R = 0, D = S.length; R < D; R++) {
        let V = S[R]; let z = E(V); let G = null; var H = !1; let K = !0; const $ = []; var W; var te; var se
        if (z && V._path._overlapsOnly) {
          const ue = V._path
          const Ie = V._intersection._segment._path
          ue.compare(Ie) && (ue.getArea() && m.push(ue.clone(!1)),
          N(ue),
          N(Ie),
          z = !1)
        }
        for (; z;) {
          const Ee = !G
          const de = L(V, Ee)
          const ve = de.shift()
          var H = !Ee && (A(V) || A(ve))
          const Oe = !H && ve
          if (Ee && (G = new ke(oe.NO_INSERT),
          W = null),
          H) {
            (V.isFirst() || V.isLast()) && (K = V._path._closed),
            V._visited = !0
            break
          }
          if (Oe && W && ($.push(W),
          W = null),
          W || (Oe && de.push(V),
          W = {
            start: G._segments.length,
            crossings: de,
            visited: te = [],
            handleIn: se,
          }),
          Oe && (V = ve),
          !E(V)) {
            G.removeSegments(W.start)
            for (let Te = 0, Ge = te.length; Te < Ge; Te++)
              te[Te]._visited = !1
            te.length = 0
            do {
              V = W && W.crossings.shift(),
              (!V || !V._path) && (V = null,
              W = $.pop(),
              W && (te = W.visited,
              se = W.handleIn))
            }
            while (W && !E(V))
            if (!V)
              break
          }
          const Re = V.getNext()
          G.add(new pe(V._point, se, Re && V._handleOut)),
          V._visited = !0,
          te.push(V),
          V = Re || V._path.getFirstSegment(),
          se = Re && Re._handleIn
        }
        H && (K && (G.getFirstSegment().setHandleIn(se),
        G.setClosed(K)),
        G.getArea() !== 0 && m.push(G))
      }
      return m
    }
    return {
      _getWinding(S, I, m) {
        return b(S, this.getCurves(), I, m)
      },
      unite(S, I) {
        return l(this, S, 'unite', I)
      },
      intersect(S, I) {
        return l(this, S, 'intersect', I)
      },
      subtract(S, I) {
        return l(this, S, 'subtract', I)
      },
      exclude(S, I) {
        return l(this, S, 'exclude', I)
      },
      divide(S, I) {
        return I && (I.trace == !1 || I.stroke) ? f(this, S, 'divide') : u([this.subtract(S, I), this.intersect(S, I)], !0, this, S, I)
      },
      resolveCrossings() {
        const S = this._children
        let I = S || [this]
        function m(W, te) {
          const se = W && W._intersection
          return se && se._overlap && se._path === te
        }
        let w = !1
        let E = !1
        let A = this.getIntersections(null, (W) => {
          return W.hasOverlap() && (w = !0) || W.isCrossing() && (E = !0)
        })
        const N = w && E && []
        if (A = Ot.expand(A),
        w) {
          for (let L = v(A, (W) => {
              return W.hasOverlap()
            }, N), R = L.length - 1; R >= 0; R--) {
            const D = L[R]
            const V = D._path
            const z = D._segment
            const G = z.getPrevious()
            const H = z.getNext()
            m(G, V) && m(H, V) && (z.remove(),
            G._handleOut._set(0, 0),
            H._handleIn._set(0, 0),
            G !== z && !G.getCurve().hasLength() && (H._handleIn.set(G._handleIn),
            G.remove()))
          }
        }
        E && (v(A, w && ((W) => {
          const te = W.getCurve()
          const se = W.getSegment()
          const ue = W._intersection
          const Ie = ue._curve
          const Ee = ue._segment
          if (te && Ie && te._path && Ie._path)
            return !0
          se && (se._intersection = null),
          Ee && (Ee._intersection = null)
        })
        , N),
        N && y(N),
        I = x(d.each(I, function (W) {
          d.push(this, W._segments)
        }, [])))
        const K = I.length; let $
        return K > 1 && S
          ? (I !== S && this.setChildren(I),
            $ = this)
          : K === 1 && !S && (I[0] !== this && this.setSegments(I[0].removeSegments()),
          $ = this),
        $ || ($ = new ot(oe.NO_INSERT),
        $.addChildren(I),
        $ = $.reduce(),
        $.copyAttributes(this),
        this.replaceWith($)),
        $
      },
      reorient(S, I) {
        const m = this._children
        return m && m.length
          ? this.setChildren(_(this.removeChildren(), (w) => {
            return !!(S ? w : w & 1)
          }, I))
          : I !== a && this.setClockwise(I),
        this
      },
      getInteriorPoint() {
        const S = this.getBounds()
        const I = S.getCenter(!0)
        if (!this.contains(I)) {
          for (var m = this.getCurves(), w = I.y, E = [], A = [], N = 0, L = m.length; N < L; N++) {
            const R = m[N].getValues()
            const D = R[1]
            const V = R[3]
            const z = R[5]
            const G = R[7]
            if (w >= e(D, V, z, G) && w <= t(D, V, z, G)) {
              for (let H = re.getMonoCurves(R), K = 0, $ = H.length; K < $; K++) {
                const W = H[K]
                const te = W[1]
                const se = W[7]
                if (te !== se && (w >= te && w <= se || w >= se && w <= te)) {
                  const ue = w === te ? W[0] : w === se ? W[6] : re.solveCubic(W, 1, w, A, 0, 1) === 1 ? re.getPoint(W, A[0]).x : (W[0] + W[6]) / 2
                  E.push(ue)
                }
              }
            }
          }
          E.length > 1 && (E.sort((Ie, Ee) => {
            return Ie - Ee
          }),
          I.x = (E[0] + E[1]) / 2)
        }
        return I
      },
    }
  }(),
  )
  var kt = d.extend({
    _class: 'PathFlattener',
    initialize(e, t, n, i, r) {
      const s = []; const u = []; let o = 0; const l = 1 / (n || 32); const f = e._segments; let g = f[0]; let y
      function _(x, S) {
        const I = re.getValues(x, S, r)
        s.push(I),
        v(I, x._index, 0, 1)
      }
      function v(x, S, I, m) {
        if (m - I > l && !(i && re.isStraight(x)) && !re.isFlatEnough(x, t || 0.25)) {
          const w = re.subdivide(x, 0.5)
          const E = (I + m) / 2
          v(w[0], S, I, E),
          v(w[1], S, E, m)
        }
        else {
          const A = x[6] - x[0]
          const N = x[7] - x[1]
          const L = Math.sqrt(A * A + N * N)
          L > 0 && (o += L,
          u.push({
            offset: o,
            curve: x,
            index: S,
            time: m,
          }))
        }
      }
      for (let b = 1, T = f.length; b < T; b++) {
        y = f[b],
        _(g, y),
        g = y
      }
      e._closed && _(y || g, f[0]),
      this.curves = s,
      this.parts = u,
      this.length = o,
      this.index = 0
    },
    _get(e) {
      for (var t = this.parts, n = t.length, i, r, s = this.index; r = s,
      !(!s || t[--s].offset < e);)
        ;
      for (; r < n; r++) {
        const u = t[r]
        if (u.offset >= e) {
          this.index = r
          const o = t[r - 1]
          const l = o && o.index === u.index ? o.time : 0
          const f = o ? o.offset : 0
          return {
            index: u.index,
            time: l + (u.time - l) * (e - f) / (u.offset - f),
          }
        }
      }
      return {
        index: t[n - 1].index,
        time: 1,
      }
    },
    drawPart(e, t, n) {
      for (let i = this._get(t), r = this._get(n), s = i.index, u = r.index; s <= u; s++) {
        const o = re.getPart(this.curves[s], s === i.index ? i.time : 0, s === r.index ? r.time : 1)
        s === i.index && e.moveTo(o[0], o[1]),
        e.bezierCurveTo.apply(e, o.slice(2))
      }
    },
  }, d.each(re._evaluateMethods, function (e) {
    this[`${e}At`] = function (t) {
      const n = this._get(t)
      return re[e](this.curves[n.index], n.time)
    }
  }, {}))
  var yn = d.extend({
    initialize(e) {
      for (var t = this.points = [], n = e._segments, i = e._closed, r = 0, s, u = n.length; r < u; r++) {
        const o = n[r].point;
        (!s || !s.equals(o)) && t.push(s = o.clone())
      }
      i && (t.unshift(t[t.length - 1]),
      t.push(t[1])),
      this.closed = i
    },
    fit(e) {
      const t = this.points
      const n = t.length
      let i = null
      return n > 0 && (i = [new pe(t[0])],
      n > 1 && (this.fitCubic(i, e, 0, n - 1, t[1].subtract(t[0]), t[n - 2].subtract(t[n - 1])),
      this.closed && (i.shift(),
      i.pop()))),
      i
    },
    fitCubic(e, t, n, i, r, s) {
      const u = this.points
      if (i - n === 1) {
        const o = u[n]
        const l = u[i]
        const f = o.getDistance(l) / 3
        this.addCurve(e, [o, o.add(r.normalize(f)), l.add(s.normalize(f)), l])
        return
      }
      for (var g = this.chordLengthParameterize(n, i), y = Math.max(t, t * t), _, v = !0, b = 0; b <= 4; b++) {
        const T = this.generateBezier(n, i, g, r, s)
        const x = this.findMaxError(n, i, T, g)
        if (x.error < t && v) {
          this.addCurve(e, T)
          return
        }
        if (_ = x.index,
        x.error >= y)
          break
        v = this.reparameterize(n, i, g, T),
        y = x.error
      }
      const S = u[_ - 1].subtract(u[_ + 1])
      this.fitCubic(e, t, n, _, r, S),
      this.fitCubic(e, t, _, i, S.negate(), s)
    },
    addCurve(e, t) {
      const n = e[e.length - 1]
      n.setHandleOut(t[1].subtract(t[0])),
      e.push(new pe(t[3], t[2].subtract(t[3])))
    },
    generateBezier(e, t, n, i, r) {
      for (var s = 1e-12, u = Math.abs, o = this.points, l = o[e], f = o[t], g = [[0, 0], [0, 0]], y = [0, 0], _ = 0, v = t - e + 1; _ < v; _++) {
        const b = n[_]
        const T = 1 - b
        const x = 3 * b * T
        const S = T * T * T
        const I = x * T
        const m = x * b
        const w = b * b * b
        const E = i.normalize(I)
        const A = r.normalize(m)
        const N = o[e + _].subtract(l.multiply(S + I)).subtract(f.multiply(m + w))
        g[0][0] += E.dot(E),
        g[0][1] += E.dot(A),
        g[1][0] = g[0][1],
        g[1][1] += A.dot(A),
        y[0] += E.dot(N),
        y[1] += A.dot(N)
      }
      const L = g[0][0] * g[1][1] - g[1][0] * g[0][1]; let R; let D
      if (u(L) > s) {
        const V = g[0][0] * y[1] - g[1][0] * y[0]
        const z = y[0] * g[1][1] - y[1] * g[0][1]
        R = z / L,
        D = V / L
      }
      else {
        const G = g[0][0] + g[0][1]
        const H = g[1][0] + g[1][1]
        R = D = u(G) > s ? y[0] / G : u(H) > s ? y[1] / H : 0
      }
      const K = f.getDistance(l); const $ = s * K; let W; let te
      if (R < $ || D < $) { R = D = K / 3 }
      else {
        const se = f.subtract(l)
        W = i.normalize(R),
        te = r.normalize(D),
        W.dot(se) - te.dot(se) > K * K && (R = D = K / 3,
        W = te = null)
      }
      return [l, l.add(W || i.normalize(R)), f.add(te || r.normalize(D)), f]
    },
    reparameterize(e, t, n, i) {
      for (var r = e; r <= t; r++)
        n[r - e] = this.findRoot(i, this.points[r], n[r - e])
      for (var r = 1, s = n.length; r < s; r++) {
        if (n[r] <= n[r - 1])
          return !1
      }
      return !0
    },
    findRoot(e, t, n) {
      for (var i = [], r = [], s = 0; s <= 2; s++)
        i[s] = e[s + 1].subtract(e[s]).multiply(3)
      for (var s = 0; s <= 1; s++)
        r[s] = i[s + 1].subtract(i[s]).multiply(2)
      const u = this.evaluate(3, e, n)
      const o = this.evaluate(2, i, n)
      const l = this.evaluate(1, r, n)
      const f = u.subtract(t)
      const g = o.dot(o) + f.dot(l)
      return O.isMachineZero(g) ? n : n - f.dot(o) / g
    },
    evaluate(e, t, n) {
      for (var i = t.slice(), r = 1; r <= e; r++) {
        for (let s = 0; s <= e - r; s++)
          i[s] = i[s].multiply(1 - n).add(i[s + 1].multiply(n))
      }
      return i[0]
    },
    chordLengthParameterize(e, t) {
      for (var n = [0], i = e + 1; i <= t; i++)
        n[i - e] = n[i - e - 1] + this.points[i].getDistance(this.points[i - 1])
      for (var i = 1, r = t - e; i <= r; i++)
        n[i] /= n[r]
      return n
    },
    findMaxError(e, t, n, i) {
      for (var r = Math.floor((t - e + 1) / 2), s = 0, u = e + 1; u < t; u++) {
        const o = this.evaluate(3, n, i[u - e])
        const l = o.subtract(this.points[u])
        const f = l.x * l.x + l.y * l.y
        f >= s && (s = f,
        r = u)
      }
      return {
        error: s,
        index: r,
      }
    },
  })
  const Gt = oe.extend({
    _class: 'TextItem',
    _applyMatrix: !1,
    _canApplyMatrix: !1,
    _serializeFields: {
      content: null,
    },
    _boundsOptions: {
      stroke: !1,
      handle: !1,
    },
    initialize(t) {
      this._content = '',
      this._lines = []
      const n = t && d.isPlainObject(t) && t.x === a && t.y === a
      this._initialize(n && t, !n && C.read(arguments))
    },
    _equals(e) {
      return this._content === e._content
    },
    copyContent(e) {
      this.setContent(e._content)
    },
    getContent() {
      return this._content
    },
    setContent(e) {
      this._content = `${e}`,
      this._lines = this._content.split(/\r\n|\n|\r/mg),
      this._changed(521)
    },
    isEmpty() {
      return !this._content
    },
    getCharacterStyle: '#getStyle',
    setCharacterStyle: '#setStyle',
    getParagraphStyle: '#getStyle',
    setParagraphStyle: '#setStyle',
  })
  const Mt = Gt.extend({
    _class: 'PointText',
    initialize() {
      Gt.apply(this, arguments)
    },
    getPoint() {
      const e = this._matrix.getTranslation()
      return new Q(e.x, e.y, this, 'setPoint')
    },
    setPoint() {
      const e = C.read(arguments)
      this.translate(e.subtract(this._matrix.getTranslation()))
    },
    _draw(e, t, n) {
      if (this._content) {
        this._setStyles(e, t, n)
        const i = this._lines
        let r = this._style
        let s = r.hasFill()
        let u = r.hasStroke()
        let o = r.getLeading()
        let l = e.shadowColor
        e.font = r.getFontStyle(),
        e.textAlign = r.getJustification()
        for (let f = 0, g = i.length; f < g; f++) {
          e.shadowColor = l
          const y = i[f]
          s && (e.fillText(y, 0, 0),
          e.shadowColor = 'rgba(0,0,0,0)'),
          u && e.strokeText(y, 0, 0),
          e.translate(0, o)
        }
      }
    },
    _getBounds(e, t) {
      const n = this._style
      let i = this._lines
      let r = i.length
      let s = n.getJustification()
      let u = n.getLeading()
      let o = this.getView().getTextWidth(n.getFontStyle(), i)
      let l = 0
      s !== 'left' && (l -= o / (s === 'center' ? 2 : 1))
      const f = new Y(l, r ? -0.75 * u : 0, o, r * u)
      return e ? e._transformBounds(f, f) : f
    },
  })
  var Xe = d.extend(new function () {
    const e = {
      gray: ['gray'],
      rgb: ['red', 'green', 'blue'],
      hsb: ['hue', 'saturation', 'brightness'],
      hsl: ['hue', 'saturation', 'lightness'],
      gradient: ['gradient', 'origin', 'destination', 'highlight'],
    }; const t = {}; const n = {
      transparent: [0, 0, 0, 0],
    }; let i
    function r(o) {
      let l = o.match(/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})?$/i) || o.match(/^#([\da-f])([\da-f])([\da-f])([\da-f])?$/i); let f = 'rgb'; let g
      if (l) {
        const y = l[4] ? 4 : 3
        g = new Array(y)
        for (var _ = 0; _ < y; _++) {
          var v = l[_ + 1]
          g[_] = parseInt(v.length == 1 ? v + v : v, 16) / 255
        }
      }
      else if (l = o.match(/^(rgb|hsl)a?\((.*)\)$/)) {
        f = l[1],
        g = l[2].trim().split(/[,\s]+/g)
        for (var b = f === 'hsl', _ = 0, T = Math.min(g.length, 4); _ < T; _++) {
          const x = g[_]
          var v = parseFloat(x)
          if (b) {
            if (_ === 0) {
              const S = x.match(/([a-z]*)$/)[1]
              v *= {
                turn: 360,
                rad: 180 / Math.PI,
                grad: 0.9,
              }[S] || 1
            }
            else { _ < 3 && (v /= 100) }
          }
          else { _ < 3 && (v /= x.endsWith('%') ? 100 : 255) }
          g[_] = v
        }
      }
      else {
        let I = n[o]
        if (!I) {
          if (h) {
            i || (i = Je.getContext(1, 1, {
              willReadFrequently: !0,
            }),
            i.globalCompositeOperation = 'copy'),
            i.fillStyle = 'rgba(0,0,0,0)',
            i.fillStyle = o,
            i.fillRect(0, 0, 1, 1)
            const m = i.getImageData(0, 0, 1, 1).data
            I = n[o] = [m[0] / 255, m[1] / 255, m[2] / 255]
          }
          else { I = [0, 0, 0] }
        }
        g = I.slice()
      }
      return [f, g]
    }
    const s = [[0, 3, 1], [2, 0, 1], [1, 0, 3], [1, 2, 0], [3, 1, 0], [0, 1, 2]]
    const u = {
      'rgb-hsb': function (o, l, f) {
        const g = Math.max(o, l, f)
        const y = Math.min(o, l, f)
        const _ = g - y
        const v = _ === 0 ? 0 : (g == o ? (l - f) / _ + (l < f ? 6 : 0) : g == l ? (f - o) / _ + 2 : (o - l) / _ + 4) * 60
        return [v, g === 0 ? 0 : _ / g, g]
      },
      'hsb-rgb': function (o, l, f) {
        o = (o / 60 % 6 + 6) % 6
        var y = Math.floor(o)
        const g = o - y
        var y = s[y]
        const _ = [f, f * (1 - l), f * (1 - l * g), f * (1 - l * (1 - g))]
        return [_[y[0]], _[y[1]], _[y[2]]]
      },
      'rgb-hsl': function (o, l, f) {
        const g = Math.max(o, l, f)
        const y = Math.min(o, l, f)
        const _ = g - y
        const v = _ === 0
        const b = v ? 0 : (g == o ? (l - f) / _ + (l < f ? 6 : 0) : g == l ? (f - o) / _ + 2 : (o - l) / _ + 4) * 60
        const T = (g + y) / 2
        const x = v ? 0 : T < 0.5 ? _ / (g + y) : _ / (2 - g - y)
        return [b, x, T]
      },
      'hsl-rgb': function (o, l, f) {
        if (o = (o / 360 % 1 + 1) % 1,
        l === 0)
          return [f, f, f]
        for (var g = [o + 1 / 3, o, o - 1 / 3], y = f < 0.5 ? f * (1 + l) : f + l - f * l, _ = 2 * f - y, v = [], b = 0; b < 3; b++) {
          let T = g[b]
          T < 0 && (T += 1),
          T > 1 && (T -= 1),
          v[b] = 6 * T < 1 ? _ + (y - _) * 6 * T : 2 * T < 1 ? y : 3 * T < 2 ? _ + (y - _) * (2 / 3 - T) * 6 : _
        }
        return v
      },
      'rgb-gray': function (o, l, f) {
        return [o * 0.2989 + l * 0.587 + f * 0.114]
      },
      'gray-rgb': function (o) {
        return [o, o, o]
      },
      'gray-hsb': function (o) {
        return [0, 0, o]
      },
      'gray-hsl': function (o) {
        return [0, 0, o]
      },
      'gradient-rgb': function () {
        return []
      },
      'rgb-gradient': function () {
        return []
      },
    }
    return d.each(e, function (o, l) {
      t[l] = [],
      d.each(o, function (f, g) {
        const y = d.capitalize(f)
        const _ = /^(hue|saturation)$/.test(f)
        const v = t[l][g] = l === 'gradient'
          ? f === 'gradient'
            ? function (b) {
              const T = this._components[0]
              return b = xt.read(Array.isArray(b) ? b : arguments, 0, {
                readNull: !0,
              }),
              T !== b && (T && T._removeOwner(this),
              b && b._addOwner(this)),
              b
            }
            : function () {
              return C.read(arguments, 0, {
                readNull: f === 'highlight',
                clone: !0,
              })
            }
          : function (b) {
            return b == null || isNaN(b) ? 0 : +b
          }

        this[`get${y}`] = function () {
          return this._type === l || _ && /^hs[bl]$/.test(this._type) ? this._components[g] : this._convert(l)[g]
        }
        ,
        this[`set${y}`] = function (b) {
          this._type !== l && !(_ && /^hs[bl]$/.test(this._type)) && (this._components = this._convert(l),
          this._properties = e[l],
          this._type = l),
          this._components[g] = v.call(this, b),
          this._changed()
        }
      }, this)
    }, {
      _class: 'Color',
      _readIndex: !0,
      initialize: function o(l) {
        let f = arguments; const g = this.__read; let y = 0; let _; let v; let b; let T
        Array.isArray(l) && (f = l,
        l = f[0])
        let x = l != null && typeof l
        if (x === 'string' && l in e && (_ = l,
        l = f[1],
        Array.isArray(l)
          ? (v = l,
            b = f[2])
          : (g && (y = 1),
            f = d.slice(f, 1),
            x = typeof l)),
        !v) {
          if (T = x === 'number' ? f : x === 'object' && l.length != null ? l : null,
          T) {
            _ || (_ = T.length >= 3 ? 'rgb' : 'gray')
            const S = e[_].length
            b = T[S],
            g && (y += T === arguments ? S + (b != null ? 1 : 0) : 1),
            T.length > S && (T = d.slice(T, 0, S))
          }
          else if (x === 'string') {
            const I = r(l)
            _ = I[0],
            v = I[1],
            v.length === 4 && (b = v[3],
            v.length--)
          }
          else if (x === 'object') {
            if (l.constructor === o) {
              if (_ = l._type,
              v = l._components.slice(),
              b = l._alpha,
              _ === 'gradient') {
                for (var m = 1, w = v.length; m < w; m++) {
                  let E = v[m]
                  E && (v[m] = E.clone())
                }
              }
            }
            else if (l.constructor === xt) {
              _ = 'gradient',
              T = f
            }
            else {
              _ = 'hue' in l ? 'lightness' in l ? 'hsl' : 'hsb' : 'gradient' in l || 'stops' in l || 'radial' in l ? 'gradient' : 'gray' in l ? 'gray' : 'rgb'
              const A = e[_]
              var N = t[_]
              this._components = v = []
              for (var m = 0, w = A.length; m < w; m++) {
                var L = l[A[m]]
                L == null && !m && _ === 'gradient' && 'stops' in l && (L = {
                  stops: l.stops,
                  radial: l.radial,
                }),
                L = N[m].call(this, L),
                L != null && (v[m] = L)
              }
              b = l.alpha
            }
          }
          g && _ && (y = 1)
        }
        if (this._type = _ || 'rgb',
        !v) {
          this._components = v = []
          for (var N = t[this._type], m = 0, w = N.length; m < w; m++) {
            var L = N[m].call(this, T && T[m])
            L != null && (v[m] = L)
          }
        }
        return this._components = v,
        this._properties = e[this._type],
        this._alpha = b,
        g && (this.__read = y),
        this
      },
      set: '#initialize',
      _serialize(o, l) {
        const f = this.getComponents()
        return d.serialize(/^(gray|rgb)$/.test(this._type) ? f : [this._type].concat(f), o, !0, l)
      },
      _changed() {
        this._canvasStyle = null,
        this._owner && (this._setter ? this._owner[this._setter](this) : this._owner._changed(129))
      },
      _convert(o) {
        let l
        return this._type === o ? this._components.slice() : (l = u[`${this._type}-${o}`]) ? l.apply(this, this._components) : u[`rgb-${o}`].apply(this, u[`${this._type}-rgb`].apply(this, this._components))
      },
      convert(o) {
        return new Xe(o, this._convert(o), this._alpha)
      },
      getType() {
        return this._type
      },
      setType(o) {
        this._components = this._convert(o),
        this._properties = e[o],
        this._type = o
      },
      getComponents() {
        const o = this._components.slice()
        return this._alpha != null && o.push(this._alpha),
        o
      },
      getAlpha() {
        return this._alpha != null ? this._alpha : 1
      },
      setAlpha(o) {
        this._alpha = o == null ? null : Math.min(Math.max(o, 0), 1),
        this._changed()
      },
      hasAlpha() {
        return this._alpha != null
      },
      equals(o) {
        const l = d.isPlainValue(o, !0) ? Xe.read(arguments) : o
        return l === this || l && this._class === l._class && this._type === l._type && this.getAlpha() === l.getAlpha() && d.equals(this._components, l._components) || !1
      },
      toString() {
        for (var o = this._properties, l = [], f = this._type === 'gradient', g = k.instance, y = 0, _ = o.length; y < _; y++) {
          const v = this._components[y]
          v != null && l.push(`${o[y]}: ${f ? v : g.number(v)}`)
        }
        return this._alpha != null && l.push(`alpha: ${g.number(this._alpha)}`),
        `{ ${l.join(', ')} }`
      },
      toCSS(o) {
        let l = this._convert('rgb')
        const f = o || this._alpha == null ? 1 : this._alpha
        function g(y) {
          return Math.round((y < 0 ? 0 : y > 1 ? 1 : y) * 255)
        }
        return l = [g(l[0]), g(l[1]), g(l[2])],
        f < 1 && l.push(f < 0 ? 0 : f),
        o ? `#${((1 << 24) + (l[0] << 16) + (l[1] << 8) + l[2]).toString(16).slice(1)}` : `${(l.length == 4 ? 'rgba(' : 'rgb(') + l.join(',')})`
      },
      toCanvasStyle(o, l) {
        if (this._canvasStyle)
          return this._canvasStyle
        if (this._type !== 'gradient')
          return this._canvasStyle = this.toCSS()
        const f = this._components; const g = f[0]; const y = g._stops; let _ = f[1]; let v = f[2]; let b = f[3]; const T = l && l.inverted(); let x
        if (T && (_ = T._transformPoint(_),
        v = T._transformPoint(v),
        b && (b = T._transformPoint(b))),
        g._radial) {
          const S = v.getDistance(_)
          if (b) {
            const I = b.subtract(_)
            I.getLength() > S && (b = _.add(I.normalize(S - 0.1)))
          }
          const m = b || _
          x = o.createRadialGradient(m.x, m.y, 0, _.x, _.y, S)
        }
        else { x = o.createLinearGradient(_.x, _.y, v.x, v.y) }
        for (let w = 0, E = y.length; w < E; w++) {
          const A = y[w]
          const N = A._offset
          x.addColorStop(N ?? w / (E - 1), A._color.toCanvasStyle())
        }
        return this._canvasStyle = x
      },
      transform(o) {
        if (this._type === 'gradient') {
          for (let l = this._components, f = 1, g = l.length; f < g; f++) {
            const y = l[f]
            o._transformPoint(y, y, !0)
          }
          this._changed()
        }
      },
      statics: {
        _types: e,
        random() {
          const o = Math.random
          return new Xe(o(), o(), o())
        },
        _setOwner(o, l, f) {
          return o && (o._owner && l && o._owner !== l && (o = o.clone()),
          !o._owner ^ !l && (o._owner = l || null,
          o._setter = f || null)),
          o
        },
      },
    })
  }()
  , new function () {
    const e = {
      add(t, n) {
        return t + n
      },
      subtract(t, n) {
        return t - n
      },
      multiply(t, n) {
        return t * n
      },
      divide(t, n) {
        return t / n
      },
    }
    return d.each(e, function (t, n) {
      this[n] = function (i) {
        i = Xe.read(arguments)
        for (var r = this._type, s = this._components, u = i._convert(r), o = 0, l = s.length; o < l; o++)
          u[o] = t(s[o], u[o])
        return new Xe(r, u, this._alpha != null ? t(this._alpha, i.getAlpha()) : null)
      }
    }, {})
  }(),
  )
  var xt = d.extend({
    _class: 'Gradient',
    initialize(t, n) {
      this._id = B.get(),
      t && d.isPlainObject(t) && (this.set(t),
      t = n = null),
      this._stops == null && this.setStops(t || ['white', 'black']),
      this._radial == null && this.setRadial(typeof n == 'string' && n === 'radial' || n || !1)
    },
    _serialize(e, t) {
      return t.add(this, function () {
        return d.serialize([this._stops, this._radial], e, !0, t)
      })
    },
    _changed() {
      for (let e = 0, t = this._owners && this._owners.length; e < t; e++)
        this._owners[e]._changed()
    },
    _addOwner(e) {
      this._owners || (this._owners = []),
      this._owners.push(e)
    },
    _removeOwner(e) {
      const t = this._owners ? this._owners.indexOf(e) : -1
      t != -1 && (this._owners.splice(t, 1),
      this._owners.length || (this._owners = a))
    },
    clone() {
      for (var e = [], t = 0, n = this._stops.length; t < n; t++)
        e[t] = this._stops[t].clone()
      return new xt(e, this._radial)
    },
    getStops() {
      return this._stops
    },
    setStops(e) {
      if (e.length < 2)
        throw new Error('Gradient stop list needs to contain at least two stops.')
      let t = this._stops
      if (t) {
        for (var n = 0, i = t.length; n < i; n++)
          t[n]._owner = a
      }
      t = this._stops = en.readList(e, 0, {
        clone: !0,
      })
      for (var n = 0, i = t.length; n < i; n++)
        t[n]._owner = this
      this._changed()
    },
    getRadial() {
      return this._radial
    },
    setRadial(e) {
      this._radial = e,
      this._changed()
    },
    equals(e) {
      if (e === this)
        return !0
      if (e && this._class === e._class) {
        const t = this._stops
        const n = e._stops
        const i = t.length
        if (i === n.length) {
          for (let r = 0; r < i; r++) {
            if (!t[r].equals(n[r]))
              return !1
          }
          return !0
        }
      }
      return !1
    },
  })
  var en = d.extend({
    _class: 'GradientStop',
    initialize(t, n) {
      let i = t
      let r = n
      typeof t == 'object' && n === a && (Array.isArray(t) && typeof t[0] != 'number'
        ? (i = t[0],
          r = t[1])
        : ('color' in t || 'offset' in t || 'rampPoint' in t) && (i = t.color,
          r = t.offset || t.rampPoint || 0)),
      this.setColor(i),
      this.setOffset(r)
    },
    clone() {
      return new en(this._color.clone(), this._offset)
    },
    _serialize(e, t) {
      const n = this._color
      const i = this._offset
      return d.serialize(i == null ? [n] : [n, i], e, !0, t)
    },
    _changed() {
      this._owner && this._owner._changed(129)
    },
    getOffset() {
      return this._offset
    },
    setOffset(e) {
      this._offset = e,
      this._changed()
    },
    getRampPoint: '#getOffset',
    setRampPoint: '#setOffset',
    getColor() {
      return this._color
    },
    setColor() {
      Xe._setOwner(this._color, null),
      this._color = Xe._setOwner(Xe.read(arguments, 0), this, 'setColor'),
      this._changed()
    },
    equals(e) {
      return e === this || e && this._class === e._class && this._color.equals(e._color) && this._offset == e._offset || !1
    },
  })
  var Kt = d.extend(new function () {
    const e = {
      fillColor: null,
      fillRule: 'nonzero',
      strokeColor: null,
      strokeWidth: 1,
      strokeCap: 'butt',
      strokeJoin: 'miter',
      strokeScaling: !0,
      miterLimit: 10,
      dashOffset: 0,
      dashArray: [],
      shadowColor: null,
      shadowBlur: 0,
      shadowOffset: new C(),
      selectedColor: null,
    }
    const t = d.set({}, e, {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
      fontSize: 12,
      leading: null,
      justification: 'left',
    })
    const n = d.set({}, t, {
      fillColor: new Xe(),
    })
    const i = {
      strokeWidth: 193,
      strokeCap: 193,
      strokeJoin: 193,
      strokeScaling: 201,
      miterLimit: 193,
      fontFamily: 9,
      fontWeight: 9,
      fontSize: 9,
      font: 9,
      leading: 9,
      justification: 9,
    }
    const r = {
      beans: !0,
    }
    const s = {
      _class: 'Style',
      beans: !0,
      initialize(o, l, f) {
        this._values = {},
        this._owner = l,
        this._project = l && l._project || f || ae.project,
        this._defaults = !l || l instanceof We ? t : l instanceof Gt ? n : e,
        o && this.set(o)
      },
    }
    return d.each(t, (u, o) => {
      const l = o.endsWith('Color')
      const f = o === 'shadowOffset'
      const g = d.capitalize(o)
      const y = i[o]
      const _ = `set${g}`
      const v = `get${g}`
      s[_] = function (b) {
        const T = this._owner
        const x = T && T._children
        const S = x && x.length > 0 && !(T instanceof ot)
        if (S) {
          for (let I = 0, m = x.length; I < m; I++)
            x[I]._style[_](b)
        }
        if ((o === 'selectedColor' || !S) && o in this._defaults) {
          const w = this._values[o]
          w !== b && (l && (w && (Xe._setOwner(w, null),
          w._canvasStyle = null),
          b && b.constructor === Xe && (b = Xe._setOwner(b, T, S && _))),
          this._values[o] = b,
          T && T._changed(y || 129))
        }
      }
      ,
      s[v] = function (b) {
        const T = this._owner; const x = T && T._children; const S = x && x.length > 0 && !(T instanceof ot); var I
        if (S && !b) {
          for (let m = 0, w = x.length; m < w; m++) {
            const E = x[m]._style[v]()
            if (!m)
              I = E
            else if (!d.equals(I, E))
              return a
          }
        }
        else if (o in this._defaults) {
          var I = this._values[o]
          if (I === a) {
            I = this._defaults[o],
            I && I.clone && (I = I.clone())
          }
          else {
            const A = l ? Xe : f ? C : null
            A && !(I && I.constructor === A) && (this._values[o] = I = A.read([I], 0, {
              readNull: !0,
              clone: !0,
            }))
          }
        }
        return I && l && (I = Xe._setOwner(I, T, S && _)),
        I
      }
      ,
      r[v] = function (b) {
        return this._style[v](b)
      }
      ,
      r[_] = function (b) {
        this._style[_](b)
      }
    }),
    d.each({
      Font: 'FontFamily',
      WindingRule: 'FillRule',
    }, (u, o) => {
      const l = `get${o}`
      const f = `set${o}`
      s[l] = r[l] = `#get${u}`,
      s[f] = r[f] = `#set${u}`
    }),
    oe.inject(r),
    s
  }()
  , {
    set(e) {
      const t = e instanceof Kt
      const n = t ? e._values : e
      if (n) {
        for (const i in n) {
          if (i in this._defaults) {
            const r = n[i]
            this[i] = r && t && r.clone ? r.clone() : r
          }
        }
      }
    },
    equals(e) {
      function t(n, i, r) {
        const s = n._values
        const u = i._values
        const o = i._defaults
        for (const l in s) {
          const f = s[l]
          const g = u[l]
          if (!(r && l in u) && !d.equals(f, g === a ? o[l] : g))
            return !1
        }
        return !0
      }
      return e === this || e && this._class === e._class && t(this, e) && t(e, this, !0) || !1
    },
    _dispose() {
      let e
      e = this.getFillColor(),
      e && (e._canvasStyle = null),
      e = this.getStrokeColor(),
      e && (e._canvasStyle = null),
      e = this.getShadowColor(),
      e && (e._canvasStyle = null)
    },
    hasFill() {
      const e = this.getFillColor()
      return !!e && e.alpha > 0
    },
    hasStroke() {
      const e = this.getStrokeColor()
      return !!e && e.alpha > 0 && this.getStrokeWidth() > 0
    },
    hasShadow() {
      const e = this.getShadowColor()
      return !!e && e.alpha > 0 && (this.getShadowBlur() > 0 || !this.getShadowOffset().isZero())
    },
    getView() {
      return this._project._view
    },
    getFontStyle() {
      const e = this.getFontSize()
      return `${this.getFontWeight()} ${e}${/[a-z]/i.test(`${e}`) ? ' ' : 'px '}${this.getFontFamily()}`
    },
    getFont: '#getFontFamily',
    setFont: '#setFontFamily',
    getLeading: function e() {
      const t = e.base.call(this)
      let n = this.getFontSize()
      return /pt|em|%|px/.test(n) && (n = this.getView().getPixelSize(n)),
      t ?? n * 1.2
    },
  })
  var Ce = new function () {
    function e(t, n, i, r) {
      for (let s = ['', 'webkit', 'moz', 'Moz', 'ms', 'o'], u = n[0].toUpperCase() + n.substring(1), o = 0; o < 6; o++) {
        const l = s[o]
        const f = l ? l + u : n
        if (f in t) {
          if (i)
            t[f] = r
          else
            return t[f]
          break
        }
      }
    }
    return {
      getStyles(t) {
        const n = t && t.nodeType !== 9 ? t.ownerDocument : t
        const i = n && n.defaultView
        return i && i.getComputedStyle(t, '')
      },
      getBounds(t, n) {
        const i = t.ownerDocument; const r = i.body; const s = i.documentElement; let u
        try {
          u = t.getBoundingClientRect()
        }
        catch {
          u = {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
          }
        }
        let o = u.left - (s.clientLeft || r.clientLeft || 0)
        let l = u.top - (s.clientTop || r.clientTop || 0)
        if (!n) {
          const f = i.defaultView
          o += f.pageXOffset || s.scrollLeft || r.scrollLeft,
          l += f.pageYOffset || s.scrollTop || r.scrollTop
        }
        return new Y(o, l, u.width, u.height)
      },
      getViewportBounds(t) {
        const n = t.ownerDocument
        const i = n.defaultView
        const r = n.documentElement
        return new Y(0, 0, i.innerWidth || r.clientWidth, i.innerHeight || r.clientHeight)
      },
      getOffset(t, n) {
        return Ce.getBounds(t, n).getPoint()
      },
      getSize(t) {
        return Ce.getBounds(t, !0).getSize()
      },
      isInvisible(t) {
        return Ce.getSize(t).equals(new J(0, 0))
      },
      isInView(t) {
        return !Ce.isInvisible(t) && Ce.getViewportBounds(t).intersects(Ce.getBounds(t, !0))
      },
      isInserted(t) {
        return p.body.contains(t)
      },
      getPrefixed(t, n) {
        return t && e(t, n)
      },
      setPrefixed(t, n, i) {
        if (typeof n == 'object') {
          for (const r in n)
            e(t, r, !0, n[r])
        }
        else { e(t, n, !0, i) }
      },
    }
  }()
  var tt = {
    add(e, t) {
      if (e) {
        for (const n in t) {
for (let i = t[n], r = n.split(/[\s,]+/g), s = 0, u = r.length; s < u; s++) {
          var o = r[s]
          var l = e === p && (o === 'touchstart' || o === 'touchmove')
            ? {
                passive: !1,
              }
            : !1
          e.addEventListener(o, i, l)
        }
}
      }
    },
    remove(e, t) {
      if (e) {
        for (const n in t) {
for (let i = t[n], r = n.split(/[\s,]+/g), s = 0, u = r.length; s < u; s++)
          e.removeEventListener(r[s], i, !1)
}
      }
    },
    getPoint(e) {
      const t = e.targetTouches ? e.targetTouches.length ? e.targetTouches[0] : e.changedTouches[0] : e
      return new C(t.pageX || t.clientX + p.documentElement.scrollLeft, t.pageY || t.clientY + p.documentElement.scrollTop)
    },
    getTarget(e) {
      return e.target || e.srcElement
    },
    getRelatedTarget(e) {
      return e.relatedTarget || e.toElement
    },
    getOffset(e, t) {
      return tt.getPoint(e).subtract(Ce.getOffset(t || tt.getTarget(e)))
    },
  }
  tt.requestAnimationFrame = new function () {
    const e = Ce.getPrefixed(h, 'requestAnimationFrame'); let t = !1; let n = []; let i
    function r() {
      const s = n
      n = []
      for (let u = 0, o = s.length; u < o; u++)
        s[u]()
      t = e && n.length,
      t && e(r)
    }
    return function (s) {
      n.push(s),
      e
        ? t || (e(r),
        t = !0)
        : i || (i = setInterval(r, 16.666666666666668))
    }
  }()

  var Ke = d.extend(M, {
    _class: 'View',
    initialize: function e(t, n) {
      function i(y) {
        return n[y] || parseInt(n.getAttribute(y), 10)
      }
      function r() {
        const y = Ce.getSize(n)
        return y.isNaN() || y.isZero() ? new J(i('width'), i('height')) : y
      }
      let s
      if (h && n) {
        this._id = n.getAttribute('id'),
        this._id == null && n.setAttribute('id', this._id = `paper-view-${e._id++}`),
        tt.add(n, this._viewEvents)
        const u = 'none'
        if (Ce.setPrefixed(n.style, {
          userDrag: u,
          userSelect: u,
          touchAction: u,
          touchCallout: u,
          contentZooming: u,
          tapHighlightColor: 'rgba(0,0,0,0)',
        }),
        F.hasAttribute(n, 'resize')) {
          const o = this
          tt.add(h, this._windowEvents = {
            resize() {
              o.setViewSize(r())
            },
          })
        }
        if (s = r(),
        F.hasAttribute(n, 'stats') && typeof Stats < 'u') {
          this._stats = new Stats()
          const l = this._stats.domElement
          const f = l.style
          const g = Ce.getOffset(n)
          f.position = 'absolute',
          f.left = `${g.x}px`,
          f.top = `${g.y}px`,
          p.body.appendChild(l)
        }
      }
      else {
        s = new J(n),
        n = null
      }
      this._project = t,
      this._scope = t._scope,
      this._element = n,
      this._pixelRatio || (this._pixelRatio = h && h.devicePixelRatio || 1),
      this._setElementSize(s.width, s.height),
      this._viewSize = s,
      e._views.push(this),
      e._viewsById[this._id] = this,
      (this._matrix = new le())._owner = this,
      e._focused || (e._focused = this),
      this._frameItems = {},
      this._frameItemCount = 0,
      this._itemEvents = {
        native: {},
        virtual: {},
      },
      this._autoUpdate = !ae.agent.node,
      this._needsUpdate = !1
    },
    remove() {
      if (!this._project)
        return !1
      Ke._focused === this && (Ke._focused = null),
      Ke._views.splice(Ke._views.indexOf(this), 1),
      delete Ke._viewsById[this._id]
      const e = this._project
      return e._view === this && (e._view = null),
      tt.remove(this._element, this._viewEvents),
      tt.remove(h, this._windowEvents),
      this._element = this._project = null,
      this.off('frame'),
      this._animate = !1,
      this._frameItems = {},
      !0
    },
    _events: d.each(oe._itemHandlers.concat(['onResize', 'onKeyDown', 'onKeyUp']), function (e) {
      this[e] = {}
    }, {
      onFrame: {
        install() {
          this.play()
        },
        uninstall() {
          this.pause()
        },
      },
    }),
    _animate: !1,
    _time: 0,
    _count: 0,
    getAutoUpdate() {
      return this._autoUpdate
    },
    setAutoUpdate(e) {
      this._autoUpdate = e,
      e && this.requestUpdate()
    },
    update() {},
    draw() {
      this.update()
    },
    requestUpdate() {
      if (!this._requested) {
        const e = this
        tt.requestAnimationFrame(() => {
          if (e._requested = !1,
          e._animate) {
            e.requestUpdate()
            const t = e._element;
            (!Ce.getPrefixed(p, 'hidden') || F.getAttribute(t, 'keepalive') === 'true') && Ce.isInView(t) && e._handleFrame()
          }
          e._autoUpdate && e.update()
        }),
        this._requested = !0
      }
    },
    play() {
      this._animate = !0,
      this.requestUpdate()
    },
    pause() {
      this._animate = !1
    },
    _handleFrame() {
      ae = this._scope
      const e = Date.now() / 1e3
      const t = this._last ? e - this._last : 0
      this._last = e,
      this.emit('frame', new d({
        delta: t,
        time: this._time += t,
        count: this._count++,
      })),
      this._stats && this._stats.update()
    },
    _animateItem(e, t) {
      const n = this._frameItems
      t
        ? (n[e._id] = {
            item: e,
            time: 0,
            count: 0,
          },
          ++this._frameItemCount === 1 && this.on('frame', this._handleFrameItems))
        : (delete n[e._id],
          --this._frameItemCount === 0 && this.off('frame', this._handleFrameItems))
    },
    _handleFrameItems(e) {
      for (const t in this._frameItems) {
        const n = this._frameItems[t]
        n.item.emit('frame', new d(e, {
          time: n.time += e.delta,
          count: n.count++,
        }))
      }
    },
    _changed() {
      this._project._changed(4097),
      this._bounds = this._decomposed = a
    },
    getElement() {
      return this._element
    },
    getPixelRatio() {
      return this._pixelRatio
    },
    getResolution() {
      return this._pixelRatio * 72
    },
    getViewSize() {
      const e = this._viewSize
      return new ne(e.width, e.height, this, 'setViewSize')
    },
    setViewSize() {
      const e = J.read(arguments)
      const t = e.subtract(this._viewSize)
      t.isZero() || (this._setElementSize(e.width, e.height),
      this._viewSize.set(e),
      this._changed(),
      this.emit('resize', {
        size: e,
        delta: t,
      }),
      this._autoUpdate && this.update())
    },
    _setElementSize(e, t) {
      const n = this._element
      n && (n.width !== e && (n.width = e),
      n.height !== t && (n.height = t))
    },
    getBounds() {
      return this._bounds || (this._bounds = this._matrix.inverted()._transformBounds(new Y(new C(), this._viewSize))),
      this._bounds
    },
    getSize() {
      return this.getBounds().getSize()
    },
    isVisible() {
      return Ce.isInView(this._element)
    },
    isInserted() {
      return Ce.isInserted(this._element)
    },
    getPixelSize(e) {
      const t = this._element; let n
      if (t) {
        const i = t.parentNode
        const r = p.createElement('div')
        r.style.fontSize = e,
        i.appendChild(r),
        n = parseFloat(Ce.getStyles(r).fontSize),
        i.removeChild(r)
      }
      else { n = parseFloat(n) }
      return n
    },
    getTextWidth(e, t) {
      return 0
    },
  }, d.each(['rotate', 'scale', 'shear', 'skew'], function (e) {
    const t = e === 'rotate'
    this[e] = function () {
      const n = arguments
      const i = (t ? d : C).read(n)
      const r = C.read(n, 0, {
        readNull: !0,
      })
      return this.transform(new le()[e](i, r || this.getCenter(!0)))
    }
  }, {
    _decompose() {
      return this._decomposed || (this._decomposed = this._matrix.decompose())
    },
    translate() {
      const e = new le()
      return this.transform(e.translate.apply(e, arguments))
    },
    getCenter() {
      return this.getBounds().getCenter()
    },
    setCenter() {
      const e = C.read(arguments)
      this.translate(this.getCenter().subtract(e))
    },
    getZoom() {
      const e = this._decompose().scaling
      return (e.x + e.y) / 2
    },
    setZoom(e) {
      this.transform(new le().scale(e / this.getZoom(), this.getCenter()))
    },
    getRotation() {
      return this._decompose().rotation
    },
    setRotation(e) {
      const t = this.getRotation()
      t != null && e != null && this.rotate(e - t)
    },
    getScaling() {
      const e = this._decompose().scaling
      return new Q(e.x, e.y, this, 'setScaling')
    },
    setScaling() {
      const e = this.getScaling()
      const t = C.read(arguments, 0, {
        clone: !0,
        readNull: !0,
      })
      e && t && this.scale(t.x / e.x, t.y / e.y)
    },
    getMatrix() {
      return this._matrix
    },
    setMatrix() {
      const e = this._matrix
      e.set.apply(e, arguments)
    },
    transform(e) {
      this._matrix.append(e)
    },
    scrollBy() {
      this.translate(C.read(arguments).negate())
    },
  }), {
    projectToView() {
      return this._matrix._transformPoint(C.read(arguments))
    },
    viewToProject() {
      return this._matrix._inverseTransform(C.read(arguments))
    },
    getEventPoint(e) {
      return this.viewToProject(tt.getOffset(e, this._element))
    },
  }, {
    statics: {
      _views: [],
      _viewsById: {},
      _id: 0,
      create(e, t) {
        p && typeof t == 'string' && (t = p.getElementById(t))
        const n = h ? Rt : Ke
        return new n(e, t)
      },
    },
  }, new function () {
    if (!h)
      return
    let e; let t; let n = !1; let i = !1
    function r(z) {
      const G = tt.getTarget(z)
      return G.getAttribute && Ke._viewsById[G.getAttribute('id')]
    }
    function s() {
      let z = Ke._focused
      if (!z || !z.isVisible()) {
        for (let G = 0, H = Ke._views.length; G < H; G++) {
          if ((z = Ke._views[G]).isVisible()) {
            Ke._focused = t = z
            break
          }
        }
      }
    }
    function u(z, G, H) {
      z._handleMouseEvent('mousemove', G, H)
    }
    let o, l, f
    'onpointerdown' in h || h.PointerEvent || h.MSPointerEvent
      ? (o = 'pointerdown MSPointerDown',
        l = 'pointermove MSPointerMove',
        f = 'pointerup pointercancel MSPointerUp MSPointerCancel')
      : (o = 'touchstart',
        l = 'touchmove',
        f = 'touchend touchcancel',
        'ontouchstart' in h && navigator.userAgent.match(/mobile|tablet|ip(ad|hone|od)|android|silk/i) || (o += ' mousedown',
        l += ' mousemove',
        f += ' mouseup'))
    const g = {}
    const y = {
      mouseout(z) {
        const G = Ke._focused
        const H = tt.getRelatedTarget(z)
        if (G && (!H || H.nodeName === 'HTML')) {
          const K = tt.getOffset(z, G._element)
          const $ = K.x
          const W = Math.abs
          const te = W($)
          const se = 1 << 25
          const ue = te - se
          K.x = W(ue) < te ? ue * ($ < 0 ? -1 : 1) : $,
          u(G, z, G.viewToProject(K))
        }
      },
      scroll: s,
    }
    g[o] = function (z) {
      const G = Ke._focused = r(z)
      n || (n = !0,
      G._handleMouseEvent('mousedown', z))
    }
    ,
    y[l] = function (z) {
      let G = Ke._focused
      if (!i) {
        const H = r(z)
        H
          ? G !== H && (G && u(G, z),
          e || (e = G),
          G = Ke._focused = t = H)
          : t && t === G && (e && !e.isInserted() && (e = null),
          G = Ke._focused = e,
          e = null,
          s())
      }
      G && u(G, z)
    }
    ,
    y[o] = function () {
      i = !0
    }
    ,
    y[f] = function (z) {
      const G = Ke._focused
      G && n && G._handleMouseEvent('mouseup', z),
      i = n = !1
    }
    ,
    tt.add(p, y),
    tt.add(h, {
      load: s,
    })
    let _ = !1; let v = !1; const b = {
      doubleclick: 'click',
      mousedrag: 'mousemove',
    }; let T = !1; let x; let S; let I; let m; let w; let E; let A; let N; let L
    function R(z, G, H, K, $, W, te) {
      let se = !1; let ue
      function Ie(Ee, de) {
        if (Ee.responds(de)) {
          if (ue || (ue = new wn(de, K, $, G || Ee, W ? $.subtract(W) : null)),
          Ee.emit(de, ue) && (_ = !0,
          ue.prevented && (v = !0),
          ue.stopped))
            return se = !0
        }
        else {
          const ve = b[de]
          if (ve)
            return Ie(Ee, ve)
        }
      }
      for (; z && z !== te && !Ie(z, H);)
        z = z._parent
      return se
    }
    function D(z, G, H, K, $, W) {
      return z._project.removeOn(H),
      v = _ = !1,
      E && R(E, null, H, K, $, W) || G && G !== E && !G.isDescendant(E) && R(G, null, H === 'mousedrag' ? 'mousemove' : H, K, $, W, E) || R(z, E || G || z, H, K, $, W)
    }
    const V = {
      mousedown: {
        mousedown: 1,
        mousedrag: 1,
        click: 1,
        doubleclick: 1,
      },
      mouseup: {
        mouseup: 1,
        mousedrag: 1,
        click: 1,
        doubleclick: 1,
      },
      mousemove: {
        mousedrag: 1,
        mousemove: 1,
        mouseenter: 1,
        mouseleave: 1,
      },
    }
    return {
      _viewEvents: g,
      _handleMouseEvent(z, G, H) {
        const K = this._itemEvents
        const $ = K.native[z]
        const W = z === 'mousemove'
        const te = this._scope.tool
        const se = this
        function ue(Ge) {
          return K.virtual[Ge] || se.responds(Ge) || te && te.responds(Ge)
        }
        W && n && ue('mousedrag') && (z = 'mousedrag'),
        H || (H = this.getEventPoint(G))
        const Ie = this.getBounds().contains(H)
        const Ee = $ && Ie && se._project.hitTest(H, {
          tolerance: 0,
          fill: !0,
          stroke: !0,
        })
        const de = Ee && Ee.item || null
        let ve = !1
        const Oe = {}
        if (Oe[z.substr(5)] = !0,
        $ && de !== w && (w && R(w, null, 'mouseleave', G, H),
        de && R(de, null, 'mouseenter', G, H),
        w = de),
        T ^ Ie && (R(this, null, Ie ? 'mouseenter' : 'mouseleave', G, H),
        x = Ie ? this : null,
        ve = !0),
        (Ie || Oe.drag) && !H.equals(I) && (D(this, de, W ? z : 'mousemove', G, H, I),
        ve = !0),
        T = Ie,
        Oe.down && Ie || Oe.up && S) {
          if (D(this, de, z, G, H, S),
          Oe.down) {
            if (L = de === A && Date.now() - N < 300,
            m = A = de,
            !v && de) {
              for (var Te = de; Te && !Te.responds('mousedrag');)
                Te = Te._parent
              Te && (E = de)
            }
            S = H
          }
          else {
            Oe.up && (!v && de === m && (N = Date.now(),
            D(this, de, L ? 'doubleclick' : 'click', G, H, S),
            L = !1),
            m = E = null)
          }
          T = !1,
          ve = !0
        }
        I = H,
        ve && te && (_ = te._handleMouseEvent(z, G, H, Oe) || _),
        G.cancelable !== !1 && (_ && !Oe.move || Oe.down && ue('mouseup')) && G.preventDefault()
      },
      _handleKeyEvent(z, G, H, K) {
        const $ = this._scope; const W = $.tool; let te
        function se(ue) {
          ue.responds(z) && (ae = $,
          ue.emit(z, te = te || new tn(z, G, H, K)))
        }
        this.isVisible() && (se(this),
        W && W.responds(z) && se(W))
      },
      _countItemEvent(z, G) {
        const H = this._itemEvents
        const K = H.native
        const $ = H.virtual
        for (const W in V)
          K[W] = (K[W] || 0) + (V[W][z] || 0) * G
        $[z] = ($[z] || 0) + G
      },
      statics: {
        updateFocus: s,
        _resetState() {
          n = i = _ = T = !1,
          e = t = x = S = I = m = w = E = A = N = L = null
        },
      },
    }
  }(),
  )
  var Rt = Ke.extend({
    _class: 'CanvasView',
    initialize(t, n) {
      if (!(n instanceof h.HTMLCanvasElement)) {
        const i = J.read(arguments, 1)
        if (i.isZero())
          throw new Error(`Cannot create CanvasView with the provided argument: ${d.slice(arguments, 1)}`)
        n = Je.getCanvas(i)
      }
      const r = this._context = n.getContext('2d')
      if (r.save(),
      this._pixelRatio = 1,
      !/^off|false$/.test(F.getAttribute(n, 'hidpi'))) {
        const s = h.devicePixelRatio || 1
        const u = Ce.getPrefixed(r, 'backingStorePixelRatio') || 1
        this._pixelRatio = s / u
      }
      Ke.call(this, t, n),
      this._needsUpdate = !0
    },
    remove: function e() {
      return this._context.restore(),
      e.base.call(this)
    },
    _setElementSize: function e(t, n) {
      const i = this._pixelRatio
      if (e.base.call(this, t * i, n * i),
      i !== 1) {
        const r = this._element
        const s = this._context
        if (!F.hasAttribute(r, 'resize')) {
          const u = r.style
          u.width = `${t}px`,
          u.height = `${n}px`
        }
        s.restore(),
        s.save(),
        s.scale(i, i)
      }
    },
    getContext() {
      return this._context
    },
    getPixelSize: function e(t) {
      const n = ae.agent; let i
      if (n && n.firefox) { i = e.base.call(this, t) }
      else {
        const r = this._context
        const s = r.font
        r.font = `${t} serif`,
        i = parseFloat(r.font),
        r.font = s
      }
      return i
    },
    getTextWidth(e, t) {
      const n = this._context
      const i = n.font
      let r = 0
      n.font = e
      for (let s = 0, u = t.length; s < u; s++)
        r = Math.max(r, n.measureText(t[s]).width)
      return n.font = i,
      r
    },
    update() {
      if (!this._needsUpdate)
        return !1
      const e = this._project
      const t = this._context
      const n = this._viewSize
      return t.clearRect(0, 0, n.width + 1, n.height + 1),
      e && e.draw(t, this._matrix, this._pixelRatio),
      this._needsUpdate = !1,
      !0
    },
  })
  var Zt = d.extend({
    _class: 'Event',
    initialize(t) {
      this.event = t,
      this.type = t && t.type
    },
    prevented: !1,
    stopped: !1,
    preventDefault() {
      this.prevented = !0,
      this.event.preventDefault()
    },
    stopPropagation() {
      this.stopped = !0,
      this.event.stopPropagation()
    },
    stop() {
      this.stopPropagation(),
      this.preventDefault()
    },
    getTimeStamp() {
      return this.event.timeStamp
    },
    getModifiers() {
      return cn.modifiers
    },
  })
  var tn = Zt.extend({
    _class: 'KeyEvent',
    initialize(t, n, i, r) {
      this.type = t,
      this.event = n,
      this.key = i,
      this.character = r
    },
    toString() {
      return `{ type: '${this.type}', key: '${this.key}', character: '${this.character}', modifiers: ${this.getModifiers()} }`
    },
  })
  var cn = new function () {
    const e = {
      '	': 'tab',
      ' ': 'space',
      '\b': 'backspace',
      '\x7F': 'delete',
      'Spacebar': 'space',
      'Del': 'delete',
      'Win': 'meta',
      'Esc': 'escape',
    }; const t = {
      tab: '	',
      space: ' ',
      enter: '\r',
    }; const n = {}; const i = {}; let r; let s; const u = new d({
      shift: !1,
      control: !1,
      alt: !1,
      meta: !1,
      capsLock: !1,
      space: !1,
    }).inject({
      option: {
        get() {
          return this.alt
        },
      },
      command: {
        get() {
          const f = ae && ae.agent
          return f && f.mac ? this.meta : this.control
        },
      },
    })
    function o(f) {
      let g = f.key || f.keyIdentifier
      return g = /^U\+/.test(g) ? String.fromCharCode(parseInt(g.substr(2), 16)) : /^Arrow[A-Z]/.test(g) ? g.substr(5) : g === 'Unidentified' || g === a ? String.fromCharCode(f.keyCode) : g,
      e[g] || (g.length > 1 ? d.hyphenate(g) : g.toLowerCase())
    }
    function l(f, g, y, _) {
      const v = f ? 'keydown' : 'keyup'; const b = Ke._focused; let T
      if (n[g] = f,
      f ? i[g] = y : delete i[g],
      g.length > 1 && (T = d.camelize(g)) in u) {
        u[T] = f
        const x = ae && ae.agent
        if (T === 'meta' && x && x.mac) {
          if (f) { r = {} }
          else {
            for (const S in r)
              S in i && l(!1, S, r[S], _)
            r = null
          }
        }
      }
      else { f && r && (r[g] = y) }
      b && b._handleKeyEvent(f ? 'keydown' : 'keyup', _, g, y)
    }
    return tt.add(p, {
      keydown(f) {
        const g = o(f)
        const y = ae && ae.agent
        g.length > 1 || y && y.chrome && (f.altKey || y.mac && f.metaKey || !y.mac && f.ctrlKey) ? l(!0, g, t[g] || (g.length > 1 ? '' : g), f) : s = g
      },
      keypress(f) {
        if (s) {
          let g = o(f)
          const y = f.charCode
          const _ = y >= 32 ? String.fromCharCode(y) : g.length > 1 ? '' : g
          g !== s && (g = _.toLowerCase()),
          l(!0, g, _, f),
          s = null
        }
      },
      keyup(f) {
        const g = o(f)
        g in i && l(!1, g, i[g], f)
      },
    }),
    tt.add(h, {
      blur(f) {
        for (const g in i)
          l(!1, g, i[g], f)
      },
    }),
    {
      modifiers: u,
      isDown(f) {
        return !!n[f]
      },
    }
  }()
  var wn = Zt.extend({
    _class: 'MouseEvent',
    initialize(t, n, i, r, s) {
      this.type = t,
      this.event = n,
      this.point = i,
      this.target = r,
      this.delta = s
    },
    toString() {
      return `{ type: '${this.type}', point: ${this.point}, target: ${this.target}${this.delta ? `, delta: ${this.delta}` : ''}, modifiers: ${this.getModifiers()} }`
    },
  })
  const bn = Zt.extend({
    _class: 'ToolEvent',
    _item: null,
    initialize(t, n, i) {
      this.tool = t,
      this.type = n,
      this.event = i
    },
    _choosePoint(e, t) {
      return e || (t ? t.clone() : null)
    },
    getPoint() {
      return this._choosePoint(this._point, this.tool._point)
    },
    setPoint(e) {
      this._point = e
    },
    getLastPoint() {
      return this._choosePoint(this._lastPoint, this.tool._lastPoint)
    },
    setLastPoint(e) {
      this._lastPoint = e
    },
    getDownPoint() {
      return this._choosePoint(this._downPoint, this.tool._downPoint)
    },
    setDownPoint(e) {
      this._downPoint = e
    },
    getMiddlePoint() {
      return !this._middlePoint && this.tool._lastPoint ? this.tool._point.add(this.tool._lastPoint).divide(2) : this._middlePoint
    },
    setMiddlePoint(e) {
      this._middlePoint = e
    },
    getDelta() {
      return !this._delta && this.tool._lastPoint ? this.tool._point.subtract(this.tool._lastPoint) : this._delta
    },
    setDelta(e) {
      this._delta = e
    },
    getCount() {
      return this.tool[/^mouse(down|up)$/.test(this.type) ? '_downCount' : '_moveCount']
    },
    setCount(e) {
      this.tool[/^mouse(down|up)$/.test(this.type) ? 'downCount' : 'count'] = e
    },
    getItem() {
      if (!this._item) {
        const e = this.tool._scope.project.hitTest(this.getPoint())
        if (e) {
          for (var t = e.item, n = t._parent; /^(Group|CompoundPath)$/.test(n._class);) {
            t = n,
            n = n._parent
          }
          this._item = t
        }
      }
      return this._item
    },
    setItem(e) {
      this._item = e
    },
    toString() {
      return `{ type: ${this.type}, point: ${this.getPoint()}, count: ${this.getCount()}, modifiers: ${this.getModifiers()} }`
    },
  })
  const kn = Z.extend({
    _class: 'Tool',
    _list: 'tools',
    _reference: 'tool',
    _events: ['onMouseDown', 'onMouseUp', 'onMouseDrag', 'onMouseMove', 'onActivate', 'onDeactivate', 'onEditOptions', 'onKeyDown', 'onKeyUp'],
    initialize(t) {
      Z.call(this),
      this._moveCount = -1,
      this._downCount = -1,
      this.set(t)
    },
    getMinDistance() {
      return this._minDistance
    },
    setMinDistance(e) {
      this._minDistance = e,
      e != null && this._maxDistance != null && e > this._maxDistance && (this._maxDistance = e)
    },
    getMaxDistance() {
      return this._maxDistance
    },
    setMaxDistance(e) {
      this._maxDistance = e,
      this._minDistance != null && e != null && e < this._minDistance && (this._minDistance = e)
    },
    getFixedDistance() {
      return this._minDistance == this._maxDistance ? this._minDistance : null
    },
    setFixedDistance(e) {
      this._minDistance = this._maxDistance = e
    },
    _handleMouseEvent(e, t, n, i) {
      ae = this._scope,
      i.drag && !this.responds(e) && (e = 'mousemove')
      const r = i.move || i.drag
      const s = this.responds(e)
      const u = this.minDistance
      const o = this.maxDistance
      let l = !1
      const f = this
      function g(_, v) {
        let b = n
        const T = r ? f._point : f._downPoint || b
        if (r) {
          if (f._moveCount >= 0 && b.equals(T))
            return !1
          if (T && (_ != null || v != null)) {
            const x = b.subtract(T)
            const S = x.getLength()
            if (S < (_ || 0))
              return !1
            v && (b = T.add(x.normalize(Math.min(S, v))))
          }
          f._moveCount++
        }
        return f._point = b,
        f._lastPoint = T || b,
        i.down && (f._moveCount = -1,
        f._downPoint = b,
        f._downCount++),
        !0
      }
      function y() {
        s && (l = f.emit(e, new bn(f, e, t)) || l)
      }
      if (i.down) {
        g(),
        y()
      }
      else if (i.up) {
        g(null, o),
        y()
      }
      else if (s) {
        for (; g(u, o);)
          y()
      }
      return l
    },
  })
  var Sn = d.extend(M, {
    _class: 'Tween',
    statics: {
      easings: new d({
        linear(e) {
          return e
        },
        easeInQuad(e) {
          return e * e
        },
        easeOutQuad(e) {
          return e * (2 - e)
        },
        easeInOutQuad(e) {
          return e < 0.5 ? 2 * e * e : -1 + 2 * (2 - e) * e
        },
        easeInCubic(e) {
          return e * e * e
        },
        easeOutCubic(e) {
          return --e * e * e + 1
        },
        easeInOutCubic(e) {
          return e < 0.5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1
        },
        easeInQuart(e) {
          return e * e * e * e
        },
        easeOutQuart(e) {
          return 1 - --e * e * e * e
        },
        easeInOutQuart(e) {
          return e < 0.5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e
        },
        easeInQuint(e) {
          return e * e * e * e * e
        },
        easeOutQuint(e) {
          return 1 + --e * e * e * e * e
        },
        easeInOutQuint(e) {
          return e < 0.5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e
        },
      }),
    },
    initialize: function e(t, n, i, r, s, u) {
      this.object = t
      const o = typeof s
      const l = o === 'function'
      this.type = l ? o : o === 'string' ? s : 'linear',
      this.easing = l ? s : e.easings[this.type],
      this.duration = r,
      this.running = !1,
      this._then = null,
      this._startTime = null
      const f = n || i
      this._keys = f ? Object.keys(f) : [],
      this._parsedKeys = this._parseKeys(this._keys),
      this._from = f && this._getState(n),
      this._to = f && this._getState(i),
      u !== !1 && this.start()
    },
    then(e) {
      return this._then = e,
      this
    },
    start() {
      return this._startTime = null,
      this.running = !0,
      this
    },
    stop() {
      return this.running = !1,
      this
    },
    update(e) {
      if (this.running) {
        e >= 1 && (e = 1,
        this.running = !1)
        for (var t = this.easing(e), n = this._keys, i = function (g) {
            return typeof g == 'function' ? g(t, e) : g
          }, r = 0, s = n && n.length; r < s; r++) {
          const u = n[r]
          const o = i(this._from[u])
          const l = i(this._to[u])
          const f = o && l && o.__add && l.__add ? l.__subtract(o).__multiply(t).__add(o) : (l - o) * t + o
          this._setProperty(this._parsedKeys[u], f)
        }
        this.responds('update') && this.emit('update', new d({
          progress: e,
          factor: t,
        })),
        !this.running && this._then && this._then(this.object)
      }
      return this
    },
    _events: {
      onUpdate: {},
    },
    _handleFrame(e) {
      const t = this._startTime
      const n = t ? (e - t) / this.duration : 0
      t || (this._startTime = e),
      this.update(n)
    },
    _getState(e) {
      for (var t = this._keys, n = {}, i = 0, r = t.length; i < r; i++) {
        const s = t[i]; const u = this._parsedKeys[s]; const o = this._getProperty(u); var l
        if (e) {
          const f = this._resolveValue(o, e[s])
          this._setProperty(u, f),
          l = this._getProperty(u),
          l = l && l.clone ? l.clone() : l,
          this._setProperty(u, o)
        }
        else { l = o && o.clone ? o.clone() : o }
        n[s] = l
      }
      return n
    },
    _resolveValue(e, t) {
      if (t) {
        if (Array.isArray(t) && t.length === 2) {
          const n = t[0]
          return n && n.match && n.match(/^[+\-\*\/]=/) ? this._calculate(e, n[0], t[1]) : t
        }
        else if (typeof t == 'string') {
          const i = t.match(/^[+\-*/]=(.*)/)
          if (i) {
            const r = JSON.parse(i[1].replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": '))
            return this._calculate(e, t[0], r)
          }
        }
      }
      return t
    },
    _calculate(e, t, n) {
      return ae.PaperScript.calculateBinary(e, t, n)
    },
    _parseKeys(e) {
      for (var t = {}, n = 0, i = e.length; n < i; n++) {
        const r = e[n]
        const s = r.replace(/\.([^.]*)/g, '/$1').replace(/\[['"]?([^'"\]]*)['"]?\]/g, '/$1')
        t[r] = s.split('/')
      }
      return t
    },
    _getProperty(e, t) {
      for (var n = this.object, i = 0, r = e.length - (t || 0); i < r && n; i++)
        n = n[e[i]]
      return n
    },
    _setProperty(e, t) {
      const n = this._getProperty(e, 1)
      n && (n[e[e.length - 1]] = t)
    },
  })
  const Bn = {
    request(e) {
      const t = new c.XMLHttpRequest()
      return t.open((e.method || 'get').toUpperCase(), e.url, d.pick(e.async, !0)),
      e.mimeType && t.overrideMimeType(e.mimeType),
      t.onload = function () {
        const n = t.status
        n === 0 || n === 200 ? e.onLoad && e.onLoad.call(t, t.responseText) : t.onerror()
      }
      ,
      t.onerror = function () {
        const n = t.status
        let i = `Could not load "${e.url}" (Status: ${n})`
        if (e.onError)
          e.onError(i, n)
        else
          throw new Error(i)
      }
      ,
      t.send(null)
    },
  }
  var Je = d.exports.CanvasProvider = {
    canvases: [],
    getCanvas(e, t, n) {
      if (!h)
        return null
      let i; let r = !0
      typeof e == 'object' && (t = e.height,
      e = e.width),
      this.canvases.length
        ? i = this.canvases.pop()
        : (i = p.createElement('canvas'),
          r = !1)
      const s = i.getContext('2d', n || {})
      if (!s)
        throw new Error(`Canvas ${i} is unable to provide a 2D context.`)
      return i.width === e && i.height === t
        ? r && s.clearRect(0, 0, e + 1, t + 1)
        : (i.width = e,
          i.height = t),
      s.save(),
      i
    },
    getContext(e, t, n) {
      const i = this.getCanvas(e, t, n)
      return i ? i.getContext('2d', n || {}) : null
    },
    release(e) {
      const t = e && e.canvas ? e.canvas : e
      t && t.getContext && (t.getContext('2d').restore(),
      this.canvases.push(t))
    },
  }
  var nn = new function () {
    const e = Math.min; const t = Math.max; const n = Math.abs; let i; let r; let s; let u; let o; let l; let f; let g; let y; let _; let v
    function b(E, A, N) {
      return 0.2989 * E + 0.587 * A + 0.114 * N
    }
    function T(E, A, N, D) {
      const R = D - b(E, A, N)
      y = E + R,
      _ = A + R,
      v = N + R
      var D = b(y, _, v)
      const V = e(y, _, v)
      const z = t(y, _, v)
      if (V < 0) {
        const G = D - V
        y = D + (y - D) * D / G,
        _ = D + (_ - D) * D / G,
        v = D + (v - D) * D / G
      }
      if (z > 255) {
        const H = 255 - D
        const K = z - D
        y = D + (y - D) * H / K,
        _ = D + (_ - D) * H / K,
        v = D + (v - D) * H / K
      }
    }
    function x(E, A, N) {
      return t(E, A, N) - e(E, A, N)
    }
    function S(E, A, N, L) {
      const R = [E, A, N]; let D = t(E, A, N); let V = e(E, A, N); let z
      V = V === E ? 0 : V === A ? 1 : 2,
      D = D === E ? 0 : D === A ? 1 : 2,
      z = e(V, D) === 0 ? t(V, D) === 1 ? 2 : 1 : 0,
      R[D] > R[V]
        ? (R[z] = (R[z] - R[V]) * L / (R[D] - R[V]),
          R[D] = L)
        : R[z] = R[D] = 0,
      R[V] = 0,
      y = R[0],
      _ = R[1],
      v = R[2]
    }
    const I = {
      'multiply': function () {
        y = o * i / 255,
        _ = l * r / 255,
        v = f * s / 255
      },
      'screen': function () {
        y = o + i - o * i / 255,
        _ = l + r - l * r / 255,
        v = f + s - f * s / 255
      },
      'overlay': function () {
        y = o < 128 ? 2 * o * i / 255 : 255 - 2 * (255 - o) * (255 - i) / 255,
        _ = l < 128 ? 2 * l * r / 255 : 255 - 2 * (255 - l) * (255 - r) / 255,
        v = f < 128 ? 2 * f * s / 255 : 255 - 2 * (255 - f) * (255 - s) / 255
      },
      'soft-light': function () {
        let E = i * o / 255
        y = E + o * (255 - (255 - o) * (255 - i) / 255 - E) / 255,
        E = r * l / 255,
        _ = E + l * (255 - (255 - l) * (255 - r) / 255 - E) / 255,
        E = s * f / 255,
        v = E + f * (255 - (255 - f) * (255 - s) / 255 - E) / 255
      },
      'hard-light': function () {
        y = i < 128 ? 2 * i * o / 255 : 255 - 2 * (255 - i) * (255 - o) / 255,
        _ = r < 128 ? 2 * r * l / 255 : 255 - 2 * (255 - r) * (255 - l) / 255,
        v = s < 128 ? 2 * s * f / 255 : 255 - 2 * (255 - s) * (255 - f) / 255
      },
      'color-dodge': function () {
        y = o === 0 ? 0 : i === 255 ? 255 : e(255, 255 * o / (255 - i)),
        _ = l === 0 ? 0 : r === 255 ? 255 : e(255, 255 * l / (255 - r)),
        v = f === 0 ? 0 : s === 255 ? 255 : e(255, 255 * f / (255 - s))
      },
      'color-burn': function () {
        y = o === 255 ? 255 : i === 0 ? 0 : t(0, 255 - (255 - o) * 255 / i),
        _ = l === 255 ? 255 : r === 0 ? 0 : t(0, 255 - (255 - l) * 255 / r),
        v = f === 255 ? 255 : s === 0 ? 0 : t(0, 255 - (255 - f) * 255 / s)
      },
      'darken': function () {
        y = o < i ? o : i,
        _ = l < r ? l : r,
        v = f < s ? f : s
      },
      'lighten': function () {
        y = o > i ? o : i,
        _ = l > r ? l : r,
        v = f > s ? f : s
      },
      'difference': function () {
        y = o - i,
        y < 0 && (y = -y),
        _ = l - r,
        _ < 0 && (_ = -_),
        v = f - s,
        v < 0 && (v = -v)
      },
      'exclusion': function () {
        y = o + i * (255 - o - o) / 255,
        _ = l + r * (255 - l - l) / 255,
        v = f + s * (255 - f - f) / 255
      },
      'hue': function () {
        S(i, r, s, x(o, l, f)),
        T(y, _, v, b(o, l, f))
      },
      'saturation': function () {
        S(o, l, f, x(i, r, s)),
        T(y, _, v, b(o, l, f))
      },
      'luminosity': function () {
        T(o, l, f, b(i, r, s))
      },
      'color': function () {
        T(i, r, s, b(o, l, f))
      },
      'add': function () {
        y = e(o + i, 255),
        _ = e(l + r, 255),
        v = e(f + s, 255)
      },
      'subtract': function () {
        y = t(o - i, 0),
        _ = t(l - r, 0),
        v = t(f - s, 0)
      },
      'average': function () {
        y = (o + i) / 2,
        _ = (l + r) / 2,
        v = (f + s) / 2
      },
      'negation': function () {
        y = 255 - n(255 - i - o),
        _ = 255 - n(255 - r - l),
        v = 255 - n(255 - s - f)
      },
    }
    const m = this.nativeModes = d.each(['source-over', 'source-in', 'source-out', 'source-atop', 'destination-over', 'destination-in', 'destination-out', 'destination-atop', 'lighter', 'darker', 'copy', 'xor'], function (E) {
      this[E] = !0
    }, {})
    const w = Je.getContext(1, 1, {
      willReadFrequently: !0,
    })
    w && (d.each(I, (E, A) => {
      const N = A === 'darken'
      let L = !1
      w.save()
      try {
        w.fillStyle = N ? '#300' : '#a00',
        w.fillRect(0, 0, 1, 1),
        w.globalCompositeOperation = A,
        w.globalCompositeOperation === A && (w.fillStyle = N ? '#a00' : '#300',
        w.fillRect(0, 0, 1, 1),
        L = w.getImageData(0, 0, 1, 1).data[0] !== N ? 170 : 51)
      }
      catch {}
      w.restore(),
      m[A] = L
    }),
    Je.release(w)),
    this.process = function (E, A, N, L, R) {
      const D = A.canvas
      const V = E === 'normal'
      if (V || m[E]) {
        N.save(),
        N.setTransform(1, 0, 0, 1, 0, 0),
        N.globalAlpha = L,
        V || (N.globalCompositeOperation = E),
        N.drawImage(D, R.x, R.y),
        N.restore()
      }
      else {
        const z = I[E]
        if (!z)
          return
        for (var G = N.getImageData(R.x, R.y, D.width, D.height), H = G.data, K = A.getImageData(0, 0, D.width, D.height).data, $ = 0, W = H.length; $ < W; $ += 4) {
          i = K[$],
          o = H[$],
          r = K[$ + 1],
          l = H[$ + 1],
          s = K[$ + 2],
          f = H[$ + 2],
          u = K[$ + 3],
          g = H[$ + 3],
          z()
          const te = u * L / 255
          const se = 1 - te
          H[$] = te * y + se * o,
          H[$ + 1] = te * _ + se * l,
          H[$ + 2] = te * v + se * f,
          H[$ + 3] = u * L + se * g
        }
        N.putImageData(G, R.x, R.y)
      }
    }
  }()
  const Qe = new function () {
    const e = 'http://www.w3.org/2000/svg'
    const t = 'http://www.w3.org/2000/xmlns'
    const n = 'http://www.w3.org/1999/xlink'
    const i = {
      'href': n,
      'xlink': t,
      'xmlns': `${t}/`,
      'xmlns:xlink': `${t}/`,
    }
    function r(o, l, f) {
      return u(p.createElementNS(e, o), l, f)
    }
    function s(o, l) {
      const f = i[l]
      const g = f ? o.getAttributeNS(f, l) : o.getAttribute(l)
      return g === 'null' ? null : g
    }
    function u(o, l, f) {
      for (const g in l) {
        let y = l[g]
        const _ = i[g]
        typeof y == 'number' && f && (y = f.number(y)),
        _ ? o.setAttributeNS(_, g, y) : o.setAttribute(g, y)
      }
      return o
    }
    return {
      svg: e,
      xmlns: t,
      xlink: n,
      create: r,
      get: s,
      set: u,
    }
  }()
  const En = d.each({
    fillColor: ['fill', 'color'],
    fillRule: ['fill-rule', 'string'],
    strokeColor: ['stroke', 'color'],
    strokeWidth: ['stroke-width', 'number'],
    strokeCap: ['stroke-linecap', 'string'],
    strokeJoin: ['stroke-linejoin', 'string'],
    strokeScaling: ['vector-effect', 'lookup', {
      true: 'none',
      false: 'non-scaling-stroke',
    }, function (e, t) {
      return !t && (e instanceof Ft || e instanceof je || e instanceof Gt)
    },
    ],
    miterLimit: ['stroke-miterlimit', 'number'],
    dashArray: ['stroke-dasharray', 'array'],
    dashOffset: ['stroke-dashoffset', 'number'],
    fontFamily: ['font-family', 'string'],
    fontWeight: ['font-weight', 'string'],
    fontSize: ['font-size', 'number'],
    justification: ['text-anchor', 'lookup', {
      left: 'start',
      center: 'middle',
      right: 'end',
    }],
    opacity: ['opacity', 'number'],
    blendMode: ['mix-blend-mode', 'style'],
  }, function (e, t) {
    const n = d.capitalize(t)
    const i = e[2]
    this[t] = {
      type: e[1],
      property: t,
      attribute: e[0],
      toSVG: i,
      fromSVG: i && d.each(i, function (r, s) {
        this[r] = s
      }, {}),
      exportFilter: e[3],
      get: `get${n}`,
      set: `set${n}`,
    }
  }, {})
  new function () {
    let e
    function t(I, m, w) {
      const E = new d()
      let A = I.getTranslation()
      if (m) {
        let N
        I.isInvertible()
          ? (I = I._shiftless(),
            N = I._inverseTransform(A),
            A = null)
          : N = new C(),
        E[w ? 'cx' : 'x'] = N.x,
        E[w ? 'cy' : 'y'] = N.y
      }
      if (!I.isIdentity()) {
        const L = I.decompose()
        if (L) {
          const R = []
          const D = L.rotation
          const V = L.scaling
          const z = L.skewing
          A && !A.isZero() && R.push(`translate(${e.point(A)})`),
          D && R.push(`rotate(${e.number(D)})`),
          (!O.isZero(V.x - 1) || !O.isZero(V.y - 1)) && R.push(`scale(${e.point(V)})`),
          z.x && R.push(`skewX(${e.number(z.x)})`),
          z.y && R.push(`skewY(${e.number(z.y)})`),
          E.transform = R.join(' ')
        }
        else { E.transform = `matrix(${I.getValues().join(',')})` }
      }
      return E
    }
    function n(I, m) {
      for (var w = t(I._matrix), E = I._children, A = Qe.create('g', w, e), N = 0, L = E.length; N < L; N++) {
        const R = E[N]
        const D = x(R, m)
        if (D) {
          if (R.isClipMask()) {
            const V = Qe.create('clipPath')
            V.appendChild(D),
            b(R, V, 'clip'),
            Qe.set(A, {
              'clip-path': `url(#${V.id})`,
            })
          }
          else { A.appendChild(D) }
        }
      }
      return A
    }
    function i(I, m) {
      const w = t(I._matrix, !0)
      const E = I.getSize()
      const A = I.getImage()
      return w.x -= E.width / 2,
      w.y -= E.height / 2,
      w.width = E.width,
      w.height = E.height,
      w.href = m.embedImages == !1 && A && A.src || I.toDataURL(),
      Qe.create('image', w, e)
    }
    function r(I, m) {
      const w = m.matchShapes
      if (w) {
        const E = I.toShape(!1)
        if (E)
          return s(E, m)
      }
      const A = I._segments; const N = A.length; let L; const R = t(I._matrix)
      if (w && N >= 2 && !I.hasHandles()) {
        if (N > 2) {
          L = I._closed ? 'polygon' : 'polyline'
          for (var D = [], V = 0; V < N; V++)
            D.push(e.point(A[V]._point))
          R.points = D.join(' ')
        }
        else {
          L = 'line'
          const z = A[0]._point
          const G = A[1]._point
          R.set({
            x1: z.x,
            y1: z.y,
            x2: G.x,
            y2: G.y,
          })
        }
      }
      else {
        L = 'path',
        R.d = I.getPathData(null, m.precision)
      }
      return Qe.create(L, R, e)
    }
    function s(I) {
      let m = I._type
      let w = I._radius
      const E = t(I._matrix, !0, m !== 'rectangle')
      if (m === 'rectangle') {
        m = 'rect'
        const A = I._size
        const N = A.width
        const L = A.height
        E.x -= N / 2,
        E.y -= L / 2,
        E.width = N,
        E.height = L,
        w.isZero() && (w = null)
      }
      return w && (m === 'circle'
        ? E.r = w
        : (E.rx = w.width,
          E.ry = w.height)),
      Qe.create(m, E, e)
    }
    function u(I, m) {
      const w = t(I._matrix)
      const E = I.getPathData(null, m.precision)
      return E && (w.d = E),
      Qe.create('path', w, e)
    }
    function o(I, m) {
      const w = t(I._matrix, !0)
      const E = I._definition
      let A = v(E, 'symbol')
      const N = E._item
      const L = N.getStrokeBounds()
      return A || (A = Qe.create('symbol', {
        viewBox: e.rectangle(L),
      }),
      A.appendChild(x(N, m)),
      b(E, A, 'symbol')),
      w.href = `#${A.id}`,
      w.x += L.x,
      w.y += L.y,
      w.width = L.width,
      w.height = L.height,
      w.overflow = 'visible',
      Qe.create('use', w, e)
    }
    function l(I) {
      let m = v(I, 'color')
      if (!m) {
        const w = I.getGradient(); const E = w._radial; const A = I.getOrigin(); const N = I.getDestination(); let L
        if (E) {
          L = {
            cx: A.x,
            cy: A.y,
            r: A.getDistance(N),
          }
          const R = I.getHighlight()
          R && (L.fx = R.x,
          L.fy = R.y)
        }
        else {
          L = {
            x1: A.x,
            y1: A.y,
            x2: N.x,
            y2: N.y,
          }
        }
        L.gradientUnits = 'userSpaceOnUse',
        m = Qe.create(`${E ? 'radial' : 'linear'}Gradient`, L, e)
        for (let D = w._stops, V = 0, z = D.length; V < z; V++) {
          const G = D[V]
          const H = G._color
          const K = H.getAlpha()
          const $ = G._offset
          L = {
            offset: $ ?? V / (z - 1),
          },
          H && (L['stop-color'] = H.toCSS(!0)),
          K < 1 && (L['stop-opacity'] = K),
          m.appendChild(Qe.create('stop', L, e))
        }
        b(I, m, 'color')
      }
      return `url(#${m.id})`
    }
    function f(I) {
      const m = Qe.create('text', t(I._matrix, !0), e)
      return m.textContent = I._content,
      m
    }
    const g = {
      Group: n,
      Layer: n,
      Raster: i,
      Path: r,
      Shape: s,
      CompoundPath: u,
      SymbolItem: o,
      PointText: f,
    }
    function y(I, m, w) {
      const E = {}
      const A = !w && I.getParent()
      const N = []
      return I._name != null && (E.id = I._name),
      d.each(En, (L) => {
        const R = L.get
        const D = L.type
        const V = I[R]()
        if (L.exportFilter ? L.exportFilter(I, V) : !A || !d.equals(A[R](), V)) {
          if (D === 'color' && V != null) {
            const z = V.getAlpha()
            z < 1 && (E[`${L.attribute}-opacity`] = z)
          }
          D === 'style' ? N.push(`${L.attribute}: ${V}`) : E[L.attribute] = V == null ? 'none' : D === 'color' ? V.gradient ? l(V, I) : V.toCSS(!0) : D === 'array' ? V.join(',') : D === 'lookup' ? L.toSVG[V] : V
        }
      }),
      N.length && (E.style = N.join(';')),
      E.opacity === 1 && delete E.opacity,
      I._visible || (E.visibility = 'hidden'),
      Qe.set(m, E, e)
    }
    let _
    function v(I, m) {
      return _ || (_ = {
        ids: {},
        svgs: {},
      }),
      I && _.svgs[`${m}-${I._id || I.__id || (I.__id = B.get('svg'))}`]
    }
    function b(I, m, w) {
      _ || v()
      const E = _.ids[w] = (_.ids[w] || 0) + 1
      m.id = `${w}-${E}`,
      _.svgs[`${w}-${I._id || I.__id}`] = m
    }
    function T(I, m) {
      let w = I
      let E = null
      if (_) {
        w = I.nodeName.toLowerCase() === 'svg' && I
        for (const A in _.svgs) {
          E || (w || (w = Qe.create('svg'),
          w.appendChild(I)),
          E = w.insertBefore(Qe.create('defs'), w.firstChild)),
          E.appendChild(_.svgs[A])
        }
        _ = null
      }
      return m.asString ? new c.XMLSerializer().serializeToString(w) : w
    }
    function x(I, m, w) {
      const E = g[I._class]
      let A = E && E(I, m)
      if (A) {
        const N = m.onExport
        N && (A = N(I, A, m) || A)
        const L = JSON.stringify(I._data)
        L && L !== '{}' && L !== 'null' && A.setAttribute('data-paper-data', L)
      }
      return A && y(I, A, w)
    }
    function S(I) {
      return I || (I = {}),
      e = new k(I.precision),
      I
    }
    oe.inject({
      exportSVG(I) {
        return I = S(I),
        T(x(this, I, !0), I)
      },
    }),
    ye.inject({
      exportSVG(I) {
        I = S(I)
        const m = this._children
        const w = this.getView()
        const E = d.pick(I.bounds, 'view')
        const A = I.matrix || E === 'view' && w._matrix
        const N = A && le.read([A])
        const L = E === 'view'
          ? new Y([0, 0], w.getViewSize())
          : E === 'content'
            ? oe._getBounds(m, N, {
              stroke: !0,
            }).rect
            : Y.read([E], 0, {
              readNull: !0,
            })
        const R = {
          'version': '1.1',
          'xmlns': Qe.svg,
          'xmlns:xlink': Qe.xlink,
        }
        L && (R.width = L.width,
        R.height = L.height,
        (L.x || L.x === 0 || L.y || L.y === 0) && (R.viewBox = e.rectangle(L)))
        const D = Qe.create('svg', R, e)
        let V = D
        N && !N.isIdentity() && (V = D.appendChild(Qe.create('g', t(N), e)))
        for (let z = 0, G = m.length; z < G; z++)
          V.appendChild(x(m[z], I, !0))
        return T(D, I)
      },
    })
  }()
  ,
  new function () {
    let e = {}; let t
    function n(m, w, E, A, N, L) {
      const R = Qe.get(m, w) || L
      const D = R == null ? A ? null : E ? '' : 0 : E ? R : parseFloat(R)
      return /%\s*$/.test(R) ? D / 100 * (N ? 1 : t[/x|^width/.test(w) ? 'width' : 'height']) : D
    }
    function i(m, w, E, A, N, L, R) {
      return w = n(m, w || 'x', !1, A, N, L),
      E = n(m, E || 'y', !1, A, N, R),
      A && (w == null || E == null) ? null : new C(w, E)
    }
    function r(m, w, E, A, N) {
      return w = n(m, w || 'width', !1, A, N),
      E = n(m, E || 'height', !1, A, N),
      A && (w == null || E == null) ? null : new J(w, E)
    }
    function s(m, w, E) {
      return m === 'none' ? null : w === 'number' ? parseFloat(m) : w === 'array' ? m ? m.split(/[\s,]+/g).map(parseFloat) : [] : w === 'color' ? x(m) || m : w === 'lookup' ? E[m] : m
    }
    function u(m, w, E, A) {
      const N = m.childNodes
      const L = w === 'clippath'
      const R = w === 'defs'
      let D = new We()
      const V = D._project
      const z = V._currentStyle
      const G = []
      if (!L && !R && (D = T(D, m, A),
      V._currentStyle = D._style.clone()),
      A) {
        for (var H = m.querySelectorAll('defs'), K = 0, $ = H.length; K < $; K++)
          S(H[K], E, !1)
      }
      for (var K = 0, $ = N.length; K < $; K++) {
        const W = N[K]; var te
        W.nodeType === 1 && !/^defs$/i.test(W.nodeName) && (te = S(W, E, !1)) && !(te instanceof dt) && G.push(te)
      }
      return D.addChildren(G),
      L && (D = T(D.reduce(), m, A)),
      V._currentStyle = z,
      (L || R) && (D.remove(),
      D = null),
      D
    }
    function o(m, w) {
      for (var E = m.getAttribute('points').match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g), A = [], N = 0, L = E.length; N < L; N += 2)
        A.push(new C(parseFloat(E[N]), parseFloat(E[N + 1])))
      const R = new ke(A)
      return w === 'polygon' && R.closePath(),
      R
    }
    function l(m) {
      return Ft.create(m.getAttribute('d'))
    }
    function f(m, w) {
      const E = (n(m, 'href', !0) || '').substring(1); const A = w === 'radialgradient'; let N
      if (E) {
        N = e[E].getGradient(),
        N._radial ^ A && (N = N.clone(),
        N._radial = A)
      }
      else {
        for (var L = m.childNodes, R = [], D = 0, V = L.length; D < V; D++) {
          const z = L[D]
          z.nodeType === 1 && R.push(T(new en(), z))
        }
        N = new xt(R, A)
      }
      let G; let H; let K; const $ = n(m, 'gradientUnits', !0) !== 'userSpaceOnUse'
      A
        ? (G = i(m, 'cx', 'cy', !1, $, '50%', '50%'),
          H = G.add(n(m, 'r', !1, !1, $, '50%'), 0),
          K = i(m, 'fx', 'fy', !0, $))
        : (G = i(m, 'x1', 'y1', !1, $, '0%', '0%'),
          H = i(m, 'x2', 'y2', !1, $, '100%', '0%'))
      const W = T(new Xe(N, G, H, K), m)
      return W._scaleToBounds = $,
      null
    }
    const g = {
      '#document': function (m, w, E, A) {
        for (let N = m.childNodes, L = 0, R = N.length; L < R; L++) {
          const D = N[L]
          if (D.nodeType === 1)
            return S(D, E, A)
        }
      },
      'g': u,
      'svg': u,
      'clippath': u,
      'polygon': o,
      'polyline': o,
      'path': l,
      'lineargradient': f,
      'radialgradient': f,
      'image': function (m) {
        const w = new Pt(n(m, 'href', !0))
        return w.on('load', function () {
          const E = r(m)
          this.setSize(E)
          const A = i(m).add(E.divide(2))
          this._matrix.append(new le().translate(A))
        }),
        w
      },
      'symbol': function (m, w, E, A) {
        return new dt(u(m, w, E, A), !0)
      },
      'defs': u,
      'use': function (m) {
        const w = (n(m, 'href', !0) || '').substring(1)
        const E = e[w]
        const A = i(m)
        return E ? E instanceof dt ? E.place(A) : E.clone().translate(A) : null
      },
      'circle': function (m) {
        return new je.Circle(i(m, 'cx', 'cy'), n(m, 'r'))
      },
      'ellipse': function (m) {
        return new je.Ellipse({
          center: i(m, 'cx', 'cy'),
          radius: r(m, 'rx', 'ry'),
        })
      },
      'rect': function (m) {
        return new je.Rectangle(new Y(i(m), r(m)), r(m, 'rx', 'ry'))
      },
      'line': function (m) {
        return new ke.Line(i(m, 'x1', 'y1'), i(m, 'x2', 'y2'))
      },
      'text': function (m) {
        const w = new Mt(i(m).add(i(m, 'dx', 'dy')))
        return w.setContent(m.textContent.trim() || ''),
        w
      },
      'switch': u,
    }
    function y(m, w, E, A) {
      if (m.transform) {
        for (var N = (A.getAttribute(E) || '').split(/\)\s*/g), L = new le(), R = 0, D = N.length; R < D; R++) {
          const V = N[R]
          if (!V)
            break
          for (var z = V.split(/\(\s*/), G = z[0], H = z[1].split(/[\s,]+/g), K = 0, $ = H.length; K < $; K++)
            H[K] = parseFloat(H[K])
          switch (G) {
            case 'matrix':
              L.append(new le(H[0], H[1], H[2], H[3], H[4], H[5]))
              break
            case 'rotate':
              L.rotate(H[0], H[1] || 0, H[2] || 0)
              break
            case 'translate':
              L.translate(H[0], H[1] || 0)
              break
            case 'scale':
              L.scale(H)
              break
            case 'skewX':
              L.skew(H[0], 0)
              break
            case 'skewY':
              L.skew(0, H[0])
              break
          }
        }
        m.transform(L)
      }
    }
    function _(m, w, E) {
      const A = E === 'fill-opacity' ? 'getFillColor' : 'getStrokeColor'
      const N = m[A] && m[A]()
      N && N.setAlpha(parseFloat(w))
    }
    const v = d.set(d.each(En, function (m) {
      this[m.attribute] = function (w, E) {
        if (w[m.set] && (w[m.set](s(E, m.type, m.fromSVG)),
        m.type === 'color')) {
          const A = w[m.get]()
          if (A && A._scaleToBounds) {
            const N = w.getBounds()
            A.transform(new le().translate(N.getPoint()).scale(N.getSize()))
          }
        }
      }
    }, {}), {
      'id': function (m, w) {
        e[w] = m,
        m.setName && m.setName(w)
      },
      'clip-path': function (m, w) {
        let E = x(w)
        if (E) {
          if (E = E.clone(),
          E.setClipMask(!0),
          m instanceof We)
            m.insertChild(0, E)
          else
            return new We(E, m)
        }
      },
      'gradientTransform': y,
      'transform': y,
      'fill-opacity': _,
      'stroke-opacity': _,
      'visibility': function (m, w) {
        m.setVisible && m.setVisible(w === 'visible')
      },
      'display': function (m, w) {
        m.setVisible && m.setVisible(w !== null)
      },
      'stop-color': function (m, w) {
        m.setColor && m.setColor(w)
      },
      'stop-opacity': function (m, w) {
        m._color && m._color.setAlpha(parseFloat(w))
      },
      'offset': function (m, w) {
        if (m.setOffset) {
          const E = w.match(/(.*)%$/)
          m.setOffset(E ? E[1] / 100 : parseFloat(w))
        }
      },
      'viewBox': function (m, w, E, A, N) {
        const L = new Y(s(w, 'array')); const R = r(A, null, null, !0); let D; var V
        if (m instanceof We) {
          const z = R ? R.divide(L.getSize()) : 1
          var V = new le().scale(z).translate(L.getPoint().negate())
          D = m
        }
        else {
          m instanceof dt && (R && L.setSize(R),
          D = m._item)
        }
        if (D) {
          if (b(A, 'overflow', N) !== 'visible') {
            const G = new je.Rectangle(L)
            G.setClipMask(!0),
            D.addChild(G)
          }
          V && D.transform(V)
        }
      },
    })
    function b(m, w, E) {
      const A = m.attributes[w]
      let N = A && A.value
      if (!N && m.style) {
        const L = d.camelize(w)
        N = m.style[L],
        !N && E.node[L] !== E.parent[L] && (N = E.node[L])
      }
      return N ? N === 'none' ? null : N : a
    }
    function T(m, w, E) {
      const A = w.parentNode
      const N = {
        node: Ce.getStyles(w) || {},
        parent: !E && !/^defs$/i.test(A.tagName) && Ce.getStyles(A) || {},
      }
      return d.each(v, (L, R) => {
        const D = b(w, R, N)
        m = D !== a && L(m, D, R, w, N) || m
      }),
      m
    }
    function x(m) {
      const w = m && m.match(/\((?:["'#]*)([^"')]+)/)
      const E = w && w[1]
      let A = E && e[h ? E.replace(`${h.location.href.split('#')[0]}#`, '') : E]
      return A && A._scaleToBounds && (A = A.clone(),
      A._scaleToBounds = !0),
      A
    }
    function S(m, w, E) {
      const A = m.nodeName.toLowerCase(); const N = A !== '#document'; const L = p.body; let R; let D; let V
      E && N && (t = ae.getView().getSize(),
      t = r(m, null, null, !0) || t,
      R = Qe.create('svg', {
        style: 'stroke-width: 1px; stroke-miterlimit: 10',
      }),
      D = m.parentNode,
      V = m.nextSibling,
      R.appendChild(m),
      L.appendChild(R))
      const z = ae.settings
      const G = z.applyMatrix
      const H = z.insertItems
      z.applyMatrix = !1,
      z.insertItems = !1
      const K = g[A]
      let $ = K && K(m, A, w, E) || null
      if (z.insertItems = H,
      z.applyMatrix = G,
      $) {
        N && !($ instanceof We) && ($ = T($, m, E))
        const W = w.onImport
        const te = N && m.getAttribute('data-paper-data')
        W && ($ = W(m, $, w) || $),
        w.expandShapes && $ instanceof je && ($.remove(),
        $ = $.toPath()),
        te && ($._data = JSON.parse(te))
      }
      return R && (L.removeChild(R),
      D && (V ? D.insertBefore(m, V) : D.appendChild(m))),
      E && (e = {},
      $ && d.pick(w.applyMatrix, G) && $.matrix.apply(!0, !0)),
      $
    }
    function I(m, w, E) {
      if (!m)
        return null
      w = typeof w == 'function'
        ? {
            onLoad: w,
          }
        : w || {}
      const A = ae
      let N = null
      function L(z) {
        try {
          let G = typeof z == 'object' ? z : new c.DOMParser().parseFromString(z.trim(), 'image/svg+xml')
          if (!G.nodeName) {
            throw G = null,
            new Error(`Unsupported SVG source: ${m}`)
          }
          ae = A,
          N = S(G, w, !0),
          (!w || w.insert !== !1) && E._insertItem(a, N)
          const H = w.onLoad
          H && H(N, z)
        }
        catch (K) {
          R(K)
        }
      }
      function R(z, G) {
        const H = w.onError
        if (H)
          H(z, G)
        else
          throw new Error(z)
      }
      if (typeof m == 'string' && !/^[\s\S]*</.test(m)) {
        const D = p.getElementById(m)
        D
          ? L(D)
          : Bn.request({
            url: m,
            async: !0,
            onLoad: L,
            onError: R,
          })
      }
      else if (typeof File < 'u' && m instanceof File) {
        const V = new FileReader()
        return V.onload = function () {
          L(V.result)
        }
        ,
        V.onerror = function () {
          R(V.error)
        }
        ,
        V.readAsText(m)
      }
      else { L(m) }
      return N
    }
    oe.inject({
      importSVG(m, w) {
        return I(m, w, this)
      },
    }),
    ye.inject({
      importSVG(m, w) {
        return this.activate(),
        I(m, w, this)
      },
    })
  }()

  var ae = new (F.inject(d.exports, {
    Base: d,
    Numerical: O,
    Key: cn,
    DomEvent: tt,
    DomElement: Ce,
    document: p,
    window: h,
    Symbol: dt,
    PlacedSymbol: ft,
  }))()
  return ae
}
  .call(void 0, typeof self == 'object' ? self : null))
const ce = Sa
function _n(c, a, h, p) {
  function d(M) {
    return M instanceof h
      ? M
      : new h((F) => {
        F(M)
      },
      )
  }
  return new (h || (h = Promise))((M, F) => {
    function Z(O) {
      try {
        k(p.next(O))
      }
      catch (B) {
        F(B)
      }
    }
    function q(O) {
      try {
        k(p.throw(O))
      }
      catch (B) {
        F(B)
      }
    }
    function k(O) {
      O.done ? M(O.value) : d(O.value).then(Z, q)
    }
    k((p = p.apply(c, a || [])).next())
  },
  )
}
const ri = typeof globalThis < 'u' ? globalThis : typeof window < 'u' ? window : typeof global < 'u' ? global : typeof self < 'u' ? self : {}
const Ir = {
  exports: {},
};
(function (c) {
  const a = Object.prototype.hasOwnProperty
  let h = '~'
  function p() {}
  Object.create && (p.prototype = Object.create(null),
  new p().__proto__ || (h = !1))
  function d(q, k, O) {
    this.fn = q,
    this.context = k,
    this.once = O || !1
  }
  function M(q, k, O, B, C) {
    if (typeof O != 'function')
      throw new TypeError('The listener must be a function')
    const Q = new d(O, B || q, C)
    const J = h ? h + k : k
    return q._events[J]
      ? q._events[J].fn ? q._events[J] = [q._events[J], Q] : q._events[J].push(Q)
      : (q._events[J] = Q,
        q._eventsCount++),
    q
  }
  function F(q, k) {
    --q._eventsCount === 0 ? q._events = new p() : delete q._events[k]
  }
  function Z() {
    this._events = new p(),
    this._eventsCount = 0
  }
  Z.prototype.eventNames = function () {
    const k = []; let O; let B
    if (this._eventsCount === 0)
      return k
    for (B in O = this._events)
      a.call(O, B) && k.push(h ? B.slice(1) : B)
    return Object.getOwnPropertySymbols ? k.concat(Object.getOwnPropertySymbols(O)) : k
  }
  ,
  Z.prototype.listeners = function (k) {
    const O = h ? h + k : k
    const B = this._events[O]
    if (!B)
      return []
    if (B.fn)
      return [B.fn]
    for (var C = 0, Q = B.length, J = new Array(Q); C < Q; C++)
      J[C] = B[C].fn
    return J
  }
  ,
  Z.prototype.listenerCount = function (k) {
    const O = h ? h + k : k
    const B = this._events[O]
    return B ? B.fn ? 1 : B.length : 0
  }
  ,
  Z.prototype.emit = function (k, O, B, C, Q, J) {
    const ne = h ? h + k : k
    if (!this._events[ne])
      return !1
    const Y = this._events[ne]; const Me = arguments.length; let le; let Se
    if (Y.fn) {
      switch (Y.once && this.removeListener(k, Y.fn, void 0, !0),
      Me) {
        case 1:
          return Y.fn.call(Y.context),
          !0
        case 2:
          return Y.fn.call(Y.context, O),
          !0
        case 3:
          return Y.fn.call(Y.context, O, B),
          !0
        case 4:
          return Y.fn.call(Y.context, O, B, C),
          !0
        case 5:
          return Y.fn.call(Y.context, O, B, C, Q),
          !0
        case 6:
          return Y.fn.call(Y.context, O, B, C, Q, J),
          !0
      }
      for (Se = 1,
      le = new Array(Me - 1); Se < Me; Se++)
        le[Se - 1] = arguments[Se]
      Y.fn.apply(Y.context, le)
    }
    else {
      const ye = Y.length; let oe
      for (Se = 0; Se < ye; Se++) {
        switch (Y[Se].once && this.removeListener(k, Y[Se].fn, void 0, !0),
        Me) {
          case 1:
            Y[Se].fn.call(Y[Se].context)
            break
          case 2:
            Y[Se].fn.call(Y[Se].context, O)
            break
          case 3:
            Y[Se].fn.call(Y[Se].context, O, B)
            break
          case 4:
            Y[Se].fn.call(Y[Se].context, O, B, C)
            break
          default:
            if (!le) {
              for (oe = 1,
              le = new Array(Me - 1); oe < Me; oe++)
                le[oe - 1] = arguments[oe]
            }
            Y[Se].fn.apply(Y[Se].context, le)
        }
      }
    }
    return !0
  }
  ,
  Z.prototype.on = function (k, O, B) {
    return M(this, k, O, B, !1)
  }
  ,
  Z.prototype.once = function (k, O, B) {
    return M(this, k, O, B, !0)
  }
  ,
  Z.prototype.removeListener = function (k, O, B, C) {
    const Q = h ? h + k : k
    if (!this._events[Q])
      return this
    if (!O) {
      return F(this, Q),
      this
    }
    const J = this._events[Q]
    if (J.fn) { J.fn === O && (!C || J.once) && (!B || J.context === B) && F(this, Q) }
    else {
      for (var ne = 0, Y = [], Me = J.length; ne < Me; ne++)
        (J[ne].fn !== O || C && !J[ne].once || B && J[ne].context !== B) && Y.push(J[ne])
      Y.length ? this._events[Q] = Y.length === 1 ? Y[0] : Y : F(this, Q)
    }
    return this
  }
  ,
  Z.prototype.removeAllListeners = function (k) {
    let O
    return k
      ? (O = h ? h + k : k,
        this._events[O] && F(this, O))
      : (this._events = new p(),
        this._eventsCount = 0),
    this
  }
  ,
  Z.prototype.off = Z.prototype.removeListener,
  Z.prototype.addListener = Z.prototype.on,
  Z.prefixed = h,
  Z.EventEmitter = Z,
  c.exports = Z
}
)(Ir)
const Ea = Ir.exports
let Cr = function (c, a) {
  return (Cr = Object.setPrototypeOf || Array.isArray({
    __proto__: [],
  }) && function (h, p) {
    h.__proto__ = p
  }
      || function (h, p) {
        for (const d in p)
          Object.prototype.hasOwnProperty.call(p, d) && (h[d] = p[d])
      }
  )(c, a)
}
function He(c, a) {
  if (typeof a != 'function' && a !== null)
    throw new TypeError(`Class extends value ${String(a)} is not a constructor or null`)
  function h() {
    this.constructor = c
  }
  Cr(c, a),
  c.prototype = a === null
    ? Object.create(a)
    : (h.prototype = a.prototype,
      new h())
}
let rt; let ee = function () {
  return (ee = Object.assign || function (c) {
    for (var a, h = 1, p = arguments.length; h < p; h++) {
      for (const d in a = arguments[h])
        Object.prototype.hasOwnProperty.call(a, d) && (c[d] = a[d])
    }
    return c
  }
  ).apply(this, arguments)
}
function Bi(c, a, h, p) {
  return new (h = h || Promise)((d, M) => {
    function F(k) {
      try {
        q(p.next(k))
      }
      catch (O) {
        M(O)
      }
    }
    function Z(k) {
      try {
        q(p.throw(k))
      }
      catch (O) {
        M(O)
      }
    }
    function q(k) {
      let O
      k.done
        ? d(k.value)
        : ((O = k.value) instanceof h
            ? O
            : new h((B) => {
              B(O)
            },
            )).then(F, Z)
    }
    q((p = p.apply(c, a || [])).next())
  },
  )
}
function Ui(c, a) {
  let h; let p; let d; let M = {
    label: 0,
    sent() {
      if (1 & d[0])
        throw d[1]
      return d[1]
    },
    trys: [],
    ops: [],
  }; const F = {
    next: Z(0),
    throw: Z(1),
    return: Z(2),
  }
  return typeof Symbol == 'function' && (F[Symbol.iterator] = function () {
    return this
  }
  ),
  F
  function Z(q) {
    return function (k) {
      return (function (O) {
        if (h)
          throw new TypeError('Generator is already executing.')
        for (; M;) {
          try {
            if (h = 1,
            p && (d = 2 & O[0]
              ? p.return
              : O[0]
                ? p.throw || ((d = p.return) && d.call(p),
                0)
                : p.next) && !(d = d.call(p, O[1])).done)
              return d
            switch (p = 0,
            (O = d ? [2 & O[0], d.value] : O)[0]) {
              case 0:
              case 1:
                d = O
                break
              case 4:
                return M.label++,
                {
                  value: O[1],
                  done: !1,
                }
              case 5:
                M.label++,
                p = O[1],
                O = [0]
                continue
              case 7:
                O = M.ops.pop(),
                M.trys.pop()
                continue
              default:
                if (!(d = (d = M.trys).length > 0 && d[d.length - 1]) && (O[0] === 6 || O[0] === 2)) {
                  M = 0
                  continue
                }
                if (O[0] === 3 && (!d || O[1] > d[0] && O[1] < d[3])) {
                  M.label = O[1]
                  break
                }
                if (O[0] === 6 && M.label < d[1]) {
                  M.label = d[1],
                  d = O
                  break
                }
                if (d && M.label < d[2]) {
                  M.label = d[2],
                  M.ops.push(O)
                  break
                }
                d[2] && M.ops.pop(),
                M.trys.pop()
                continue
            }
            O = a.call(c, M)
          }
          catch (B) {
            O = [6, B],
            p = 0
          }
          finally {
            h = d = 0
          }
        }
        if (5 & O[0])
          throw O[1]
        return {
          value: O[0] ? O[1] : void 0,
          done: !0,
        }
      }([q, k]))
    }
  }
}
function lt(c) {
  const a = typeof Symbol == 'function' && Symbol.iterator
  const h = a && c[a]
  let p = 0
  if (h)
    return h.call(c)
  if (c && typeof c.length == 'number') {
    return {
      next() {
        return {
          value: (c = c && p >= c.length ? void 0 : c) && c[p++],
          done: !c,
        }
      },
    }
  }
  throw new TypeError(a ? 'Object is not iterable.' : 'Symbol.iterator is not defined.')
}
function It(c, a) {
  let h = typeof Symbol == 'function' && c[Symbol.iterator]
  if (!h)
    return c
  let p; let d; const M = h.call(c); const F = []
  try {
    for (; (a === void 0 || a-- > 0) && !(p = M.next()).done;)
      F.push(p.value)
  }
  catch (Z) {
    d = {
      error: Z,
    }
  }
  finally {
    try {
      p && !p.done && (h = M.return) && h.call(M)
    }
    finally {
      if (d)
        throw d.error
    }
  }
  return F
}
function Tt(c, a) {
  for (let h = 0, p = a.length, d = c.length; h < p; h++,
  d++)
    c[d] = a[h]
  return c
}
(function (c) {
  c.assertNever = function (a) {
    throw new Error()
  }
  ,
  c.arrayToEnum = function (a) {
    let h; let p; const d = {}
    try {
      for (var M = lt(a), F = M.next(); !F.done; F = M.next()) {
        const Z = F.value
        d[Z] = Z
      }
    }
    catch (q) {
      h = {
        error: q,
      }
    }
    finally {
      try {
        F && !F.done && (p = M.return) && p.call(M)
      }
      finally {
        if (h)
          throw h.error
      }
    }
    return d
  }
  ,
  c.getValidEnumValues = function (a) {
    let h; let p; const d = c.objectKeys(a).filter((k) => {
      return typeof a[a[k]] != 'number'
    }); const M = {}
    try {
      for (var F = lt(d), Z = F.next(); !Z.done; Z = F.next()) {
        const q = Z.value
        M[q] = a[q]
      }
    }
    catch (k) {
      h = {
        error: k,
      }
    }
    finally {
      try {
        Z && !Z.done && (p = F.return) && p.call(F)
      }
      finally {
        if (h)
          throw h.error
      }
    }
    return c.objectValues(M)
  }
  ,
  c.objectValues = function (a) {
    return c.objectKeys(a).map((h) => {
      return a[h]
    })
  }
  ,
  c.objectKeys = typeof Object.keys == 'function'
    ? function (a) {
      return Object.keys(a)
    }
    : function (a) {
      let h; const p = []
      for (h in a)
        Object.prototype.hasOwnProperty.call(a, h) && p.push(h)
      return p
    }
  ,
  c.find = function (a, h) {
    let p, d
    try {
      for (var M = lt(a), F = M.next(); !F.done; F = M.next()) {
        const Z = F.value
        if (h(Z))
          return Z
      }
    }
    catch (q) {
      p = {
        error: q,
      }
    }
    finally {
      try {
        F && !F.done && (d = M.return) && d.call(M)
      }
      finally {
        if (p)
          throw p.error
      }
    }
  }
  ,
  c.isInteger = typeof Number.isInteger == 'function'
    ? function (a) {
      return Number.isInteger(a)
    }
    : function (a) {
      return typeof a == 'number' && isFinite(a) && Math.floor(a) === a
    }
}
)(rt = rt || {})
let et; const be = rt.arrayToEnum(['invalid_type', 'custom', 'invalid_union', 'invalid_enum_value', 'unrecognized_keys', 'invalid_arguments', 'invalid_return_type', 'invalid_date', 'invalid_string', 'too_small', 'too_big', 'invalid_intersection_types', 'not_multiple_of']); const Ta = function (c) {
  return JSON.stringify(c, null, 2).replace(/"([^"]+)":/g, '$1:')
}; const On = (function (c) {
  function a(h) {
    let p = this.constructor
    const d = c.call(this) || this
    return d.issues = [],
    d.format = function () {
      const M = {
        _errors: [],
      }
      const F = function (Z) {
        let q, k
        try {
          for (var O = lt(Z.issues), B = O.next(); !B.done; B = O.next()) {
            const C = B.value
            if (C.code === 'invalid_union') { C.unionErrors.map(F) }
            else if (C.code === 'invalid_return_type') { F(C.returnTypeError) }
            else if (C.code === 'invalid_arguments') { F(C.argumentsError) }
            else if (C.path.length === 0) { M._errors.push(C.message) }
            else {
              for (let Q = M, J = 0; J < C.path.length;) {
                var ne; const Y = C.path[J]
                J === C.path.length - 1
                  ? (Q[Y] = Q[Y] || {
                      _errors: [],
                    },
                    Q[Y]._errors.push(C.message))
                  : typeof Y == 'string'
                    ? Q[Y] = Q[Y] || {
                      _errors: [],
                    }
                    : typeof Y == 'number' && ((ne = [])._errors = [],
                    Q[Y] = Q[Y] || ne),
                Q = Q[Y],
                J++
              }
            }
          }
        }
        catch (Me) {
          q = {
            error: Me,
          }
        }
        finally {
          try {
            B && !B.done && (k = O.return) && k.call(O)
          }
          finally {
            if (q)
              throw q.error
          }
        }
      }
      return F(d),
      M
    }
    ,
    d.addIssue = function (M) {
      d.issues = Tt(Tt([], It(d.issues), !1), [M])
    }
    ,
    d.addIssues = function (M) {
      M === void 0 && (M = []),
      d.issues = Tt(Tt([], It(d.issues), !1), It(M))
    }
    ,
    d.flatten = function (M) {
      let F, Z
      M === void 0 && (M = function (Q) {
        return Q.message
      }
      )
      const q = {}
      const k = []
      try {
        for (var O = lt(d.issues), B = O.next(); !B.done; B = O.next()) {
          const C = B.value
          C.path.length > 0
            ? (q[C.path[0]] = q[C.path[0]] || [],
              q[C.path[0]].push(M(C)))
            : k.push(M(C))
        }
      }
      catch (Q) {
        F = {
          error: Q,
        }
      }
      finally {
        try {
          B && !B.done && (Z = O.return) && Z.call(O)
        }
        finally {
          if (F)
            throw F.error
        }
      }
      return {
        formErrors: k,
        fieldErrors: q,
      }
    }
    ,
    p = p.prototype,
    Object.setPrototypeOf ? Object.setPrototypeOf(d, p) : d.__proto__ = p,
    d.name = 'ZodError',
    d.issues = h,
    d
  }
  return He(a, c),
  Object.defineProperty(a.prototype, 'errors', {
    get() {
      return this.issues
    },
    enumerable: !1,
    configurable: !0,
  }),
  a.prototype.toString = function () {
    return this.message
  }
  ,
  Object.defineProperty(a.prototype, 'message', {
    get() {
      return JSON.stringify(this.issues, null, 2)
    },
    enumerable: !1,
    configurable: !0,
  }),
  Object.defineProperty(a.prototype, 'isEmpty', {
    get() {
      return this.issues.length === 0
    },
    enumerable: !1,
    configurable: !0,
  }),
  Object.defineProperty(a.prototype, 'formErrors', {
    get() {
      return this.flatten()
    },
    enumerable: !1,
    configurable: !0,
  }),
  a.create = function (h) {
    return new a(h)
  }
  ,
  a
}(Error)); const ji = function (c, a) {
  let h
  switch (c.code) {
    case be.invalid_type:
      h = c.received === 'undefined' ? 'Required' : `Expected ${c.expected}, received ${c.received}`
      break
    case be.unrecognized_keys:
      h = `Unrecognized key(s) in object: ${c.keys.map((p) => {
        return `'${p}'`
      }).join(', ')}`
      break
    case be.invalid_union:
      h = 'Invalid input'
      break
    case be.invalid_enum_value:
      h = `Invalid enum value. Expected ${c.options.map((p) => {
        return typeof p == 'string' ? `'${p}'` : p
      }).join(' | ')}, received ${typeof a.data == 'string' ? `'${a.data}'` : a.data}`
      break
    case be.invalid_arguments:
      h = 'Invalid function arguments'
      break
    case be.invalid_return_type:
      h = 'Invalid function return type'
      break
    case be.invalid_date:
      h = 'Invalid date'
      break
    case be.invalid_string:
      h = c.validation !== 'regex' ? `Invalid ${c.validation}` : 'Invalid'
      break
    case be.too_small:
      h = c.type === 'array' ? `Should have ${c.inclusive ? 'at least' : 'more than'} ${c.minimum} items` : c.type === 'string' ? `Should be ${c.inclusive ? 'at least' : 'over'} ${c.minimum} characters` : c.type === 'number' ? `Value should be greater than ${c.inclusive ? 'or equal to ' : ''}${c.minimum}` : 'Invalid input'
      break
    case be.too_big:
      h = c.type === 'array' ? `Should have ${c.inclusive ? 'at most' : 'less than'} ${c.maximum} items` : c.type === 'string' ? `Should be ${c.inclusive ? 'at most' : 'under'} ${c.maximum} characters long` : c.type === 'number' ? `Value should be less than ${c.inclusive ? 'or equal to ' : ''}${c.maximum}` : 'Invalid input'
      break
    case be.custom:
      h = 'Invalid input'
      break
    case be.invalid_intersection_types:
      h = 'Intersection results could not be merged'
      break
    case be.not_multiple_of:
      h = `Should be multiple of ${c.multipleOf}`
      break
    default:
      h = a.defaultError,
      rt.assertNever(c)
  }
  return {
    message: h,
  }
}; let qi = ji; const Ia = function (c) {
  qi = c
}; const we = rt.arrayToEnum(['string', 'nan', 'number', 'integer', 'float', 'boolean', 'date', 'bigint', 'symbol', 'function', 'undefined', 'null', 'array', 'object', 'unknown', 'promise', 'void', 'never', 'map', 'set']); const wt = function (c) {
  switch (typeof c) {
    case 'undefined':
      return we.undefined
    case 'string':
      return we.string
    case 'number':
      return isNaN(c) ? we.nan : we.number
    case 'boolean':
      return we.boolean
    case 'function':
      return we.function
    case 'bigint':
      return we.bigint
    case 'object':
      return Array.isArray(c) ? we.array : c === null ? we.null : c.then && typeof c.then == 'function' && c.catch && typeof c.catch == 'function' ? we.promise : c instanceof Map ? we.map : c instanceof Set ? we.set : c instanceof Date ? we.date : we.object
    default:
      return we.unknown
  }
}; const ui = function (d) {
  let a; let h; const p = d.data; var M = d.path; var q = d.errorMaps; var d = d.issueData; var M = Tt(Tt([], It(M), !1), It(d.path || [])); const F = ee(ee({}, d), {
    path: M,
  }); let Z = ''; var q = q.filter((B) => {
    return !!B
  }).slice().reverse()
  try {
    for (var k = lt(q), O = k.next(); !O.done; O = k.next()) {
      Z = (0,
      O.value)(F, {
        data: p,
        defaultError: Z,
      }).message
    }
  }
  catch (B) {
    a = {
      error: B,
    }
  }
  finally {
    try {
      O && !O.done && (h = k.return) && h.call(k)
    }
    finally {
      if (a)
        throw a.error
    }
  }
  return ee(ee({}, d), {
    path: M,
    message: d.message || Z,
  })
}; const Ca = null; const Nn = function (c) {
  if (c === null)
    return []
  for (var a = new Array(c.count); c !== null;) {
    a[c.count - 1] = c.component,
    c = c.parent
  }
  return a
}; const Ar = function (c) {
  for (var a = null, h = 0; h < c.length; h++) {
    a = {
      parent: a,
      component: c[h],
      count: h + 1,
    }
  }
  return a
}; const li = (function () {
  function c(a) {
    this.def = a
  }
  return Object.defineProperty(c.prototype, 'path', {
    get() {
      return this.def.path
    },
    enumerable: !1,
    configurable: !0,
  }),
  Object.defineProperty(c.prototype, 'issues', {
    get() {
      return this.def.issues
    },
    enumerable: !1,
    configurable: !0,
  }),
  Object.defineProperty(c.prototype, 'errorMap', {
    get() {
      return this.def.errorMap
    },
    enumerable: !1,
    configurable: !0,
  }),
  Object.defineProperty(c.prototype, 'async', {
    get() {
      return this.def.async
    },
    enumerable: !1,
    configurable: !0,
  }),
  c.prototype.stepInto = function (a) {
    return new c(ee(ee({}, this.def), {
      path: this.path === null
        ? {
            parent: null,
            count: 1,
            component: a,
          }
        : {
            parent: this.path,
            count: this.path.count + 1,
            component: a,
          },
    }))
  }
  ,
  c.prototype._addIssue = function (a, h, p) {
    p === void 0 && (p = {}),
    p = ui({
      data: a,
      issueData: h,
      path: Nn(this.path),
      errorMaps: [this.def.errorMap, p.schemaErrorMap, qi, ji],
    }),
    this.issues.push(p)
  }
  ,
  c
}()); const Pe = Object.freeze({
  valid: !1,
}); const Ue = function (c) {
  return {
    valid: !0,
    value: c,
  }
}; const Lt = function (c) {
  return c.valid === !1
}; const Qt = function (c) {
  return c.valid === !0
}; const vn = function (c) {
  return c instanceof Promise
};
(function (c) {
  c.errToObj = function (a) {
    return typeof a == 'string'
      ? {
          message: a,
        }
      : a || {}
  }
  ,
  c.toString = function (a) {
    return typeof a == 'string' ? a : a?.message
  }
}
)(et = et || {})
const wr = function (c) {
  return new li({
    path: Ar(c.path || []),
    issues: [],
    errorMap: c.errorMap,
    async: (c = c.async) !== null && c !== void 0 && c,
  })
}
const br = function (c, a) {
  return Qt(a) && !c.issues.length
    ? {
        success: !0,
        data: a.value,
      }
    : {
        success: !1,
        error: new On(c.issues),
      }
}
function Ve(c) {
  if (!c)
    return {}
  if (c.errorMap && (c.invalid_type_error || c.required_error))
    throw new Error('Can\'t use "invalid" or "required" in conjunction with custom error map.')
  return c.errorMap
    ? {
        errorMap: c.errorMap,
      }
    : {
        errorMap(a, h) {
          return a.code !== 'invalid_type'
            ? {
                message: h.defaultError,
              }
            : h.data === void 0 && c.required_error
              ? {
                  message: c.required_error,
                }
              : c.invalid_type_error
                ? {
                    message: c.invalid_type_error,
                  }
                : {
                    message: h.defaultError,
                  }
        },
      }
}
let Vn; const Fe = (function () {
  function c(a) {
    this.spa = this.safeParseAsync,
    this.superRefine = this._refinement,
    this._def = a,
    this.transform = this.transform.bind(this),
    this.default = this.default.bind(this)
  }
  return c.prototype.addIssue = function (a, h, p) {
    a._addIssue(p.data, h, {
      schemaErrorMap: this._def.errorMap,
    })
  }
  ,
  c.prototype._parseSync = function (a, h, p) {
    if (p = this._parse(a, h, p),
    vn(p))
      throw new Error('Synchronous parse encountered promise.')
    return p
  }
  ,
  c.prototype._parseAsync = function (a, h, p) {
    return p = this._parse(a, h, p),
    Promise.resolve(p)
  }
  ,
  c.prototype.parse = function (a, h) {
    if (h = this.safeParse(a, h),
    h.success)
      return h.data
    throw h.error
  }
  ,
  c.prototype.safeParse = function (a, h) {
    return h = wr(ee(ee({}, h), {
      async: !1,
    })),
    a = this._parseSync(h, a, wt(a)),
    br(h, a)
  }
  ,
  c.prototype.parseAsync = function (a, h) {
    return Bi(this, void 0, void 0, function () {
      let p
      return Ui(this, function (d) {
        switch (d.label) {
          case 0:
            return [4, this.safeParseAsync(a, h)]
          case 1:
            if ((p = d.sent()).success)
              return [2, p.data]
            throw p.error
        }
      })
    })
  }
  ,
  c.prototype.safeParseAsync = function (a, h) {
    return Bi(this, void 0, void 0, function () {
      let p, d
      return Ui(this, function (M) {
        switch (M.label) {
          case 0:
            return p = wr(ee(ee({}, h), {
              async: !0,
            })),
            d = this._parse(p, a, wt(a)),
            [4, vn(d) ? d : Promise.resolve(d)]
          case 1:
            return d = M.sent(),
            [2, br(p, d)]
        }
      })
    })
  }
  ,
  c.prototype.refine = function (a, h) {
    return this._refinement((p, d) => {
      function M() {
        return d.addIssue(ee({
          code: be.custom,
        }, (Z = p,
        typeof h == 'string' || h === void 0
          ? {
              message: h,
            }
          : typeof h == 'function' ? h(Z) : h)))
        let Z
      }
      const F = a(p)
      return F instanceof Promise
        ? F.then((Z) => {
          return !!Z || (M(),
          !1)
        })
        : !!F || (M(),
          !1)
    })
  }
  ,
  c.prototype.refinement = function (a, h) {
    return this._refinement((p, d) => {
      return !!a(p) || (d.addIssue(typeof h == 'function' ? h(p, d) : h),
      !1)
    })
  }
  ,
  c.prototype._refinement = function (a) {
    return new Mn({
      schema: this,
      typeName: Le.ZodEffects,
      effect: {
        type: 'refinement',
        refinement: a,
      },
    })
  }
  ,
  c.prototype.optional = function () {
    return on.create(this)
  }
  ,
  c.prototype.nullable = function () {
    return Gn.create(this)
  }
  ,
  c.prototype.nullish = function () {
    return this.optional().nullable()
  }
  ,
  c.prototype.array = function () {
    return Fn.create(this)
  }
  ,
  c.prototype.promise = function () {
    return _i.create(this)
  }
  ,
  c.prototype.or = function (a) {
    return Yi.create([this, a])
  }
  ,
  c.prototype.and = function (a) {
    return pi.create(this, a)
  }
  ,
  c.prototype.transform = function (a) {
    return new Mn({
      schema: this,
      typeName: Le.ZodEffects,
      effect: {
        type: 'transform',
        transform: a,
      },
    })
  }
  ,
  c.prototype.default = function (a) {
    return new Gr({
      innerType: this,
      defaultValue: typeof a == 'function'
        ? a
        : function () {
          return a
        },
      typeName: Le.ZodDefault,
    })
  }
  ,
  c.prototype.isOptional = function () {
    return this.safeParse(void 0).success
  }
  ,
  c.prototype.isNullable = function () {
    return this.safeParse(null).success
  }
  ,
  c
}()); const Aa = /^c[^\s-]{8,}$/i; const Pa = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i; const Oa = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; const Ki = (function (c) {
  function a() {
    const h = c !== null && c.apply(this, arguments) || this
    return h._regex = function (p, d, M) {
      return h.refinement((F) => {
        return p.test(F)
      }, ee({
        validation: d,
        code: be.invalid_string,
      }, et.errToObj(M)))
    }
    ,
    h.nonempty = function (p) {
      return h.min(1, et.errToObj(p))
    }
    ,
    h
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    let M, F
    if (d !== we.string) {
      return this.addIssue(h, {
        code: be.invalid_type,
        expected: we.string,
        received: d,
      }, {
        data: p,
      }),
      Pe
    }
    let Z = !1
    try {
      for (var q = lt(this._def.checks), k = q.next(); !k.done; k = q.next()) {
        const O = k.value
        if (O.kind === 'min') {
          p.length < O.value && (Z = !0,
          this.addIssue(h, {
            code: be.too_small,
            minimum: O.value,
            type: 'string',
            inclusive: !0,
            message: O.message,
          }, {
            data: p,
          }))
        }
        else if (O.kind === 'max') {
          p.length > O.value && (Z = !0,
          this.addIssue(h, {
            code: be.too_big,
            maximum: O.value,
            type: 'string',
            inclusive: !0,
            message: O.message,
          }, {
            data: p,
          }))
        }
        else if (O.kind === 'email') {
          Oa.test(p) || (Z = !0,
          this.addIssue(h, {
            validation: 'email',
            code: be.invalid_string,
            message: O.message,
          }, {
            data: p,
          }))
        }
        else if (O.kind === 'uuid') {
          Pa.test(p) || (Z = !0,
          this.addIssue(h, {
            validation: 'uuid',
            code: be.invalid_string,
            message: O.message,
          }, {
            data: p,
          }))
        }
        else if (O.kind === 'cuid') {
          Aa.test(p) || (Z = !0,
          this.addIssue(h, {
            validation: 'cuid',
            code: be.invalid_string,
            message: O.message,
          }, {
            data: p,
          }))
        }
        else if (O.kind === 'url') {
          try {
            new URL(p)
          }
          catch {
            Z = !0,
            this.addIssue(h, {
              validation: 'url',
              code: be.invalid_string,
              message: O.message,
            }, {
              data: p,
            })
          }
        }
        else {
          O.kind === 'regex' && (O.regex.lastIndex = 0,
          O.regex.test(p) || (Z = !0,
          this.addIssue(h, {
            validation: 'regex',
            code: be.invalid_string,
            message: O.message,
          }, {
            data: p,
          })))
        }
      }
    }
    catch (B) {
      M = {
        error: B,
      }
    }
    finally {
      try {
        k && !k.done && (F = q.return) && F.call(q)
      }
      finally {
        if (M)
          throw M.error
      }
    }
    return Z ? Pe : Ue(p)
  }
  ,
  a.prototype._addCheck = function (h) {
    return new a(ee(ee({}, this._def), {
      checks: Tt(Tt([], It(this._def.checks), !1), [h]),
    }))
  }
  ,
  a.prototype.email = function (h) {
    return this._addCheck(ee({
      kind: 'email',
    }, et.errToObj(h)))
  }
  ,
  a.prototype.url = function (h) {
    return this._addCheck(ee({
      kind: 'url',
    }, et.errToObj(h)))
  }
  ,
  a.prototype.uuid = function (h) {
    return this._addCheck(ee({
      kind: 'uuid',
    }, et.errToObj(h)))
  }
  ,
  a.prototype.cuid = function (h) {
    return this._addCheck(ee({
      kind: 'cuid',
    }, et.errToObj(h)))
  }
  ,
  a.prototype.regex = function (h, p) {
    return this._addCheck(ee({
      kind: 'regex',
      regex: h,
    }, et.errToObj(p)))
  }
  ,
  a.prototype.min = function (h, p) {
    return this._addCheck(ee({
      kind: 'min',
      value: h,
    }, et.errToObj(p)))
  }
  ,
  a.prototype.max = function (h, p) {
    return this._addCheck(ee({
      kind: 'max',
      value: h,
    }, et.errToObj(p)))
  }
  ,
  a.prototype.length = function (h, p) {
    return this.min(h, p).max(h, p)
  }
  ,
  Object.defineProperty(a.prototype, 'isEmail', {
    get() {
      return !!this._def.checks.find((h) => {
        return h.kind === 'email'
      })
    },
    enumerable: !1,
    configurable: !0,
  }),
  Object.defineProperty(a.prototype, 'isURL', {
    get() {
      return !!this._def.checks.find((h) => {
        return h.kind === 'url'
      })
    },
    enumerable: !1,
    configurable: !0,
  }),
  Object.defineProperty(a.prototype, 'isUUID', {
    get() {
      return !!this._def.checks.find((h) => {
        return h.kind === 'uuid'
      })
    },
    enumerable: !1,
    configurable: !0,
  }),
  Object.defineProperty(a.prototype, 'isCUID', {
    get() {
      return !!this._def.checks.find((h) => {
        return h.kind === 'cuid'
      })
    },
    enumerable: !1,
    configurable: !0,
  }),
  Object.defineProperty(a.prototype, 'minLength', {
    get() {
      let h = -1 / 0
      return this._def.checks.map((p) => {
        p.kind === 'min' && (h === null || p.value > h) && (h = p.value)
      }),
      h
    },
    enumerable: !1,
    configurable: !0,
  }),
  Object.defineProperty(a.prototype, 'maxLength', {
    get() {
      let h = null
      return this._def.checks.map((p) => {
        p.kind === 'max' && (h === null || p.value < h) && (h = p.value)
      }),
      h
    },
    enumerable: !1,
    configurable: !0,
  }),
  a.create = function (h) {
    return new a(ee({
      checks: [],
      typeName: Le.ZodString,
    }, Ve(h)))
  }
  ,
  a
}(Fe)); const Pr = (function (c) {
  function a() {
    const h = c !== null && c.apply(this, arguments) || this
    return h.min = h.gte,
    h.max = h.lte,
    h.step = h.multipleOf,
    h
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    let M, F
    if (d !== we.number) {
      return this.addIssue(h, {
        code: be.invalid_type,
        expected: we.number,
        received: d,
      }, {
        data: p,
      }),
      Pe
    }
    let Z = !1
    try {
      for (var q = lt(this._def.checks), k = q.next(); !k.done; k = q.next()) {
        const O = k.value
        O.kind === 'int'
          ? rt.isInteger(p) || (Z = !0,
          this.addIssue(h, {
            code: be.invalid_type,
            expected: 'integer',
            received: 'float',
            message: O.message,
          }, {
            data: p,
          }))
          : O.kind === 'min'
            ? (O.inclusive ? p < O.value : p <= O.value) && (Z = !0,
              this.addIssue(h, {
                code: be.too_small,
                minimum: O.value,
                type: 'number',
                inclusive: O.inclusive,
                message: O.message,
              }, {
                data: p,
              }))
            : O.kind === 'max'
              ? (O.inclusive ? p > O.value : p >= O.value) && (Z = !0,
                this.addIssue(h, {
                  code: be.too_big,
                  maximum: O.value,
                  type: 'number',
                  inclusive: O.inclusive,
                  message: O.message,
                }, {
                  data: p,
                }))
              : O.kind === 'multipleOf'
                ? p % O.value != 0 && (Z = !0,
                this.addIssue(h, {
                  code: be.not_multiple_of,
                  multipleOf: O.value,
                  message: O.message,
                }, {
                  data: p,
                }))
                : rt.assertNever(O)
      }
    }
    catch (B) {
      M = {
        error: B,
      }
    }
    finally {
      try {
        k && !k.done && (F = q.return) && F.call(q)
      }
      finally {
        if (M)
          throw M.error
      }
    }
    return Z ? Pe : Ue(p)
  }
  ,
  a.prototype.gte = function (h, p) {
    return this.setLimit('min', h, !0, et.toString(p))
  }
  ,
  a.prototype.gt = function (h, p) {
    return this.setLimit('min', h, !1, et.toString(p))
  }
  ,
  a.prototype.lte = function (h, p) {
    return this.setLimit('max', h, !0, et.toString(p))
  }
  ,
  a.prototype.lt = function (h, p) {
    return this.setLimit('max', h, !1, et.toString(p))
  }
  ,
  a.prototype.setLimit = function (h, p, d, M) {
    return new a(ee(ee({}, this._def), {
      checks: Tt(Tt([], It(this._def.checks), !1), [{
        kind: h,
        value: p,
        inclusive: d,
        message: et.toString(M),
      }]),
    }))
  }
  ,
  a.prototype._addCheck = function (h) {
    return new a(ee(ee({}, this._def), {
      checks: Tt(Tt([], It(this._def.checks), !1), [h]),
    }))
  }
  ,
  a.prototype.int = function (h) {
    return this._addCheck({
      kind: 'int',
      message: et.toString(h),
    })
  }
  ,
  a.prototype.positive = function (h) {
    return this._addCheck({
      kind: 'min',
      value: 0,
      inclusive: !1,
      message: et.toString(h),
    })
  }
  ,
  a.prototype.negative = function (h) {
    return this._addCheck({
      kind: 'max',
      value: 0,
      inclusive: !1,
      message: et.toString(h),
    })
  }
  ,
  a.prototype.nonpositive = function (h) {
    return this._addCheck({
      kind: 'max',
      value: 0,
      inclusive: !0,
      message: et.toString(h),
    })
  }
  ,
  a.prototype.nonnegative = function (h) {
    return this._addCheck({
      kind: 'min',
      value: 0,
      inclusive: !0,
      message: et.toString(h),
    })
  }
  ,
  a.prototype.multipleOf = function (h, p) {
    return this._addCheck({
      kind: 'multipleOf',
      value: h,
      message: et.toString(p),
    })
  }
  ,
  Object.defineProperty(a.prototype, 'minValue', {
    get() {
      let h; let p; let d = null
      try {
        for (var M = lt(this._def.checks), F = M.next(); !F.done; F = M.next()) {
          const Z = F.value
          Z.kind === 'min' && (d === null || Z.value > d) && (d = Z.value)
        }
      }
      catch (q) {
        h = {
          error: q,
        }
      }
      finally {
        try {
          F && !F.done && (p = M.return) && p.call(M)
        }
        finally {
          if (h)
            throw h.error
        }
      }
      return d
    },
    enumerable: !1,
    configurable: !0,
  }),
  Object.defineProperty(a.prototype, 'maxValue', {
    get() {
      let h; let p; let d = null
      try {
        for (var M = lt(this._def.checks), F = M.next(); !F.done; F = M.next()) {
          const Z = F.value
          Z.kind === 'max' && (d === null || Z.value < d) && (d = Z.value)
        }
      }
      catch (q) {
        h = {
          error: q,
        }
      }
      finally {
        try {
          F && !F.done && (p = M.return) && p.call(M)
        }
        finally {
          if (h)
            throw h.error
        }
      }
      return d
    },
    enumerable: !1,
    configurable: !0,
  }),
  Object.defineProperty(a.prototype, 'isInt', {
    get() {
      return !!this._def.checks.find((h) => {
        return h.kind === 'int'
      })
    },
    enumerable: !1,
    configurable: !0,
  }),
  a.create = function (h) {
    return new a(ee(ee({
      checks: [],
      typeName: Le.ZodNumber,
    }, Ve(h)), Ve(h)))
  }
  ,
  a
}(Fe)); const Or = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    return d !== we.bigint
      ? (this.addIssue(h, {
          code: be.invalid_type,
          expected: we.bigint,
          received: d,
        }, {
          data: p,
        }),
        Pe)
      : Ue(p)
  }
  ,
  a.create = function (h) {
    return new a(ee({
      typeName: Le.ZodBigInt,
    }, Ve(h)))
  }
  ,
  a
}(Fe)); const xr = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    return d !== we.boolean
      ? (this.addIssue(h, {
          code: be.invalid_type,
          expected: we.boolean,
          received: d,
        }, {
          data: p,
        }),
        Pe)
      : Ue(p)
  }
  ,
  a.create = function (h) {
    return new a(ee({
      typeName: Le.ZodBoolean,
    }, Ve(h)))
  }
  ,
  a
}(Fe)); const Nr = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    return d !== we.date
      ? (this.addIssue(h, {
          code: be.invalid_type,
          expected: we.date,
          received: d,
        }, {
          data: p,
        }),
        Pe)
      : isNaN(p.getTime())
        ? (this.addIssue(h, {
            code: be.invalid_date,
          }, {
            data: p,
          }),
          Pe)
        : Ue(new Date(p.getTime()))
  }
  ,
  a.create = function (h) {
    return new a(ee({
      typeName: Le.ZodDate,
    }, Ve(h)))
  }
  ,
  a
}(Fe)); const Lr = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    return d !== we.undefined
      ? (this.addIssue(h, {
          code: be.invalid_type,
          expected: we.undefined,
          received: d,
        }, {
          data: p,
        }),
        Pe)
      : Ue(p)
  }
  ,
  a.create = function (h) {
    return new a(ee({
      typeName: Le.ZodUndefined,
    }, Ve(h)))
  }
  ,
  a
}(Fe)); const Mr = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    return d !== we.null
      ? (this.addIssue(h, {
          code: be.invalid_type,
          expected: we.null,
          received: d,
        }, {
          data: p,
        }),
        Pe)
      : Ue(p)
  }
  ,
  a.create = function (h) {
    return new a(ee({
      typeName: Le.ZodNull,
    }, Ve(h)))
  }
  ,
  a
}(Fe)); const hi = (function (c) {
  function a() {
    const h = c !== null && c.apply(this, arguments) || this
    return h._any = !0,
    h
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    return Ue(p)
  }
  ,
  a.create = function (h) {
    return new a(ee({
      typeName: Le.ZodAny,
    }, Ve(h)))
  }
  ,
  a
}(Fe)); const zn = (function (c) {
  function a() {
    const h = c !== null && c.apply(this, arguments) || this
    return h._unknown = !0,
    h
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    return Ue(p)
  }
  ,
  a.create = function (h) {
    return new a(ee({
      typeName: Le.ZodUnknown,
    }, Ve(h)))
  }
  ,
  a
}(Fe)); const Pn = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    return this.addIssue(h, {
      code: be.invalid_type,
      expected: we.never,
      received: d,
    }, {
      data: p,
    }),
    Pe
  }
  ,
  a.create = function (h) {
    return new a(ee({
      typeName: Le.ZodNever,
    }, Ve(h)))
  }
  ,
  a
}(Fe)); const Rr = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    return d !== we.undefined
      ? (this.addIssue(h, {
          code: be.invalid_type,
          expected: we.void,
          received: d,
        }, {
          data: p,
        }),
        Pe)
      : Ue(p)
  }
  ,
  a.create = function (h) {
    return new a(ee({
      typeName: Le.ZodVoid,
    }, Ve(h)))
  }
  ,
  a
}(Fe)); var Fn = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, F, d) {
    const M = this._def
    if (d !== we.array) {
      return this.addIssue(h, {
        code: be.invalid_type,
        expected: we.array,
        received: d,
      }, {
        data: F,
      }),
      Pe
    }
    var F = F
    let Z = !1
    M.minLength !== null && F.length < M.minLength.value && (Z = !0,
    this.addIssue(h, {
      code: be.too_small,
      minimum: M.minLength.value,
      type: 'array',
      inclusive: !0,
      message: M.minLength.message,
    }, {
      data: F,
    })),
    M.maxLength !== null && F.length > M.maxLength.value && (Z = !0,
    this.addIssue(h, {
      code: be.too_big,
      maximum: M.maxLength.value,
      type: 'array',
      inclusive: !0,
      message: M.maxLength.message,
    }, {
      data: F,
    }))
    const q = []
    const k = new Array(F.length)
    const O = M.type
    const B = function (C, Q) {
      Qt(Q)
        ? k[C] = Q.value
        : Lt(Q)
          ? Z = !0
          : q.push(Q.then((J) => {
            return B(C, J)
          }))
    }
    return F.forEach((C, Q) => {
      B(Q, O._parse(h.stepInto(Q), C, wt(C)))
    }),
    h.async
      ? Promise.all(q).then(() => {
        return Z ? Pe : Ue(k)
      })
      : Z ? Pe : Ue(k)
  }
  ,
  Object.defineProperty(a.prototype, 'element', {
    get() {
      return this._def.type
    },
    enumerable: !1,
    configurable: !0,
  }),
  a.prototype.min = function (h, p) {
    return new a(ee(ee({}, this._def), {
      minLength: {
        value: h,
        message: et.toString(p),
      },
    }))
  }
  ,
  a.prototype.max = function (h, p) {
    return new a(ee(ee({}, this._def), {
      maxLength: {
        value: h,
        message: et.toString(p),
      },
    }))
  }
  ,
  a.prototype.length = function (h, p) {
    return this.min(h, p).max(h, p)
  }
  ,
  a.prototype.nonempty = function (h) {
    return this.min(1, h)
  }
  ,
  a.create = function (h, p) {
    return new a(ee({
      type: h,
      minLength: null,
      maxLength: null,
      typeName: Le.ZodArray,
    }, Ve(p)))
  }
  ,
  a
}(Fe));
(function (c) {
  c.mergeShapes = function (a, h) {
    return ee(ee({}, a), h)
  }
  ,
  c.intersectShapes = function (a, h) {
    let p; let d; var F = rt.objectKeys(a); const M = rt.objectKeys(h); var F = F.filter((B) => {
      return M.includes(B)
    }); const Z = {}
    try {
      for (var q = lt(F), k = q.next(); !k.done; k = q.next()) {
        const O = k.value
        Z[O] = pi.create(a[O], h[O])
      }
    }
    catch (B) {
      p = {
        error: B,
      }
    }
    finally {
      try {
        k && !k.done && (d = q.return) && d.call(q)
      }
      finally {
        if (p)
          throw p.error
      }
    }
    return ee(ee(ee({}, a), h), Z)
  }
}
)(Vn = Vn || {})
const xa = function (c) {
  return function (a) {
    const h = Vn.mergeShapes(c._def.shape(), a._def.shape())
    return new un({
      unknownKeys: c._def.unknownKeys,
      catchall: c._def.catchall,
      shape() {
        return h
      },
      typeName: Le.ZodObject,
    })
  }
}
const Sr = function (c) {
  return function (a) {
    return new un(ee(ee({}, c), {
      shape() {
        return ee(ee({}, c.shape()), a)
      },
    }))
  }
}
function An(c) {
  if (c instanceof un) {
    let a; const h = {}
    for (a in c.shape) {
      const p = c.shape[a]
      h[a] = on.create(An(p))
    }
    return new un(ee(ee({}, c._def), {
      shape() {
        return h
      },
    }))
  }
  return c instanceof Fn
    ? Fn.create(An(c.element))
    : c instanceof on
      ? on.create(An(c.unwrap()))
      : c instanceof Gn
        ? Gn.create(An(c.unwrap()))
        : c instanceof Ln
          ? Ln.create(c.items.map((d) => {
            return An(d)
          }))
          : c
}
var un = (function (c) {
  function a() {
    const h = c !== null && c.apply(this, arguments) || this
    return h._cached = null,
    h.nonstrict = h.passthrough,
    h.augment = Sr(h._def),
    h.extend = Sr(h._def),
    h
  }
  return He(a, c),
  a.prototype._getCached = function () {
    if (this._cached !== null)
      return this._cached
    const h = this._def.shape()
    const p = rt.objectKeys(h)
    return this._cached = {
      shape: h,
      keys: p,
    }
  }
  ,
  a.prototype._parse = function (h, p, B) {
    let M, F, Z, q, k
    if (B !== we.object) {
      return this.addIssue(h, {
        code: be.invalid_type,
        expected: we.object,
        received: B,
      }, {
        data: p,
      }),
      Pe
    }
    var B = this._getCached()
    const O = B.shape
    var B = B.keys
    let C = !1
    const Q = []
    const J = {}
    const ne = function (qe, pe) {
      let Vt
      Qt(pe)
        ? ((Vt = pe.value) !== void 0 || qe in p) && (J[qe] = Vt)
        : Lt(pe)
          ? C = !0
          : Q.push(pe.then((re) => {
            return ne(qe, re)
          }))
    }
    try {
      for (var Y = lt(B), Me = Y.next(); !Me.done; Me = Y.next()) {
        var le = Me.value
        const Se = O[le]
        var ye = p[le]
        ne(le, Se._parse(h.stepInto(le), ye, wt(ye)))
      }
    }
    catch (qe) {
      oe = {
        error: qe,
      }
    }
    finally {
      try {
        Me && !Me.done && (M = Y.return) && M.call(Y)
      }
      finally {
        if (oe)
          throw oe.error
      }
    }
    if (this._def.catchall instanceof Pn) {
      var oe = this._def.unknownKeys
      if (oe === 'passthrough') {
        var We = rt.objectKeys(p).filter((qe) => {
          return !(qe in O)
        })
        try {
          for (var ct = lt(We), je = ct.next(); !je.done; je = ct.next()) {
            le = je.value,
            J[le] = p[le]
          }
        }
        catch (qe) {
          F = {
            error: qe,
          }
        }
        finally {
          try {
            je && !je.done && (Z = ct.return) && Z.call(ct)
          }
          finally {
            if (F)
              throw F.error
          }
        }
      }
      else if (oe === 'strict') {
        (We = rt.objectKeys(p).filter((qe) => {
          return !(qe in O)
        })).length > 0 && (C = !0,
        this.addIssue(h, {
          code: be.unrecognized_keys,
          keys: We,
        }, {
          data: p,
        }))
      }
      else if (oe !== 'strip') { throw new Error('Internal ZodObject error: invalid unknownKeys value.') }
    }
    else {
      const Pt = this._def.catchall
      var We = rt.objectKeys(p).filter((pe) => {
        return !(pe in O)
      })
      try {
        for (var ft = lt(We), dt = ft.next(); !dt.done; dt = ft.next()) {
          le = dt.value,
          ye = p[le],
          ne(le, Pt._parse(h.stepInto(le), ye, wt(ye)))
        }
      }
      catch (pe) {
        q = {
          error: pe,
        }
      }
      finally {
        try {
          dt && !dt.done && (k = ft.return) && k.call(ft)
        }
        finally {
          if (q)
            throw q.error
        }
      }
    }
    return h.async
      ? Promise.all(Q).then(() => {
        return C ? Pe : Ue(J)
      })
      : C ? Pe : Ue(J)
  }
  ,
  Object.defineProperty(a.prototype, 'shape', {
    get() {
      return this._def.shape()
    },
    enumerable: !1,
    configurable: !0,
  }),
  a.prototype.strict = function () {
    return new a(ee(ee({}, this._def), {
      unknownKeys: 'strict',
    }))
  }
  ,
  a.prototype.strip = function () {
    return new a(ee(ee({}, this._def), {
      unknownKeys: 'strip',
    }))
  }
  ,
  a.prototype.passthrough = function () {
    return new a(ee(ee({}, this._def), {
      unknownKeys: 'passthrough',
    }))
  }
  ,
  a.prototype.setKey = function (h, p) {
    let d
    return this.augment(((d = {})[h] = p,
    d))
  }
  ,
  a.prototype.merge = function (h) {
    const p = Vn.mergeShapes(this._def.shape(), h._def.shape())
    return new a({
      unknownKeys: h._def.unknownKeys,
      catchall: h._def.catchall,
      shape() {
        return p
      },
      typeName: Le.ZodObject,
    })
  }
  ,
  a.prototype.catchall = function (h) {
    return new a(ee(ee({}, this._def), {
      catchall: h,
    }))
  }
  ,
  a.prototype.pick = function (h) {
    const p = this
    const d = {}
    return rt.objectKeys(h).map((M) => {
      d[M] = p.shape[M]
    }),
    new a(ee(ee({}, this._def), {
      shape() {
        return d
      },
    }))
  }
  ,
  a.prototype.omit = function (h) {
    const p = this
    const d = {}
    return rt.objectKeys(this.shape).map((M) => {
      !rt.objectKeys(h).includes(M) && (d[M] = p.shape[M])
    }),
    new a(ee(ee({}, this._def), {
      shape() {
        return d
      },
    }))
  }
  ,
  a.prototype.deepPartial = function () {
    return An(this)
  }
  ,
  a.prototype.partial = function (h) {
    let p; const d = this; const M = {}
    if (h) {
      return rt.objectKeys(this.shape).map((Z) => {
        !rt.objectKeys(h).includes(Z) ? M[Z] = d.shape[Z] : M[Z] = d.shape[Z].optional()
      }),
      new a(ee(ee({}, this._def), {
        shape() {
          return M
        },
      }))
    }
    for (p in this.shape) {
      const F = this.shape[p]
      M[p] = F.optional()
    }
    return new a(ee(ee({}, this._def), {
      shape() {
        return M
      },
    }))
  }
  ,
  a.prototype.required = function () {
    let h; const p = {}
    for (h in this.shape) {
      for (var d = this.shape[h]; d instanceof on;)
        d = d._def.innerType
      p[h] = d
    }
    return new a(ee(ee({}, this._def), {
      shape() {
        return p
      },
    }))
  }
  ,
  a.create = function (h, p) {
    return new a(ee({
      shape() {
        return h
      },
      unknownKeys: 'strip',
      catchall: Pn.create(),
      typeName: Le.ZodObject,
    }, Ve(p)))
  }
  ,
  a.strictCreate = function (h, p) {
    return new a(ee({
      shape() {
        return h
      },
      unknownKeys: 'strict',
      catchall: Pn.create(),
      typeName: Le.ZodObject,
    }, Ve(p)))
  }
  ,
  a.lazycreate = function (h, p) {
    return new a(ee({
      shape: h,
      unknownKeys: 'strip',
      catchall: Pn.create(),
      typeName: Le.ZodObject,
    }, Ve(p)))
  }
  ,
  a
}(Fe))
var Yi = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    function M(Me) {
      const le = Me.map((Se) => {
        return new On(Se)
      })
      return (Me = le.filter((Se) => {
        return Se.issues[0].code !== 'invalid_type'
      })).length === 1
        ? Me[0].issues.forEach((Se) => {
          return h.issues.push(Se)
        })
        : q.addIssue(h, {
          code: be.invalid_union,
          unionErrors: le,
        }, {
          data: p,
        }),
      Pe
    }
    let F; let Z; var q = this; const k = this._def.options
    if (h.async) {
      const O = k.map(() => {
        return new li(ee(ee({}, h.def), {
          issues: [],
        }))
      })
      return Promise.all(k.map((Me, le) => {
        return Me._parse(O[le], p, d)
      })).then((Me) => {
        let le, Se
        try {
          for (var ye = lt(Me), oe = ye.next(); !oe.done; oe = ye.next()) {
            const We = oe.value
            if (Qt(We))
              return We
          }
        }
        catch (ct) {
          le = {
            error: ct,
          }
        }
        finally {
          try {
            oe && !oe.done && (Se = ye.return) && Se.call(ye)
          }
          finally {
            if (le)
              throw le.error
          }
        }
        return M(O.map((ct) => {
          return ct.issues
        }))
      })
    }
    const B = []
    try {
      for (var C = lt(k), Q = C.next(); !Q.done; Q = C.next()) {
        const J = Q.value
        const ne = new li(ee(ee({}, h.def), {
          issues: [],
        }))
        const Y = J._parseSync(ne, p, d)
        if (!Lt(Y))
          return Y
        B.push(ne.issues)
      }
    }
    catch (Me) {
      F = {
        error: Me,
      }
    }
    finally {
      try {
        Q && !Q.done && (Z = C.return) && Z.call(C)
      }
      finally {
        if (F)
          throw F.error
      }
    }
    return M(B)
  }
  ,
  Object.defineProperty(a.prototype, 'options', {
    get() {
      return this._def.options
    },
    enumerable: !1,
    configurable: !0,
  }),
  a.create = function (h, p) {
    return new a(ee({
      options: h,
      typeName: Le.ZodUnion,
    }, Ve(p)))
  }
  ,
  a
}(Fe))
function zi(c, a) {
  let h; let p; const d = wt(c); const M = wt(a)
  if (c === a) {
    return {
      valid: !0,
      data: c,
    }
  }
  if (d === we.object && M === we.object) {
    const F = rt.objectKeys(a)
    const Z = rt.objectKeys(c).filter((ne) => {
      return F.includes(ne)
    })
    const q = ee(ee({}, c), a)
    try {
      for (var k = lt(Z), O = k.next(); !O.done; O = k.next()) {
        const B = O.value
        if (!(C = zi(c[B], a[B])).valid) {
          return {
            valid: !1,
          }
        }
        q[B] = C.data
      }
    }
    catch (ne) {
      h = {
        error: ne,
      }
    }
    finally {
      try {
        O && !O.done && (p = k.return) && p.call(k)
      }
      finally {
        if (h)
          throw h.error
      }
    }
    return {
      valid: !0,
      data: q,
    }
  }
  if (d !== we.array || M !== we.array) {
    return {
      valid: !1,
    }
  }
  if (c.length !== a.length) {
    return {
      valid: !1,
    }
  }
  for (var C, Q = [], J = 0; J < c.length; J++) {
    if (!(C = zi(c[J], a[J])).valid) {
      return {
        valid: !1,
      }
    }
    Q.push(C.data)
  }
  return {
    valid: !0,
    data: Q,
  }
}
var pi = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    function M(Z, q) {
      return Lt(Z) || Lt(q)
        ? Pe
        : (q = zi(Z.value, q.value)).valid
            ? Ue(q.data)
            : (F.addIssue(h, {
                code: be.invalid_intersection_types,
              }, {
                data: p,
              }),
              Pe)
    }
    var F = this
    return h.async
      ? Promise.all([this._def.left._parse(h, p, d), this._def.right._parse(h, p, d)]).then((q) => {
        var k = It(q, 2)
        var q = k[0]
        var k = k[1]
        return M(q, k)
      })
      : M(this._def.left._parseSync(h, p, d), this._def.right._parseSync(h, p, d))
  }
  ,
  a.create = function (h, p, d) {
    return new a(ee({
      left: h,
      right: p,
      typeName: Le.ZodIntersection,
    }, Ve(d)))
  }
  ,
  a
}(Fe))
var Ln = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    if (d !== we.array) {
      return this.addIssue(h, {
        code: be.invalid_type,
        expected: we.array,
        received: d,
      }, {
        data: p,
      }),
      Pe
    }
    const M = this._def.rest
    if (!M && p.length > this._def.items.length) {
      return this.addIssue(h, {
        code: be.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        type: 'array',
      }, {
        data: p,
      }),
      Pe
    }
    if (p.length < this._def.items.length) {
      return this.addIssue(h, {
        code: be.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        type: 'array',
      }, {
        data: p,
      }),
      Pe
    }
    const F = []
    const Z = this._def.items
    const q = new Array(p.length)
    let k = !1
    const O = function (B, C) {
      Qt(C)
        ? q[B] = C.value
        : Lt(C)
          ? k = !0
          : F.push(C.then((Q) => {
            return O(B, Q)
          }))
    }
    return Z.forEach((B, C) => {
      O(C, B._parse(h.stepInto(C), p[C], wt(p[C])))
    }),
    M && p.slice(Z.length).forEach((B, C) => {
      C += Z.length,
      O(C, M._parse(h.stepInto(C), B, wt(B)))
    }),
    h.async
      ? Promise.all(F).then(() => {
        return k ? Pe : Ue(q)
      })
      : k ? Pe : Ue(q)
  }
  ,
  Object.defineProperty(a.prototype, 'items', {
    get() {
      return this._def.items
    },
    enumerable: !1,
    configurable: !0,
  }),
  a.prototype.rest = function (h) {
    return new a(ee(ee({}, this._def), {
      rest: h,
    }))
  }
  ,
  a.create = function (h, p) {
    return new a(ee({
      items: h,
      typeName: Le.ZodTuple,
      rest: null,
    }, Ve(p)))
  }
  ,
  a
}(Fe))
const Dr = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  Object.defineProperty(a.prototype, 'keySchema', {
    get() {
      return this._def.keyType
    },
    enumerable: !1,
    configurable: !0,
  }),
  Object.defineProperty(a.prototype, 'valueSchema', {
    get() {
      return this._def.valueType
    },
    enumerable: !1,
    configurable: !0,
  }),
  a.prototype._parse = function (h, p, d) {
    if (d !== we.object) {
      return this.addIssue(h, {
        code: be.invalid_type,
        expected: we.object,
        received: d,
      }, {
        data: p,
      }),
      Pe
    }
    let M; const F = []; const Z = this._def.keyType; const q = this._def.valueType; const k = {}; let O = !1; const B = function (C, Q) {
      Qt(C) && Qt(Q)
        ? k[C.value] = Q.value
        : vn(C) || vn(Q)
          ? F.push(Promise.all([C, Q]).then((ne) => {
            var Y = It(ne, 2)
            var ne = Y[0]
            var Y = Y[1]
            return B(ne, Y)
          }))
          : O = !0
    }
    for (M in p)
      B(Z._parse(h.stepInto(M), M, wt(M)), q._parse(h.stepInto(M), p[M], wt(p[M])))
    return h.async
      ? Promise.all(F).then(() => {
        return O ? Pe : Ue(k)
      })
      : O ? Pe : Ue(k)
  }
  ,
  Object.defineProperty(a.prototype, 'element', {
    get() {
      return this._def.valueType
    },
    enumerable: !1,
    configurable: !0,
  }),
  a.create = function (h, p, d) {
    return new a(p instanceof Fe
      ? ee({
        keyType: h,
        valueType: p,
        typeName: Le.ZodRecord,
      }, Ve(d))
      : ee({
        keyType: Ki.create(),
        valueType: h,
        typeName: Le.ZodRecord,
      }, Ve(p)))
  }
  ,
  a
}(Fe))
const kr = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, Z, d) {
    if (d !== we.map) {
      return this.addIssue(h, {
        code: be.invalid_type,
        expected: we.map,
        received: d,
      }, {
        data: Z,
      }),
      Pe
    }
    const M = this._def.keyType
    const F = this._def.valueType
    var Z = Z
    const q = new Map()
    const k = []
    let O = !1
    const B = function (C, Q) {
      vn(C) || vn(Q)
        ? k.push(Promise.all([C, Q]).then((ne) => {
          var Y = It(ne, 2)
          var ne = Y[0]
          var Y = Y[1]
          return B(ne, Y)
        }))
        : Lt(C) || Lt(Q) ? O = !0 : q.set(C.value, Q.value)
    }
    return Tt([], It(Z.entries())).forEach((ne, J) => {
      var Y = It(ne, 2)
      var ne = Y[0]
      var Y = Y[1]
      var J = h.stepInto(J)
      var ne = M._parse(J.stepInto('key'), ne, wt(ne))
      var Y = F._parse(J.stepInto('value'), Y, wt(Y))
      B(ne, Y)
    }),
    h.async
      ? Promise.all(k).then(() => {
        return O ? Pe : Ue(q)
      })
      : O ? Pe : Ue(q)
  }
  ,
  a.create = function (h, p, d) {
    return new a(ee({
      valueType: p,
      keyType: h,
      typeName: Le.ZodMap,
    }, Ve(d)))
  }
  ,
  a
}(Fe))
const Br = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, M, d) {
    if (d !== we.set) {
      return this.addIssue(h, {
        code: be.invalid_type,
        expected: we.set,
        received: d,
      }, {
        data: M,
      }),
      Pe
    }
    var M = M
    const F = this._def.valueType
    const Z = new Set()
    const q = []
    let k = !1
    const O = function (B) {
      Qt(B)
        ? Z.add(B.value)
        : Lt(B)
          ? k = !0
          : q.push(B.then((C) => {
            return O(C)
          }))
    }
    return Tt([], It(M.values())).forEach((B, C) => {
      return O(F._parse(h.stepInto(C), B, wt(B)))
    }),
    h.async
      ? Promise.all(q).then(() => {
        return k ? Pe : Ue(Z)
      })
      : k ? Pe : Ue(Z)
  }
  ,
  a.create = function (h, p) {
    return new a(ee({
      valueType: h,
      typeName: Le.ZodSet,
    }, Ve(p)))
  }
  ,
  a
}(Fe))
const Ur = (function (c) {
  function a() {
    const h = c !== null && c.apply(this, arguments) || this
    return h.validate = h.implement,
    h
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    const M = this
    if (d !== we.function) {
      return this.addIssue(h, {
        code: be.invalid_type,
        expected: we.function,
        received: d,
      }, {
        data: p,
      }),
      Pe
    }
    function F(O, B) {
      return ui({
        data: O,
        path: Nn(h.path),
        errorMaps: [h.errorMap],
        issueData: {
          code: be.invalid_arguments,
          argumentsError: B,
        },
      })
    }
    function Z(O, B) {
      return ui({
        data: O,
        path: Nn(h.path),
        errorMaps: [h.errorMap],
        issueData: {
          code: be.invalid_return_type,
          returnTypeError: B,
        },
      })
    }
    const q = {
      errorMap: h.errorMap,
    }
    const k = p
    return this._def.returns instanceof _i
      ? Ue(function () {
        for (var O = [], B = 0; B < arguments.length; B++)
          O[B] = arguments[B]
        return Bi(M, void 0, void 0, function () {
          let C, Q, J
          return Ui(this, function (ne) {
            switch (ne.label) {
              case 0:
                return C = new On([]),
                [4, this._def.args.parseAsync(O, q).catch((Y) => {
                  throw C.addIssue(F(O, Y)),
                  C
                })]
              case 1:
                return Q = ne.sent(),
                [4, k.apply(void 0, Tt([], It(Q)))]
              case 2:
                return J = ne.sent(),
                [4, this._def.returns.parseAsync(J, q).catch((Y) => {
                  throw C.addIssue(Z(J, Y)),
                  C
                })]
              case 3:
                return [2, ne.sent()]
            }
          })
        })
      })
      : Ue(function () {
        for (var O = [], B = 0; B < arguments.length; B++)
          O[B] = arguments[B]
        var Q = M._def.args.safeParse(O, q)
        if (!Q.success)
          throw new On([F(O, Q.error)])
        const C = k.apply(void 0, Tt([], It(Q.data)))
        var Q = M._def.returns.safeParse(C, q)
        if (!Q.success)
          throw new On([Z(C, Q.error)])
        return Q.data
      })
  }
  ,
  a.prototype.parameters = function () {
    return this._def.args
  }
  ,
  a.prototype.returnType = function () {
    return this._def.returns
  }
  ,
  a.prototype.args = function () {
    for (var h = [], p = 0; p < arguments.length; p++)
      h[p] = arguments[p]
    return new a(ee(ee({}, this._def), {
      args: Ln.create(h).rest(zn.create()),
    }))
  }
  ,
  a.prototype.returns = function (h) {
    return new a(ee(ee({}, this._def), {
      returns: h,
    }))
  }
  ,
  a.prototype.implement = function (h) {
    return this.parse(h)
  }
  ,
  a.prototype.strictImplement = function (h) {
    return this.parse(h)
  }
  ,
  a.create = function (h, p, d) {
    return new a(ee({
      args: (h || Ln.create([])).rest(zn.create()),
      returns: p || zn.create(),
      typeName: Le.ZodFunction,
    }, Ve(d)))
  }
  ,
  a
}(Fe))
const zr = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  Object.defineProperty(a.prototype, 'schema', {
    get() {
      return this._def.getter()
    },
    enumerable: !1,
    configurable: !0,
  }),
  a.prototype._parse = function (h, p, d) {
    return this._def.getter()._parse(h, p, d)
  }
  ,
  a.create = function (h, p) {
    return new a(ee({
      getter: h,
      typeName: Le.ZodLazy,
    }, Ve(p)))
  }
  ,
  a
}(Fe))
const Vr = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    return p !== this._def.value
      ? (this.addIssue(h, {
          code: be.invalid_type,
          expected: this._def.value,
          received: p,
        }, {
          data: p,
        }),
        Pe)
      : Ue(p)
  }
  ,
  Object.defineProperty(a.prototype, 'value', {
    get() {
      return this._def.value
    },
    enumerable: !1,
    configurable: !0,
  }),
  a.create = function (h, p) {
    return new a(ee({
      value: h,
      typeName: Le.ZodLiteral,
    }, Ve(p)))
  }
  ,
  a
}(Fe))
function Na(c) {
  return new $i({
    values: c,
    typeName: Le.ZodEnum,
  })
}
let Le; var $i = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    return !this._def.values.includes(p)
      ? (this.addIssue(h, {
          code: be.invalid_enum_value,
          options: this._def.values,
        }, {
          data: p,
        }),
        Pe)
      : Ue(p)
  }
  ,
  Object.defineProperty(a.prototype, 'options', {
    get() {
      return this._def.values
    },
    enumerable: !1,
    configurable: !0,
  }),
  Object.defineProperty(a.prototype, 'enum', {
    get() {
      let h; let p; const d = {}
      try {
        for (var M = lt(this._def.values), F = M.next(); !F.done; F = M.next()) {
          const Z = F.value
          d[Z] = Z
        }
      }
      catch (q) {
        h = {
          error: q,
        }
      }
      finally {
        try {
          F && !F.done && (p = M.return) && p.call(M)
        }
        finally {
          if (h)
            throw h.error
        }
      }
      return d
    },
    enumerable: !1,
    configurable: !0,
  }),
  Object.defineProperty(a.prototype, 'Values', {
    get() {
      let h; let p; const d = {}
      try {
        for (var M = lt(this._def.values), F = M.next(); !F.done; F = M.next()) {
          const Z = F.value
          d[Z] = Z
        }
      }
      catch (q) {
        h = {
          error: q,
        }
      }
      finally {
        try {
          F && !F.done && (p = M.return) && p.call(M)
        }
        finally {
          if (h)
            throw h.error
        }
      }
      return d
    },
    enumerable: !1,
    configurable: !0,
  }),
  Object.defineProperty(a.prototype, 'Enum', {
    get() {
      let h; let p; const d = {}
      try {
        for (var M = lt(this._def.values), F = M.next(); !F.done; F = M.next()) {
          const Z = F.value
          d[Z] = Z
        }
      }
      catch (q) {
        h = {
          error: q,
        }
      }
      finally {
        try {
          F && !F.done && (p = M.return) && p.call(M)
        }
        finally {
          if (h)
            throw h.error
        }
      }
      return d
    },
    enumerable: !1,
    configurable: !0,
  }),
  a.create = Na,
  a
}(Fe)); const Fr = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    const M = rt.getValidEnumValues(this._def.values)
    return !M.includes(p)
      ? (this.addIssue(h, {
          code: be.invalid_enum_value,
          options: rt.objectValues(M),
        }, {
          data: p,
        }),
        Pe)
      : Ue(p)
  }
  ,
  a.create = function (h, p) {
    return new a(ee({
      values: h,
      typeName: Le.ZodNativeEnum,
    }, Ve(p)))
  }
  ,
  a
}(Fe)); var _i = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    const M = this
    return d !== we.promise && h.async === !1
      ? (this.addIssue(h, {
          code: be.invalid_type,
          expected: we.promise,
          received: d,
        }, {
          data: p,
        }),
        Pe)
      : (p = d === we.promise ? p : Promise.resolve(p),
        Ue(p.then((F) => {
          return M._def.type.parseAsync(F, {
            path: Nn(h.path),
            errorMap: h.errorMap,
          })
        })))
  }
  ,
  a.create = function (h, p) {
    return new a(ee({
      type: h,
      typeName: Le.ZodPromise,
    }, Ve(p)))
  }
  ,
  a
}(Fe)); var Mn = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype.innerType = function () {
    return this._def.schema
  }
  ,
  a.prototype._parse = function (h, p, k) {
    const M = this
    const F = h.async === !1
    const Z = this._def.effect || null
    const q = p
    var k = k
    if (Z.type === 'preprocess') {
      var O = Z.transform(p)
      if (h.async) {
        return Promise.resolve(O).then((J) => {
          return M._def.schema._parseAsync(h, J, wt(J))
        })
      }
      if ((O = this._def.schema._parseSync(h, O, wt(O))) instanceof Promise)
        throw new Error('Asynchronous preprocess step encountered during synchronous parse operation. Use .parseAsync instead.')
      return O
    }
    if (Z.type === 'refinement') {
      const J = function (ne, Y) {
        if (Y = Y.refinement(ne, C),
        Y instanceof Promise) {
          if (F)
            throw new Error('Async refinement encountered during synchronous parse operation. Use .parseAsync instead.')
          return Y.then(() => {
            return ne
          })
        }
        return ne
      }
      let B = !1
      var C = {
        addIssue(ne) {
          B = !0,
          M.addIssue(h, ne, {
            data: q,
          })
        },
        get path() {
          return Nn(h.path)
        },
      }
      if (C.addIssue = C.addIssue.bind(C),
      F) {
        var Q = this._def.schema._parseSync(h, q, k)
        return Lt(Q)
          ? Pe
          : (O = J(Q.value, Z),
            B ? Pe : Ue(O))
      }
      return this._def.schema._parseAsync(h, q, k).then((ne) => {
        return Lt(ne) ? Pe : J(ne.value, Z)
      }).then((ne) => {
        return B ? Pe : Ue(ne)
      })
    }
    if (Z.type === 'transform') {
      const J = function (ne, Y) {
        if (ne = Y.transform(ne),
        ne instanceof Promise && F)
          throw new Error('Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.')
        return ne
      }
      return F
        ? (Q = this._def.schema._parseSync(h, q, k),
          Lt(Q)
            ? Pe
            : (O = J(Q.value, Z),
              Ue(O)))
        : this._def.schema._parseAsync(h, q, k).then((ne) => {
          return Lt(ne) ? Pe : J(ne.value, Z)
        }).then((ne) => {
          return Ue(ne)
        })
    }
    rt.assertNever(Z)
  }
  ,
  a.create = function (h, p, d) {
    return new a(ee({
      schema: h,
      typeName: Le.ZodEffects,
      effect: p,
    }, Ve(d)))
  }
  ,
  a.createWithPreprocess = function (h, p, d) {
    return new a(ee({
      schema: p,
      effect: {
        type: 'preprocess',
        transform: h,
      },
      typeName: Le.ZodEffects,
    }, Ve(d)))
  }
  ,
  a
}(Fe)); var on = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    return d === we.undefined ? Ue(void 0) : this._def.innerType._parse(h, p, d)
  }
  ,
  a.prototype.unwrap = function () {
    return this._def.innerType
  }
  ,
  a.create = function (h, p) {
    return new a(ee({
      innerType: h,
      typeName: Le.ZodOptional,
    }, Ve(p)))
  }
  ,
  a
}(Fe)); var Gn = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    return d === we.null ? Ue(null) : this._def.innerType._parse(h, p, d)
  }
  ,
  a.prototype.unwrap = function () {
    return this._def.innerType
  }
  ,
  a.create = function (h, p) {
    return new a(ee({
      innerType: h,
      typeName: Le.ZodNullable,
    }, Ve(p)))
  }
  ,
  a
}(Fe)); var Gr = (function (c) {
  function a() {
    return c !== null && c.apply(this, arguments) || this
  }
  return He(a, c),
  a.prototype._parse = function (h, p, d) {
    return d === we.undefined && (p = this._def.defaultValue()),
    this._def.innerType._parse(h, p, wt(p))
  }
  ,
  a.prototype.removeDefault = function () {
    return this._def.innerType
  }
  ,
  a.create = function (h, p) {
    return new on(ee({
      innerType: h,
      typeName: Le.ZodOptional,
    }, Ve(p)))
  }
  ,
  a
}(Fe)); const Zr = function (c, a) {
  return c ? hi.create().refine(c, a) : hi.create()
}; const La = {
  object: un.lazycreate,
};
(function (c) {
  c.ZodString = 'ZodString',
  c.ZodNumber = 'ZodNumber',
  c.ZodBigInt = 'ZodBigInt',
  c.ZodBoolean = 'ZodBoolean',
  c.ZodDate = 'ZodDate',
  c.ZodUndefined = 'ZodUndefined',
  c.ZodNull = 'ZodNull',
  c.ZodAny = 'ZodAny',
  c.ZodUnknown = 'ZodUnknown',
  c.ZodNever = 'ZodNever',
  c.ZodVoid = 'ZodVoid',
  c.ZodArray = 'ZodArray',
  c.ZodObject = 'ZodObject',
  c.ZodUnion = 'ZodUnion',
  c.ZodIntersection = 'ZodIntersection',
  c.ZodTuple = 'ZodTuple',
  c.ZodRecord = 'ZodRecord',
  c.ZodMap = 'ZodMap',
  c.ZodSet = 'ZodSet',
  c.ZodFunction = 'ZodFunction',
  c.ZodLazy = 'ZodLazy',
  c.ZodLiteral = 'ZodLiteral',
  c.ZodEnum = 'ZodEnum',
  c.ZodEffects = 'ZodEffects',
  c.ZodNativeEnum = 'ZodNativeEnum',
  c.ZodOptional = 'ZodOptional',
  c.ZodNullable = 'ZodNullable',
  c.ZodDefault = 'ZodDefault',
  c.ZodPromise = 'ZodPromise'
}
)(Le = Le || {})
const Ma = function (c, a) {
  return a === void 0 && (a = {
    message: `Input not instance of ${c.name}`,
  }),
  Zr((h) => {
    return h instanceof c
  }, a)
}
const j = Ki.create
const fe = Pr.create
const Hr = Or.create
const Ae = xr.create
const Ra = Nr.create
const Da = Lr.create
const Wi = Mr.create
const ka = hi.create
const Zn = zn.create
const Ba = Pn.create
const Ua = Rr.create
const Be = Fn.create
const he = un.create
const za = un.strictCreate
const Ji = Yi.create
const Va = pi.create
const Fa = Ln.create
const Ga = Dr.create
const Za = kr.create
const Ha = Br.create
const ja = Ur.create
const qa = zr.create
const zt = Vr.create
const Ka = $i.create
const Rn = Fr.create
const Ya = _i.create
const Er = Mn.create
const jr = on.create
const $a = Gn.create
const qr = Mn.createWithPreprocess
const Wa = function () {
  return j().optional()
}
const Ja = function () {
  return fe().optional()
}
const Xa = function () {
  return Ae().optional()
}
Object.freeze({
  __proto__: null,
  ZodParsedType: we,
  getParsedType: wt,
  makeIssue: ui,
  EMPTY_PATH: Ca,
  pathToArray: Nn,
  pathFromArray: Ar,
  ParseContext: li,
  INVALID: Pe,
  OK: Ue,
  isInvalid: Lt,
  isOk: Qt,
  isAsync: vn,
  ZodType: Fe,
  ZodString: Ki,
  ZodNumber: Pr,
  ZodBigInt: Or,
  ZodBoolean: xr,
  ZodDate: Nr,
  ZodUndefined: Lr,
  ZodNull: Mr,
  ZodAny: hi,
  ZodUnknown: zn,
  ZodNever: Pn,
  ZodVoid: Rr,
  ZodArray: Fn,
  get objectUtil() {
    return Vn
  },
  mergeObjects: xa,
  ZodObject: un,
  ZodUnion: Yi,
  ZodIntersection: pi,
  ZodTuple: Ln,
  ZodRecord: Dr,
  ZodMap: kr,
  ZodSet: Br,
  ZodFunction: Ur,
  ZodLazy: zr,
  ZodLiteral: Vr,
  ZodEnum: $i,
  ZodNativeEnum: Fr,
  ZodPromise: _i,
  ZodEffects: Mn,
  ZodTransformer: Mn,
  ZodOptional: on,
  ZodNullable: Gn,
  ZodDefault: Gr,
  custom: Zr,
  Schema: Fe,
  ZodSchema: Fe,
  late: La,
  get ZodFirstPartyTypeKind() {
    return Le
  },
  any: ka,
  array: Be,
  bigint: Hr,
  boolean: Ae,
  date: Ra,
  effect: Er,
  enum: Ka,
  function: ja,
  instanceof: Ma,
  intersection: Va,
  lazy: qa,
  literal: zt,
  map: Za,
  nativeEnum: Rn,
  never: Ba,
  null: Wi,
  nullable: $a,
  number: fe,
  object: he,
  oboolean: Xa,
  onumber: Ja,
  optional: jr,
  ostring: Wa,
  preprocess: qr,
  promise: Ya,
  record: Ga,
  set: Ha,
  strictObject: za,
  string: j,
  transformer: Er,
  tuple: Fa,
  undefined: Da,
  union: Ji,
  unknown: Zn,
  void: Ua,
  ZodIssueCode: be,
  quotelessJson: Ta,
  ZodError: On,
  defaultErrorMap: ji,
  get overrideErrorMap() {
    return qi
  },
  setErrorMap: Ia,
})
const Kr = {
  exports: {},
};
(function (c) {
  var a = (function (h) {
    const p = 1e7
    const d = 7
    const M = 9007199254740992
    const F = J(M)
    const Z = '0123456789abcdefghijklmnopqrstuvwxyz'
    const q = typeof BigInt == 'function'
    function k(t, n, i, r) {
      return typeof t > 'u' ? k[0] : typeof n < 'u' ? +n == 10 && !i ? ae(t) : kn(t, n, i, r) : ae(t)
    }
    function O(t, n) {
      this.value = t,
      this.sign = n,
      this.isSmall = !1
    }
    O.prototype = Object.create(k.prototype)
    function B(t) {
      this.value = t,
      this.sign = t < 0,
      this.isSmall = !0
    }
    B.prototype = Object.create(k.prototype)
    function C(t) {
      this.value = t
    }
    C.prototype = Object.create(k.prototype)
    function Q(t) {
      return -M < t && t < M
    }
    function J(t) {
      return t < 1e7 ? [t] : t < 1e14 ? [t % 1e7, Math.floor(t / 1e7)] : [t % 1e7, Math.floor(t / 1e7) % 1e7, Math.floor(t / 1e14)]
    }
    function ne(t) {
      Y(t)
      const n = t.length
      if (n < 4 && kt(t, F) < 0) {
        switch (n) {
          case 0:
            return 0
          case 1:
            return t[0]
          case 2:
            return t[0] + t[1] * p
          default:
            return t[0] + (t[1] + t[2] * p) * p
        }
      }
      return t
    }
    function Y(t) {
      for (var n = t.length; t[--n] === 0;)
        ;
      t.length = n + 1
    }
    function Me(t) {
      for (var n = new Array(t), i = -1; ++i < t;)
        n[i] = 0
      return n
    }
    function le(t) {
      return t > 0 ? Math.floor(t) : Math.ceil(t)
    }
    function Se(t, n) {
      const i = t.length; const r = n.length; const s = new Array(i); let u = 0; const o = p; let l; let f
      for (f = 0; f < r; f++) {
        l = t[f] + n[f] + u,
        u = l >= o ? 1 : 0,
        s[f] = l - u * o
      }
      for (; f < i;) {
        l = t[f] + u,
        u = l === o ? 1 : 0,
        s[f++] = l - u * o
      }
      return u > 0 && s.push(u),
      s
    }
    function ye(t, n) {
      return t.length >= n.length ? Se(t, n) : Se(n, t)
    }
    function oe(t, n) {
      const i = t.length; const r = new Array(i); const s = p; let u; let o
      for (o = 0; o < i; o++) {
        u = t[o] - s + n,
        n = Math.floor(u / s),
        r[o] = u - n * s,
        n += 1
      }
      for (; n > 0;) {
        r[o++] = n % s,
        n = Math.floor(n / s)
      }
      return r
    }
    O.prototype.add = function (t) {
      const n = ae(t)
      if (this.sign !== n.sign)
        return this.subtract(n.negate())
      const i = this.value
      const r = n.value
      return n.isSmall ? new O(oe(i, Math.abs(r)), this.sign) : new O(ye(i, r), this.sign)
    }
    ,
    O.prototype.plus = O.prototype.add,
    B.prototype.add = function (t) {
      const n = ae(t)
      const i = this.value
      if (i < 0 !== n.sign)
        return this.subtract(n.negate())
      let r = n.value
      if (n.isSmall) {
        if (Q(i + r))
          return new B(i + r)
        r = J(Math.abs(r))
      }
      return new O(oe(r, Math.abs(i)), i < 0)
    }
    ,
    B.prototype.plus = B.prototype.add,
    C.prototype.add = function (t) {
      return new C(this.value + ae(t).value)
    }
    ,
    C.prototype.plus = C.prototype.add
    function We(t, n) {
      const i = t.length; const r = n.length; const s = new Array(i); let u = 0; const o = p; let l; let f
      for (l = 0; l < r; l++) {
        f = t[l] - u - n[l],
        f < 0
          ? (f += o,
            u = 1)
          : u = 0,
        s[l] = f
      }
      for (l = r; l < i; l++) {
        if (f = t[l] - u,
        f < 0) { f += o }
        else {
          s[l++] = f
          break
        }
        s[l] = f
      }
      for (; l < i; l++)
        s[l] = t[l]
      return Y(s),
      s
    }
    function ct(t, n, i) {
      let r
      return kt(t, n) >= 0
        ? r = We(t, n)
        : (r = We(n, t),
          i = !i),
      r = ne(r),
      typeof r == 'number'
        ? (i && (r = -r),
          new B(r))
        : new O(r, i)
    }
    function je(t, n, i) {
      const r = t.length; let s = new Array(r); let u = -n; const o = p; let l; let f
      for (l = 0; l < r; l++) {
        f = t[l] + u,
        u = Math.floor(f / o),
        f %= o,
        s[l] = f < 0 ? f + o : f
      }
      return s = ne(s),
      typeof s == 'number'
        ? (i && (s = -s),
          new B(s))
        : new O(s, i)
    }
    O.prototype.subtract = function (t) {
      const n = ae(t)
      if (this.sign !== n.sign)
        return this.add(n.negate())
      const i = this.value
      const r = n.value
      return n.isSmall ? je(i, Math.abs(r), this.sign) : ct(i, r, this.sign)
    }
    ,
    O.prototype.minus = O.prototype.subtract,
    B.prototype.subtract = function (t) {
      const n = ae(t)
      const i = this.value
      if (i < 0 !== n.sign)
        return this.add(n.negate())
      const r = n.value
      return n.isSmall ? new B(i - r) : je(r, Math.abs(i), i >= 0)
    }
    ,
    B.prototype.minus = B.prototype.subtract,
    C.prototype.subtract = function (t) {
      return new C(this.value - ae(t).value)
    }
    ,
    C.prototype.minus = C.prototype.subtract,
    O.prototype.negate = function () {
      return new O(this.value, !this.sign)
    }
    ,
    B.prototype.negate = function () {
      const t = this.sign
      const n = new B(-this.value)
      return n.sign = !t,
      n
    }
    ,
    C.prototype.negate = function () {
      return new C(-this.value)
    }
    ,
    O.prototype.abs = function () {
      return new O(this.value, !1)
    }
    ,
    B.prototype.abs = function () {
      return new B(Math.abs(this.value))
    }
    ,
    C.prototype.abs = function () {
      return new C(this.value >= 0 ? this.value : -this.value)
    }

    function Pt(t, n) {
      const i = t.length; const r = n.length; const s = i + r; const u = Me(s); const o = p; let l; let f; let g; let y; let _
      for (g = 0; g < i; ++g) {
        y = t[g]
        for (let v = 0; v < r; ++v) {
          _ = n[v],
          l = y * _ + u[g + v],
          f = Math.floor(l / o),
          u[g + v] = l - f * o,
          u[g + v + 1] += f
        }
      }
      return Y(u),
      u
    }
    function ft(t, n) {
      const i = t.length; const r = new Array(i); const s = p; let u = 0; let o; let l
      for (l = 0; l < i; l++) {
        o = t[l] * n + u,
        u = Math.floor(o / s),
        r[l] = o - u * s
      }
      for (; u > 0;) {
        r[l++] = u % s,
        u = Math.floor(u / s)
      }
      return r
    }
    function dt(t, n) {
      for (var i = []; n-- > 0;)
        i.push(0)
      return i.concat(t)
    }
    function qe(t, n) {
      let i = Math.max(t.length, n.length)
      if (i <= 30)
        return Pt(t, n)
      i = Math.ceil(i / 2)
      const r = t.slice(i)
      const s = t.slice(0, i)
      const u = n.slice(i)
      const o = n.slice(0, i)
      const l = qe(s, o)
      const f = qe(r, u)
      const g = qe(ye(s, r), ye(o, u))
      const y = ye(ye(l, dt(We(We(g, l), f), i)), dt(f, 2 * i))
      return Y(y),
      y
    }
    function pe(t, n) {
      return -0.012 * t - 0.012 * n + 15e-6 * t * n > 0
    }
    O.prototype.multiply = function (t) {
      const n = ae(t); const i = this.value; let r = n.value; const s = this.sign !== n.sign; let u
      if (n.isSmall) {
        if (r === 0)
          return k[0]
        if (r === 1)
          return this
        if (r === -1)
          return this.negate()
        if (u = Math.abs(r),
        u < p)
          return new O(ft(i, u), s)
        r = J(u)
      }
      return pe(i.length, r.length) ? new O(qe(i, r), s) : new O(Pt(i, r), s)
    }
    ,
    O.prototype.times = O.prototype.multiply
    function Vt(t, n, i) {
      return t < p ? new O(ft(n, t), i) : new O(Pt(n, J(t)), i)
    }
    B.prototype._multiplyBySmall = function (t) {
      return Q(t.value * this.value) ? new B(t.value * this.value) : Vt(Math.abs(t.value), J(Math.abs(this.value)), this.sign !== t.sign)
    }
    ,
    O.prototype._multiplyBySmall = function (t) {
      return t.value === 0 ? k[0] : t.value === 1 ? this : t.value === -1 ? this.negate() : Vt(Math.abs(t.value), this.value, this.sign !== t.sign)
    }
    ,
    B.prototype.multiply = function (t) {
      return ae(t)._multiplyBySmall(this)
    }
    ,
    B.prototype.times = B.prototype.multiply,
    C.prototype.multiply = function (t) {
      return new C(this.value * ae(t).value)
    }
    ,
    C.prototype.times = C.prototype.multiply
    function re(t) {
      const n = t.length; const i = Me(n + n); const r = p; let s; let u; let o; let l; let f
      for (o = 0; o < n; o++) {
        l = t[o],
        u = 0 - l * l
        for (let g = o; g < n; g++) {
          f = t[g],
          s = 2 * (l * f) + i[o + g] + u,
          u = Math.floor(s / r),
          i[o + g] = s - u * r
        }
        i[o + n] = u
      }
      return Y(i),
      i
    }
    O.prototype.square = function () {
      return new O(re(this.value), !1)
    }
    ,
    B.prototype.square = function () {
      const t = this.value * this.value
      return Q(t) ? new B(t) : new O(re(J(Math.abs(this.value))), !1)
    }
    ,
    C.prototype.square = function (t) {
      return new C(this.value * this.value)
    }

    function Ot(t, n) {
      const i = t.length; const r = n.length; const s = p; const u = Me(n.length); let o = n[r - 1]; const l = Math.ceil(s / (2 * o)); let f = ft(t, l); const g = ft(n, l); let y; let _; let v; let b; let T; let x; let S
      for (f.length <= i && f.push(0),
      g.push(0),
      o = g[r - 1],
      _ = i - r; _ >= 0; _--) {
        for (y = s - 1,
        f[_ + r] !== o && (y = Math.floor((f[_ + r] * s + f[_ + r - 1]) / o)),
        v = 0,
        b = 0,
        x = g.length,
        T = 0; T < x; T++) {
          v += y * g[T],
          S = Math.floor(v / s),
          b += f[_ + T] - (v - S * s),
          v = S,
          b < 0
            ? (f[_ + T] = b + s,
              b = -1)
            : (f[_ + T] = b,
              b = 0)
        }
        for (; b !== 0;) {
          for (y -= 1,
          v = 0,
          T = 0; T < x; T++) {
            v += f[_ + T] - s + g[T],
            v < 0
              ? (f[_ + T] = v + s,
                v = 0)
              : (f[_ + T] = v,
                v = 1)
          }
          b += v
        }
        u[_] = y
      }
      return f = ke(f, l)[0],
      [ne(u), ne(f)]
    }
    function Ft(t, n) {
      for (var i = t.length, r = n.length, s = [], u = [], o = p, l, f, g, y, _; i;) {
        if (u.unshift(t[--i]),
        Y(u),
        kt(u, n) < 0) {
          s.push(0)
          continue
        }
        f = u.length,
        g = u[f - 1] * o + u[f - 2],
        y = n[r - 1] * o + n[r - 2],
        f > r && (g = (g + 1) * o),
        l = Math.ceil(g / y)
        do {
          if (_ = ft(n, l),
          kt(_, u) <= 0)
            break
          l--
        } while (l)
        s.push(l),
        u = We(u, _)
      }
      return s.reverse(),
      [ne(s), ne(u)]
    }
    function ke(t, n) {
      const i = t.length; const r = Me(i); const s = p; let u; let o; let l; let f
      for (l = 0,
      u = i - 1; u >= 0; --u) {
        f = l * s + t[u],
        o = le(f / n),
        l = f - o * n,
        r[u] = o | 0
      }
      return [r, l | 0]
    }
    function ot(t, n) {
      let i; const r = ae(n)
      if (q)
        return [new C(t.value / r.value), new C(t.value % r.value)]
      const s = t.value; let u = r.value; let o
      if (u === 0)
        throw new Error('Cannot divide by zero')
      if (t.isSmall)
        return r.isSmall ? [new B(le(s / u)), new B(s % u)] : [k[0], t]
      if (r.isSmall) {
        if (u === 1)
          return [t, k[0]]
        if (u == -1)
          return [t.negate(), k[0]]
        const l = Math.abs(u)
        if (l < p) {
          i = ke(s, l),
          o = ne(i[0])
          let f = i[1]
          return t.sign && (f = -f),
          typeof o == 'number'
            ? (t.sign !== r.sign && (o = -o),
              [new B(o), new B(f)])
            : [new O(o, t.sign !== r.sign), new B(f)]
        }
        u = J(l)
      }
      const g = kt(s, u)
      if (g === -1)
        return [k[0], t]
      if (g === 0)
        return [k[t.sign === r.sign ? 1 : -1], k[0]]
      s.length + u.length <= 200 ? i = Ot(s, u) : i = Ft(s, u),
      o = i[0]
      const y = t.sign !== r.sign
      let _ = i[1]
      const v = t.sign
      return typeof o == 'number'
        ? (y && (o = -o),
          o = new B(o))
        : o = new O(o, y),
      typeof _ == 'number'
        ? (v && (_ = -_),
          _ = new B(_))
        : _ = new O(_, v),
      [o, _]
    }
    O.prototype.divmod = function (t) {
      const n = ot(this, t)
      return {
        quotient: n[0],
        remainder: n[1],
      }
    }
    ,
    C.prototype.divmod = B.prototype.divmod = O.prototype.divmod,
    O.prototype.divide = function (t) {
      return ot(this, t)[0]
    }
    ,
    C.prototype.over = C.prototype.divide = function (t) {
      return new C(this.value / ae(t).value)
    }
    ,
    B.prototype.over = B.prototype.divide = O.prototype.over = O.prototype.divide,
    O.prototype.mod = function (t) {
      return ot(this, t)[1]
    }
    ,
    C.prototype.mod = C.prototype.remainder = function (t) {
      return new C(this.value % ae(t).value)
    }
    ,
    B.prototype.remainder = B.prototype.mod = O.prototype.remainder = O.prototype.mod,
    O.prototype.pow = function (t) {
      const n = ae(t); const i = this.value; let r = n.value; let s; let u; let o
      if (r === 0)
        return k[1]
      if (i === 0)
        return k[0]
      if (i === 1)
        return k[1]
      if (i === -1)
        return n.isEven() ? k[1] : k[-1]
      if (n.sign)
        return k[0]
      if (!n.isSmall)
        throw new Error(`The exponent ${n.toString()} is too large.`)
      if (this.isSmall && Q(s = i ** r))
        return new B(le(s))
      for (u = this,
      o = k[1]; r & !0 && (o = o.times(u),
        --r),
        r !== 0;) {
        r /= 2,
        u = u.square()
      }
      return o
    }
    ,
    B.prototype.pow = O.prototype.pow,
    C.prototype.pow = function (t) {
      const n = ae(t)
      const i = this.value
      let r = n.value
      const s = BigInt(0)
      const u = BigInt(1)
      const o = BigInt(2)
      if (r === s)
        return k[1]
      if (i === s)
        return k[0]
      if (i === u)
        return k[1]
      if (i === BigInt(-1))
        return n.isEven() ? k[1] : k[-1]
      if (n.isNegative())
        return new C(s)
      for (var l = this, f = k[1]; (r & u) === u && (f = f.times(l),
      --r),
      r !== s;) {
        r /= o,
        l = l.square()
      }
      return f
    }
    ,
    O.prototype.modPow = function (t, n) {
      if (t = ae(t),
      n = ae(n),
      n.isZero())
        throw new Error('Cannot take modPow with modulus 0')
      let i = k[1]
      let r = this.mod(n)
      for (t.isNegative() && (t = t.multiply(k[-1]),
      r = r.modInv(n)); t.isPositive();) {
        if (r.isZero())
          return k[0]
        t.isOdd() && (i = i.multiply(r).mod(n)),
        t = t.divide(2),
        r = r.square().mod(n)
      }
      return i
    }
    ,
    C.prototype.modPow = B.prototype.modPow = O.prototype.modPow
    function kt(t, n) {
      if (t.length !== n.length)
        return t.length > n.length ? 1 : -1
      for (let i = t.length - 1; i >= 0; i--) {
        if (t[i] !== n[i])
          return t[i] > n[i] ? 1 : -1
      }
      return 0
    }
    O.prototype.compareAbs = function (t) {
      const n = ae(t)
      const i = this.value
      const r = n.value
      return n.isSmall ? 1 : kt(i, r)
    }
    ,
    B.prototype.compareAbs = function (t) {
      const n = ae(t)
      const i = Math.abs(this.value)
      let r = n.value
      return n.isSmall
        ? (r = Math.abs(r),
          i === r ? 0 : i > r ? 1 : -1)
        : -1
    }
    ,
    C.prototype.compareAbs = function (t) {
      let n = this.value
      let i = ae(t).value
      return n = n >= 0 ? n : -n,
      i = i >= 0 ? i : -i,
      n === i ? 0 : n > i ? 1 : -1
    }
    ,
    O.prototype.compare = function (t) {
      if (t === 1 / 0)
        return -1
      if (t === -1 / 0)
        return 1
      const n = ae(t)
      const i = this.value
      const r = n.value
      return this.sign !== n.sign ? n.sign ? 1 : -1 : n.isSmall ? this.sign ? -1 : 1 : kt(i, r) * (this.sign ? -1 : 1)
    }
    ,
    O.prototype.compareTo = O.prototype.compare,
    B.prototype.compare = function (t) {
      if (t === 1 / 0)
        return -1
      if (t === -1 / 0)
        return 1
      const n = ae(t)
      const i = this.value
      const r = n.value
      return n.isSmall ? i == r ? 0 : i > r ? 1 : -1 : i < 0 !== n.sign ? i < 0 ? -1 : 1 : i < 0 ? 1 : -1
    }
    ,
    B.prototype.compareTo = B.prototype.compare,
    C.prototype.compare = function (t) {
      if (t === 1 / 0)
        return -1
      if (t === -1 / 0)
        return 1
      const n = this.value
      const i = ae(t).value
      return n === i ? 0 : n > i ? 1 : -1
    }
    ,
    C.prototype.compareTo = C.prototype.compare,
    O.prototype.equals = function (t) {
      return this.compare(t) === 0
    }
    ,
    C.prototype.eq = C.prototype.equals = B.prototype.eq = B.prototype.equals = O.prototype.eq = O.prototype.equals,
    O.prototype.notEquals = function (t) {
      return this.compare(t) !== 0
    }
    ,
    C.prototype.neq = C.prototype.notEquals = B.prototype.neq = B.prototype.notEquals = O.prototype.neq = O.prototype.notEquals,
    O.prototype.greater = function (t) {
      return this.compare(t) > 0
    }
    ,
    C.prototype.gt = C.prototype.greater = B.prototype.gt = B.prototype.greater = O.prototype.gt = O.prototype.greater,
    O.prototype.lesser = function (t) {
      return this.compare(t) < 0
    }
    ,
    C.prototype.lt = C.prototype.lesser = B.prototype.lt = B.prototype.lesser = O.prototype.lt = O.prototype.lesser,
    O.prototype.greaterOrEquals = function (t) {
      return this.compare(t) >= 0
    }
    ,
    C.prototype.geq = C.prototype.greaterOrEquals = B.prototype.geq = B.prototype.greaterOrEquals = O.prototype.geq = O.prototype.greaterOrEquals,
    O.prototype.lesserOrEquals = function (t) {
      return this.compare(t) <= 0
    }
    ,
    C.prototype.leq = C.prototype.lesserOrEquals = B.prototype.leq = B.prototype.lesserOrEquals = O.prototype.leq = O.prototype.lesserOrEquals,
    O.prototype.isEven = function () {
      return (this.value[0] & 1) === 0
    }
    ,
    B.prototype.isEven = function () {
      return (this.value & 1) === 0
    }
    ,
    C.prototype.isEven = function () {
      return (this.value & BigInt(1)) === BigInt(0)
    }
    ,
    O.prototype.isOdd = function () {
      return (this.value[0] & 1) === 1
    }
    ,
    B.prototype.isOdd = function () {
      return (this.value & 1) === 1
    }
    ,
    C.prototype.isOdd = function () {
      return (this.value & BigInt(1)) === BigInt(1)
    }
    ,
    O.prototype.isPositive = function () {
      return !this.sign
    }
    ,
    B.prototype.isPositive = function () {
      return this.value > 0
    }
    ,
    C.prototype.isPositive = B.prototype.isPositive,
    O.prototype.isNegative = function () {
      return this.sign
    }
    ,
    B.prototype.isNegative = function () {
      return this.value < 0
    }
    ,
    C.prototype.isNegative = B.prototype.isNegative,
    O.prototype.isUnit = function () {
      return !1
    }
    ,
    B.prototype.isUnit = function () {
      return Math.abs(this.value) === 1
    }
    ,
    C.prototype.isUnit = function () {
      return this.abs().value === BigInt(1)
    }
    ,
    O.prototype.isZero = function () {
      return !1
    }
    ,
    B.prototype.isZero = function () {
      return this.value === 0
    }
    ,
    C.prototype.isZero = function () {
      return this.value === BigInt(0)
    }
    ,
    O.prototype.isDivisibleBy = function (t) {
      const n = ae(t)
      return n.isZero() ? !1 : n.isUnit() ? !0 : n.compareAbs(2) === 0 ? this.isEven() : this.mod(n).isZero()
    }
    ,
    C.prototype.isDivisibleBy = B.prototype.isDivisibleBy = O.prototype.isDivisibleBy
    function yn(t) {
      const n = t.abs()
      if (n.isUnit())
        return !1
      if (n.equals(2) || n.equals(3) || n.equals(5))
        return !0
      if (n.isEven() || n.isDivisibleBy(3) || n.isDivisibleBy(5))
        return !1
      if (n.lesser(49))
        return !0
    }
    function Gt(t, n) {
      for (var i = t.prev(), r = i, s = 0, u, o, l; r.isEven();) {
        r = r.divide(2),
        s++
      }
      e: for (o = 0; o < n.length; o++) {
        if (!t.lesser(n[o]) && (l = a(n[o]).modPow(r, t),
        !(l.isUnit() || l.equals(i)))) {
          for (u = s - 1; u != 0; u--) {
            if (l = l.square().mod(t),
            l.isUnit())
              return !1
            if (l.equals(i))
              continue e
          }
          return !1
        }
      }
      return !0
    }
    O.prototype.isPrime = function (t) {
      const n = yn(this)
      if (n !== h)
        return n
      const i = this.abs()
      const r = i.bitLength()
      if (r <= 64)
        return Gt(i, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37])
      for (var s = Math.log(2) * r.toJSNumber(), u = Math.ceil(t === !0 ? 2 * s ** 2 : s), o = [], l = 0; l < u; l++)
        o.push(a(l + 2))
      return Gt(i, o)
    }
    ,
    C.prototype.isPrime = B.prototype.isPrime = O.prototype.isPrime,
    O.prototype.isProbablePrime = function (t, n) {
      const i = yn(this)
      if (i !== h)
        return i
      for (var r = this.abs(), s = t === h ? 5 : t, u = [], o = 0; o < s; o++)
        u.push(a.randBetween(2, r.minus(2), n))
      return Gt(r, u)
    }
    ,
    C.prototype.isProbablePrime = B.prototype.isProbablePrime = O.prototype.isProbablePrime,
    O.prototype.modInv = function (t) {
      for (var n = a.zero, i = a.one, r = ae(t), s = this.abs(), u, o, l; !s.isZero();) {
        u = r.divide(s),
        o = n,
        l = r,
        n = i,
        r = s,
        i = o.subtract(u.multiply(i)),
        s = l.subtract(u.multiply(s))
      }
      if (!r.isUnit())
        throw new Error(`${this.toString()} and ${t.toString()} are not co-prime`)
      return n.compare(0) === -1 && (n = n.add(t)),
      this.isNegative() ? n.negate() : n
    }
    ,
    C.prototype.modInv = B.prototype.modInv = O.prototype.modInv,
    O.prototype.next = function () {
      const t = this.value
      return this.sign ? je(t, 1, this.sign) : new O(oe(t, 1), this.sign)
    }
    ,
    B.prototype.next = function () {
      const t = this.value
      return t + 1 < M ? new B(t + 1) : new O(F, !1)
    }
    ,
    C.prototype.next = function () {
      return new C(this.value + BigInt(1))
    }
    ,
    O.prototype.prev = function () {
      const t = this.value
      return this.sign ? new O(oe(t, 1), !0) : je(t, 1, this.sign)
    }
    ,
    B.prototype.prev = function () {
      const t = this.value
      return t - 1 > -M ? new B(t - 1) : new O(F, !0)
    }
    ,
    C.prototype.prev = function () {
      return new C(this.value - BigInt(1))
    }

    for (var Mt = [1]; 2 * Mt[Mt.length - 1] <= p;)
      Mt.push(2 * Mt[Mt.length - 1])
    const Xe = Mt.length
    const xt = Mt[Xe - 1]
    function en(t) {
      return Math.abs(t) <= p
    }
    O.prototype.shiftLeft = function (t) {
      let n = ae(t).toJSNumber()
      if (!en(n))
        throw new Error(`${String(n)} is too large for shifting.`)
      if (n < 0)
        return this.shiftRight(-n)
      let i = this
      if (i.isZero())
        return i
      for (; n >= Xe;) {
        i = i.multiply(xt),
        n -= Xe - 1
      }
      return i.multiply(Mt[n])
    }
    ,
    C.prototype.shiftLeft = B.prototype.shiftLeft = O.prototype.shiftLeft,
    O.prototype.shiftRight = function (t) {
      let n; let i = ae(t).toJSNumber()
      if (!en(i))
        throw new Error(`${String(i)} is too large for shifting.`)
      if (i < 0)
        return this.shiftLeft(-i)
      for (var r = this; i >= Xe;) {
        if (r.isZero() || r.isNegative() && r.isUnit())
          return r
        n = ot(r, xt),
        r = n[1].isNegative() ? n[0].prev() : n[0],
        i -= Xe - 1
      }
      return n = ot(r, Mt[i]),
      n[1].isNegative() ? n[0].prev() : n[0]
    }
    ,
    C.prototype.shiftRight = B.prototype.shiftRight = O.prototype.shiftRight
    function Kt(t, n, i) {
      n = ae(n)
      for (var r = t.isNegative(), s = n.isNegative(), u = r ? t.not() : t, o = s ? n.not() : n, l = 0, f = 0, g = null, y = null, _ = []; !u.isZero() || !o.isZero();) {
        g = ot(u, xt),
        l = g[1].toJSNumber(),
        r && (l = xt - 1 - l),
        y = ot(o, xt),
        f = y[1].toJSNumber(),
        s && (f = xt - 1 - f),
        u = g[0],
        o = y[0],
        _.push(i(l, f))
      }
      for (var v = i(r ? 1 : 0, s ? 1 : 0) !== 0 ? a(-1) : a(0), b = _.length - 1; b >= 0; b -= 1)
        v = v.multiply(xt).add(a(_[b]))
      return v
    }
    O.prototype.not = function () {
      return this.negate().prev()
    }
    ,
    C.prototype.not = B.prototype.not = O.prototype.not,
    O.prototype.and = function (t) {
      return Kt(this, t, (n, i) => {
        return n & i
      })
    }
    ,
    C.prototype.and = B.prototype.and = O.prototype.and,
    O.prototype.or = function (t) {
      return Kt(this, t, (n, i) => {
        return n | i
      })
    }
    ,
    C.prototype.or = B.prototype.or = O.prototype.or,
    O.prototype.xor = function (t) {
      return Kt(this, t, (n, i) => {
        return n ^ i
      })
    }
    ,
    C.prototype.xor = B.prototype.xor = O.prototype.xor
    const Ce = 1 << 30
    const tt = (p & -p) * (p & -p) | Ce
    function Ke(t) {
      const n = t.value
      const i = typeof n == 'number' ? n | Ce : typeof n == 'bigint' ? n | BigInt(Ce) : n[0] + n[1] * p | tt
      return i & -i
    }
    function Rt(t, n) {
      if (n.compareTo(t) <= 0) {
        const i = Rt(t, n.square(n))
        const r = i.p
        const s = i.e
        const u = r.multiply(n)
        return u.compareTo(t) <= 0
          ? {
              p: u,
              e: s * 2 + 1,
            }
          : {
              p: r,
              e: s * 2,
            }
      }
      return {
        p: a(1),
        e: 0,
      }
    }
    O.prototype.bitLength = function () {
      let t = this
      return t.compareTo(a(0)) < 0 && (t = t.negate().subtract(a(1))),
      t.compareTo(a(0)) === 0 ? a(0) : a(Rt(t, a(2)).e).add(a(1))
    }
    ,
    C.prototype.bitLength = B.prototype.bitLength = O.prototype.bitLength
    function Zt(t, n) {
      return t = ae(t),
      n = ae(n),
      t.greater(n) ? t : n
    }
    function tn(t, n) {
      return t = ae(t),
      n = ae(n),
      t.lesser(n) ? t : n
    }
    function cn(t, n) {
      if (t = ae(t).abs(),
      n = ae(n).abs(),
      t.equals(n))
        return t
      if (t.isZero())
        return n
      if (n.isZero())
        return t
      for (var i = k[1], r, s; t.isEven() && n.isEven();) {
        r = tn(Ke(t), Ke(n)),
        t = t.divide(r),
        n = n.divide(r),
        i = i.multiply(r)
      }
      for (; t.isEven();)
        t = t.divide(Ke(t))
      do {
        for (; n.isEven();)
          n = n.divide(Ke(n))
        t.greater(n) && (s = n,
        n = t,
        t = s),
        n = n.subtract(t)
      } while (!n.isZero())
      return i.isUnit() ? t : t.multiply(i)
    }
    function wn(t, n) {
      return t = ae(t).abs(),
      n = ae(n).abs(),
      t.divide(cn(t, n)).multiply(n)
    }
    function bn(t, n, i) {
      t = ae(t),
      n = ae(n)
      const r = i || Math.random
      const s = tn(t, n)
      const u = Zt(t, n)
      const o = u.subtract(s).add(1)
      if (o.isSmall)
        return s.add(Math.floor(r() * o))
      for (var l = Je(o, p).value, f = [], g = !0, y = 0; y < l.length; y++) {
        const _ = g ? l[y] : p
        const v = le(r() * _)
        f.push(v),
        v < _ && (g = !1)
      }
      return s.add(k.fromArray(f, p, !1))
    }
    var kn = function (t, n, i, r) {
      i = i || Z,
      t = String(t),
      r || (t = t.toLowerCase(),
      i = i.toLowerCase())
      const s = t.length; let u; const o = Math.abs(n); const l = {}
      for (u = 0; u < i.length; u++)
        l[i[u]] = u
      for (u = 0; u < s; u++) {
        var f = t[u]
        if (f !== '-' && f in l && l[f] >= o) {
          if (f === '1' && o === 1)
            continue
          throw new Error(`${f} is not a valid digit in base ${n}.`)
        }
      }
      n = ae(n)
      const g = []
      const y = t[0] === '-'
      for (u = y ? 1 : 0; u < t.length; u++) {
        var f = t[u]
        if (f in l) { g.push(ae(l[f])) }
        else if (f === '<') {
          const _ = u
          do
            u++
          while (t[u] !== '>' && u < t.length)
          g.push(ae(t.slice(_ + 1, u)))
        }
        else { throw new Error(`${f} is not a valid character`) }
      }
      return Sn(g, n, y)
    }
    function Sn(t, n, i) {
      let r = k[0]; let s = k[1]; let u
      for (u = t.length - 1; u >= 0; u--) {
        r = r.add(t[u].times(s)),
        s = s.times(n)
      }
      return i ? r.negate() : r
    }
    function Bn(t, n) {
      return n = n || Z,
      t < n.length ? n[t] : `<${t}>`
    }
    function Je(t, n) {
      if (n = a(n),
      n.isZero()) {
        if (t.isZero()) {
          return {
            value: [0],
            isNegative: !1,
          }
        }
        throw new Error('Cannot convert nonzero numbers to base 0.')
      }
      if (n.equals(-1)) {
        if (t.isZero()) {
          return {
            value: [0],
            isNegative: !1,
          }
        }
        if (t.isNegative()) {
          return {
            value: [].concat.apply([], Array.apply(null, Array(-t.toJSNumber())).map(Array.prototype.valueOf, [1, 0])),
            isNegative: !1,
          }
        }
        const i = Array.apply(null, Array(t.toJSNumber() - 1)).map(Array.prototype.valueOf, [0, 1])
        return i.unshift([1]),
        {
          value: [].concat.apply([], i),
          isNegative: !1,
        }
      }
      let r = !1
      if (t.isNegative() && n.isPositive() && (r = !0,
      t = t.abs()),
      n.isUnit()) {
        return t.isZero()
          ? {
              value: [0],
              isNegative: !1,
            }
          : {
              value: Array.apply(null, Array(t.toJSNumber())).map(Number.prototype.valueOf, 1),
              isNegative: r,
            }
      }
      for (var s = [], u = t, o; u.isNegative() || u.compareAbs(n) >= 0;) {
        o = u.divmod(n),
        u = o.quotient
        let l = o.remainder
        l.isNegative() && (l = n.minus(l).abs(),
        u = u.next()),
        s.push(l.toJSNumber())
      }
      return s.push(u.toJSNumber()),
      {
        value: s.reverse(),
        isNegative: r,
      }
    }
    function nn(t, n, i) {
      const r = Je(t, n)
      return (r.isNegative ? '-' : '') + r.value.map((s) => {
        return Bn(s, i)
      }).join('')
    }
    O.prototype.toArray = function (t) {
      return Je(this, t)
    }
    ,
    B.prototype.toArray = function (t) {
      return Je(this, t)
    }
    ,
    C.prototype.toArray = function (t) {
      return Je(this, t)
    }
    ,
    O.prototype.toString = function (t, n) {
      if (t === h && (t = 10),
      t !== 10)
        return nn(this, t, n)
      for (var i = this.value, r = i.length, s = String(i[--r]), u = '0000000', o; --r >= 0;) {
        o = String(i[r]),
        s += u.slice(o.length) + o
      }
      const l = this.sign ? '-' : ''
      return l + s
    }
    ,
    B.prototype.toString = function (t, n) {
      return t === h && (t = 10),
      t != 10 ? nn(this, t, n) : String(this.value)
    }
    ,
    C.prototype.toString = B.prototype.toString,
    C.prototype.toJSON = O.prototype.toJSON = B.prototype.toJSON = function () {
      return this.toString()
    }
    ,
    O.prototype.valueOf = function () {
      return parseInt(this.toString(), 10)
    }
    ,
    O.prototype.toJSNumber = O.prototype.valueOf,
    B.prototype.valueOf = function () {
      return this.value
    }
    ,
    B.prototype.toJSNumber = B.prototype.valueOf,
    C.prototype.valueOf = C.prototype.toJSNumber = function () {
      return parseInt(this.toString(), 10)
    }

    function Qe(t) {
      if (Q(+t)) {
        const n = +t
        if (n === le(n))
          return q ? new C(BigInt(n)) : new B(n)
        throw new Error(`Invalid integer: ${t}`)
      }
      const i = t[0] === '-'
      i && (t = t.slice(1))
      const r = t.split(/e/i)
      if (r.length > 2)
        throw new Error(`Invalid integer: ${r.join('e')}`)
      if (r.length === 2) {
        let s = r[1]
        if (s[0] === '+' && (s = s.slice(1)),
        s = +s,
        s !== le(s) || !Q(s))
          throw new Error(`Invalid integer: ${s} is not a valid exponent.`)
        let u = r[0]
        const o = u.indexOf('.')
        if (o >= 0 && (s -= u.length - o - 1,
        u = u.slice(0, o) + u.slice(o + 1)),
        s < 0)
          throw new Error('Cannot include negative exponent part for integers')
        u += new Array(s + 1).join('0'),
        t = u
      }
      const l = /^([0-9][0-9]*)$/.test(t)
      if (!l)
        throw new Error(`Invalid integer: ${t}`)
      if (q)
        return new C(BigInt(i ? `-${t}` : t))
      for (var f = [], g = t.length, y = d, _ = g - y; g > 0;) {
        f.push(+t.slice(_, g)),
        _ -= y,
        _ < 0 && (_ = 0),
        g -= y
      }
      return Y(f),
      new O(f, i)
    }
    function En(t) {
      if (q)
        return new C(BigInt(t))
      if (Q(t)) {
        if (t !== le(t))
          throw new Error(`${t} is not an integer.`)
        return new B(t)
      }
      return Qe(t.toString())
    }
    function ae(t) {
      return typeof t == 'number' ? En(t) : typeof t == 'string' ? Qe(t) : typeof t == 'bigint' ? new C(t) : t
    }
    for (let e = 0; e < 1e3; e++) {
      k[e] = ae(e),
      e > 0 && (k[-e] = ae(-e))
    }
    return k.one = k[1],
    k.zero = k[0],
    k.minusOne = k[-1],
    k.max = Zt,
    k.min = tn,
    k.gcd = cn,
    k.lcm = wn,
    k.isInstance = function (t) {
      return t instanceof O || t instanceof B || t instanceof C
    }
    ,
    k.randBetween = bn,
    k.fromArray = function (t, n, i) {
      return Sn(t.map(ae), ae(n || 10), i)
    }
    ,
    k
  }())
  c.hasOwnProperty('exports') && (c.exports = a)
}
)(Kr)
const Qa = Kr.exports
const Yr = 64
const Vi = 16
const an = Yr / Vi
function eo() {
  try {
    return !0
  }
  catch {
    return !1
  }
}
function to(c, a, h) {
  let p = 0
  for (let d = 0; d < h; d++) {
    const M = c[a + d]
    if (M === void 0)
      break
    p += M * 16 ** d
  }
  return p
}
function $r(c) {
  const a = []
  for (let h = 0; h < c.length; h++) {
    let p = Number(c[h])
    for (let d = 0; p || d < a.length; d++) {
      p += (a[d] || 0) * 10,
      a[d] = p % 16,
      p = (p - a[d]) / 16
    }
  }
  return a
}
function no(c) {
  const a = $r(c)
  const h = Array(an)
  for (let p = 0; p < an; p++)
    h[an - 1 - p] = to(a, p * an, an)
  return h
}
const Hn = class c {
  constructor(a, h) {
    this.parts = a,
    this.str = h
  }

  static fromString(a) {
    return new c(no(a), a)
  }

  static fromBit(a) {
    const h = Array(an)
    const p = Math.floor(a / Vi)
    for (let d = 0; d < an; d++)
      h[an - 1 - d] = d === p ? 1 << a - p * Vi : 0
    return new c(h)
  }

  and({ parts: a }) {
    return new c(this.parts.map((h, p) => h & a[p]))
  }

  or({ parts: a }) {
    return new c(this.parts.map((h, p) => h | a[p]))
  }

  xor({ parts: a }) {
    return new c(this.parts.map((h, p) => h ^ a[p]))
  }

  not() {
    return new c(this.parts.map(a => ~a))
  }

  equals({ parts: a }) {
    return this.parts.every((h, p) => h === a[p])
  }

  toString() {
    if (this.str != null)
      return this.str
    const a = new Array(Yr / 4)
    return this.parts.forEach((h, p) => {
      const d = $r(h.toString())
      for (let M = 0; M < 4; M++)
        a[M + p * 4] = d[4 - 1 - M] || 0
    },
    ),
    this.str = Qa.fromArray(a, 16).toString()
  }

  toJSON() {
    return this.toString()
  }
}
const ln = eo()
ln && BigInt.prototype.toJSON == null && (BigInt.prototype.toJSON = function () {
  return this.toString()
}
)
const si = {}
const Wr = ln
  ? function (a) {
    return BigInt(a)
  }
  : function (a) {
    return a instanceof Hn
      ? a
      : (typeof a == 'number' && (a = a.toString()),
        si[a] != null || (si[a] = Hn.fromString(a)),
        si[a])
  }
const St = Wr(0)
const gi = ln
  ? function (a = St, h = St) {
    return a & h
  }
  : function (a = St, h = St) {
    return a.and(h)
  }
const Jr = ln
  ? function (a = St, h = St) {
    return a | h
  }
  : function (a = St, h = St) {
    return a.or(h)
  }
const io = ln
  ? function (a = St, h = St) {
    return a ^ h
  }
  : function (a = St, h = St) {
    return a.xor(h)
  }
const ro = ln
  ? function (a = St) {
    return ~a
  }
  : function (a = St) {
    return a.not()
  }
const Xi = ln
  ? function (a, h) {
    return a === h
  }
  : function (a, h) {
    return a == null || h == null ? a == h : a.equals(h)
  }

function so(...c) {
  let a = c[0]
  for (let h = 1; h < c.length; h++)
    a = Jr(a, c[h])
  return a
}
function ao(c, a) {
  return Xi(gi(c, a), a)
}
function oo(c, a) {
  return !Xi(gi(c, a), St)
}
function uo(c, a) {
  return a === St ? c : Jr(c, a)
}
function lo(c, a) {
  return a === St ? c : io(c, gi(c, a))
}
const ho = ln
  ? function (a) {
    return BigInt(1) << BigInt(a)
  }
  : function (a) {
    return Hn.fromBit(a)
  }
const co = {
  combine: so,
  add: uo,
  remove: lo,
  filter: gi,
  invert: ro,
  has: ao,
  hasAny: oo,
  equals: Xi,
  deserialize: Wr,
  getFlag: ho,
}; let ci;
(function (c) {
  c[c.CLOSE_NORMAL = 1e3] = 'CLOSE_NORMAL',
  c[c.CLOSE_UNSUPPORTED = 1003] = 'CLOSE_UNSUPPORTED',
  c[c.CLOSE_ABNORMAL = 1006] = 'CLOSE_ABNORMAL',
  c[c.INVALID_CLIENTID = 4e3] = 'INVALID_CLIENTID',
  c[c.INVALID_ORIGIN = 4001] = 'INVALID_ORIGIN',
  c[c.RATELIMITED = 4002] = 'RATELIMITED',
  c[c.TOKEN_REVOKED = 4003] = 'TOKEN_REVOKED',
  c[c.INVALID_VERSION = 4004] = 'INVALID_VERSION',
  c[c.INVALID_ENCODING = 4005] = 'INVALID_ENCODING'
}
)(ci || (ci = {}))
let jn;
(function (c) {
  c[c.INVALID_PAYLOAD = 4e3] = 'INVALID_PAYLOAD',
  c[c.INVALID_COMMAND = 4002] = 'INVALID_COMMAND',
  c[c.INVALID_EVENT = 4004] = 'INVALID_EVENT',
  c[c.INVALID_PERMISSIONS = 4006] = 'INVALID_PERMISSIONS'
}
)(jn || (jn = {}))
let Fi;
(function (c) {
  c.LANDSCAPE = 'landscape',
  c.PORTRAIT = 'portrait'
}
)(Fi || (Fi = {}))
let gn;
(function (c) {
  c.MOBILE = 'mobile',
  c.DESKTOP = 'desktop'
}
)(gn || (gn = {}))
const ju = Object.freeze({
  CREATE_INSTANT_INVITE: co.getFlag(0),
})
function pt(c) {
  return qr((a) => {
    let h
    const [p] = (h = Object.entries(c).find(([,d]) => d === a)) !== null && h !== void 0 ? h : []
    return a != null && p === void 0 ? c.UNHANDLED : a
  }
  , j().or(fe()))
}
const Xr = 'DISPATCH'; let ge;
(function (c) {
  c.AUTHORIZE = 'AUTHORIZE',
  c.AUTHENTICATE = 'AUTHENTICATE',
  c.GET_GUILDS = 'GET_GUILDS',
  c.GET_GUILD = 'GET_GUILD',
  c.GET_CHANNEL = 'GET_CHANNEL',
  c.GET_CHANNELS = 'GET_CHANNELS',
  c.SET_USER_VOICE_SETTINGS = 'SET_USER_VOICE_SETTINGS',
  c.SELECT_VOICE_CHANNEL = 'SELECT_VOICE_CHANNEL',
  c.GET_SELECTED_VOICE_CHANNEL = 'GET_SELECTED_VOICE_CHANNEL',
  c.SELECT_TEXT_CHANNEL = 'SELECT_TEXT_CHANNEL',
  c.GET_VOICE_SETTINGS = 'GET_VOICE_SETTINGS',
  c.SET_VOICE_SETTINGS = 'SET_VOICE_SETTINGS',
  c.SUBSCRIBE = 'SUBSCRIBE',
  c.UNSUBSCRIBE = 'UNSUBSCRIBE',
  c.CAPTURE_SHORTCUT = 'CAPTURE_SHORTCUT',
  c.SET_CERTIFIED_DEVICES = 'SET_CERTIFIED_DEVICES',
  c.SET_ACTIVITY = 'SET_ACTIVITY',
  c.GET_SKUS = 'GET_SKUS',
  c.GET_ENTITLEMENTS = 'GET_ENTITLEMENTS',
  c.GET_SKUS_EMBEDDED = 'GET_SKUS_EMBEDDED',
  c.GET_ENTITLEMENTS_EMBEDDED = 'GET_ENTITLEMENTS_EMBEDDED',
  c.START_PURCHASE = 'START_PURCHASE',
  c.START_PREMIUM_PURCHASE = 'START_PREMIUM_PURCHASE',
  c.SET_CONFIG = 'SET_CONFIG',
  c.SEND_ANALYTICS_EVENT = 'SEND_ANALYTICS_EVENT',
  c.USER_SETTINGS_GET_LOCALE = 'USER_SETTINGS_GET_LOCALE',
  c.OPEN_EXTERNAL_LINK = 'OPEN_EXTERNAL_LINK',
  c.ENCOURAGE_HW_ACCELERATION = 'ENCOURAGE_HW_ACCELERATION',
  c.CAPTURE_LOG = 'CAPTURE_LOG',
  c.SET_ORIENTATION_LOCK_STATE = 'SET_ORIENTATION_LOCK_STATE',
  c.OPEN_INVITE_DIALOG = 'OPEN_INVITE_DIALOG',
  c.GET_PLATFORM_BEHAVIORS = 'GET_PLATFORM_BEHAVIORS',
  c.GET_CHANNEL_PERMISSIONS = 'GET_CHANNEL_PERMISSIONS',
  c.OPEN_SHARE_MOMENT_DIALOG = 'OPEN_SHARE_MOMENT_DIALOG',
  c.INITIATE_IMAGE_UPLOAD = 'INITIATE_IMAGE_UPLOAD'
}
)(ge || (ge = {}))
const Dn = he({
  cmd: j(),
  data: Zn(),
  evt: Wi(),
  nonce: j(),
}).passthrough()
const Qr = {
  'UNHANDLED': -1,
  'bot': 'bot',
  'rpc': 'rpc',
  'identify': 'identify',
  'connections': 'connections',
  'email': 'email',
  'guilds': 'guilds',
  'guilds.join': 'guilds.join',
  'guilds.members.read': 'guilds.members.read',
  'gdm.join': 'gdm.join',
  'messages.read': 'messages.read',
  'rpc.notifications.read': 'rpc.notifications.read',
  'rpc.voice.write': 'rpc.voice.write',
  'rpc.voice.read': 'rpc.voice.read',
  'rpc.activities.write': 'rpc.activities.write',
  'webhook.incoming': 'webhook.incoming',
  'applications.builds.upload': 'applications.builds.upload',
  'applications.builds.read': 'applications.builds.read',
  'applications.store.update': 'applications.store.update',
  'applications.entitlements': 'applications.entitlements',
  'relationships.read': 'relationships.read',
  'activities.read': 'activities.read',
  'activities.write': 'activities.write',
}
const es = pt(Qr)
const qt = he({
  id: j(),
  username: j(),
  discriminator: j(),
  avatar: j().optional().nullable(),
  publicFlags: fe().optional().nullable(),
})
const vi = he({
  user: qt,
  nick: j().optional().nullable(),
  roles: Be(j()),
  joined_at: j(),
  deaf: Ae(),
  mute: Ae(),
})
const mi = he({
  id: j(),
  name: j().optional().nullable(),
  roles: Be(j()).optional().nullable(),
  user: qt.optional().nullable(),
  require_colons: Ae().optional().nullable(),
  managed: Ae().optional().nullable(),
  animated: Ae().optional().nullable(),
  available: Ae().optional().nullable(),
})
const yi = he({
  mute: Ae(),
  deaf: Ae(),
  self_mute: Ae(),
  self_deaf: Ae(),
  suppress: Ae(),
})
const ts = he({
  mute: Ae(),
  nick: j(),
  user: qt,
  voice_state: yi,
  volume: fe(),
})
const ns = {
  UNHANDLED: -1,
  IDLE: 'idle',
  DND: 'dnd',
  ONLINE: 'online',
  OFFLINE: 'offline',
}
const Un = pt(ns)
const xn = he({
  name: j(),
  type: fe(),
  url: j().optional().nullable(),
  created_at: fe().optional().nullable(),
  timestamps: he({
    start: fe(),
    end: fe(),
  }).partial().optional().nullable(),
  application_id: j().optional().nullable(),
  details: j().optional().nullable(),
  state: j().optional().nullable(),
  emoji: mi.optional().nullable(),
  party: he({
    id: j().optional().nullable(),
    size: Be(fe()).optional().nullable(),
  }).optional().nullable(),
  assets: he({
    large_image: j().nullable(),
    large_text: j().nullable(),
    small_image: j().nullable(),
    small_text: j().nullable(),
  }).partial().optional().nullable(),
  secrets: he({
    join: j(),
    match: j(),
  }).partial().optional().nullable(),
  instance: Ae().optional().nullable(),
  flags: fe().optional().nullable(),
})
const is = {
  UNHANDLED: -1,
  ROLE: 0,
  MEMBER: 1,
}
const rs = he({
  id: j(),
  type: pt(is),
  allow: j(),
  deny: j(),
})
const wi = {
  UNHANDLED: -1,
  DM: 1,
  GROUP_DM: 3,
  GUILD_TEXT: 0,
  GUILD_VOICE: 2,
  GUILD_CATEGORY: 4,
  GUILD_ANNOUNCEMENT: 5,
  GUILD_STORE: 6,
  ANNOUNCEMENT_THREAD: 10,
  PUBLIC_THREAD: 11,
  PRIVATE_THREAD: 12,
  GUILD_STAGE_VOICE: 13,
  GUILD_DIRECTORY: 14,
  GUILD_FORUM: 15,
}
const Qi = he({
  id: j(),
  type: pt(wi),
  guild_id: j().optional().nullable(),
  position: fe().optional().nullable(),
  permission_overwrites: Be(rs).optional().nullable(),
  name: j().optional().nullable(),
  topic: j().optional().nullable(),
  nsfw: Ae().optional().nullable(),
  last_message_id: j().optional().nullable(),
  bitrate: fe().optional().nullable(),
  user_limit: fe().optional().nullable(),
  rate_limit_per_user: fe().optional().nullable(),
  recipients: Be(qt).optional().nullable(),
  icon: j().optional().nullable(),
  owner_id: j().optional().nullable(),
  application_id: j().optional().nullable(),
  parent_id: j().optional().nullable(),
  last_pin_timestamp: j().optional().nullable(),
})
const ss = he({
  user: qt,
  guild_id: j(),
  status: Un,
  activities: Be(xn),
  client_status: he({
    desktop: Un,
    mobile: Un,
    web: Un,
  }).partial(),
})
const as = he({
  id: j(),
  name: j(),
  color: fe(),
  hoist: Ae(),
  position: fe(),
  permissions: j(),
  managed: Ae(),
  mentionable: Ae(),
})
const os = he({
  id: j(),
  name: j(),
  owner_id: j(),
  icon: j().nullable(),
  icon_hash: j().optional().nullable(),
  splash: j().nullable(),
  discovery_splash: j().nullable(),
  owner: Ae().optional().nullable(),
  permissions: j().optional().nullable(),
  region: j(),
  afk_channel_id: j().nullable(),
  afk_timeout: fe(),
  widget_enabled: Ae().optional().nullable(),
  widget_channel_id: j().optional().nullable(),
  verification_level: fe(),
  default_message_notifications: fe(),
  explicit_content_filter: fe(),
  roles: Be(as),
  emojis: Be(mi),
  features: Be(j()),
  mfa_level: fe(),
  application_id: j().nullable(),
  system_channel_id: j().nullable(),
  system_channel_flags: fe(),
  rules_channel_id: j().nullable(),
  joined_at: j().optional().nullable(),
  large: Ae().optional().nullable(),
  unavailable: Ae().optional().nullable(),
  member_count: fe().optional().nullable(),
  voice_states: Be(yi).optional().nullable(),
  members: Be(vi).optional().nullable(),
  channels: Be(Qi).optional().nullable(),
  presences: Be(ss).optional().nullable(),
  max_presences: fe().optional().nullable(),
  max_members: fe().optional().nullable(),
  vanity_url_code: j().nullable(),
  description: j().nullable(),
  banner: j().nullable(),
  premium_tier: fe(),
  premium_subscription_count: fe().optional().nullable(),
  preferred_locale: j(),
  public_updates_channel_id: j().nullable(),
  max_video_channel_users: fe().optional().nullable(),
  approximate_member_count: fe().optional().nullable(),
  approximate_presence_count: fe().optional().nullable(),
})
const us = he({
  id: j(),
  guild_id: j(),
  type: fe(),
  name: j(),
})
const ls = he({
  id: j(),
  filename: j(),
  size: fe(),
  url: j(),
  proxy_url: j(),
  height: fe().optional().nullable(),
  width: fe().optional().nullable(),
})
const hs = he({
  text: j(),
  icon_url: j().optional().nullable(),
  proxy_icon_url: j().optional().nullable(),
})
const fi = he({
  url: j().optional().nullable(),
  proxy_url: j().optional().nullable(),
  height: fe().optional().nullable(),
  width: fe().optional().nullable(),
})
const cs = fi.omit({
  proxy_url: !0,
})
const fs = he({
  name: j().optional().nullable(),
  url: j().optional().nullable(),
})
const ds = he({
  name: j().optional().nullable(),
  url: j().optional().nullable(),
  icon_url: j().optional().nullable(),
  proxy_icon_url: j().optional().nullable(),
})
const ps = he({
  name: j(),
  value: j(),
  inline: Ae(),
})
const _s = he({
  title: j().optional().nullable(),
  type: j().optional().nullable(),
  description: j().optional().nullable(),
  url: j().optional().nullable(),
  timestamp: j().optional().nullable(),
  color: fe().optional().nullable(),
  footer: hs.optional().nullable(),
  image: fi.optional().nullable(),
  thumbnail: fi.optional().nullable(),
  video: cs.optional().nullable(),
  provider: fs.optional().nullable(),
  author: ds.optional().nullable(),
  fields: Be(ps).optional().nullable(),
})
const gs = he({
  count: fe(),
  me: Ae(),
  emoji: mi,
})
const vs = he({
  type: fe(),
  party_id: j().optional().nullable(),
})
const ms = he({
  id: j(),
  cover_image: j().optional().nullable(),
  description: j(),
  icon: j().optional().nullable(),
  name: j(),
})
const ys = he({
  message_id: j().optional().nullable(),
  channel_id: j().optional().nullable(),
  guild_id: j().optional().nullable(),
})
const bi = he({
  id: j(),
  channel_id: j(),
  guild_id: j().optional().nullable(),
  author: qt.optional().nullable(),
  member: vi.optional().nullable(),
  content: j(),
  timestamp: j(),
  edited_timestamp: j().optional().nullable(),
  tts: Ae(),
  mention_everyone: Ae(),
  mentions: Be(qt),
  mention_roles: Be(j()),
  mention_channels: Be(us),
  attachments: Be(ls),
  embeds: Be(_s),
  reactions: Be(gs).optional().nullable(),
  nonce: Ji([j(), fe()]).optional().nullable(),
  pinned: Ae(),
  webhook_id: j().optional().nullable(),
  type: fe(),
  activity: vs.optional().nullable(),
  application: ms.optional().nullable(),
  message_reference: ys.optional().nullable(),
  flags: fe().optional().nullable(),
  stickers: Be(Zn()).optional().nullable(),
  referenced_message: Zn().optional().nullable(),
})
const ws = he({
  id: j(),
  name: j(),
})
const bs = {
  UNHANDLED: -1,
  KEYBOARD_KEY: 0,
  MOUSE_BUTTON: 1,
  KEYBOARD_MODIFIER_KEY: 2,
  GAMEPAD_BUTTON: 3,
}
const Si = he({
  type: pt(bs),
  code: fe(),
  name: j(),
})
const Ss = {
  UNHANDLED: -1,
  PUSH_TO_TALK: 'PUSH_TO_TALK',
  VOICE_ACTIVITY: 'VOICE_ACTIVITY',
}
const Es = he({
  type: pt(Ss),
  auto_threshold: Ae(),
  threshold: fe(),
  shortcut: Be(Si),
  delay: fe(),
})
const Gi = he({
  device_id: j(),
  volume: fe(),
  available_devices: Be(ws),
})
const Ts = {
  UNHANDLED: -1,
  AUDIO_INPUT: 'AUDIO_INPUT',
  AUDIO_OUTPUT: 'AUDIO_OUTPUT',
  VIDEO_INPUT: 'VIDEO_INPUT',
}
const fo = he({
  type: pt(Ts),
  id: j(),
  vendor: he({
    name: j(),
    url: j(),
  }),
  model: he({
    name: j(),
    url: j(),
  }),
  related: Be(j()),
  echo_cancellation: Ae().optional().nullable(),
  noise_suppression: Ae().optional().nullable(),
  automatic_gain_control: Ae().optional().nullable(),
  hardware_mute: Ae().optional().nullable(),
})
const Is = {
  UNHANDLED: -1,
  APPLICATION: 1,
  DLC: 2,
  CONSUMABLE: 3,
  BUNDLE: 4,
  SUBSCRIPTION: 5,
}
const Cs = he({
  id: j(),
  name: j(),
  type: pt(Is),
  price: he({
    amount: fe(),
    currency: j(),
  }),
  application_id: j(),
  flags: fe(),
  release_date: j().nullable(),
})
const As = {
  UNHANDLED: -1,
  PURCHASE: 1,
  PREMIUM_SUBSCRIPTION: 2,
  DEVELOPER_GIFT: 3,
  TEST_MODE_PURCHASE: 4,
  FREE_PURCHASE: 5,
  USER_GIFT: 6,
  PREMIUM_PURCHASE: 7,
}
const Ei = he({
  id: j(),
  sku_id: j(),
  application_id: j(),
  user_id: j(),
  gift_code_flags: fe(),
  type: pt(As),
  gifter_user_id: j().optional().nullable(),
  branches: Be(j()).optional().nullable(),
  starts_at: j().optional().nullable(),
  ends_at: j().optional().nullable(),
  parent_id: j().optional().nullable(),
  consumed: Ae().optional().nullable(),
  deleted: Ae().optional().nullable(),
  gift_code_batch_id: j().optional().nullable(),
})
const Ps = {
  UNHANDLED: -1,
  UNLOCKED: 1,
  PORTRAIT: 2,
  LANDSCAPE: 3,
}
const po = pt(Ps)
const Os = {
  UNHANDLED: -1,
  NOMINAL: 0,
  FAIR: 1,
  SERIOUS: 2,
  CRITICAL: 3,
}
const xs = pt(Os)
const er = {
  UNHANDLED: -1,
  PORTRAIT: 0,
  LANDSCAPE: 1,
}
const _o = pt(er)
const qn = {
  UNHANDLED: -1,
  FOCUSED: 0,
  PIP: 1,
  GRID: 2,
}
const go = pt(qn)
const vo = Object.freeze({
  __proto__: null,
  DISPATCH: Xr,
  get Commands() {
    return ge
  },
  ReceiveFramePayload: Dn,
  ScopesObject: Qr,
  Scopes: es,
  User: qt,
  GuildMember: vi,
  Emoji: mi,
  VoiceState: yi,
  UserVoiceState: ts,
  StatusObject: ns,
  Status: Un,
  Activity: xn,
  PermissionOverwriteTypeObject: is,
  PermissionOverwrite: rs,
  ChannelTypesObject: wi,
  Channel: Qi,
  PresenceUpdate: ss,
  Role: as,
  Guild: os,
  ChannelMention: us,
  Attachment: ls,
  EmbedFooter: hs,
  Image: fi,
  Video: cs,
  EmbedProvider: fs,
  EmbedAuthor: ds,
  EmbedField: ps,
  Embed: _s,
  Reaction: gs,
  MessageActivity: vs,
  MessageApplication: ms,
  MessageReference: ys,
  Message: bi,
  VoiceDevice: ws,
  KeyTypesObject: bs,
  ShortcutKey: Si,
  VoiceSettingModeTypeObject: Ss,
  VoiceSettingsMode: Es,
  VoiceSettingsIO: Gi,
  CertifiedDeviceTypeObject: Ts,
  CertifiedDevice: fo,
  SkuTypeObject: Is,
  Sku: Cs,
  EntitlementTypesObject: As,
  Entitlement: Ei,
  OrientationLockStateTypeObject: Ps,
  OrientationLockState: po,
  ThermalStateTypeObject: Os,
  ThermalState: xs,
  OrientationTypeObject: er,
  Orientation: _o,
  LayoutModeTypeObject: qn,
  LayoutMode: go,
})
const mn = he({}).nullable()
const Ns = he({
  code: j(),
})
const Ls = he({
  access_token: j(),
  user: he({
    username: j(),
    discriminator: j(),
    id: j(),
    avatar: j().nullable(),
    public_flags: fe(),
  }),
  scopes: Be(es),
  expires: j(),
  application: he({
    description: j(),
    icon: j().nullable(),
    id: j(),
    rpc_origins: Be(j()).optional(),
    name: j(),
  }),
})
const mo = he({
  guilds: Be(he({
    id: j(),
    name: j(),
  })),
})
const yo = he({
  id: j(),
  name: j(),
  icon_url: j().optional(),
  members: Be(vi),
})
const Kn = he({
  id: j(),
  type: pt(wi),
  guild_id: j().optional().nullable(),
  name: j().optional().nullable(),
  topic: j().optional().nullable(),
  bitrate: fe().optional().nullable(),
  user_limit: fe().optional().nullable(),
  position: fe().optional().nullable(),
  voice_states: Be(ts),
  messages: Be(bi),
})
const wo = he({
  channels: Be(Qi),
})
const Ms = he({
  user_id: j(),
  pan: he({
    left: fe(),
    right: fe(),
  }).optional(),
  volume: fe().optional(),
  mute: Ae().optional(),
})
const qu = Kn.nullable()
const bo = Kn.nullable()
const Rs = Kn.nullable()
const So = Kn.nullable()
const tr = he({
  input: Gi,
  output: Gi,
  mode: Es,
  automatic_gain_control: Ae(),
  echo_cancellation: Ae(),
  noise_suppression: Ae(),
  qos: Ae(),
  silence_warning: Ae(),
  deaf: Ae(),
  mute: Ae(),
})
const Eo = he({
  evt: j(),
})
const To = he({
  shortcut: Si,
})
const Ds = xn
const ks = he({
  skus: Be(Cs),
})
const Bs = he({
  entitlements: Be(Ei),
})
const Us = Be(Ei).nullable()
const zs = he({
  use_interactive_pip: Ae(),
})
const Vs = he({
  locale: j(),
})
const Fs = he({
  enabled: Ae(),
})
const Gs = he({
  permissions: Hr().or(j()),
})
const Zs = he({
  image_url: j(),
}).nullable()
const Hs = he({
  iosKeyboardResizesView: jr(Ae()),
})
const Io = Dn.extend({
  cmd: Rn(ge),
  evt: Wi(),
})
function Co({ cmd: c, data: a }) {
  switch (c) {
    case ge.AUTHENTICATE:
      return Ls.parse(a)
    case ge.AUTHORIZE:
      return Ns.parse(a)
    case ge.CAPTURE_SHORTCUT:
      return To.parse(a)
    case ge.ENCOURAGE_HW_ACCELERATION:
      return Fs.parse(a)
    case ge.GET_CHANNEL:
      return Kn.parse(a)
    case ge.GET_CHANNELS:
      return wo.parse(a)
    case ge.GET_CHANNEL_PERMISSIONS:
      return Gs.parse(a)
    case ge.GET_GUILD:
      return yo.parse(a)
    case ge.GET_GUILDS:
      return mo.parse(a)
    case ge.GET_PLATFORM_BEHAVIORS:
      return Hs.parse(a)
    case ge.GET_SELECTED_VOICE_CHANNEL:
      return Rs.parse(a)
    case ge.GET_VOICE_SETTINGS:
    case ge.SET_VOICE_SETTINGS:
      return tr.parse(a)
    case ge.SELECT_TEXT_CHANNEL:
      return So.parse(a)
    case ge.SELECT_VOICE_CHANNEL:
      return bo.parse(a)
    case ge.SET_ACTIVITY:
      return Ds.parse(a)
    case ge.GET_SKUS_EMBEDDED:
      return ks.parse(a)
    case ge.GET_ENTITLEMENTS_EMBEDDED:
      return Bs.parse(a)
    case ge.SET_CONFIG:
      return zs.parse(a)
    case ge.SET_USER_VOICE_SETTINGS:
      return Ms.parse(a)
    case ge.START_PURCHASE:
      return Us.parse(a)
    case ge.SUBSCRIBE:
    case ge.UNSUBSCRIBE:
      return Eo.parse(a)
    case ge.USER_SETTINGS_GET_LOCALE:
      return Vs.parse(a)
    case ge.INITIATE_IMAGE_UPLOAD:
      return Zs.parse(a)
    case ge.START_PREMIUM_PURCHASE:
    case ge.OPEN_EXTERNAL_LINK:
    case ge.SET_ORIENTATION_LOCK_STATE:
    case ge.SET_CERTIFIED_DEVICES:
    case ge.SEND_ANALYTICS_EVENT:
    case ge.OPEN_INVITE_DIALOG:
    case ge.CAPTURE_LOG:
    case ge.OPEN_SHARE_MOMENT_DIALOG:
      return mn.parse(a)
    default:
      throw new Error(`Unrecognized command ${c}`)
  }
}
function Ao(c) {
  return Object.assign(Object.assign({}, c), {
    data: Co(c),
  })
}
const nr = 'ERROR'; let _e;
(function (c) {
  c.READY = 'READY',
  c.GUILD_STATUS = 'GUILD_STATUS',
  c.GUILD_CREATE = 'GUILD_CREATE',
  c.CHANNEL_CREATE = 'CHANNEL_CREATE',
  c.VOICE_CHANNEL_SELECT = 'VOICE_CHANNEL_SELECT',
  c.VOICE_SETTINGS_UPDATE = 'VOICE_SETTINGS_UPDATE',
  c.VOICE_STATE_CREATE = 'VOICE_STATE_CREATE',
  c.VOICE_STATE_UPDATE = 'VOICE_STATE_UPDATE',
  c.VOICE_STATE_DELETE = 'VOICE_STATE_DELETE',
  c.VOICE_CONNECTION_STATUS = 'VOICE_CONNECTION_STATUS',
  c.MESSAGE_CREATE = 'MESSAGE_CREATE',
  c.MESSAGE_UPDATE = 'MESSAGE_UPDATE',
  c.MESSAGE_DELETE = 'MESSAGE_DELETE',
  c.SPEAKING_START = 'SPEAKING_START',
  c.SPEAKING_STOP = 'SPEAKING_STOP',
  c.NOTIFICATION_CREATE = 'NOTIFICATION_CREATE',
  c.CAPTURE_SHORTCUT_CHANGE = 'CAPTURE_SHORTCUT_CHANGE',
  c.ACTIVITY_JOIN = 'ACTIVITY_JOIN',
  c.ACTIVITY_JOIN_REQUEST = 'ACTIVITY_JOIN_REQUEST',
  c.ACTIVITY_PIP_MODE_UPDATE = 'ACTIVITY_PIP_MODE_UPDATE',
  c.ACTIVITY_LAYOUT_MODE_UPDATE = 'ACTIVITY_LAYOUT_MODE_UPDATE',
  c.ORIENTATION_UPDATE = 'ORIENTATION_UPDATE',
  c.CURRENT_USER_UPDATE = 'CURRENT_USER_UPDATE',
  c.ENTITLEMENT_CREATE = 'ENTITLEMENT_CREATE',
  c.THERMAL_STATE_UPDATE = 'THERMAL_STATE_UPDATE'
}
)(_e || (_e = {}))
const js = Dn.extend({
  evt: zt(nr),
  data: he({
    code: fe(),
    message: j().optional(),
  }).passthrough(),
  cmd: Rn(ge),
  nonce: j().nullable(),
})
const ir = Dn.extend({
  evt: Rn(_e),
  nonce: j().nullable(),
  cmd: zt(Xr),
  data: he({}).passthrough(),
})
const Po = ir.extend({
  evt: j(),
})
const Oo = Ji([ir, Po, js])
function at(c, a) {
  return ir.extend({
    evt: zt(c),
    data: he(a),
  })
}
const xo = at(_e.READY, {
  v: fe(),
  config: he({
    cdn_host: j().optional(),
    api_endpoint: j(),
    environment: j(),
  }),
  user: he({
    id: j(),
    username: j(),
    discriminator: j(),
    avatar: j().optional(),
  }).optional(),
})
const No = at(_e.GUILD_STATUS, {
  guild: os,
  online: fe().optional(),
})
const Lo = at(_e.GUILD_CREATE, {
  id: j(),
  name: j(),
})
const Mo = at(_e.CHANNEL_CREATE, {
  id: j(),
  name: j(),
  type: pt(wi),
})
const Ro = at(_e.VOICE_CHANNEL_SELECT, {
  channel_id: j().nullable(),
  guild_id: j().nullable().optional(),
})
const Do = at(_e.VOICE_STATE_UPDATE, {
  data: tr,
})
const rr = at(_e.VOICE_STATE_CREATE, {
  voice_state: yi,
  user: qt,
  nick: j(),
  volume: fe(),
  mute: Ae(),
  pan: he({
    left: fe(),
    right: fe(),
  }),
})
const ko = rr.extend({
  evt: zt(_e.VOICE_STATE_UPDATE),
})
const Bo = rr.extend({
  evt: zt(_e.VOICE_STATE_DELETE),
})
const Uo = {
  UNHANDLED: -1,
  DISCONNECTED: 'DISCONNECTED',
  AWAITING_ENDPOINT: 'AWAITING_ENDPOINT',
  AUTHENTICATING: 'AUTHENTICATING',
  CONNECTING: 'CONNECTING',
  CONNECTED: 'CONNECTED',
  VOICE_DISCONNECTED: 'VOICE_DISCONNECTED',
  VOICE_CONNECTING: 'VOICE_CONNECTING',
  VOICE_CONNECTED: 'VOICE_CONNECTED',
  NO_ROUTE: 'NO_ROUTE',
  ICE_CHECKING: 'ICE_CHECKING',
}
const zo = at(_e.VOICE_CONNECTION_STATUS, {
  state: pt(Uo),
  hostname: j(),
  pings: Be(fe()),
  average_ping: fe(),
  last_ping: fe(),
})
const sr = at(_e.MESSAGE_CREATE, {
  channel_id: j(),
  message: bi,
})
const Vo = sr.extend({
  evt: zt(_e.MESSAGE_UPDATE),
})
const Fo = sr.extend({
  evt: zt(_e.MESSAGE_DELETE),
})
const Go = at(_e.SPEAKING_START, {
  user_id: j(),
})
const Zo = at(_e.SPEAKING_STOP, {
  user_id: j(),
})
const Ho = at(_e.NOTIFICATION_CREATE, {
  channel_id: j(),
  message: bi,
  icon_url: j(),
  title: j(),
  body: j(),
})
const jo = at(_e.CAPTURE_SHORTCUT_CHANGE, {
  shortcut: Si,
})
const qo = {
  UNHANDLED: -1,
  PLAY: 0,
  SPECTATE: 1,
}
const Ko = at(_e.ACTIVITY_JOIN, {
  secret: j(),
  intent: pt(qo).optional(),
})
const Yo = at(_e.ACTIVITY_JOIN_REQUEST, {
  user: qt,
})
const $o = at(_e.ACTIVITY_PIP_MODE_UPDATE, {
  is_pip_mode: Ae(),
})
const Wo = at(_e.ACTIVITY_LAYOUT_MODE_UPDATE, {
  layout_mode: pt(qn),
})
const Jo = at(_e.ORIENTATION_UPDATE, {
  screen_orientation: pt(er),
  orientation: Rn(Fi),
})
const Xo = at(_e.CURRENT_USER_UPDATE, {
  avatar: j().optional().nullable(),
  bot: Ae(),
  discriminator: j(),
  flags: fe().optional().nullable(),
  id: j(),
  premium_type: fe().optional().nullable(),
  username: j(),
})
const Qo = at(_e.ENTITLEMENT_CREATE, {
  entitlement: Ei,
})
const eu = at(_e.THERMAL_STATE_UPDATE, {
  thermal_state: xs,
})
function tu(c) {
  switch (c.evt) {
    case _e.ACTIVITY_JOIN:
      return Ko.parse(c)
    case _e.ACTIVITY_JOIN_REQUEST:
      return Yo.parse(c)
    case _e.ACTIVITY_PIP_MODE_UPDATE:
      return $o.parse(c)
    case _e.ACTIVITY_LAYOUT_MODE_UPDATE:
      return Wo.parse(c)
    case _e.CAPTURE_SHORTCUT_CHANGE:
      return jo.parse(c)
    case _e.CHANNEL_CREATE:
      return Mo.parse(c)
    case nr:
      return js.parse(c)
    case _e.GUILD_CREATE:
      return Lo.parse(c)
    case _e.GUILD_STATUS:
      return No.parse(c)
    case _e.MESSAGE_CREATE:
      return sr.parse(c)
    case _e.MESSAGE_DELETE:
      return Fo.parse(c)
    case _e.MESSAGE_UPDATE:
      return Vo.parse(c)
    case _e.NOTIFICATION_CREATE:
      return Ho.parse(c)
    case _e.ORIENTATION_UPDATE:
      return Jo.parse(c)
    case _e.READY:
      return xo.parse(c)
    case _e.SPEAKING_START:
      return Go.parse(c)
    case _e.SPEAKING_STOP:
      return Zo.parse(c)
    case _e.VOICE_CHANNEL_SELECT:
      return Ro.parse(c)
    case _e.VOICE_CONNECTION_STATUS:
      return zo.parse(c)
    case _e.VOICE_SETTINGS_UPDATE:
      return Do.parse(c)
    case _e.VOICE_STATE_CREATE:
      return rr.parse(c)
    case _e.VOICE_STATE_DELETE:
      return Bo.parse(c)
    case _e.VOICE_STATE_UPDATE:
      return ko.parse(c)
    case _e.CURRENT_USER_UPDATE:
      return Xo.parse(c)
    case _e.ENTITLEMENT_CREATE:
      return Qo.parse(c)
    case _e.THERMAL_STATE_UPDATE:
      return eu.parse(c)
    default:
      throw new Error(`Unrecognized event type ${c.evt}`)
  }
}
he({
  frame_id: j(),
  platform: Rn(gn).optional().nullable(),
})
he({
  v: zt(1),
  encoding: zt('json').optional(),
  client_id: j(),
  frame_id: j(),
})
const nu = he({
  code: fe(),
  message: j().optional(),
})
const iu = he({
  evt: j().nullable(),
  nonce: j().nullable(),
  data: Zn().nullable(),
  cmd: j(),
}).passthrough()
function ru(c) {
  const a = iu.parse(c)
  return a.evt != null ? tu(Oo.parse(a)) : Ao(Io.passthrough().parse(a))
}
function ht(c, a, h, p = () => {},
) {
  const d = Dn.extend({
    cmd: zt(a),
    data: h,
  })
  return M => _n(this, void 0, void 0, function*() {
    const F = yield c({
      cmd: a,
      args: M,
      transfer: p(M),
    })
    return d.parse(F).data
  })
}
const su = c => ht(c, ge.AUTHENTICATE, Ls)
const au = c => ht(c, ge.AUTHORIZE, Ns)
const ou = c => ht(c, ge.CAPTURE_LOG, mn)
const uu = c => ht(c, ge.ENCOURAGE_HW_ACCELERATION, Fs)
const lu = c => ht(c, ge.GET_ENTITLEMENTS_EMBEDDED, Bs)
const hu = c => ht(c, ge.GET_SELECTED_VOICE_CHANNEL, Rs)
const cu = c => ht(c, ge.GET_SKUS_EMBEDDED, ks)
const fu = c => ht(c, ge.GET_VOICE_SETTINGS, tr)
const du = c => ht(c, ge.GET_CHANNEL_PERMISSIONS, Gs)
const pu = c => ht(c, ge.GET_PLATFORM_BEHAVIORS, Hs)
const _u = c => ht(c, ge.OPEN_EXTERNAL_LINK, mn)
const gu = c => ht(c, ge.OPEN_INVITE_DIALOG, mn)
const vu = c => ht(c, ge.OPEN_SHARE_MOMENT_DIALOG, mn)
xn.pick({
  state: !0,
  details: !0,
  timestamps: !0,
  assets: !0,
  party: !0,
  secrets: !0,
  buttons: !0,
  instance: !0,
  supported_platforms: !0,
  type: !0,
}).extend({
  type: xn.shape.type.optional(),
  instance: xn.shape.instance.optional(),
}).nullable()
const mu = c => ht(c, ge.SET_ACTIVITY, Ds)
const yu = c => ht(c, ge.SET_CONFIG, zs)
function wu({ sendCommand: c, cmd: a, response: h, fallbackTransform: p, transferTransform: d = () => {} }) {
  const M = Dn.extend({
    cmd: zt(a),
    data: h,
  })
  return F => _n(this, void 0, void 0, function*() {
    try {
      const Z = yield c({
        cmd: a,
        args: F,
        transfer: d(F),
      })
      return M.parse(Z).data
    }
    catch (Z) {
      if (Z.code === jn.INVALID_PAYLOAD) {
        const q = p(F)
        const k = yield c({
          cmd: a,
          args: q,
          transfer: d(q),
        })
        return M.parse(k).data
      }
      else { throw Z }
    }
  })
}
const bu = c => ({
  lock_state: c.lock_state,
  picture_in_picture_lock_state: c.picture_in_picture_lock_state,
})
const Su = c => wu({
  sendCommand: c,
  cmd: ge.SET_ORIENTATION_LOCK_STATE,
  response: mn,
  fallbackTransform: bu,
})
const Eu = c => ht(c, ge.SET_USER_VOICE_SETTINGS, Ms)
const Tu = c => ht(c, ge.START_PREMIUM_PURCHASE, mn)
const Iu = c => ht(c, ge.START_PURCHASE, Us)
const Cu = c => ht(c, ge.USER_SETTINGS_GET_LOCALE, Vs)
const Au = c => ht(c, ge.INITIATE_IMAGE_UPLOAD, Zs)
function Pu(c) {
  return {
    authenticate: su(c),
    authorize: au(c),
    captureLog: ou(c),
    encourageHardwareAcceleration: uu(c),
    getChannelPermissions: du(c),
    getEntitlements: lu(c),
    getPlatformBehaviors: pu(c),
    getSelectedVoiceChannel: hu(c),
    getSkus: cu(c),
    getVoiceSettings: fu(c),
    openExternalLink: _u(c),
    openInviteDialog: gu(c),
    openShareMomentDialog: vu(c),
    setActivity: mu(c),
    setConfig: yu(c),
    setOrientationLockState: Su(c),
    setUserVoiceSettings: Eu(c),
    startPremiumPurchase: Tu(c),
    startPurchase: Iu(c),
    userSettingsGetLocale: Cu(c),
    initiateImageUpload: Au(c),
  }
}
let ai; const Ou = new Uint8Array(16)
function xu() {
  if (!ai && (ai = typeof crypto < 'u' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < 'u' && typeof msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto),
  !ai))
    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported')
  return ai(Ou)
}
const Nu = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i
function Lu(c) {
  return typeof c == 'string' && Nu.test(c)
}
const bt = []
for (oi = 0; oi < 256; ++oi)
  bt.push((oi + 256).toString(16).substr(1))
let oi
function Mu(c) {
  const a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0
  const h = (`${bt[c[a + 0]] + bt[c[a + 1]] + bt[c[a + 2]] + bt[c[a + 3]]}-${bt[c[a + 4]]}${bt[c[a + 5]]}-${bt[c[a + 6]]}${bt[c[a + 7]]}-${bt[c[a + 8]]}${bt[c[a + 9]]}-${bt[c[a + 10]]}${bt[c[a + 11]]}${bt[c[a + 12]]}${bt[c[a + 13]]}${bt[c[a + 14]]}${bt[c[a + 15]]}`).toLowerCase()
  if (!Lu(h))
    throw new TypeError('Stringified UUID is invalid')
  return h
}
function Tr(c, a, h) {
  c = c || {}
  const p = c.random || (c.rng || xu)()
  if (p[6] = p[6] & 15 | 64,
  p[8] = p[8] & 63 | 128,
  a) {
    h = h || 0
    for (let d = 0; d < 16; ++d)
      a[h + d] = p[d]
    return a
  }
  return Mu(p)
}
const Zi = class extends Error {
  constructor(a, h = '') {
    super(h),
    this.code = a,
    this.message = h,
    this.name = 'Discord SDK Error'
  }
}
const qs = /\{([a-z]+)\}/g
function Ru(c) {
  const a = c.replace(qs, (h, p) => `(?<${p}>[\\w-]+)`)
  return new RegExp(`${a}(/|$)`)
}
function Du({ originalURL: c, prefix: a, prefixHost: h, target: p }) {
  const d = new URL(`https://${p}`)
  const M = Ru(d.host)
  const F = c.toString().match(M)
  if (F == null)
    return c
  const Z = new URL(c.toString())
  return Z.host = h,
  Z.pathname = a.replace(qs, (q, k) => {
    let O
    const B = (O = F.groups) === null || O === void 0 ? void 0 : O[k]
    if (B == null)
      throw new Error('Misconfigured route.')
    return B
  },
  ),
  Z.pathname += Z.pathname === '/' ? c.pathname.slice(1) : c.pathname,
  Z.pathname = Z.pathname.replace(d.pathname, ''),
  Z.pathname += Z.pathname.endsWith('/') ? '' : '/',
  Z
}
function Di(c, a = window.location.protocol, h = window.location.host) {
  return c.startsWith('/') ? new URL(`${a}//${h}${c}`) : new URL(c)
}
function ki({ url: c, mappings: a }) {
  for (const h of a) {
    const p = Du({
      originalURL: c,
      prefix: h.prefix,
      target: h.target,
      prefixHost: window.location.host,
    })
    if (p)
      return p
  }
  return c
}
function ku(c, a) {
  const h = window.fetch
  window.fetch = function (M, F) {
    const Z = ki({
      url: Di(M.toString()),
      mappings: a,
    })
    return h(Z.toString(), F)
  }

  const p = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function (M, F, Z, q, k) {
    const O = ki({
      url: Di(F),
      mappings: a,
    })
    p.apply(this, [M, O.toString(), Z, q, k])
  }

  class d extends WebSocket {
    constructor(F, Z) {
      const q = F instanceof URL ? F.toString() : F
      const k = ki({
        url: Di(q, 'wss:'),
        mappings: a,
      })
      super(k.toString(), Z)
    }
  }
  window.WebSocket = d
}
function Bu() {
  return {
    disableConsoleLogOverride: !1,
  }
}
const Uu = ['log', 'warn', 'debug', 'info', 'error']
function zu(c, a, h) {
  const p = c[a]
  const d = c
  p && (c[a] = function () {
    const M = [].slice.call(arguments)
    const F = `${M.join(' ')}`
    h(a, F),
    p.apply(d, M)
  }
  )
}
let Xt;
(function (c) {
  c[c.HANDSHAKE = 0] = 'HANDSHAKE',
  c[c.FRAME = 1] = 'FRAME',
  c[c.CLOSE = 2] = 'CLOSE',
  c[c.HELLO = 3] = 'HELLO'
}
)(Xt || (Xt = {}))
const Vu = new Set([window.location.origin, 'https://discord.com', 'https://discordapp.com', 'https://ptb.discord.com', 'https://ptb.discordapp.com', 'https://canary.discord.com', 'https://canary.discordapp.com', 'https://staging.discord.co', 'http://localhost:3333', 'https://pax.discord.com', 'null'])
function Fu() {
  let c
  return [(c = window.parent.opener) !== null && c !== void 0 ? c : window.parent, document.referrer ? document.referrer : '*']
}
const di = class {
  constructor(a, h) {
    this.eventBus = new Ea(),
    this.source = null,
    this.sourceOrigin = '',
    this.pendingCommands = new Map(),
    this.layoutModeUpdateListenerMap = new Map(),
    this.sendCommand = (Z) => {
      let q
      if (this.source == null)
        throw new Error('Attempting to send message before initialization')
      const k = Tr()
      return (q = this.source) === null || q === void 0 || q.postMessage([Xt.FRAME, Object.assign(Object.assign({}, Z), {
        nonce: k,
      })], this.sourceOrigin, this.getTransfer(Z)),
      new Promise((B, C) => {
        this.pendingCommands.set(k, {
          resolve: B,
          reject: C,
        })
      },
      )
    }
    ,
    this.commands = Pu(this.sendCommand),
    this.initializeNetworkShims = ku,
    this.handleMessage = (Z) => {
      if (!Vu.has(Z.origin))
        return
      const q = Z.data
      if (!Array.isArray(q))
        return
      const [k, O] = q
      switch (k) {
        case Xt.HELLO:
          return
        case Xt.CLOSE:
          return this.handleClose(O)
        case Xt.HANDSHAKE:
          return this.handleHandshake()
        case Xt.FRAME:
          return this.handleFrame(O)
        default:
          throw new Error('Invalid message format')
      }
    }
    ,
    this.isReady = !1,
    this.clientId = a,
    this.configuration = h ?? Bu(),
    window.addEventListener('message', this.handleMessage)
    const p = new URLSearchParams(window.location.search)
    const d = p.get('frame_id')
    if (!d)
      throw new Error('frame_id query param is not defined')
    this.frameId = d
    const M = p.get('instance_id')
    if (!M)
      throw new Error('instance_id query param is not defined')
    this.instanceId = M
    const F = p.get('platform')
    if (F) {
      if (F !== gn.DESKTOP && F !== gn.MOBILE)
        throw new Error(`Invalid query param "platform" of "${F}". Valid values are "${gn.DESKTOP}" or "${gn.MOBILE}"`)
    }
    else { throw new Error('platform query param is not defined') }
    this.platform = F,
    this.guildId = p.get('guild_id'),
    this.channelId = p.get('channel_id'),
    [this.source, this.sourceOrigin] = Fu(),
    this.addOnReadyListener(),
    this.handshake()
  }

  getTransfer(a) {
    let h
    switch (a.cmd) {
      case ge.SUBSCRIBE:
      case ge.UNSUBSCRIBE:
        return
      default:
        return (h = a.transfer) !== null && h !== void 0 ? h : void 0
    }
  }

  close(a, h) {
    let p
    window.removeEventListener('message', this.handleMessage)
    const d = Tr();
    (p = this.source) === null || p === void 0 || p.postMessage([Xt.CLOSE, {
      code: a,
      message: h,
      nonce: d,
    }], this.sourceOrigin)
  }

  subscribe(a, h, p) {
    return _n(this, void 0, void 0, function*() {
      const d = this.eventBus.listenerCount(a)
      const M = this.eventBus.on(a, h)
      return Object.values(_e).includes(a) && a !== _e.READY && d === 0 && (yield this.sendCommand({
        cmd: ge.SUBSCRIBE,
        args: p,
        evt: a,
      })),
      M
    })
  }

  unsubscribe(a, h) {
    return _n(this, void 0, void 0, function*() {
      return Object.values(_e).includes(a) && a !== _e.READY && this.eventBus.listenerCount(a) === 1 && (yield this.sendCommand({
        cmd: ge.UNSUBSCRIBE,
        evt: a,
      })),
      this.eventBus.off(a, h)
    })
  }

  ready() {
    return _n(this, void 0, void 0, function*() {
      this.isReady || (yield new Promise((a) => {
        this.eventBus.once(_e.READY, a)
      },
      ))
    })
  }

  subscribeToLayoutModeUpdatesCompat(a) {
    return _n(this, void 0, void 0, function*() {
      const h = (M) => {
        const F = M.is_pip_mode ? qn.PIP : qn.FOCUSED
        a({
          layout_mode: F,
        })
      }
      const p = yield this.subscribe(_e.ACTIVITY_PIP_MODE_UPDATE, h)
      const d = (M) => {
        this.unsubscribe(_e.ACTIVITY_PIP_MODE_UPDATE, h),
        a(M)
      }

      this.layoutModeUpdateListenerMap.set(a, {
        layoutModeListener: d,
        pipModeListener: h,
      })
      try {
        return yield this.subscribe(_e.ACTIVITY_LAYOUT_MODE_UPDATE, d)
      }
      catch (M) {
        if (M.code === jn.INVALID_EVENT)
          return p
        throw M
      }
    })
  }

  unsubscribeFromLayoutModeUpdatesCompat(a) {
    return _n(this, void 0, void 0, function*() {
      const h = this.layoutModeUpdateListenerMap.get(a)
      if (this.layoutModeUpdateListenerMap.delete(a),
      h != null) {
        const { layoutModeListener: p, pipModeListener: d } = h
        let M = null
        let F = null
        if (p != null) {
          try {
            M = yield this.unsubscribe(_e.ACTIVITY_LAYOUT_MODE_UPDATE, p)
          }
          catch (Z) {
            if (Z.code !== jn.INVALID_EVENT)
              throw Z
          }
        }
        return d != null && (F = yield this.unsubscribe(_e.ACTIVITY_PIP_MODE_UPDATE, d)),
        M ?? F
      }
    })
  }

  handshake() {
    let a;
    (a = this.source) === null || a === void 0 || a.postMessage([Xt.HANDSHAKE, {
      v: 1,
      encoding: 'json',
      client_id: this.clientId,
      frame_id: this.frameId,
    }], this.sourceOrigin)
  }

  addOnReadyListener() {
    this.eventBus.once(_e.READY, () => {
      this.overrideConsoleLogging(),
      this.isReady = !0
    },
    )
  }

  overrideConsoleLogging() {
    if (this.configuration.disableConsoleLogOverride)
      return
    const a = (h, p) => {
      this.commands.captureLog({
        level: h,
        message: p,
      })
    }

    Uu.forEach((h) => {
      zu(console, h, a)
    },
    )
  }

  handleClose(a) {
    nu.parse(a)
  }

  handleHandshake() {}
  handleFrame(a) {
    let h, p
    let d
    try {
      d = ru(a)
    }
    catch (M) {
      console.error('Failed to parse', a),
      console.error(M)
      return
    }
    if (d.cmd === 'DISPATCH') { this.eventBus.emit(d.evt, d.data) }
    else {
      if (d.evt === nr) {
        if (d.nonce != null) {
          (h = this.pendingCommands.get(d.nonce)) === null || h === void 0 || h.reject(d.data),
          this.pendingCommands.delete(d.nonce)
          return
        }
        this.eventBus.emit('error', new Zi(d.data.code, d.data.message))
      }
      if (d.nonce == null) {
        console.error('Missing nonce', a)
        return
      }
      (p = this.pendingCommands.get(d.nonce)) === null || p === void 0 || p.resolve(d),
      this.pendingCommands.delete(d.nonce)
    }
  }
}

const Hi = {
  exports: {},
};
(function (c, a) {
  const h = 200
  const p = 'Expected a function'
  const d = '__lodash_hash_undefined__'
  const M = 1
  const F = 2
  const Z = 1 / 0
  const q = 9007199254740991
  const k = '[object Arguments]'
  const O = '[object Array]'
  const B = '[object Boolean]'
  const C = '[object Date]'
  const Q = '[object Error]'
  const J = '[object Function]'
  const ne = '[object GeneratorFunction]'
  const Y = '[object Map]'
  const Me = '[object Number]'
  const le = '[object Object]'
  const Se = '[object Promise]'
  const ye = '[object RegExp]'
  const oe = '[object Set]'
  const We = '[object String]'
  const ct = '[object Symbol]'
  const je = '[object WeakMap]'
  const Pt = '[object ArrayBuffer]'
  const ft = '[object DataView]'
  const dt = '[object Float32Array]'
  const qe = '[object Float64Array]'
  const pe = '[object Int8Array]'
  const Vt = '[object Int16Array]'
  const re = '[object Int32Array]'
  const Ot = '[object Uint8Array]'
  const Ft = '[object Uint8ClampedArray]'
  const ke = '[object Uint16Array]'
  const ot = '[object Uint32Array]'
  const kt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
  const yn = /^\w*$/
  const Gt = /^\./
  const Mt = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g
  const Xe = /[\\^$.*+?()[\]{}|]/g
  const xt = /\\(\\)?/g
  const en = /^\[object .+?Constructor\]$/
  const Kt = /^(?:0|[1-9]\d*)$/
  const Ce = {}
  Ce[dt] = Ce[qe] = Ce[pe] = Ce[Vt] = Ce[re] = Ce[Ot] = Ce[Ft] = Ce[ke] = Ce[ot] = !0,
  Ce[k] = Ce[O] = Ce[Pt] = Ce[B] = Ce[ft] = Ce[C] = Ce[Q] = Ce[J] = Ce[Y] = Ce[Me] = Ce[le] = Ce[ye] = Ce[oe] = Ce[We] = Ce[je] = !1
  const tt = typeof ri == 'object' && ri && ri.Object === Object && ri
  const Ke = typeof self == 'object' && self && self.Object === Object && self
  const Rt = tt || Ke || Function('return this')()
  const Zt = a && !a.nodeType && a
  const tn = Zt && !0 && c && !c.nodeType && c
  const cn = tn && tn.exports === Zt
  const wn = cn && tt.process
  const bn = (function () {
    try {
      return wn && wn.binding('util')
    }
    catch {}
  }())
  const kn = bn && bn.isTypedArray
  function Sn(P, U) {
    for (let X = -1, ie = P ? P.length : 0; ++X < ie && U(P[X], X, P) !== !1;)
      ;
    return P
  }
  function Bn(P, U) {
    for (let X = -1, ie = P ? P.length : 0; ++X < ie;) {
      if (U(P[X], X, P))
        return !0
    }
    return !1
  }
  function Je(P) {
    return function (U) {
      return U?.[P]
    }
  }
  function nn(P, U) {
    for (var X = -1, ie = Array(P); ++X < P;)
      ie[X] = U(X)
    return ie
  }
  function Qe(P) {
    return function (U) {
      return P(U)
    }
  }
  function En(P, U) {
    return P?.[U]
  }
  function ae(P) {
    let U = !1
    if (P != null && typeof P.toString != 'function') {
      try {
        U = !!(`${P}`)
      }
      catch {}
    }
    return U
  }
  function e(P) {
    let U = -1
    const X = Array(P.size)
    return P.forEach((ie, Ne) => {
      X[++U] = [Ne, ie]
    }),
    X
  }
  function t(P, U) {
    return function (X) {
      return P(U(X))
    }
  }
  function n(P) {
    let U = -1
    const X = Array(P.size)
    return P.forEach((ie) => {
      X[++U] = ie
    }),
    X
  }
  const i = Array.prototype
  const r = Function.prototype
  const s = Object.prototype
  const u = Rt['__core-js_shared__']
  const o = (function () {
    const P = /[^.]+$/.exec(u && u.keys && u.keys.IE_PROTO || '')
    return P ? `Symbol(src)_1.${P}` : ''
  }())
  const l = r.toString
  const f = s.hasOwnProperty
  const g = s.toString
  const y = RegExp(`^${l.call(f).replace(Xe, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?')}$`)
  const _ = Rt.Symbol
  const v = Rt.Uint8Array
  const b = t(Object.getPrototypeOf, Object)
  const T = Object.create
  const x = s.propertyIsEnumerable
  const S = i.splice
  const I = t(Object.keys, Object)
  const m = In(Rt, 'DataView')
  const w = In(Rt, 'Map')
  const E = In(Rt, 'Promise')
  const A = In(Rt, 'Set')
  const N = In(Rt, 'WeakMap')
  const L = In(Object, 'create')
  const R = dn(m)
  const D = dn(w)
  const V = dn(E)
  const z = dn(A)
  const G = dn(N)
  const H = _ ? _.prototype : void 0
  const K = H ? H.valueOf : void 0
  const $ = H ? H.toString : void 0
  function W(P) {
    let U = -1
    const X = P ? P.length : 0
    for (this.clear(); ++U < X;) {
      const ie = P[U]
      this.set(ie[0], ie[1])
    }
  }
  function te() {
    this.__data__ = L ? L(null) : {}
  }
  function se(P) {
    return this.has(P) && delete this.__data__[P]
  }
  function ue(P) {
    const U = this.__data__
    if (L) {
      const X = U[P]
      return X === d ? void 0 : X
    }
    return f.call(U, P) ? U[P] : void 0
  }
  function Ie(P) {
    const U = this.__data__
    return L ? U[P] !== void 0 : f.call(U, P)
  }
  function Ee(P, U) {
    const X = this.__data__
    return X[P] = L && U === void 0 ? d : U,
    this
  }
  W.prototype.clear = te,
  W.prototype.delete = se,
  W.prototype.get = ue,
  W.prototype.has = Ie,
  W.prototype.set = Ee
  function de(P) {
    let U = -1
    const X = P ? P.length : 0
    for (this.clear(); ++U < X;) {
      const ie = P[U]
      this.set(ie[0], ie[1])
    }
  }
  function ve() {
    this.__data__ = []
  }
  function Oe(P) {
    const U = this.__data__
    const X = Ct(U, P)
    if (X < 0)
      return !1
    const ie = U.length - 1
    return X == ie ? U.pop() : S.call(U, X, 1),
    !0
  }
  function Te(P) {
    const U = this.__data__
    const X = Ct(U, P)
    return X < 0 ? void 0 : U[X][1]
  }
  function Ge(P) {
    return Ct(this.__data__, P) > -1
  }
  function Re(P, U) {
    const X = this.__data__
    const ie = Ct(X, P)
    return ie < 0 ? X.push([P, U]) : X[ie][1] = U,
    this
  }
  de.prototype.clear = ve,
  de.prototype.delete = Oe,
  de.prototype.get = Te,
  de.prototype.has = Ge,
  de.prototype.set = Re
  function xe(P) {
    let U = -1
    const X = P ? P.length : 0
    for (this.clear(); ++U < X;) {
      const ie = P[U]
      this.set(ie[0], ie[1])
    }
  }
  function ze() {
    this.__data__ = {
      hash: new W(),
      map: new (w || de)(),
      string: new W(),
    }
  }
  function De(P) {
    return Jn(this, P).delete(P)
  }
  function _t(P) {
    return Jn(this, P).get(P)
  }
  function gt(P) {
    return Jn(this, P).has(P)
  }
  function Et(P, U) {
    return Jn(this, P).set(P, U),
    this
  }
  xe.prototype.clear = ze,
  xe.prototype.delete = De,
  xe.prototype.get = _t,
  xe.prototype.has = gt,
  xe.prototype.set = Et
  function nt(P) {
    let U = -1
    const X = P ? P.length : 0
    for (this.__data__ = new xe(); ++U < X;)
      this.add(P[U])
  }
  function Ye(P) {
    return this.__data__.set(P, d),
    this
  }
  function ut(P) {
    return this.__data__.has(P)
  }
  nt.prototype.add = nt.prototype.push = Ye,
  nt.prototype.has = ut
  function st(P) {
    this.__data__ = new de(P)
  }
  function vt() {
    this.__data__ = new de()
  }
  function Ht(P) {
    return this.__data__.delete(P)
  }
  function fn(P) {
    return this.__data__.get(P)
  }
  function jt(P) {
    return this.__data__.has(P)
  }
  function Yt(P, U) {
    let X = this.__data__
    if (X instanceof de) {
      const ie = X.__data__
      if (!w || ie.length < h - 1) {
        return ie.push([P, U]),
        this
      }
      X = this.__data__ = new xe(ie)
    }
    return X.set(P, U),
    this
  }
  st.prototype.clear = vt,
  st.prototype.delete = Ht,
  st.prototype.get = fn,
  st.prototype.has = jt,
  st.prototype.set = Yt
  function Dt(P, U) {
    const X = Wt(P) || gr(P) ? nn(P.length, String) : []
    const ie = X.length
    const Ne = !!ie
    for (const me in P)
      (U || f.call(P, me)) && !(Ne && (me == 'length' || fr(me, ie))) && X.push(me)
    return X
  }
  function Ct(P, U) {
    for (let X = P.length; X--;) {
      if (_r(P[X][0], U))
        return X
    }
    return -1
  }
  function Tn(P) {
    return Cn(P) ? T(P) : {}
  }
  const $t = aa()
  function Oi(P, U) {
    return P && $t(P, U, ti)
  }
  function lr(P, U) {
    U = Xn(U, P) ? [U] : hr(U)
    for (var X = 0, ie = U.length; P != null && X < ie;)
      P = P[Qn(U[X++])]
    return X && X == ie ? P : void 0
  }
  function Ys(P) {
    return g.call(P)
  }
  function $s(P, U) {
    return P != null && U in Object(P)
  }
  function xi(P, U, X, ie, Ne) {
    return P === U ? !0 : P == null || U == null || !Cn(P) && !ei(U) ? P !== P && U !== U : Ws(P, U, xi, X, ie, Ne)
  }
  function Ws(P, U, X, ie, Ne, me) {
    const Ze = Wt(P)
    const $e = Wt(U)
    let it = O
    let mt = O
    Ze || (it = rn(P),
    it = it == k ? le : it),
    $e || (mt = rn(U),
    mt = mt == k ? le : mt)
    const At = it == le && !ae(P)
    const Nt = mt == le && !ae(U)
    const yt = it == mt
    if (yt && !At) {
      return me || (me = new st()),
      Ze || mr(P) ? cr(P, U, X, ie, Ne, me) : oa(P, U, it, X, ie, Ne, me)
    }
    if (!(Ne & F)) {
      const Bt = At && f.call(P, '__wrapped__')
      const Ut = Nt && f.call(U, '__wrapped__')
      if (Bt || Ut) {
        const sn = Bt ? P.value() : P
        const Jt = Ut ? U.value() : U
        return me || (me = new st()),
        X(sn, Jt, ie, Ne, me)
      }
    }
    return yt
      ? (me || (me = new st()),
        ua(P, U, X, ie, Ne, me))
      : !1
  }
  function Js(P, U, X, ie) {
    let Ne = X.length
    const me = Ne
    const Ze = !ie
    if (P == null)
      return !me
    for (P = Object(P); Ne--;) {
      var $e = X[Ne]
      if (Ze && $e[2] ? $e[1] !== P[$e[0]] : !($e[0] in P))
        return !1
    }
    for (; ++Ne < me;) {
      $e = X[Ne]
      const it = $e[0]
      const mt = P[it]
      const At = $e[1]
      if (Ze && $e[2]) {
        if (mt === void 0 && !(it in P))
          return !1
      }
      else {
        const Nt = new st()
        if (ie)
          var yt = ie(mt, At, it, P, U, Nt)
        if (!(yt === void 0 ? xi(At, mt, ie, M | F, Nt) : yt))
          return !1
      }
    }
    return !0
  }
  function Xs(P) {
    if (!Cn(P) || fa(P))
      return !1
    const U = Li(P) || ae(P) ? y : en
    return U.test(dn(P))
  }
  function Qs(P) {
    return ei(P) && Mi(P.length) && !!Ce[g.call(P)]
  }
  function ea(P) {
    return typeof P == 'function' ? P : P == null ? wa : typeof P == 'object' ? Wt(P) ? ia(P[0], P[1]) : na(P) : ba(P)
  }
  function ta(P) {
    if (!da(P))
      return I(P)
    const U = []
    for (const X in Object(P))
      f.call(P, X) && X != 'constructor' && U.push(X)
    return U
  }
  function na(P) {
    const U = la(P)
    return U.length == 1 && U[0][2]
      ? pr(U[0][0], U[0][1])
      : function (X) {
        return X === P || Js(X, P, U)
      }
  }
  function ia(P, U) {
    return Xn(P) && dr(U)
      ? pr(Qn(P), U)
      : function (X) {
        const ie = va(X, P)
        return ie === void 0 && ie === U ? ma(X, P) : xi(U, ie, void 0, M | F)
      }
  }
  function ra(P) {
    return function (U) {
      return lr(U, P)
    }
  }
  function sa(P) {
    if (typeof P == 'string')
      return P
    if (Ri(P))
      return $ ? $.call(P) : ''
    const U = `${P}`
    return U == '0' && 1 / P == -Z ? '-0' : U
  }
  function hr(P) {
    return Wt(P) ? P : pa(P)
  }
  function aa(P) {
    return function (U, X, ie) {
      for (let Ne = -1, me = Object(U), Ze = ie(U), $e = Ze.length; $e--;) {
        const it = Ze[P ? $e : ++Ne]
        if (X(me[it], it, me) === !1)
          break
      }
      return U
    }
  }
  function cr(P, U, X, ie, Ne, me) {
    const Ze = Ne & F
    const $e = P.length
    const it = U.length
    if ($e != it && !(Ze && it > $e))
      return !1
    const mt = me.get(P)
    if (mt && me.get(U))
      return mt == U
    let At = -1
    let Nt = !0
    const yt = Ne & M ? new nt() : void 0
    for (me.set(P, U),
    me.set(U, P); ++At < $e;) {
      var Bt = P[At]
      const Ut = U[At]
      if (ie)
        var sn = Ze ? ie(Ut, Bt, At, U, P, me) : ie(Bt, Ut, At, P, U, me)
      if (sn !== void 0) {
        if (sn)
          continue
        Nt = !1
        break
      }
      if (yt) {
        if (!Bn(U, (Jt, pn) => {
          if (!yt.has(pn) && (Bt === Jt || X(Bt, Jt, ie, Ne, me)))
            return yt.add(pn)
        })) {
          Nt = !1
          break
        }
      }
      else if (!(Bt === Ut || X(Bt, Ut, ie, Ne, me))) {
        Nt = !1
        break
      }
    }
    return me.delete(P),
    me.delete(U),
    Nt
  }
  function oa(P, U, X, ie, Ne, me, Ze) {
    switch (X) {
      case ft:
        if (P.byteLength != U.byteLength || P.byteOffset != U.byteOffset)
          return !1
        P = P.buffer,
        U = U.buffer
      case Pt:
        return !(P.byteLength != U.byteLength || !ie(new v(P), new v(U)))
      case B:
      case C:
      case Me:
        return _r(+P, +U)
      case Q:
        return P.name == U.name && P.message == U.message
      case ye:
      case We:
        return P == `${U}`
      case Y:
        var $e = e
      case oe:
        var it = me & F
        if ($e || ($e = n),
        P.size != U.size && !it)
          return !1
        var mt = Ze.get(P)
        if (mt)
          return mt == U
        me |= M,
        Ze.set(P, U)
        var At = cr($e(P), $e(U), ie, Ne, me, Ze)
        return Ze.delete(P),
        At
      case ct:
        if (K)
          return K.call(P) == K.call(U)
    }
    return !1
  }
  function ua(P, U, X, ie, Ne, me) {
    const Ze = Ne & F
    const $e = ti(P)
    const it = $e.length
    const mt = ti(U)
    const At = mt.length
    if (it != At && !Ze)
      return !1
    for (var Nt = it; Nt--;) {
      var yt = $e[Nt]
      if (!(Ze ? yt in U : f.call(U, yt)))
        return !1
    }
    const Bt = me.get(P)
    if (Bt && me.get(U))
      return Bt == U
    let Ut = !0
    me.set(P, U),
    me.set(U, P)
    for (var sn = Ze; ++Nt < it;) {
      yt = $e[Nt]
      const Jt = P[yt]
      const pn = U[yt]
      if (ie)
        var yr = Ze ? ie(pn, Jt, yt, U, P, me) : ie(Jt, pn, yt, P, U, me)
      if (!(yr === void 0 ? Jt === pn || X(Jt, pn, ie, Ne, me) : yr)) {
        Ut = !1
        break
      }
      sn || (sn = yt == 'constructor')
    }
    if (Ut && !sn) {
      const ni = P.constructor
      const ii = U.constructor
      ni != ii && 'constructor' in P && 'constructor' in U && !(typeof ni == 'function' && ni instanceof ni && typeof ii == 'function' && ii instanceof ii) && (Ut = !1)
    }
    return me.delete(P),
    me.delete(U),
    Ut
  }
  function Jn(P, U) {
    const X = P.__data__
    return ca(U) ? X[typeof U == 'string' ? 'string' : 'hash'] : X.map
  }
  function la(P) {
    for (var U = ti(P), X = U.length; X--;) {
      const ie = U[X]
      const Ne = P[ie]
      U[X] = [ie, Ne, dr(Ne)]
    }
    return U
  }
  function In(P, U) {
    const X = En(P, U)
    return Xs(X) ? X : void 0
  }
  var rn = Ys;
  (m && rn(new m(new ArrayBuffer(1))) != ft || w && rn(new w()) != Y || E && rn(E.resolve()) != Se || A && rn(new A()) != oe || N && rn(new N()) != je) && (rn = function (P) {
    const U = g.call(P)
    const X = U == le ? P.constructor : void 0
    const ie = X ? dn(X) : void 0
    if (ie) {
      switch (ie) {
        case R:
          return ft
        case D:
          return Y
        case V:
          return Se
        case z:
          return oe
        case G:
          return je
      }
    }
    return U
  }
  )
  function ha(P, U, X) {
    U = Xn(U, P) ? [U] : hr(U)
    for (var ie, Ne = -1, Ze = U.length; ++Ne < Ze;) {
      var me = Qn(U[Ne])
      if (!(ie = P != null && X(P, me)))
        break
      P = P[me]
    }
    if (ie)
      return ie
    var Ze = P ? P.length : 0
    return !!Ze && Mi(Ze) && fr(me, Ze) && (Wt(P) || gr(P))
  }
  function fr(P, U) {
    return U = U ?? q,
    !!U && (typeof P == 'number' || Kt.test(P)) && P > -1 && P % 1 == 0 && P < U
  }
  function Xn(P, U) {
    if (Wt(P))
      return !1
    const X = typeof P
    return X == 'number' || X == 'symbol' || X == 'boolean' || P == null || Ri(P) ? !0 : yn.test(P) || !kt.test(P) || U != null && P in Object(U)
  }
  function ca(P) {
    const U = typeof P
    return U == 'string' || U == 'number' || U == 'symbol' || U == 'boolean' ? P !== '__proto__' : P === null
  }
  function fa(P) {
    return !!o && o in P
  }
  function da(P) {
    const U = P && P.constructor
    const X = typeof U == 'function' && U.prototype || s
    return P === X
  }
  function dr(P) {
    return P === P && !Cn(P)
  }
  function pr(P, U) {
    return function (X) {
      return X == null ? !1 : X[P] === U && (U !== void 0 || P in Object(X))
    }
  }
  var pa = Ni((P) => {
    P = ga(P)
    const U = []
    return Gt.test(P) && U.push(''),
    P.replace(Mt, (X, ie, Ne, me) => {
      U.push(Ne ? me.replace(xt, '$1') : ie || X)
    }),
    U
  })
  function Qn(P) {
    if (typeof P == 'string' || Ri(P))
      return P
    const U = `${P}`
    return U == '0' && 1 / P == -Z ? '-0' : U
  }
  function dn(P) {
    if (P != null) {
      try {
        return l.call(P)
      }
      catch {}
      try {
        return `${P}`
      }
      catch {}
    }
    return ''
  }
  function Ni(P, U) {
    if (typeof P != 'function' || U && typeof U != 'function')
      throw new TypeError(p)
    const X = function () {
      const ie = arguments
      const Ne = U ? U.apply(this, ie) : ie[0]
      const me = X.cache
      if (me.has(Ne))
        return me.get(Ne)
      const Ze = P.apply(this, ie)
      return X.cache = me.set(Ne, Ze),
      Ze
    }
    return X.cache = new (Ni.Cache || xe)(),
    X
  }
  Ni.Cache = xe
  function _r(P, U) {
    return P === U || P !== P && U !== U
  }
  function gr(P) {
    return _a(P) && f.call(P, 'callee') && (!x.call(P, 'callee') || g.call(P) == k)
  }
  var Wt = Array.isArray
  function vr(P) {
    return P != null && Mi(P.length) && !Li(P)
  }
  function _a(P) {
    return ei(P) && vr(P)
  }
  function Li(P) {
    const U = Cn(P) ? g.call(P) : ''
    return U == J || U == ne
  }
  function Mi(P) {
    return typeof P == 'number' && P > -1 && P % 1 == 0 && P <= q
  }
  function Cn(P) {
    const U = typeof P
    return !!P && (U == 'object' || U == 'function')
  }
  function ei(P) {
    return !!P && typeof P == 'object'
  }
  function Ri(P) {
    return typeof P == 'symbol' || ei(P) && g.call(P) == ct
  }
  var mr = kn ? Qe(kn) : Qs
  function ga(P) {
    return P == null ? '' : sa(P)
  }
  function va(P, U, X) {
    const ie = P == null ? void 0 : lr(P, U)
    return ie === void 0 ? X : ie
  }
  function ma(P, U) {
    return P != null && ha(P, U, $s)
  }
  function ti(P) {
    return vr(P) ? Dt(P) : ta(P)
  }
  function ya(P, U, X) {
    const ie = Wt(P) || mr(P)
    if (U = ea(U),
    X == null) {
      if (ie || Cn(P)) {
        const Ne = P.constructor
        ie ? X = Wt(P) ? new Ne() : [] : X = Li(Ne) ? Tn(b(P)) : {}
      }
      else { X = {} }
    }
    return (ie ? Sn : Oi)(P, (me, Ze, $e) => {
      return U(X, me, Ze, $e)
    }),
    X
  }
  function wa(P) {
    return P
  }
  function ba(P) {
    return Xn(P) ? Je(Qn(P)) : ra(P)
  }
  c.exports = ya
}
)(Hi, Hi.exports)
const Ku = Hi.exports
const { Commands: Yu } = vo
const Gu = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="spinner" aria-label="loading">
    <path
      d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
      opacity=".25"
    />
    <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" />
  </svg>
`
const Ti = (c) => {
  try {
    if (c.dataset?.state === 'loading')
      return
    c.disabled = !0,
    c.dataset.state = 'loading',
    c.innerHTML = `
      <div class="spinner-container">
        ${Gu}
      </div>
      <div class="loading-container">
        ${c.innerHTML}
      </div>
    `
  }
  catch {
    console.error('failed to start loading', c)
  }
}
const Ii = (c) => {
  try {
    if (c.dataset?.state !== 'loading')
      return
    delete c.dataset.state,
    c.disabled = !1
    let a = null
    for (let h = 0; h < c.childElementCount; h++) {
      const p = c.children[h]
      if (p.classList?.contains('loading-container')) {
        a = p
        break
      }
    }
    c.innerHTML = a.innerHTML
  }
  catch (a) {
    console.error('failed to stop loading', c, a)
  }
}

const Yn = class extends EventTarget {
  constructor(a) {
    super(),
    this.tool = new ce.Tool(),
    this.lastTolerance = 5,
    this.selectedSegments = [],
    this.editor = a,
    this.tool.onKeyDown = (h) => {
      this.onKeyDown(h)
    }
    ,
    this.tool.onMouseDown = (h) => {
      this.onMouseDown(h)
    }
    ,
    this.tool.onMouseDrag = (h) => {
      this.onMouseDrag(h)
    }
    ,
    this.tool.onMouseMove = (h) => {
      this.onMouseMove(h)
    }
    ,
    this.tool.onMouseUp = (h) => {
      this.onMouseUp(h)
    }
  }

  hitTestActiveLayer(a) {
    return ce.project.hitTest(a, {
      segments: !0,
      stroke: !0,
      fill: !0,
      tolerance: this.lastTolerance,
      match: h => h.item.layer == ce.project.activeLayer && !h.item.name.includes('Background') && !h.item.name.includes('Checkerboard'),
    })
  }

  onMouseDown(a) {
    a.event.pointerId && this.editor.canvas.setPointerCapture(a.event.pointerId || 1),
    this.clampToBounds(a),
    this.button = !a.event.button || a.event.button <= 0 ? this.editor.selectedTool : a.event.button,
    this.minDistance = this.button == 2 ? this.lastTolerance * 2 : 0,
    this.currentSegment = this.currentPath = null
    const h = this.hitTestActiveLayer(a.point)
    if (!this.button || this.button <= 0) {
      this.currentPath = new ce.Path.Rectangle({
        from: a.point,
        to: a.point,
      }),
      this.currentPath.strokeColor = new ce.Color('#eeeeee'),
      this.currentPath.strokeColor.alpha = 1,
      this.currentPath.strokeCap = 'round',
      this.currentPath.isRectangle = !0,
      this.currentPath.strokeWidth = 4,
      this.currentPath.strokeColor = new ce.Color('rgba(255,255,255,1)'),
      this.currentPath.dashArray = [10, 10],
      this.currentPath.add(a.point),
      this.editor.drawingLayer.addChild(this.currentPath)
    }
    else if (this.button == 0.5) {
      this.currentPath = new ce.Path({
        segments: [a.point],
      }),
      this.currentPath.strokeWidth = 4,
      this.currentPath.strokeColor = new ce.Color('rgba(255,255,255,1)'),
      this.currentPath.dashArray = [10, 10],
      this.currentPath.add(a.point),
      this.currentPath.strokeCap = 'round',
      this.currentPath.isStroke = !0,
      this.currentPath.closed = !0,
      this.currentPath.fillColor = new ce.Color(1, 1, 1),
      this.editor.drawingLayer.addChild(this.currentPath)
    }
    else if (this.button == 1) {
      if (!h) {
        this.selectionRectPath = new ce.Path.Rectangle({
          from: a.point,
          to: a.point,
        })
      }
      else if (this.selectedSegments.length > 0) { this.markForSave = !0 }
      else if (this.currentPath = h.item,
      this.currentPath && (this.saveItemStateForUndo(h.item),
      h.type == 'stroke' || h.type == 'fill')) {
        if (this.editor.movePath) { this.currentSegment = null }
        else {
          const p = h.location
          this.currentSegment = this.currentPath.insert(p.index + 1, a.point),
          this.currentPath.smooth()
        }
      }
    }
    else if (h && this.button == 2) {
      if (this.selectedSegments.length > 0) {
        for (let p = ce.project.selectedItems.length - 1; p >= 0; p--) {
          const d = ce.project.selectedItems[p]
          d.selected = !1,
          this.saveItemStateForUndo(d),
          d.remove()
        }
      }
      else {
        h.type == 'stroke' || h.type == 'fill' || h.segment.path.segments.length <= 2
          ? (this.saveItemStateForUndo(h.item),
            h.item.remove())
          : h.type == 'segment' && (this.saveItemStateForUndo(h.item),
          h.segment.remove())
      }
    }
  }

  onMouseMove(a) {
    if (this.clampToBounds(a),
    this.selectedSegments.length == 0) {
      ce.project.activeLayer.selected = !1
      const h = this.hitTestActiveLayer(a.point)
      h && (h.item.selected = !0,
      h.item.strokeWidth && (this.lastTolerance = Math.max(h.item.strokeWidth / 4, 5)))
    }
  }

  onMouseDrag(a) {
    if (this.clampToBounds(a),
    !this.button || this.button <= 0) {
      if (ce.project.activeLayer.selected = !1,
      this.currentPath && this.currentPath.isRectangle) {
        const h = new ce.Path.Rectangle(a.downPoint, a.point)
        h.fillColor = 'white',
        this.currentPath.replaceWith(h),
        this.currentPath.remove(),
        this.currentPath = h,
        this.currentPath.bounds.selected = !0,
        this.currentPath.isRectangle = !0
      }
    }
    else if (this.button == 0.5) {
      ce.project.activeLayer.selected = !1,
      this.currentPath.add(a.point)
    }
    else if (this.button == 1) {
      if (this.selectionRectPath) {
        const h = new ce.Path.Rectangle(a.downPoint, a.point)
        this.selectionRectPath.replaceWith(h),
        this.selectionRectPath.remove(),
        this.selectionRectPath = h,
        this.selectionRectPath.bounds.selected = !0,
        this.selectedSegments = []
        for (let d = 0; d < ce.project.selectedItems.length; d++)
          ce.project.selectedItems[d].selected = !1
        const p = this.editor.drawingLayer.getItems({
          overlapping: h.bounds,
        })
        for (let d = 0; d < p.length; d++) {
          if (p[d].segments) {
for (let M = 0; M < p[d].segments.length; M++)
            this.selectionRectPath.bounds.contains(p[d].segments[M].point) && (p[d].segments[M].selected = !0,
            this.selectedSegments.push(p[d].segments[M]))
}
        }
      }
      else if (this.selectedSegments.length > 0) {
        if (this.markForSave) {
          for (let h = ce.project.selectedItems.length - 1; h >= 0; h--)
            this.saveItemStateForUndo(ce.project.selectedItems[h])
          this.markForSave = !1
        }
        for (let h = 0; h < this.selectedSegments.length; h++)
          this.selectedSegments[h].point = this.selectedSegments[h].point.add(a.delta)
      }
      else { this.currentSegment ? this.currentSegment.point = this.currentSegment.point.add(a.delta) : this.currentPath && (this.currentPath.position = this.currentPath.position.add(a.delta)) }
    }
    else if (this.button == 2) {
      const h = this.hitTestActiveLayer(a.point)
      if (!h)
        return
      h.type == 'stroke' || h.type == 'fill' || h.segment.path.segments.length <= 2
        ? (this.saveItemStateForUndo(h.item),
          h.item.remove())
        : h.type == 'segment' && (this.saveItemStateForUndo(h.item),
        h.segment.remove())
    }
  }

  onMouseUp(a) {
    a.event.pointerId && this.editor.canvas.releasePointerCapture(a.event.pointerId || 1),
    this.clampToBounds(a),
    this.selectionRectPath && (this.selectionRectPath.remove(),
    this.selectionRectPath = null),
    (!this.button || this.button <= 0.5) && (this.currentPath.isRectangle || (this.currentPath.segments.length > 1 ? this.currentPath.simplify(3) : this.currentPath.add(a.point),
    this.currentPath.strokeColor = new ce.Color('#ffffff')),
    this.clearSelection(),
    this.dispatchEvent(new Event('newStroke', {
      name: this.currentPath.name,
    })),
    this.currentPath.bounds.selected = !1,
    this.currentPath.name = `Stroke-${this.stringHashCode(this.currentPath.toString())}`,
    this.currentPath.strokeColor = null,
    this.editor.undoLayer.addChild(new ce.Group({
      name: this.editor.removeCmd + this.currentPath.name,
    })),
    this.editor.redoLayer.removeChildren())
  }

  async onKeyDown(a) {
    if (a.key == 'enter') {
      if (a.preventDefault(),
      a.stopPropagation(),
      this.editor.submitButton.disabled || this.editor.submitButton.dataset?.state === 'loading')
        return
      Ti(this.editor.submitButton)
      try {
        await this.editor.submit().catch(h => this.editor.displayError(h?.toString()))
      }
      finally {
        Ii(this.editor.submitButton)
      }
    }
    else { (a.modifiers.control || a.modifiers.meta) && (a.key == 'z' ? this.editor.undo() : a.key == 'y' && this.editor.redo()) }
  }

  clearSelection() {
    for (let a = 0; a < this.selectedSegments.length; a++)
      this.selectedSegments[a].selected = !1
    this.selectedSegments = []
    for (let a = 0; a < ce.project.selectedItems.length; a++)
      ce.project.selectedItems[a].selected = !1
  }

  saveItemStateForUndo(a) {
    a.name || (a.name = `ForeignObject-${this.stringHashCode(a.toString())}`)
    const h = a.clone()
    h.name = a.name,
    this.editor.undoLayer.addChild(h),
    this.editor.redoLayer.removeChildren()
  }

  stringHashCode(a) {
    let h = 0
    if (a.length == 0)
      return h
    for (let p = 0; p < a.length; p++) {
      const d = a.charCodeAt(p)
      h = (h << 5) - h + d,
      h = h & h
    }
    return h
  }

  clampToBounds(a) {
    const h = this.editor.backgroundImageElement.width
    const p = this.editor.backgroundImageElement.height
    a.point = a.point.set(Math.min(h * 0.5, Math.max(-h * 0.5, a.point.x)), Math.min(p * 0.5, Math.max(-p * 0.5, a.point.y)))
  }
}

const Ci = class {
  constructor(a) {
    this.omniTool = a,
    this.promptBarAvailable = !1
  }

  start() {
    this.omniTool.addEventListener('newStroke', () => {
      this.promptBarAvailable
        ? (this.createPopover('When you\'re ready, edit the prompt to describe the new image'),
          document.getElementById('Prompt').addEventListener('input', () => {
            this.createPopover('按右下角箭头提交')
          }
          , {
            once: !0,
          }))
        : this.createPopover('按右下角箭头提交')
    }
    , {
      once: !0,
    }),
    this.createPopover('请拖动选择要更改的区域')
  }

  setPromptBarAvailable(a) {
    this.promptBarAvailable = a
  }

  createPopover(a) {
    const h = document.getElementById('popover-container')
    h.innerHTML = ''
    const p = document.createElement('div')
    p.className = 'popover',
    p.innerText = a,
    h.appendChild(p)
  }
}

const ar = document.getElementById('modal-container')
document.addEventListener('click', (c) => {
  c.target.classList.contains('modal-backdrop') && Ai()
},
)
var Ai = () => {
  ar.innerHTML = ''
}
const hn = (c) => {
  const a = c.header !== void 0
  ar.innerHTML = ''
  const h = document.createElement('div')
  h.classList.add('modal')
  const p = document.createElement('div')
  if (p.classList.add('modal-body'),
  p.innerHTML = `
    ${a
? `<div class="modal-header">
      ${c.header}
    </div>`
: ''}
    <div class="modal-content">
      ${c.content}
    </div>
  `,
  c.footer !== void 0) {
    const F = document.createElement('div')
    F.classList.add('modal-footer'),
    c.footer && (typeof c.footer == 'string' ? F.innerHTML = c.footer : F.appendChild(c.footer)),
    p.appendChild(F)
  }
  const M = document.createElement('div')
  M.classList.add('modal-backdrop'),
  h.appendChild(M),
  h.appendChild(p),
  ar.appendChild(h)
}

const Zu = {
  '': ['<em>', '</em>'],
  '_': ['<strong>', '</strong>'],
  '*': ['<strong>', '</strong>'],
  '~': ['<s>', '</s>'],
  '\n': ['<br />'],
  ' ': ['<br />'],
  '-': ['<hr />'],
}
function Ks(c) {
  return c.replace(RegExp(`^${(c.match(/^(\t| )+/) || '')[0]}`, 'gm'), '')
}
function $n(c) {
  return (`${c}`).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function Wn(c, a) {
  const h = /((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^``` *(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:!\[([^\]]*?)\]\(([^)]+?)\))|(\[)|(\](?:\(([^)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,6})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|( {2}\n\n*|\n{2,}|__|\*\*|[_*]|~~)/gm; const p = []; let d = ''; const M = a || {}; let F = 0; let Z; let q; let k; let O; let B
  function C(J) {
    const ne = Zu[J[1] || '']
    const Y = p[p.length - 1] == J
    return ne
      ? ne[1]
        ? (Y ? p.pop() : p.push(J),
          ne[Y | 0])
        : ne[0]
      : J
  }
  function Q() {
    let J = ''
    for (; p.length;)
      J += C(p[p.length - 1])
    return J
  }
  for (c = c.replace(/^\[(.+?)\]:\s*(.+)$/gm, (J, ne, Y) => (M[ne.toLowerCase()] = Y,
  '')).replace(/^\n+|\n+$/g, ''); k = h.exec(c);) {
    q = c.substring(F, k.index),
    F = h.lastIndex,
    Z = k[0],
    q.match(/[^\\](\\\\)*\\$/) || ((B = k[3] || k[4])
      ? Z = `<pre class="code ${k[4] ? 'poetry' : k[2].toLowerCase()}"><code${k[2] ? ` class="language-${k[2].toLowerCase()}"` : ''}>${Ks($n(B).replace(/^\n+|\n+$/g, ''))}</code></pre>`
      : (B = k[6])
          ? (B.match(/\./) && (k[5] = k[5].replace(/^\d+/gm, '')),
            O = Wn(Ks(k[5].replace(/^\s*[>*+.-]/gm, ''))),
            B == '>'
              ? B = 'blockquote'
              : (B = B.match(/\./) ? 'ol' : 'ul',
                O = O.replace(/^(.*)(\n|$)/gm, '<li>$1</li>')),
            Z = `<${B}>${O}</${B}>`)
          : k[8]
            ? Z = `<img src="${$n(k[8])}" alt="${$n(k[7])}">`
            : k[10]
              ? (d = d.replace('<a>', `<a href="${$n(k[11] || M[q.toLowerCase()])}">`),
                Z = `${Q()}</a>`)
              : k[9]
                ? Z = '<a>'
                : k[12] || k[14]
                  ? (B = `h${k[14] ? k[14].length : k[13] > '=' ? 1 : 2}`,
                    Z = `<${B}>${Wn(k[12] || k[15], M)}</${B}>`)
                  : k[16] ? Z = `<code>${$n(k[16])}</code>` : (k[17] || k[1]) && (Z = C(k[17] || '--'))),
    d += q,
    d += Z
  }
  return (d + c.substring(F) + Q()).replace(/^\n+|\n+$/g, '')
}
const or = class extends Error {
  constructor(a, h) {
    super(`${a}: ${h}`),
    this.responseText = h
  }
}
const Pi = class {
  constructor() {}
  async getImageInfo(a, h, p) {
    return await fetch(`./api/get-image-info/${a}/${h}/${p}`).then(this._handleResponse)
  }

  async _handleResponse(a) {
    if (a.ok || a.status >= 400 < 500)
      return await a.json()
    const h = await a.text()
    throw new or(`request failed with ${a.status}`, h)
  }
}

const ur = class {
  constructor() {
    this.keymap = new Set(),
    this.width = 1024,
    this.height = 1024,
    this.movePath = !0,
    this.removeCmd = 'Remove-',
    this.selectedTool = 0,
    this.omniTool = new Yn(this),
    this.onboarding = new Ci(this.omniTool),
    this.api = new Pi(),
    window.addEventListener('message', (e) => {
      // console.log("message",e.data);
      const obj = JSON.parse(e.data)
      this.imgInfo = obj.img_info
      this.setup()
    })
    // this.setup()
  }

  async setup() {
    if (this.imageURL = './assets/strawberryshake.webp',
    this.inIFrame = window.location.search != '',
    this.currentPath = null,
    document.addEventListener('keydown', this.onKeyDown.bind(this)),
    document.addEventListener('keyup', this.onKeyUp.bind(this)),
    this.inIFrame) {
      if (this.searchParams = new URLSearchParams(window.location.search),
      this.customId = this.searchParams.get('custom_id').split('::')[2],
      this.applicationId = this.searchParams.get('instance_id').split(':')[1],
      this.guildId = this.searchParams.get('guild_id'),
      this.channelId = this.searchParams.get('channel_id'),
      this.platform = this.searchParams.get('platform'),
      // this.imgInfo = this.searchParams.get("img_info") && JSON.parse(this.searchParams.get("img_info")),
      this.discord = null) {
        try {
          const d = window.location.hostname.split('.')[0]
          this.discord = new di(d),
          console.log('Discord SDK was initialized!', this.discord)
        }
        catch (d) {
          console.error('Discord SDK could not be initialized!', d)
        }
      }
      this.userId = '0',
      this.userName = '0'
      const p = this.imgInfo
      if (p.error === 'invalid_id') {
        console.error('Error fetching image info:', p),
        this.discord != null && (p.message = 'This session is invalid. Please relaunch the editor from the original message.'),
        hn({
          header: 'Error',
          content: p.message,
          footer: this.createDefaultCloseButton(),
        })
        return
      }
      // console.log("Fetched Image info:", p),
      this.prompt = p.prompt,
      this.input_job_id = p.child_job_id,
      this.input_index = p.image_num,
      this.has_prompt_enabled = p.has_prompt_enabled,
      this.imageURL = p.image_url
    }
    else { this.has_prompt_enabled = !0 }
    this.backgroundImageElement = await this.loadImageAsync(this.imageURL),
    this.width = this.backgroundImageElement.width,
    this.height = this.backgroundImageElement.height,
    await this.forPageLoadAsync(),
    this.canvas = document.getElementById('InpaintingEditorCanvas'),
    ce.setup(this.canvas),
    ce.project.activeLayer.name = 'EditorWorkspace',
    this.checkerboardImage = new ce.Raster('./assets/checkerboard.png'),
    this.checkerboardImage.name = 'CheckerboardImage',
    this.checkerboardImage.position = new ce.Point(0, 0),
    this.checkerboardImage.strokeWidth = 0,
    this.checkerboardImage.scale(Math.max(this.width, this.height) / 1024),
    this.drawingLayer = new ce.Group({
      name: 'Drawing',
      blendMode: 'destination-atop',
    }),
    this.undoLayer = new ce.Group({
      name: 'Undo',
      visible: !1,
    }),
    this.redoLayer = new ce.Group({
      name: 'Redo',
      visible: !1,
    }),
    ce.project.activeLayer.addChildren(new ce.Group({
      name: 'CheckerboardCompositingGroup',
      children: [this.checkerboardImage, this.drawingLayer],
      blendMode: 'source-over',
      opacity: 0.4,
    }), this.undoLayer),
    ce.project.activeLayer.addChild(this.redoLayer),
    ce.view.onFrame = (p) => {
      this.checkerboardImage.visible = !1
      for (let d = 0; d < this.drawingLayer.children.length; d++) {
        if (this.drawingLayer.children[d].bounds.area > 0) {
          this.checkerboardImage.visible = !0
          break
        }
      }
    }
    ,
    ce.view.onResize = this.onResize.bind(this)
    let a = !1
    this.toolbar = document.getElementById('appbody'),
    this.toolbar.addEventListener('mousedown', (p) => {
      a = !0
    },
    ),
    document.body.addEventListener('mouseup', (p) => {
      a = !1,
      this.toolbar.classList.remove('fadeout')
    },
    )
    const h = document.getElementById('popover-container')
    document.addEventListener('mousemove', (p) => {
      p.buttons
    },
    ),
    ce.view.onMouseMove = (p) => {
      !(p.event.buttons === 1) || a || h.classList.add('fadeout')
    }
    ,
    ce.view.onMouseDown = ce.view.onMouseMove,
    ce.view.onMouseUp = (p) => {
      h.classList.remove('fadeout')
    }
    ,
    ce.view.onMouseLeave = (p) => {
      h.classList.remove('fadeout')
    }
    ,
    document.getElementById('Undo').addEventListener('click', () => {
      this.undo()
    }
    , !1),
    document.getElementById('Rect Tool').addEventListener('click', () => {
      this.selectedTool = 0,
      this.highlightSelected()
    }
    , !1),
    document.getElementById('Lasso Tool').addEventListener('click', () => {
      this.selectedTool = 0.5,
      this.highlightSelected()
    }
    , !1),
    this.bottomBar = document.getElementById('bottomBar'),
    this.promptBar = document.getElementById('Prompt'),
    this.promptBar.addEventListener('paste', (p) => {
      p.preventDefault(),
      p.stopPropagation()
      const d = (p.originalEvent || p).clipboardData.getData('text/plain')
      document.execCommand('insertText', !1, d)
    },
    ),
    this.submitLabel = document.getElementById('submit-label'),
    this.submitButton = document.getElementById('Submit'),
    this.submitButton.addEventListener('click', async (p) => {
      const d = p.target
      if (d instanceof HTMLButtonElement && !(d.disabled || d.dataset?.state === 'loading')) {
        Ti(d)
        try {
          await this.submit().catch(M => this.displayError(M?.toString()))
        }
        finally {
          Ii(d)
        }
      }
    }
    , !1),
    this.has_prompt_enabled && (this.bottomBar.classList.remove('noFill'),
    this.promptBar.classList.remove('hidden'),
    this.submitButton.classList.remove('withText'),
    this.submitLabel.innerText = '',
    this.onboarding.setPromptBarAvailable(!0)),
    setInterval(() => {
      this.submitButton instanceof HTMLButtonElement && (this.submitButton.disabled = this.drawingLayer.children.length === 0)
    }
    , 100),
    this.prompt && (this.promptBar.textContent = this.prompt),
    this.highlightSelected(),
    this.onResize(),
    this.backgroundImage = new ce.Raster(this.backgroundImageElement),
    this.backgroundImage.name = 'BackgroundImage',
    this.backgroundImage.position = new ce.Point(0, 0),
    this.backgroundImage.strokeWidth = 0,
    this.backgroundImage.insertBelow(this.drawingLayer.parent),
    this.canvas.setAttribute('oncontextmenu', 'return false;'),
    ce.settings.handleSize = 0
    try {
      const p = window.localStorage.getItem(this.imageURL)
      p && ce.project.importSVG(p, {
        expandShapes: !0,
        insert: !1,
        onLoad: (M) => {
          M.translate(new ce.Point(-this.width / 2, -this.height / 2)),
          M.getItems({
            recursive: !0,
          }).forEach((F) => {
            F.name == this.drawingLayer.name ? this.drawingLayer.children = F.children : F.name == this.undoLayer.name ? this.undoLayer.children = F.children : F.name == this.redoLayer.name && (this.redoLayer.children = F.children)
          },
          ),
          this.inIFrame && (document.getElementById('popover-container').innerHTML = '')
        },
        onError: (M) => {
          console.error(M)
        },
      })
      const d = window.localStorage.getItem(`${this.imageURL}-Prompt`)
      d && (this.prompt = d,
      this.promptBar.textContent = d)
    }
    catch (p) {
      console.log('Couldn\'t load Local Storage', p)
    }
    Ai(),
    this.onboarding.start()
  }

  onKeyDown(a) {
    this.keymap.add(a.key)
  }

  onKeyUp(a) {
    if (this.keymap.delete(a.key),
    a.key === 'Escape') {
      const h = document.getElementById('Prompt')
      h == document.activeElement ? h.blur() : this.close('User Exited')
    }
  }

  onResize(a) {
    let h = 0
    if (a && a.canonicalSpace) {
      ce.view.viewSize.set(this.width / window.devicePixelRatio, this.height / window.devicePixelRatio),
      ce.view.zoom = 1 / window.devicePixelRatio
    }
    else {
      const d = this.toolbar.getBoundingClientRect().height * 1.75
      h = d
      const M = this.canvas.width / window.devicePixelRatio
      const F = this.canvas.height / window.devicePixelRatio
      ce.view.zoom = Math.max(0.01, Math.min(M / this.width, (F - d) / this.height) * 0.95)
    }
    ce.view.translate(new ce.Point(ce.view.center.x, ce.view.center.y - h * 0.5 / ce.view.zoom)),
    ce.view.update()
  }

  undo() {
    this.processDoCommand(this.drawingLayer, this.undoLayer, this.redoLayer)
  }

  redo() {
    this.processDoCommand(this.drawingLayer, this.redoLayer, this.undoLayer)
  }

  close(a = 'Job Submitted!') {
    this.discord != null && this.discord.close(ci.CLOSE_NORMAL, a)
  }

  processDoCommand(a, h, p) {
    const d = h.lastChild
    if (d) {
      if (d.name && d.name.startsWith(this.removeCmd)) {
        const M = d.name.substring(this.removeCmd.length)
        const F = a.getItem({
          match: Z => Z.name == M,
        })
        p.addChild(F),
        d.remove()
      }
      else {
        const M = a.getItem({
          match: F => F.name == d.name,
        })
        if (M) {
          const F = M.clone()
          F.name = M.name,
          p.addChild(F),
          M.replaceWith(d)
        }
        else {
          a.addChild(d),
          p.addChild(new ce.Group({
            name: this.removeCmd + d.name,
          }))
        }
      }
    }
  }

  async submit() {
    document.getElementById('popover-container').innerHTML = '',
    document.getElementById('Prompt').blur()
    const a = this.drawingLayer.children.length
    const h = this.drawingLayer.children
    if (console.log({
      childLength: a,
    }),
    a == 0) {
      hn({
        header: '请进行选择',
        content: '要使用修复功能，请开始拖动以选择您想要替换的图像区域。',
        footer: this.createDefaultCloseButton('好的'),
      })
      return
    }
    let p = 0
    for (let ye = 0; ye < a; ye++) {
      const oe = h[ye]
      oe.name.includes('Image') || (p += oe.bounds.width * oe.bounds.height)
    }
    if (p < 1e4) {
      hn({
        header: '选择的区域太小了',
        content: '为了获得最佳效果，您需要选择更多的图像来替换。',
        footer: this.createDefaultCloseButton('好的'),
      })
      return
    }
    const d = document.getElementById('Prompt').textContent
    const M = ce.view.viewSize.width
    const F = ce.view.viewSize.height
    this.omniTool.clearSelection(),
    ce.project.activeLayer.selected = !1,
    this.currentPath && (this.currentPath.bounds.selected = !1)
    const Z = this.drawingLayer.parent.opacity
    this.drawingLayer.parent.opacity = 1,
    this.drawingLayer.blendMode = 'normal',
    this.checkerboardImage.visible = !1,
    // console.log("Submitting Job..."),
    this.onResize({
      canonicalSpace: !0,
    })
    let q = ce.project.exportSVG({
      asString: !0,
    })
    let k = q.indexOf('<image')
    let O = q.indexOf('/>', k)
    q = q.substring(0, k) + q.substring(O + 2),
    k = q.indexOf('<image'),
    O = q.indexOf('/>', k),
    q = q.substring(0, k) + q.substring(O + 2),
    q = q.replace(/width="\d*\.?\d+" height="\d*\.?\d+" viewBox="0,0,\d*\.?\d+,\d*\.?\d+"/g, `width="${this.width}" height="${this.height}" viewBox="0,0,${this.width},${this.height}"`),
    q = q.replace(/transform="translate\(\d*\.?\d+,\d*\.?\d+\) scale\(\d*\.?\d+,\d*\.?\d+\)"/g, `transform="translate(${this.width / 2},${this.height / 2}) scale(1.0,1.0)"`)
    try {
      window.localStorage.setItem(this.imageURL, q),
      window.localStorage.setItem(`${this.imageURL}-Prompt`, d)
    }
    catch (ye) {
      console.log('Cannot access local storage!', ye)
    }
    const B = new ce.Path.Rectangle(ce.view.bounds)
    B.fillColor = 'white',
    B.sendToBack()
    for (let ye = 0; ye < a; ye++) {
      const oe = h[ye]
      oe.name.includes('Image') || (oe.visible = !0)
    }
    const C = []
    const Q = this.backgroundImage
    if (Q.name && Q.visible && Q.name.includes('Image')) {
      const ye = new ce.Path.Rectangle(Q.bounds)
      ye.fillColor = 'black',
      ye.insertAbove(Q),
      ye.name = 'Occluder',
      C.push(ye)
    }
    this.omniTool.clearSelection(),
    ce.project.activeLayer.selected = !1,
    this.currentPath && (this.currentPath.bounds.selected = !1),
    this.onResize({
      canonicalSpace: !0,
    }),
    ce.view.update(),
    this.omniTool.clearSelection(),
    ce.project.activeLayer.selected = !1,
    this.currentPath && (this.currentPath.bounds.selected = !1),
    this.onResize({
      canonicalSpace: !0,
    })
    const J = ce.view.getContext()
    const ne = J.getImageData(0, 0, this.canvas.width / window.devicePixelRatio, this.canvas.height / window.devicePixelRatio)
    const Y = ne.data
    for (let ye = 0; ye < Y.length; ye += 4) {
      Y[ye + 0] = Y[ye + 0] > 128 ? 255 : 0,
      Y[ye + 1] = Y[ye + 1] > 128 ? 255 : 0,
      Y[ye + 2] = Y[ye + 2] > 128 ? 255 : 0,
      Y[ye + 3] = 255
    }
    J.putImageData(ne, 0, 0)
    const Me = this.canvas.toDataURL(`image/${this.imgInfo.img_type}`, 1)
    const le = document.createElement('a')
    this.inIFrame || (le.download = 'drawingExportMask.webp',
    le.href = Me,
    le.click())
    for (let ye = 0; ye < C.length; ye++)
      C[ye].remove()
    B.remove(),
    ce.view.viewSize.set(M, F),
    ce.view.update(),
    this.onResize(),
    this.drawingLayer.parent.opacity = Z,
    this.drawingLayer.blendMode = 'destination-atop',
    this.checkerboardImage.visible = !0,
    this.inIFrame || await new Promise(ye => setTimeout(ye, 2e3))
    const Se = Me.split(',')[1]
    const ret = {
      username: this.userName,
      userId: this.userId,
      customId: this.customId,
      prompt: d,
      full_prompt: null,
      mask: Se,
    }
    // localStorage.setItem("mj-iframe-btn-click","1");
    // localStorage.setItem("mj-iframe-btn-click-ret",JSON.stringify(ret));
    window.parent.postMessage(JSON.stringify(ret), '*')
  }

  async submitToBackend(a, h, p, d, M, F = null, aid) {
    let Z = await fetch(`https://${aid}.discordsays.com/inpaint/api/submit-job`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: a,
        userId: h,
        customId: p,
        mask: d,
        prompt: M,
        full_prompt: F,
      }),
    })
    return Z.status == 200
      ? (Z = await Z.json(),
        !this.keymap.has('Shift') && !this.keymap.has('Alt') && (this.close(),
        hn({
          header: 'Job Submitted!',
          content: 'Your job was submitted successfully! You can now close this window, or make additional edits.',
          footer: this.createDefaultCloseButton(),
        })),
        Z)
      : Z.status >= 400 < 500
        ? (Z = await Z.json(),
          console.error('Received Error Response!', Z),
          hn({
            header: 'Error',
            content: Z.message,
            footer: this.createDefaultCloseButton(),
          }),
          Z)
        : (hn({
            header: 'Error',
            content: 'There was an error submitting your job. Please try again later.',
            footer: this.createDefaultCloseButton(),
          }),
          null)
  }

  createDefaultCloseButton(a = 'Close') {
    const h = document.createElement('button')
    return h.className = 'modal-button',
    h.addEventListener('click', Ai),
    h.innerText = a,
    h
  }

  displayError(a) {
    hn({
      header: '\u274C Submission Error!',
      content: `<p id="errorMessage">${Wn(a)}</p>`,
      footer: this.createDefaultCloseButton(),
    })
  }

  highlightSelected() {
    const a = document.getElementById('Rect Tool')
    const h = document.getElementById('Lasso Tool')
    a.classList.remove('selected'),
    h.classList.remove('selected'),
    this.selectedTool == 0 ? a.classList.add('selected') : this.selectedTool == 0.5 && h.classList.add('selected')
  }

  loadImageAsync(a) {
    return new Promise((h, p) => {
      const d = new Image()
      d.src = a,
      d.crossOrigin = 'anonymous',
      d.onload = () => h(d),
      d.onerror = () => p(new Error('could not load image'))
    },
    )
  }

  forPageLoadAsync() {
    return new Promise((a) => {
      document.readyState === 'complete' ? a() : window.onload = a.bind(this)
    },
    )
  }
}

window.inpaintingEditor = new ur()
export { ur as InpaintingEditor }
/*!
 * Paper.js v0.12.17 - The Swiss Army Knife of Vector Graphics Scripting.
 * http://paperjs.org/
 *
 * Copyright (c) 2011 - 2020, Jürg Lehni & Jonathan Puckey
 * http://juerglehni.com/ & https://puckey.studio/
 *
 * Distributed under the MIT license. See LICENSE file for details.
 *
 * All rights reserved.
 *
 * Date: Thu Nov 3 21:15:36 2022 +0100
 *
 ***
 *
 * Straps.js - Class inheritance library with support for bean-style accessors
 *
 * Copyright (c) 2006 - 2020 Jürg Lehni
 * http://juerglehni.com/
 *
 * Distributed under the MIT license.
 *
 ***
 *
 * Acorn.js
 * https://marijnhaverbeke.nl/acorn/
 *
 * Acorn is a tiny, fast JavaScript parser written in JavaScript,
 * created by Marijn Haverbeke and released under an MIT license.
 *
 */
