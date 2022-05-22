
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function (confetti) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var confetti__default = /*#__PURE__*/_interopDefaultLegacy(confetti);

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_svg_attributes(node, attributes) {
        for (const key in attributes) {
            attr(node, key, attributes[key]);
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = append_empty_stylesheet(node).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.43.0' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /**
     * @typedef {Object} WrappedComponent Object returned by the `wrap` method
     * @property {SvelteComponent} component - Component to load (this is always asynchronous)
     * @property {RoutePrecondition[]} [conditions] - Route pre-conditions to validate
     * @property {Object} [props] - Optional dictionary of static props
     * @property {Object} [userData] - Optional user data dictionary
     * @property {bool} _sveltesparouter - Internal flag; always set to true
     */

    /**
     * @callback AsyncSvelteComponent
     * @returns {Promise<SvelteComponent>} Returns a Promise that resolves with a Svelte component
     */

    /**
     * @callback RoutePrecondition
     * @param {RouteDetail} detail - Route detail object
     * @returns {boolean|Promise<boolean>} If the callback returns a false-y value, it's interpreted as the precondition failed, so it aborts loading the component (and won't process other pre-condition callbacks)
     */

    /**
     * @typedef {Object} WrapOptions Options object for the call to `wrap`
     * @property {SvelteComponent} [component] - Svelte component to load (this is incompatible with `asyncComponent`)
     * @property {AsyncSvelteComponent} [asyncComponent] - Function that returns a Promise that fulfills with a Svelte component (e.g. `{asyncComponent: () => import('Foo.svelte')}`)
     * @property {SvelteComponent} [loadingComponent] - Svelte component to be displayed while the async route is loading (as a placeholder); when unset or false-y, no component is shown while component
     * @property {object} [loadingParams] - Optional dictionary passed to the `loadingComponent` component as params (for an exported prop called `params`)
     * @property {object} [userData] - Optional object that will be passed to events such as `routeLoading`, `routeLoaded`, `conditionsFailed`
     * @property {object} [props] - Optional key-value dictionary of static props that will be passed to the component. The props are expanded with {...props}, so the key in the dictionary becomes the name of the prop.
     * @property {RoutePrecondition[]|RoutePrecondition} [conditions] - Route pre-conditions to add, which will be executed in order
     */

    /**
     * Wraps a component to enable multiple capabilities:
     * 1. Using dynamically-imported component, with (e.g. `{asyncComponent: () => import('Foo.svelte')}`), which also allows bundlers to do code-splitting.
     * 2. Adding route pre-conditions (e.g. `{conditions: [...]}`)
     * 3. Adding static props that are passed to the component
     * 4. Adding custom userData, which is passed to route events (e.g. route loaded events) or to route pre-conditions (e.g. `{userData: {foo: 'bar}}`)
     * 
     * @param {WrapOptions} args - Arguments object
     * @returns {WrappedComponent} Wrapped component
     */
    function wrap$1(args) {
        if (!args) {
            throw Error('Parameter args is required')
        }

        // We need to have one and only one of component and asyncComponent
        // This does a "XNOR"
        if (!args.component == !args.asyncComponent) {
            throw Error('One and only one of component and asyncComponent is required')
        }

        // If the component is not async, wrap it into a function returning a Promise
        if (args.component) {
            args.asyncComponent = () => Promise.resolve(args.component);
        }

        // Parameter asyncComponent and each item of conditions must be functions
        if (typeof args.asyncComponent != 'function') {
            throw Error('Parameter asyncComponent must be a function')
        }
        if (args.conditions) {
            // Ensure it's an array
            if (!Array.isArray(args.conditions)) {
                args.conditions = [args.conditions];
            }
            for (let i = 0; i < args.conditions.length; i++) {
                if (!args.conditions[i] || typeof args.conditions[i] != 'function') {
                    throw Error('Invalid parameter conditions[' + i + ']')
                }
            }
        }

        // Check if we have a placeholder component
        if (args.loadingComponent) {
            args.asyncComponent.loading = args.loadingComponent;
            args.asyncComponent.loadingParams = args.loadingParams || undefined;
        }

        // Returns an object that contains all the functions to execute too
        // The _sveltesparouter flag is to confirm the object was created by this router
        const obj = {
            component: args.asyncComponent,
            userData: args.userData,
            conditions: (args.conditions && args.conditions.length) ? args.conditions : undefined,
            props: (args.props && Object.keys(args.props).length) ? args.props : {},
            _sveltesparouter: true
        };

        return obj
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    function parse(str, loose) {
    	if (str instanceof RegExp) return { keys:false, pattern:str };
    	var c, o, tmp, ext, keys=[], pattern='', arr = str.split('/');
    	arr[0] || arr.shift();

    	while (tmp = arr.shift()) {
    		c = tmp[0];
    		if (c === '*') {
    			keys.push('wild');
    			pattern += '/(.*)';
    		} else if (c === ':') {
    			o = tmp.indexOf('?', 1);
    			ext = tmp.indexOf('.', 1);
    			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
    			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
    			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
    		} else {
    			pattern += '/' + tmp;
    		}
    	}

    	return {
    		keys: keys,
    		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
    	};
    }

    /* node_modules/svelte-spa-router/Router.svelte generated by Svelte v3.43.0 */

    const { Error: Error_1, Object: Object_1$1, console: console_1$1 } = globals;

    // (251:0) {:else}
    function create_else_block$1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [/*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*props*/ 4)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*props*/ ctx[2])])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(251:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (244:0) {#if componentParams}
    function create_if_block$6(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [{ params: /*componentParams*/ ctx[1] }, /*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*componentParams, props*/ 6)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*componentParams*/ 2 && { params: /*componentParams*/ ctx[1] },
    					dirty & /*props*/ 4 && get_spread_object(/*props*/ ctx[2])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(244:0) {#if componentParams}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$l(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$6, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*componentParams*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function wrap(component, userData, ...conditions) {
    	// Use the new wrap method and show a deprecation warning
    	// eslint-disable-next-line no-console
    	console.warn('Method `wrap` from `svelte-spa-router` is deprecated and will be removed in a future version. Please use `svelte-spa-router/wrap` instead. See http://bit.ly/svelte-spa-router-upgrading');

    	return wrap$1({ component, userData, conditions });
    }

    /**
     * @typedef {Object} Location
     * @property {string} location - Location (page/view), for example `/book`
     * @property {string} [querystring] - Querystring from the hash, as a string not parsed
     */
    /**
     * Returns the current location from the hash.
     *
     * @returns {Location} Location object
     * @private
     */
    function getLocation() {
    	const hashPosition = window.location.href.indexOf('#/');

    	let location = hashPosition > -1
    	? window.location.href.substr(hashPosition + 1)
    	: '/';

    	// Check if there's a querystring
    	const qsPosition = location.indexOf('?');

    	let querystring = '';

    	if (qsPosition > -1) {
    		querystring = location.substr(qsPosition + 1);
    		location = location.substr(0, qsPosition);
    	}

    	return { location, querystring };
    }

    const loc = readable(null, // eslint-disable-next-line prefer-arrow-callback
    function start(set) {
    	set(getLocation());

    	const update = () => {
    		set(getLocation());
    	};

    	window.addEventListener('hashchange', update, false);

    	return function stop() {
    		window.removeEventListener('hashchange', update, false);
    	};
    });

    const location = derived(loc, $loc => $loc.location);
    const querystring = derived(loc, $loc => $loc.querystring);
    const params = writable(undefined);

    async function push(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	// Note: this will include scroll state in history even when restoreScrollState is false
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined,
    		undefined
    	);

    	window.location.hash = (location.charAt(0) == '#' ? '' : '#') + location;
    }

    async function pop() {
    	// Execute this code when the current call stack is complete
    	await tick();

    	window.history.back();
    }

    async function replace(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	const dest = (location.charAt(0) == '#' ? '' : '#') + location;

    	try {
    		const newState = { ...history.state };
    		delete newState['__svelte_spa_router_scrollX'];
    		delete newState['__svelte_spa_router_scrollY'];
    		window.history.replaceState(newState, undefined, dest);
    	} catch(e) {
    		// eslint-disable-next-line no-console
    		console.warn('Caught exception while replacing the current page. If you\'re running this in the Svelte REPL, please note that the `replace` method might not work in this environment.');
    	}

    	// The method above doesn't trigger the hashchange event, so let's do that manually
    	window.dispatchEvent(new Event('hashchange'));
    }

    function link(node, opts) {
    	opts = linkOpts(opts);

    	// Only apply to <a> tags
    	if (!node || !node.tagName || node.tagName.toLowerCase() != 'a') {
    		throw Error('Action "link" can only be used with <a> tags');
    	}

    	updateLink(node, opts);

    	return {
    		update(updated) {
    			updated = linkOpts(updated);
    			updateLink(node, updated);
    		}
    	};
    }

    // Internal function used by the link function
    function updateLink(node, opts) {
    	let href = opts.href || node.getAttribute('href');

    	// Destination must start with '/' or '#/'
    	if (href && href.charAt(0) == '/') {
    		// Add # to the href attribute
    		href = '#' + href;
    	} else if (!href || href.length < 2 || href.slice(0, 2) != '#/') {
    		throw Error('Invalid value for "href" attribute: ' + href);
    	}

    	node.setAttribute('href', href);

    	node.addEventListener('click', event => {
    		// Prevent default anchor onclick behaviour
    		event.preventDefault();

    		if (!opts.disabled) {
    			scrollstateHistoryHandler(event.currentTarget.getAttribute('href'));
    		}
    	});
    }

    // Internal function that ensures the argument of the link action is always an object
    function linkOpts(val) {
    	if (val && typeof val == 'string') {
    		return { href: val };
    	} else {
    		return val || {};
    	}
    }

    /**
     * The handler attached to an anchor tag responsible for updating the
     * current history state with the current scroll state
     *
     * @param {string} href - Destination
     */
    function scrollstateHistoryHandler(href) {
    	// Setting the url (3rd arg) to href will break clicking for reasons, so don't try to do that
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined,
    		undefined
    	);

    	// This will force an update as desired, but this time our scroll state will be attached
    	window.location.hash = href;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, []);
    	let { routes = {} } = $$props;
    	let { prefix = '' } = $$props;
    	let { restoreScrollState = false } = $$props;

    	/**
     * Container for a route: path, component
     */
    	class RouteItem {
    		/**
     * Initializes the object and creates a regular expression from the path, using regexparam.
     *
     * @param {string} path - Path to the route (must start with '/' or '*')
     * @param {SvelteComponent|WrappedComponent} component - Svelte component for the route, optionally wrapped
     */
    		constructor(path, component) {
    			if (!component || typeof component != 'function' && (typeof component != 'object' || component._sveltesparouter !== true)) {
    				throw Error('Invalid component object');
    			}

    			// Path must be a regular or expression, or a string starting with '/' or '*'
    			if (!path || typeof path == 'string' && (path.length < 1 || path.charAt(0) != '/' && path.charAt(0) != '*') || typeof path == 'object' && !(path instanceof RegExp)) {
    				throw Error('Invalid value for "path" argument - strings must start with / or *');
    			}

    			const { pattern, keys } = parse(path);
    			this.path = path;

    			// Check if the component is wrapped and we have conditions
    			if (typeof component == 'object' && component._sveltesparouter === true) {
    				this.component = component.component;
    				this.conditions = component.conditions || [];
    				this.userData = component.userData;
    				this.props = component.props || {};
    			} else {
    				// Convert the component to a function that returns a Promise, to normalize it
    				this.component = () => Promise.resolve(component);

    				this.conditions = [];
    				this.props = {};
    			}

    			this._pattern = pattern;
    			this._keys = keys;
    		}

    		/**
     * Checks if `path` matches the current route.
     * If there's a match, will return the list of parameters from the URL (if any).
     * In case of no match, the method will return `null`.
     *
     * @param {string} path - Path to test
     * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
     */
    		match(path) {
    			// If there's a prefix, check if it matches the start of the path.
    			// If not, bail early, else remove it before we run the matching.
    			if (prefix) {
    				if (typeof prefix == 'string') {
    					if (path.startsWith(prefix)) {
    						path = path.substr(prefix.length) || '/';
    					} else {
    						return null;
    					}
    				} else if (prefix instanceof RegExp) {
    					const match = path.match(prefix);

    					if (match && match[0]) {
    						path = path.substr(match[0].length) || '/';
    					} else {
    						return null;
    					}
    				}
    			}

    			// Check if the pattern matches
    			const matches = this._pattern.exec(path);

    			if (matches === null) {
    				return null;
    			}

    			// If the input was a regular expression, this._keys would be false, so return matches as is
    			if (this._keys === false) {
    				return matches;
    			}

    			const out = {};
    			let i = 0;

    			while (i < this._keys.length) {
    				// In the match parameters, URL-decode all values
    				try {
    					out[this._keys[i]] = decodeURIComponent(matches[i + 1] || '') || null;
    				} catch(e) {
    					out[this._keys[i]] = null;
    				}

    				i++;
    			}

    			return out;
    		}

    		/**
     * Dictionary with route details passed to the pre-conditions functions, as well as the `routeLoading`, `routeLoaded` and `conditionsFailed` events
     * @typedef {Object} RouteDetail
     * @property {string|RegExp} route - Route matched as defined in the route definition (could be a string or a reguar expression object)
     * @property {string} location - Location path
     * @property {string} querystring - Querystring from the hash
     * @property {object} [userData] - Custom data passed by the user
     * @property {SvelteComponent} [component] - Svelte component (only in `routeLoaded` events)
     * @property {string} [name] - Name of the Svelte component (only in `routeLoaded` events)
     */
    		/**
     * Executes all conditions (if any) to control whether the route can be shown. Conditions are executed in the order they are defined, and if a condition fails, the following ones aren't executed.
     * 
     * @param {RouteDetail} detail - Route detail
     * @returns {boolean} Returns true if all the conditions succeeded
     */
    		async checkConditions(detail) {
    			for (let i = 0; i < this.conditions.length; i++) {
    				if (!await this.conditions[i](detail)) {
    					return false;
    				}
    			}

    			return true;
    		}
    	}

    	// Set up all routes
    	const routesList = [];

    	if (routes instanceof Map) {
    		// If it's a map, iterate on it right away
    		routes.forEach((route, path) => {
    			routesList.push(new RouteItem(path, route));
    		});
    	} else {
    		// We have an object, so iterate on its own properties
    		Object.keys(routes).forEach(path => {
    			routesList.push(new RouteItem(path, routes[path]));
    		});
    	}

    	// Props for the component to render
    	let component = null;

    	let componentParams = null;
    	let props = {};

    	// Event dispatcher from Svelte
    	const dispatch = createEventDispatcher();

    	// Just like dispatch, but executes on the next iteration of the event loop
    	async function dispatchNextTick(name, detail) {
    		// Execute this code when the current call stack is complete
    		await tick();

    		dispatch(name, detail);
    	}

    	// If this is set, then that means we have popped into this var the state of our last scroll position
    	let previousScrollState = null;

    	let popStateChanged = null;

    	if (restoreScrollState) {
    		popStateChanged = event => {
    			// If this event was from our history.replaceState, event.state will contain
    			// our scroll history. Otherwise, event.state will be null (like on forward
    			// navigation)
    			if (event.state && event.state.__svelte_spa_router_scrollY) {
    				previousScrollState = event.state;
    			} else {
    				previousScrollState = null;
    			}
    		};

    		// This is removed in the destroy() invocation below
    		window.addEventListener('popstate', popStateChanged);

    		afterUpdate(() => {
    			// If this exists, then this is a back navigation: restore the scroll position
    			if (previousScrollState) {
    				window.scrollTo(previousScrollState.__svelte_spa_router_scrollX, previousScrollState.__svelte_spa_router_scrollY);
    			} else {
    				// Otherwise this is a forward navigation: scroll to top
    				window.scrollTo(0, 0);
    			}
    		});
    	}

    	// Always have the latest value of loc
    	let lastLoc = null;

    	// Current object of the component loaded
    	let componentObj = null;

    	// Handle hash change events
    	// Listen to changes in the $loc store and update the page
    	// Do not use the $: syntax because it gets triggered by too many things
    	const unsubscribeLoc = loc.subscribe(async newLoc => {
    		lastLoc = newLoc;

    		// Find a route matching the location
    		let i = 0;

    		while (i < routesList.length) {
    			const match = routesList[i].match(newLoc.location);

    			if (!match) {
    				i++;
    				continue;
    			}

    			const detail = {
    				route: routesList[i].path,
    				location: newLoc.location,
    				querystring: newLoc.querystring,
    				userData: routesList[i].userData,
    				params: match && typeof match == 'object' && Object.keys(match).length
    				? match
    				: null
    			};

    			// Check if the route can be loaded - if all conditions succeed
    			if (!await routesList[i].checkConditions(detail)) {
    				// Don't display anything
    				$$invalidate(0, component = null);

    				componentObj = null;

    				// Trigger an event to notify the user, then exit
    				dispatchNextTick('conditionsFailed', detail);

    				return;
    			}

    			// Trigger an event to alert that we're loading the route
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoading', Object.assign({}, detail));

    			// If there's a component to show while we're loading the route, display it
    			const obj = routesList[i].component;

    			// Do not replace the component if we're loading the same one as before, to avoid the route being unmounted and re-mounted
    			if (componentObj != obj) {
    				if (obj.loading) {
    					$$invalidate(0, component = obj.loading);
    					componentObj = obj;
    					$$invalidate(1, componentParams = obj.loadingParams);
    					$$invalidate(2, props = {});

    					// Trigger the routeLoaded event for the loading component
    					// Create a copy of detail so we don't modify the object for the dynamic route (and the dynamic route doesn't modify our object too)
    					dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    						component,
    						name: component.name,
    						params: componentParams
    					}));
    				} else {
    					$$invalidate(0, component = null);
    					componentObj = null;
    				}

    				// Invoke the Promise
    				const loaded = await obj();

    				// Now that we're here, after the promise resolved, check if we still want this component, as the user might have navigated to another page in the meanwhile
    				if (newLoc != lastLoc) {
    					// Don't update the component, just exit
    					return;
    				}

    				// If there is a "default" property, which is used by async routes, then pick that
    				$$invalidate(0, component = loaded && loaded.default || loaded);

    				componentObj = obj;
    			}

    			// Set componentParams only if we have a match, to avoid a warning similar to `<Component> was created with unknown prop 'params'`
    			// Of course, this assumes that developers always add a "params" prop when they are expecting parameters
    			if (match && typeof match == 'object' && Object.keys(match).length) {
    				$$invalidate(1, componentParams = match);
    			} else {
    				$$invalidate(1, componentParams = null);
    			}

    			// Set static props, if any
    			$$invalidate(2, props = routesList[i].props);

    			// Dispatch the routeLoaded event then exit
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    				component,
    				name: component.name,
    				params: componentParams
    			})).then(() => {
    				params.set(componentParams);
    			});

    			return;
    		}

    		// If we're still here, there was no match, so show the empty component
    		$$invalidate(0, component = null);

    		componentObj = null;
    		params.set(undefined);
    	});

    	onDestroy(() => {
    		unsubscribeLoc();
    		popStateChanged && window.removeEventListener('popstate', popStateChanged);
    	});

    	const writable_props = ['routes', 'prefix', 'restoreScrollState'];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	function routeEvent_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function routeEvent_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    	};

    	$$self.$capture_state = () => ({
    		readable,
    		writable,
    		derived,
    		tick,
    		_wrap: wrap$1,
    		wrap,
    		getLocation,
    		loc,
    		location,
    		querystring,
    		params,
    		push,
    		pop,
    		replace,
    		link,
    		updateLink,
    		linkOpts,
    		scrollstateHistoryHandler,
    		onDestroy,
    		createEventDispatcher,
    		afterUpdate,
    		parse,
    		routes,
    		prefix,
    		restoreScrollState,
    		RouteItem,
    		routesList,
    		component,
    		componentParams,
    		props,
    		dispatch,
    		dispatchNextTick,
    		previousScrollState,
    		popStateChanged,
    		lastLoc,
    		componentObj,
    		unsubscribeLoc
    	});

    	$$self.$inject_state = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    		if ('component' in $$props) $$invalidate(0, component = $$props.component);
    		if ('componentParams' in $$props) $$invalidate(1, componentParams = $$props.componentParams);
    		if ('props' in $$props) $$invalidate(2, props = $$props.props);
    		if ('previousScrollState' in $$props) previousScrollState = $$props.previousScrollState;
    		if ('popStateChanged' in $$props) popStateChanged = $$props.popStateChanged;
    		if ('lastLoc' in $$props) lastLoc = $$props.lastLoc;
    		if ('componentObj' in $$props) componentObj = $$props.componentObj;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*restoreScrollState*/ 32) {
    			// Update history.scrollRestoration depending on restoreScrollState
    			history.scrollRestoration = restoreScrollState ? 'manual' : 'auto';
    		}
    	};

    	return [
    		component,
    		componentParams,
    		props,
    		routes,
    		prefix,
    		restoreScrollState,
    		routeEvent_handler,
    		routeEvent_handler_1
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$l, create_fragment$l, safe_not_equal, {
    			routes: 3,
    			prefix: 4,
    			restoreScrollState: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$l.name
    		});
    	}

    	get routes() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routes(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get prefix() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set prefix(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get restoreScrollState() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set restoreScrollState(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/ArcText.svelte generated by Svelte v3.43.0 */

    const file$j = "src/components/ArcText.svelte";

    function create_fragment$k(ctx) {
    	let t;
    	let span1;
    	let span0;
    	let svg;
    	let path;
    	let path_d_value;
    	let text_1;
    	let textPath;
    	let text_1_font_size_value;
    	let svg_viewBox_value;
    	let span1_class_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], null);

    	const block = {
    		c: function create() {
    			t = space();
    			span1 = element("span");
    			span0 = element("span");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			text_1 = svg_element("text");
    			textPath = svg_element("textPath");
    			if (default_slot) default_slot.c();
    			attr_dev(path, "d", path_d_value = "M0,100\n              A20," + /*roundness*/ ctx[2] + " 0 1," + (/*isDownwardsRoundness*/ ctx[7] ? 0 : 1) + " 200,100");
    			set_style(path, "stroke", /*debugMode*/ ctx[4] ? '#f00' : 'transparent');
    			set_style(path, "stroke-width", "3");
    			set_style(path, "fill", "none");
    			attr_dev(path, "id", /*randomId*/ ctx[8]);
    			add_location(path, file$j, 8, 8, 273);
    			attr_dev(textPath, "href", '#' + /*randomId*/ ctx[8]);
    			set_style(textPath, "fill", /*color*/ ctx[5]);
    			attr_dev(textPath, "startOffset", "50%");
    			attr_dev(textPath, "text-anchor", "middle");
    			add_location(textPath, file$j, 18, 8, 597);
    			attr_dev(text_1, "font-size", text_1_font_size_value = /*fontSize*/ ctx[3] + 'rem');
    			add_location(text_1, file$j, 17, 6, 553);
    			attr_dev(svg, "viewBox", svg_viewBox_value = "" + (/*viewPortStart*/ ctx[6] + " 200 120"));
    			set_style(svg, "min-width", "100%");
    			add_location(svg, file$j, 6, 4, 195);
    			attr_dev(span0, "class", "arc-text__inner-wrap svelte-1a7m7xb");
    			set_style(span0, "top", /*topShift*/ ctx[1] + 'rem');
    			add_location(span0, file$j, 3, 2, 113);

    			attr_dev(span1, "class", span1_class_value = "" + (null_to_empty(`arc-text 
                ${/*debugMode*/ ctx[4] && 'arc-text--outlined'}
                ${/*mixClass*/ ctx[0]}`) + " svelte-1a7m7xb"));

    			add_location(span1, file$j, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			insert_dev(target, span1, anchor);
    			append_dev(span1, span0);
    			append_dev(span0, svg);
    			append_dev(svg, path);
    			append_dev(svg, text_1);
    			append_dev(text_1, textPath);

    			if (default_slot) {
    				default_slot.m(textPath, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*roundness, isDownwardsRoundness*/ 132 && path_d_value !== (path_d_value = "M0,100\n              A20," + /*roundness*/ ctx[2] + " 0 1," + (/*isDownwardsRoundness*/ ctx[7] ? 0 : 1) + " 200,100")) {
    				attr_dev(path, "d", path_d_value);
    			}

    			if (!current || dirty & /*debugMode*/ 16) {
    				set_style(path, "stroke", /*debugMode*/ ctx[4] ? '#f00' : 'transparent');
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 512)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[9],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*color*/ 32) {
    				set_style(textPath, "fill", /*color*/ ctx[5]);
    			}

    			if (!current || dirty & /*fontSize*/ 8 && text_1_font_size_value !== (text_1_font_size_value = /*fontSize*/ ctx[3] + 'rem')) {
    				attr_dev(text_1, "font-size", text_1_font_size_value);
    			}

    			if (!current || dirty & /*viewPortStart*/ 64 && svg_viewBox_value !== (svg_viewBox_value = "" + (/*viewPortStart*/ ctx[6] + " 200 120"))) {
    				attr_dev(svg, "viewBox", svg_viewBox_value);
    			}

    			if (!current || dirty & /*topShift*/ 2) {
    				set_style(span0, "top", /*topShift*/ ctx[1] + 'rem');
    			}

    			if (!current || dirty & /*debugMode, mixClass*/ 17 && span1_class_value !== (span1_class_value = "" + (null_to_empty(`arc-text 
                ${/*debugMode*/ ctx[4] && 'arc-text--outlined'}
                ${/*mixClass*/ ctx[0]}`) + " svelte-1a7m7xb"))) {
    				attr_dev(span1, "class", span1_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(span1);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ArcText', slots, ['default']);
    	let { class: mixClass } = $$props;
    	let { topShift = 10 } = $$props;
    	let { roundness = 16 } = $$props;
    	let { fontSize = 17 } = $$props;
    	let { debugMode = false } = $$props;
    	let { color = '#000' } = $$props;
    	let { viewPortStart = '0 0' } = $$props;
    	let { isDownwardsRoundness = false } = $$props;

    	// ============================================================================
    	// Data
    	let randomId = 'randomId_' + Math.random();

    	const writable_props = [
    		'class',
    		'topShift',
    		'roundness',
    		'fontSize',
    		'debugMode',
    		'color',
    		'viewPortStart',
    		'isDownwardsRoundness'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ArcText> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, mixClass = $$props.class);
    		if ('topShift' in $$props) $$invalidate(1, topShift = $$props.topShift);
    		if ('roundness' in $$props) $$invalidate(2, roundness = $$props.roundness);
    		if ('fontSize' in $$props) $$invalidate(3, fontSize = $$props.fontSize);
    		if ('debugMode' in $$props) $$invalidate(4, debugMode = $$props.debugMode);
    		if ('color' in $$props) $$invalidate(5, color = $$props.color);
    		if ('viewPortStart' in $$props) $$invalidate(6, viewPortStart = $$props.viewPortStart);
    		if ('isDownwardsRoundness' in $$props) $$invalidate(7, isDownwardsRoundness = $$props.isDownwardsRoundness);
    		if ('$$scope' in $$props) $$invalidate(9, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		mixClass,
    		topShift,
    		roundness,
    		fontSize,
    		debugMode,
    		color,
    		viewPortStart,
    		isDownwardsRoundness,
    		randomId
    	});

    	$$self.$inject_state = $$props => {
    		if ('mixClass' in $$props) $$invalidate(0, mixClass = $$props.mixClass);
    		if ('topShift' in $$props) $$invalidate(1, topShift = $$props.topShift);
    		if ('roundness' in $$props) $$invalidate(2, roundness = $$props.roundness);
    		if ('fontSize' in $$props) $$invalidate(3, fontSize = $$props.fontSize);
    		if ('debugMode' in $$props) $$invalidate(4, debugMode = $$props.debugMode);
    		if ('color' in $$props) $$invalidate(5, color = $$props.color);
    		if ('viewPortStart' in $$props) $$invalidate(6, viewPortStart = $$props.viewPortStart);
    		if ('isDownwardsRoundness' in $$props) $$invalidate(7, isDownwardsRoundness = $$props.isDownwardsRoundness);
    		if ('randomId' in $$props) $$invalidate(8, randomId = $$props.randomId);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		mixClass,
    		topShift,
    		roundness,
    		fontSize,
    		debugMode,
    		color,
    		viewPortStart,
    		isDownwardsRoundness,
    		randomId,
    		$$scope,
    		slots
    	];
    }

    class ArcText extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$k, create_fragment$k, safe_not_equal, {
    			class: 0,
    			topShift: 1,
    			roundness: 2,
    			fontSize: 3,
    			debugMode: 4,
    			color: 5,
    			viewPortStart: 6,
    			isDownwardsRoundness: 7
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ArcText",
    			options,
    			id: create_fragment$k.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mixClass*/ ctx[0] === undefined && !('class' in props)) {
    			console.warn("<ArcText> was created without expected prop 'class'");
    		}
    	}

    	get class() {
    		throw new Error("<ArcText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<ArcText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get topShift() {
    		throw new Error("<ArcText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set topShift(value) {
    		throw new Error("<ArcText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get roundness() {
    		throw new Error("<ArcText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set roundness(value) {
    		throw new Error("<ArcText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fontSize() {
    		throw new Error("<ArcText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fontSize(value) {
    		throw new Error("<ArcText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get debugMode() {
    		throw new Error("<ArcText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set debugMode(value) {
    		throw new Error("<ArcText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<ArcText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<ArcText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get viewPortStart() {
    		throw new Error("<ArcText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set viewPortStart(value) {
    		throw new Error("<ArcText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isDownwardsRoundness() {
    		throw new Error("<ArcText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isDownwardsRoundness(value) {
    		throw new Error("<ArcText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-icon/Icon.svelte generated by Svelte v3.43.0 */

    const file$i = "node_modules/svelte-icon/Icon.svelte";

    function create_fragment$j(ctx) {
    	let svg;

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ width: /*width*/ ctx[1] },
    		{ height: /*height*/ ctx[2] },
    		{ viewBox: /*viewBox*/ ctx[0] },
    		{ stroke: /*stroke*/ ctx[3] },
    		{ fill: /*fill*/ ctx[4] },
    		/*$$restProps*/ ctx[6]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$i, 24, 0, 521);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			svg.innerHTML = /*elements*/ ctx[5];
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*elements*/ 32) svg.innerHTML = /*elements*/ ctx[5];
    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				dirty & /*width*/ 2 && { width: /*width*/ ctx[1] },
    				dirty & /*height*/ 4 && { height: /*height*/ ctx[2] },
    				dirty & /*viewBox*/ 1 && { viewBox: /*viewBox*/ ctx[0] },
    				dirty & /*stroke*/ 8 && { stroke: /*stroke*/ ctx[3] },
    				dirty & /*fill*/ 16 && { fill: /*fill*/ ctx[4] },
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function extractViewBox(svg) {
    	const regex = /viewBox="([\d ]+)"/;
    	const res = regex.exec(svg);
    	if (!res) return '0 0 20 20'; // default value
    	return res[1];
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let elements;
    	const omit_props_names = ["data","viewBox","size","width","height","color","stroke","fill"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Icon', slots, []);
    	let { data = '' } = $$props;
    	let { viewBox = extractViewBox(data) } = $$props;
    	let { size = '20px' } = $$props;
    	let { width = size } = $$props;
    	let { height = size } = $$props;
    	let { color = 'currentColor' } = $$props;
    	let { stroke = color } = $$props;
    	let { fill = color } = $$props;

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('data' in $$new_props) $$invalidate(7, data = $$new_props.data);
    		if ('viewBox' in $$new_props) $$invalidate(0, viewBox = $$new_props.viewBox);
    		if ('size' in $$new_props) $$invalidate(8, size = $$new_props.size);
    		if ('width' in $$new_props) $$invalidate(1, width = $$new_props.width);
    		if ('height' in $$new_props) $$invalidate(2, height = $$new_props.height);
    		if ('color' in $$new_props) $$invalidate(9, color = $$new_props.color);
    		if ('stroke' in $$new_props) $$invalidate(3, stroke = $$new_props.stroke);
    		if ('fill' in $$new_props) $$invalidate(4, fill = $$new_props.fill);
    	};

    	$$self.$capture_state = () => ({
    		data,
    		viewBox,
    		size,
    		width,
    		height,
    		color,
    		stroke,
    		fill,
    		extractViewBox,
    		elements
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('data' in $$props) $$invalidate(7, data = $$new_props.data);
    		if ('viewBox' in $$props) $$invalidate(0, viewBox = $$new_props.viewBox);
    		if ('size' in $$props) $$invalidate(8, size = $$new_props.size);
    		if ('width' in $$props) $$invalidate(1, width = $$new_props.width);
    		if ('height' in $$props) $$invalidate(2, height = $$new_props.height);
    		if ('color' in $$props) $$invalidate(9, color = $$new_props.color);
    		if ('stroke' in $$props) $$invalidate(3, stroke = $$new_props.stroke);
    		if ('fill' in $$props) $$invalidate(4, fill = $$new_props.fill);
    		if ('elements' in $$props) $$invalidate(5, elements = $$new_props.elements);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*data*/ 128) {
    			$$invalidate(5, elements = data.replace(/<svg ([^>]*)>/, '').replace('</svg>', ''));
    		}
    	};

    	return [viewBox, width, height, stroke, fill, elements, $$restProps, data, size, color];
    }

    class Icon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$j, create_fragment$j, safe_not_equal, {
    			data: 7,
    			viewBox: 0,
    			size: 8,
    			width: 1,
    			height: 2,
    			color: 9,
    			stroke: 3,
    			fill: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Icon",
    			options,
    			id: create_fragment$j.name
    		});
    	}

    	get data() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get viewBox() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set viewBox(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get stroke() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set stroke(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fill() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fill(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var gearIcon = "<svg width=\"512\" height=\"512\" viewBox=\"0 0 512 512\">\n  <path d=\"M384.971,380.284a64.067,64.067,0,0,0-85.041,49.14c-8.593,48.518-78.094,48.5-86.629.006a64.1,64.1,0,0,0-85.062-49.172c-46.207,16.844-80.956-43.4-43.3-75.09a64.19,64.19,0,0,0,.012-98.32c-37.665-31.679-2.931-91.964,43.29-75.122a64.095,64.095,0,0,0,85.052-49.159c8.551-48.491,78.075-48.509,86.621-.041a64.079,64.079,0,0,0,85.049,49.193c46.207-16.844,80.965,43.432,43.333,75.083a64.206,64.206,0,0,0,.008,98.332C465.915,336.81,431.193,397.075,384.971,380.284ZM323.278,217.466a76.807,76.807,0,1,0,.079.136Z\"/>\n</svg>\n";

    var giftBoxIcon = "﻿<svg class=\"card-stats__icon\" width=\"456\" height=\"512\" viewBox=\"0 0 456 512\">\n   <path d=\"M252.534,290.936V167.9H393.8A62.208,62.208,0,0,1,456,230.108v60.828H252.534Zm38.2-169.435a36.465,36.465,0,1,0-38.2-36.423V121.5H205.8V85.078A36.458,36.458,0,1,0,167.6,121.5H94.539A83.172,83.172,0,0,1,229.168,27.312,83.183,83.183,0,0,1,363.8,121.5H290.738ZM205.8,290.936H2.329V230.108a62.208,62.208,0,0,1,62.2-62.213H205.8V290.936Zm0,219.2H87.041a61.909,61.909,0,0,1-61.9-61.915V337.68H205.8V510.134Zm227.4-61.915a61.908,61.908,0,0,1-61.9,61.915H252.534V337.68H433.2V448.219Z\"/>\n</svg>";

    var houseIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 512 512\">\n   <path d=\"M488.1,260.241l-171.4-148.969a91.808,91.808,0,0,0-120.439,0L24.867,260.241,0.105,231.789l171.4-148.971a129.558,129.558,0,0,1,169.957,0l171.4,148.971ZM300,135.531L429.019,246.653V382.007a29.77,29.77,0,0,1-29.778,29.759H342.169A29.771,29.771,0,0,1,312.4,382.008V316.446a29.77,29.77,0,0,0-29.778-29.758H230.359a29.77,29.77,0,0,0-29.778,29.758v65.562A29.771,29.771,0,0,1,170.8,411.766H113.73a29.77,29.77,0,0,1-29.778-29.759V246.653L212.975,135.531A66.683,66.683,0,0,1,300,135.531Z\"/>\n</svg>\n";

    /* src/components/ButtonInCircle.svelte generated by Svelte v3.43.0 */
    const file$h = "src/components/ButtonInCircle.svelte";

    // (13:4) {#if textInCircle}
    function create_if_block_9(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*textInCircle*/ ctx[3]);
    			attr_dev(span, "class", "single-nav-button__text-in-circle svelte-r5bppi");
    			add_location(span, file$h, 13, 6, 439);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*textInCircle*/ 8) set_data_dev(t, /*textInCircle*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(13:4) {#if textInCircle}",
    		ctx
    	});

    	return block;
    }

    // (65:36) 
    function create_if_block_8(ctx) {
    	let icon;
    	let current;

    	icon = new Icon({
    			props: {
    				class: `single-nav-button__svg-icon 
                    ${/*textInCircle*/ ctx[3] && 'single-nav-button__svg-icon--small'}`,
    				data: giftBoxIcon
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(icon.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(icon, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const icon_changes = {};

    			if (dirty & /*textInCircle*/ 8) icon_changes.class = `single-nav-button__svg-icon 
                    ${/*textInCircle*/ ctx[3] && 'single-nav-button__svg-icon--small'}`;

    			icon.$set(icon_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(icon, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(65:36) ",
    		ctx
    	});

    	return block;
    }

    // (57:37) 
    function create_if_block_7(ctx) {
    	let img;
    	let img_class_value;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");

    			attr_dev(img, "class", img_class_value = "" + (null_to_empty(`single-nav-button__png-icon 
                  ${/*textInCircle*/ ctx[3] && 'single-nav-button__png-icon--small'}`) + " svelte-r5bppi"));

    			if (!src_url_equal(img.src, img_src_value = "images/cross-_icon.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Locked");
    			add_location(img, file$h, 57, 6, 1749);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*textInCircle*/ 8 && img_class_value !== (img_class_value = "" + (null_to_empty(`single-nav-button__png-icon 
                  ${/*textInCircle*/ ctx[3] && 'single-nav-button__png-icon--small'}`) + " svelte-r5bppi"))) {
    				attr_dev(img, "class", img_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(57:37) ",
    		ctx
    	});

    	return block;
    }

    // (49:36) 
    function create_if_block_6$1(ctx) {
    	let img;
    	let img_class_value;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");

    			attr_dev(img, "class", img_class_value = "" + (null_to_empty(`single-nav-button__png-icon 
                  ${/*textInCircle*/ ctx[3] && 'single-nav-button__png-icon--small'}`) + " svelte-r5bppi"));

    			if (!src_url_equal(img.src, img_src_value = "images/stop-icon.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Locked");
    			add_location(img, file$h, 49, 6, 1511);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*textInCircle*/ 8 && img_class_value !== (img_class_value = "" + (null_to_empty(`single-nav-button__png-icon 
                  ${/*textInCircle*/ ctx[3] && 'single-nav-button__png-icon--small'}`) + " svelte-r5bppi"))) {
    				attr_dev(img, "class", img_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6$1.name,
    		type: "if",
    		source: "(49:36) ",
    		ctx
    	});

    	return block;
    }

    // (41:41) 
    function create_if_block_5$1(ctx) {
    	let img;
    	let img_class_value;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");

    			attr_dev(img, "class", img_class_value = "" + (null_to_empty(`single-nav-button__png-icon 
                    ${/*textInCircle*/ ctx[3] && 'single-nav-button__png-icon--small'}`) + " svelte-r5bppi"));

    			if (!src_url_equal(img.src, img_src_value = "images/arrow-left-icon.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Back");
    			add_location(img, file$h, 41, 8, 1260);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*textInCircle*/ 8 && img_class_value !== (img_class_value = "" + (null_to_empty(`single-nav-button__png-icon 
                    ${/*textInCircle*/ ctx[3] && 'single-nav-button__png-icon--small'}`) + " svelte-r5bppi"))) {
    				attr_dev(img, "class", img_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5$1.name,
    		type: "if",
    		source: "(41:41) ",
    		ctx
    	});

    	return block;
    }

    // (33:42) 
    function create_if_block_4$1(ctx) {
    	let img;
    	let img_class_value;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");

    			attr_dev(img, "class", img_class_value = "" + (null_to_empty(`single-nav-button__png-icon 
                    ${/*textInCircle*/ ctx[3] && 'single-nav-button__png-icon--small'}`) + " svelte-r5bppi"));

    			if (!src_url_equal(img.src, img_src_value = "images/arrow-right-icon.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Forward");
    			add_location(img, file$h, 33, 8, 998);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*textInCircle*/ 8 && img_class_value !== (img_class_value = "" + (null_to_empty(`single-nav-button__png-icon 
                    ${/*textInCircle*/ ctx[3] && 'single-nav-button__png-icon--small'}`) + " svelte-r5bppi"))) {
    				attr_dev(img, "class", img_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$1.name,
    		type: "if",
    		source: "(33:42) ",
    		ctx
    	});

    	return block;
    }

    // (26:36) 
    function create_if_block_3$1(ctx) {
    	let icon;
    	let current;

    	icon = new Icon({
    			props: {
    				class: `single-nav-button__svg-icon 
                  ${/*textInCircle*/ ctx[3] && 'single-nav-button__svg-icon--small'}`,
    				data: gearIcon
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(icon.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(icon, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const icon_changes = {};

    			if (dirty & /*textInCircle*/ 8) icon_changes.class = `single-nav-button__svg-icon 
                  ${/*textInCircle*/ ctx[3] && 'single-nav-button__svg-icon--small'}`;

    			icon.$set(icon_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(icon, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(26:36) ",
    		ctx
    	});

    	return block;
    }

    // (19:4) {#if iconName === 'house'}
    function create_if_block_2$2(ctx) {
    	let icon;
    	let current;

    	icon = new Icon({
    			props: {
    				class: `single-nav-button__svg-icon 
                  ${/*textInCircle*/ ctx[3] && 'single-nav-button__svg-icon--small'}`,
    				data: houseIcon
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(icon.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(icon, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const icon_changes = {};

    			if (dirty & /*textInCircle*/ 8) icon_changes.class = `single-nav-button__svg-icon 
                  ${/*textInCircle*/ ctx[3] && 'single-nav-button__svg-icon--small'}`;

    			icon.$set(icon_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(icon, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(19:4) {#if iconName === 'house'}",
    		ctx
    	});

    	return block;
    }

    // (80:24) 
    function create_if_block_1$2(ctx) {
    	let arctext;
    	let current;

    	arctext = new ArcText({
    			props: {
    				class: `single-nav-button__arc-text 
                  ${/*isTextOnTop*/ ctx[7] && 'single-nav-button__arc-text--on-top'}`,
    				debugMode: false,
    				roundness: "22",
    				fontSize: "3.3",
    				topShift: ".8",
    				color: "#fff",
    				viewPortStart: "0 -40",
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(arctext.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(arctext, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const arctext_changes = {};

    			if (dirty & /*isTextOnTop*/ 128) arctext_changes.class = `single-nav-button__arc-text 
                  ${/*isTextOnTop*/ ctx[7] && 'single-nav-button__arc-text--on-top'}`;

    			if (dirty & /*$$scope, text*/ 2052) {
    				arctext_changes.$$scope = { dirty, ctx };
    			}

    			arctext.$set(arctext_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(arctext.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(arctext.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(arctext, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(80:24) ",
    		ctx
    	});

    	return block;
    }

    // (75:2) {#if text && !isTextArc}
    function create_if_block$5(ctx) {
    	let div;
    	let t;
    	let div_class_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*text*/ ctx[2]);

    			attr_dev(div, "class", div_class_value = "" + (null_to_empty(`single-nav-button__text 
                    ${/*isTextOnTop*/ ctx[7] && 'single-nav-button__text--on-top'}`) + " svelte-r5bppi"));

    			add_location(div, file$h, 75, 6, 2217);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*text*/ 4) set_data_dev(t, /*text*/ ctx[2]);

    			if (dirty & /*isTextOnTop*/ 128 && div_class_value !== (div_class_value = "" + (null_to_empty(`single-nav-button__text 
                    ${/*isTextOnTop*/ ctx[7] && 'single-nav-button__text--on-top'}`) + " svelte-r5bppi"))) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(75:2) {#if text && !isTextArc}",
    		ctx
    	});

    	return block;
    }

    // (81:6) <ArcText         class={ `single-nav-button__arc-text                    ${isTextOnTop && 'single-nav-button__arc-text--on-top'}` }         debugMode={false}         roundness="22"         fontSize="3.3"         topShift=".8"         color="#fff"         viewPortStart="0 -40"       >
    function create_default_slot$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*text*/ ctx[2]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*text*/ 4) set_data_dev(t, /*text*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(81:6) <ArcText         class={ `single-nav-button__arc-text                    ${isTextOnTop && 'single-nav-button__arc-text--on-top'}` }         debugMode={false}         roundness=\\\"22\\\"         fontSize=\\\"3.3\\\"         topShift=\\\".8\\\"         color=\\\"#fff\\\"         viewPortStart=\\\"0 -40\\\"       >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let t0;
    	let div1;
    	let div0;
    	let t1;
    	let current_block_type_index;
    	let if_block1;
    	let div0_class_value;
    	let t2;
    	let current_block_type_index_1;
    	let if_block2;
    	let div1_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*textInCircle*/ ctx[3] && create_if_block_9(ctx);

    	const if_block_creators = [
    		create_if_block_2$2,
    		create_if_block_3$1,
    		create_if_block_4$1,
    		create_if_block_5$1,
    		create_if_block_6$1,
    		create_if_block_7,
    		create_if_block_8
    	];

    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*iconName*/ ctx[1] === 'house') return 0;
    		if (/*iconName*/ ctx[1] === 'gear') return 1;
    		if (/*iconName*/ ctx[1] === 'arrowRight') return 2;
    		if (/*iconName*/ ctx[1] === 'arrowLeft') return 3;
    		if (/*iconName*/ ctx[1] === 'stop') return 4;
    		if (/*iconName*/ ctx[1] === 'cross') return 5;
    		if (/*iconName*/ ctx[1] === 'gift') return 6;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const if_block_creators_1 = [create_if_block$5, create_if_block_1$2];
    	const if_blocks_1 = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*text*/ ctx[2] && !/*isTextArc*/ ctx[8]) return 0;
    		if (/*isTextArc*/ ctx[8]) return 1;
    		return -1;
    	}

    	if (~(current_block_type_index_1 = select_block_type_1(ctx))) {
    		if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
    	}

    	const block = {
    		c: function create() {
    			t0 = space();
    			div1 = element("div");
    			div0 = element("div");
    			if (if_block0) if_block0.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			t2 = space();
    			if (if_block2) if_block2.c();

    			attr_dev(div0, "class", div0_class_value = "" + (null_to_empty(`single-nav-button__icon-container 
                ${/*backwardsGradient*/ ctx[4] && 'single-nav-button__icon-container--backwards-gradient'}
                ${/*isThickBorder*/ ctx[9] && 'single-nav-button__icon-container--thick-border'}
                ${/*prominent*/ ctx[5] && 'single-nav-button__icon-container--prominent'}`) + " svelte-r5bppi"));

    			add_location(div0, file$h, 7, 2, 91);

    			attr_dev(div1, "class", div1_class_value = "" + (null_to_empty(`single-nav-button 
              ${/*mixClass*/ ctx[0]}`) + " svelte-r5bppi"));

    			attr_dev(div1, "id", /*id*/ ctx[6]);
    			add_location(div1, file$h, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			if (if_block0) if_block0.m(div0, null);
    			append_dev(div0, t1);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(div0, null);
    			}

    			append_dev(div1, t2);

    			if (~current_block_type_index_1) {
    				if_blocks_1[current_block_type_index_1].m(div1, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div1, "click", /*click_handler*/ ctx[10], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*textInCircle*/ ctx[3]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_9(ctx);
    					if_block0.c();
    					if_block0.m(div0, t1);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block1) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block1 = if_blocks[current_block_type_index];

    					if (!if_block1) {
    						if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block1.c();
    					} else {
    						if_block1.p(ctx, dirty);
    					}

    					transition_in(if_block1, 1);
    					if_block1.m(div0, null);
    				} else {
    					if_block1 = null;
    				}
    			}

    			if (!current || dirty & /*backwardsGradient, isThickBorder, prominent*/ 560 && div0_class_value !== (div0_class_value = "" + (null_to_empty(`single-nav-button__icon-container 
                ${/*backwardsGradient*/ ctx[4] && 'single-nav-button__icon-container--backwards-gradient'}
                ${/*isThickBorder*/ ctx[9] && 'single-nav-button__icon-container--thick-border'}
                ${/*prominent*/ ctx[5] && 'single-nav-button__icon-container--prominent'}`) + " svelte-r5bppi"))) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			let previous_block_index_1 = current_block_type_index_1;
    			current_block_type_index_1 = select_block_type_1(ctx);

    			if (current_block_type_index_1 === previous_block_index_1) {
    				if (~current_block_type_index_1) {
    					if_blocks_1[current_block_type_index_1].p(ctx, dirty);
    				}
    			} else {
    				if (if_block2) {
    					group_outros();

    					transition_out(if_blocks_1[previous_block_index_1], 1, 1, () => {
    						if_blocks_1[previous_block_index_1] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index_1) {
    					if_block2 = if_blocks_1[current_block_type_index_1];

    					if (!if_block2) {
    						if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
    						if_block2.c();
    					} else {
    						if_block2.p(ctx, dirty);
    					}

    					transition_in(if_block2, 1);
    					if_block2.m(div1, null);
    				} else {
    					if_block2 = null;
    				}
    			}

    			if (!current || dirty & /*mixClass*/ 1 && div1_class_value !== (div1_class_value = "" + (null_to_empty(`single-nav-button 
              ${/*mixClass*/ ctx[0]}`) + " svelte-r5bppi"))) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if (!current || dirty & /*id*/ 64) {
    				attr_dev(div1, "id", /*id*/ ctx[6]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			transition_in(if_block2);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block1);
    			transition_out(if_block2);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			if (if_block0) if_block0.d();

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}

    			if (~current_block_type_index_1) {
    				if_blocks_1[current_block_type_index_1].d();
    			}

    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ButtonInCircle', slots, []);
    	let { class: mixClass } = $$props;
    	let { iconName = '' } = $$props;
    	let { text = '' } = $$props;
    	let { textInCircle = '' } = $$props;
    	let { backwardsGradient = false } = $$props;
    	let { prominent = false } = $$props;
    	let { id = '' } = $$props;
    	let { isTextOnTop = false } = $$props;
    	let { isTextArc = false } = $$props;
    	let { isThickBorder = false } = $$props;

    	const writable_props = [
    		'class',
    		'iconName',
    		'text',
    		'textInCircle',
    		'backwardsGradient',
    		'prominent',
    		'id',
    		'isTextOnTop',
    		'isTextArc',
    		'isThickBorder'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ButtonInCircle> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, mixClass = $$props.class);
    		if ('iconName' in $$props) $$invalidate(1, iconName = $$props.iconName);
    		if ('text' in $$props) $$invalidate(2, text = $$props.text);
    		if ('textInCircle' in $$props) $$invalidate(3, textInCircle = $$props.textInCircle);
    		if ('backwardsGradient' in $$props) $$invalidate(4, backwardsGradient = $$props.backwardsGradient);
    		if ('prominent' in $$props) $$invalidate(5, prominent = $$props.prominent);
    		if ('id' in $$props) $$invalidate(6, id = $$props.id);
    		if ('isTextOnTop' in $$props) $$invalidate(7, isTextOnTop = $$props.isTextOnTop);
    		if ('isTextArc' in $$props) $$invalidate(8, isTextArc = $$props.isTextArc);
    		if ('isThickBorder' in $$props) $$invalidate(9, isThickBorder = $$props.isThickBorder);
    	};

    	$$self.$capture_state = () => ({
    		mixClass,
    		iconName,
    		text,
    		textInCircle,
    		backwardsGradient,
    		prominent,
    		id,
    		isTextOnTop,
    		isTextArc,
    		isThickBorder,
    		ArcText,
    		Icon,
    		gearIcon,
    		giftBoxIcon,
    		houseIcon
    	});

    	$$self.$inject_state = $$props => {
    		if ('mixClass' in $$props) $$invalidate(0, mixClass = $$props.mixClass);
    		if ('iconName' in $$props) $$invalidate(1, iconName = $$props.iconName);
    		if ('text' in $$props) $$invalidate(2, text = $$props.text);
    		if ('textInCircle' in $$props) $$invalidate(3, textInCircle = $$props.textInCircle);
    		if ('backwardsGradient' in $$props) $$invalidate(4, backwardsGradient = $$props.backwardsGradient);
    		if ('prominent' in $$props) $$invalidate(5, prominent = $$props.prominent);
    		if ('id' in $$props) $$invalidate(6, id = $$props.id);
    		if ('isTextOnTop' in $$props) $$invalidate(7, isTextOnTop = $$props.isTextOnTop);
    		if ('isTextArc' in $$props) $$invalidate(8, isTextArc = $$props.isTextArc);
    		if ('isThickBorder' in $$props) $$invalidate(9, isThickBorder = $$props.isThickBorder);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		mixClass,
    		iconName,
    		text,
    		textInCircle,
    		backwardsGradient,
    		prominent,
    		id,
    		isTextOnTop,
    		isTextArc,
    		isThickBorder,
    		click_handler
    	];
    }

    class ButtonInCircle extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$i, create_fragment$i, safe_not_equal, {
    			class: 0,
    			iconName: 1,
    			text: 2,
    			textInCircle: 3,
    			backwardsGradient: 4,
    			prominent: 5,
    			id: 6,
    			isTextOnTop: 7,
    			isTextArc: 8,
    			isThickBorder: 9
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ButtonInCircle",
    			options,
    			id: create_fragment$i.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mixClass*/ ctx[0] === undefined && !('class' in props)) {
    			console.warn("<ButtonInCircle> was created without expected prop 'class'");
    		}
    	}

    	get class() {
    		throw new Error("<ButtonInCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<ButtonInCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get iconName() {
    		throw new Error("<ButtonInCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconName(value) {
    		throw new Error("<ButtonInCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<ButtonInCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<ButtonInCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get textInCircle() {
    		throw new Error("<ButtonInCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set textInCircle(value) {
    		throw new Error("<ButtonInCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get backwardsGradient() {
    		throw new Error("<ButtonInCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set backwardsGradient(value) {
    		throw new Error("<ButtonInCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get prominent() {
    		throw new Error("<ButtonInCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set prominent(value) {
    		throw new Error("<ButtonInCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<ButtonInCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<ButtonInCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isTextOnTop() {
    		throw new Error("<ButtonInCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isTextOnTop(value) {
    		throw new Error("<ButtonInCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isTextArc() {
    		throw new Error("<ButtonInCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isTextArc(value) {
    		throw new Error("<ButtonInCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isThickBorder() {
    		throw new Error("<ButtonInCircle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isThickBorder(value) {
    		throw new Error("<ButtonInCircle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }
    function slide(node, { delay = 0, duration = 400, easing = cubicOut } = {}) {
        const style = getComputedStyle(node);
        const opacity = +style.opacity;
        const height = parseFloat(style.height);
        const padding_top = parseFloat(style.paddingTop);
        const padding_bottom = parseFloat(style.paddingBottom);
        const margin_top = parseFloat(style.marginTop);
        const margin_bottom = parseFloat(style.marginBottom);
        const border_top_width = parseFloat(style.borderTopWidth);
        const border_bottom_width = parseFloat(style.borderBottomWidth);
        return {
            delay,
            duration,
            easing,
            css: t => 'overflow: hidden;' +
                `opacity: ${Math.min(t * 20, 1) * opacity};` +
                `height: ${t * height}px;` +
                `padding-top: ${t * padding_top}px;` +
                `padding-bottom: ${t * padding_bottom}px;` +
                `margin-top: ${t * margin_top}px;` +
                `margin-bottom: ${t * margin_bottom}px;` +
                `border-top-width: ${t * border_top_width}px;` +
                `border-bottom-width: ${t * border_bottom_width}px;`
        };
    }
    function scale(node, { delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const sd = 1 - start;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (_t, u) => `
			transform: ${transform} scale(${1 - (sd * u)});
			opacity: ${target_opacity - (od * u)}
		`
        };
    }

    var starIcon = "﻿<svg class=\"card-stats__icon\" width=\"512\" height=\"488\" viewBox=\"0 0 512 488\">\n   <path d=\"M256,0.76l76.119,164.254,179.894,21.564L379.164,309.658,414.225,487.24,256,399.052,97.775,487.24l35.061-177.582L-0.013,186.578l179.894-21.564Z\"/>\n</svg>";

    /* src/components/ChapterCard/ChapterAchievements.svelte generated by Svelte v3.43.0 */
    const file$g = "src/components/ChapterCard/ChapterAchievements.svelte";

    // (11:4) {#if chapterDetails?.challengeNameWords.length === 2}
    function create_if_block$4(ctx) {
    	let div;
    	let t_value = /*chapterDetails*/ ctx[1]?.challengeNameWords[1] + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "name__line2 svelte-bme2jg");
    			add_location(div, file$g, 11, 6, 350);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*chapterDetails*/ 2 && t_value !== (t_value = /*chapterDetails*/ ctx[1]?.challengeNameWords[1] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(11:4) {#if chapterDetails?.challengeNameWords.length === 2}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let t0;
    	let div12;
    	let div1;
    	let div0;
    	let t1_value = /*chapterDetails*/ ctx[1]?.challengeNameWords[0] + "";
    	let t1;
    	let t2;
    	let div1_class_value;
    	let t3;
    	let div2;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t4;
    	let div11;
    	let div6;
    	let div3;
    	let icon0;
    	let t5;
    	let div4;
    	let t7;
    	let div5;
    	let t8;
    	let div5_class_value;
    	let t9;
    	let div10;
    	let div7;
    	let icon1;
    	let t10;
    	let div8;
    	let t12;
    	let div9;
    	let t13;
    	let div9_class_value;
    	let div12_class_value;
    	let current;
    	let if_block = /*chapterDetails*/ ctx[1]?.challengeNameWords.length === 2 && create_if_block$4(ctx);

    	icon0 = new Icon({
    			props: { data: starIcon },
    			$$inline: true
    		});

    	icon1 = new Icon({
    			props: { data: giftBoxIcon },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t0 = space();
    			div12 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t1 = text(t1_value);
    			t2 = space();
    			if (if_block) if_block.c();
    			t3 = space();
    			div2 = element("div");
    			img = element("img");
    			t4 = space();
    			div11 = element("div");
    			div6 = element("div");
    			div3 = element("div");
    			create_component(icon0.$$.fragment);
    			t5 = space();
    			div4 = element("div");
    			div4.textContent = "64/90";
    			t7 = space();
    			div5 = element("div");
    			t8 = text("Stars");
    			t9 = space();
    			div10 = element("div");
    			div7 = element("div");
    			create_component(icon1.$$.fragment);
    			t10 = space();
    			div8 = element("div");
    			div8.textContent = "6/10";
    			t12 = space();
    			div9 = element("div");
    			t13 = text("Gifts");
    			attr_dev(div0, "class", "name__line1 svelte-bme2jg");
    			add_location(div0, file$g, 6, 4, 200);

    			attr_dev(div1, "class", div1_class_value = "" + (null_to_empty(`name 
                  ${!/*isReducedVersion*/ ctx[2] && 'name--visible'} 
                  card-achievements__name`) + " svelte-bme2jg"));

    			add_location(div1, file$g, 3, 2, 69);
    			attr_dev(img, "class", "card-achievements__main-icon svelte-bme2jg");
    			if (!src_url_equal(img.src, img_src_value = "../images/main-card-icons/" + /*chapterDetails*/ ctx[1]?.mainIcon)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*chapterDetails*/ ctx[1]?.name);
    			add_location(img, file$g, 20, 4, 565);
    			attr_dev(div2, "class", "card-achievements__main-icon-wrapper svelte-bme2jg");
    			add_location(div2, file$g, 18, 2, 468);
    			attr_dev(div3, "class", "card-stats__icon-container card-stats__icon-container--slightly-bigger svelte-bme2jg");
    			add_location(div3, file$g, 34, 6, 931);
    			attr_dev(div4, "class", "card-stats__value svelte-bme2jg");
    			add_location(div4, file$g, 38, 6, 1087);

    			attr_dev(div5, "class", div5_class_value = "" + (null_to_empty(`card-stats__name 
                      ${!/*isReducedVersion*/ ctx[2] && 'card-stats__name--visible'}`) + " svelte-bme2jg"));

    			add_location(div5, file$g, 41, 6, 1152);
    			attr_dev(div6, "class", "card-stats__separate-line card-stats__separate-line--first-line svelte-bme2jg");
    			add_location(div6, file$g, 32, 4, 830);
    			attr_dev(div7, "class", "card-stats__icon-container svelte-bme2jg");
    			add_location(div7, file$g, 48, 6, 1408);
    			attr_dev(div8, "class", "card-stats__value svelte-bme2jg");
    			add_location(div8, file$g, 51, 6, 1504);

    			attr_dev(div9, "class", div9_class_value = "" + (null_to_empty(`card-stats__name 
                      ${!/*isReducedVersion*/ ctx[2] && 'card-stats__name--visible'}`) + " svelte-bme2jg"));

    			add_location(div9, file$g, 54, 6, 1568);
    			attr_dev(div10, "class", "card-stats__separate-line card-stats__separate-line--second-line svelte-bme2jg");
    			add_location(div10, file$g, 46, 4, 1306);
    			attr_dev(div11, "class", "card-stats card-achievements__card-stats");
    			add_location(div11, file$g, 30, 2, 754);

    			attr_dev(div12, "class", div12_class_value = "" + (null_to_empty(`card-achievements 
              ${/*mixClass*/ ctx[0]}`) + " svelte-bme2jg"));

    			add_location(div12, file$g, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div12, anchor);
    			append_dev(div12, div1);
    			append_dev(div1, div0);
    			append_dev(div0, t1);
    			append_dev(div1, t2);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div12, t3);
    			append_dev(div12, div2);
    			append_dev(div2, img);
    			append_dev(div12, t4);
    			append_dev(div12, div11);
    			append_dev(div11, div6);
    			append_dev(div6, div3);
    			mount_component(icon0, div3, null);
    			append_dev(div6, t5);
    			append_dev(div6, div4);
    			append_dev(div6, t7);
    			append_dev(div6, div5);
    			append_dev(div5, t8);
    			append_dev(div11, t9);
    			append_dev(div11, div10);
    			append_dev(div10, div7);
    			mount_component(icon1, div7, null);
    			append_dev(div10, t10);
    			append_dev(div10, div8);
    			append_dev(div10, t12);
    			append_dev(div10, div9);
    			append_dev(div9, t13);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*chapterDetails*/ 2) && t1_value !== (t1_value = /*chapterDetails*/ ctx[1]?.challengeNameWords[0] + "")) set_data_dev(t1, t1_value);

    			if (/*chapterDetails*/ ctx[1]?.challengeNameWords.length === 2) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					if_block.m(div1, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (!current || dirty & /*isReducedVersion*/ 4 && div1_class_value !== (div1_class_value = "" + (null_to_empty(`name 
                  ${!/*isReducedVersion*/ ctx[2] && 'name--visible'} 
                  card-achievements__name`) + " svelte-bme2jg"))) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if (!current || dirty & /*chapterDetails*/ 2 && !src_url_equal(img.src, img_src_value = "../images/main-card-icons/" + /*chapterDetails*/ ctx[1]?.mainIcon)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (!current || dirty & /*chapterDetails*/ 2 && img_alt_value !== (img_alt_value = /*chapterDetails*/ ctx[1]?.name)) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (!current || dirty & /*isReducedVersion*/ 4 && div5_class_value !== (div5_class_value = "" + (null_to_empty(`card-stats__name 
                      ${!/*isReducedVersion*/ ctx[2] && 'card-stats__name--visible'}`) + " svelte-bme2jg"))) {
    				attr_dev(div5, "class", div5_class_value);
    			}

    			if (!current || dirty & /*isReducedVersion*/ 4 && div9_class_value !== (div9_class_value = "" + (null_to_empty(`card-stats__name 
                      ${!/*isReducedVersion*/ ctx[2] && 'card-stats__name--visible'}`) + " svelte-bme2jg"))) {
    				attr_dev(div9, "class", div9_class_value);
    			}

    			if (!current || dirty & /*mixClass*/ 1 && div12_class_value !== (div12_class_value = "" + (null_to_empty(`card-achievements 
              ${/*mixClass*/ ctx[0]}`) + " svelte-bme2jg"))) {
    				attr_dev(div12, "class", div12_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon0.$$.fragment, local);
    			transition_in(icon1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon0.$$.fragment, local);
    			transition_out(icon1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div12);
    			if (if_block) if_block.d();
    			destroy_component(icon0);
    			destroy_component(icon1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChapterAchievements', slots, []);
    	let { class: mixClass } = $$props;
    	let { chapterDetails = {} } = $$props;
    	let { isReducedVersion = false } = $$props;

    	onMount(() => {
    		
    	});

    	const writable_props = ['class', 'chapterDetails', 'isReducedVersion'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChapterAchievements> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, mixClass = $$props.class);
    		if ('chapterDetails' in $$props) $$invalidate(1, chapterDetails = $$props.chapterDetails);
    		if ('isReducedVersion' in $$props) $$invalidate(2, isReducedVersion = $$props.isReducedVersion);
    	};

    	$$self.$capture_state = () => ({
    		mixClass,
    		chapterDetails,
    		isReducedVersion,
    		Icon,
    		starIcon,
    		giftBoxIcon,
    		onMount
    	});

    	$$self.$inject_state = $$props => {
    		if ('mixClass' in $$props) $$invalidate(0, mixClass = $$props.mixClass);
    		if ('chapterDetails' in $$props) $$invalidate(1, chapterDetails = $$props.chapterDetails);
    		if ('isReducedVersion' in $$props) $$invalidate(2, isReducedVersion = $$props.isReducedVersion);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [mixClass, chapterDetails, isReducedVersion];
    }

    class ChapterAchievements extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {
    			class: 0,
    			chapterDetails: 1,
    			isReducedVersion: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChapterAchievements",
    			options,
    			id: create_fragment$h.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mixClass*/ ctx[0] === undefined && !('class' in props)) {
    			console.warn("<ChapterAchievements> was created without expected prop 'class'");
    		}
    	}

    	get class() {
    		throw new Error("<ChapterAchievements>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<ChapterAchievements>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get chapterDetails() {
    		throw new Error("<ChapterAchievements>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set chapterDetails(value) {
    		throw new Error("<ChapterAchievements>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isReducedVersion() {
    		throw new Error("<ChapterAchievements>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isReducedVersion(value) {
    		throw new Error("<ChapterAchievements>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/ProgressBar.svelte generated by Svelte v3.43.0 */

    const file$f = "src/components/ProgressBar.svelte";

    // (89:32) 
    function create_if_block_2$1(ctx) {
    	let arctext0;
    	let t0;
    	let arctext1;
    	let t1;
    	let arctext2;
    	let current;

    	arctext0 = new ArcText({
    			props: {
    				class: "titles__title \n                titles__title--triple-first",
    				debugMode: false,
    				roundness: "3.9",
    				fontSize: "1.8",
    				topShift: "-.9",
    				color: "#fff",
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	arctext1 = new ArcText({
    			props: {
    				class: "titles__title \n                titles__title--triple-second",
    				debugMode: false,
    				roundness: "3.9",
    				fontSize: "1.8",
    				topShift: "-.9",
    				color: "#fff",
    				$$slots: { default: [create_default_slot_4$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	arctext2 = new ArcText({
    			props: {
    				class: "titles__title \n                titles__title--triple-third",
    				debugMode: false,
    				roundness: "3.9",
    				fontSize: "1.8",
    				topShift: "-.9",
    				color: "#fff",
    				$$slots: { default: [create_default_slot_3$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(arctext0.$$.fragment);
    			t0 = space();
    			create_component(arctext1.$$.fragment);
    			t1 = space();
    			create_component(arctext2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(arctext0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(arctext1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(arctext2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const arctext0_changes = {};

    			if (dirty & /*$$scope, titles*/ 24) {
    				arctext0_changes.$$scope = { dirty, ctx };
    			}

    			arctext0.$set(arctext0_changes);
    			const arctext1_changes = {};

    			if (dirty & /*$$scope, titles*/ 24) {
    				arctext1_changes.$$scope = { dirty, ctx };
    			}

    			arctext1.$set(arctext1_changes);
    			const arctext2_changes = {};

    			if (dirty & /*$$scope, titles*/ 24) {
    				arctext2_changes.$$scope = { dirty, ctx };
    			}

    			arctext2.$set(arctext2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(arctext0.$$.fragment, local);
    			transition_in(arctext1.$$.fragment, local);
    			transition_in(arctext2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(arctext0.$$.fragment, local);
    			transition_out(arctext1.$$.fragment, local);
    			transition_out(arctext2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(arctext0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(arctext1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(arctext2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(89:32) ",
    		ctx
    	});

    	return block;
    }

    // (64:34) 
    function create_if_block_1$1(ctx) {
    	let arctext0;
    	let t;
    	let arctext1;
    	let current;

    	arctext0 = new ArcText({
    			props: {
    				class: "titles__title \n                titles__title--double-first",
    				debugMode: false,
    				roundness: "3.9",
    				fontSize: "1.8",
    				topShift: "-.9",
    				color: "#fff",
    				$$slots: { default: [create_default_slot_2$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	arctext1 = new ArcText({
    			props: {
    				class: "titles__title \n                titles__title--double-second",
    				debugMode: false,
    				roundness: "3.9",
    				fontSize: "1.8",
    				topShift: "-.9",
    				color: "#fff",
    				$$slots: { default: [create_default_slot_1$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(arctext0.$$.fragment);
    			t = space();
    			create_component(arctext1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(arctext0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(arctext1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const arctext0_changes = {};

    			if (dirty & /*$$scope, titles*/ 24) {
    				arctext0_changes.$$scope = { dirty, ctx };
    			}

    			arctext0.$set(arctext0_changes);
    			const arctext1_changes = {};

    			if (dirty & /*$$scope, titles*/ 24) {
    				arctext1_changes.$$scope = { dirty, ctx };
    			}

    			arctext1.$set(arctext1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(arctext0.$$.fragment, local);
    			transition_in(arctext1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(arctext0.$$.fragment, local);
    			transition_out(arctext1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(arctext0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(arctext1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(64:34) ",
    		ctx
    	});

    	return block;
    }

    // (51:4) {#if type === 'single'}
    function create_if_block$3(ctx) {
    	let arctext;
    	let current;

    	arctext = new ArcText({
    			props: {
    				class: "titles__title \n                titles__title--single",
    				debugMode: false,
    				roundness: "3.9",
    				fontSize: "1.8",
    				topShift: "-.9",
    				color: "#fff",
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(arctext.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(arctext, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const arctext_changes = {};

    			if (dirty & /*$$scope, titles*/ 24) {
    				arctext_changes.$$scope = { dirty, ctx };
    			}

    			arctext.$set(arctext_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(arctext.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(arctext.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(arctext, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(51:4) {#if type === 'single'}",
    		ctx
    	});

    	return block;
    }

    // (90:6) <ArcText         class="titles__title                  titles__title--triple-first"         debugMode={false}         roundness="3.9"         fontSize="1.8"         topShift="-.9"         color="#fff"       >
    function create_default_slot_5(ctx) {
    	let t_value = /*titles*/ ctx[3][0]?.toUpperCase() + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*titles*/ 8 && t_value !== (t_value = /*titles*/ ctx[3][0]?.toUpperCase() + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(90:6) <ArcText         class=\\\"titles__title                  titles__title--triple-first\\\"         debugMode={false}         roundness=\\\"3.9\\\"         fontSize=\\\"1.8\\\"         topShift=\\\"-.9\\\"         color=\\\"#fff\\\"       >",
    		ctx
    	});

    	return block;
    }

    // (102:6) <ArcText         class="titles__title                  titles__title--triple-second"         debugMode={false}         roundness="3.9"         fontSize="1.8"         topShift="-.9"         color="#fff"       >
    function create_default_slot_4$1(ctx) {
    	let t_value = /*titles*/ ctx[3][1]?.toUpperCase() + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*titles*/ 8 && t_value !== (t_value = /*titles*/ ctx[3][1]?.toUpperCase() + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$1.name,
    		type: "slot",
    		source: "(102:6) <ArcText         class=\\\"titles__title                  titles__title--triple-second\\\"         debugMode={false}         roundness=\\\"3.9\\\"         fontSize=\\\"1.8\\\"         topShift=\\\"-.9\\\"         color=\\\"#fff\\\"       >",
    		ctx
    	});

    	return block;
    }

    // (114:6) <ArcText         class="titles__title                  titles__title--triple-third"         debugMode={false}         roundness="3.9"         fontSize="1.8"         topShift="-.9"         color="#fff"       >
    function create_default_slot_3$2(ctx) {
    	let t_value = /*titles*/ ctx[3][2]?.toUpperCase() + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*titles*/ 8 && t_value !== (t_value = /*titles*/ ctx[3][2]?.toUpperCase() + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$2.name,
    		type: "slot",
    		source: "(114:6) <ArcText         class=\\\"titles__title                  titles__title--triple-third\\\"         debugMode={false}         roundness=\\\"3.9\\\"         fontSize=\\\"1.8\\\"         topShift=\\\"-.9\\\"         color=\\\"#fff\\\"       >",
    		ctx
    	});

    	return block;
    }

    // (65:6) <ArcText         class="titles__title                  titles__title--double-first"         debugMode={false}         roundness="3.9"         fontSize="1.8"         topShift="-.9"         color="#fff"       >
    function create_default_slot_2$2(ctx) {
    	let t_value = /*titles*/ ctx[3][0]?.toUpperCase() + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*titles*/ 8 && t_value !== (t_value = /*titles*/ ctx[3][0]?.toUpperCase() + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$2.name,
    		type: "slot",
    		source: "(65:6) <ArcText         class=\\\"titles__title                  titles__title--double-first\\\"         debugMode={false}         roundness=\\\"3.9\\\"         fontSize=\\\"1.8\\\"         topShift=\\\"-.9\\\"         color=\\\"#fff\\\"       >",
    		ctx
    	});

    	return block;
    }

    // (77:6) <ArcText         class="titles__title                  titles__title--double-second"         debugMode={false}         roundness="3.9"         fontSize="1.8"         topShift="-.9"         color="#fff"       >
    function create_default_slot_1$3(ctx) {
    	let t_value = /*titles*/ ctx[3][1]?.toUpperCase() + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*titles*/ 8 && t_value !== (t_value = /*titles*/ ctx[3][1]?.toUpperCase() + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(77:6) <ArcText         class=\\\"titles__title                  titles__title--double-second\\\"         debugMode={false}         roundness=\\\"3.9\\\"         fontSize=\\\"1.8\\\"         topShift=\\\"-.9\\\"         color=\\\"#fff\\\"       >",
    		ctx
    	});

    	return block;
    }

    // (52:6) <ArcText         class="titles__title                  titles__title--single"         debugMode={false}         roundness="3.9"         fontSize="1.8"         topShift="-.9"         color="#fff"       >
    function create_default_slot$3(ctx) {
    	let t_value = /*titles*/ ctx[3][0]?.toUpperCase() + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*titles*/ 8 && t_value !== (t_value = /*titles*/ ctx[3][0]?.toUpperCase() + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(52:6) <ArcText         class=\\\"titles__title                  titles__title--single\\\"         debugMode={false}         roundness=\\\"3.9\\\"         fontSize=\\\"1.8\\\"         topShift=\\\"-.9\\\"         color=\\\"#fff\\\"       >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let t0;
    	let div10;
    	let div2;
    	let div1;
    	let div0;
    	let div2_class_value;
    	let t1;
    	let div8;
    	let div5;
    	let div4;
    	let div3;
    	let div5_class_value;
    	let t2;
    	let div7;
    	let div6;
    	let div7_class_value;
    	let div8_class_value;
    	let t3;
    	let div9;
    	let current_block_type_index;
    	let if_block;
    	let div10_class_value;
    	let current;
    	const if_block_creators = [create_if_block$3, create_if_block_1$1, create_if_block_2$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*type*/ ctx[2] === 'single') return 0;
    		if (/*type*/ ctx[2] === 'double') return 1;
    		if (/*type*/ ctx[2] === 'triple') return 2;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			t0 = space();
    			div10 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t1 = space();
    			div8 = element("div");
    			div5 = element("div");
    			div4 = element("div");
    			div3 = element("div");
    			t2 = space();
    			div7 = element("div");
    			div6 = element("div");
    			t3 = space();
    			div9 = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div0, "class", "progress-bar__bullet svelte-3a0qkp");
    			add_location(div0, file$f, 14, 6, 615);
    			attr_dev(div1, "class", "progress-bar__bullet-container svelte-3a0qkp");
    			set_style(div1, "transform", "rotate(" + (/*type*/ ctx[2] === 'single' ? -8.7 : -14) + "deg)");
    			add_location(div1, file$f, 10, 4, 482);

    			attr_dev(div2, "class", div2_class_value = "" + (null_to_empty(`progress-bar__bullet-revolver 
              ${/*type*/ ctx[2] === 'single' && 'progress-bar__bullet-revolver--bigger-top-indent'}`) + " svelte-3a0qkp"));

    			set_style(div2, "transform", "rotate(" + (/*progress*/ ctx[1] / (/*type*/ ctx[2] === 'single' ? 5.76 : 3.56) + 'deg') + ")");
    			add_location(div2, file$f, 5, 2, 244);
    			attr_dev(div3, "class", "progress-bar__bullet-shadow svelte-3a0qkp");
    			add_location(div3, file$f, 32, 8, 1363);
    			attr_dev(div4, "class", "progress-bar__bullet-container svelte-3a0qkp");
    			set_style(div4, "transform", "rotate(" + (/*type*/ ctx[2] === 'single' ? -8.7 : -14) + "deg)");
    			add_location(div4, file$f, 28, 6, 1222);

    			attr_dev(div5, "class", div5_class_value = "" + (null_to_empty(`progress-bar__bullet-revolver 
                ${/*type*/ ctx[2] === 'single' && 'progress-bar__bullet-revolver--bigger-top-indent'}`) + " svelte-3a0qkp"));

    			set_style(div5, "transform", "rotate(" + (/*progress*/ ctx[1] / (/*type*/ ctx[2] === 'single' ? 5.76 : 3.56) + 'deg') + ")");
    			add_location(div5, file$f, 23, 4, 975);
    			attr_dev(div6, "class", "progress-bar__scale svelte-3a0qkp");
    			set_style(div6, "left", /*progress*/ ctx[1] + "%");
    			add_location(div6, file$f, 38, 6, 1581);

    			attr_dev(div7, "class", div7_class_value = "" + (null_to_empty(`progress-bar__scale-wrapper 
                    ${/*type*/ ctx[2] === 'single' && 'progress-bar__scale-wrapper--narrow'}`) + " svelte-3a0qkp"));

    			add_location(div7, file$f, 36, 4, 1444);

    			attr_dev(div8, "class", div8_class_value = "" + (null_to_empty(`progress-bar__scale-container 
                ${/*type*/ ctx[2] === 'single' && 'progress-bar__scale-container--single'}
                ${/*type*/ ctx[2] === 'double' && 'progress-bar__scale-container--double'}
                ${/*type*/ ctx[2] === 'triple' && 'progress-bar__scale-container--triple'}`) + " svelte-3a0qkp"));

    			add_location(div8, file$f, 18, 2, 681);
    			attr_dev(div9, "class", "titles progress-bar__titles svelte-3a0qkp");
    			add_location(div9, file$f, 47, 2, 1709);

    			attr_dev(div10, "class", div10_class_value = "" + (null_to_empty(`progress-bar 
              ${/*type*/ ctx[2] === 'single' && 'progress-bar--single'}
              ${/*type*/ ctx[2] === 'double' && 'progress-bar--double'}
              ${/*type*/ ctx[2] === 'triple' && 'progress-bar--triple'}
              ${/*mixClass*/ ctx[0]}`) + " svelte-3a0qkp"));

    			add_location(div10, file$f, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div10, anchor);
    			append_dev(div10, div2);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div10, t1);
    			append_dev(div10, div8);
    			append_dev(div8, div5);
    			append_dev(div5, div4);
    			append_dev(div4, div3);
    			append_dev(div8, t2);
    			append_dev(div8, div7);
    			append_dev(div7, div6);
    			append_dev(div10, t3);
    			append_dev(div10, div9);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(div9, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*type*/ 4) {
    				set_style(div1, "transform", "rotate(" + (/*type*/ ctx[2] === 'single' ? -8.7 : -14) + "deg)");
    			}

    			if (!current || dirty & /*type*/ 4 && div2_class_value !== (div2_class_value = "" + (null_to_empty(`progress-bar__bullet-revolver 
              ${/*type*/ ctx[2] === 'single' && 'progress-bar__bullet-revolver--bigger-top-indent'}`) + " svelte-3a0qkp"))) {
    				attr_dev(div2, "class", div2_class_value);
    			}

    			if (!current || dirty & /*progress, type*/ 6) {
    				set_style(div2, "transform", "rotate(" + (/*progress*/ ctx[1] / (/*type*/ ctx[2] === 'single' ? 5.76 : 3.56) + 'deg') + ")");
    			}

    			if (!current || dirty & /*type*/ 4) {
    				set_style(div4, "transform", "rotate(" + (/*type*/ ctx[2] === 'single' ? -8.7 : -14) + "deg)");
    			}

    			if (!current || dirty & /*type*/ 4 && div5_class_value !== (div5_class_value = "" + (null_to_empty(`progress-bar__bullet-revolver 
                ${/*type*/ ctx[2] === 'single' && 'progress-bar__bullet-revolver--bigger-top-indent'}`) + " svelte-3a0qkp"))) {
    				attr_dev(div5, "class", div5_class_value);
    			}

    			if (!current || dirty & /*progress, type*/ 6) {
    				set_style(div5, "transform", "rotate(" + (/*progress*/ ctx[1] / (/*type*/ ctx[2] === 'single' ? 5.76 : 3.56) + 'deg') + ")");
    			}

    			if (!current || dirty & /*progress*/ 2) {
    				set_style(div6, "left", /*progress*/ ctx[1] + "%");
    			}

    			if (!current || dirty & /*type*/ 4 && div7_class_value !== (div7_class_value = "" + (null_to_empty(`progress-bar__scale-wrapper 
                    ${/*type*/ ctx[2] === 'single' && 'progress-bar__scale-wrapper--narrow'}`) + " svelte-3a0qkp"))) {
    				attr_dev(div7, "class", div7_class_value);
    			}

    			if (!current || dirty & /*type*/ 4 && div8_class_value !== (div8_class_value = "" + (null_to_empty(`progress-bar__scale-container 
                ${/*type*/ ctx[2] === 'single' && 'progress-bar__scale-container--single'}
                ${/*type*/ ctx[2] === 'double' && 'progress-bar__scale-container--double'}
                ${/*type*/ ctx[2] === 'triple' && 'progress-bar__scale-container--triple'}`) + " svelte-3a0qkp"))) {
    				attr_dev(div8, "class", div8_class_value);
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(div9, null);
    				} else {
    					if_block = null;
    				}
    			}

    			if (!current || dirty & /*type, mixClass*/ 5 && div10_class_value !== (div10_class_value = "" + (null_to_empty(`progress-bar 
              ${/*type*/ ctx[2] === 'single' && 'progress-bar--single'}
              ${/*type*/ ctx[2] === 'double' && 'progress-bar--double'}
              ${/*type*/ ctx[2] === 'triple' && 'progress-bar--triple'}
              ${/*mixClass*/ ctx[0]}`) + " svelte-3a0qkp"))) {
    				attr_dev(div10, "class", div10_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div10);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ProgressBar', slots, []);
    	let { class: mixClass } = $$props;
    	let { progress = 0 } = $$props;
    	let { type = 'single' } = $$props;
    	let { titles = [] } = $$props;

    	// ============================================================================
    	// Data
    	// let localProgress = 100;
    	// ============================================================================
    	// Lifecycle hooks
    	onMount(() => {
    		
    	}); // setInterval(() => {
    	//   let newProgress = localProgress;
    	//   newProgress += 10;
    	//

    	const writable_props = ['class', 'progress', 'type', 'titles'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ProgressBar> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, mixClass = $$props.class);
    		if ('progress' in $$props) $$invalidate(1, progress = $$props.progress);
    		if ('type' in $$props) $$invalidate(2, type = $$props.type);
    		if ('titles' in $$props) $$invalidate(3, titles = $$props.titles);
    	};

    	$$self.$capture_state = () => ({
    		mixClass,
    		onMount,
    		progress,
    		type,
    		titles,
    		ArcText
    	});

    	$$self.$inject_state = $$props => {
    		if ('mixClass' in $$props) $$invalidate(0, mixClass = $$props.mixClass);
    		if ('progress' in $$props) $$invalidate(1, progress = $$props.progress);
    		if ('type' in $$props) $$invalidate(2, type = $$props.type);
    		if ('titles' in $$props) $$invalidate(3, titles = $$props.titles);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [mixClass, progress, type, titles];
    }

    class ProgressBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {
    			class: 0,
    			progress: 1,
    			type: 2,
    			titles: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProgressBar",
    			options,
    			id: create_fragment$g.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mixClass*/ ctx[0] === undefined && !('class' in props)) {
    			console.warn("<ProgressBar> was created without expected prop 'class'");
    		}
    	}

    	get class() {
    		throw new Error("<ProgressBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<ProgressBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get progress() {
    		throw new Error("<ProgressBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set progress(value) {
    		throw new Error("<ProgressBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<ProgressBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<ProgressBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get titles() {
    		throw new Error("<ProgressBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set titles(value) {
    		throw new Error("<ProgressBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/ChapterCard/LevelDescription.svelte generated by Svelte v3.43.0 */
    const file$e = "src/components/ChapterCard/LevelDescription.svelte";

    function create_fragment$f(ctx) {
    	let t0;
    	let div1;
    	let div0;
    	let t1;
    	let div1_class_value;

    	const block = {
    		c: function create() {
    			t0 = space();
    			div1 = element("div");
    			div0 = element("div");
    			t1 = text(/*text*/ ctx[1]);
    			attr_dev(div0, "class", "level-description__inner svelte-tmsrcy");
    			set_style(div0, "transform", "translateY(" + -/*scrollPosition*/ ctx[2] + "px)");
    			add_location(div0, file$e, 11, 2, 559);

    			attr_dev(div1, "class", div1_class_value = "" + (null_to_empty(`level-description 
            ${/*scrollPosition*/ ctx[2] >= /*maxScrollPosition*/ ctx[3] && /*maxScrollPosition*/ ctx[3] > 0 && 'level-description--hidden-top'}
            ${/*scrollPosition*/ ctx[2] === 0 && /*maxScrollPosition*/ ctx[3] > 0 && 'level-description--hidden-bottom'}
            ${/*scrollPosition*/ ctx[2] > 0 && /*scrollPosition*/ ctx[2] < /*maxScrollPosition*/ ctx[3] && 'level-description--hidden-top-n-bottom'}
            ${/*mixClass*/ ctx[0]}`) + " svelte-tmsrcy"));

    			add_location(div1, file$e, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t1);
    			/*div0_binding*/ ctx[6](div0);
    			/*div1_binding*/ ctx[7](div1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*text*/ 2) set_data_dev(t1, /*text*/ ctx[1]);

    			if (dirty & /*scrollPosition*/ 4) {
    				set_style(div0, "transform", "translateY(" + -/*scrollPosition*/ ctx[2] + "px)");
    			}

    			if (dirty & /*scrollPosition, maxScrollPosition, mixClass*/ 13 && div1_class_value !== (div1_class_value = "" + (null_to_empty(`level-description 
            ${/*scrollPosition*/ ctx[2] >= /*maxScrollPosition*/ ctx[3] && /*maxScrollPosition*/ ctx[3] > 0 && 'level-description--hidden-top'}
            ${/*scrollPosition*/ ctx[2] === 0 && /*maxScrollPosition*/ ctx[3] > 0 && 'level-description--hidden-bottom'}
            ${/*scrollPosition*/ ctx[2] > 0 && /*scrollPosition*/ ctx[2] < /*maxScrollPosition*/ ctx[3] && 'level-description--hidden-top-n-bottom'}
            ${/*mixClass*/ ctx[0]}`) + " svelte-tmsrcy"))) {
    				attr_dev(div1, "class", div1_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			/*div0_binding*/ ctx[6](null);
    			/*div1_binding*/ ctx[7](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LevelDescription', slots, []);
    	let { class: mixClass } = $$props;
    	const dispatch = createEventDispatcher();
    	let { text = '' } = $$props;

    	// ============================================================================
    	// Data
    	let scrollStartTime;

    	let scrollPosition = 0;
    	let maxScrollPosition = 0;

    	// ============================================================================
    	// Refs (pointers to DOM elements)
    	let refRootContainer;

    	let refDescriptionInner;

    	// ============================================================================
    	// Methods
    	function scrollTextToTop(timeStamp) {
    		if (maxScrollPosition === 0) {
    			return;
    		}

    		if (scrollStartTime === 0) {
    			scrollStartTime = timeStamp;
    		}

    		if (timeStamp - scrollStartTime < 100) {
    			requestAnimationFrame(scrollTextToTop);
    			return;
    		} else if (scrollPosition >= maxScrollPosition) {
    			setTimeout(() => dispatch('scrollEnd'), 2500);
    			return;
    		}

    		scrollStartTime = timeStamp;
    		$$invalidate(2, scrollPosition += 2);
    		requestAnimationFrame(scrollTextToTop);
    	}

    	// function scrollTextToBottom(timeStamp) {
    	//   if (timeStamp - scrollStartTime < 100) {
    	//     requestAnimationFrame(scrollTextToBottom);
    	//     return;
    	//   } else if (scrollPosition <= 0) {
    	//     setTimeout(() => dispatch('scrollEnd'), 3500);
    	//     return;
    	//   }
    	//
    	//   scrollStartTime = timeStamp
    	//   scrollPosition -= 2;
    	//   requestAnimationFrame(scrollTextToBottom);
    	// }
    	function calcMaxScrollPosition() {
    		const wrapperHeight = refRootContainer.clientHeight;
    		const textHeight = refDescriptionInner.clientHeight;

    		if (textHeight > wrapperHeight) {
    			$$invalidate(3, maxScrollPosition = textHeight - wrapperHeight);
    		}
    	}

    	// ============================================================================
    	// Lifecycle hooks
    	onMount(() => {
    		calcMaxScrollPosition();
    		setTimeout(() => requestAnimationFrame(scrollTextToTop), 1500);

    		if (maxScrollPosition <= 0) {
    			setTimeout(() => dispatch('scrollEnd'), 4500);
    		}
    	});

    	const writable_props = ['class', 'text'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LevelDescription> was created with unknown prop '${key}'`);
    	});

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			refDescriptionInner = $$value;
    			$$invalidate(5, refDescriptionInner);
    		});
    	}

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			refRootContainer = $$value;
    			$$invalidate(4, refRootContainer);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, mixClass = $$props.class);
    		if ('text' in $$props) $$invalidate(1, text = $$props.text);
    	};

    	$$self.$capture_state = () => ({
    		mixClass,
    		onMount,
    		onDestroy,
    		createEventDispatcher,
    		dispatch,
    		text,
    		scrollStartTime,
    		scrollPosition,
    		maxScrollPosition,
    		refRootContainer,
    		refDescriptionInner,
    		scrollTextToTop,
    		calcMaxScrollPosition
    	});

    	$$self.$inject_state = $$props => {
    		if ('mixClass' in $$props) $$invalidate(0, mixClass = $$props.mixClass);
    		if ('text' in $$props) $$invalidate(1, text = $$props.text);
    		if ('scrollStartTime' in $$props) scrollStartTime = $$props.scrollStartTime;
    		if ('scrollPosition' in $$props) $$invalidate(2, scrollPosition = $$props.scrollPosition);
    		if ('maxScrollPosition' in $$props) $$invalidate(3, maxScrollPosition = $$props.maxScrollPosition);
    		if ('refRootContainer' in $$props) $$invalidate(4, refRootContainer = $$props.refRootContainer);
    		if ('refDescriptionInner' in $$props) $$invalidate(5, refDescriptionInner = $$props.refDescriptionInner);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		mixClass,
    		text,
    		scrollPosition,
    		maxScrollPosition,
    		refRootContainer,
    		refDescriptionInner,
    		div0_binding,
    		div1_binding
    	];
    }

    class LevelDescription extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, { class: 0, text: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LevelDescription",
    			options,
    			id: create_fragment$f.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mixClass*/ ctx[0] === undefined && !('class' in props)) {
    			console.warn("<LevelDescription> was created without expected prop 'class'");
    		}
    	}

    	get class() {
    		throw new Error("<LevelDescription>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<LevelDescription>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<LevelDescription>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<LevelDescription>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/ChapterCard/LockIcon.svelte generated by Svelte v3.43.0 */

    const file$d = "src/components/ChapterCard/LockIcon.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	child_ctx[10] = i;
    	return child_ctx;
    }

    // (31:6) {#if Array.isArray(bodyColor)}
    function create_if_block$2(ctx) {
    	let linearGradient;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let linearGradient_id_value;
    	let each_value = /*bodyColor*/ ctx[2];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*index*/ ctx[10];
    	validate_each_keys(ctx, each_value, get_each_context$3, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$3(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$3(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			linearGradient = svg_element("linearGradient");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(linearGradient, "id", linearGradient_id_value = 'bodyGradient' + /*cardId*/ ctx[3]);
    			attr_dev(linearGradient, "x1", "0");
    			attr_dev(linearGradient, "x2", "0");
    			attr_dev(linearGradient, "y1", "0");
    			attr_dev(linearGradient, "y2", "1");
    			add_location(linearGradient, file$d, 31, 8, 1263);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, linearGradient, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(linearGradient, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*Math, bodyColor*/ 4) {
    				each_value = /*bodyColor*/ ctx[2];
    				validate_each_argument(each_value);
    				validate_each_keys(ctx, each_value, get_each_context$3, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, linearGradient, destroy_block, create_each_block$3, null, get_each_context$3);
    			}

    			if (dirty & /*cardId*/ 8 && linearGradient_id_value !== (linearGradient_id_value = 'bodyGradient' + /*cardId*/ ctx[3])) {
    				attr_dev(linearGradient, "id", linearGradient_id_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(linearGradient);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(31:6) {#if Array.isArray(bodyColor)}",
    		ctx
    	});

    	return block;
    }

    // (33:10) {#each bodyColor as color,index (index)}
    function create_each_block$3(key_1, ctx) {
    	let stop;
    	let stop_offset_value;
    	let stop_stop_color_value;

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			stop = svg_element("stop");
    			attr_dev(stop, "offset", stop_offset_value = "" + (Math.floor(100 / (/*bodyColor*/ ctx[2].length - 1) * /*index*/ ctx[10]) + "%"));
    			attr_dev(stop, "stop-color", stop_stop_color_value = '#' + /*color*/ ctx[8]);
    			add_location(stop, file$d, 33, 12, 1400);
    			this.first = stop;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, stop, anchor);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*bodyColor*/ 4 && stop_offset_value !== (stop_offset_value = "" + (Math.floor(100 / (/*bodyColor*/ ctx[2].length - 1) * /*index*/ ctx[10]) + "%"))) {
    				attr_dev(stop, "offset", stop_offset_value);
    			}

    			if (dirty & /*bodyColor*/ 4 && stop_stop_color_value !== (stop_stop_color_value = '#' + /*color*/ ctx[8])) {
    				attr_dev(stop, "stop-color", stop_stop_color_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(stop);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(33:10) {#each bodyColor as color,index (index)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let t0;
    	let div1;
    	let div0;
    	let svg0;
    	let g0;
    	let path0;
    	let path1;
    	let svg0_class_value;
    	let t1;
    	let svg1;
    	let show_if = Array.isArray(/*bodyColor*/ ctx[2]);
    	let g1;
    	let path2;
    	let path3;
    	let path3_style_value;
    	let div0_class_value;
    	let div1_class_value;
    	let if_block = show_if && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			t0 = space();
    			div1 = element("div");
    			div0 = element("div");
    			svg0 = svg_element("svg");
    			g0 = svg_element("g");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			t1 = space();
    			svg1 = svg_element("svg");
    			if (if_block) if_block.c();
    			g1 = svg_element("g");
    			path2 = svg_element("path");
    			path3 = svg_element("path");
    			set_style(path0, "fill-rule", "evenodd");
    			set_style(path0, "fill", "#000");
    			set_style(path0, "opacity", ".25");
    			attr_dev(path0, "id", "Triangle_1_copy");
    			attr_dev(path0, "data-name", "Triangle 1 copy");
    			attr_dev(path0, "d", "M239.284,205.643l-76.662-1.795V121.64c0.089-1.133.147-2.274,0.147-3.429a43.371,43.371,0,0,0-86.742-.294H75.966v85.931L0.008,205.643V119.732H0.175a119.758,119.758,0,0,1,239.515.813c0,3.19-.162,6.34-0.406,9.467v75.631Z");
    			add_location(path0, file$d, 14, 8, 393);
    			set_style(path1, "fill-rule", "evenodd");
    			set_style(path1, "fill", '#' + /*latchColor*/ ctx[1]);
    			attr_dev(path1, "id", "Triangle_1");
    			attr_dev(path1, "data-name", "Triangle 1");
    			attr_dev(path1, "d", "M224.975,189.484h-46.14v-66.6c0.121-1.544.2-3.1,0.2-4.676a59.153,59.153,0,0,0-118.3-.4H60.649v71.673H14.368V119.435h0.148a105.409,105.409,0,0,1,210.817.716c0,2.808-.143,5.58-0.358,8.333v61Z");
    			add_location(path1, file$d, 15, 8, 730);
    			attr_dev(g0, "id", "latch");
    			add_location(g0, file$d, 13, 6, 370);

    			attr_dev(svg0, "class", svg0_class_value = "" + (null_to_empty(`lock-icon__lock-latch 
                ${/*isLatchUnlocked*/ ctx[4] && 'lock-icon__lock-latch--unlocked'}`) + " svelte-sdo5am"));

    			attr_dev(svg0, "width", "240");
    			attr_dev(svg0, "height", "206");
    			attr_dev(svg0, "viewBox", "0 0 240 206");
    			add_location(svg0, file$d, 6, 4, 173);
    			set_style(path2, "fill-rule", "evenodd");
    			set_style(path2, "fill", "#000");
    			set_style(path2, "opacity", ".25");
    			attr_dev(path2, "id", "Ellipse_1_copy_4");
    			attr_dev(path2, "data-name", "Ellipse 1 copy 4");
    			attr_dev(path2, "d", "M186.755,0.643c103.118,0,186.712,83.678,186.712,186.9s-83.594,186.9-186.712,186.9S0.043,290.766.043,187.544,83.637,0.643,186.755.643Z");
    			add_location(path2, file$d, 38, 8, 1579);

    			attr_dev(path3, "style", path3_style_value = "fill-rule:evenodd; " + (Array.isArray(/*bodyColor*/ ctx[2])
    			? `fill:url(#${'bodyGradient' + /*cardId*/ ctx[3]});`
    			: `fill:#${/*bodyColor*/ ctx[2]}`) + "");

    			attr_dev(path3, "id", "Ellipse_1_copy");
    			attr_dev(path3, "data-name", "Ellipse 1 copy");
    			attr_dev(path3, "d", "M186.757,15.414c94.968,0,171.954,77.064,171.954,172.128S281.725,359.67,186.757,359.67,14.8,282.606,14.8,187.542,91.789,15.414,186.757,15.414ZM210.986,187.6l12.88,72.887H149.59l12.888-72.914A43.51,43.51,0,1,1,210.986,187.6Z");
    			add_location(path3, file$d, 39, 8, 1835);
    			attr_dev(g1, "id", "body");
    			add_location(g1, file$d, 37, 6, 1557);
    			attr_dev(svg1, "class", "lock-icon__lock-body svelte-sdo5am");
    			attr_dev(svg1, "width", "374");
    			attr_dev(svg1, "height", "375");
    			attr_dev(svg1, "viewBox", "0 0 374 375");
    			add_location(svg1, file$d, 24, 4, 1103);

    			attr_dev(div0, "class", div0_class_value = "" + (null_to_empty(`lock-icon__in-wrap 
                ${!/*localIsLocked*/ ctx[5] && 'lock-icon__in-wrap--invisible'}`) + " svelte-sdo5am"));

    			add_location(div0, file$d, 3, 2, 61);

    			attr_dev(div1, "class", div1_class_value = "" + (null_to_empty(`lock-icon 
              ${/*mixClass*/ ctx[0]}`) + " svelte-sdo5am"));

    			add_location(div1, file$d, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, svg0);
    			append_dev(svg0, g0);
    			append_dev(g0, path0);
    			append_dev(g0, path1);
    			append_dev(div0, t1);
    			append_dev(div0, svg1);
    			if (if_block) if_block.m(svg1, null);
    			append_dev(svg1, g1);
    			append_dev(g1, path2);
    			append_dev(g1, path3);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*latchColor*/ 2) {
    				set_style(path1, "fill", '#' + /*latchColor*/ ctx[1]);
    			}

    			if (dirty & /*isLatchUnlocked*/ 16 && svg0_class_value !== (svg0_class_value = "" + (null_to_empty(`lock-icon__lock-latch 
                ${/*isLatchUnlocked*/ ctx[4] && 'lock-icon__lock-latch--unlocked'}`) + " svelte-sdo5am"))) {
    				attr_dev(svg0, "class", svg0_class_value);
    			}

    			if (dirty & /*bodyColor*/ 4) show_if = Array.isArray(/*bodyColor*/ ctx[2]);

    			if (show_if) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(svg1, g1);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*bodyColor, cardId*/ 12 && path3_style_value !== (path3_style_value = "fill-rule:evenodd; " + (Array.isArray(/*bodyColor*/ ctx[2])
    			? `fill:url(#${'bodyGradient' + /*cardId*/ ctx[3]});`
    			: `fill:#${/*bodyColor*/ ctx[2]}`) + "")) {
    				attr_dev(path3, "style", path3_style_value);
    			}

    			if (dirty & /*localIsLocked*/ 32 && div0_class_value !== (div0_class_value = "" + (null_to_empty(`lock-icon__in-wrap 
                ${!/*localIsLocked*/ ctx[5] && 'lock-icon__in-wrap--invisible'}`) + " svelte-sdo5am"))) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (dirty & /*mixClass*/ 1 && div1_class_value !== (div1_class_value = "" + (null_to_empty(`lock-icon 
              ${/*mixClass*/ ctx[0]}`) + " svelte-sdo5am"))) {
    				attr_dev(div1, "class", div1_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LockIcon', slots, []);
    	let { class: mixClass } = $$props;
    	let { isLocked = false } = $$props;
    	let { latchColor = '0f0' } = $$props;
    	let { bodyColor = '0f0' } = $$props;
    	let { cardId = null } = $$props;

    	// Data -----------------------------------------------------------------------
    	let isLatchUnlocked = false;

    	let isLockedOld = isLocked;

    	// Watch ----------------------------------------------------------------------
    	let localIsLocked = isLocked;

    	const writable_props = ['class', 'isLocked', 'latchColor', 'bodyColor', 'cardId'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LockIcon> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, mixClass = $$props.class);
    		if ('isLocked' in $$props) $$invalidate(6, isLocked = $$props.isLocked);
    		if ('latchColor' in $$props) $$invalidate(1, latchColor = $$props.latchColor);
    		if ('bodyColor' in $$props) $$invalidate(2, bodyColor = $$props.bodyColor);
    		if ('cardId' in $$props) $$invalidate(3, cardId = $$props.cardId);
    	};

    	$$self.$capture_state = () => ({
    		mixClass,
    		isLocked,
    		latchColor,
    		bodyColor,
    		cardId,
    		isLatchUnlocked,
    		isLockedOld,
    		localIsLocked
    	});

    	$$self.$inject_state = $$props => {
    		if ('mixClass' in $$props) $$invalidate(0, mixClass = $$props.mixClass);
    		if ('isLocked' in $$props) $$invalidate(6, isLocked = $$props.isLocked);
    		if ('latchColor' in $$props) $$invalidate(1, latchColor = $$props.latchColor);
    		if ('bodyColor' in $$props) $$invalidate(2, bodyColor = $$props.bodyColor);
    		if ('cardId' in $$props) $$invalidate(3, cardId = $$props.cardId);
    		if ('isLatchUnlocked' in $$props) $$invalidate(4, isLatchUnlocked = $$props.isLatchUnlocked);
    		if ('isLockedOld' in $$props) isLockedOld = $$props.isLockedOld;
    		if ('localIsLocked' in $$props) $$invalidate(5, localIsLocked = $$props.localIsLocked);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*isLocked*/ 64) {
    			{
    				if (!isLocked) {
    					setTimeout(() => $$invalidate(4, isLatchUnlocked = true), 200);
    					setTimeout(() => $$invalidate(5, localIsLocked = isLocked), 600);
    				}
    			}
    		}
    	};

    	return [
    		mixClass,
    		latchColor,
    		bodyColor,
    		cardId,
    		isLatchUnlocked,
    		localIsLocked,
    		isLocked
    	];
    }

    class LockIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {
    			class: 0,
    			isLocked: 6,
    			latchColor: 1,
    			bodyColor: 2,
    			cardId: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LockIcon",
    			options,
    			id: create_fragment$e.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mixClass*/ ctx[0] === undefined && !('class' in props)) {
    			console.warn("<LockIcon> was created without expected prop 'class'");
    		}
    	}

    	get class() {
    		throw new Error("<LockIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<LockIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isLocked() {
    		throw new Error("<LockIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isLocked(value) {
    		throw new Error("<LockIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get latchColor() {
    		throw new Error("<LockIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set latchColor(value) {
    		throw new Error("<LockIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bodyColor() {
    		throw new Error("<LockIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bodyColor(value) {
    		throw new Error("<LockIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get cardId() {
    		throw new Error("<LockIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cardId(value) {
    		throw new Error("<LockIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var lockIcon = "<svg width=\"350\" height=\"512\" viewBox=\"0 0 350 512\">\n  <path d=\"M175,511.918A174.558,174.558,0,0,1,.084,337.145c0-47.439,19.366-90.508,49.976-122.342V124.92C50.06,56.259,106.283.082,175,.082S299.94,56.259,299.94,124.92V214.8A174.762,174.762,0,0,1,175,511.918Zm-42.544-92.249c0,8.318,7.569,15.124,16.651,15.124h51.786c9.082,0,16.651-6.806,16.651-15.124l-17.568-90.747c12.109-8.319,20.435-21.931,20.435-37.811a45.411,45.411,0,0,0-90.822,0c0,15.88,8.326,30.249,20.435,37.811ZM237.47,124.92a62.47,62.47,0,0,0-124.94,0v48.687A173.293,173.293,0,0,1,175,162.371c21.865,0,43.1,4.37,62.47,11.236V124.92Z\"/>\n</svg>\n";

    /* src/components/ChapterCard/index.svelte generated by Svelte v3.43.0 */

    const { Object: Object_1 } = globals;
    const file$c = "src/components/ChapterCard/index.svelte";

    // (85:46) 
    function create_if_block_6(ctx) {
    	let img0;
    	let img0_src_value;
    	let t0;
    	let img1;
    	let img1_src_value;
    	let t1;
    	let img2;
    	let img2_src_value;

    	const block = {
    		c: function create() {
    			img0 = element("img");
    			t0 = space();
    			img1 = element("img");
    			t1 = space();
    			img2 = element("img");
    			attr_dev(img0, "class", "faces-icons__icon svelte-1tlx9mg");
    			if (!src_url_equal(img0.src, img0_src_value = "../images/characters/" + /*card*/ ctx[1]?.faceIcons[1])) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "face");
    			add_location(img0, file$c, 85, 8, 3774);
    			attr_dev(img1, "class", "faces-icons__icon faces-icons__icon--big faces-icons__icon--main svelte-1tlx9mg");
    			if (!src_url_equal(img1.src, img1_src_value = "../images/characters/" + /*card*/ ctx[1]?.faceIcons[0])) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "face");
    			add_location(img1, file$c, 90, 8, 3913);
    			attr_dev(img2, "class", "faces-icons__icon svelte-1tlx9mg");
    			if (!src_url_equal(img2.src, img2_src_value = "../images/characters/" + /*card*/ ctx[1]?.faceIcons[2])) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "face");
    			add_location(img2, file$c, 97, 8, 4136);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, img1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, img2, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*card*/ 2 && !src_url_equal(img0.src, img0_src_value = "../images/characters/" + /*card*/ ctx[1]?.faceIcons[1])) {
    				attr_dev(img0, "src", img0_src_value);
    			}

    			if (dirty[0] & /*card*/ 2 && !src_url_equal(img1.src, img1_src_value = "../images/characters/" + /*card*/ ctx[1]?.faceIcons[0])) {
    				attr_dev(img1, "src", img1_src_value);
    			}

    			if (dirty[0] & /*card*/ 2 && !src_url_equal(img2.src, img2_src_value = "../images/characters/" + /*card*/ ctx[1]?.faceIcons[2])) {
    				attr_dev(img2, "src", img2_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(img1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(img2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(85:46) ",
    		ctx
    	});

    	return block;
    }

    // (70:46) 
    function create_if_block_5(ctx) {
    	let img0;
    	let img0_src_value;
    	let t;
    	let img1;
    	let img1_src_value;

    	const block = {
    		c: function create() {
    			img0 = element("img");
    			t = space();
    			img1 = element("img");
    			attr_dev(img0, "class", "faces-icons__icon faces-icons__icon--one-of-the-two faces-icons__icon--big svelte-1tlx9mg");
    			if (!src_url_equal(img0.src, img0_src_value = "../images/characters/" + /*card*/ ctx[1]?.faceIcons[0])) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "face");
    			add_location(img0, file$c, 70, 8, 3261);
    			attr_dev(img1, "class", "faces-icons__icon faces-icons__icon--one-of-the-two faces-icons__icon--big svelte-1tlx9mg");
    			if (!src_url_equal(img1.src, img1_src_value = "../images/characters/" + /*card*/ ctx[1]?.faceIcons[1])) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "face");
    			add_location(img1, file$c, 77, 8, 3494);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img0, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, img1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*card*/ 2 && !src_url_equal(img0.src, img0_src_value = "../images/characters/" + /*card*/ ctx[1]?.faceIcons[0])) {
    				attr_dev(img0, "src", img0_src_value);
    			}

    			if (dirty[0] & /*card*/ 2 && !src_url_equal(img1.src, img1_src_value = "../images/characters/" + /*card*/ ctx[1]?.faceIcons[1])) {
    				attr_dev(img1, "src", img1_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img0);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(img1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(70:46) ",
    		ctx
    	});

    	return block;
    }

    // (62:4) {#if card?.faceIcons?.length === 1}
    function create_if_block_4(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "faces-icons__icon faces-icons__icon--big faces-icons__icon--main svelte-1tlx9mg");
    			if (!src_url_equal(img.src, img_src_value = "../images/characters/" + /*card*/ ctx[1]?.faceIcons[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "face");
    			add_location(img, file$c, 62, 8, 2991);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*card*/ 2 && !src_url_equal(img.src, img_src_value = "../images/characters/" + /*card*/ ctx[1]?.faceIcons[0])) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(62:4) {#if card?.faceIcons?.length === 1}",
    		ctx
    	});

    	return block;
    }

    // (107:2) {#if !isEmpty}
    function create_if_block$1(ctx) {
    	let div2;
    	let div0;
    	let arctext0;
    	let t0;
    	let arctext1;
    	let div0_class_value;
    	let t1;
    	let div1;
    	let arctext2;
    	let t2;
    	let arctext3;
    	let t3;
    	let svg;
    	let path0;
    	let path1;
    	let path2;
    	let div1_class_value;
    	let div2_class_value;
    	let t4;
    	let div3;
    	let arctext4;
    	let div3_class_value;
    	let t5;
    	let div4;
    	let t6;
    	let div4_class_value;
    	let t7;
    	let current_block_type_index;
    	let if_block2;
    	let if_block2_anchor;
    	let current;

    	arctext0 = new ArcText({
    			props: {
    				class: "chapter-number__arc-text \n                  chapter-number__arc-text--small",
    				debugMode: false,
    				roundness: "4.6",
    				fontSize: "1.8",
    				topShift: "-.8",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	arctext1 = new ArcText({
    			props: {
    				class: "chapter-number__arc-text \n                  chapter-number__arc-text--small\n                  chapter-number__arc-text--digit",
    				debugMode: false,
    				roundness: "4.6",
    				fontSize: "2.7",
    				topShift: "-.7",
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	arctext2 = new ArcText({
    			props: {
    				class: "chapter-number__arc-text",
    				debugMode: false,
    				roundness: "5",
    				fontSize: "1.8",
    				topShift: "-.8",
    				color: "#fff",
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	arctext3 = new ArcText({
    			props: {
    				class: "chapter-number__arc-text \n                  chapter-number__arc-text--digit",
    				debugMode: false,
    				roundness: "5",
    				fontSize: "2.7",
    				topShift: "-.7",
    				color: "#fff",
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	arctext4 = new ArcText({
    			props: {
    				class: "single-card__title-arc-text",
    				debugMode: false,
    				roundness: "3",
    				fontSize: "2.1",
    				topShift: "-3.7",
    				color: "#fefea3",
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block0 = /*isDescriptionShowed*/ ctx[9] && !/*isLocked*/ ctx[2] && create_if_block_3(ctx);
    	let if_block1 = (!/*isDescriptionShowed*/ ctx[9] || /*isLocked*/ ctx[2]) && create_if_block_2(ctx);
    	const if_block_creators = [create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*isBlurred*/ ctx[10]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			create_component(arctext0.$$.fragment);
    			t0 = space();
    			create_component(arctext1.$$.fragment);
    			t1 = space();
    			div1 = element("div");
    			create_component(arctext2.$$.fragment);
    			t2 = space();
    			create_component(arctext3.$$.fragment);
    			t3 = space();
    			svg = svg_element("svg");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			t4 = space();
    			div3 = element("div");
    			create_component(arctext4.$$.fragment);
    			t5 = space();
    			div4 = element("div");
    			if (if_block0) if_block0.c();
    			t6 = space();
    			if (if_block1) if_block1.c();
    			t7 = space();
    			if_block2.c();
    			if_block2_anchor = empty();

    			attr_dev(div0, "class", div0_class_value = "" + (null_to_empty(`chapter-number__small-label 
                      ${!/*isCardCloseToTheCenter*/ ctx[12] && 'chapter-number__small-label--visible'} `) + " svelte-1tlx9mg"));

    			add_location(div0, file$c, 110, 6, 4501);
    			set_style(path0, "fill-rule", "evenodd");
    			set_style(path0, "fill", '#' + /*card*/ ctx[1]?.stripeColors[0]);
    			attr_dev(path0, "id", "Layer_2_copy_2");
    			attr_dev(path0, "data-name", "Layer 2 copy 2");
    			attr_dev(path0, "d", "M0.35,283.9C65.209,263.127,479.706,163.973,624.158,143.2c0,0,40.79,368.294,40.787,368.282C375.945,543.486,96.9,625.4,96.9,625.4L219.573,406.71S0.374,283.9.35,283.9Zm2265.48,0c-64.86-20.771-479.36-119.925-623.81-140.694,0,0-40.79,368.294-40.78,368.282,289,32,568.04,113.914,568.04,113.914L2046.61,406.71S2265.81,283.9,2265.83,283.9Z");
    			add_location(path0, file$c, 162, 10, 6155);
    			set_style(path1, "fill-rule", "evenodd");
    			set_style(path1, "fill", '#' + /*card*/ ctx[1]?.stripeColors[1]);
    			attr_dev(path1, "id", "Layer_2_copy_3");
    			attr_dev(path1, "data-name", "Layer 2 copy 3");
    			attr_dev(path1, "d", "M218.5,102.326l78.373,345.433s232,31.174,368.356,64.251c-0.033-.033-41.636-361.908-41.636-361.908Zm1828.322,0-78.37,345.433s-232,31.174-368.36,64.251c0.03-.033,41.64-361.908,41.64-361.908Z");
    			add_location(path1, file$c, 163, 10, 6620);
    			set_style(path2, "fill-rule", "evenodd");
    			set_style(path2, "fill", '#' + /*card*/ ctx[1]?.stripeColors[0]);
    			attr_dev(path2, "d", "M1132.5-.158C1423.19-.107,1728.17,31.124,2047,101.679c0.02,0.008-77.99,346.28-78.07,346.233C1695.61,385.185,1410.97,356,1132.5,356.284c-278.477-.283-563.116,28.9-836.441,91.628-0.08.047-78.085-346.225-78.066-346.233C536.821,31.124,841.8-.107,1132.49-0.158h0.01Z");
    			add_location(path2, file$c, 164, 10, 6942);
    			attr_dev(svg, "class", "chapter-number__svg-stripe-background svelte-1tlx9mg");
    			attr_dev(svg, "width", "2266");
    			attr_dev(svg, "height", "625");
    			attr_dev(svg, "viewBox", "0 0 2266 625");
    			add_location(svg, file$c, 161, 8, 6044);

    			attr_dev(div1, "class", div1_class_value = "" + (null_to_empty(`chapter-number__big-label 
                      ${/*isCardCloseToTheCenter*/ ctx[12] && 'chapter-number__big-label--visible'}`) + " svelte-1tlx9mg"));

    			add_location(div1, file$c, 136, 6, 5310);

    			attr_dev(div2, "class", div2_class_value = "" + (null_to_empty(`chapter-number 
                    single-card__chapter-number 
                    ${/*isCardCloseToTheCenter*/ ctx[12] && 'single-card__chapter-number--bigger-bottom-margin'}`) + " svelte-1tlx9mg"));

    			add_location(div2, file$c, 107, 4, 4309);

    			attr_dev(div3, "class", div3_class_value = "" + (null_to_empty(`single-card__title
                    ${/*isCardCloseToTheCenter*/ ctx[12] && 'single-card__title--bigger-bottom-margin'}
                    ${/*isCardCloseToTheCenter*/ ctx[12] && 'single-card__title--bigger'}
                    ${/*isOnlyFaceNChapterVisible*/ ctx[8] && 'single-card__title--invisible'}`) + " svelte-1tlx9mg"));

    			add_location(div3, file$c, 171, 4, 7346);

    			attr_dev(div4, "class", div4_class_value = "" + (null_to_empty(`single-card__achiev-n-descript 
                  ${/*isOnlyFaceNChapterVisible*/ ctx[8] && 'single-card__achiev-n-descript--invisible'}`) + " svelte-1tlx9mg"));

    			add_location(div4, file$c, 189, 4, 7896);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			mount_component(arctext0, div0, null);
    			append_dev(div0, t0);
    			mount_component(arctext1, div0, null);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			mount_component(arctext2, div1, null);
    			append_dev(div1, t2);
    			mount_component(arctext3, div1, null);
    			append_dev(div1, t3);
    			append_dev(div1, svg);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			append_dev(svg, path2);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div3, anchor);
    			mount_component(arctext4, div3, null);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div4, anchor);
    			if (if_block0) if_block0.m(div4, null);
    			append_dev(div4, t6);
    			if (if_block1) if_block1.m(div4, null);
    			insert_dev(target, t7, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block2_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const arctext0_changes = {};

    			if (dirty[1] & /*$$scope*/ 1) {
    				arctext0_changes.$$scope = { dirty, ctx };
    			}

    			arctext0.$set(arctext0_changes);
    			const arctext1_changes = {};

    			if (dirty[0] & /*card*/ 2 | dirty[1] & /*$$scope*/ 1) {
    				arctext1_changes.$$scope = { dirty, ctx };
    			}

    			arctext1.$set(arctext1_changes);

    			if (!current || dirty[0] & /*isCardCloseToTheCenter*/ 4096 && div0_class_value !== (div0_class_value = "" + (null_to_empty(`chapter-number__small-label 
                      ${!/*isCardCloseToTheCenter*/ ctx[12] && 'chapter-number__small-label--visible'} `) + " svelte-1tlx9mg"))) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			const arctext2_changes = {};

    			if (dirty[1] & /*$$scope*/ 1) {
    				arctext2_changes.$$scope = { dirty, ctx };
    			}

    			arctext2.$set(arctext2_changes);
    			const arctext3_changes = {};

    			if (dirty[0] & /*card*/ 2 | dirty[1] & /*$$scope*/ 1) {
    				arctext3_changes.$$scope = { dirty, ctx };
    			}

    			arctext3.$set(arctext3_changes);

    			if (!current || dirty[0] & /*card*/ 2) {
    				set_style(path0, "fill", '#' + /*card*/ ctx[1]?.stripeColors[0]);
    			}

    			if (!current || dirty[0] & /*card*/ 2) {
    				set_style(path1, "fill", '#' + /*card*/ ctx[1]?.stripeColors[1]);
    			}

    			if (!current || dirty[0] & /*card*/ 2) {
    				set_style(path2, "fill", '#' + /*card*/ ctx[1]?.stripeColors[0]);
    			}

    			if (!current || dirty[0] & /*isCardCloseToTheCenter*/ 4096 && div1_class_value !== (div1_class_value = "" + (null_to_empty(`chapter-number__big-label 
                      ${/*isCardCloseToTheCenter*/ ctx[12] && 'chapter-number__big-label--visible'}`) + " svelte-1tlx9mg"))) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if (!current || dirty[0] & /*isCardCloseToTheCenter*/ 4096 && div2_class_value !== (div2_class_value = "" + (null_to_empty(`chapter-number 
                    single-card__chapter-number 
                    ${/*isCardCloseToTheCenter*/ ctx[12] && 'single-card__chapter-number--bigger-bottom-margin'}`) + " svelte-1tlx9mg"))) {
    				attr_dev(div2, "class", div2_class_value);
    			}

    			const arctext4_changes = {};

    			if (dirty[0] & /*card*/ 2 | dirty[1] & /*$$scope*/ 1) {
    				arctext4_changes.$$scope = { dirty, ctx };
    			}

    			arctext4.$set(arctext4_changes);

    			if (!current || dirty[0] & /*isCardCloseToTheCenter, isOnlyFaceNChapterVisible*/ 4352 && div3_class_value !== (div3_class_value = "" + (null_to_empty(`single-card__title
                    ${/*isCardCloseToTheCenter*/ ctx[12] && 'single-card__title--bigger-bottom-margin'}
                    ${/*isCardCloseToTheCenter*/ ctx[12] && 'single-card__title--bigger'}
                    ${/*isOnlyFaceNChapterVisible*/ ctx[8] && 'single-card__title--invisible'}`) + " svelte-1tlx9mg"))) {
    				attr_dev(div3, "class", div3_class_value);
    			}

    			if (/*isDescriptionShowed*/ ctx[9] && !/*isLocked*/ ctx[2]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*isDescriptionShowed, isLocked*/ 516) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_3(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div4, t6);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (!/*isDescriptionShowed*/ ctx[9] || /*isLocked*/ ctx[2]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*isDescriptionShowed, isLocked*/ 516) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_2(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div4, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty[0] & /*isOnlyFaceNChapterVisible*/ 256 && div4_class_value !== (div4_class_value = "" + (null_to_empty(`single-card__achiev-n-descript 
                  ${/*isOnlyFaceNChapterVisible*/ ctx[8] && 'single-card__achiev-n-descript--invisible'}`) + " svelte-1tlx9mg"))) {
    				attr_dev(div4, "class", div4_class_value);
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block2 = if_blocks[current_block_type_index];

    				if (!if_block2) {
    					if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block2.c();
    				} else {
    					if_block2.p(ctx, dirty);
    				}

    				transition_in(if_block2, 1);
    				if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(arctext0.$$.fragment, local);
    			transition_in(arctext1.$$.fragment, local);
    			transition_in(arctext2.$$.fragment, local);
    			transition_in(arctext3.$$.fragment, local);
    			transition_in(arctext4.$$.fragment, local);
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(arctext0.$$.fragment, local);
    			transition_out(arctext1.$$.fragment, local);
    			transition_out(arctext2.$$.fragment, local);
    			transition_out(arctext3.$$.fragment, local);
    			transition_out(arctext4.$$.fragment, local);
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(arctext0);
    			destroy_component(arctext1);
    			destroy_component(arctext2);
    			destroy_component(arctext3);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div3);
    			destroy_component(arctext4);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div4);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (detaching) detach_dev(t7);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block2_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(107:2) {#if !isEmpty}",
    		ctx
    	});

    	return block;
    }

    // (113:8) <ArcText           class="chapter-number__arc-text                    chapter-number__arc-text--small"           debugMode={false}           roundness="4.6"           fontSize="1.8"           topShift="-.8"         >
    function create_default_slot_4(ctx) {
    	let t0;
    	let t1_value = generateNbspString(5) + "";
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text("Chapter");
    			t1 = text(t1_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(113:8) <ArcText           class=\\\"chapter-number__arc-text                    chapter-number__arc-text--small\\\"           debugMode={false}           roundness=\\\"4.6\\\"           fontSize=\\\"1.8\\\"           topShift=\\\"-.8\\\"         >",
    		ctx
    	});

    	return block;
    }

    // (124:8) <ArcText           class="chapter-number__arc-text                    chapter-number__arc-text--small                   chapter-number__arc-text--digit"           debugMode={false}           roundness="4.6"           fontSize="2.7"           topShift="-.7"         >
    function create_default_slot_3$1(ctx) {
    	let t_value = generateNbspString(13) + /*card*/ ctx[1].chapterNum + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*card*/ 2 && t_value !== (t_value = generateNbspString(13) + /*card*/ ctx[1].chapterNum + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(124:8) <ArcText           class=\\\"chapter-number__arc-text                    chapter-number__arc-text--small                   chapter-number__arc-text--digit\\\"           debugMode={false}           roundness=\\\"4.6\\\"           fontSize=\\\"2.7\\\"           topShift=\\\"-.7\\\"         >",
    		ctx
    	});

    	return block;
    }

    // (139:8) <ArcText           class="chapter-number__arc-text"           debugMode={false}           roundness="5"           fontSize="1.8"           topShift="-.8"           color="#fff"         >
    function create_default_slot_2$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Chapter     ");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(139:8) <ArcText           class=\\\"chapter-number__arc-text\\\"           debugMode={false}           roundness=\\\"5\\\"           fontSize=\\\"1.8\\\"           topShift=\\\"-.8\\\"           color=\\\"#fff\\\"         >",
    		ctx
    	});

    	return block;
    }

    // (150:8) <ArcText           class="chapter-number__arc-text                    chapter-number__arc-text--digit"           debugMode={false}           roundness="5"           fontSize="2.7"           topShift="-.7"           color="#fff"         >
    function create_default_slot_1$2(ctx) {
    	let t_value = generateNbspString(13) + /*card*/ ctx[1]?.chapterNum + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*card*/ 2 && t_value !== (t_value = generateNbspString(13) + /*card*/ ctx[1]?.chapterNum + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(150:8) <ArcText           class=\\\"chapter-number__arc-text                    chapter-number__arc-text--digit\\\"           debugMode={false}           roundness=\\\"5\\\"           fontSize=\\\"2.7\\\"           topShift=\\\"-.7\\\"           color=\\\"#fff\\\"         >",
    		ctx
    	});

    	return block;
    }

    // (176:6) <ArcText         class="single-card__title-arc-text"         debugMode={false}         roundness="3"         fontSize="2.1"         topShift="-3.7"         color="#fefea3"       >
    function create_default_slot$2(ctx) {
    	let t_value = /*card*/ ctx[1]?.title + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*card*/ 2 && t_value !== (t_value = /*card*/ ctx[1]?.title + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(176:6) <ArcText         class=\\\"single-card__title-arc-text\\\"         debugMode={false}         roundness=\\\"3\\\"         fontSize=\\\"2.1\\\"         topShift=\\\"-3.7\\\"         color=\\\"#fefea3\\\"       >",
    		ctx
    	});

    	return block;
    }

    // (193:6) {#if isDescriptionShowed && !isLocked}
    function create_if_block_3(ctx) {
    	let div;
    	let leveldescription;
    	let div_transition;
    	let current;

    	leveldescription = new LevelDescription({
    			props: {
    				class: `single-card__level-description 
                      ${/*isLocked*/ ctx[2] && 'single-card__level-description--darkened'}`,
    				text: /*card*/ ctx[1]?.description
    			},
    			$$inline: true
    		});

    	leveldescription.$on("scrollEnd", /*handleScrollEnd*/ ctx[14]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(leveldescription.$$.fragment);
    			attr_dev(div, "class", "single-card__level-description-wrapper svelte-1tlx9mg");
    			add_location(div, file$c, 193, 8, 8100);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(leveldescription, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const leveldescription_changes = {};

    			if (dirty[0] & /*isLocked*/ 4) leveldescription_changes.class = `single-card__level-description 
                      ${/*isLocked*/ ctx[2] && 'single-card__level-description--darkened'}`;

    			if (dirty[0] & /*card*/ 2) leveldescription_changes.text = /*card*/ ctx[1]?.description;
    			leveldescription.$set(leveldescription_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(leveldescription.$$.fragment, local);

    			add_render_callback(() => {
    				if (!div_transition) div_transition = create_bidirectional_transition(div, fade, {}, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(leveldescription.$$.fragment, local);
    			if (!div_transition) div_transition = create_bidirectional_transition(div, fade, {}, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(leveldescription);
    			if (detaching && div_transition) div_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(193:6) {#if isDescriptionShowed && !isLocked}",
    		ctx
    	});

    	return block;
    }

    // (207:6) {#if !isDescriptionShowed || isLocked}
    function create_if_block_2(ctx) {
    	let chapterachievements;
    	let current;

    	chapterachievements = new ChapterAchievements({
    			props: {
    				class: `single-card__achievements 
                    ${/*isBlurred*/ ctx[10] && 'single-card__achievements--blurred'} 
                    ${/*isBlurred*/ ctx[10] && 'single-card__achievements--40-percent-transparent'} `,
    				chapterDetails: /*card*/ ctx[1],
    				isReducedVersion: !/*isCardCloseToTheCenter*/ ctx[12]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(chapterachievements.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(chapterachievements, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const chapterachievements_changes = {};

    			if (dirty[0] & /*isBlurred*/ 1024) chapterachievements_changes.class = `single-card__achievements 
                    ${/*isBlurred*/ ctx[10] && 'single-card__achievements--blurred'} 
                    ${/*isBlurred*/ ctx[10] && 'single-card__achievements--40-percent-transparent'} `;

    			if (dirty[0] & /*card*/ 2) chapterachievements_changes.chapterDetails = /*card*/ ctx[1];
    			if (dirty[0] & /*isCardCloseToTheCenter*/ 4096) chapterachievements_changes.isReducedVersion = !/*isCardCloseToTheCenter*/ ctx[12];
    			chapterachievements.$set(chapterachievements_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(chapterachievements.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(chapterachievements.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(chapterachievements, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(207:6) {#if !isDescriptionShowed || isLocked}",
    		ctx
    	});

    	return block;
    }

    // (234:6) {:else}
    function create_else_block(ctx) {
    	let buttonincircle;
    	let current;

    	buttonincircle = new ButtonInCircle({
    			props: {
    				class: `single-card__action-button 
                  ${/*isCardCloseToTheCenter*/ ctx[12] && !/*isOnlyFaceNChapterVisible*/ ctx[8] && 'single-card__action-button--visible'}
                  single-card__action-button--with-animation`,
    				iconName: "arrowRight",
    				backwardsGradient: true,
    				prominent: true,
    				isThickBorder: true
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(buttonincircle.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(buttonincircle, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const buttonincircle_changes = {};

    			if (dirty[0] & /*isCardCloseToTheCenter, isOnlyFaceNChapterVisible*/ 4352) buttonincircle_changes.class = `single-card__action-button 
                  ${/*isCardCloseToTheCenter*/ ctx[12] && !/*isOnlyFaceNChapterVisible*/ ctx[8] && 'single-card__action-button--visible'}
                  single-card__action-button--with-animation`;

    			buttonincircle.$set(buttonincircle_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(buttonincircle.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(buttonincircle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(buttonincircle, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(234:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (220:4) {#if isBlurred}
    function create_if_block_1(ctx) {
    	let buttonincircle;
    	let current;

    	buttonincircle = new ButtonInCircle({
    			props: {
    				class: `single-card__action-button 
                  ${/*isCardCloseToTheCenter*/ ctx[12] && !/*isOnlyFaceNChapterVisible*/ ctx[8] && 'single-card__action-button--visible'}`,
    				iconName: "gift",
    				backwardsGradient: true,
    				prominent: true,
    				text: (/*card*/ ctx[1]?.isUnlockable) ? 'Unlock' : 'LOCKED',
    				textInCircle: "3",
    				isTextOnTop: true,
    				isTextArc: true,
    				isThickBorder: true
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(buttonincircle.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(buttonincircle, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const buttonincircle_changes = {};

    			if (dirty[0] & /*isCardCloseToTheCenter, isOnlyFaceNChapterVisible*/ 4352) buttonincircle_changes.class = `single-card__action-button 
                  ${/*isCardCloseToTheCenter*/ ctx[12] && !/*isOnlyFaceNChapterVisible*/ ctx[8] && 'single-card__action-button--visible'}`;

    			if (dirty[0] & /*card*/ 2) buttonincircle_changes.text = (/*card*/ ctx[1]?.isUnlockable) ? 'Unlock' : 'LOCKED';
    			buttonincircle.$set(buttonincircle_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(buttonincircle.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(buttonincircle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(buttonincircle, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(220:4) {#if isBlurred}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let t0;
    	let div3;
    	let div2;
    	let div0;
    	let progressbar;
    	let div0_class_value;
    	let t1;
    	let lockicon;
    	let t2;
    	let div1;
    	let div1_class_value;
    	let t3;
    	let div2_class_value;
    	let div3_class_value;
    	let current;

    	progressbar = new ProgressBar({
    			props: {
    				class: "single-card__progress-bar",
    				type: ['single', 'double', 'triple'][/*card*/ ctx[1]?.progressBarNames?.length - 1],
    				progress: /*card*/ ctx[1]?.progress,
    				titles: /*card*/ ctx[1]?.progressBarNames
    			},
    			$$inline: true
    		});

    	lockicon = new LockIcon({
    			props: {
    				class: `single-card__lock-icon-overlay 
              ${/*isCardCloseToTheCenter*/ ctx[12] && 'single-card__lock-icon-overlay--smaller-top-indent'}
              ${/*isCardCloseToTheCenter*/ ctx[12] && 'single-card__lock-icon-overlay--bigger'}`,
    				isLocked: /*isLocked*/ ctx[2],
    				latchColor: /*card*/ ctx[1]?.lockLatchColor,
    				bodyColor: /*card*/ ctx[1]?.lockBodyColor,
    				cardId: /*card*/ ctx[1]?.id
    			},
    			$$inline: true
    		});

    	function select_block_type(ctx, dirty) {
    		if (/*card*/ ctx[1]?.faceIcons?.length === 1) return create_if_block_4;
    		if (/*card*/ ctx[1]?.faceIcons?.length === 2) return create_if_block_5;
    		if (/*card*/ ctx[1]?.faceIcons?.length === 3) return create_if_block_6;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type && current_block_type(ctx);
    	let if_block1 = !/*isEmpty*/ ctx[3] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			t0 = space();
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			create_component(progressbar.$$.fragment);
    			t1 = space();
    			create_component(lockicon.$$.fragment);
    			t2 = space();
    			div1 = element("div");
    			if (if_block0) if_block0.c();
    			t3 = space();
    			if (if_block1) if_block1.c();

    			attr_dev(div0, "class", div0_class_value = "" + (null_to_empty(`single-card__progress-bar-wrapper 
              ${(/*isBlurred*/ ctx[10] || /*isOnlyFaceNChapterVisible*/ ctx[8]) && 'single-card__progress-bar-wrapper--invisible'}`) + " svelte-1tlx9mg"));

    			set_style(div0, "opacity", 1 - (Math.abs(/*positionCoeff*/ ctx[4]) > .6
    			? 1
    			: Math.abs(/*positionCoeff*/ ctx[4]) * 3));

    			add_location(div0, file$c, 18, 2, 1050);

    			attr_dev(div1, "class", div1_class_value = "" + (null_to_empty(`faces-icons
                  ${/*isCardCloseToTheCenter*/ ctx[12] && 'faces-icons--bigger'}
                  ${/*isBlurred*/ ctx[10] && 'faces-icons--40-percent-transparent'}
                  ${/*isBlurred*/ ctx[10] && 'faces-icons--blurred'}
                  single-card__faces-icons`) + " svelte-1tlx9mg"));

    			add_location(div1, file$c, 55, 2, 2665);

    			attr_dev(div2, "class", div2_class_value = "" + (null_to_empty(`single-card__in-wrap 
              ${/*flipAnimationStep*/ ctx[11] === 1 && 'single-card__in-wrap--flip-animation-step1'} 
              ${/*flipAnimationStep*/ ctx[11] === 2 && 'single-card__in-wrap--flip-animation-step2'} 
              ${/*flipAnimationStep*/ ctx[11] === 3 && 'single-card__in-wrap--flip-animation-step3'} 
              ${/*flipAnimationStep*/ ctx[11] === 4 && 'single-card__in-wrap--flip-animation-step4'} 
              ${/*isCardCloseToTheCenter*/ ctx[12] && 'single-card__in-wrap--no-top-padding'} 
              ${/*isLeftPlaceholder*/ ctx[5] && 'single-card__in-wrap--left-placeholder'} 
              ${/*isRightPlaceholder*/ ctx[6] && 'single-card__in-wrap--right-placeholder'} 
              ${/*isOnlyFaceNChapterVisible*/ ctx[8] && 'single-card__in-wrap--transparent-bg'}`) + " svelte-1tlx9mg"));

    			add_location(div2, file$c, 8, 0, 315);

    			attr_dev(div3, "class", div3_class_value = "" + (null_to_empty(`single-card 
            ${/*isCardInFocus*/ ctx[13] && 'single-card--wide'}
            ${/*isClicked*/ ctx[7] && 'single-card--active-clicked'} 
            ${/*mixClass*/ ctx[0]}`) + " svelte-1tlx9mg"));

    			set_style(div3, "height", /*isCardInFocus*/ ctx[13] ? '26.4rem' : '21.6rem');

    			set_style(div3, "left", /*isCardInFocus*/ ctx[13]
    			? 0
    			: (/*positionCoeff*/ ctx[4] > 0 ? 1.96 : -1.96) + 'rem');

    			add_location(div3, file$c, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			mount_component(progressbar, div0, null);
    			append_dev(div2, t1);
    			mount_component(lockicon, div2, null);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			if (if_block0) if_block0.m(div1, null);
    			append_dev(div2, t3);
    			if (if_block1) if_block1.m(div2, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const progressbar_changes = {};
    			if (dirty[0] & /*card*/ 2) progressbar_changes.type = ['single', 'double', 'triple'][/*card*/ ctx[1]?.progressBarNames?.length - 1];
    			if (dirty[0] & /*card*/ 2) progressbar_changes.progress = /*card*/ ctx[1]?.progress;
    			if (dirty[0] & /*card*/ 2) progressbar_changes.titles = /*card*/ ctx[1]?.progressBarNames;
    			progressbar.$set(progressbar_changes);

    			if (!current || dirty[0] & /*isBlurred, isOnlyFaceNChapterVisible*/ 1280 && div0_class_value !== (div0_class_value = "" + (null_to_empty(`single-card__progress-bar-wrapper 
              ${(/*isBlurred*/ ctx[10] || /*isOnlyFaceNChapterVisible*/ ctx[8]) && 'single-card__progress-bar-wrapper--invisible'}`) + " svelte-1tlx9mg"))) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (!current || dirty[0] & /*positionCoeff*/ 16) {
    				set_style(div0, "opacity", 1 - (Math.abs(/*positionCoeff*/ ctx[4]) > .6
    				? 1
    				: Math.abs(/*positionCoeff*/ ctx[4]) * 3));
    			}

    			const lockicon_changes = {};

    			if (dirty[0] & /*isCardCloseToTheCenter*/ 4096) lockicon_changes.class = `single-card__lock-icon-overlay 
              ${/*isCardCloseToTheCenter*/ ctx[12] && 'single-card__lock-icon-overlay--smaller-top-indent'}
              ${/*isCardCloseToTheCenter*/ ctx[12] && 'single-card__lock-icon-overlay--bigger'}`;

    			if (dirty[0] & /*isLocked*/ 4) lockicon_changes.isLocked = /*isLocked*/ ctx[2];
    			if (dirty[0] & /*card*/ 2) lockicon_changes.latchColor = /*card*/ ctx[1]?.lockLatchColor;
    			if (dirty[0] & /*card*/ 2) lockicon_changes.bodyColor = /*card*/ ctx[1]?.lockBodyColor;
    			if (dirty[0] & /*card*/ 2) lockicon_changes.cardId = /*card*/ ctx[1]?.id;
    			lockicon.$set(lockicon_changes);

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if (if_block0) if_block0.d(1);
    				if_block0 = current_block_type && current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div1, null);
    				}
    			}

    			if (!current || dirty[0] & /*isCardCloseToTheCenter, isBlurred*/ 5120 && div1_class_value !== (div1_class_value = "" + (null_to_empty(`faces-icons
                  ${/*isCardCloseToTheCenter*/ ctx[12] && 'faces-icons--bigger'}
                  ${/*isBlurred*/ ctx[10] && 'faces-icons--40-percent-transparent'}
                  ${/*isBlurred*/ ctx[10] && 'faces-icons--blurred'}
                  single-card__faces-icons`) + " svelte-1tlx9mg"))) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if (!/*isEmpty*/ ctx[3]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*isEmpty*/ 8) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div2, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty[0] & /*flipAnimationStep, isCardCloseToTheCenter, isLeftPlaceholder, isRightPlaceholder, isOnlyFaceNChapterVisible*/ 6496 && div2_class_value !== (div2_class_value = "" + (null_to_empty(`single-card__in-wrap 
              ${/*flipAnimationStep*/ ctx[11] === 1 && 'single-card__in-wrap--flip-animation-step1'} 
              ${/*flipAnimationStep*/ ctx[11] === 2 && 'single-card__in-wrap--flip-animation-step2'} 
              ${/*flipAnimationStep*/ ctx[11] === 3 && 'single-card__in-wrap--flip-animation-step3'} 
              ${/*flipAnimationStep*/ ctx[11] === 4 && 'single-card__in-wrap--flip-animation-step4'} 
              ${/*isCardCloseToTheCenter*/ ctx[12] && 'single-card__in-wrap--no-top-padding'} 
              ${/*isLeftPlaceholder*/ ctx[5] && 'single-card__in-wrap--left-placeholder'} 
              ${/*isRightPlaceholder*/ ctx[6] && 'single-card__in-wrap--right-placeholder'} 
              ${/*isOnlyFaceNChapterVisible*/ ctx[8] && 'single-card__in-wrap--transparent-bg'}`) + " svelte-1tlx9mg"))) {
    				attr_dev(div2, "class", div2_class_value);
    			}

    			if (!current || dirty[0] & /*isCardInFocus, isClicked, mixClass*/ 8321 && div3_class_value !== (div3_class_value = "" + (null_to_empty(`single-card 
            ${/*isCardInFocus*/ ctx[13] && 'single-card--wide'}
            ${/*isClicked*/ ctx[7] && 'single-card--active-clicked'} 
            ${/*mixClass*/ ctx[0]}`) + " svelte-1tlx9mg"))) {
    				attr_dev(div3, "class", div3_class_value);
    			}

    			if (!current || dirty[0] & /*isCardInFocus*/ 8192) {
    				set_style(div3, "height", /*isCardInFocus*/ ctx[13] ? '26.4rem' : '21.6rem');
    			}

    			if (!current || dirty[0] & /*isCardInFocus, positionCoeff*/ 8208) {
    				set_style(div3, "left", /*isCardInFocus*/ ctx[13]
    				? 0
    				: (/*positionCoeff*/ ctx[4] > 0 ? 1.96 : -1.96) + 'rem');
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(progressbar.$$.fragment, local);
    			transition_in(lockicon.$$.fragment, local);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(progressbar.$$.fragment, local);
    			transition_out(lockicon.$$.fragment, local);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div3);
    			destroy_component(progressbar);
    			destroy_component(lockicon);

    			if (if_block0) {
    				if_block0.d();
    			}

    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function generateNbspString(numberOfChars = 1) {
    	return Array.from(Array(numberOfChars).keys()).fill(String.fromCharCode(160)).join('');
    }

    function calculateNewHeight(coeff) {
    	const newHeight = 27 * (coeff < 1 ? 1.23 - coeff / 4.35 : 1);
    	return Math.round(newHeight * 10) / 10;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let positionCoeffAbs;
    	let isCardInFocus;
    	let isCardCloseToTheCenter;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChapterCard', slots, []);
    	let { class: mixClass } = $$props;
    	let { card = {} } = $$props;
    	let { isLocked = false } = $$props;
    	let { isEmpty = false } = $$props;
    	let { positionCoeff } = $$props;
    	let { isLeftPlaceholder = false } = $$props;
    	let { isRightPlaceholder = false } = $$props;
    	let { isClicked = false } = $$props;
    	let { isOnlyFaceNChapterVisible = false } = $$props;

    	// Data -----------------------------------------------------------------------
    	let heightFromPositionCoeff = 0;

    	let leftShift = 0;
    	let isListNotYetScrolled = true;
    	let isDescriptionShowed = false;
    	let showDescriptionTimeout;
    	let isDescriptionForciblyHidden = false;
    	let isLockIconShaking = false;
    	let lockShakingTimeout;
    	let isBlurred = isLocked;
    	let flipAnimationStep = 0;

    	// Lifecycle hooks ------------------------------------------------------------
    	onMount(() => {
    		document.addEventListener('click', clearNHideDescriptionTimeout);
    	});

    	onDestroy(() => {
    		document.removeEventListener('click', clearNHideDescriptionTimeout);
    	});

    	// Methods --------------------------------------------------------------------
    	function fireConfetti() {
    		const count = 200;
    		const defaults = { origin: { y: .7 } };

    		function fire(particleRatio, opts) {
    			confetti__default["default"](Object.assign({}, defaults, opts, {
    				particleCount: Math.floor(count * particleRatio)
    			}));
    		}

    		fire(.25, {
    			spread: 13,
    			startVelocity: 55,
    			scalar: .8,
    			colors: ['#ffffff', '#dddd66', '#666666']
    		});

    		fire(.2, {
    			spread: 30,
    			scalar: .6,
    			colors: ['#ffffff', '#dddd66', '#666666']
    		});

    		fire(.35, {
    			spread: 50,
    			decay: .91,
    			scalar: .8,
    			colors: ['#ffffff', '#dddd66', '#666666']
    		});

    		fire(.1, {
    			spread: 60,
    			startVelocity: 25,
    			decay: .92,
    			scalar: 1,
    			colors: ['#ffffff', '#dddd66', '#666666']
    		});

    		fire(.1, {
    			spread: 60,
    			startVelocity: 45,
    			scalar: .9,
    			colors: ['#ffffff', '#dddd66', '#666666']
    		});
    	}

    	function handleScrollEnd() {
    		$$invalidate(9, isDescriptionShowed = false);

    		if (!isDescriptionForciblyHidden && positionCoeff === 0) {
    			setDescriptionTimeout();
    		}
    	}

    	function showDescription() {
    		$$invalidate(9, isDescriptionShowed = true);
    	}

    	function hideDescription() {
    		$$invalidate(9, isDescriptionShowed = false);
    	}

    	function setDescriptionTimeout() {
    		showDescriptionTimeout = setTimeout(showDescription, 5200);
    	}

    	function clearDescriptionTimeout() {
    		clearTimeout(showDescriptionTimeout);
    		showDescriptionTimeout = null;
    	}

    	function clearNHideDescriptionTimeout() {
    		isDescriptionForciblyHidden = true;
    		hideDescription();
    		clearDescriptionTimeout();
    	}

    	function removeDescriptionForcibleHiding() {
    		isDescriptionForciblyHidden = false;
    	}

    	let isLockedOld = isLocked;

    	const writable_props = [
    		'class',
    		'card',
    		'isLocked',
    		'isEmpty',
    		'positionCoeff',
    		'isLeftPlaceholder',
    		'isRightPlaceholder',
    		'isClicked',
    		'isOnlyFaceNChapterVisible'
    	];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChapterCard> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, mixClass = $$props.class);
    		if ('card' in $$props) $$invalidate(1, card = $$props.card);
    		if ('isLocked' in $$props) $$invalidate(2, isLocked = $$props.isLocked);
    		if ('isEmpty' in $$props) $$invalidate(3, isEmpty = $$props.isEmpty);
    		if ('positionCoeff' in $$props) $$invalidate(4, positionCoeff = $$props.positionCoeff);
    		if ('isLeftPlaceholder' in $$props) $$invalidate(5, isLeftPlaceholder = $$props.isLeftPlaceholder);
    		if ('isRightPlaceholder' in $$props) $$invalidate(6, isRightPlaceholder = $$props.isRightPlaceholder);
    		if ('isClicked' in $$props) $$invalidate(7, isClicked = $$props.isClicked);
    		if ('isOnlyFaceNChapterVisible' in $$props) $$invalidate(8, isOnlyFaceNChapterVisible = $$props.isOnlyFaceNChapterVisible);
    	};

    	$$self.$capture_state = () => ({
    		mixClass,
    		onMount,
    		onDestroy,
    		fade,
    		slide,
    		scale,
    		fly,
    		confetti: confetti__default["default"],
    		card,
    		isLocked,
    		isEmpty,
    		positionCoeff,
    		isLeftPlaceholder,
    		isRightPlaceholder,
    		isClicked,
    		isOnlyFaceNChapterVisible,
    		ArcText,
    		ButtonInCircle,
    		ChapterAchievements,
    		Icon,
    		ProgressBar,
    		LevelDescription,
    		LockIcon,
    		heightFromPositionCoeff,
    		leftShift,
    		isListNotYetScrolled,
    		isDescriptionShowed,
    		showDescriptionTimeout,
    		isDescriptionForciblyHidden,
    		isLockIconShaking,
    		lockShakingTimeout,
    		isBlurred,
    		flipAnimationStep,
    		starIcon,
    		giftBoxIcon,
    		lockIcon,
    		fireConfetti,
    		handleScrollEnd,
    		showDescription,
    		hideDescription,
    		setDescriptionTimeout,
    		clearDescriptionTimeout,
    		clearNHideDescriptionTimeout,
    		removeDescriptionForcibleHiding,
    		generateNbspString,
    		calculateNewHeight,
    		isLockedOld,
    		positionCoeffAbs,
    		isCardCloseToTheCenter,
    		isCardInFocus
    	});

    	$$self.$inject_state = $$props => {
    		if ('mixClass' in $$props) $$invalidate(0, mixClass = $$props.mixClass);
    		if ('card' in $$props) $$invalidate(1, card = $$props.card);
    		if ('isLocked' in $$props) $$invalidate(2, isLocked = $$props.isLocked);
    		if ('isEmpty' in $$props) $$invalidate(3, isEmpty = $$props.isEmpty);
    		if ('positionCoeff' in $$props) $$invalidate(4, positionCoeff = $$props.positionCoeff);
    		if ('isLeftPlaceholder' in $$props) $$invalidate(5, isLeftPlaceholder = $$props.isLeftPlaceholder);
    		if ('isRightPlaceholder' in $$props) $$invalidate(6, isRightPlaceholder = $$props.isRightPlaceholder);
    		if ('isClicked' in $$props) $$invalidate(7, isClicked = $$props.isClicked);
    		if ('isOnlyFaceNChapterVisible' in $$props) $$invalidate(8, isOnlyFaceNChapterVisible = $$props.isOnlyFaceNChapterVisible);
    		if ('heightFromPositionCoeff' in $$props) heightFromPositionCoeff = $$props.heightFromPositionCoeff;
    		if ('leftShift' in $$props) leftShift = $$props.leftShift;
    		if ('isListNotYetScrolled' in $$props) isListNotYetScrolled = $$props.isListNotYetScrolled;
    		if ('isDescriptionShowed' in $$props) $$invalidate(9, isDescriptionShowed = $$props.isDescriptionShowed);
    		if ('showDescriptionTimeout' in $$props) showDescriptionTimeout = $$props.showDescriptionTimeout;
    		if ('isDescriptionForciblyHidden' in $$props) isDescriptionForciblyHidden = $$props.isDescriptionForciblyHidden;
    		if ('isLockIconShaking' in $$props) $$invalidate(15, isLockIconShaking = $$props.isLockIconShaking);
    		if ('lockShakingTimeout' in $$props) lockShakingTimeout = $$props.lockShakingTimeout;
    		if ('isBlurred' in $$props) $$invalidate(10, isBlurred = $$props.isBlurred);
    		if ('flipAnimationStep' in $$props) $$invalidate(11, flipAnimationStep = $$props.flipAnimationStep);
    		if ('isLockedOld' in $$props) $$invalidate(16, isLockedOld = $$props.isLockedOld);
    		if ('positionCoeffAbs' in $$props) $$invalidate(17, positionCoeffAbs = $$props.positionCoeffAbs);
    		if ('isCardCloseToTheCenter' in $$props) $$invalidate(12, isCardCloseToTheCenter = $$props.isCardCloseToTheCenter);
    		if ('isCardInFocus' in $$props) $$invalidate(13, isCardInFocus = $$props.isCardInFocus);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*positionCoeff*/ 16) {
    			// Computed -------------------------------------------------------------------
    			$$invalidate(17, positionCoeffAbs = Math.abs(positionCoeff)); // Absolute value of the position coefficient
    		}

    		if ($$self.$$.dirty[0] & /*positionCoeffAbs*/ 131072) {
    			heightFromPositionCoeff = calculateNewHeight(positionCoeffAbs);
    		}

    		if ($$self.$$.dirty[0] & /*positionCoeffAbs*/ 131072) {
    			$$invalidate(13, isCardInFocus = positionCoeffAbs <= .5);
    		}

    		if ($$self.$$.dirty[0] & /*positionCoeffAbs*/ 131072) {
    			$$invalidate(12, isCardCloseToTheCenter = positionCoeffAbs <= .25);
    		}

    		if ($$self.$$.dirty[0] & /*positionCoeff*/ 16) {
    			// Watch ----------------------------------------------------------------------
    			{
    				if (positionCoeff === 0) {
    					clearDescriptionTimeout();
    					setDescriptionTimeout();
    				} else {
    					removeDescriptionForcibleHiding();
    					clearDescriptionTimeout();
    					hideDescription();
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*isClicked, isLockIconShaking*/ 32896) {
    			{
    				if (isClicked && !isLockIconShaking) {
    					$$invalidate(15, isLockIconShaking = true);
    					lockShakingTimeout = setTimeout(() => $$invalidate(15, isLockIconShaking = false), 900);
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*isLockedOld, isLocked*/ 65540) {
    			{
    				if (isLockedOld === true && isLocked === false) {
    					setTimeout(() => fireConfetti(), 600);
    					setTimeout(() => $$invalidate(10, isBlurred = false), 1100);
    					setTimeout(() => $$invalidate(11, flipAnimationStep = 1), 500);
    					setTimeout(() => $$invalidate(11, flipAnimationStep = 2), 650);
    					setTimeout(() => $$invalidate(11, flipAnimationStep = 3), 800);
    					setTimeout(() => $$invalidate(11, flipAnimationStep = 4), 950);
    				}

    				$$invalidate(16, isLockedOld = isLocked);
    			}
    		}
    	};

    	return [
    		mixClass,
    		card,
    		isLocked,
    		isEmpty,
    		positionCoeff,
    		isLeftPlaceholder,
    		isRightPlaceholder,
    		isClicked,
    		isOnlyFaceNChapterVisible,
    		isDescriptionShowed,
    		isBlurred,
    		flipAnimationStep,
    		isCardCloseToTheCenter,
    		isCardInFocus,
    		handleScrollEnd,
    		isLockIconShaking,
    		isLockedOld,
    		positionCoeffAbs
    	];
    }

    class ChapterCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$d,
    			create_fragment$d,
    			safe_not_equal,
    			{
    				class: 0,
    				card: 1,
    				isLocked: 2,
    				isEmpty: 3,
    				positionCoeff: 4,
    				isLeftPlaceholder: 5,
    				isRightPlaceholder: 6,
    				isClicked: 7,
    				isOnlyFaceNChapterVisible: 8
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChapterCard",
    			options,
    			id: create_fragment$d.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mixClass*/ ctx[0] === undefined && !('class' in props)) {
    			console.warn("<ChapterCard> was created without expected prop 'class'");
    		}

    		if (/*positionCoeff*/ ctx[4] === undefined && !('positionCoeff' in props)) {
    			console.warn("<ChapterCard> was created without expected prop 'positionCoeff'");
    		}
    	}

    	get class() {
    		throw new Error("<ChapterCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<ChapterCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get card() {
    		throw new Error("<ChapterCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set card(value) {
    		throw new Error("<ChapterCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isLocked() {
    		throw new Error("<ChapterCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isLocked(value) {
    		throw new Error("<ChapterCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isEmpty() {
    		throw new Error("<ChapterCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isEmpty(value) {
    		throw new Error("<ChapterCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get positionCoeff() {
    		throw new Error("<ChapterCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set positionCoeff(value) {
    		throw new Error("<ChapterCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isLeftPlaceholder() {
    		throw new Error("<ChapterCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isLeftPlaceholder(value) {
    		throw new Error("<ChapterCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isRightPlaceholder() {
    		throw new Error("<ChapterCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isRightPlaceholder(value) {
    		throw new Error("<ChapterCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isClicked() {
    		throw new Error("<ChapterCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isClicked(value) {
    		throw new Error("<ChapterCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isOnlyFaceNChapterVisible() {
    		throw new Error("<ChapterCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isOnlyFaceNChapterVisible(value) {
    		throw new Error("<ChapterCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const chaptersList = writable([
      { id: 120211008_153001, title: 'The Matchmaker',
        mainIcon: 'hand-gesture.png',
        challengeNameWords: ['Tutorial'],
        faceIcons: ['____char01_tyto.png'],
        chapterNum: 1,
        progress: 10,
        progressBarNames: ['Tyto'],
        isLocked: true,
        isUnlockable: true,
        description: 'The words of Alphazoid Prime are vanishing! Can you help?',
        stripeColors: ['a78f5b', '8e7942'],
        lockLatchColor: 'cdb7c6',
        lockBodyColor: ['f6f2ec','cda29d']
      },
      { id: 220211008_153017, title: 'All That Glitters',
        mainIcon: 'magic.png',
        challengeNameWords: ['Stardust','Power'],
        faceIcons: ['____char02_barabell.png', '____char03_jaleen.png'],
        chapterNum: 2,
        progress: 64,
        progressBarNames: ['Barabell','Jaleen'],
        isLocked: true,
        isUnlockable: true,
        description: 'What is the strange object seen flying through Alphazoid Prime?',
        stripeColors: ['73b3b2', '4f8784'],
        lockLatchColor: 'b8b0eb',
        lockBodyColor: ['dfe9f2','9e85c8']
      },
      { id: 320211008_153019, title: 'Breaking the Code',
        mainIcon: 'radar.png',
        challengeNameWords: ['Radar','Power'],
        faceIcons: ['____char04_hemdar.png', '____char05_sindert.png', '____char06_tasha.png'],
        chapterNum: 3,
        progress: 32,
        progressBarNames: ['Sindert','Hemdar','Tasha'],
        isLocked: false,
        isUnlockable: false,
        description: 'Is the probe’s message encoded? Or does the problem run deeper?',
        stripeColors: ['91b47a', '688954'],
        lockLatchColor: 'b7bce1',
        lockBodyColor: ['dbe3d7','a69084']
      },
      { id: 420211008_153149, title: 'The Mix-Up',
        mainIcon: 'diagonal-arrows_.png',
        challengeNameWords: ['Shuffle','Power'],
        faceIcons: ['____char07_glooper.png','____char08_murka.png'],
        chapterNum: 4,
        progress: 93,
        progressBarNames: ['Glooper','Murka'],
        isLocked: false,
        isUnlockable: false,
        description: 'How can an artist and a baker possibly help save the galaxy?',
        stripeColors: ['9f70b6', '744b87'],
        lockLatchColor: 'c3b0d7',
        lockBodyColor: ['e7d5d4','839cb3']
      },
      { id: 520211008_153400, title: 'Lightning Strikes',
        mainIcon: 'lightning.png',
        challengeNameWords: ['Zap','Power'],
        faceIcons: ['____char09_thorsaren.png', '____char10_rejka.png', '____char11_gillim.png'],
        chapterNum: 5,
        progress: 56,
        progressBarNames: ['Rejka','Thorsaren','Gillim'],
        isLocked: false,
        isUnlockable: false,
        description: 'The Lexiborgs disappeared eons ago… Where could they be now?',
        stripeColors: ['a89e60', '7b743e'],
        lockLatchColor: 'd6b5a3',
        lockBodyColor: ['e5e0d5','a77a98']
      },
      { id: 60211008_153404, title: 'Reaching Out',
        mainIcon: 'magic.png',
        challengeNameWords: ['Tentacles','Power'],
        faceIcons: ['____char12_vasta.png', '____char13_gege.png', '____char14_jozi.png'],
        chapterNum: 6,
        progress: 12,
        progressBarNames: ['Gege','Vasta','Jozi'],
        isLocked: false,
        isUnlockable: false,
        description: 'The Glyphians want to destroy Alphazoid Prime! Can’t we talk this out?',
        stripeColors: ['9aa15d', '70783d'],
        lockLatchColor: 'acc297',
        lockBodyColor: ['e2e3d5','889291']
      },
      { id: 70211008_153407, title: 'Rainbow Legacy',
        mainIcon: 'crystals.png',
        challengeNameWords: ['Crystal','Power'],
        faceIcons: ['____char15_astra.png'],
        chapterNum: 7,
        progress: 42,
        progressBarNames: ['Astra'],
        isLocked: true,
        isUnlockable: true,
        description: 'Can you harvest enough energy before it’s too late?',
        stripeColors: ['97378e', '701e68'],
        lockLatchColor: '979797',
        lockBodyColor: ['cdd2e2','be94bf']
      }
    ]);

    const selectedChapterId = writable(null);

    const transitionFrom = writable('');
    const transitionTo = writable('');

    function dispatchIosEvent(eventDescription) {
      console.log(eventDescription);

      if (window.webkit != null) {
        window.webkit.messageHandlers.menu.postMessage(msg);
      }
      //window.webkit.messageHandlers.menu.postMessage(msg);
    }

    /* src/components/CardsCarousel.svelte generated by Svelte v3.43.0 */
    const file$b = "src/components/CardsCarousel.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[43] = list[i];
    	child_ctx[45] = i;
    	return child_ctx;
    }

    // (28:6) {#each $chaptersList as card,index (card.id)}
    function create_each_block$2(key_1, ctx) {
    	let li;
    	let div;
    	let chaptercard;
    	let div_class_value;
    	let current;

    	chaptercard = new ChapterCard({
    			props: {
    				class: "cards-revolver__single-card",
    				card: /*card*/ ctx[43],
    				isLocked: /*card*/ ctx[43].isLocked,
    				isClicked: /*isClickOnCenterCardActive*/ ctx[5] && /*activeCardId*/ ctx[2] === /*card*/ ctx[43].id,
    				positionCoeff: /*cardsPositionCoefficients*/ ctx[4][/*index*/ ctx[45]],
    				isOnlyFaceNChapterVisible: /*$transitionTo*/ ctx[8] === 'Chapter' && /*activeCardId*/ ctx[2] === /*card*/ ctx[43].id
    			},
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			li = element("li");
    			div = element("div");
    			create_component(chaptercard.$$.fragment);

    			attr_dev(div, "class", div_class_value = "" + (null_to_empty(`cards-revolver__card-container-inner 
                        ${/*isCardsOnTopOutsideViewport*/ ctx[1] && 'cards-revolver__card-container-inner--on-top-outside-viewport'}`) + " svelte-10adfpr"));

    			add_location(div, file$b, 32, 10, 1184);
    			attr_dev(li, "class", "cards-revolver__card-container svelte-10adfpr");
    			set_style(li, "transform", `rotate(${Math.round(/*index*/ ctx[45] * 12.95 * 100) / 100}deg)`);
    			add_location(li, file$b, 28, 8, 1025);
    			this.first = li;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, div);
    			mount_component(chaptercard, div, null);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const chaptercard_changes = {};
    			if (dirty[0] & /*$chaptersList*/ 8) chaptercard_changes.card = /*card*/ ctx[43];
    			if (dirty[0] & /*$chaptersList*/ 8) chaptercard_changes.isLocked = /*card*/ ctx[43].isLocked;
    			if (dirty[0] & /*isClickOnCenterCardActive, activeCardId, $chaptersList*/ 44) chaptercard_changes.isClicked = /*isClickOnCenterCardActive*/ ctx[5] && /*activeCardId*/ ctx[2] === /*card*/ ctx[43].id;
    			if (dirty[0] & /*cardsPositionCoefficients, $chaptersList*/ 24) chaptercard_changes.positionCoeff = /*cardsPositionCoefficients*/ ctx[4][/*index*/ ctx[45]];
    			if (dirty[0] & /*$transitionTo, activeCardId, $chaptersList*/ 268) chaptercard_changes.isOnlyFaceNChapterVisible = /*$transitionTo*/ ctx[8] === 'Chapter' && /*activeCardId*/ ctx[2] === /*card*/ ctx[43].id;
    			chaptercard.$set(chaptercard_changes);

    			if (!current || dirty[0] & /*isCardsOnTopOutsideViewport*/ 2 && div_class_value !== (div_class_value = "" + (null_to_empty(`cards-revolver__card-container-inner 
                        ${/*isCardsOnTopOutsideViewport*/ ctx[1] && 'cards-revolver__card-container-inner--on-top-outside-viewport'}`) + " svelte-10adfpr"))) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty[0] & /*$chaptersList*/ 8) {
    				set_style(li, "transform", `rotate(${Math.round(/*index*/ ctx[45] * 12.95 * 100) / 100}deg)`);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(chaptercard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(chaptercard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_component(chaptercard);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(28:6) {#each $chaptersList as card,index (card.id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let t0;
    	let section;
    	let div2;
    	let ul;
    	let li0;
    	let div0;
    	let chaptercard0;
    	let div0_class_value;
    	let t1;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t2;
    	let li1;
    	let div1;
    	let chaptercard1;
    	let div1_class_value;
    	let t3;
    	let div6;
    	let div3;
    	let t4;
    	let div4;
    	let t5;
    	let div5;
    	let t6;
    	let div7;
    	let section_class_value;
    	let current;
    	let mounted;
    	let dispose;

    	chaptercard0 = new ChapterCard({
    			props: {
    				class: "cards-revolver__single-card",
    				isEmpty: true,
    				isLeftPlaceholder: true,
    				positionCoeff: /*cardsPositionCoefficients*/ ctx[4][0] - 1
    			},
    			$$inline: true
    		});

    	let each_value = /*$chaptersList*/ ctx[3];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*card*/ ctx[43].id;
    	validate_each_keys(ctx, each_value, get_each_context$2, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$2(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
    	}

    	chaptercard1 = new ChapterCard({
    			props: {
    				class: "cards-revolver__single-card",
    				isEmpty: true,
    				isRightPlaceholder: true,
    				positionCoeff: /*cardsPositionCoefficients*/ ctx[4][/*cardsPositionCoefficients*/ ctx[4].length - 1] + 1
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t0 = space();
    			section = element("section");
    			div2 = element("div");
    			ul = element("ul");
    			li0 = element("li");
    			div0 = element("div");
    			create_component(chaptercard0.$$.fragment);
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			li1 = element("li");
    			div1 = element("div");
    			create_component(chaptercard1.$$.fragment);
    			t3 = space();
    			div6 = element("div");
    			div3 = element("div");
    			t4 = space();
    			div4 = element("div");
    			t5 = space();
    			div5 = element("div");
    			t6 = space();
    			div7 = element("div");

    			attr_dev(div0, "class", div0_class_value = "" + (null_to_empty(`cards-revolver__card-container-inner 
                      ${/*isCardsOnTopOutsideViewport*/ ctx[1] && 'cards-revolver__card-container-inner--on-top-outside-viewport'}`) + " svelte-10adfpr"));

    			add_location(div0, file$b, 15, 8, 505);
    			attr_dev(li0, "class", "cards-revolver__card-container svelte-10adfpr");
    			set_style(li0, "transform", `rotate(${Math.round(-1 * 12.95 * 100) / 100}deg)`);
    			add_location(li0, file$b, 11, 6, 358);

    			attr_dev(div1, "class", div1_class_value = "" + (null_to_empty(`cards-revolver__card-container-inner 
                      ${/*isCardsOnTopOutsideViewport*/ ctx[1] && 'cards-revolver__card-container-inner--on-top-outside-viewport'}`) + " svelte-10adfpr"));

    			add_location(div1, file$b, 51, 8, 2019);
    			attr_dev(li1, "class", "cards-revolver__card-container svelte-10adfpr");
    			set_style(li1, "transform", `rotate(${Math.round(/*$chaptersList*/ ctx[3].length * 12.95 * 100) / 100}deg)`);
    			add_location(li1, file$b, 47, 6, 1852);
    			attr_dev(ul, "class", "cards-revolver__cards-containers-list svelte-10adfpr");
    			add_location(ul, file$b, 9, 4, 294);

    			attr_dev(div2, "class", "" + (null_to_empty(`cards-revolver 
              cards-carousel__cards-revolver`) + " svelte-10adfpr"));

    			set_style(div2, "transform", `rotate(${Math.round(-/*revolverPosition*/ ctx[6] / 16.99 * 100) / 100}deg) translateZ(0)`);
    			add_location(div2, file$b, 4, 2, 99);
    			attr_dev(div3, "class", "touch-registering-area__clickable-area touch-registering-area__clickable-area--left svelte-10adfpr");
    			add_location(div3, file$b, 74, 4, 2773);
    			attr_dev(div4, "class", "touch-registering-area__clickable-area touch-registering-area__clickable-area--center svelte-10adfpr");
    			add_location(div4, file$b, 79, 4, 2961);
    			attr_dev(div5, "class", "touch-registering-area__clickable-area touch-registering-area__clickable-area--right svelte-10adfpr");
    			add_location(div5, file$b, 84, 4, 3153);
    			attr_dev(div6, "class", "touch-registering-area cards-carousel__touch-registering-area svelte-10adfpr");
    			add_location(div6, file$b, 67, 2, 2567);
    			attr_dev(div7, "class", "cards-carousel__single-card-placeholder svelte-10adfpr");
    			add_location(div7, file$b, 93, 2, 3458);

    			attr_dev(section, "class", section_class_value = "" + (null_to_empty(`cards-carousel
                  ${/*mixClass*/ ctx[0]}`) + " svelte-10adfpr"));

    			add_location(section, file$b, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div2);
    			append_dev(div2, ul);
    			append_dev(ul, li0);
    			append_dev(li0, div0);
    			mount_component(chaptercard0, div0, null);
    			append_dev(ul, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			append_dev(ul, t2);
    			append_dev(ul, li1);
    			append_dev(li1, div1);
    			mount_component(chaptercard1, div1, null);
    			append_dev(section, t3);
    			append_dev(section, div6);
    			append_dev(div6, div3);
    			append_dev(div6, t4);
    			append_dev(div6, div4);
    			append_dev(div6, t5);
    			append_dev(div6, div5);
    			append_dev(section, t6);
    			append_dev(section, div7);
    			/*div7_binding*/ ctx[20](div7);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div3, "click", /*click_handler*/ ctx[17], false, false, false),
    					listen_dev(div4, "click", /*click_handler_1*/ ctx[18], false, false, false),
    					listen_dev(div5, "click", /*click_handler_2*/ ctx[19], false, false, false),
    					listen_dev(div6, "touchstart", /*handleTouchStart*/ ctx[10], false, false, false),
    					listen_dev(div6, "touchend", /*handleTouchEnd*/ ctx[11], false, false, false),
    					listen_dev(div6, "touchmove", /*handleTouchMove*/ ctx[12], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const chaptercard0_changes = {};
    			if (dirty[0] & /*cardsPositionCoefficients*/ 16) chaptercard0_changes.positionCoeff = /*cardsPositionCoefficients*/ ctx[4][0] - 1;
    			chaptercard0.$set(chaptercard0_changes);

    			if (!current || dirty[0] & /*isCardsOnTopOutsideViewport*/ 2 && div0_class_value !== (div0_class_value = "" + (null_to_empty(`cards-revolver__card-container-inner 
                      ${/*isCardsOnTopOutsideViewport*/ ctx[1] && 'cards-revolver__card-container-inner--on-top-outside-viewport'}`) + " svelte-10adfpr"))) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (dirty[0] & /*$chaptersList, isCardsOnTopOutsideViewport, isClickOnCenterCardActive, activeCardId, cardsPositionCoefficients, $transitionTo*/ 318) {
    				each_value = /*$chaptersList*/ ctx[3];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$2, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, ul, outro_and_destroy_block, create_each_block$2, t2, get_each_context$2);
    				check_outros();
    			}

    			const chaptercard1_changes = {};
    			if (dirty[0] & /*cardsPositionCoefficients*/ 16) chaptercard1_changes.positionCoeff = /*cardsPositionCoefficients*/ ctx[4][/*cardsPositionCoefficients*/ ctx[4].length - 1] + 1;
    			chaptercard1.$set(chaptercard1_changes);

    			if (!current || dirty[0] & /*isCardsOnTopOutsideViewport*/ 2 && div1_class_value !== (div1_class_value = "" + (null_to_empty(`cards-revolver__card-container-inner 
                      ${/*isCardsOnTopOutsideViewport*/ ctx[1] && 'cards-revolver__card-container-inner--on-top-outside-viewport'}`) + " svelte-10adfpr"))) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if (!current || dirty[0] & /*$chaptersList*/ 8) {
    				set_style(li1, "transform", `rotate(${Math.round(/*$chaptersList*/ ctx[3].length * 12.95 * 100) / 100}deg)`);
    			}

    			if (!current || dirty[0] & /*revolverPosition*/ 64) {
    				set_style(div2, "transform", `rotate(${Math.round(-/*revolverPosition*/ ctx[6] / 16.99 * 100) / 100}deg) translateZ(0)`);
    			}

    			if (!current || dirty[0] & /*mixClass*/ 1 && section_class_value !== (section_class_value = "" + (null_to_empty(`cards-carousel
                  ${/*mixClass*/ ctx[0]}`) + " svelte-10adfpr"))) {
    				attr_dev(section, "class", section_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(chaptercard0.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(chaptercard1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(chaptercard0.$$.fragment, local);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(chaptercard1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);
    			destroy_component(chaptercard0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			destroy_component(chaptercard1);
    			/*div7_binding*/ ctx[20](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let activeCardId;
    	let activeCardIndex;
    	let $chaptersList;
    	let $selectedChapterId;
    	let $transitionTo;
    	validate_store(chaptersList, 'chaptersList');
    	component_subscribe($$self, chaptersList, $$value => $$invalidate(3, $chaptersList = $$value));
    	validate_store(selectedChapterId, 'selectedChapterId');
    	component_subscribe($$self, selectedChapterId, $$value => $$invalidate(32, $selectedChapterId = $$value));
    	validate_store(transitionTo, 'transitionTo');
    	component_subscribe($$self, transitionTo, $$value => $$invalidate(8, $transitionTo = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CardsCarousel', slots, []);
    	let { class: mixClass } = $$props;
    	const dispatch = createEventDispatcher();
    	let { isCardsOnTopOutsideViewport = false } = $$props;
    	let { isScrollingBlocked = false } = $$props;

    	// Data -----------------------------------------------------------------------
    	let isMounted = false;

    	let scrollPosition = 0;
    	let scrollPositionPercentage = 0;
    	let maxScrollPosition = 0;
    	let isTouchMoveInProgress = false;
    	let touchHorizontalDistance = null;
    	let touchHorizontalStartPoint = null;
    	let cardWidth = 0;
    	let listSnapTimeout;
    	let cardsPositionCoefficients = $chaptersList.map((item, index) => index);

    	// in which diapason card can be considered as active
    	let cardsActivityDiapasons;

    	let isClickOnCenterCardActive = false;
    	let lastTouchEventTimestamp = 0;

    	// Computed -------------------------------------------------------------------
    	let revolverPosition;

    	let throttleTimeStamp = Date.now();

    	// Refs (pointers to DOM elements) --------------------------------------------
    	let refCardPlaceholder;

    	// Lifecycle hooks ------------------------------------------------------------
    	onMount(() => {
    		isMounted = true;

    		// Sometimes for unknown reason refCardPlaceholder.clientWidth 
    		// returns random values (668 or 442 instead of 220)
    		// and requestAnimationFrame fixes this problem
    		requestAnimationFrame(() => {
    			$$invalidate(15, cardWidth = refCardPlaceholder.clientWidth);
    			maxScrollPosition = cardWidth * ($chaptersList.length - 1) + 110;
    			setCardsActivityDiapasons();

    			if ($selectedChapterId) {
    				scrollListToExactCard($selectedChapterId);
    			}
    		});
    	});

    	onDestroy(() => {
    		isMounted = false;
    	});

    	// Methods --------------------------------------------------------------------
    	function scrollListToExactCard(cardId) {
    		const cardIndex = $chaptersList.findIndex(item => item.id === cardId);
    		$$invalidate(14, scrollPosition = cardIndex * cardWidth);
    		handleScroll();
    		setCardsPositionCoefficients();
    	}

    	function handleCardClick() {
    		dispatchIosEvent({ 'tapped': 'OWJSMsgPlayClickSound' });

    		dispatchIosEvent({
    			'tapped': 'OWJSMsgChapterSelect',
    			value: $chaptersList.find(chapter => chapter.id === activeCardId).chapterNum
    		});

    		$$invalidate(5, isClickOnCenterCardActive = true);
    		setTimeout(() => $$invalidate(5, isClickOnCenterCardActive = false), 200);
    		dispatch('cardClick', { activeCardId });
    	}

    	let throttleTimeStamp2 = Date.now();

    	function handleCarouselClick(areaSide) {
    		if (isScrollingBlocked) return;

    		if (Date.now() - throttleTimeStamp2 < 200) {
    			return;
    		}

    		throttleTimeStamp2 = Date.now();
    		const isActiveCardFirst = activeCardIndex === 0;
    		const isActiveCardLast = activeCardIndex === $chaptersList.length - 1;

    		if (areaSide === 'left' && !isActiveCardFirst) {
    			$$invalidate(14, scrollPosition -= cardWidth);
    			handleScroll();
    		} else if (areaSide === 'right' && !isActiveCardLast) {
    			$$invalidate(14, scrollPosition += cardWidth);
    			handleScroll();
    		} else if (areaSide === 'center') {
    			handleCardClick();
    		}

    		lastTouchEventTimestamp = Date.now();
    	}

    	function setCardsActivityDiapasons() {
    		cardsActivityDiapasons = $chaptersList.map((item, index) => {
    			const min = cardWidth * index - cardWidth / 2;
    			const max = cardWidth * index + cardWidth / 2;
    			return [min, max];
    		});
    	}

    	function findClosestPosition(position) {
    		const allPositions = $chaptersList.map((item, index) => {
    			return index * cardWidth;
    		});

    		allPositions.sort((a, b) => {
    			return Math.abs(position - a) - Math.abs(position - b);
    		});

    		return allPositions[0];
    	}

    	function handleTouchStart(event) {
    		if (isScrollingBlocked) return;
    		isTouchMoveInProgress = true;
    		touchHorizontalStartPoint = Math.round(event.changedTouches[0].pageX);
    	}

    	function handleTouchEnd(event) {
    		if (isScrollingBlocked) return;
    		isTouchMoveInProgress = false;
    		touchHorizontalStartPoint = null;
    	}

    	function handleTouchMove(event) {
    		if (isScrollingBlocked) return;

    		if (!isTouchMoveInProgress) {
    			return;
    		}

    		touchHorizontalDistance = Math.round(touchHorizontalStartPoint) - Math.round(event.changedTouches[0].pageX);
    		let newScrollPosition = scrollPosition + Math.round(touchHorizontalDistance / 1.15 * 10) / 10;
    		if (newScrollPosition < -30) newScrollPosition = 0;
    		if (newScrollPosition > maxScrollPosition) newScrollPosition = maxScrollPosition;
    		$$invalidate(14, scrollPosition = Math.round(newScrollPosition));
    		touchHorizontalStartPoint = Math.round(event.changedTouches[0].pageX);
    		handleScroll();
    		setCardsPositionCoefficients();
    		lastTouchEventTimestamp = Date.now();
    	}

    	function calcCardPositionCoeff(cardIndex) {
    		// how much of the scroll width single card covers (in %)
    		const cardWidthPercent = Math.round(100 / ($chaptersList.length + 2) * 100) / 100;

    		let cardPositionCoeff = -(scrollPositionPercentage - cardIndex * cardWidthPercent) / cardWidthPercent;
    		return Math.round(cardPositionCoeff * 100) / 100;
    	}

    	function setCardsPositionCoefficients() {
    		$$invalidate(4, cardsPositionCoefficients = $chaptersList.map((item, index) => {
    			return calcCardPositionCoeff(index);
    		}));
    	}

    	function handleScroll() {
    		const localScrollPositionPercentage = revolverPosition / cardWidth * (100 / ($chaptersList.length + 2));
    		scrollPositionPercentage = Math.round(localScrollPositionPercentage * 100) / 100;
    		setListSnapTimeout();
    		setCardsPositionCoefficients();
    	}

    	function setListSnapTimeout() {
    		clearTimeout(listSnapTimeout);
    		listSnapTimeout = setTimeout(snapList, 60);
    	}

    	function snapList() {
    		if (lastTouchEventTimestamp > 0 && Date.now() - lastTouchEventTimestamp > 1000) {
    			return;
    		}

    		// console.log(111);
    		// return;
    		if (scrollPosition % cardWidth < (cardWidth + 10) / 2) {
    			$$invalidate(14, scrollPosition = Math.floor(scrollPosition / cardWidth) * cardWidth);
    			$$invalidate(6, revolverPosition = findClosestPosition(scrollPosition));

    			if (isMounted) {
    				handleScroll();
    			}
    		}

    		if (scrollPosition % cardWidth > (cardWidth + 10) / 2) {
    			$$invalidate(14, scrollPosition = Math.ceil(scrollPosition / cardWidth) * cardWidth);
    			$$invalidate(6, revolverPosition = findClosestPosition(scrollPosition));

    			if (isMounted) {
    				handleScroll();
    			}
    		}
    	}

    	const writable_props = ['class', 'isCardsOnTopOutsideViewport', 'isScrollingBlocked'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CardsCarousel> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => handleCarouselClick('left');
    	const click_handler_1 = () => handleCarouselClick('center');
    	const click_handler_2 = () => handleCarouselClick('right');

    	function div7_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			refCardPlaceholder = $$value;
    			$$invalidate(7, refCardPlaceholder);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, mixClass = $$props.class);
    		if ('isCardsOnTopOutsideViewport' in $$props) $$invalidate(1, isCardsOnTopOutsideViewport = $$props.isCardsOnTopOutsideViewport);
    		if ('isScrollingBlocked' in $$props) $$invalidate(13, isScrollingBlocked = $$props.isScrollingBlocked);
    	};

    	$$self.$capture_state = () => ({
    		mixClass,
    		onMount,
    		onDestroy,
    		createEventDispatcher,
    		dispatch,
    		isCardsOnTopOutsideViewport,
    		isScrollingBlocked,
    		ChapterCard,
    		isMounted,
    		scrollPosition,
    		scrollPositionPercentage,
    		maxScrollPosition,
    		isTouchMoveInProgress,
    		touchHorizontalDistance,
    		touchHorizontalStartPoint,
    		cardWidth,
    		listSnapTimeout,
    		cardsPositionCoefficients,
    		cardsActivityDiapasons,
    		isClickOnCenterCardActive,
    		lastTouchEventTimestamp,
    		chaptersList,
    		selectedChapterId,
    		transitionFrom,
    		transitionTo,
    		dispatchIosEvent,
    		revolverPosition,
    		throttleTimeStamp,
    		refCardPlaceholder,
    		scrollListToExactCard,
    		handleCardClick,
    		throttleTimeStamp2,
    		handleCarouselClick,
    		setCardsActivityDiapasons,
    		findClosestPosition,
    		handleTouchStart,
    		handleTouchEnd,
    		handleTouchMove,
    		calcCardPositionCoeff,
    		setCardsPositionCoefficients,
    		handleScroll,
    		setListSnapTimeout,
    		snapList,
    		activeCardIndex,
    		activeCardId,
    		$chaptersList,
    		$selectedChapterId,
    		$transitionTo
    	});

    	$$self.$inject_state = $$props => {
    		if ('mixClass' in $$props) $$invalidate(0, mixClass = $$props.mixClass);
    		if ('isCardsOnTopOutsideViewport' in $$props) $$invalidate(1, isCardsOnTopOutsideViewport = $$props.isCardsOnTopOutsideViewport);
    		if ('isScrollingBlocked' in $$props) $$invalidate(13, isScrollingBlocked = $$props.isScrollingBlocked);
    		if ('isMounted' in $$props) isMounted = $$props.isMounted;
    		if ('scrollPosition' in $$props) $$invalidate(14, scrollPosition = $$props.scrollPosition);
    		if ('scrollPositionPercentage' in $$props) scrollPositionPercentage = $$props.scrollPositionPercentage;
    		if ('maxScrollPosition' in $$props) maxScrollPosition = $$props.maxScrollPosition;
    		if ('isTouchMoveInProgress' in $$props) isTouchMoveInProgress = $$props.isTouchMoveInProgress;
    		if ('touchHorizontalDistance' in $$props) touchHorizontalDistance = $$props.touchHorizontalDistance;
    		if ('touchHorizontalStartPoint' in $$props) touchHorizontalStartPoint = $$props.touchHorizontalStartPoint;
    		if ('cardWidth' in $$props) $$invalidate(15, cardWidth = $$props.cardWidth);
    		if ('listSnapTimeout' in $$props) listSnapTimeout = $$props.listSnapTimeout;
    		if ('cardsPositionCoefficients' in $$props) $$invalidate(4, cardsPositionCoefficients = $$props.cardsPositionCoefficients);
    		if ('cardsActivityDiapasons' in $$props) cardsActivityDiapasons = $$props.cardsActivityDiapasons;
    		if ('isClickOnCenterCardActive' in $$props) $$invalidate(5, isClickOnCenterCardActive = $$props.isClickOnCenterCardActive);
    		if ('lastTouchEventTimestamp' in $$props) lastTouchEventTimestamp = $$props.lastTouchEventTimestamp;
    		if ('revolverPosition' in $$props) $$invalidate(6, revolverPosition = $$props.revolverPosition);
    		if ('throttleTimeStamp' in $$props) $$invalidate(16, throttleTimeStamp = $$props.throttleTimeStamp);
    		if ('refCardPlaceholder' in $$props) $$invalidate(7, refCardPlaceholder = $$props.refCardPlaceholder);
    		if ('throttleTimeStamp2' in $$props) throttleTimeStamp2 = $$props.throttleTimeStamp2;
    		if ('activeCardIndex' in $$props) activeCardIndex = $$props.activeCardIndex;
    		if ('activeCardId' in $$props) $$invalidate(2, activeCardId = $$props.activeCardId);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*throttleTimeStamp, scrollPosition*/ 81920) {
    			{
    				if (Date.now() - throttleTimeStamp > 125) {
    					$$invalidate(16, throttleTimeStamp = Date.now());
    					const delta = Math.round((scrollPosition - findClosestPosition(scrollPosition)) * 10) / 10;
    					$$invalidate(6, revolverPosition = findClosestPosition(scrollPosition) + delta / 1.9);
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*$chaptersList, scrollPosition, cardWidth*/ 49160) {
    			$$invalidate(2, activeCardId = $chaptersList[Math.round(scrollPosition / cardWidth)]?.id || $chaptersList[0].id);
    		}

    		if ($$self.$$.dirty[0] & /*$chaptersList, activeCardId*/ 12) {
    			activeCardIndex = $chaptersList.findIndex(item => item.id === activeCardId);
    		}
    	};

    	return [
    		mixClass,
    		isCardsOnTopOutsideViewport,
    		activeCardId,
    		$chaptersList,
    		cardsPositionCoefficients,
    		isClickOnCenterCardActive,
    		revolverPosition,
    		refCardPlaceholder,
    		$transitionTo,
    		handleCarouselClick,
    		handleTouchStart,
    		handleTouchEnd,
    		handleTouchMove,
    		isScrollingBlocked,
    		scrollPosition,
    		cardWidth,
    		throttleTimeStamp,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		div7_binding
    	];
    }

    class CardsCarousel extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$c,
    			create_fragment$c,
    			safe_not_equal,
    			{
    				class: 0,
    				isCardsOnTopOutsideViewport: 1,
    				isScrollingBlocked: 13
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CardsCarousel",
    			options,
    			id: create_fragment$c.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mixClass*/ ctx[0] === undefined && !('class' in props)) {
    			console.warn("<CardsCarousel> was created without expected prop 'class'");
    		}
    	}

    	get class() {
    		throw new Error("<CardsCarousel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<CardsCarousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isCardsOnTopOutsideViewport() {
    		throw new Error("<CardsCarousel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isCardsOnTopOutsideViewport(value) {
    		throw new Error("<CardsCarousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isScrollingBlocked() {
    		throw new Error("<CardsCarousel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isScrollingBlocked(value) {
    		throw new Error("<CardsCarousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/ChallengeSnippet.svelte generated by Svelte v3.43.0 */

    const file$a = "src/components/ChallengeSnippet.svelte";

    function create_fragment$b(ctx) {
    	let t0;
    	let li;
    	let div6;
    	let div3;
    	let div0;
    	let t1_value = /*data*/ ctx[1].elapsed + "";
    	let t1;
    	let t2;
    	let div1;
    	let t3_value = /*data*/ ctx[1].topic + "";
    	let t3;
    	let t4;
    	let div2;
    	let t5_value = /*data*/ ctx[1].date + "";
    	let t5;
    	let t6;
    	let div5;
    	let div4;
    	let img;
    	let img_src_value;
    	let li_class_value;

    	const block = {
    		c: function create() {
    			t0 = space();
    			li = element("li");
    			div6 = element("div");
    			div3 = element("div");
    			div0 = element("div");
    			t1 = text(t1_value);
    			t2 = space();
    			div1 = element("div");
    			t3 = text(t3_value);
    			t4 = space();
    			div2 = element("div");
    			t5 = text(t5_value);
    			t6 = space();
    			div5 = element("div");
    			div4 = element("div");
    			img = element("img");
    			attr_dev(div0, "class", "badge-snippet__timing svelte-t78n27");
    			add_location(div0, file$a, 6, 6, 148);
    			attr_dev(div1, "class", "badge-snippet__title svelte-t78n27");
    			add_location(div1, file$a, 9, 6, 228);
    			attr_dev(div2, "class", "badge-snippet__date svelte-t78n27");
    			add_location(div2, file$a, 12, 6, 305);
    			attr_dev(div3, "class", "badge-snippet__text-side svelte-t78n27");
    			add_location(div3, file$a, 5, 4, 103);
    			attr_dev(img, "class", "challenge-badge__image svelte-t78n27");
    			if (!src_url_equal(img.src, img_src_value = "../images/weekly-challenge-badges/" + /*data*/ ctx[1].imageFile)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Badge");
    			add_location(img, file$a, 19, 8, 523);
    			attr_dev(div4, "class", "challenge-badge badge-snippet__badge svelte-t78n27");
    			add_location(div4, file$a, 17, 6, 435);
    			attr_dev(div5, "class", "badge-snippet__badge-side svelte-t78n27");
    			add_location(div5, file$a, 16, 4, 389);
    			attr_dev(div6, "class", "badge-snippet__content svelte-t78n27");
    			add_location(div6, file$a, 4, 2, 62);

    			attr_dev(li, "class", li_class_value = "" + (null_to_empty(`badge-snippet 
            ${/*mixClass*/ ctx[0]}`) + " svelte-t78n27"));

    			add_location(li, file$a, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, li, anchor);
    			append_dev(li, div6);
    			append_dev(div6, div3);
    			append_dev(div3, div0);
    			append_dev(div0, t1);
    			append_dev(div3, t2);
    			append_dev(div3, div1);
    			append_dev(div1, t3);
    			append_dev(div3, t4);
    			append_dev(div3, div2);
    			append_dev(div2, t5);
    			append_dev(div6, t6);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			append_dev(div4, img);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*data*/ 2 && t1_value !== (t1_value = /*data*/ ctx[1].elapsed + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*data*/ 2 && t3_value !== (t3_value = /*data*/ ctx[1].topic + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*data*/ 2 && t5_value !== (t5_value = /*data*/ ctx[1].date + "")) set_data_dev(t5, t5_value);

    			if (dirty & /*data*/ 2 && !src_url_equal(img.src, img_src_value = "../images/weekly-challenge-badges/" + /*data*/ ctx[1].imageFile)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*mixClass*/ 1 && li_class_value !== (li_class_value = "" + (null_to_empty(`badge-snippet 
            ${/*mixClass*/ ctx[0]}`) + " svelte-t78n27"))) {
    				attr_dev(li, "class", li_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChallengeSnippet', slots, []);
    	let { class: mixClass } = $$props;
    	let { data = {} } = $$props;
    	const writable_props = ['class', 'data'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChallengeSnippet> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, mixClass = $$props.class);
    		if ('data' in $$props) $$invalidate(1, data = $$props.data);
    	};

    	$$self.$capture_state = () => ({ mixClass, data });

    	$$self.$inject_state = $$props => {
    		if ('mixClass' in $$props) $$invalidate(0, mixClass = $$props.mixClass);
    		if ('data' in $$props) $$invalidate(1, data = $$props.data);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [mixClass, data];
    }

    class ChallengeSnippet extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { class: 0, data: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChallengeSnippet",
    			options,
    			id: create_fragment$b.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mixClass*/ ctx[0] === undefined && !('class' in props)) {
    			console.warn("<ChallengeSnippet> was created without expected prop 'class'");
    		}
    	}

    	get class() {
    		throw new Error("<ChallengeSnippet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<ChallengeSnippet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get data() {
    		throw new Error("<ChallengeSnippet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<ChallengeSnippet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const badgesList = [
      { id: 20211021_121722, date: '17 Oct 21', elapsed: '84.8s', topic: 'Geography', imageFile: 'badge1.jpg' },
      { id: 20211021_121728, date: '10 Oct 21', elapsed: '88.2s', topic: 'The 1960’s', imageFile: 'badge2.jpg' },
      { id: 20211021_121730, date: '3 Oct 21', elapsed: '58.9s', topic: 'The 1980’s', imageFile: 'badge1.jpg' },
      { id: 20211021_121731, date: '26 Sep 21', elapsed: '75.3s', topic: 'Health & fitness', imageFile: 'badge2.jpg' },
      { id: 20211021_121732, date: '19 Sep 21', elapsed: '62.1s', topic: 'Candy brands', imageFile: 'badge1.jpg' },
      { id: 20211021_121733, date: '12 Sep 21', elapsed: '86.1s', topic: 'Popular culture', imageFile: 'badge2.jpg'},
      { id: 20211021_121735, date: '5 Sep 21', elapsed: '88.7s', topic: 'Politics', imageFile: 'badge1.jpg'},
      { id: 20211021_121737, date: '29 Aug 21', elapsed: '91.5s', topic: 'Environment', imageFile: 'badge2.jpg' },
      { id: 20211021_121738, date: '22 Aug 21', elapsed: '59.4s', topic: 'Ecosystems', imageFile: 'badge1.jpg' },
      { id: 20211021_121740, date: '15 Aug 21', elapsed: '82.0s', topic: 'Religion', imageFile: 'badge2.jpg' },
      { id: 20211021_121743, date: '8 Aug 21', elapsed: '96.2s', topic: 'Nature', imageFile: 'badge1.jpg' },
      { id: 20211021_121744, date: '1 Aug 21', elapsed: '91.5s', topic: 'Marine & oceans', imageFile: 'badge2.jpg' },
      { id: 20211021_121748, date: '25 Jul 21', elapsed: '66.6s', topic: 'Science', imageFile: 'badge1.jpg'},
      { id: 20211021_121750, date: '18 Jul 21', elapsed: '85.1s', topic: 'Buddhism', imageFile: 'badge2.jpg'},
      { id: 20211021_121751, date: '11 Jul 21', elapsed: '78.1s', topic: 'Ancient animals', imageFile: 'badge1.jpg'},
      { id: 20211021_121752, date: '4 Jul 21', elapsed: '65.6s', topic: 'The media', imageFile: 'badge2.jpg'},
      { id: 20211021_121753, date: '27 Jun 21', elapsed: '58.1s', topic: 'Folklore', imageFile: 'badge1.jpg'},
      { id: 20211021_121755, date: '20 Jun 21', elapsed: '57.9s', topic: 'Jobs & work', imageFile: 'badge2.jpg'},
      { id: 20211021_121756, date: '13 Jun 21', elapsed: '72.6s', topic: 'Christianity', imageFile: 'badge1.jpg'},
      { id: 20211021_121757, date: '6 Jun 21', elapsed: '83.2s', topic: 'Love & families', imageFile: 'badge2.jpg'},
      { id: 20211021_121801, date: '30 May 21', elapsed: '74.7s', topic: 'Mind & feelings', imageFile: 'badge1.jpg'},
      { id: 20211021_121803, date: '23 May 21', elapsed: '95.2s', topic: 'Math & Physics', imageFile: 'badge2.jpg'},
      { id: 20211021_121805, date: '16 May 21', elapsed: '86.0s', topic: 'The 1930’s', imageFile: 'badge1.jpg'},
      { id: 20211021_121806, date: '9 May 21', elapsed: '64.4s', topic: 'The 1970’s', imageFile: 'badge2.jpg'},
      { id: 20211021_121807, date: '2 May 21', elapsed: '90.2s', topic: 'The 1920’s', imageFile: 'badge1.jpg'},
      { id: 20211021_121811, date: '25 Apr 21', elapsed: '84.2s', topic: 'The 2000’s', imageFile: 'badge2.jpg'},
      { id: 20211021_121815, date: '18 Apr 21', elapsed: '94.3s', topic: 'History of the Americas', imageFile: 'badge1.jpg'},
      { id: 20211021_121817, date: '11 Apr 21', elapsed: '95.4s', topic: '19th century', imageFile: 'badge2.jpg'},
      { id: 20211021_121818, date: '4 Apr 21', elapsed: '55.9s', topic: 'Islam', imageFile: 'badge1.jpg'},
      { id: 20211021_121819, date: '28 Mar 21', elapsed: '58.3s', topic: 'Disasters', imageFile: 'badge2.jpg'},
      { id: 20211021_121821, date: '21 Mar 21', elapsed: '76.0s', topic: 'The 1990’s', imageFile: 'badge1.jpg'},
      { id: 20211021_121823, date: '14 Mar 21', elapsed: '56.5s', topic: 'Ideas & philosophy', imageFile: 'badge2.jpg'},
      { id: 20211021_121824, date: '7 Mar 21', elapsed: '59.6s', topic: 'Olympic Sports', imageFile: 'badge1.jpg'},
      { id: 20211021_121825, date: '28 Feb 21', elapsed: '77.9s', topic: 'Money & numbers', imageFile: 'badge2.jpg'},
      { id: 20211021_121827, date: '21 Feb 21', elapsed: '80.3s', topic: 'The 1950’s', imageFile: 'badge1.jpg'},
      { id: 20211021_121828, date: '14 Feb 21', elapsed: '84.5s', topic: 'The 1940’s', imageFile: 'badge2.jpg'},
      { id: 20211021_121829, date: '7 Feb 21', elapsed: '91.6s', topic: 'Food & Cooking', imageFile: 'badge1.jpg'},
      { id: 20211021_121830, date: '31 Jan 21', elapsed: '91.1s', topic: 'Foreign words', imageFile: 'badge2.jpg'},
      { id: 20211021_121832, date: '24 Jan 21', elapsed: '79.4s', topic: 'Law & order', imageFile: 'badge1.jpg'},
      { id: 20211021_121833, date: '17 Jan 21', elapsed: '72.1s', topic: 'Hinduism', imageFile: 'badge2.jpg'},
      { id: 20211021_121843, date: '10 Jan 21', elapsed: '89.4s', topic: 'The 1910’s', imageFile: 'badge1.jpg'},
      { id: 20211021_121845, date: '3 Jan 21', elapsed: '61.3s', topic: 'Ball Sports', imageFile: 'badge2.jpg'},
      { id: 20211021_121846, date: '27 Dec 20', elapsed: '64.2s', topic: 'Animals', imageFile: 'badge1.jpg'},
      { id: 20211021_121847, date: '20 Dec 20', elapsed: '80.3s', topic: 'Entertainment', imageFile: 'badge2.jpg'},
      { id: 20211021_121848, date: '13 Dec 20', elapsed: '93.4s', topic: 'elapsed', imageFile: 'badge1.jpg'},
      { id: 20211021_121850, date: '6 Dec 20', elapsed: '81.1s', topic: 'Inequality', imageFile: 'badge2.jpg'},
      { id: 20211021_121851, date: '29 Nov 20', elapsed: '60.5s', topic: 'Cities', imageFile: 'badge1.jpg'},
      { id: 20211021_121852, date: '22 Nov 20', elapsed: '79.5s', topic: 'Ancient History', imageFile: 'badge2.jpg'},
      { id: 20211021_121853, date: '15 Nov 20', elapsed: '59.0s', topic: 'Ancient peoples', imageFile: 'badge1.jpg'},
      { id: 20211021_121855, date: '8 Nov 20', elapsed: '57.4s', topic: 'Arts', imageFile: 'badge2.jpg'},
      { id: 20211021_121857, date: '1 Nov 20', elapsed: '78.4s', topic: 'The 2010’s', imageFile: 'badge1.jpg'},
      { id: 20211021_121859, date: '25 Oct 20', elapsed: '93.5s', topic: 'Judaism ', imageFile: 'badge2.jpg'},
      { id: 20211021_121901, date: '18 Oct 20', elapsed: '97.8s', topic: 'The 1950’s', imageFile: 'badge1.jpg'},
      { id: 20211021_121902, date: '11 Oct 20', elapsed: '81.8s', topic: 'The 1940’s', imageFile: 'badge2.jpg'},
      { id: 20211021_121904, date: '4 Oct 20', elapsed: '75.7s', topic: 'The 1920’s', imageFile: 'badge1.jpg'},
      { id: 20211021_121905, date: '27 Sep 20', elapsed: '88.3s', topic: 'Cities', imageFile: 'badge2.jpg'},
      { id: 20211021_121906, date: '20 Sep 20', elapsed: '87.0s', topic: 'The media', imageFile: 'badge1.jpg'},
      { id: 20211021_121908, date: '13 Sep 20', elapsed: '73.4s', topic: 'Mind & feelings', imageFile: 'badge2.jpg'},
      { id: 20211021_121910, date: '6 Sep 20', elapsed: '77.8s', topic: 'Geography', imageFile: 'badge1.jpg'},
      { id: 20211021_121911, date: '30 Aug 20', elapsed: '80.7s', topic: 'Hinduism', imageFile: 'badge2.jpg'},
      { id: 20211021_121913, date: '23 Aug 20', elapsed: '65.1s', topic: 'Religion', imageFile: 'badge1.jpg'},
      { id: 20211021_121914, date: '16 Aug 20', elapsed: '89.8s', topic: 'Nature', imageFile: 'badge2.jpg'},
      { id: 20211021_121915, date: '9 Aug 20', elapsed: '78.1s', topic: 'Math & Physics', imageFile: 'badge1.jpg'},
      { id: 20211021_121917, date: '2 Aug 20', elapsed: '59.3s', topic: 'Money & numbers', imageFile: 'badge2.jpg'},
      { id: 20211021_121918, date: '26 Jul 20', elapsed: '79.6s', topic: 'Entertainment', imageFile: 'badge1.jpg'},
      { id: 20211021_121919, date: '19 Jul 20', elapsed: '73.6s', topic: 'History of the Americas', imageFile: 'badge2.jpg'},
      { id: 20211021_121920, date: '12 Jul 20', elapsed: '88.7s', topic: 'The 1910’s', imageFile: 'badge1.jpg'},
      { id: 20211021_121921, date: '5 Jul 20', elapsed: '90.8s', topic: 'The 2000’s', imageFile: 'badge2.jpg'},
      { id: 20211021_121923, date: '28 Jun 20', elapsed: '96.4s', topic: 'Animals', imageFile: 'badge1.jpg'},
      { id: 20211021_121924, date: '21 Jun 20', elapsed: '98.7s', topic: 'The 1970’s', imageFile: 'badge2.jpg'},
      { id: 20211021_121926, date: '14 Jun 20', elapsed: '65.4s', topic: 'Islam', imageFile: 'badge1.jpg'},
      { id: 20211021_121927, date: '7 Jun 20', elapsed: '94.3s', topic: 'Inequality', imageFile: 'badge2.jpg'},
      { id: 20211021_121929, date: '31 May 20', elapsed: '67.7s', topic: 'Olympic Sports', imageFile: 'badge1.jpg'},
      { id: 20211021_121930, date: '24 May 20', elapsed: '66.6s', topic: 'The 1980’s', imageFile: 'badge2.jpg'},
      { id: 20211021_121931, date: '17 May 20', elapsed: '81.4s', topic: 'Judaism ', imageFile: 'badge1.jpg'},
      { id: 20211021_121933, date: '10 May 20', elapsed: '59.5s', topic: 'Ancient animals', imageFile: 'badge2.jpg'},
      { id: 20211021_121935, date: '3 May 20', elapsed: '93.6s', topic: 'Disasters', imageFile: 'badge1.jpg'},
      { id: 20211021_121940, date: '26 Apr 20', elapsed: '63.0s', topic: '19th century', imageFile: 'badge2.jpg'},
      { id: 20211021_121941, date: '19 Apr 20', elapsed: '67.8s', topic: 'Folklore', imageFile: 'badge1.jpg'},
      { id: 20211021_121942, date: '12 Apr 20', elapsed: '88.7s', topic: 'Marine & oceans', imageFile: 'badge2.jpg'},
      { id: 20211021_121944, date: '5 Apr 20', elapsed: '57.6s', topic: 'Popular culture', imageFile: 'badge1.jpg'},
      { id: 20211021_121946, date: '29 Mar 20', elapsed: '95.5s', topic: 'Ecosystems', imageFile: 'badge2.jpg'},
      { id: 20211021_121947, date: '22 Mar 20', elapsed: '62.3s', topic: 'Environment', imageFile: 'badge1.jpg'},
      { id: 20211021_121948, date: '15 Mar 20', elapsed: '83.2s', topic: 'Politics', imageFile: 'badge2.jpg'},
      { id: 20211021_121949, date: '8 Mar 20', elapsed: '86.8s', topic: 'Jobs & work', imageFile: 'badge1.jpg'},
      { id: 20211021_121950, date: '1 Mar 20', elapsed: '95.9s', topic: 'The 2010’s', imageFile: 'badge2.jpg'},
      { id: 20211021_121951, date: '23 Feb 20', elapsed: '75.7s', topic: 'Ancient peoples', imageFile: 'badge1.jpg'},
      { id: 20211021_121953, date: '16 Feb 20', elapsed: '58.0s', topic: 'Food & Cooking', imageFile: 'badge2.jpg'},
      { id: 20211021_121955, date: '9 Feb 20', elapsed: '78.6s', topic: 'Ideas & philosophy', imageFile: 'badge1.jpg'},
      { id: 20211021_121956, date: '2 Feb 20', elapsed: '90.0s', topic: 'Christianity', imageFile: 'badge2.jpg'},
      { id: 20211021_121957, date: '26 Jan 20', elapsed: '87.2s', topic: 'Buddhism', imageFile: 'badge1.jpg'},
      { id: 20211021_121958, date: '19 Jan 20', elapsed: '75.5s', topic: 'The 1930’s', imageFile: 'badge2.jpg'},
      { id: 20211021_122000, date: '12 Jan 20', elapsed: '56.7s', topic: 'The 1990’s', imageFile: 'badge1.jpg'},
      { id: 20211021_122001, date: '5 Jan 20', elapsed: '79.7s', topic: 'Candy brands', imageFile: 'badge2.jpg'},
      { id: 20211021_122003, date: '29 Dec 19', elapsed: '97.0s', topic: 'Science', imageFile: 'badge1.jpg'},
      { id: 20211021_122004, date: '22 Dec 19', elapsed: '85.6s', topic: 'Arts', imageFile: 'badge2.jpg'},
      { id: 20211021_122005, date: '15 Dec 19', elapsed: '63.8s', topic: 'Foreign words', imageFile: 'badge1.jpg'},
      { id: 20211021_122006, date: '8 Dec 19', elapsed: '67.2s', topic: 'Law & order', imageFile: 'badge2.jpg'},
      { id: 20211021_122008, date: '1 Dec 19', elapsed: '59.1s', topic: 'Health & fitness', imageFile: 'badge1.jpg'},
      { id: 20211021_122010, date: '24 Nov 19', elapsed: '64.6s', topic: 'Ancient History', imageFile: 'badge2.jpg'}
    ];


    const rotatingBgWordsList = [
      { id: 181529, position: '-.1rem -.7rem auto auto', circleSize: 'huge',
        scale: 1, opacity: .05,
        word: 'oven' },
      { id: 181539, position: '0 0 auto auto', circleSize: 'medium',
        scale: .6, opacity: .15,
        word: 'mushroom' },
      { id: 181617, position: '2.1rem -3.3rem auto auto', circleSize: 'medium',
        scale: 1, opacity: .15,
        word: 'topping' },
      { id: 181638, position: '3.5rem 2.6rem auto auto', circleSize: 'small',
        scale: 1.4, opacity: .05,
        word: 'cherry' },
      { id: 181713, position: '3.3rem -4.1rem auto auto', circleSize: 'medium',
        scale: 1, opacity: .08,
        word: 'chop' },
      { id: 181738, position: '.4rem 2.0rem auto auto', circleSize: 'medium',
        scale: .6, opacity: .08,
        word: 'pasta' },
      { id: 181800, position: '-1.6rem -1.8rem auto auto', circleSize: 'medium',
        scale: 1, opacity: .1,
        word: 'cucumber' },
      { id: 181818, position: '-.3rem -1.0rem auto auto', circleSize: 'medium',
        scale: 1, opacity: .15,
        word: 'gourmet' },
      { id: 181848, position: '1.1rem -.3rem auto auto', circleSize: 'medium',
        scale: 1, opacity: .08,
        word: 'skillet' },
      { id: 181926, position: '1.9rem 1.5rem auto auto', circleSize: 'small',
        scale: 1, opacity: .1,
        word: 'propagate' },
      { id: 181949, position: '-1.1rem 1.5rem auto auto', circleSize: 'big',
        scale: 1.4, opacity: .15,
        word: 'recipe' },
      { id: 134934, position: '2.1rem -2.5rem auto auto', circleSize: 'huge',
        scale: 1, opacity: .05,
        word: 'swing' },
      { id: 134939, position: '1.3rem -6.5rem auto auto', circleSize: 'huge',
        scale: 1.4, opacity: .15,
        word: 'traveling' },
    ];

    /* src/components/ChallengeBadgesList.svelte generated by Svelte v3.43.0 */

    const { console: console_1 } = globals;

    const file$9 = "src/components/ChallengeBadgesList.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[17] = list[i];
    	child_ctx[19] = i;
    	return child_ctx;
    }

    // (30:6) {#each badgesList as badge,index (badge.id)}
    function create_each_block$1(key_1, ctx) {
    	let first;
    	let challengesnippet;
    	let current;

    	challengesnippet = new ChallengeSnippet({
    			props: {
    				class: "badges-vertical-list__badge-snippet",
    				data: /*badge*/ ctx[17]
    			},
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(challengesnippet.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(challengesnippet, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(challengesnippet.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(challengesnippet.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(challengesnippet, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(30:6) {#each badgesList as badge,index (badge.id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let t0;
    	let div2;
    	let div0;
    	let t2;
    	let div1;
    	let ul;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let div1_class_value;
    	let div2_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = badgesList;
    	validate_each_argument(each_value);
    	const get_key = ctx => /*badge*/ ctx[17].id;
    	validate_each_keys(ctx, each_value, get_each_context$1, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$1(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			t0 = space();
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "Challenge Badges";
    			t2 = space();
    			div1 = element("div");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "badges-vertical-list__title svelte-vtqyub");
    			add_location(div0, file$9, 9, 2, 217);
    			attr_dev(ul, "class", "badges-vertical-list__list svelte-vtqyub");
    			add_location(ul, file$9, 23, 4, 877);

    			attr_dev(div1, "class", div1_class_value = "" + (null_to_empty(`badges-vertical-list__list-wrapper 
              ${/*scrollPosition*/ ctx[2] >= /*maxScrollPosition*/ ctx[1] && /*maxScrollPosition*/ ctx[1] > 0 && 'badges-vertical-list__list-wrapper--hidden-top'}
              badges-vertical-list__list-wrapper--hidden-bottom
              ${/*scrollPosition*/ ctx[2] > 0 && /*scrollPosition*/ ctx[2] < /*maxScrollPosition*/ ctx[1] && 'badges-vertical-list__list-wrapper--hidden-top-n-bottom'}`) + " svelte-vtqyub"));

    			add_location(div1, file$9, 13, 2, 292);

    			attr_dev(div2, "class", div2_class_value = "" + (null_to_empty(`badges-vertical-list 
            ${/*mixClass*/ ctx[0]}`) + " svelte-vtqyub"));

    			add_location(div2, file$9, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			append_dev(div1, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			/*div1_binding*/ ctx[5](div1);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div1, "scroll", /*scroll_handler*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*badgesList*/ 0) {
    				each_value = badgesList;
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$1, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, ul, outro_and_destroy_block, create_each_block$1, null, get_each_context$1);
    				check_outros();
    			}

    			if (!current || dirty & /*scrollPosition, maxScrollPosition*/ 6 && div1_class_value !== (div1_class_value = "" + (null_to_empty(`badges-vertical-list__list-wrapper 
              ${/*scrollPosition*/ ctx[2] >= /*maxScrollPosition*/ ctx[1] && /*maxScrollPosition*/ ctx[1] > 0 && 'badges-vertical-list__list-wrapper--hidden-top'}
              badges-vertical-list__list-wrapper--hidden-bottom
              ${/*scrollPosition*/ ctx[2] > 0 && /*scrollPosition*/ ctx[2] < /*maxScrollPosition*/ ctx[1] && 'badges-vertical-list__list-wrapper--hidden-top-n-bottom'}`) + " svelte-vtqyub"))) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if (!current || dirty & /*mixClass*/ 1 && div2_class_value !== (div2_class_value = "" + (null_to_empty(`badges-vertical-list 
            ${/*mixClass*/ ctx[0]}`) + " svelte-vtqyub"))) {
    				attr_dev(div2, "class", div2_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			/*div1_binding*/ ctx[5](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function setCurtainsVisibility(event) {
    	console.log('%c event.target.scrollTop: ', 'background:greenyellow;color:black;', event.target.scrollTop);
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChallengeBadgesList', slots, []);
    	let { class: mixClass } = $$props;

    	// Data -----------------------------------------------------------------------
    	let maxScrollPosition = 0;

    	let scrollPosition = 0;
    	let isTouchMoveInProgress = false;
    	let touchVerticalStartPoint = null;
    	let touchVerticalDistance = null;
    	let lastTouchEventTimestamp = 0;
    	let listSnapTimeout;

    	// Lifecycle hooks ------------------------------------------------------------
    	onMount(() => {
    		requestAnimationFrame(() => {
    			setMaxScrollHeight();
    		});
    	});

    	// Refs (pointers to DOM elements) --------------------------------------------
    	let refBadgesListWrapper;

    	// Methods --------------------------------------------------------------------
    	function setListSnapTimeout() {
    		clearTimeout(listSnapTimeout);
    		listSnapTimeout = setTimeout(snapList, 100);
    	}

    	function setMaxScrollHeight() {
    		let listWrapperHeight = refBadgesListWrapper?.clientHeight;
    		let singleBadgeHeight = document.querySelector('.badges-vertical-list__badge-snippet')?.clientHeight;
    		let allBadgesHeight = singleBadgeHeight * badgesList.length;

    		$$invalidate(1, maxScrollPosition = allBadgesHeight > listWrapperHeight
    		? allBadgesHeight - listWrapperHeight
    		: 0);
    	}

    	function handleTouchStart(event) {
    		isTouchMoveInProgress = true;
    		touchVerticalStartPoint = Math.round(event.changedTouches[0].pageY);
    	}

    	function handleTouchEnd(event) {
    		isTouchMoveInProgress = false;
    		touchVerticalStartPoint = null;
    	}

    	function handleTouchMove(event) {
    		if (!isTouchMoveInProgress) {
    			return;
    		}

    		touchVerticalDistance = Math.round(touchVerticalStartPoint) - Math.round(event.changedTouches[0].pageY);
    		let newScrollPosition = scrollPosition + Math.round(touchVerticalDistance / 1.15 * 10) / 10;

    		// if (newScrollPosition < -30) newScrollPosition = 0;
    		// if (newScrollPosition > maxScrollPosition) newScrollPosition = maxScrollPosition;
    		$$invalidate(2, scrollPosition = Math.round(newScrollPosition));

    		touchVerticalStartPoint = Math.round(event.changedTouches[0].pageY);
    		setListSnapTimeout();
    		lastTouchEventTimestamp = Date.now();
    	}

    	function snapList() {
    		if (lastTouchEventTimestamp > 0 && Date.now() - lastTouchEventTimestamp > 1000) {
    			return;
    		}

    		if (scrollPosition < -30) $$invalidate(2, scrollPosition = 0);
    		if (scrollPosition > maxScrollPosition) $$invalidate(2, scrollPosition = maxScrollPosition);
    	}

    	const writable_props = ['class'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<ChallengeBadgesList> was created with unknown prop '${key}'`);
    	});

    	const scroll_handler = event => $$invalidate(2, scrollPosition = event.target.scrollTop);

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			refBadgesListWrapper = $$value;
    			$$invalidate(3, refBadgesListWrapper);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, mixClass = $$props.class);
    	};

    	$$self.$capture_state = () => ({
    		mixClass,
    		onMount,
    		onDestroy,
    		ChallengeSnippet,
    		maxScrollPosition,
    		scrollPosition,
    		isTouchMoveInProgress,
    		touchVerticalStartPoint,
    		touchVerticalDistance,
    		lastTouchEventTimestamp,
    		listSnapTimeout,
    		badgesList,
    		refBadgesListWrapper,
    		setListSnapTimeout,
    		setCurtainsVisibility,
    		setMaxScrollHeight,
    		handleTouchStart,
    		handleTouchEnd,
    		handleTouchMove,
    		snapList
    	});

    	$$self.$inject_state = $$props => {
    		if ('mixClass' in $$props) $$invalidate(0, mixClass = $$props.mixClass);
    		if ('maxScrollPosition' in $$props) $$invalidate(1, maxScrollPosition = $$props.maxScrollPosition);
    		if ('scrollPosition' in $$props) $$invalidate(2, scrollPosition = $$props.scrollPosition);
    		if ('isTouchMoveInProgress' in $$props) isTouchMoveInProgress = $$props.isTouchMoveInProgress;
    		if ('touchVerticalStartPoint' in $$props) touchVerticalStartPoint = $$props.touchVerticalStartPoint;
    		if ('touchVerticalDistance' in $$props) touchVerticalDistance = $$props.touchVerticalDistance;
    		if ('lastTouchEventTimestamp' in $$props) lastTouchEventTimestamp = $$props.lastTouchEventTimestamp;
    		if ('listSnapTimeout' in $$props) listSnapTimeout = $$props.listSnapTimeout;
    		if ('refBadgesListWrapper' in $$props) $$invalidate(3, refBadgesListWrapper = $$props.refBadgesListWrapper);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		mixClass,
    		maxScrollPosition,
    		scrollPosition,
    		refBadgesListWrapper,
    		scroll_handler,
    		div1_binding
    	];
    }

    class ChallengeBadgesList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { class: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChallengeBadgesList",
    			options,
    			id: create_fragment$a.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mixClass*/ ctx[0] === undefined && !('class' in props)) {
    			console_1.warn("<ChallengeBadgesList> was created without expected prop 'class'");
    		}
    	}

    	get class() {
    		throw new Error("<ChallengeBadgesList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<ChallengeBadgesList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    /** Used for built-in method references. */
    var arrayProto = Array.prototype;

    /** Built-in value references. */
    var splice = arrayProto.splice;

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new ListCache;
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      var data = this.__data__,
          result = data['delete'](key);

      this.size = data.size;
      return result;
    }

    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

    var freeGlobal$1 = freeGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal$1 || freeSelf || Function('return this')();

    var root$1 = root;

    /** Built-in value references. */
    var Symbol$1 = root$1.Symbol;

    var Symbol$2 = Symbol$1;

    /** Used for built-in method references. */
    var objectProto$c = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$9 = objectProto$c.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString$1 = objectProto$c.toString;

    /** Built-in value references. */
    var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty$9.call(value, symToStringTag$1),
          tag = value[symToStringTag$1];

      try {
        value[symToStringTag$1] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString$1.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag$1] = tag;
        } else {
          delete value[symToStringTag$1];
        }
      }
      return result;
    }

    /** Used for built-in method references. */
    var objectProto$b = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto$b.toString;

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }

    /** `Object#toString` result references. */
    var nullTag = '[object Null]',
        undefinedTag = '[object Undefined]';

    /** Built-in value references. */
    var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag && symToStringTag in Object(value))
        ? getRawTag(value)
        : objectToString(value);
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    /** `Object#toString` result references. */
    var asyncTag = '[object AsyncFunction]',
        funcTag$2 = '[object Function]',
        genTag$1 = '[object GeneratorFunction]',
        proxyTag = '[object Proxy]';

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = baseGetTag(value);
      return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
    }

    /** Used to detect overreaching core-js shims. */
    var coreJsData = root$1['__core-js_shared__'];

    var coreJsData$1 = coreJsData;

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /** Used for built-in method references. */
    var funcProto$1 = Function.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString$1 = funcProto$1.toString;

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString$1.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;

    /** Used for built-in method references. */
    var funcProto = Function.prototype,
        objectProto$a = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString.call(hasOwnProperty$8).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    /* Built-in method references that are verified to be native. */
    var Map$1 = getNative(root$1, 'Map');

    var Map$2 = Map$1;

    /* Built-in method references that are verified to be native. */
    var nativeCreate = getNative(Object, 'create');

    var nativeCreate$1 = nativeCreate;

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

    /** Used for built-in method references. */
    var objectProto$9 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate$1) {
        var result = data[key];
        return result === HASH_UNDEFINED$1 ? undefined : result;
      }
      return hasOwnProperty$7.call(data, key) ? data[key] : undefined;
    }

    /** Used for built-in method references. */
    var objectProto$8 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$6.call(data, key);
    }

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = (nativeCreate$1 && value === undefined) ? HASH_UNDEFINED : value;
      return this;
    }

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new Hash,
        'map': new (Map$2 || ListCache),
        'string': new Hash
      };
    }

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      var result = getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      var data = getMapData(this, key),
          size = data.size;

      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map$2 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;

    /**
     * A specialized version of `_.forEach` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEach(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }

    var defineProperty = (function() {
      try {
        var func = getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }());

    var defineProperty$1 = defineProperty;

    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function baseAssignValue(object, key, value) {
      if (key == '__proto__' && defineProperty$1) {
        defineProperty$1(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }

    /** Used for built-in method references. */
    var objectProto$7 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty$5.call(object, key) && eq(objValue, value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];

        var newValue = customizer
          ? customizer(object[key], source[key], key, object, source)
          : undefined;

        if (newValue === undefined) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }

    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */
    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    /** `Object#toString` result references. */
    var argsTag$2 = '[object Arguments]';

    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag$2;
    }

    /** Used for built-in method references. */
    var objectProto$6 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

    /** Built-in value references. */
    var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty$4.call(value, 'callee') &&
        !propertyIsEnumerable$1.call(value, 'callee');
    };

    var isArguments$1 = isArguments;

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    var isArray$1 = isArray;

    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    /** Detect free variable `exports`. */
    var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

    /** Built-in value references. */
    var Buffer$1 = moduleExports$2 ? root$1.Buffer : undefined;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : undefined;

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse;

    var isBuffer$1 = isBuffer;

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER$1 = 9007199254740991;

    /** Used to detect unsigned integer values. */
    var reIsUint = /^(?:0|[1-9]\d*)$/;

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER$1 : length;

      return !!length &&
        (type == 'number' ||
          (type != 'symbol' && reIsUint.test(value))) &&
            (value > -1 && value % 1 == 0 && value < length);
    }

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /** `Object#toString` result references. */
    var argsTag$1 = '[object Arguments]',
        arrayTag$1 = '[object Array]',
        boolTag$2 = '[object Boolean]',
        dateTag$2 = '[object Date]',
        errorTag$1 = '[object Error]',
        funcTag$1 = '[object Function]',
        mapTag$4 = '[object Map]',
        numberTag$2 = '[object Number]',
        objectTag$2 = '[object Object]',
        regexpTag$2 = '[object RegExp]',
        setTag$4 = '[object Set]',
        stringTag$2 = '[object String]',
        weakMapTag$2 = '[object WeakMap]';

    var arrayBufferTag$2 = '[object ArrayBuffer]',
        dataViewTag$3 = '[object DataView]',
        float32Tag$2 = '[object Float32Array]',
        float64Tag$2 = '[object Float64Array]',
        int8Tag$2 = '[object Int8Array]',
        int16Tag$2 = '[object Int16Array]',
        int32Tag$2 = '[object Int32Array]',
        uint8Tag$2 = '[object Uint8Array]',
        uint8ClampedTag$2 = '[object Uint8ClampedArray]',
        uint16Tag$2 = '[object Uint16Array]',
        uint32Tag$2 = '[object Uint32Array]';

    /** Used to identify `toStringTag` values of typed arrays. */
    var typedArrayTags = {};
    typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] =
    typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] =
    typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] =
    typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] =
    typedArrayTags[uint32Tag$2] = true;
    typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] =
    typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] =
    typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] =
    typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
    typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] =
    typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] =
    typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] =
    typedArrayTags[weakMapTag$2] = false;

    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray(value) {
      return isObjectLike(value) &&
        isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }

    /**
     * The base implementation of `_.unary` without support for storing metadata.
     *
     * @private
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     */
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }

    /** Detect free variable `exports`. */
    var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

    /** Detect free variable `process` from Node.js. */
    var freeProcess = moduleExports$1 && freeGlobal$1.process;

    /** Used to access faster Node.js helpers. */
    var nodeUtil = (function() {
      try {
        // Use `util.types` for Node.js 10+.
        var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

        if (types) {
          return types;
        }

        // Legacy `process.binding('util')` for Node.js < 10.
        return freeProcess && freeProcess.binding && freeProcess.binding('util');
      } catch (e) {}
    }());

    var nodeUtil$1 = nodeUtil;

    /* Node.js helper references. */
    var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

    var isTypedArray$1 = isTypedArray;

    /** Used for built-in method references. */
    var objectProto$5 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$3 = objectProto$5.hasOwnProperty;

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray$1(value),
          isArg = !isArr && isArguments$1(value),
          isBuff = !isArr && !isArg && isBuffer$1(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray$1(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty$3.call(value, key)) &&
            !(skipIndexes && (
               // Safari 9 has enumerable `arguments.length` in strict mode.
               key == 'length' ||
               // Node.js 0.10 has enumerable non-index properties on buffers.
               (isBuff && (key == 'offset' || key == 'parent')) ||
               // PhantomJS 2 has enumerable non-index properties on typed arrays.
               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
               // Skip index properties.
               isIndex(key, length)
            ))) {
          result.push(key);
        }
      }
      return result;
    }

    /** Used for built-in method references. */
    var objectProto$4 = Object.prototype;

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$4;

      return value === proto;
    }

    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeKeys = overArg(Object.keys, Object);

    var nativeKeys$1 = nativeKeys;

    /** Used for built-in method references. */
    var objectProto$3 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys$1(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty$2.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }

    /**
     * The base implementation of `_.assign` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }

    /**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }

    /** Used for built-in method references. */
    var objectProto$2 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

    /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object),
          result = [];

      for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty$1.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }

    /**
     * The base implementation of `_.assignIn` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssignIn(object, source) {
      return object && copyObject(source, keysIn(source), object);
    }

    /** Detect free variable `exports`. */
    var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /** Built-in value references. */
    var Buffer = moduleExports ? root$1.Buffer : undefined,
        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length,
          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

      buffer.copy(result);
      return result;
    }

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    /**
     * A specialized version of `_.filter` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function arrayFilter(array, predicate) {
      var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }

    /**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */
    function stubArray() {
      return [];
    }

    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;

    /** Built-in value references. */
    var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

    /**
     * Creates an array of the own enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };

    var getSymbols$1 = getSymbols;

    /**
     * Copies own symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbols(source, object) {
      return copyObject(source, getSymbols$1(source), object);
    }

    /**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */
    function arrayPush(array, values) {
      var index = -1,
          length = values.length,
          offset = array.length;

      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }

    /** Built-in value references. */
    var getPrototype = overArg(Object.getPrototypeOf, Object);

    var getPrototype$1 = getPrototype;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeGetSymbols = Object.getOwnPropertySymbols;

    /**
     * Creates an array of the own and inherited enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
      var result = [];
      while (object) {
        arrayPush(result, getSymbols$1(object));
        object = getPrototype$1(object);
      }
      return result;
    };

    var getSymbolsIn$1 = getSymbolsIn;

    /**
     * Copies own and inherited symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbolsIn(source, object) {
      return copyObject(source, getSymbolsIn$1(source), object);
    }

    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
    }

    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols$1);
    }

    /**
     * Creates an array of own and inherited enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeysIn(object) {
      return baseGetAllKeys(object, keysIn, getSymbolsIn$1);
    }

    /* Built-in method references that are verified to be native. */
    var DataView = getNative(root$1, 'DataView');

    var DataView$1 = DataView;

    /* Built-in method references that are verified to be native. */
    var Promise$1 = getNative(root$1, 'Promise');

    var Promise$2 = Promise$1;

    /* Built-in method references that are verified to be native. */
    var Set$1 = getNative(root$1, 'Set');

    var Set$2 = Set$1;

    /* Built-in method references that are verified to be native. */
    var WeakMap = getNative(root$1, 'WeakMap');

    var WeakMap$1 = WeakMap;

    /** `Object#toString` result references. */
    var mapTag$3 = '[object Map]',
        objectTag$1 = '[object Object]',
        promiseTag = '[object Promise]',
        setTag$3 = '[object Set]',
        weakMapTag$1 = '[object WeakMap]';

    var dataViewTag$2 = '[object DataView]';

    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = toSource(DataView$1),
        mapCtorString = toSource(Map$2),
        promiseCtorString = toSource(Promise$2),
        setCtorString = toSource(Set$2),
        weakMapCtorString = toSource(WeakMap$1);

    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    var getTag = baseGetTag;

    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
    if ((DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$2) ||
        (Map$2 && getTag(new Map$2) != mapTag$3) ||
        (Promise$2 && getTag(Promise$2.resolve()) != promiseTag) ||
        (Set$2 && getTag(new Set$2) != setTag$3) ||
        (WeakMap$1 && getTag(new WeakMap$1) != weakMapTag$1)) {
      getTag = function(value) {
        var result = baseGetTag(value),
            Ctor = result == objectTag$1 ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : '';

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString: return dataViewTag$2;
            case mapCtorString: return mapTag$3;
            case promiseCtorString: return promiseTag;
            case setCtorString: return setTag$3;
            case weakMapCtorString: return weakMapTag$1;
          }
        }
        return result;
      };
    }

    var getTag$1 = getTag;

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
      var length = array.length,
          result = new array.constructor(length);

      // Add properties assigned by `RegExp#exec`.
      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }

    /** Built-in value references. */
    var Uint8Array = root$1.Uint8Array;

    var Uint8Array$1 = Uint8Array;

    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
      return result;
    }

    /**
     * Creates a clone of `dataView`.
     *
     * @private
     * @param {Object} dataView The data view to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned data view.
     */
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }

    /** Used to match `RegExp` flags from their coerced string values. */
    var reFlags = /\w*$/;

    /**
     * Creates a clone of `regexp`.
     *
     * @private
     * @param {Object} regexp The regexp to clone.
     * @returns {Object} Returns the cloned regexp.
     */
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol$2 ? Symbol$2.prototype : undefined,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

    /**
     * Creates a clone of the `symbol` object.
     *
     * @private
     * @param {Object} symbol The symbol object to clone.
     * @returns {Object} Returns the cloned symbol object.
     */
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }

    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }

    /** `Object#toString` result references. */
    var boolTag$1 = '[object Boolean]',
        dateTag$1 = '[object Date]',
        mapTag$2 = '[object Map]',
        numberTag$1 = '[object Number]',
        regexpTag$1 = '[object RegExp]',
        setTag$2 = '[object Set]',
        stringTag$1 = '[object String]',
        symbolTag$1 = '[object Symbol]';

    var arrayBufferTag$1 = '[object ArrayBuffer]',
        dataViewTag$1 = '[object DataView]',
        float32Tag$1 = '[object Float32Array]',
        float64Tag$1 = '[object Float64Array]',
        int8Tag$1 = '[object Int8Array]',
        int16Tag$1 = '[object Int16Array]',
        int32Tag$1 = '[object Int32Array]',
        uint8Tag$1 = '[object Uint8Array]',
        uint8ClampedTag$1 = '[object Uint8ClampedArray]',
        uint16Tag$1 = '[object Uint16Array]',
        uint32Tag$1 = '[object Uint32Array]';

    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag$1:
          return cloneArrayBuffer(object);

        case boolTag$1:
        case dateTag$1:
          return new Ctor(+object);

        case dataViewTag$1:
          return cloneDataView(object, isDeep);

        case float32Tag$1: case float64Tag$1:
        case int8Tag$1: case int16Tag$1: case int32Tag$1:
        case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
          return cloneTypedArray(object, isDeep);

        case mapTag$2:
          return new Ctor;

        case numberTag$1:
        case stringTag$1:
          return new Ctor(object);

        case regexpTag$1:
          return cloneRegExp(object);

        case setTag$2:
          return new Ctor;

        case symbolTag$1:
          return cloneSymbol(object);
      }
    }

    /** Built-in value references. */
    var objectCreate = Object.create;

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} proto The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    var baseCreate = (function() {
      function object() {}
      return function(proto) {
        if (!isObject(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object;
        object.prototype = undefined;
        return result;
      };
    }());

    var baseCreate$1 = baseCreate;

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      return (typeof object.constructor == 'function' && !isPrototype(object))
        ? baseCreate$1(getPrototype$1(object))
        : {};
    }

    /** `Object#toString` result references. */
    var mapTag$1 = '[object Map]';

    /**
     * The base implementation of `_.isMap` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     */
    function baseIsMap(value) {
      return isObjectLike(value) && getTag$1(value) == mapTag$1;
    }

    /* Node.js helper references. */
    var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;

    /**
     * Checks if `value` is classified as a `Map` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     * @example
     *
     * _.isMap(new Map);
     * // => true
     *
     * _.isMap(new WeakMap);
     * // => false
     */
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

    var isMap$1 = isMap;

    /** `Object#toString` result references. */
    var setTag$1 = '[object Set]';

    /**
     * The base implementation of `_.isSet` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     */
    function baseIsSet(value) {
      return isObjectLike(value) && getTag$1(value) == setTag$1;
    }

    /* Node.js helper references. */
    var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;

    /**
     * Checks if `value` is classified as a `Set` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     * @example
     *
     * _.isSet(new Set);
     * // => true
     *
     * _.isSet(new WeakSet);
     * // => false
     */
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

    var isSet$1 = isSet;

    /** Used to compose bitmasks for cloning. */
    var CLONE_DEEP_FLAG$1 = 1,
        CLONE_FLAT_FLAG = 2,
        CLONE_SYMBOLS_FLAG$1 = 4;

    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        objectTag = '[object Object]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        symbolTag = '[object Symbol]',
        weakMapTag = '[object WeakMap]';

    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';

    /** Used to identify `toStringTag` values supported by `_.clone`. */
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] =
    cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
    cloneableTags[boolTag] = cloneableTags[dateTag] =
    cloneableTags[float32Tag] = cloneableTags[float64Tag] =
    cloneableTags[int8Tag] = cloneableTags[int16Tag] =
    cloneableTags[int32Tag] = cloneableTags[mapTag] =
    cloneableTags[numberTag] = cloneableTags[objectTag] =
    cloneableTags[regexpTag] = cloneableTags[setTag] =
    cloneableTags[stringTag] = cloneableTags[symbolTag] =
    cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
    cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] =
    cloneableTags[weakMapTag] = false;

    /**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Deep clone
     *  2 - Flatten inherited properties
     *  4 - Clone symbols
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, bitmask, customizer, key, object, stack) {
      var result,
          isDeep = bitmask & CLONE_DEEP_FLAG$1,
          isFlat = bitmask & CLONE_FLAT_FLAG,
          isFull = bitmask & CLONE_SYMBOLS_FLAG$1;

      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray$1(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag$1(value),
            isFunc = tag == funcTag || tag == genTag;

        if (isBuffer$1(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          result = (isFlat || isFunc) ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat
              ? copySymbolsIn(value, baseAssignIn(result, value))
              : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, isDeep);
        }
      }
      // Check for circular references and return its corresponding clone.
      stack || (stack = new Stack);
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);

      if (isSet$1(value)) {
        value.forEach(function(subValue) {
          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });
      } else if (isMap$1(value)) {
        value.forEach(function(subValue, key) {
          result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
        });
      }

      var keysFunc = isFull
        ? (isFlat ? getAllKeysIn : getAllKeys)
        : (isFlat ? keysIn : keys);

      var props = isArr ? undefined : keysFunc(value);
      arrayEach(props || value, function(subValue, key) {
        if (props) {
          key = subValue;
          subValue = value[key];
        }
        // Recursively populate clone (susceptible to call stack limits).
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
      return result;
    }

    /** Used to compose bitmasks for cloning. */
    var CLONE_DEEP_FLAG = 1,
        CLONE_SYMBOLS_FLAG = 4;

    /**
     * This method is like `_.clone` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @returns {*} Returns the deep cloned value.
     * @see _.clone
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var deep = _.cloneDeep(objects);
     * console.log(deep[0] === objects[0]);
     * // => false
     */
    function cloneDeep(value) {
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
    }

    function shuffleArrayElements(array) {
      const newArray = cloneDeep(array);
      
      let currentIndex = array.length,  randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [newArray[currentIndex], newArray[randomIndex]] = [
          newArray[randomIndex], newArray[currentIndex]];
      }

      return newArray;
    }

    /* src/components/ChallengeEmblem.svelte generated by Svelte v3.43.0 */
    const file$8 = "src/components/ChallengeEmblem.svelte";

    // (3:2) <ArcText     class="current-challenge-emblem__top-arc-text"     debugMode={false}     roundness="19.2"     fontSize="2.1"     topShift="1.9"     color="rgba(255,255,255,.8)"     viewPortStart="0 -20"   >
    function create_default_slot_1$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("12 Sep 2021");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(3:2) <ArcText     class=\\\"current-challenge-emblem__top-arc-text\\\"     debugMode={false}     roundness=\\\"19.2\\\"     fontSize=\\\"2.1\\\"     topShift=\\\"1.9\\\"     color=\\\"rgba(255,255,255,.8)\\\"     viewPortStart=\\\"0 -20\\\"   >",
    		ctx
    	});

    	return block;
    }

    // (23:2) <ArcText     class="current-challenge-emblem__bottom-arc-text"     debugMode={false}     roundness="18.0"     fontSize="2.1"     topShift="1.9"     color="rgba(255,255,255,.8)"     viewPortStart="0 145"     isDownwardsRoundness={true}   >
    function create_default_slot$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Badge Earned");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(23:2) <ArcText     class=\\\"current-challenge-emblem__bottom-arc-text\\\"     debugMode={false}     roundness=\\\"18.0\\\"     fontSize=\\\"2.1\\\"     topShift=\\\"1.9\\\"     color=\\\"rgba(255,255,255,.8)\\\"     viewPortStart=\\\"0 145\\\"     isDownwardsRoundness={true}   >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let t0;
    	let div2;
    	let arctext0;
    	let t1;
    	let div0;
    	let img;
    	let img_src_value;
    	let t2;
    	let arctext1;
    	let t3;
    	let div1;
    	let div2_class_value;
    	let current;

    	arctext0 = new ArcText({
    			props: {
    				class: "current-challenge-emblem__top-arc-text",
    				debugMode: false,
    				roundness: "19.2",
    				fontSize: "2.1",
    				topShift: "1.9",
    				color: "rgba(255,255,255,.8)",
    				viewPortStart: "0 -20",
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	arctext1 = new ArcText({
    			props: {
    				class: "current-challenge-emblem__bottom-arc-text",
    				debugMode: false,
    				roundness: "18.0",
    				fontSize: "2.1",
    				topShift: "1.9",
    				color: "rgba(255,255,255,.8)",
    				viewPortStart: "0 145",
    				isDownwardsRoundness: true,
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t0 = space();
    			div2 = element("div");
    			create_component(arctext0.$$.fragment);
    			t1 = space();
    			div0 = element("div");
    			img = element("img");
    			t2 = space();
    			create_component(arctext1.$$.fragment);
    			t3 = space();
    			div1 = element("div");
    			attr_dev(img, "class", "current-challenge-emblem__badge svelte-kbpcdf");
    			if (!src_url_equal(img.src, img_src_value = "../images/weekly-challenge-badges/badge1.jpg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Badge");
    			add_location(img, file$8, 15, 4, 369);
    			attr_dev(div0, "class", "current-challenge-emblem__badge-container svelte-kbpcdf");
    			add_location(div0, file$8, 14, 2, 309);
    			attr_dev(div1, "class", "current-challenge-emblem__bg-half-circle svelte-kbpcdf");
    			add_location(div1, file$8, 35, 2, 786);

    			attr_dev(div2, "class", div2_class_value = "" + (null_to_empty(`current-challenge-emblem 
              ${/*mixClass*/ ctx[0]}`) + " svelte-kbpcdf"));

    			add_location(div2, file$8, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div2, anchor);
    			mount_component(arctext0, div2, null);
    			append_dev(div2, t1);
    			append_dev(div2, div0);
    			append_dev(div0, img);
    			append_dev(div2, t2);
    			mount_component(arctext1, div2, null);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const arctext0_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				arctext0_changes.$$scope = { dirty, ctx };
    			}

    			arctext0.$set(arctext0_changes);
    			const arctext1_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				arctext1_changes.$$scope = { dirty, ctx };
    			}

    			arctext1.$set(arctext1_changes);

    			if (!current || dirty & /*mixClass*/ 1 && div2_class_value !== (div2_class_value = "" + (null_to_empty(`current-challenge-emblem 
              ${/*mixClass*/ ctx[0]}`) + " svelte-kbpcdf"))) {
    				attr_dev(div2, "class", div2_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(arctext0.$$.fragment, local);
    			transition_in(arctext1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(arctext0.$$.fragment, local);
    			transition_out(arctext1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div2);
    			destroy_component(arctext0);
    			destroy_component(arctext1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChallengeEmblem', slots, []);
    	let { class: mixClass } = $$props;
    	const writable_props = ['class'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChallengeEmblem> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, mixClass = $$props.class);
    	};

    	$$self.$capture_state = () => ({ mixClass, ArcText });

    	$$self.$inject_state = $$props => {
    		if ('mixClass' in $$props) $$invalidate(0, mixClass = $$props.mixClass);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [mixClass];
    }

    class ChallengeEmblem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { class: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChallengeEmblem",
    			options,
    			id: create_fragment$9.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mixClass*/ ctx[0] === undefined && !('class' in props)) {
    			console.warn("<ChallengeEmblem> was created without expected prop 'class'");
    		}
    	}

    	get class() {
    		throw new Error("<ChallengeEmblem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<ChallengeEmblem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var hexagonSuperellipsIcon = "<svg width=\"470\" height=\"512\" viewBox=\"0 0 512 560\">\n  <path d=\"M459.472,102.021c32.6,19.317,51.924,51.915,51.924,90.55V366.429c0,38.635-19.321,71.233-51.924,90.55L308.528,543.908a102.464,102.464,0,0,1-105.056,0L52.528,456.979C19.925,437.662.6,405.064,0.6,366.429V192.571c0-38.635,19.321-71.233,51.925-90.55L203.472,15.092a102.467,102.467,0,0,1,105.056,0Z\"/>\n</svg>\n";

    var ropeTitleDoubleIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1480\" height=\"479\" viewBox=\"0 0 1480 479\">\n  <defs>\n    <style>\n      .cls-1 {\n        fill: #c0d0de;\n      }\n\n      .cls-1, .cls-2, .cls-3 {\n        fill-rule: evenodd;\n      }\n\n      .cls-2 {\n        fill: #7c9cba;\n      }\n\n      .cls-3 {\n        fill: #fff;\n      }\n    </style>\n  </defs>\n  <path class=\"cls-1\" d=\"M0.6,161.392c-0.424,0,116.249,66.889,116.249,66.889S51.419,342.25,51.419,341.826c84.922-23.343,210.279-47.184,294.2-58.985,0-.424-30.641-189.362-31.065-188.938C250.139,102.172,91.7,137.679.6,161.392Zm1479.02,74c0.42,0-129.25,79.889-129.25,79.889s80.43,131.969,80.43,131.545c-84.92-23.343-231.28-44.184-315.21-55.985,0-.424,22.65-216.362,23.07-215.938C1203.08,183.172,1388.52,211.679,1479.62,235.392Z\"/>\n  <path id=\"Ellipse_1_copy\" data-name=\"Ellipse 1 copy\" class=\"cls-2\" d=\"M130.106,65.208c0.022,0.019,38.9,183.031,38.506,183.031,0.4-.3,177.165,34.36,177.149,34.762,0.388-.389-27.425-186.913-27.477-186.914C318.162,96.347,129.7,64.76,130.106,65.208Zm1008.024,109.8c-0.03-.008,166.11,90.172,166.12,90.184-0.01-.018-38.02,212.926-38.02,212.92s-150.66-89.315-150.66-89.317S1138.13,175.02,1138.13,175.006ZM481.987,231.9c0.021,0.019,21.318,214.1,20.93,214.1,0.4-.3,239.021-259.1,239.021-259.108,0,0.017-2.935-186.776-2.987-186.776C738.829,0.373,481.582,231.452,481.987,231.9Z\"/>\n  <path class=\"cls-3\" d=\"M129.727,65.1c0.022,0.019,39.054,183.583,38.665,183.583,143.052-36.142,435.014-63.694,574.178-61.75,0.389-.389-3.234-186.842-3.286-186.843C583.4-.038,266.575,29.187,129.727,65.1ZM481.288,231.479c275.953-31.529,632.012-8.493,823.332,33.545,0-.525-38.42,212.772-37.89,213.3-268.6-50.972-508.18-52.548-764.159-31.528C502.571,446.267,480.762,231.479,481.288,231.479Z\"/>\n</svg>\n";

    var timerIcon = "﻿<svg width=\"512\" height=\"511\" viewBox=\"0 0 512 511\">\n   <path d=\"M223.4,83.891V269L328.49,374.035,374.6,327.954,288.6,242V83.891H223.4ZM256,0.168c140.993,0,255.461,114.41,255.461,255.333S396.994,510.832,256,510.832,0.538,396.422.538,255.5,115.006,0.168,256,.168Z\"/>\n</svg>";

    /* src/components/ChallengeDetailsHexagon.svelte generated by Svelte v3.43.0 */

    const file$7 = "src/components/ChallengeDetailsHexagon.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	child_ctx[6] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	child_ctx[6] = i;
    	return child_ctx;
    }

    // (12:4) <ArcText       class="rope-title__word1"       debugMode={false}       roundness="3.4"       fontSize="1.8"       topShift="-.8"     >
    function create_default_slot_3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Weekly");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(12:4) <ArcText       class=\\\"rope-title__word1\\\"       debugMode={false}       roundness=\\\"3.4\\\"       fontSize=\\\"1.8\\\"       topShift=\\\"-.8\\\"     >",
    		ctx
    	});

    	return block;
    }

    // (22:4) <ArcText       class="rope-title__word2"       debugMode={false}       roundness="3.4"       fontSize="1.8"       topShift="-.8"     >
    function create_default_slot_2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Challenge");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(22:4) <ArcText       class=\\\"rope-title__word2\\\"       debugMode={false}       roundness=\\\"3.4\\\"       fontSize=\\\"1.8\\\"       topShift=\\\"-.8\\\"     >",
    		ctx
    	});

    	return block;
    }

    // (35:4) <ArcText       class="challenge-details__challenge-name"       debugMode={false}       roundness="10.4"       fontSize="1.8"       topShift="0"       color="#fefea5"     >
    function create_default_slot_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Food & Cooking");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(35:4) <ArcText       class=\\\"challenge-details__challenge-name\\\"       debugMode={false}       roundness=\\\"10.4\\\"       fontSize=\\\"1.8\\\"       topShift=\\\"0\\\"       color=\\\"#fefea5\\\"     >",
    		ctx
    	});

    	return block;
    }

    // (160:16) <ArcText                   class="circle-width-word__word"                   debugMode={false}                   roundness="10.4"                   fontSize="1.8"                   topShift="0"                   color="#fff"                 >
    function create_default_slot(ctx) {
    	let t_value = /*wordInfo*/ ctx[7].word + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*rotatingBgWordsMatrix*/ 4 && t_value !== (t_value = /*wordInfo*/ ctx[7].word + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(160:16) <ArcText                   class=\\\"circle-width-word__word\\\"                   debugMode={false}                   roundness=\\\"10.4\\\"                   fontSize=\\\"1.8\\\"                   topShift=\\\"0\\\"                   color=\\\"#fff\\\"                 >",
    		ctx
    	});

    	return block;
    }

    // (136:6) {#each wordsArray as wordInfo,index (wordInfo.id)}
    function create_each_block_1(key_1, ctx) {
    	let div3;
    	let div2;
    	let div1;
    	let div0;
    	let arctext;
    	let div2_class_value;
    	let current;

    	arctext = new ArcText({
    			props: {
    				class: "circle-width-word__word",
    				debugMode: false,
    				roundness: "10.4",
    				fontSize: "1.8",
    				topShift: "0",
    				color: "#fff",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			create_component(arctext.$$.fragment);
    			attr_dev(div0, "class", "circle-width-word__word-container2 svelte-1tk9whq");
    			set_style(div0, "transform", "scale(" + /*wordInfo*/ ctx[7].scale + ")");
    			add_location(div0, file$7, 155, 14, 4326);
    			attr_dev(div1, "class", "circle-width-word__word-container1 svelte-1tk9whq");
    			add_location(div1, file$7, 154, 12, 4263);

    			attr_dev(div2, "class", div2_class_value = "" + (null_to_empty(`circle-width-word 
                      ${/*wordInfo*/ ctx[7].circleSize === 'huge' && 'circle-width-word--huge'}
                      ${/*wordInfo*/ ctx[7].circleSize === 'big' && 'circle-width-word--big'}
                      ${/*wordInfo*/ ctx[7].circleSize === 'medium' && 'circle-width-word--medium'}
                      ${/*wordInfo*/ ctx[7].circleSize === 'small' && 'circle-width-word--small'}
                      rotating-bg-words__circle 
                      rotating-bg-words__circle--rotate-speed${Math.floor(Math.random() * 5) + 1}`) + " svelte-1tk9whq"));

    			set_style(div2, "inset", /*wordInfo*/ ctx[7].position);
    			add_location(div2, file$7, 144, 10, 3647);
    			attr_dev(div3, "class", "rotating-bg-words__circle-wrapper svelte-1tk9whq");
    			set_style(div3, "transform", "rotate(" + Math.floor(Math.random() * 360) + "deg) translateZ(0)");
    			set_style(div3, "opacity", /*wordInfo*/ ctx[7].opacity);
    			add_location(div3, file$7, 136, 8, 3306);
    			this.first = div3;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			mount_component(arctext, div0, null);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const arctext_changes = {};

    			if (dirty & /*$$scope, rotatingBgWordsMatrix*/ 516) {
    				arctext_changes.$$scope = { dirty, ctx };
    			}

    			arctext.$set(arctext_changes);

    			if (!current || dirty & /*rotatingBgWordsMatrix*/ 4) {
    				set_style(div0, "transform", "scale(" + /*wordInfo*/ ctx[7].scale + ")");
    			}

    			if (!current || dirty & /*rotatingBgWordsMatrix*/ 4 && div2_class_value !== (div2_class_value = "" + (null_to_empty(`circle-width-word 
                      ${/*wordInfo*/ ctx[7].circleSize === 'huge' && 'circle-width-word--huge'}
                      ${/*wordInfo*/ ctx[7].circleSize === 'big' && 'circle-width-word--big'}
                      ${/*wordInfo*/ ctx[7].circleSize === 'medium' && 'circle-width-word--medium'}
                      ${/*wordInfo*/ ctx[7].circleSize === 'small' && 'circle-width-word--small'}
                      rotating-bg-words__circle 
                      rotating-bg-words__circle--rotate-speed${Math.floor(Math.random() * 5) + 1}`) + " svelte-1tk9whq"))) {
    				attr_dev(div2, "class", div2_class_value);
    			}

    			if (!current || dirty & /*rotatingBgWordsMatrix*/ 4) {
    				set_style(div2, "inset", /*wordInfo*/ ctx[7].position);
    			}

    			if (!current || dirty & /*rotatingBgWordsMatrix*/ 4) {
    				set_style(div3, "opacity", /*wordInfo*/ ctx[7].opacity);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(arctext.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(arctext.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_component(arctext);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(136:6) {#each wordsArray as wordInfo,index (wordInfo.id)}",
    		ctx
    	});

    	return block;
    }

    // (129:2) {#each rotatingBgWordsMatrix as wordsArray,index (index)}
    function create_each_block(key_1, ctx) {
    	let div;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t;
    	let div_class_value;
    	let current;
    	let each_value_1 = /*wordsArray*/ ctx[4];
    	validate_each_argument(each_value_1);
    	const get_key = ctx => /*wordInfo*/ ctx[7].id;
    	validate_each_keys(ctx, each_value_1, get_each_context_1, get_key);

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		let child_ctx = get_each_context_1(ctx, each_value_1, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block_1(key, child_ctx));
    	}

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();

    			attr_dev(div, "class", div_class_value = "" + (null_to_empty(`rotating-bg-words 
                challenge-details__rotating-bg-words 
                ${/*isBlurredWordsInvisible*/ ctx[1] && 'challenge-details__rotating-bg-words--invisible'}`) + " svelte-1tk9whq"));

    			set_style(div, "filter", "blur(" + /*index*/ ctx[6] + "px)");
    			add_location(div, file$7, 129, 4, 3005);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(div, t);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*Math, rotatingBgWordsMatrix*/ 4) {
    				each_value_1 = /*wordsArray*/ ctx[4];
    				validate_each_argument(each_value_1);
    				group_outros();
    				validate_each_keys(ctx, each_value_1, get_each_context_1, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_1, each_1_lookup, div, outro_and_destroy_block, create_each_block_1, t, get_each_context_1);
    				check_outros();
    			}

    			if (!current || dirty & /*isBlurredWordsInvisible*/ 2 && div_class_value !== (div_class_value = "" + (null_to_empty(`rotating-bg-words 
                challenge-details__rotating-bg-words 
                ${/*isBlurredWordsInvisible*/ ctx[1] && 'challenge-details__rotating-bg-words--invisible'}`) + " svelte-1tk9whq"))) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty & /*rotatingBgWordsMatrix*/ 4) {
    				set_style(div, "filter", "blur(" + /*index*/ ctx[6] + "px)");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(129:2) {#each rotatingBgWordsMatrix as wordsArray,index (index)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let t0;
    	let div21;
    	let div0;
    	let icon0;
    	let t1;
    	let arctext0;
    	let t2;
    	let arctext1;
    	let t3;
    	let div1;
    	let arctext2;
    	let t4;
    	let div4;
    	let div2;
    	let icon1;
    	let t5;
    	let div3;
    	let t7;
    	let div17;
    	let challengeemblem;
    	let t8;
    	let div16;
    	let div9;
    	let div5;
    	let t10;
    	let div8;
    	let div6;
    	let t12;
    	let div7;
    	let t14;
    	let div15;
    	let div10;
    	let t16;
    	let div14;
    	let div11;
    	let t18;
    	let div13;
    	let t19;
    	let div12;
    	let t21;
    	let div18;
    	let t22;
    	let div19;
    	let buttonincircle;
    	let t23;
    	let div20;
    	let icon2;
    	let t24;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let div21_class_value;
    	let current;

    	icon0 = new Icon({
    			props: {
    				class: "rope-title__rope-bg",
    				data: ropeTitleDoubleIcon
    			},
    			$$inline: true
    		});

    	arctext0 = new ArcText({
    			props: {
    				class: "rope-title__word1",
    				debugMode: false,
    				roundness: "3.4",
    				fontSize: "1.8",
    				topShift: "-.8",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	arctext1 = new ArcText({
    			props: {
    				class: "rope-title__word2",
    				debugMode: false,
    				roundness: "3.4",
    				fontSize: "1.8",
    				topShift: "-.8",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	arctext2 = new ArcText({
    			props: {
    				class: "challenge-details__challenge-name",
    				debugMode: false,
    				roundness: "10.4",
    				fontSize: "1.8",
    				topShift: "0",
    				color: "#fefea5",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	icon1 = new Icon({
    			props: { data: timerIcon },
    			$$inline: true
    		});

    	challengeemblem = new ChallengeEmblem({
    			props: {
    				class: "challenge-details__challenge-emblem"
    			},
    			$$inline: true
    		});

    	buttonincircle = new ButtonInCircle({
    			props: {
    				class: "challenge-details__play-button",
    				backwardsGradient: true,
    				prominent: true,
    				textInCircle: "Play"
    			},
    			$$inline: true
    		});

    	icon2 = new Icon({
    			props: {
    				class: "hexagon-bg-layer__hexagon",
    				data: hexagonSuperellipsIcon
    			},
    			$$inline: true
    		});

    	let each_value = /*rotatingBgWordsMatrix*/ ctx[2];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*index*/ ctx[6];
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			t0 = space();
    			div21 = element("div");
    			div0 = element("div");
    			create_component(icon0.$$.fragment);
    			t1 = space();
    			create_component(arctext0.$$.fragment);
    			t2 = space();
    			create_component(arctext1.$$.fragment);
    			t3 = space();
    			div1 = element("div");
    			create_component(arctext2.$$.fragment);
    			t4 = space();
    			div4 = element("div");
    			div2 = element("div");
    			create_component(icon1.$$.fragment);
    			t5 = space();
    			div3 = element("div");
    			div3.textContent = "6d 4h";
    			t7 = space();
    			div17 = element("div");
    			create_component(challengeemblem.$$.fragment);
    			t8 = space();
    			div16 = element("div");
    			div9 = element("div");
    			div5 = element("div");
    			div5.textContent = "Your best speed";
    			t10 = space();
    			div8 = element("div");
    			div6 = element("div");
    			div6.textContent = "94";
    			t12 = space();
    			div7 = element("div");
    			div7.textContent = "Seconds";
    			t14 = space();
    			div15 = element("div");
    			div10 = element("div");
    			div10.textContent = "Global Rank";
    			t16 = space();
    			div14 = element("div");
    			div11 = element("div");
    			div11.textContent = "Top";
    			t18 = space();
    			div13 = element("div");
    			t19 = text("91\n            ");
    			div12 = element("div");
    			div12.textContent = "%";
    			t21 = space();
    			div18 = element("div");
    			t22 = space();
    			div19 = element("div");
    			create_component(buttonincircle.$$.fragment);
    			t23 = space();
    			div20 = element("div");
    			create_component(icon2.$$.fragment);
    			t24 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "rope-title challenge-details__rope-title svelte-1tk9whq");
    			add_location(div0, file$7, 4, 2, 89);
    			attr_dev(div1, "class", "challenge-details__challenge-name-container svelte-1tk9whq");
    			add_location(div1, file$7, 33, 2, 616);
    			attr_dev(div2, "class", "challenge-timer__icon-container svelte-1tk9whq");
    			add_location(div2, file$7, 50, 4, 1000);
    			attr_dev(div3, "class", "challenge-timer__text svelte-1tk9whq");
    			add_location(div3, file$7, 53, 4, 1093);
    			attr_dev(div4, "class", "challenge-timer challenge-details__timer svelte-1tk9whq");
    			add_location(div4, file$7, 48, 2, 926);
    			attr_dev(div5, "class", "stats-snippet__title svelte-1tk9whq");
    			add_location(div5, file$7, 70, 8, 1487);
    			attr_dev(div6, "class", "stats-snippet__value svelte-1tk9whq");
    			add_location(div6, file$7, 74, 10, 1626);
    			attr_dev(div7, "class", "stats-snippet__additional-word svelte-1tk9whq");
    			add_location(div7, file$7, 77, 10, 1703);
    			attr_dev(div8, "class", "stats-snippet__value-container svelte-1tk9whq");
    			add_location(div8, file$7, 73, 8, 1571);
    			attr_dev(div9, "class", "stats-snippet challenge-details__stats-snippet svelte-1tk9whq");
    			add_location(div9, file$7, 68, 6, 1397);
    			attr_dev(div10, "class", "stats-snippet__title svelte-1tk9whq");
    			add_location(div10, file$7, 86, 8, 1961);
    			attr_dev(div11, "class", "stats-snippet__additional-word svelte-1tk9whq");
    			add_location(div11, file$7, 90, 10, 2096);
    			attr_dev(div12, "class", "stats-snippet__percentage-sign svelte-1tk9whq");
    			add_location(div12, file$7, 95, 12, 2246);
    			attr_dev(div13, "class", "stats-snippet__value svelte-1tk9whq");
    			add_location(div13, file$7, 93, 10, 2184);
    			attr_dev(div14, "class", "stats-snippet__value-container svelte-1tk9whq");
    			add_location(div14, file$7, 89, 8, 2041);
    			attr_dev(div15, "class", "stats-snippet challenge-details__stats-snippet svelte-1tk9whq");
    			add_location(div15, file$7, 84, 6, 1873);
    			attr_dev(div16, "class", "challenge-details__stats svelte-1tk9whq");
    			add_location(div16, file$7, 65, 4, 1322);
    			attr_dev(div17, "class", "challenge-details__badge-n-stats svelte-1tk9whq");
    			add_location(div17, file$7, 59, 2, 1191);
    			attr_dev(div18, "class", "challenge-details__play-button");
    			add_location(div18, file$7, 106, 2, 2420);
    			attr_dev(div19, "class", "challenge-details__play-button-container svelte-1tk9whq");
    			add_location(div19, file$7, 109, 2, 2477);
    			attr_dev(div20, "class", "hexagon-bg-layer challenge-details__hexagon-bg-layer svelte-1tk9whq");
    			add_location(div20, file$7, 119, 2, 2724);

    			attr_dev(div21, "class", div21_class_value = "" + (null_to_empty(`challenge-details 
              ${/*mixClass*/ ctx[0]}`) + " svelte-1tk9whq"));

    			add_location(div21, file$7, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div21, anchor);
    			append_dev(div21, div0);
    			mount_component(icon0, div0, null);
    			append_dev(div0, t1);
    			mount_component(arctext0, div0, null);
    			append_dev(div0, t2);
    			mount_component(arctext1, div0, null);
    			append_dev(div21, t3);
    			append_dev(div21, div1);
    			mount_component(arctext2, div1, null);
    			append_dev(div21, t4);
    			append_dev(div21, div4);
    			append_dev(div4, div2);
    			mount_component(icon1, div2, null);
    			append_dev(div4, t5);
    			append_dev(div4, div3);
    			append_dev(div21, t7);
    			append_dev(div21, div17);
    			mount_component(challengeemblem, div17, null);
    			append_dev(div17, t8);
    			append_dev(div17, div16);
    			append_dev(div16, div9);
    			append_dev(div9, div5);
    			append_dev(div9, t10);
    			append_dev(div9, div8);
    			append_dev(div8, div6);
    			append_dev(div8, t12);
    			append_dev(div8, div7);
    			append_dev(div16, t14);
    			append_dev(div16, div15);
    			append_dev(div15, div10);
    			append_dev(div15, t16);
    			append_dev(div15, div14);
    			append_dev(div14, div11);
    			append_dev(div14, t18);
    			append_dev(div14, div13);
    			append_dev(div13, t19);
    			append_dev(div13, div12);
    			append_dev(div21, t21);
    			append_dev(div21, div18);
    			append_dev(div21, t22);
    			append_dev(div21, div19);
    			mount_component(buttonincircle, div19, null);
    			append_dev(div21, t23);
    			append_dev(div21, div20);
    			mount_component(icon2, div20, null);
    			append_dev(div21, t24);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div21, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const arctext0_changes = {};

    			if (dirty & /*$$scope*/ 512) {
    				arctext0_changes.$$scope = { dirty, ctx };
    			}

    			arctext0.$set(arctext0_changes);
    			const arctext1_changes = {};

    			if (dirty & /*$$scope*/ 512) {
    				arctext1_changes.$$scope = { dirty, ctx };
    			}

    			arctext1.$set(arctext1_changes);
    			const arctext2_changes = {};

    			if (dirty & /*$$scope*/ 512) {
    				arctext2_changes.$$scope = { dirty, ctx };
    			}

    			arctext2.$set(arctext2_changes);

    			if (dirty & /*isBlurredWordsInvisible, rotatingBgWordsMatrix, Math*/ 6) {
    				each_value = /*rotatingBgWordsMatrix*/ ctx[2];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div21, outro_and_destroy_block, create_each_block, null, get_each_context);
    				check_outros();
    			}

    			if (!current || dirty & /*mixClass*/ 1 && div21_class_value !== (div21_class_value = "" + (null_to_empty(`challenge-details 
              ${/*mixClass*/ ctx[0]}`) + " svelte-1tk9whq"))) {
    				attr_dev(div21, "class", div21_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon0.$$.fragment, local);
    			transition_in(arctext0.$$.fragment, local);
    			transition_in(arctext1.$$.fragment, local);
    			transition_in(arctext2.$$.fragment, local);
    			transition_in(icon1.$$.fragment, local);
    			transition_in(challengeemblem.$$.fragment, local);
    			transition_in(buttonincircle.$$.fragment, local);
    			transition_in(icon2.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon0.$$.fragment, local);
    			transition_out(arctext0.$$.fragment, local);
    			transition_out(arctext1.$$.fragment, local);
    			transition_out(arctext2.$$.fragment, local);
    			transition_out(icon1.$$.fragment, local);
    			transition_out(challengeemblem.$$.fragment, local);
    			transition_out(buttonincircle.$$.fragment, local);
    			transition_out(icon2.$$.fragment, local);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div21);
    			destroy_component(icon0);
    			destroy_component(arctext0);
    			destroy_component(arctext1);
    			destroy_component(arctext2);
    			destroy_component(icon1);
    			destroy_component(challengeemblem);
    			destroy_component(buttonincircle);
    			destroy_component(icon2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChallengeDetailsHexagon', slots, []);
    	let { class: mixClass } = $$props;
    	let { isBlurredWordsInvisible = false } = $$props;

    	// Data -----------------------------------------------------------------------
    	let localRotatingBgWordsList = [];

    	// Lifecycle hooks ------------------------------------------------------------
    	onMount(() => {
    		$$invalidate(3, localRotatingBgWordsList = shuffleArrayElements(rotatingBgWordsList));
    	});

    	// Computed -------------------------------------------------------------------
    	let rotatingBgWordsMatrix = [];

    	const writable_props = ['class', 'isBlurredWordsInvisible'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChallengeDetailsHexagon> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, mixClass = $$props.class);
    		if ('isBlurredWordsInvisible' in $$props) $$invalidate(1, isBlurredWordsInvisible = $$props.isBlurredWordsInvisible);
    	};

    	$$self.$capture_state = () => ({
    		mixClass,
    		onMount,
    		shuffleArrayElements,
    		isBlurredWordsInvisible,
    		ArcText,
    		ButtonInCircle,
    		ChallengeEmblem,
    		Icon,
    		localRotatingBgWordsList,
    		hexagonSuperellipsIcon,
    		ropeTitleDoubleIcon,
    		timerIcon,
    		rotatingBgWordsList,
    		rotatingBgWordsMatrix
    	});

    	$$self.$inject_state = $$props => {
    		if ('mixClass' in $$props) $$invalidate(0, mixClass = $$props.mixClass);
    		if ('isBlurredWordsInvisible' in $$props) $$invalidate(1, isBlurredWordsInvisible = $$props.isBlurredWordsInvisible);
    		if ('localRotatingBgWordsList' in $$props) $$invalidate(3, localRotatingBgWordsList = $$props.localRotatingBgWordsList);
    		if ('rotatingBgWordsMatrix' in $$props) $$invalidate(2, rotatingBgWordsMatrix = $$props.rotatingBgWordsMatrix);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*localRotatingBgWordsList*/ 8) {
    			{
    				let matrix = [];

    				for (let i = 0, k = -1; i < localRotatingBgWordsList.length; i++) {
    					if (i % Math.ceil(localRotatingBgWordsList.length / 3) === 0) {
    						k++;
    						matrix[k] = [];
    					}

    					matrix[k].push(localRotatingBgWordsList[i]);
    				}

    				$$invalidate(2, rotatingBgWordsMatrix = matrix);
    			}
    		}
    	};

    	return [
    		mixClass,
    		isBlurredWordsInvisible,
    		rotatingBgWordsMatrix,
    		localRotatingBgWordsList
    	];
    }

    class ChallengeDetailsHexagon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { class: 0, isBlurredWordsInvisible: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChallengeDetailsHexagon",
    			options,
    			id: create_fragment$8.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mixClass*/ ctx[0] === undefined && !('class' in props)) {
    			console.warn("<ChallengeDetailsHexagon> was created without expected prop 'class'");
    		}
    	}

    	get class() {
    		throw new Error("<ChallengeDetailsHexagon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<ChallengeDetailsHexagon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isBlurredWordsInvisible() {
    		throw new Error("<ChallengeDetailsHexagon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isBlurredWordsInvisible(value) {
    		throw new Error("<ChallengeDetailsHexagon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/GlobalHeader.svelte generated by Svelte v3.43.0 */

    const file$6 = "src/components/GlobalHeader.svelte";
    const get_rightSection_slot_changes$1 = dirty => ({});
    const get_rightSection_slot_context$1 = ctx => ({});
    const get_middleSection_slot_changes$1 = dirty => ({});
    const get_middleSection_slot_context$1 = ctx => ({});
    const get_leftSection_slot_changes$1 = dirty => ({});
    const get_leftSection_slot_context$1 = ctx => ({});

    function create_fragment$7(ctx) {
    	let t0;
    	let header;
    	let div0;
    	let t1;
    	let div1;
    	let t2;
    	let div2;
    	let header_class_value;
    	let current;
    	const leftSection_slot_template = /*#slots*/ ctx[2].leftSection;
    	const leftSection_slot = create_slot(leftSection_slot_template, ctx, /*$$scope*/ ctx[1], get_leftSection_slot_context$1);
    	const middleSection_slot_template = /*#slots*/ ctx[2].middleSection;
    	const middleSection_slot = create_slot(middleSection_slot_template, ctx, /*$$scope*/ ctx[1], get_middleSection_slot_context$1);
    	const rightSection_slot_template = /*#slots*/ ctx[2].rightSection;
    	const rightSection_slot = create_slot(rightSection_slot_template, ctx, /*$$scope*/ ctx[1], get_rightSection_slot_context$1);

    	const block = {
    		c: function create() {
    			t0 = space();
    			header = element("header");
    			div0 = element("div");
    			if (leftSection_slot) leftSection_slot.c();
    			t1 = space();
    			div1 = element("div");
    			if (middleSection_slot) middleSection_slot.c();
    			t2 = space();
    			div2 = element("div");
    			if (rightSection_slot) rightSection_slot.c();
    			attr_dev(div0, "class", "global-header__left-section svelte-1ei8hem");
    			add_location(div0, file$6, 3, 2, 70);
    			attr_dev(div1, "class", "global-header__middle-section svelte-1ei8hem");
    			add_location(div1, file$6, 7, 2, 163);
    			attr_dev(div2, "class", "global-header__right-section svelte-1ei8hem");
    			add_location(div2, file$6, 11, 2, 258);

    			attr_dev(header, "class", header_class_value = "" + (null_to_empty(`global-header 
                  ${/*mixClass*/ ctx[0]}`) + " svelte-1ei8hem"));

    			add_location(header, file$6, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, header, anchor);
    			append_dev(header, div0);

    			if (leftSection_slot) {
    				leftSection_slot.m(div0, null);
    			}

    			append_dev(header, t1);
    			append_dev(header, div1);

    			if (middleSection_slot) {
    				middleSection_slot.m(div1, null);
    			}

    			append_dev(header, t2);
    			append_dev(header, div2);

    			if (rightSection_slot) {
    				rightSection_slot.m(div2, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (leftSection_slot) {
    				if (leftSection_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						leftSection_slot,
    						leftSection_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(leftSection_slot_template, /*$$scope*/ ctx[1], dirty, get_leftSection_slot_changes$1),
    						get_leftSection_slot_context$1
    					);
    				}
    			}

    			if (middleSection_slot) {
    				if (middleSection_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						middleSection_slot,
    						middleSection_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(middleSection_slot_template, /*$$scope*/ ctx[1], dirty, get_middleSection_slot_changes$1),
    						get_middleSection_slot_context$1
    					);
    				}
    			}

    			if (rightSection_slot) {
    				if (rightSection_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						rightSection_slot,
    						rightSection_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(rightSection_slot_template, /*$$scope*/ ctx[1], dirty, get_rightSection_slot_changes$1),
    						get_rightSection_slot_context$1
    					);
    				}
    			}

    			if (!current || dirty & /*mixClass*/ 1 && header_class_value !== (header_class_value = "" + (null_to_empty(`global-header 
                  ${/*mixClass*/ ctx[0]}`) + " svelte-1ei8hem"))) {
    				attr_dev(header, "class", header_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(leftSection_slot, local);
    			transition_in(middleSection_slot, local);
    			transition_in(rightSection_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(leftSection_slot, local);
    			transition_out(middleSection_slot, local);
    			transition_out(rightSection_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(header);
    			if (leftSection_slot) leftSection_slot.d(detaching);
    			if (middleSection_slot) middleSection_slot.d(detaching);
    			if (rightSection_slot) rightSection_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GlobalHeader', slots, ['leftSection','middleSection','rightSection']);
    	let { class: mixClass } = $$props;
    	const writable_props = ['class'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GlobalHeader> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, mixClass = $$props.class);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ mixClass });

    	$$self.$inject_state = $$props => {
    		if ('mixClass' in $$props) $$invalidate(0, mixClass = $$props.mixClass);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [mixClass, $$scope, slots];
    }

    class GlobalHeader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { class: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GlobalHeader",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mixClass*/ ctx[0] === undefined && !('class' in props)) {
    			console.warn("<GlobalHeader> was created without expected prop 'class'");
    		}
    	}

    	get class() {
    		throw new Error("<GlobalHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<GlobalHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/GlobalFooter.svelte generated by Svelte v3.43.0 */

    const file$5 = "src/components/GlobalFooter.svelte";
    const get_rightSection_slot_changes = dirty => ({});
    const get_rightSection_slot_context = ctx => ({});
    const get_middleSection_slot_changes = dirty => ({});
    const get_middleSection_slot_context = ctx => ({});
    const get_leftSection_slot_changes = dirty => ({});
    const get_leftSection_slot_context = ctx => ({});

    function create_fragment$6(ctx) {
    	let t0;
    	let footer;
    	let div0;
    	let t1;
    	let div1;
    	let t2;
    	let div2;
    	let footer_class_value;
    	let current;
    	const leftSection_slot_template = /*#slots*/ ctx[2].leftSection;
    	const leftSection_slot = create_slot(leftSection_slot_template, ctx, /*$$scope*/ ctx[1], get_leftSection_slot_context);
    	const middleSection_slot_template = /*#slots*/ ctx[2].middleSection;
    	const middleSection_slot = create_slot(middleSection_slot_template, ctx, /*$$scope*/ ctx[1], get_middleSection_slot_context);
    	const rightSection_slot_template = /*#slots*/ ctx[2].rightSection;
    	const rightSection_slot = create_slot(rightSection_slot_template, ctx, /*$$scope*/ ctx[1], get_rightSection_slot_context);

    	const block = {
    		c: function create() {
    			t0 = space();
    			footer = element("footer");
    			div0 = element("div");
    			if (leftSection_slot) leftSection_slot.c();
    			t1 = space();
    			div1 = element("div");
    			if (middleSection_slot) middleSection_slot.c();
    			t2 = space();
    			div2 = element("div");
    			if (rightSection_slot) rightSection_slot.c();
    			attr_dev(div0, "class", "global-footer__left-section svelte-1me5wcs");
    			add_location(div0, file$5, 3, 2, 70);
    			attr_dev(div1, "class", "global-footer__middle-section svelte-1me5wcs");
    			add_location(div1, file$5, 7, 2, 161);
    			attr_dev(div2, "class", "global-footer__right-section svelte-1me5wcs");
    			add_location(div2, file$5, 11, 2, 256);

    			attr_dev(footer, "class", footer_class_value = "" + (null_to_empty(`global-footer 
                  ${/*mixClass*/ ctx[0]}`) + " svelte-1me5wcs"));

    			add_location(footer, file$5, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div0);

    			if (leftSection_slot) {
    				leftSection_slot.m(div0, null);
    			}

    			append_dev(footer, t1);
    			append_dev(footer, div1);

    			if (middleSection_slot) {
    				middleSection_slot.m(div1, null);
    			}

    			append_dev(footer, t2);
    			append_dev(footer, div2);

    			if (rightSection_slot) {
    				rightSection_slot.m(div2, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (leftSection_slot) {
    				if (leftSection_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						leftSection_slot,
    						leftSection_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(leftSection_slot_template, /*$$scope*/ ctx[1], dirty, get_leftSection_slot_changes),
    						get_leftSection_slot_context
    					);
    				}
    			}

    			if (middleSection_slot) {
    				if (middleSection_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						middleSection_slot,
    						middleSection_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(middleSection_slot_template, /*$$scope*/ ctx[1], dirty, get_middleSection_slot_changes),
    						get_middleSection_slot_context
    					);
    				}
    			}

    			if (rightSection_slot) {
    				if (rightSection_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						rightSection_slot,
    						rightSection_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(rightSection_slot_template, /*$$scope*/ ctx[1], dirty, get_rightSection_slot_changes),
    						get_rightSection_slot_context
    					);
    				}
    			}

    			if (!current || dirty & /*mixClass*/ 1 && footer_class_value !== (footer_class_value = "" + (null_to_empty(`global-footer 
                  ${/*mixClass*/ ctx[0]}`) + " svelte-1me5wcs"))) {
    				attr_dev(footer, "class", footer_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(leftSection_slot, local);
    			transition_in(middleSection_slot, local);
    			transition_in(rightSection_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(leftSection_slot, local);
    			transition_out(middleSection_slot, local);
    			transition_out(rightSection_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(footer);
    			if (leftSection_slot) leftSection_slot.d(detaching);
    			if (middleSection_slot) middleSection_slot.d(detaching);
    			if (rightSection_slot) rightSection_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GlobalFooter', slots, ['leftSection','middleSection','rightSection']);
    	let { class: mixClass } = $$props;
    	const writable_props = ['class'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GlobalFooter> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, mixClass = $$props.class);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ mixClass });

    	$$self.$inject_state = $$props => {
    		if ('mixClass' in $$props) $$invalidate(0, mixClass = $$props.mixClass);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [mixClass, $$scope, slots];
    }

    class GlobalFooter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { class: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GlobalFooter",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mixClass*/ ctx[0] === undefined && !('class' in props)) {
    			console.warn("<GlobalFooter> was created without expected prop 'class'");
    		}
    	}

    	get class() {
    		throw new Error("<GlobalFooter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<GlobalFooter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/WeekChallengeSnippet.svelte generated by Svelte v3.43.0 */

    const file$4 = "src/components/WeekChallengeSnippet.svelte";

    function create_fragment$5(ctx) {
    	let t0;
    	let div6;
    	let div0;
    	let t2;
    	let div3;
    	let div1;
    	let icon;
    	let t3;
    	let div2;
    	let t5;
    	let div4;
    	let svg0;
    	let path0;
    	let t6;
    	let div5;
    	let svg1;
    	let path1;
    	let div6_class_value;
    	let current;
    	let mounted;
    	let dispose;

    	icon = new Icon({
    			props: { data: timerIcon },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t0 = space();
    			div6 = element("div");
    			div0 = element("div");
    			div0.textContent = "Weekly Challenge!";
    			t2 = space();
    			div3 = element("div");
    			div1 = element("div");
    			create_component(icon.$$.fragment);
    			t3 = space();
    			div2 = element("div");
    			div2.textContent = "6d 4h";
    			t5 = space();
    			div4 = element("div");
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t6 = space();
    			div5 = element("div");
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			attr_dev(div0, "class", "week-challenge-snippet__title svelte-81ftr9");
    			add_location(div0, file$4, 6, 2, 85);
    			attr_dev(div1, "class", "challenge-timer__icon-container svelte-81ftr9");
    			add_location(div1, file$4, 11, 4, 257);
    			attr_dev(div2, "class", "challenge-timer__text svelte-81ftr9");
    			add_location(div2, file$4, 14, 4, 350);
    			attr_dev(div3, "class", "challenge-timer week-challenge-snippet__challenge-timer svelte-81ftr9");
    			add_location(div3, file$4, 9, 2, 162);
    			attr_dev(path0, "d", "M509.705,85.4L498.743,30.475c-3.331-15.585-19.369-27.909-35.906-27.909H49.162c-16.537,0-32.575,12.323-35.9,27.909L2.3,85.4H-0.031L11.229,28.82C14.587,13.06,30.76.6,47.434,0.6H464.566c16.674,0,32.847,12.462,36.205,28.223L512.031,85.4h-2.326Z");
    			add_location(path0, file$4, 21, 6, 530);
    			attr_dev(svg0, "width", "512");
    			attr_dev(svg0, "height", "86");
    			attr_dev(svg0, "viewBox", "0 0 512 86");
    			add_location(svg0, file$4, 20, 4, 473);
    			attr_dev(div4, "class", "week-challenge-snippet__bg-layer1 svelte-81ftr9");
    			add_location(div4, file$4, 19, 2, 421);
    			attr_dev(path1, "d", "M-0.031,85.4L11.229,28.82C14.587,13.06,30.76.6,47.434,0.6H464.566c16.674,0,32.847,12.462,36.205,28.223L512.031,85.4H-0.031Z");
    			add_location(path1, file$4, 26, 6, 914);
    			attr_dev(svg1, "width", "512");
    			attr_dev(svg1, "height", "86");
    			attr_dev(svg1, "viewBox", "0 0 512 86");
    			add_location(svg1, file$4, 25, 4, 857);
    			attr_dev(div5, "class", "week-challenge-snippet__bg-layer2 svelte-81ftr9");
    			add_location(div5, file$4, 24, 2, 805);

    			attr_dev(div6, "class", div6_class_value = "" + (null_to_empty(`week-challenge-snippet 
            ${/*mixClass*/ ctx[0]}`) + " svelte-81ftr9"));

    			add_location(div6, file$4, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div0);
    			append_dev(div6, t2);
    			append_dev(div6, div3);
    			append_dev(div3, div1);
    			mount_component(icon, div1, null);
    			append_dev(div3, t3);
    			append_dev(div3, div2);
    			append_dev(div6, t5);
    			append_dev(div6, div4);
    			append_dev(div4, svg0);
    			append_dev(svg0, path0);
    			append_dev(div6, t6);
    			append_dev(div6, div5);
    			append_dev(div5, svg1);
    			append_dev(svg1, path1);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div6, "click", /*click_handler*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*mixClass*/ 1 && div6_class_value !== (div6_class_value = "" + (null_to_empty(`week-challenge-snippet 
            ${/*mixClass*/ ctx[0]}`) + " svelte-81ftr9"))) {
    				attr_dev(div6, "class", div6_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div6);
    			destroy_component(icon);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('WeekChallengeSnippet', slots, []);
    	let { class: mixClass } = $$props;
    	const writable_props = ['class'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<WeekChallengeSnippet> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, mixClass = $$props.class);
    	};

    	$$self.$capture_state = () => ({
    		mixClass,
    		ButtonInCircle,
    		Icon,
    		timerIcon
    	});

    	$$self.$inject_state = $$props => {
    		if ('mixClass' in $$props) $$invalidate(0, mixClass = $$props.mixClass);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [mixClass, click_handler];
    }

    class WeekChallengeSnippet extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { class: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WeekChallengeSnippet",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mixClass*/ ctx[0] === undefined && !('class' in props)) {
    			console.warn("<WeekChallengeSnippet> was created without expected prop 'class'");
    		}
    	}

    	get class() {
    		throw new Error("<WeekChallengeSnippet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<WeekChallengeSnippet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var handGestureIcon = "﻿<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"375\" viewBox=\"0 0 512 375\">\n   <path d=\"M488.255,340.683c-21.673,24.393-94.406,35.913-116.732,33.622-24.546-2.523-58.105-26.663-108.546-64.856-1.9-1.43-3.634-2.86-5.282-4.264l-65.032-40.972a27.669,27.669,0,0,1-9.033-38.047c0.076-.124.153-0.247,0.23-0.369a28.387,28.387,0,0,1,38.956-8.324l63.79,40.189c28.452,9.944,18.855-39.582,10.938-62.816a28.108,28.108,0,0,1-1.587-3.962l-46.7-158.2a25.184,25.184,0,0,1,17.15-31.2c0.128-.037.255-0.073,0.384-0.108a26.1,26.1,0,0,1,31.976,17.552l41.382,140.1-5.984-45.5a25.164,25.164,0,0,1,20.39-29.156c0.166-.029.333-0.057,0.5-0.083a26.025,26.025,0,0,1,29.888,20.834l9.829,44.612-1.306-24.917a25.2,25.2,0,0,1,21.625-28.309q0.235-.031.471-0.058a25.981,25.981,0,0,1,29,22l6.037,28.779-0.047-4.936a22.822,22.822,0,0,1,20.532-24.9c0.126-.012.253-0.023,0.379-0.033a23.463,23.463,0,0,1,25.522,20.8l9.832,38.124c0.151,1.388,3.571,18.327,3.444,19.674C513.982,244.375,507.681,318.807,488.255,340.683ZM355.04,192.546a53.936,53.936,0,0,0-9.473-22.213c2.373,15.053,5.608,31.589,8.357,46.334A53.876,53.876,0,0,0,355.04,192.546Zm53.081-7.237a53.88,53.88,0,0,0-7.382-23c0.976,15.2,2.669,31.97,4.045,46.908a53.88,53.88,0,0,0,3.339-23.91h0Zm53.415-1.075a53.888,53.888,0,0,0-6.221-23.334c0.213,15.237,1.063,32.068,1.687,47.049a53.857,53.857,0,0,0,4.536-23.714h0ZM226.805,85.374C146.194,109.7,78.367,173.325,51.643,255.444q-3.486,10.7-5.989,21.694l-0.473-.165h0L0.721,261.43q0.777-3.183,1.628-6.35l0,0c0.088-.33.188-0.656,0.277-0.986q0.773-2.857,1.6-5.7,0.306-1.051.622-2.1,0.788-2.64,1.629-5.266c0.181-.563.353-1.129,0.536-1.692q1.1-3.4,2.284-6.776c0.155-.44.318-0.878,0.474-1.318q0.982-2.754,2.012-5.492,0.383-1.014.773-2.023,1.015-2.637,2.081-5.253c0.206-.509.407-1.018,0.617-1.525q1.372-3.314,2.818-6.6c0.21-.476.429-0.949,0.642-1.425q1.166-2.605,2.381-5.193,0.47-1,.948-2,1.228-2.564,2.507-5.105c0.185-.363.354-0.733,0.54-1.1l0.467-.917c0.523-1.026,1.07-2.042,1.607-3.061,0.382-.725.754-1.454,1.142-2.176,0.491-.913,1-1.817,1.5-2.734,0.459-.834.909-1.671,1.38-2.5,0.535-.948,1.088-1.888,1.633-2.832,0.451-.78.893-1.566,1.351-2.343q1.523-2.572,3.093-5.12C76.694,110.012,140.529,61.748,212.078,39.948l0.928-.279h0Q219.906,62.516,226.805,85.374Z\"/>\n</svg>";

    var magicIcon = "﻿<svg width=\"512\" height=\"512\" viewBox=\"0 0 512 512\">\n   <path d=\"M83.12,390.769l8.551-27.526,16.645,23.544,28.843-.371-17.265,23.1,9.265,27.3-27.3-9.257L78.776,444.8l0.362-28.834L55.586,399.328ZM352.712,61.919L372.9,36.4l7.95,31.521,30.488,11.315L383.817,96.547l-1.349,32.5-24.957-20.831-31.3,8.762L338.3,86.8l-18-27.044ZM18.488,232.487l4.18-18.185,11.862,14.375L53.1,227.051l-10,15.733,7.295,17.17L32.337,255.3,18.256,267.524l-1.127-18.607-15.983-9.6ZM243.6,389.312l4.181-18.184L259.646,385.5l18.572-1.626-10,15.734,7.295,17.169-18.056-4.654-14.081,12.224-1.127-18.607-15.983-9.6ZM411.941,188.241l-15.109-39.674,40.677,12.145,33.077-26.646,1,42.44,35.57,23.212-40.054,14.106L456.016,254.8l-25.773-33.754L387.848,223.2Zm-35.758,69.7,12.454-13.819,3.391,18.29,17,7.572-16.352,8.882-1.962,18.5-13.491-12.813-18.206,3.866,8.023-16.8-9.319-16.111Zm89,32.255,33.89-12.647-10.636,34.591,22.419,28.289-36.094.581-20.007,30.076-11.739-34.173-34.769-9.683L437.13,305.5l-1.55-36.08ZM51.724,328.467l19.587-7.3L65.16,341.147l12.98,16.334-20.86.319L45.72,375.176l-6.771-19.742-20.094-5.591L35.543,337.3l-0.886-20.843ZM320.031,158.4l25.274-22.333,2.328,33.636,29.054,17.137-31.259,12.631-7.32,32.906-21.672-25.839-33.56,3.207,17.879-28.57-13.426-30.953ZM95.348,110.507l29.636-26.2,2.757,39.454,34.066,20.117-36.682,14.807L116.546,197.3l-25.41-30.315-39.392,3.753,20.965-33.514-15.733-36.3Zm77.164,337.545,12.473-28.8,15.26,27.44,31.242,2.96-21.358,23.01,6.83,30.64-28.464-13.238-27.037,15.974,3.785-31.157-23.552-20.8Zm-70.734-198.1,31.444-18.6-4.381,36.253,27.39,24.158-35.826,7.05-14.5,33.517-17.758-31.9L51.785,297l24.837-26.754L68.658,234.6Zm198.4,187.51,22.168-27.9,8.648,34.551L364.4,456.576l-30.2,18.93L332.685,511.1l-27.313-22.866-34.328,9.548,13.3-33.04-19.693-29.708ZM182.519,328.6l28.152-12.269-7.4,29.811,20.371,22.994-30.64,2.178-15.554,26.474-11.537-28.462-30-6.627,23.5-19.758-2.969-30.585ZM255.634,41.065l48.993-.318-29.546,39.08,15.439,46.5L244.208,110.3,204.78,139.369l0.954-48.993L165.886,61.829,212.748,47.6,227.606,0.9ZM186.448,209.731a8.557,8.557,0,0,0,.172,11.922l33.269,31.337,18.782-18.781q-15.663-16.629-31.326-33.258a8.468,8.468,0,0,0-11.814-.3C192.484,203.659,189.476,206.7,186.448,209.731Zm-5.727-24.278c11.26-10.842,31.078-10.576,42.019.894l45.5,48.3-47.907,47.906c-16.192-15.251-32.478-30.4-48.574-45.755-11.078-10.839-11.57-30.393-.624-41.762Q175.9,190.216,180.721,185.453ZM439.061,412.91a22.957,22.957,0,0,1-.377,32.078c-2.639,2.639-5.377,5.376-8.016,8.016a22.956,22.956,0,0,1-32.077.377l-161.9-154.462,47.906-47.9Z\"/>\n</svg>";

    var blastIcon = "﻿<svg width=\"512\" height=\"495\" viewBox=\"0 0 512 495\">\n   <path d=\"M509.642,224.147a79.718,79.718,0,0,1-94.7,61.173l-84.786-18.238a29.047,29.047,0,0,1-15.639-47.655L372,154.492a79.724,79.724,0,0,1,135.441,27.991,0.038,0.038,0,0,1,.008.029A79.738,79.738,0,0,1,509.642,224.147Zm-46.28-27.16-0.007-.03a33.329,33.329,0,0,0-56.611-11.7l-37.806,42.7,55.758,12A33.322,33.322,0,0,0,463.362,196.987Zm-182.325-1.723a29.045,29.045,0,0,1-50.152.147c-12.47-21.185-28.21-47.93-43.989-74.743A79.729,79.729,0,0,1,255.367.5a0.043,0.043,0,0,1,.034,0,79.725,79.725,0,0,1,69.18,119.758C308.959,147.165,293.381,174,281.037,195.264ZM255.531,46.9H255.5A33.324,33.324,0,0,0,226.888,97.13l28.927,49.151,28.629-49.323A33.325,33.325,0,0,0,255.531,46.9ZM195.306,260.8a29.05,29.05,0,0,1-13.11,6.729l-84.672,18.74A79.729,79.729,0,0,1,4.4,184.006a0.148,0.148,0,0,1,.009-0.03,79.723,79.723,0,0,1,135.272-28.792l57.873,64.594A29.05,29.05,0,0,1,195.306,260.8Zm-90.183-74.646a33.318,33.318,0,0,0-56.536,12.037l-0.01.03A33.321,33.321,0,0,0,87.5,240.953l55.684-12.322Zm10.636,155.686,79.315-35.083a29.049,29.049,0,0,1,40.659,29.361c-2.365,24.472-5.351,55.357-8.345,86.328A79.723,79.723,0,0,1,101.364,479.41l-0.024-.019A79.726,79.726,0,0,1,115.759,341.835Zm12.746,99.928,0.026,0.019a33.32,33.32,0,0,0,52.674-23.806l5.483-56.772-52.16,23.069A33.322,33.322,0,0,0,128.505,441.763Zm189-135.376L397.03,341a79.726,79.726,0,0,1,15.233,137.466l-0.026.019a79.723,79.723,0,0,1-126.359-56.221c-3.176-30.953-6.344-61.82-8.854-86.277A29.044,29.044,0,0,1,317.509,306.387Zm14.536,111.14a33.32,33.32,0,0,0,52.806,23.5l0.026-.018a33.323,33.323,0,0,0-6.367-57.454l-52.294-22.762Z\"/>\n</svg>";

    var seaStarIcon = "﻿<svg width=\"512\" height=\"481\" viewBox=\"0 0 512 481\">\n   <path d=\"M507.592,214.225a11.5,11.5,0,0,1-14.1,2.283,44.247,44.247,0,0,0-24.274-5.817c-18.626,1.077-31.758,11.432-42.827,35.014-17.258,36.768-55.285,56.214-92.408,57.511h0a12.251,12.251,0,0,0-7,21.978c11.161,7.692,23.818,13.764,35.7,16.5,27.139,6.247,43.226,15.5,52.873,30.952s12.994,31.359,8.587,49.284a71.676,71.676,0,0,1-6.754,17.274,11.506,11.506,0,0,1-21.873-4.834,44.375,44.375,0,0,0-7.1-23.95c-10.245-15.607-25.771-21.813-51.71-19.617-40.44,3.424-76.278-19.816-95.963-51.346a0,0,0,0,1,0,0,12.235,12.235,0,0,0-22.518,4.919c-1.075,13.521,0,27.529,3.574,39.191,8.165,26.648,8.2,45.219-.343,61.308s-20.636,26.943-38.348,32.085a71.544,71.544,0,0,1-18.322,2.783,11.519,11.519,0,0,1-6.755-21.377,44.32,44.32,0,0,0,17.17-18.133c8.38-16.684,5.988-33.246-8.882-54.632-23.183-33.343-21-76.029-3.555-108.858a0.008,0.008,0,0,1,0,0,12.245,12.245,0,0,0-15.516-17.059c-12.236,5.829-23.818,13.765-32.122,22.693-18.974,20.4-35.022,29.721-53.216,30.357s-33.63-4.417-46.935-17.2A71.639,71.639,0,0,1,3.392,281.036,11.513,11.513,0,0,1,18.51,264.492a44.249,44.249,0,0,0,24.275,5.817c18.625-1.076,31.759-11.432,42.828-35.014,17.258-36.768,55.284-56.214,92.407-57.511h0a12.251,12.251,0,0,0,7-21.979c-11.161-7.692-23.818-13.764-35.695-16.5-27.14-6.247-43.227-15.5-52.874-30.951S83.463,77,87.869,59.072A71.7,71.7,0,0,1,94.623,41.8,11.506,11.506,0,0,1,116.5,46.632a44.355,44.355,0,0,0,7.1,23.95C133.846,86.189,149.372,92.4,175.31,90.2c40.44-3.424,76.279,19.816,95.963,51.347a0,0,0,0,1,0,0,12.235,12.235,0,0,0,22.518-4.919c1.075-13.521,0-27.528-3.574-39.19-8.164-26.649-8.2-45.22.343-61.309S311.2,9.187,328.909,4.045a71.557,71.557,0,0,1,18.323-2.782,11.519,11.519,0,0,1,6.754,21.377,44.31,44.31,0,0,0-17.17,18.134c-8.38,16.683-5.987,33.245,8.882,54.632,23.183,33.343,21,76.028,3.556,108.857l0,0a12.244,12.244,0,0,0,15.515,17.059C377,215.5,388.585,207.56,396.889,198.631c18.974-20.4,35.022-29.721,53.217-30.357s33.628,4.417,46.934,17.2a71.617,71.617,0,0,1,11.568,14.492A11.526,11.526,0,0,1,507.592,214.225Zm-336-11.171a18.3,18.3,0,1,0,7.562,24.758A18.291,18.291,0,0,0,171.593,203.054Zm2.523,111.266a17.845,17.845,0,1,0,24.128-7.384A17.874,17.874,0,0,0,174.116,314.32ZM223.48,120.083a20.42,20.42,0,1,0,8.438,27.623A20.407,20.407,0,0,0,223.48,120.083ZM260.344,185a31.642,31.642,0,1,0,13.074,42.8A31.619,31.619,0,0,0,260.344,185Zm6.451,83.029A23.926,23.926,0,1,0,276.68,300.4,23.909,23.909,0,0,0,266.8,268.033Zm13.239,73a15.6,15.6,0,1,0,21.1-6.457A15.628,15.628,0,0,0,280.034,341.028ZM326.6,168.221a19.253,19.253,0,1,0,7.955,26.043A19.238,19.238,0,0,0,326.6,168.221Zm23.933,71.227a22.92,22.92,0,1,0,9.471,31A22.9,22.9,0,0,0,350.534,239.448Z\"/>\n</svg>";

    var starsRowIcon = "﻿<svg width=\"512\" height=\"421\" viewBox=\"0 0 512 421\">\n   <path d=\"M390.83,285.44l26.409,126.7-12,2.4-27.6-133.306L504.807,166.068,512,174.717ZM386.2,412.766l-11.705,2.347-29.282-143.14,118.1-107.765,7.816,8.7L357.887,276.176ZM358.132,421L221.2,343.05,84.275,421l32.344-154.168L0,160.794,156.5,143.47,221.2,0l5.261,11.9,59.442,131.57,156.5,17.324L325.788,266.832Zm57.193-251.321L277.632,154.466,221.2,28.618,164.774,154.466,27.082,169.679l102.336,92.939L101.571,397.8,221.2,329.418,340.836,397.8,312.989,262.618ZM317.944,366L221.5,310.8,125.046,366l22.128-109.1L64.909,181.881l110.633-12.268L221.5,68.072l45.953,101.541L378.08,181.881,295.815,256.9ZM273.146,8.7l10.8-4.8,58.792,129.945-10.8,4.8Zm26.115,126.821L242.642,8.8l10.733-4.79,56.619,126.724Z\"/>\n</svg>";

    /* src/pages/AllChapters.svelte generated by Svelte v3.43.0 */
    const file$3 = "src/pages/AllChapters.svelte";

    // (22:4) 
    function create_leftSection_slot$3(ctx) {
    	let div4;
    	let div0;
    	let icon;
    	let t0;
    	let div3;
    	let div1;
    	let t2;
    	let div2;
    	let div4_class_value;
    	let current;

    	icon = new Icon({
    			props: { data: starsRowIcon },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			create_component(icon.$$.fragment);
    			t0 = space();
    			div3 = element("div");
    			div1 = element("div");
    			div1.textContent = "Total Stars";
    			t2 = space();
    			div2 = element("div");
    			div2.textContent = "110";
    			attr_dev(div0, "class", "stars-counter__icon svelte-1dmx748");
    			add_location(div0, file$3, 29, 6, 895);
    			attr_dev(div1, "class", "stars-counter__title svelte-1dmx748");
    			add_location(div1, file$3, 34, 8, 1034);
    			attr_dev(div2, "class", "stars-counter__number svelte-1dmx748");
    			add_location(div2, file$3, 37, 8, 1114);
    			attr_dev(div3, "class", "stars-counter__right-side");
    			add_location(div3, file$3, 33, 6, 986);

    			attr_dev(div4, "class", div4_class_value = "" + (null_to_empty(`stars-counter 
                all-chapters-page__stars-counter 
                ${(/*$transitionTo*/ ctx[6] === 'WeekChallenge' || /*$transitionTo*/ ctx[6] === 'Chapter') && 'all-chapters-page__stars-counter--invisible'}
                ${!/*isPageLoaded*/ ctx[0] && 'all-chapters-page__stars-counter--invisible'}`) + " svelte-1dmx748"));

    			attr_dev(div4, "slot", "leftSection");
    			add_location(div4, file$3, 21, 4, 509);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			mount_component(icon, div0, null);
    			append_dev(div4, t0);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*$transitionTo, isPageLoaded*/ 65 && div4_class_value !== (div4_class_value = "" + (null_to_empty(`stars-counter 
                all-chapters-page__stars-counter 
                ${(/*$transitionTo*/ ctx[6] === 'WeekChallenge' || /*$transitionTo*/ ctx[6] === 'Chapter') && 'all-chapters-page__stars-counter--invisible'}
                ${!/*isPageLoaded*/ ctx[0] && 'all-chapters-page__stars-counter--invisible'}`) + " svelte-1dmx748"))) {
    				attr_dev(div4, "class", div4_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_component(icon);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_leftSection_slot$3.name,
    		type: "slot",
    		source: "(22:4) ",
    		ctx
    	});

    	return block;
    }

    // (78:4) 
    function create_middleSection_slot(ctx) {
    	let weekchallengesnippet;
    	let current;

    	weekchallengesnippet = new WeekChallengeSnippet({
    			props: {
    				class: `all-chapters-page__week-challenge-snippet 
                  ${(/*$transitionFrom*/ ctx[5] === 'WeekChallenge' || /*$transitionTo*/ ctx[6] === 'WeekChallenge') && 'all-chapters-page__week-challenge-snippet--on-the-page-top'}
                  ${(/*$transitionFrom*/ ctx[5] === 'WeekChallenge' || /*$transitionFrom*/ ctx[5] === 'Chapter' && !/*isPageLoaded*/ ctx[0] || /*$transitionTo*/ ctx[6] === 'Chapter' || /*$transitionTo*/ ctx[6] === 'WeekChallenge') && 'all-chapters-page__week-challenge-snippet--invisible'}`,
    				slot: "middleSection"
    			},
    			$$inline: true
    		});

    	weekchallengesnippet.$on("click", /*handleWeeklyChallengeClick*/ ctx[9]);

    	const block = {
    		c: function create() {
    			create_component(weekchallengesnippet.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(weekchallengesnippet, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const weekchallengesnippet_changes = {};

    			if (dirty & /*$transitionFrom, $transitionTo, isPageLoaded*/ 97) weekchallengesnippet_changes.class = `all-chapters-page__week-challenge-snippet 
                  ${(/*$transitionFrom*/ ctx[5] === 'WeekChallenge' || /*$transitionTo*/ ctx[6] === 'WeekChallenge') && 'all-chapters-page__week-challenge-snippet--on-the-page-top'}
                  ${(/*$transitionFrom*/ ctx[5] === 'WeekChallenge' || /*$transitionFrom*/ ctx[5] === 'Chapter' && !/*isPageLoaded*/ ctx[0] || /*$transitionTo*/ ctx[6] === 'Chapter' || /*$transitionTo*/ ctx[6] === 'WeekChallenge') && 'all-chapters-page__week-challenge-snippet--invisible'}`;

    			weekchallengesnippet.$set(weekchallengesnippet_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(weekchallengesnippet.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(weekchallengesnippet.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(weekchallengesnippet, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_middleSection_slot.name,
    		type: "slot",
    		source: "(78:4) ",
    		ctx
    	});

    	return block;
    }

    // (92:4) 
    function create_rightSection_slot$2(ctx) {
    	let buttonincircle;
    	let current;

    	buttonincircle = new ButtonInCircle({
    			props: {
    				class: "all-chapters-page__settings-button",
    				id: "optionsButton",
    				slot: "rightSection",
    				iconName: "gear",
    				backwardsGradient: true,
    				isTextOnTop: true
    			},
    			$$inline: true
    		});

    	buttonincircle.$on("click", /*handleSettingsButtonClick*/ ctx[7]);

    	const block = {
    		c: function create() {
    			create_component(buttonincircle.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(buttonincircle, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(buttonincircle.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(buttonincircle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(buttonincircle, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_rightSection_slot$2.name,
    		type: "slot",
    		source: "(92:4) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let t0;
    	let div2;
    	let div0;
    	let chaptercard;
    	let div0_class_value;
    	let t1;
    	let globalheader;
    	let t2;
    	let div1;
    	let challengebadgeslist;
    	let t3;
    	let challengedetailshexagon;
    	let div1_class_value;
    	let t4;
    	let cardscarousel;
    	let t5;
    	let globalfooter;
    	let current;

    	chaptercard = new ChapterCard({
    			props: {
    				class: "all-chapters-page__chapter-card",
    				card: /*currentChapter*/ ctx[4],
    				isClicked: false,
    				positionCoeff: 0,
    				isOnlyFaceNChapterVisible: true
    			},
    			$$inline: true
    		});

    	globalheader = new GlobalHeader({
    			props: {
    				class: "main-header \n            all-chapters-page__main-header",
    				$$slots: { leftSection: [create_leftSection_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	challengebadgeslist = new ChallengeBadgesList({
    			props: {
    				class: `weekly-challenge-container__badges-vertical-list`
    			},
    			$$inline: true
    		});

    	challengedetailshexagon = new ChallengeDetailsHexagon({
    			props: {
    				class: `weekly-challenge-container__challenge-details`,
    				isBlurredWordsInvisible: true
    			},
    			$$inline: true
    		});

    	cardscarousel = new CardsCarousel({
    			props: {
    				class: `all-chapters-page__cards-carousel 
              ${(!/*isPageLoaded*/ ctx[0] || /*$transitionTo*/ ctx[6] === 'WeekChallenge' || /*$transitionTo*/ ctx[6] === 'Chapter' || /*isCardsCarouselInvisible*/ ctx[2]) && 'all-chapters-page__cards-carousel--invisible'}
              ${/*$transitionFrom*/ ctx[5] === 'WeekChallenge' && 'all-chapters-page__cards-carousel--delayed-transition'}`,
    				isScrollingBlocked: /*isCarouselScrollingBlocked*/ ctx[1]
    			},
    			$$inline: true
    		});

    	cardscarousel.$on("cardClick", /*cardClick_handler*/ ctx[12]);

    	globalfooter = new GlobalFooter({
    			props: {
    				class: "all-chapters-page__main-footer",
    				$$slots: {
    					rightSection: [create_rightSection_slot$2],
    					middleSection: [create_middleSection_slot]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t0 = space();
    			div2 = element("div");
    			div0 = element("div");
    			create_component(chaptercard.$$.fragment);
    			t1 = space();
    			create_component(globalheader.$$.fragment);
    			t2 = space();
    			div1 = element("div");
    			create_component(challengebadgeslist.$$.fragment);
    			t3 = space();
    			create_component(challengedetailshexagon.$$.fragment);
    			t4 = space();
    			create_component(cardscarousel.$$.fragment);
    			t5 = space();
    			create_component(globalfooter.$$.fragment);

    			attr_dev(div0, "class", div0_class_value = "" + (null_to_empty(`all-chapters-page__card-container 
                ${/*isCardFacesVisible*/ ctx[3] && 'all-chapters-page__card-container--visible'}`) + " svelte-1dmx748"));

    			add_location(div0, file$3, 3, 2, 41);

    			attr_dev(div1, "class", div1_class_value = "" + (null_to_empty(`weekly-challenge-container 
                  all-chapters-page__weekly-challenge-container 
                  ${(/*$transitionTo*/ ctx[6] === 'WeekChallenge' || /*$transitionFrom*/ ctx[5] === 'WeekChallenge') && 'all-chapters-page__weekly-challenge-container--inside-viewport'}`) + " svelte-1dmx748"));

    			add_location(div1, file$3, 48, 4, 1299);
    			attr_dev(div2, "class", "all-chapters-page svelte-1dmx748");
    			add_location(div2, file$3, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			mount_component(chaptercard, div0, null);
    			append_dev(div2, t1);
    			mount_component(globalheader, div2, null);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			mount_component(challengebadgeslist, div1, null);
    			append_dev(div1, t3);
    			mount_component(challengedetailshexagon, div1, null);
    			append_dev(div2, t4);
    			mount_component(cardscarousel, div2, null);
    			append_dev(div2, t5);
    			mount_component(globalfooter, div2, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const chaptercard_changes = {};
    			if (dirty & /*currentChapter*/ 16) chaptercard_changes.card = /*currentChapter*/ ctx[4];
    			chaptercard.$set(chaptercard_changes);

    			if (!current || dirty & /*isCardFacesVisible*/ 8 && div0_class_value !== (div0_class_value = "" + (null_to_empty(`all-chapters-page__card-container 
                ${/*isCardFacesVisible*/ ctx[3] && 'all-chapters-page__card-container--visible'}`) + " svelte-1dmx748"))) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			const globalheader_changes = {};

    			if (dirty & /*$$scope, $transitionTo, isPageLoaded*/ 16449) {
    				globalheader_changes.$$scope = { dirty, ctx };
    			}

    			globalheader.$set(globalheader_changes);

    			if (!current || dirty & /*$transitionTo, $transitionFrom*/ 96 && div1_class_value !== (div1_class_value = "" + (null_to_empty(`weekly-challenge-container 
                  all-chapters-page__weekly-challenge-container 
                  ${(/*$transitionTo*/ ctx[6] === 'WeekChallenge' || /*$transitionFrom*/ ctx[5] === 'WeekChallenge') && 'all-chapters-page__weekly-challenge-container--inside-viewport'}`) + " svelte-1dmx748"))) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			const cardscarousel_changes = {};

    			if (dirty & /*isPageLoaded, $transitionTo, isCardsCarouselInvisible, $transitionFrom*/ 101) cardscarousel_changes.class = `all-chapters-page__cards-carousel 
              ${(!/*isPageLoaded*/ ctx[0] || /*$transitionTo*/ ctx[6] === 'WeekChallenge' || /*$transitionTo*/ ctx[6] === 'Chapter' || /*isCardsCarouselInvisible*/ ctx[2]) && 'all-chapters-page__cards-carousel--invisible'}
              ${/*$transitionFrom*/ ctx[5] === 'WeekChallenge' && 'all-chapters-page__cards-carousel--delayed-transition'}`;

    			if (dirty & /*isCarouselScrollingBlocked*/ 2) cardscarousel_changes.isScrollingBlocked = /*isCarouselScrollingBlocked*/ ctx[1];
    			cardscarousel.$set(cardscarousel_changes);
    			const globalfooter_changes = {};

    			if (dirty & /*$$scope, $transitionFrom, $transitionTo, isPageLoaded*/ 16481) {
    				globalfooter_changes.$$scope = { dirty, ctx };
    			}

    			globalfooter.$set(globalfooter_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(chaptercard.$$.fragment, local);
    			transition_in(globalheader.$$.fragment, local);
    			transition_in(challengebadgeslist.$$.fragment, local);
    			transition_in(challengedetailshexagon.$$.fragment, local);
    			transition_in(cardscarousel.$$.fragment, local);
    			transition_in(globalfooter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(chaptercard.$$.fragment, local);
    			transition_out(globalheader.$$.fragment, local);
    			transition_out(challengebadgeslist.$$.fragment, local);
    			transition_out(challengedetailshexagon.$$.fragment, local);
    			transition_out(cardscarousel.$$.fragment, local);
    			transition_out(globalfooter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div2);
    			destroy_component(chaptercard);
    			destroy_component(globalheader);
    			destroy_component(challengebadgeslist);
    			destroy_component(challengedetailshexagon);
    			destroy_component(cardscarousel);
    			destroy_component(globalfooter);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let currentChapter;
    	let $chaptersList;
    	let $transitionFrom;
    	let $selectedChapterId;
    	let $transitionTo;
    	validate_store(chaptersList, 'chaptersList');
    	component_subscribe($$self, chaptersList, $$value => $$invalidate(10, $chaptersList = $$value));
    	validate_store(transitionFrom, 'transitionFrom');
    	component_subscribe($$self, transitionFrom, $$value => $$invalidate(5, $transitionFrom = $$value));
    	validate_store(selectedChapterId, 'selectedChapterId');
    	component_subscribe($$self, selectedChapterId, $$value => $$invalidate(11, $selectedChapterId = $$value));
    	validate_store(transitionTo, 'transitionTo');
    	component_subscribe($$self, transitionTo, $$value => $$invalidate(6, $transitionTo = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AllChapters', slots, []);

    	const cardMainIcons = {
    		handGestureIcon,
    		magicIcon,
    		blastIcon,
    		seaStarIcon
    	};

    	let isPageLoaded = false;
    	let isCarouselScrollingBlocked = true;
    	let isCardsCarouselInvisible = false;
    	let isCardFacesVisible = false;

    	// Lifecycle hooks ------------------------------------------------------------
    	onMount(() => {
    		if ($transitionFrom === 'WeekChallenge') {
    			$$invalidate(2, isCardsCarouselInvisible = true);
    			setTimeout(() => $$invalidate(2, isCardsCarouselInvisible = false), 600);
    		}

    		setTimeout(() => $$invalidate(0, isPageLoaded = true), 300);
    		setTimeout(() => $$invalidate(1, isCarouselScrollingBlocked = false), 600);
    		setTimeout(() => transitionFrom.update(() => ''), 300);
    		transitionTo.update(() => '');
    		$$invalidate(3, isCardFacesVisible = $transitionFrom === 'Chapter');
    		setTimeout(() => $$invalidate(3, isCardFacesVisible = false), 700);
    	});

    	onDestroy(() => {
    		transitionFrom.update(() => 'AllChapters');
    	});

    	// Methods --------------------------------------------------------------------
    	function handleSettingsButtonClick() {
    		dispatchIosEvent({ 'tapped': 'OWJSMsgPlayClickSound' });
    		transitionFrom.update(() => 'AllChapters');
    		setTimeout(() => transitionTo.update(() => 'Settings'), 0);
    		setTimeout(() => push('/settings'), 400);
    	}

    	function handleCardClick(cardId) {
    		setTimeout(() => transitionFrom.update(() => 'AllChapters'), 50);
    		const isCardLocked = $chaptersList.find(item => item.id === cardId).isLocked;
    		const isCardUnlockable = $chaptersList.find(item => item.id === cardId).isUnlockable;

    		if (!isCardLocked && !isCardUnlockable) {
    			setTimeout(() => $$invalidate(3, isCardFacesVisible = true), 350);
    		}

    		if (isCardLocked && isCardUnlockable) {
    			const currentCardIndex = $chaptersList.findIndex(item => item.id === cardId);
    			const newChaptersList = JSON.parse(JSON.stringify($chaptersList));
    			newChaptersList[currentCardIndex].isLocked = false;
    			newChaptersList[currentCardIndex].isUnlockable = false;
    			chaptersList.update(() => newChaptersList);
    			return;
    		}

    		if ($chaptersList.find(item => item.id === cardId).isLocked) {
    			return;
    		}

    		setTimeout(() => transitionTo.update(() => 'Chapter'), 250);
    		selectedChapterId.update(() => cardId);
    		setTimeout(() => push('/chapters/' + cardId), 500);
    	}

    	function handleWeeklyChallengeClick() {
    		setTimeout(() => transitionTo.update(() => 'WeekChallenge'), 250);
    		setTimeout(() => push('/weekly-challenge'), 1200);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AllChapters> was created with unknown prop '${key}'`);
    	});

    	const cardClick_handler = event => handleCardClick(event.detail.activeCardId);

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		push,
    		ButtonInCircle,
    		CardsCarousel,
    		ChallengeBadgesList,
    		ChallengeDetailsHexagon,
    		ChapterCard,
    		GlobalHeader,
    		GlobalFooter,
    		Icon,
    		WeekChallengeSnippet,
    		handGestureIcon,
    		magicIcon,
    		blastIcon,
    		seaStarIcon,
    		starsRowIcon,
    		cardMainIcons,
    		isPageLoaded,
    		isCarouselScrollingBlocked,
    		isCardsCarouselInvisible,
    		isCardFacesVisible,
    		chaptersList,
    		selectedChapterId,
    		transitionFrom,
    		transitionTo,
    		dispatchIosEvent,
    		handleSettingsButtonClick,
    		handleCardClick,
    		handleWeeklyChallengeClick,
    		currentChapter,
    		$chaptersList,
    		$transitionFrom,
    		$selectedChapterId,
    		$transitionTo
    	});

    	$$self.$inject_state = $$props => {
    		if ('isPageLoaded' in $$props) $$invalidate(0, isPageLoaded = $$props.isPageLoaded);
    		if ('isCarouselScrollingBlocked' in $$props) $$invalidate(1, isCarouselScrollingBlocked = $$props.isCarouselScrollingBlocked);
    		if ('isCardsCarouselInvisible' in $$props) $$invalidate(2, isCardsCarouselInvisible = $$props.isCardsCarouselInvisible);
    		if ('isCardFacesVisible' in $$props) $$invalidate(3, isCardFacesVisible = $$props.isCardFacesVisible);
    		if ('currentChapter' in $$props) $$invalidate(4, currentChapter = $$props.currentChapter);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$chaptersList, $selectedChapterId*/ 3072) {
    			// Computed -------------------------------------------------------------------
    			$$invalidate(4, currentChapter = $chaptersList.find(item => item.id === $selectedChapterId) || $chaptersList[0]);
    		}
    	};

    	return [
    		isPageLoaded,
    		isCarouselScrollingBlocked,
    		isCardsCarouselInvisible,
    		isCardFacesVisible,
    		currentChapter,
    		$transitionFrom,
    		$transitionTo,
    		handleSettingsButtonClick,
    		handleCardClick,
    		handleWeeklyChallengeClick,
    		$chaptersList,
    		$selectedChapterId,
    		cardClick_handler
    	];
    }

    class AllChapters extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AllChapters",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/pages/Chapter.svelte generated by Svelte v3.43.0 */
    const file$2 = "src/pages/Chapter.svelte";

    // (22:4) 
    function create_leftSection_slot$2(ctx) {
    	let div;
    	let buttonincircle;
    	let current;

    	buttonincircle = new ButtonInCircle({
    			props: {
    				class: `chapter-details-page__back-button 
                  ${!/*isPageLoaded*/ ctx[0] && 'chapter-details-page__back-button--invisible'}
                  ${/*$transitionTo*/ ctx[3] === 'AllChapters' && 'chapter-details-page__back-button--invisible'}`,
    				iconName: "arrowLeft",
    				backwardsGradient: true,
    				isTextOnTop: true,
    				text: "Chapters"
    			},
    			$$inline: true
    		});

    	buttonincircle.$on("click", /*click_handler*/ ctx[10]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(buttonincircle.$$.fragment);
    			attr_dev(div, "class", "chapter-details-page__back-button-wrapper svelte-1t7afm2");
    			attr_dev(div, "slot", "leftSection");
    			add_location(div, file$2, 21, 4, 655);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(buttonincircle, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const buttonincircle_changes = {};

    			if (dirty & /*isPageLoaded, $transitionTo*/ 9) buttonincircle_changes.class = `chapter-details-page__back-button 
                  ${!/*isPageLoaded*/ ctx[0] && 'chapter-details-page__back-button--invisible'}
                  ${/*$transitionTo*/ ctx[3] === 'AllChapters' && 'chapter-details-page__back-button--invisible'}`;

    			buttonincircle.$set(buttonincircle_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(buttonincircle.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(buttonincircle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(buttonincircle);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_leftSection_slot$2.name,
    		type: "slot",
    		source: "(22:4) ",
    		ctx
    	});

    	return block;
    }

    // (126:4) 
    function create_rightSection_slot$1(ctx) {
    	let buttonincircle;
    	let current;

    	buttonincircle = new ButtonInCircle({
    			props: {
    				class: "chapter-details-page__settings-button",
    				id: "optionsButton",
    				slot: "rightSection",
    				iconName: "gear",
    				backwardsGradient: true,
    				isTextOnTop: true
    			},
    			$$inline: true
    		});

    	buttonincircle.$on("click", /*handleSettingsButtonClick*/ ctx[6]);

    	const block = {
    		c: function create() {
    			create_component(buttonincircle.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(buttonincircle, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(buttonincircle.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(buttonincircle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(buttonincircle, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_rightSection_slot$1.name,
    		type: "slot",
    		source: "(126:4) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let t0;
    	let div13;
    	let div0;
    	let div0_class_value;
    	let t1;
    	let div2;
    	let div1;
    	let div2_class_value;
    	let t2;
    	let globalheader;
    	let t3;
    	let div3;
    	let chaptercard;
    	let div3_class_value;
    	let t4;
    	let div12;
    	let div7;
    	let div6;
    	let div4;
    	let t5_value = /*currentChapter*/ ctx[2].title + "";
    	let t5;
    	let t6;
    	let div5;
    	let t7_value = /*currentChapter*/ ctx[2].description + "";
    	let t7;
    	let t8;
    	let div11;
    	let div10;
    	let div8;
    	let t10;
    	let div9;
    	let t11;
    	let progressbar;
    	let t12;
    	let chapterachievements;
    	let div12_class_value;
    	let t13;
    	let globalfooter;
    	let current;

    	globalheader = new GlobalHeader({
    			props: {
    				class: `chapter-details-page__main-header`,
    				$$slots: { leftSection: [create_leftSection_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	chaptercard = new ChapterCard({
    			props: {
    				class: `chapter-details-page__chapter-card`,
    				card: /*currentChapter*/ ctx[2],
    				isClicked: false,
    				positionCoeff: 0,
    				isOnlyFaceNChapterVisible: true
    			},
    			$$inline: true
    		});

    	progressbar = new ProgressBar({
    			props: {
    				class: "level-rewards__progressbar",
    				type: ['single', 'double', 'triple'][/*currentChapter*/ ctx[2]?.progressBarNames?.length - 1],
    				progress: /*currentChapter*/ ctx[2]?.progress,
    				titles: /*currentChapter*/ ctx[2]?.progressBarNames
    			},
    			$$inline: true
    		});

    	chapterachievements = new ChapterAchievements({
    			props: {
    				class: "level-rewards__stats",
    				chapterDetails: /*currentChapter*/ ctx[2],
    				isReducedVersion: false
    			},
    			$$inline: true
    		});

    	globalfooter = new GlobalFooter({
    			props: {
    				class: "chapter-details-page__main-footer",
    				$$slots: { rightSection: [create_rightSection_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t0 = space();
    			div13 = element("div");
    			div0 = element("div");
    			t1 = space();
    			div2 = element("div");
    			div1 = element("div");
    			t2 = space();
    			create_component(globalheader.$$.fragment);
    			t3 = space();
    			div3 = element("div");
    			create_component(chaptercard.$$.fragment);
    			t4 = space();
    			div12 = element("div");
    			div7 = element("div");
    			div6 = element("div");
    			div4 = element("div");
    			t5 = text(t5_value);
    			t6 = space();
    			div5 = element("div");
    			t7 = text(t7_value);
    			t8 = space();
    			div11 = element("div");
    			div10 = element("div");
    			div8 = element("div");
    			div8.textContent = "Select a Level";
    			t10 = space();
    			div9 = element("div");
    			t11 = space();
    			create_component(progressbar.$$.fragment);
    			t12 = space();
    			create_component(chapterachievements.$$.fragment);
    			t13 = space();
    			create_component(globalfooter.$$.fragment);

    			attr_dev(div0, "class", div0_class_value = "" + (null_to_empty(`chapter-details-page__striped-bg-layer 
              ${(!/*isPageLoaded*/ ctx[0] || /*$transitionTo*/ ctx[3] === 'AllChapters') && 'chapter-details-page__striped-bg-layer--invisible'}`) + " svelte-1t7afm2"));

    			add_location(div0, file$2, 2, 2, 41);
    			attr_dev(div1, "class", "beams-layer__inner svelte-1t7afm2");
    			add_location(div1, file$2, 14, 4, 526);

    			attr_dev(div2, "class", div2_class_value = "" + (null_to_empty(`beams-layer 
              chapter-details-page__beams-layer 
              ${(!/*isPageLoaded*/ ctx[0] || /*$transitionTo*/ ctx[3] === 'AllChapters') && 'chapter-details-page__beams-layer--invisible'}`) + " svelte-1t7afm2"));

    			add_location(div2, file$2, 8, 2, 278);

    			attr_dev(div3, "class", div3_class_value = "" + (null_to_empty(`chapter-details-page__card-container  
                ${/*isAllPageElementsVisible*/ ctx[1] && /*$transitionTo*/ ctx[3] !== 'AllChapters' && 'chapter-details-page__card-container--placed-on-left'}`) + " svelte-1t7afm2"));

    			add_location(div3, file$2, 45, 2, 1327);
    			attr_dev(div4, "class", "chapter-details__title svelte-1t7afm2");
    			add_location(div4, file$2, 71, 8, 2274);
    			attr_dev(div5, "class", "chapter-details__description svelte-1t7afm2");
    			add_location(div5, file$2, 75, 8, 2378);
    			attr_dev(div6, "class", "chapter-details content-section__chapter-details svelte-1t7afm2");
    			add_location(div6, file$2, 68, 6, 2175);
    			attr_dev(div7, "class", "content-section__chapter-details-side svelte-1t7afm2");
    			add_location(div7, file$2, 65, 4, 2079);
    			attr_dev(div8, "class", "level-rewards__title svelte-1t7afm2");
    			attr_dev(div8, "id", "selectALevel-title");
    			add_location(div8, file$2, 90, 8, 2744);
    			attr_dev(div9, "class", "level-rewards__carousel-placeholder svelte-1t7afm2");
    			attr_dev(div9, "id", "selectALevel-zone");
    			add_location(div9, file$2, 97, 8, 2890);
    			attr_dev(div10, "class", "level-rewards content-section__level-rewards svelte-1t7afm2");
    			add_location(div10, file$2, 87, 6, 2649);
    			attr_dev(div11, "class", "content-section__level-rewards-side svelte-1t7afm2");
    			add_location(div11, file$2, 84, 4, 2557);

    			attr_dev(div12, "class", div12_class_value = "" + (null_to_empty(`content-section 
              chapter-details-page__content-section 
              ${(!/*isAllPageElementsVisible*/ ctx[1] || /*$transitionFrom*/ ctx[4] === 'Chapter') && 'chapter-details-page__content-section--invisible'}`) + " svelte-1t7afm2"));

    			add_location(div12, file$2, 58, 2, 1787);
    			attr_dev(div13, "class", "chapter-details-page svelte-1t7afm2");
    			add_location(div13, file$2, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div13, anchor);
    			append_dev(div13, div0);
    			append_dev(div13, t1);
    			append_dev(div13, div2);
    			append_dev(div2, div1);
    			append_dev(div13, t2);
    			mount_component(globalheader, div13, null);
    			append_dev(div13, t3);
    			append_dev(div13, div3);
    			mount_component(chaptercard, div3, null);
    			append_dev(div13, t4);
    			append_dev(div13, div12);
    			append_dev(div12, div7);
    			append_dev(div7, div6);
    			append_dev(div6, div4);
    			append_dev(div4, t5);
    			append_dev(div6, t6);
    			append_dev(div6, div5);
    			append_dev(div5, t7);
    			append_dev(div12, t8);
    			append_dev(div12, div11);
    			append_dev(div11, div10);
    			append_dev(div10, div8);
    			append_dev(div10, t10);
    			append_dev(div10, div9);
    			append_dev(div10, t11);
    			mount_component(progressbar, div10, null);
    			append_dev(div10, t12);
    			mount_component(chapterachievements, div10, null);
    			append_dev(div13, t13);
    			mount_component(globalfooter, div13, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*isPageLoaded, $transitionTo*/ 9 && div0_class_value !== (div0_class_value = "" + (null_to_empty(`chapter-details-page__striped-bg-layer 
              ${(!/*isPageLoaded*/ ctx[0] || /*$transitionTo*/ ctx[3] === 'AllChapters') && 'chapter-details-page__striped-bg-layer--invisible'}`) + " svelte-1t7afm2"))) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (!current || dirty & /*isPageLoaded, $transitionTo*/ 9 && div2_class_value !== (div2_class_value = "" + (null_to_empty(`beams-layer 
              chapter-details-page__beams-layer 
              ${(!/*isPageLoaded*/ ctx[0] || /*$transitionTo*/ ctx[3] === 'AllChapters') && 'chapter-details-page__beams-layer--invisible'}`) + " svelte-1t7afm2"))) {
    				attr_dev(div2, "class", div2_class_value);
    			}

    			const globalheader_changes = {};

    			if (dirty & /*$$scope, isPageLoaded, $transitionTo*/ 2057) {
    				globalheader_changes.$$scope = { dirty, ctx };
    			}

    			globalheader.$set(globalheader_changes);
    			const chaptercard_changes = {};
    			if (dirty & /*currentChapter*/ 4) chaptercard_changes.card = /*currentChapter*/ ctx[2];
    			chaptercard.$set(chaptercard_changes);

    			if (!current || dirty & /*isAllPageElementsVisible, $transitionTo*/ 10 && div3_class_value !== (div3_class_value = "" + (null_to_empty(`chapter-details-page__card-container  
                ${/*isAllPageElementsVisible*/ ctx[1] && /*$transitionTo*/ ctx[3] !== 'AllChapters' && 'chapter-details-page__card-container--placed-on-left'}`) + " svelte-1t7afm2"))) {
    				attr_dev(div3, "class", div3_class_value);
    			}

    			if ((!current || dirty & /*currentChapter*/ 4) && t5_value !== (t5_value = /*currentChapter*/ ctx[2].title + "")) set_data_dev(t5, t5_value);
    			if ((!current || dirty & /*currentChapter*/ 4) && t7_value !== (t7_value = /*currentChapter*/ ctx[2].description + "")) set_data_dev(t7, t7_value);
    			const progressbar_changes = {};
    			if (dirty & /*currentChapter*/ 4) progressbar_changes.type = ['single', 'double', 'triple'][/*currentChapter*/ ctx[2]?.progressBarNames?.length - 1];
    			if (dirty & /*currentChapter*/ 4) progressbar_changes.progress = /*currentChapter*/ ctx[2]?.progress;
    			if (dirty & /*currentChapter*/ 4) progressbar_changes.titles = /*currentChapter*/ ctx[2]?.progressBarNames;
    			progressbar.$set(progressbar_changes);
    			const chapterachievements_changes = {};
    			if (dirty & /*currentChapter*/ 4) chapterachievements_changes.chapterDetails = /*currentChapter*/ ctx[2];
    			chapterachievements.$set(chapterachievements_changes);

    			if (!current || dirty & /*isAllPageElementsVisible, $transitionFrom*/ 18 && div12_class_value !== (div12_class_value = "" + (null_to_empty(`content-section 
              chapter-details-page__content-section 
              ${(!/*isAllPageElementsVisible*/ ctx[1] || /*$transitionFrom*/ ctx[4] === 'Chapter') && 'chapter-details-page__content-section--invisible'}`) + " svelte-1t7afm2"))) {
    				attr_dev(div12, "class", div12_class_value);
    			}

    			const globalfooter_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				globalfooter_changes.$$scope = { dirty, ctx };
    			}

    			globalfooter.$set(globalfooter_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(globalheader.$$.fragment, local);
    			transition_in(chaptercard.$$.fragment, local);
    			transition_in(progressbar.$$.fragment, local);
    			transition_in(chapterachievements.$$.fragment, local);
    			transition_in(globalfooter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(globalheader.$$.fragment, local);
    			transition_out(chaptercard.$$.fragment, local);
    			transition_out(progressbar.$$.fragment, local);
    			transition_out(chapterachievements.$$.fragment, local);
    			transition_out(globalfooter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div13);
    			destroy_component(globalheader);
    			destroy_component(chaptercard);
    			destroy_component(progressbar);
    			destroy_component(chapterachievements);
    			destroy_component(globalfooter);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let currentChapter;
    	let $chaptersList;
    	let $selectedChapterId;
    	let $transitionTo;
    	let $transitionFrom;
    	validate_store(chaptersList, 'chaptersList');
    	component_subscribe($$self, chaptersList, $$value => $$invalidate(8, $chaptersList = $$value));
    	validate_store(selectedChapterId, 'selectedChapterId');
    	component_subscribe($$self, selectedChapterId, $$value => $$invalidate(9, $selectedChapterId = $$value));
    	validate_store(transitionTo, 'transitionTo');
    	component_subscribe($$self, transitionTo, $$value => $$invalidate(3, $transitionTo = $$value));
    	validate_store(transitionFrom, 'transitionFrom');
    	component_subscribe($$self, transitionFrom, $$value => $$invalidate(4, $transitionFrom = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Chapter', slots, []);
    	let { params } = $$props;

    	// ============================================================================
    	// Data
    	let isPageLoaded = false;

    	let isAllPageElementsVisible = false;

    	// ============================================================================
    	// Lifecycle hooks
    	onMount(() => {
    		transitionFrom.update(() => '');
    		setTimeout(() => $$invalidate(0, isPageLoaded = true), 100);
    		setTimeout(() => transitionFrom.update(() => ''), 100);
    		transitionTo.update(() => '');
    		setTimeout(() => $$invalidate(1, isAllPageElementsVisible = true), 300);
    	});

    	onDestroy(() => {
    		
    	}); // resetAllFromTransitions();
    	// isTransitionFromChapter.update(() => true);

    	// ============================================================================
    	// Methods
    	function handleBackToChaptersClick() {
    		transitionFrom.update(() => 'Chapter');
    		setTimeout(() => transitionTo.update(() => 'AllChapters'), 0);
    		setTimeout(() => push('/'), 400);
    	}

    	function handleSettingsButtonClick() {
    		dispatchIosEvent({ 'tapped': 'OWJSMsgPlayClickSound' });
    		transitionFrom.update(() => 'Chapter');
    		setTimeout(() => transitionTo.update(() => 'Settings'), 0);
    		setTimeout(() => push('/settings'), 400);
    	}

    	const writable_props = ['params'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Chapter> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		handleBackToChaptersClick();
    		dispatchIosEvent({ 'tapped': 'OWJSMsgPlayClickSound' });
    	};

    	$$self.$$set = $$props => {
    		if ('params' in $$props) $$invalidate(7, params = $$props.params);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		push,
    		params,
    		ButtonInCircle,
    		ChapterAchievements,
    		ChapterCard,
    		GlobalHeader,
    		GlobalFooter,
    		ProgressBar,
    		isPageLoaded,
    		isAllPageElementsVisible,
    		chaptersList,
    		selectedChapterId,
    		transitionFrom,
    		transitionTo,
    		dispatchIosEvent,
    		handleBackToChaptersClick,
    		handleSettingsButtonClick,
    		currentChapter,
    		$chaptersList,
    		$selectedChapterId,
    		$transitionTo,
    		$transitionFrom
    	});

    	$$self.$inject_state = $$props => {
    		if ('params' in $$props) $$invalidate(7, params = $$props.params);
    		if ('isPageLoaded' in $$props) $$invalidate(0, isPageLoaded = $$props.isPageLoaded);
    		if ('isAllPageElementsVisible' in $$props) $$invalidate(1, isAllPageElementsVisible = $$props.isAllPageElementsVisible);
    		if ('currentChapter' in $$props) $$invalidate(2, currentChapter = $$props.currentChapter);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$chaptersList, $selectedChapterId*/ 768) {
    			// ============================================================================
    			// Computed
    			$$invalidate(2, currentChapter = $chaptersList.find(item => item.id === $selectedChapterId) || $chaptersList[0]);
    		}
    	};

    	return [
    		isPageLoaded,
    		isAllPageElementsVisible,
    		currentChapter,
    		$transitionTo,
    		$transitionFrom,
    		handleBackToChaptersClick,
    		handleSettingsButtonClick,
    		params,
    		$chaptersList,
    		$selectedChapterId,
    		click_handler
    	];
    }

    class Chapter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { params: 7 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Chapter",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*params*/ ctx[7] === undefined && !('params' in props)) {
    			console.warn("<Chapter> was created without expected prop 'params'");
    		}
    	}

    	get params() {
    		throw new Error("<Chapter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set params(value) {
    		throw new Error("<Chapter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function randomizeSunShapeParams(params = { n:'random', isEven:true, ro:'random', ri:'random' }) {

      if (params.n === 'random') {
        params.n = Math.floor(Math.random() * (26 - 7) + 7);
        
        if (params.isEven) {
          params.n = params.n % 2 ? params.n + 1 : params.n;
        } else {
          params.n = params.n % 3 ? params.n - 1 : params.n;
        }
      }

      params.ro = params.ro === 'random' ? Math.floor(Math.random() * (15 - 11) + 11) : params.ro;
      params.ri = params.ri === 'random' ? Math.floor(Math.random() * (13 - 7) + 7) : params.ri;
      
      return params
    }


    function generateSunShape(params = { n: 8, isEven: true, ro: 15, ri: 11}) {
      // params
      // { 
      // n: 8, - beams number
      // ro: 15, - radius outer
      // ri: 11 - radius inner
      // }
      // console.log('%c params: ','background:greenyellow;color:black;', params);

      let outerCoordinates = [];
      let innerCoordinates = [];

      let coordinates = [];
      
      console.log('%c params: ','background:greenyellow;color:black;', params);

      // calc outer
      for (let i = 1; i <= params.n; i++) {
        const angle = Math.round( (i * Math.PI * 2 / params.n) * 100) / 100;

        const outerCoordinate = {
          n: i,
          r: params.ro,
          angle,
          x: Math.round( (params.ro * Math.cos(angle) + 20) * 100) / 100,
          y: Math.round( (params.ro * Math.sin(angle) + 20) * 100) / 100,
        };
        outerCoordinates.push( outerCoordinate );
      }

      // calc inner
      for (let i = 1; i <= params.n; i++) {
        const angle = Math.round( (i / (params.n / 2) * Math.PI + Math.PI / params.n) * 100) / 100;

        const innerCoordinate = {
          n: i,
          r: params.ri,
          angle,
          x: Math.round( (params.ri * Math.cos(angle) + 20) * 100) / 100,
          y: Math.round( (params.ri * Math.sin(angle) + 20) * 100) / 100,
        };
        innerCoordinates.push( innerCoordinate );
      }

      // generate string
      for (let i = 1; i <= params.n; i++) {
        coordinates.push( outerCoordinates[i - 1].x.toString() );
        coordinates.push( outerCoordinates[i - 1].y.toString() );
        coordinates.push( innerCoordinates[i - 1].x.toString() );
        coordinates.push( innerCoordinates[i - 1].y.toString() );
      }

      return coordinates;
    }

    /* src/pages/Settings.svelte generated by Svelte v3.43.0 */
    const file$1 = "src/pages/Settings.svelte";

    // (7:4) 
    function create_leftSection_slot$1(ctx) {
    	let div;
    	let buttonincircle;
    	let current;

    	buttonincircle = new ButtonInCircle({
    			props: {
    				class: `settings-page__back-button 
                  ${!/*isPageLoaded*/ ctx[0] && 'settings-page__back-button--invisible'}
                  ${/*$transitionTo*/ ctx[18] === 'AllChapters' && 'settings-page__back-button--invisible'}`,
    				iconName: "arrowLeft",
    				backwardsGradient: true,
    				isTextOnTop: true,
    				text: "Back"
    			},
    			$$inline: true
    		});

    	buttonincircle.$on("click", /*click_handler*/ ctx[21]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(buttonincircle.$$.fragment);
    			attr_dev(div, "class", "settings-page__back-button-wrapper svelte-vwb2jp");
    			attr_dev(div, "slot", "leftSection");
    			add_location(div, file$1, 6, 4, 99);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(buttonincircle, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const buttonincircle_changes = {};

    			if (dirty[0] & /*isPageLoaded, $transitionTo*/ 262145) buttonincircle_changes.class = `settings-page__back-button 
                  ${!/*isPageLoaded*/ ctx[0] && 'settings-page__back-button--invisible'}
                  ${/*$transitionTo*/ ctx[18] === 'AllChapters' && 'settings-page__back-button--invisible'}`;

    			buttonincircle.$set(buttonincircle_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(buttonincircle.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(buttonincircle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(buttonincircle);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_leftSection_slot$1.name,
    		type: "slot",
    		source: "(7:4) ",
    		ctx
    	});

    	return block;
    }

    // (42:4) {#if shape1Coordinates.length && shape2Coordinates.length}
    function create_if_block(ctx) {
    	let svg;
    	let path0;
    	let path0_d_value;
    	let path0_transform_value;
    	let path1;
    	let path1_d_value;
    	let path1_transform_value;
    	let path2;
    	let path2_d_value;
    	let path2_transform_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			attr_dev(path0, "d", path0_d_value = "\n          M \n          " + /*shape1Coordinates*/ ctx[2].slice(-2).join(' ') + "\n          Q \n          " + /*shape1Coordinates*/ ctx[2].join(' ') + "\n        ");
    			set_style(path0, "stroke", /*shape1StrokeColor*/ ctx[3]);
    			set_style(path0, "stroke-width", "." + /*shape1StrokeWidth*/ ctx[4] + "px");
    			set_style(path0, "fill", /*shape1Fill*/ ctx[5]);
    			attr_dev(path0, "transform", path0_transform_value = "rotate(" + /*shape1Rotation*/ ctx[6] + ")");
    			add_location(path0, file$1, 55, 8, 1548);
    			attr_dev(path1, "d", path1_d_value = "\n          M \n          " + /*shape2Coordinates*/ ctx[7].slice(-2).join(' ') + "\n          Q \n          " + /*shape2Coordinates*/ ctx[7].join(' ') + "\n        ");
    			set_style(path1, "stroke", /*shape2StrokeColor*/ ctx[8]);
    			set_style(path1, "stroke-width", "." + /*shape2StrokeWidth*/ ctx[9] + "px");
    			set_style(path1, "fill", /*shape2Fill*/ ctx[10]);
    			attr_dev(path1, "transform", path1_transform_value = "rotate(" + /*shape2Rotation*/ ctx[11] + ")");
    			add_location(path1, file$1, 64, 8, 1863);
    			attr_dev(path2, "d", path2_d_value = "\n          M \n          " + /*shape3Coordinates*/ ctx[12].slice(-2).join(' ') + "\n          Q \n          " + /*shape3Coordinates*/ ctx[12].join(' ') + "\n        ");
    			set_style(path2, "stroke", /*shape3StrokeColor*/ ctx[13]);
    			set_style(path2, "stroke-width", "." + /*shape3StrokeWidth*/ ctx[14] + "px");
    			set_style(path2, "fill", /*shape3Fill*/ ctx[15]);
    			attr_dev(path2, "transform", path2_transform_value = "rotate(" + /*shape3Rotation*/ ctx[16] + ")");
    			add_location(path2, file$1, 73, 8, 2177);
    			attr_dev(svg, "width", "40");
    			attr_dev(svg, "height", "40");
    			attr_dev(svg, "viewBox", "0 0 40 40");
    			set_style(svg, "width", "350px");
    			set_style(svg, "height", "350px");
    			set_style(svg, "stroke", "#fff");
    			set_style(svg, "fill", "transparent");
    			attr_dev(svg, "stroke-width", ".2");
    			add_location(svg, file$1, 42, 6, 1120);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			append_dev(svg, path2);

    			if (!mounted) {
    				dispose = listen_dev(svg, "click", /*click_handler_1*/ ctx[22], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*shape1Coordinates*/ 4 && path0_d_value !== (path0_d_value = "\n          M \n          " + /*shape1Coordinates*/ ctx[2].slice(-2).join(' ') + "\n          Q \n          " + /*shape1Coordinates*/ ctx[2].join(' ') + "\n        ")) {
    				attr_dev(path0, "d", path0_d_value);
    			}

    			if (dirty[0] & /*shape1StrokeColor*/ 8) {
    				set_style(path0, "stroke", /*shape1StrokeColor*/ ctx[3]);
    			}

    			if (dirty[0] & /*shape1StrokeWidth*/ 16) {
    				set_style(path0, "stroke-width", "." + /*shape1StrokeWidth*/ ctx[4] + "px");
    			}

    			if (dirty[0] & /*shape1Fill*/ 32) {
    				set_style(path0, "fill", /*shape1Fill*/ ctx[5]);
    			}

    			if (dirty[0] & /*shape1Rotation*/ 64 && path0_transform_value !== (path0_transform_value = "rotate(" + /*shape1Rotation*/ ctx[6] + ")")) {
    				attr_dev(path0, "transform", path0_transform_value);
    			}

    			if (dirty[0] & /*shape2Coordinates*/ 128 && path1_d_value !== (path1_d_value = "\n          M \n          " + /*shape2Coordinates*/ ctx[7].slice(-2).join(' ') + "\n          Q \n          " + /*shape2Coordinates*/ ctx[7].join(' ') + "\n        ")) {
    				attr_dev(path1, "d", path1_d_value);
    			}

    			if (dirty[0] & /*shape2StrokeColor*/ 256) {
    				set_style(path1, "stroke", /*shape2StrokeColor*/ ctx[8]);
    			}

    			if (dirty[0] & /*shape2StrokeWidth*/ 512) {
    				set_style(path1, "stroke-width", "." + /*shape2StrokeWidth*/ ctx[9] + "px");
    			}

    			if (dirty[0] & /*shape2Fill*/ 1024) {
    				set_style(path1, "fill", /*shape2Fill*/ ctx[10]);
    			}

    			if (dirty[0] & /*shape2Rotation*/ 2048 && path1_transform_value !== (path1_transform_value = "rotate(" + /*shape2Rotation*/ ctx[11] + ")")) {
    				attr_dev(path1, "transform", path1_transform_value);
    			}

    			if (dirty[0] & /*shape3Coordinates*/ 4096 && path2_d_value !== (path2_d_value = "\n          M \n          " + /*shape3Coordinates*/ ctx[12].slice(-2).join(' ') + "\n          Q \n          " + /*shape3Coordinates*/ ctx[12].join(' ') + "\n        ")) {
    				attr_dev(path2, "d", path2_d_value);
    			}

    			if (dirty[0] & /*shape3StrokeColor*/ 8192) {
    				set_style(path2, "stroke", /*shape3StrokeColor*/ ctx[13]);
    			}

    			if (dirty[0] & /*shape3StrokeWidth*/ 16384) {
    				set_style(path2, "stroke-width", "." + /*shape3StrokeWidth*/ ctx[14] + "px");
    			}

    			if (dirty[0] & /*shape3Fill*/ 32768) {
    				set_style(path2, "fill", /*shape3Fill*/ ctx[15]);
    			}

    			if (dirty[0] & /*shape3Rotation*/ 65536 && path2_transform_value !== (path2_transform_value = "rotate(" + /*shape3Rotation*/ ctx[16] + ")")) {
    				attr_dev(path2, "transform", path2_transform_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(42:4) {#if shape1Coordinates.length && shape2Coordinates.length}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let t0;
    	let div4;
    	let globalheader;
    	let t1;
    	let div3;
    	let div2;
    	let div0;
    	let t3;
    	let div1;
    	let t5;
    	let t6;
    	let t7;
    	let current;

    	globalheader = new GlobalHeader({
    			props: {
    				class: `settings-page__main-header`,
    				$$slots: { leftSection: [create_leftSection_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block = /*shape1Coordinates*/ ctx[2].length && /*shape2Coordinates*/ ctx[7].length && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			t0 = space();
    			div4 = element("div");
    			create_component(globalheader.$$.fragment);
    			t1 = space();
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "Ideas";
    			t3 = space();
    			div1 = element("div");
    			div1.textContent = "Philosophy";
    			t5 = space();
    			t6 = text(/*currentlyActiveShape*/ ctx[1]);
    			t7 = space();
    			if (if_block) if_block.c();
    			attr_dev(div0, "class", "badge-text__word1 svelte-vwb2jp");
    			add_location(div0, file$1, 37, 6, 916);
    			attr_dev(div1, "class", "badge-text__word2 svelte-vwb2jp");
    			add_location(div1, file$1, 38, 6, 965);
    			attr_dev(div2, "class", "badge-text settings-page__badge-text svelte-vwb2jp");
    			set_style(div2, "transform", "rotate(-" + /*textRotationDegree*/ ctx[17] + "deg)");
    			add_location(div2, file$1, 32, 4, 771);
    			attr_dev(div3, "class", "settings-page__main-content svelte-vwb2jp");
    			add_location(div3, file$1, 30, 2, 720);
    			attr_dev(div4, "class", "settings-page svelte-vwb2jp");
    			add_location(div4, file$1, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div4, anchor);
    			mount_component(globalheader, div4, null);
    			append_dev(div4, t1);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			append_dev(div3, t5);
    			append_dev(div3, t6);
    			append_dev(div3, t7);
    			if (if_block) if_block.m(div3, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const globalheader_changes = {};

    			if (dirty[0] & /*isPageLoaded, $transitionTo*/ 262145 | dirty[1] & /*$$scope*/ 2) {
    				globalheader_changes.$$scope = { dirty, ctx };
    			}

    			globalheader.$set(globalheader_changes);

    			if (!current || dirty[0] & /*textRotationDegree*/ 131072) {
    				set_style(div2, "transform", "rotate(-" + /*textRotationDegree*/ ctx[17] + "deg)");
    			}

    			if (!current || dirty[0] & /*currentlyActiveShape*/ 2) set_data_dev(t6, /*currentlyActiveShape*/ ctx[1]);

    			if (/*shape1Coordinates*/ ctx[2].length && /*shape2Coordinates*/ ctx[7].length) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(div3, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(globalheader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(globalheader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div4);
    			destroy_component(globalheader);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $transitionTo;
    	validate_store(transitionTo, 'transitionTo');
    	component_subscribe($$self, transitionTo, $$value => $$invalidate(18, $transitionTo = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Settings', slots, []);
    	let isMounted = false;
    	let isPageLoaded = false;
    	let currentlyActiveShape = 1;
    	let shape1Coordinates = [];
    	let shape1StrokeColor = '#fff';
    	let shape1StrokeWidth = 3;
    	let shape1Fill = 'transparent';
    	let shape1Rotation = 0;
    	let shape2Coordinates = [];
    	let shape2StrokeColor = 'transparent';
    	let shape2StrokeWidth = 3;
    	let shape2Fill = 'transparent';
    	let shape2Rotation = 0;
    	let shape3Coordinates = [];
    	let shape3StrokeColor = 'transparent';
    	let shape3StrokeWidth = 3;
    	let shape3Fill = '#000';
    	let shape3Rotation = 0;
    	let shape4Coordinates = [];
    	let shape4StrokeColor = 'transparent';
    	let shape4StrokeWidth = 3;
    	let shape4Fill = '#fff';
    	let shape4Rotation = 0;
    	let blackLineRadius = 10;
    	let blackLineDashLength = 1;
    	let blackLineWidth = 3;
    	let textRotationDegree = 1;

    	// Lifecycle hooks ------------------------------------------------------------
    	onMount(() => {
    		isMounted = true;
    		setTimeout(() => $$invalidate(0, isPageLoaded = true), 300);
    		setTimeout(() => transitionFrom.update(() => ''), 300);
    		window.generateShapeCoordinates = generateShapeCoordinates;
    		generateShapeCoordinates();
    	});

    	onDestroy(() => {
    		isMounted = false;
    		transitionFrom.update(() => 'Settings');
    	});

    	// Methods --------------------------------------------------------------------
    	function generateShapeCoordinates() {
    		// shape 1 ------------------------------------------------------------------
    		$$invalidate(2, shape1Coordinates = generateSunShape(randomizeSunShapeParams([
    			{
    				n: 'random',
    				isEven: true,
    				ro: 'random',
    				ri: 'random'
    			},
    			{
    				n: 17,
    				isEven: true,
    				ro: 17,
    				ri: 14,
    				fill: '#fff'
    			},
    			{
    				n: 17,
    				isEven: true,
    				ro: 17,
    				ri: 14,
    				fill: '#fff'
    			},
    			{
    				n: 17,
    				isEven: true,
    				ro: 17,
    				ri: 11,
    				fill: '#fff'
    			},
    			{
    				n: 10,
    				isEven: true,
    				ro: 17,
    				ri: 13,
    				fill: '#fff'
    			}
    		][currentlyActiveShape])));

    		$$invalidate(5, shape1Fill = ['transparent', '#ffffac', '#ffffac', 'transparent', 'transparent'][currentlyActiveShape]);
    		$$invalidate(3, shape1StrokeColor = ['#ffffac', '#ffffac', '#ffffac', '#ffffac', '#ffffac'][currentlyActiveShape]);
    		$$invalidate(4, shape1StrokeWidth = [3, 3, 3, 5, 5][currentlyActiveShape]);
    		$$invalidate(6, shape1Rotation = [0, 0, 0, 0, 0][currentlyActiveShape]);

    		// shape 2 ------------------------------------------------------------------
    		$$invalidate(7, shape2Coordinates = generateSunShape(randomizeSunShapeParams([
    			{
    				n: 'random',
    				isEven: true,
    				ro: 'random',
    				ri: 'random'
    			},
    			{ n: 17, isEven: true, ro: 15.2, ri: 13.2 },
    			{ n: 17, isEven: true, ro: 16, ri: 13.2 },
    			{ n: 17, isEven: true, ro: 17, ri: 11 },
    			{ n: 20, isEven: true, ro: 16, ri: 11 }
    		][currentlyActiveShape])));

    		$$invalidate(10, shape2Fill = ['transparent', '#000', '#000', 'transparent', 'transparent'][currentlyActiveShape]);
    		$$invalidate(8, shape2StrokeColor = ['#ffffac', '#ffffac', '#ffffac', '#ffffac', '#ffffac'][currentlyActiveShape]);
    		$$invalidate(9, shape2StrokeWidth = [3, 3, 3, 5, 5][4]);
    		$$invalidate(11, shape2Rotation = [0, 0, 0, '10,20,20', '9,20,20'][currentlyActiveShape]);

    		// shape 3 ------------------------------------------------------------------
    		$$invalidate(12, shape3Coordinates = generateSunShape(randomizeSunShapeParams([
    			{
    				n: 'random',
    				isEven: true,
    				ro: 13,
    				ri: 'random'
    			},
    			{ n: 17, isEven: true, ro: 14, ri: 11.5 },
    			{ n: 10, isEven: true, ro: 14, ri: 11 },
    			{ n: 17, isEven: true, ro: 13, ri: 11 },
    			{ n: 5, isEven: true, ro: 16.5, ri: 10.5 }
    		][currentlyActiveShape])));

    		$$invalidate(15, shape3Fill = ['transparent', '#ffffac', '#ffffac', '#ffffac', '#ffffac'][currentlyActiveShape]);
    		$$invalidate(13, shape3StrokeColor = ['#ffffac', '#ffffac', '#ffffac', '#000', '#000'][currentlyActiveShape]);
    		$$invalidate(14, shape3StrokeWidth = [3, 3, 3, 9, 9][currentlyActiveShape]);
    		$$invalidate(16, shape3Rotation = [0, 0, 0, 0, 0][currentlyActiveShape]);

    		// shape 4 ------------------------------------------------------------------
    		shape4Coordinates = generateSunShape(randomizeSunShapeParams([
    			{
    				n: 'random',
    				isEven: true,
    				ro: 10,
    				ri: 'random'
    			},
    			{
    				n: 'random',
    				isEven: true,
    				ro: 10,
    				ri: 'random'
    			},
    			{
    				n: 'random',
    				isEven: true,
    				ro: 10,
    				ri: 'random'
    			},
    			{
    				n: 'random',
    				isEven: true,
    				ro: 10,
    				ri: 'random'
    			},
    			{
    				n: 'random',
    				isEven: true,
    				ro: 10,
    				ri: 'random'
    			}
    		][currentlyActiveShape]));

    		shape4Fill = ['transparent', '#ffffac', '#ffffac', '#ffffac', 'transparent'][currentlyActiveShape];
    		shape4StrokeColor = ['#000', '#000', '#000', '#000', 'transparent'][currentlyActiveShape];

    		// --------------------------------------------------------------------------
    		blackLineRadius = Math.floor(Math.random() * (11 - 8) + 8);

    		blackLineDashLength = Math.floor(Math.random() * (2 - 0) + 0);
    		blackLineWidth = Math.floor(Math.random() * (9 - 3) + 3);
    		$$invalidate(17, textRotationDegree = Math.floor(Math.random() * (25 - 1) + 1));
    	}

    	function handleBackClick() {
    		setTimeout(() => pop(), 250);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Settings> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		handleBackClick();
    		dispatchIosEvent({ 'tapped': 'OWJSMsgPlayClickSound' });
    	};

    	const click_handler_1 = () => {
    		$$invalidate(1, currentlyActiveShape = currentlyActiveShape === 4
    		? 1
    		: currentlyActiveShape + 1);

    		generateShapeCoordinates();
    	};

    	$$self.$capture_state = () => ({
    		push,
    		pop,
    		onMount,
    		onDestroy,
    		randomizeSunShapeParams,
    		generateSunShape,
    		transitionFrom,
    		transitionTo,
    		dispatchIosEvent,
    		ButtonInCircle,
    		GlobalHeader,
    		isMounted,
    		isPageLoaded,
    		currentlyActiveShape,
    		shape1Coordinates,
    		shape1StrokeColor,
    		shape1StrokeWidth,
    		shape1Fill,
    		shape1Rotation,
    		shape2Coordinates,
    		shape2StrokeColor,
    		shape2StrokeWidth,
    		shape2Fill,
    		shape2Rotation,
    		shape3Coordinates,
    		shape3StrokeColor,
    		shape3StrokeWidth,
    		shape3Fill,
    		shape3Rotation,
    		shape4Coordinates,
    		shape4StrokeColor,
    		shape4StrokeWidth,
    		shape4Fill,
    		shape4Rotation,
    		blackLineRadius,
    		blackLineDashLength,
    		blackLineWidth,
    		textRotationDegree,
    		generateShapeCoordinates,
    		handleBackClick,
    		$transitionTo
    	});

    	$$self.$inject_state = $$props => {
    		if ('isMounted' in $$props) isMounted = $$props.isMounted;
    		if ('isPageLoaded' in $$props) $$invalidate(0, isPageLoaded = $$props.isPageLoaded);
    		if ('currentlyActiveShape' in $$props) $$invalidate(1, currentlyActiveShape = $$props.currentlyActiveShape);
    		if ('shape1Coordinates' in $$props) $$invalidate(2, shape1Coordinates = $$props.shape1Coordinates);
    		if ('shape1StrokeColor' in $$props) $$invalidate(3, shape1StrokeColor = $$props.shape1StrokeColor);
    		if ('shape1StrokeWidth' in $$props) $$invalidate(4, shape1StrokeWidth = $$props.shape1StrokeWidth);
    		if ('shape1Fill' in $$props) $$invalidate(5, shape1Fill = $$props.shape1Fill);
    		if ('shape1Rotation' in $$props) $$invalidate(6, shape1Rotation = $$props.shape1Rotation);
    		if ('shape2Coordinates' in $$props) $$invalidate(7, shape2Coordinates = $$props.shape2Coordinates);
    		if ('shape2StrokeColor' in $$props) $$invalidate(8, shape2StrokeColor = $$props.shape2StrokeColor);
    		if ('shape2StrokeWidth' in $$props) $$invalidate(9, shape2StrokeWidth = $$props.shape2StrokeWidth);
    		if ('shape2Fill' in $$props) $$invalidate(10, shape2Fill = $$props.shape2Fill);
    		if ('shape2Rotation' in $$props) $$invalidate(11, shape2Rotation = $$props.shape2Rotation);
    		if ('shape3Coordinates' in $$props) $$invalidate(12, shape3Coordinates = $$props.shape3Coordinates);
    		if ('shape3StrokeColor' in $$props) $$invalidate(13, shape3StrokeColor = $$props.shape3StrokeColor);
    		if ('shape3StrokeWidth' in $$props) $$invalidate(14, shape3StrokeWidth = $$props.shape3StrokeWidth);
    		if ('shape3Fill' in $$props) $$invalidate(15, shape3Fill = $$props.shape3Fill);
    		if ('shape3Rotation' in $$props) $$invalidate(16, shape3Rotation = $$props.shape3Rotation);
    		if ('shape4Coordinates' in $$props) shape4Coordinates = $$props.shape4Coordinates;
    		if ('shape4StrokeColor' in $$props) shape4StrokeColor = $$props.shape4StrokeColor;
    		if ('shape4StrokeWidth' in $$props) shape4StrokeWidth = $$props.shape4StrokeWidth;
    		if ('shape4Fill' in $$props) shape4Fill = $$props.shape4Fill;
    		if ('shape4Rotation' in $$props) shape4Rotation = $$props.shape4Rotation;
    		if ('blackLineRadius' in $$props) blackLineRadius = $$props.blackLineRadius;
    		if ('blackLineDashLength' in $$props) blackLineDashLength = $$props.blackLineDashLength;
    		if ('blackLineWidth' in $$props) blackLineWidth = $$props.blackLineWidth;
    		if ('textRotationDegree' in $$props) $$invalidate(17, textRotationDegree = $$props.textRotationDegree);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		isPageLoaded,
    		currentlyActiveShape,
    		shape1Coordinates,
    		shape1StrokeColor,
    		shape1StrokeWidth,
    		shape1Fill,
    		shape1Rotation,
    		shape2Coordinates,
    		shape2StrokeColor,
    		shape2StrokeWidth,
    		shape2Fill,
    		shape2Rotation,
    		shape3Coordinates,
    		shape3StrokeColor,
    		shape3StrokeWidth,
    		shape3Fill,
    		shape3Rotation,
    		textRotationDegree,
    		$transitionTo,
    		generateShapeCoordinates,
    		handleBackClick,
    		click_handler,
    		click_handler_1
    	];
    }

    class Settings extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {}, null, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Settings",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/pages/WeekChallenge.svelte generated by Svelte v3.43.0 */
    const file = "src/pages/WeekChallenge.svelte";

    // (7:4) 
    function create_leftSection_slot(ctx) {
    	let div;
    	let buttonincircle;
    	let current;

    	buttonincircle = new ButtonInCircle({
    			props: {
    				class: `weekly-challenge-page__back-button 
                  ${(!/*isPageLoaded*/ ctx[0] || /*$transitionTo*/ ctx[2] === 'AllChapters') && 'weekly-challenge-page__back-button--invisible'}`,
    				iconName: "arrowLeft",
    				backwardsGradient: true,
    				isTextOnTop: true,
    				text: "Chapters"
    			},
    			$$inline: true
    		});

    	buttonincircle.$on("click", /*click_handler*/ ctx[5]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(buttonincircle.$$.fragment);
    			attr_dev(div, "class", "weekly-challenge-page__back-button-wrapper svelte-1hyn5az");
    			attr_dev(div, "slot", "leftSection");
    			add_location(div, file, 6, 4, 119);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(buttonincircle, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const buttonincircle_changes = {};

    			if (dirty & /*isPageLoaded, $transitionTo*/ 5) buttonincircle_changes.class = `weekly-challenge-page__back-button 
                  ${(!/*isPageLoaded*/ ctx[0] || /*$transitionTo*/ ctx[2] === 'AllChapters') && 'weekly-challenge-page__back-button--invisible'}`;

    			buttonincircle.$set(buttonincircle_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(buttonincircle.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(buttonincircle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(buttonincircle);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_leftSection_slot.name,
    		type: "slot",
    		source: "(7:4) ",
    		ctx
    	});

    	return block;
    }

    // (49:4) 
    function create_rightSection_slot(ctx) {
    	let buttonincircle;
    	let current;

    	buttonincircle = new ButtonInCircle({
    			props: {
    				class: "weekly-challenge-page__settings-button",
    				id: "optionsButton",
    				slot: "rightSection",
    				iconName: "gear",
    				backwardsGradient: true,
    				isTextOnTop: true
    			},
    			$$inline: true
    		});

    	buttonincircle.$on("click", /*handleSettingsButtonClick*/ ctx[3]);

    	const block = {
    		c: function create() {
    			create_component(buttonincircle.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(buttonincircle, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(buttonincircle.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(buttonincircle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(buttonincircle, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_rightSection_slot.name,
    		type: "slot",
    		source: "(49:4) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let t0;
    	let div1;
    	let globalheader;
    	let t1;
    	let div0;
    	let challengebadgeslist;
    	let t2;
    	let challengedetailshexagon;
    	let t3;
    	let globalfooter;
    	let current;

    	globalheader = new GlobalHeader({
    			props: {
    				class: `weekly-challenge-page__main-header`,
    				$$slots: { leftSection: [create_leftSection_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	challengebadgeslist = new ChallengeBadgesList({
    			props: {
    				class: `weekly-challenge-page__badges-vertical-list`
    			},
    			$$inline: true
    		});

    	challengedetailshexagon = new ChallengeDetailsHexagon({
    			props: {
    				class: `weekly-challenge-page__challenge-details`,
    				isBlurredWordsInvisible: /*isBlurredWordsInvisible*/ ctx[1]
    			},
    			$$inline: true
    		});

    	globalfooter = new GlobalFooter({
    			props: {
    				class: "weekly-challenge-page__main-footer",
    				$$slots: { rightSection: [create_rightSection_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t0 = space();
    			div1 = element("div");
    			create_component(globalheader.$$.fragment);
    			t1 = space();
    			div0 = element("div");
    			create_component(challengebadgeslist.$$.fragment);
    			t2 = space();
    			create_component(challengedetailshexagon.$$.fragment);
    			t3 = space();
    			create_component(globalfooter.$$.fragment);
    			attr_dev(div0, "class", "weekly-challenge-page__main-content svelte-1hyn5az");
    			add_location(div0, file, 28, 2, 766);
    			attr_dev(div1, "class", "weekly-challenge-page svelte-1hyn5az");
    			add_location(div1, file, 0, 1, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			mount_component(globalheader, div1, null);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			mount_component(challengebadgeslist, div0, null);
    			append_dev(div0, t2);
    			mount_component(challengedetailshexagon, div0, null);
    			append_dev(div1, t3);
    			mount_component(globalfooter, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const globalheader_changes = {};

    			if (dirty & /*$$scope, isPageLoaded, $transitionTo*/ 133) {
    				globalheader_changes.$$scope = { dirty, ctx };
    			}

    			globalheader.$set(globalheader_changes);
    			const challengedetailshexagon_changes = {};
    			if (dirty & /*isBlurredWordsInvisible*/ 2) challengedetailshexagon_changes.isBlurredWordsInvisible = /*isBlurredWordsInvisible*/ ctx[1];
    			challengedetailshexagon.$set(challengedetailshexagon_changes);
    			const globalfooter_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				globalfooter_changes.$$scope = { dirty, ctx };
    			}

    			globalfooter.$set(globalfooter_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(globalheader.$$.fragment, local);
    			transition_in(challengebadgeslist.$$.fragment, local);
    			transition_in(challengedetailshexagon.$$.fragment, local);
    			transition_in(globalfooter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(globalheader.$$.fragment, local);
    			transition_out(challengebadgeslist.$$.fragment, local);
    			transition_out(challengedetailshexagon.$$.fragment, local);
    			transition_out(globalfooter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			destroy_component(globalheader);
    			destroy_component(challengebadgeslist);
    			destroy_component(challengedetailshexagon);
    			destroy_component(globalfooter);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $transitionTo;
    	validate_store(transitionTo, 'transitionTo');
    	component_subscribe($$self, transitionTo, $$value => $$invalidate(2, $transitionTo = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('WeekChallenge', slots, []);
    	let isMounted = false;
    	let isPageLoaded = false;
    	let isBlurredWordsInvisible = true;

    	// Lifecycle hooks ------------------------------------------------------------
    	onMount(() => {
    		isMounted = true;
    		setTimeout(() => $$invalidate(0, isPageLoaded = true), 0);
    		setTimeout(() => transitionFrom.update(() => ''), 300);
    		transitionTo.update(() => '');
    		setTimeout(() => $$invalidate(1, isBlurredWordsInvisible = false), 50);
    	});

    	onDestroy(() => {
    		isMounted = false;
    		transitionFrom.update(() => 'WeekChallenge');
    	});

    	// Methods --------------------------------------------------------------------
    	function handleSettingsButtonClick() {
    		dispatchIosEvent({ 'tapped': 'OWJSMsgPlayClickSound' });
    		transitionFrom.update(() => 'WeekChallenge');
    		setTimeout(() => transitionTo.update(() => 'Settings'), 0);
    		setTimeout(() => push('/settings'), 400);
    	}

    	function handleBackToChaptersClick() {
    		$$invalidate(1, isBlurredWordsInvisible = true);
    		setTimeout(() => transitionFrom.update(() => 'WeekChallenge'), 0);
    		setTimeout(() => transitionTo.update(() => 'AllChapters'), 0);
    		setTimeout(() => push('/'), 0);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<WeekChallenge> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		handleBackToChaptersClick();
    		dispatchIosEvent({ 'tapped': 'OWJSMsgPlayClickSound' });
    	};

    	$$self.$capture_state = () => ({
    		push,
    		onMount,
    		onDestroy,
    		ButtonInCircle,
    		ChallengeBadgesList,
    		ChallengeDetailsHexagon,
    		GlobalHeader,
    		GlobalFooter,
    		isMounted,
    		isPageLoaded,
    		isBlurredWordsInvisible,
    		transitionFrom,
    		transitionTo,
    		dispatchIosEvent,
    		handleSettingsButtonClick,
    		handleBackToChaptersClick,
    		$transitionTo
    	});

    	$$self.$inject_state = $$props => {
    		if ('isMounted' in $$props) isMounted = $$props.isMounted;
    		if ('isPageLoaded' in $$props) $$invalidate(0, isPageLoaded = $$props.isPageLoaded);
    		if ('isBlurredWordsInvisible' in $$props) $$invalidate(1, isBlurredWordsInvisible = $$props.isBlurredWordsInvisible);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		isPageLoaded,
    		isBlurredWordsInvisible,
    		$transitionTo,
    		handleSettingsButtonClick,
    		handleBackToChaptersClick,
    		click_handler
    	];
    }

    class WeekChallenge extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WeekChallenge",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.43.0 */

    function create_fragment(ctx) {
    	let router;
    	let current;

    	router = new Router({
    			props: {
    				routes: {
    					'/': AllChapters,
    					'/weekly-challenge': WeekChallenge,
    					'/chapters/:chapterId': Chapter,
    					'/settings': Settings
    				}
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Router,
    		AllChapters,
    		Chapter,
    		Settings,
    		WeekChallenge
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body
    });

    return app;

})(confetti);
//# sourceMappingURL=bundle.js.map
