function elem(name, deps, attrs, ...children) {
        const elem = new Element(name, attrs, children);
        elem.sub(...deps);
        return elem;
}
function address(deps, attrs, ...children) {
        return elem("address", deps, attrs, ...children);
}
function article(deps, attrs, ...children) {
        return elem("article", deps, attrs, ...children);
}
function aside(deps, attrs, ...children) {
        return elem("aside", deps, attrs, ...children);
}
function footer(deps, attrs, ...children) {
        return elem("footer", deps, attrs, ...children);
}
function header(deps, attrs, ...children) {
        return elem("header", deps, attrs, ...children);
}
function h1(deps, attrs, ...children) {
        return elem("h1", deps, attrs, ...children);
}
function h2(deps, attrs, ...children) {
        return elem("h2", deps, attrs, ...children);
}
function h3(deps, attrs, ...children) {
        return elem("h3", deps, attrs, ...children);
}
function h4(deps, attrs, ...children) {
        return elem("h4", deps, attrs, ...children);
}
function h5(deps, attrs, ...children) {
        return elem("h5", deps, attrs, ...children);
}
function h6(deps, attrs, ...children) {
        return elem("h6", deps, attrs, ...children);
}
function hgroup(deps, attrs, ...children) {
        return elem("hgroup", deps, attrs, ...children);
}
function main(deps, attrs, ...children) {
        return elem("main", deps, attrs, ...children);
}
function nav(deps, attrs, ...children) {
        return elem("nav", deps, attrs, ...children);
}
function section(deps, attrs, ...children) {
        return elem("section", deps, attrs, ...children);
}
function blockquote(deps, attrs, ...children) {
        return elem("blockquote", deps, attrs, ...children);
}
function cite(deps, attrs, ...children) {
        return elem("cite", deps, attrs, ...children);
}
function dd(deps, attrs, ...children) {
        return elem("dd", deps, attrs, ...children);
}
function dt(deps, attrs, ...children) {
        return elem("dt", deps, attrs, ...children);
}
function dl(deps, attrs, ...children) {
        return elem("dl", deps, attrs, ...children);
}
function div(deps, attrs, ...children) {
        return elem("div", deps, attrs, ...children);
}
function figcaption(deps, attrs, ...children) {
        return elem("figcaption", deps, attrs, ...children);
}
function figure(deps, attrs, ...children) {
        return elem("figure", deps, attrs, ...children);
}
function hr(deps, attrs, ...children) {
        return elem("hr", deps, attrs, ...children);
}
function li(deps, attrs, ...children) {
        return elem("li", deps, attrs, ...children);
}
function ol(deps, attrs, ...children) {
        return elem("ol", deps, attrs, ...children);
}
function ul(deps, attrs, ...children) {
        return elem("ul", deps, attrs, ...children);
}
function menu(deps, attrs, ...children) {
        return elem("menu", deps, attrs, ...children);
}
function p(deps, attrs, ...children) {
        return elem("p", deps, attrs, ...children);
}
function pre(deps, attrs, ...children) {
        return elem("pre", deps, attrs, ...children);
}
function a(deps, attrs, ...children) {
        return elem("a", deps, attrs, ...children);
}
function abbr(deps, attrs, ...children) {
        return elem("abbr", deps, attrs, ...children);
}
function b(deps, attrs, ...children) {
        return elem("b", deps, attrs, ...children);
}
function bdi(deps, attrs, ...children) {
        return elem("bdi", deps, attrs, ...children);
}
function bdo(deps, attrs, ...children) {
        return elem("bdo", deps, attrs, ...children);
}
function br(deps, attrs, ...children) {
        return elem("br", deps, attrs, ...children);
}
function code(deps, attrs, ...children) {
        return elem("code", deps, attrs, ...children);
}
function data(deps, attrs, ...children) {
        return elem("data", deps, attrs, ...children);
}
function dfn(deps, attrs, ...children) {
        return elem("dfn", deps, attrs, ...children);
}
function em(deps, attrs, ...children) {
        return elem("em", deps, attrs, ...children);
}
function i(deps, attrs, ...children) {
        return elem("i", deps, attrs, ...children);
}
function kbd(deps, attrs, ...children) {
        return elem("kbd", deps, attrs, ...children);
}
function mark(deps, attrs, ...children) {
        return elem("mark", deps, attrs, ...children);
}
function q(deps, attrs, ...children) {
        return elem("q", deps, attrs, ...children);
}
function rp(deps, attrs, ...children) {
        return elem("rp", deps, attrs, ...children);
}
function ruby(deps, attrs, ...children) {
        return elem("ruby", deps, attrs, ...children);
}
function rt(deps, attrs, ...children) {
        return elem("rt", deps, attrs, ...children);
}
function s(deps, attrs, ...children) {
        return elem("s", deps, attrs, ...children);
}
function samp(deps, attrs, ...children) {
        return elem("samp", deps, attrs, ...children);
}
function small(deps, attrs, ...children) {
        return elem("small", deps, attrs, ...children);
}
function span(deps, attrs, ...children) {
        return elem("span", deps, attrs, ...children);
}
function strong(deps, attrs, ...children) {
        return elem("strong", deps, attrs, ...children);
}
function sub(deps, attrs, ...children) {
        return elem("sub", deps, attrs, ...children);
}
function sup(deps, attrs, ...children) {
        return elem("sup", deps, attrs, ...children);
}
function time(deps, attrs, ...children) {
        return elem("time", deps, attrs, ...children);
}
function u(deps, attrs, ...children) {
        return elem("u", deps, attrs, ...children);
}
function wbr(deps, attrs, ...children) {
        return elem("wbr", deps, attrs, ...children);
}
function area(deps, attrs, ...children) {
        return elem("area", deps, attrs, ...children);
}
function audio(deps, attrs, ...children) {
        return elem("audio", deps, attrs, ...children);
}
function img(deps, attrs, ...children) {
        return elem("img", deps, attrs, ...children);
}
function map(deps, attrs, ...children) {
        return elem("map", deps, attrs, ...children);
}
function track(deps, attrs, ...children) {
        return elem("track", deps, attrs, ...children);
}
function video(deps, attrs, ...children) {
        return elem("video", deps, attrs, ...children);
}
function embed(deps, attrs, ...children) {
        return elem("embed", deps, attrs, ...children);
}
function iframe(deps, attrs, ...children) {
        return elem("iframe", deps, attrs, ...children);
}
function object(deps, attrs, ...children) {
        return elem("object", deps, attrs, ...children);
}
function picture(deps, attrs, ...children) {
        return elem("picture", deps, attrs, ...children);
}
function source(deps, attrs, ...children) {
        return elem("source", deps, attrs, ...children);
}
function portal(deps, attrs, ...children) {
        return elem("portal", deps, attrs, ...children);
}
function svg(deps, attrs, ...children) {
        return elem("svg", deps, attrs, ...children);
}
function canvas(deps, attrs, ...children) {
        return elem("canvas", deps, attrs, ...children);
}
function del(deps, attrs, ...children) {
        return elem("del", deps, attrs, ...children);
}
function ins(deps, attrs, ...children) {
        return elem("ins", deps, attrs, ...children);
}
function caption(deps, attrs, ...children) {
        return elem("caption", deps, attrs, ...children);
}
function col(deps, attrs, ...children) {
        return elem("col", deps, attrs, ...children);
}
function colgroup(deps, attrs, ...children) {
        return elem("colgroup", deps, attrs, ...children);
}
function table(deps, attrs, ...children) {
        return elem("table", deps, attrs, ...children);
}
function tbody(deps, attrs, ...children) {
        return elem("tbody", deps, attrs, ...children);
}
function tr(deps, attrs, ...children) {
        return elem("tr", deps, attrs, ...children);
}
function td(deps, attrs, ...children) {
        return elem("td", deps, attrs, ...children);
}
function tfoot(deps, attrs, ...children) {
        return elem("tfoot", deps, attrs, ...children);
}
function th(deps, attrs, ...children) {
        return elem("th", deps, attrs, ...children);
}
function thead(deps, attrs, ...children) {
        return elem("thead", deps, attrs, ...children);
}
function button(deps, attrs, ...children) {
        return elem("button", deps, attrs, ...children);
}
function datalist(deps, attrs, ...children) {
        return elem("datalist", deps, attrs, ...children);
}
function option(deps, attrs, ...children) {
        return elem("option", deps, attrs, ...children);
}
function fieldset(deps, attrs, ...children) {
        return elem("fieldset", deps, attrs, ...children);
}
function label(deps, attrs, ...children) {
        return elem("label", deps, attrs, ...children);
}
function form(deps, attrs, ...children) {
        return elem("form", deps, attrs, ...children);
}
function input(deps, attrs, ...children) {
        return elem("input", deps, attrs, ...children);
}
function legend(deps, attrs, ...children) {
        return elem("legend", deps, attrs, ...children);
}
function meter(deps, attrs, ...children) {
        return elem("meter", deps, attrs, ...children);
}
function optgroup(deps, attrs, ...children) {
        return elem("optgroup", deps, attrs, ...children);
}
function select(deps, attrs, ...children) {
        return elem("select", deps, attrs, ...children);
}
function output(deps, attrs, ...children) {
        return elem("output", deps, attrs, ...children);
}
function progress(deps, attrs, ...children) {
        return elem("progress", deps, attrs, ...children);
}
function textarea(deps, attrs, ...children) {
        return elem("textarea", deps, attrs, ...children);
}
function details(deps, attrs, ...children) {
        return elem("details", deps, attrs, ...children);
}
function summary(deps, attrs, ...children) {
        return elem("summary", deps, attrs, ...children);
}
function dialog(deps, attrs, ...children) {
        return elem("dialog", deps, attrs, ...children);
}
function slot(deps, attrs, ...children) {
        return elem("slot", deps, attrs, ...children);
}
function template(deps, attrs, ...children) {
        return elem("template", deps, attrs, ...children);
}
function acronym(deps, attrs, ...children) {
        return elem("acronym", deps, attrs, ...children);
}
function applet(deps, attrs, ...children) {
        return elem("applet", deps, attrs, ...children);
}
function bgsound(deps, attrs, ...children) {
        return elem("bgsound", deps, attrs, ...children);
}
function big(deps, attrs, ...children) {
        return elem("big", deps, attrs, ...children);
}
function blink(deps, attrs, ...children) {
        return elem("blink", deps, attrs, ...children);
}
function center(deps, attrs, ...children) {
        return elem("center", deps, attrs, ...children);
}
function dir(deps, attrs, ...children) {
        return elem("dir", deps, attrs, ...children);
}
function font(deps, attrs, ...children) {
        return elem("font", deps, attrs, ...children);
}
function frame(deps, attrs, ...children) {
        return elem("frame", deps, attrs, ...children);
}
function frameset(deps, attrs, ...children) {
        return elem("frameset", deps, attrs, ...children);
}
function image(deps, attrs, ...children) {
        return elem("image", deps, attrs, ...children);
}
function keygen(deps, attrs, ...children) {
        return elem("keygen", deps, attrs, ...children);
}
function menuitem(deps, attrs, ...children) {
        return elem("menuitem", deps, attrs, ...children);
}
function nobr(deps, attrs, ...children) {
        return elem("nobr", deps, attrs, ...children);
}
function noembed(deps, attrs, ...children) {
        return elem("noembed", deps, attrs, ...children);
}
function noframes(deps, attrs, ...children) {
        return elem("noframes", deps, attrs, ...children);
}
function param(deps, attrs, ...children) {
        return elem("param", deps, attrs, ...children);
}
function plaintext(deps, attrs, ...children) {
        return elem("plaintext", deps, attrs, ...children);
}
function rb(deps, attrs, ...children) {
        return elem("rb", deps, attrs, ...children);
}
function rtc(deps, attrs, ...children) {
        return elem("rtc", deps, attrs, ...children);
}
function spacer(deps, attrs, ...children) {
        return elem("spacer", deps, attrs, ...children);
}
function strike(deps, attrs, ...children) {
        return elem("strike", deps, attrs, ...children);
}
function tt(deps, attrs, ...children) {
        return elem("tt", deps, attrs, ...children);
}
function xmp(deps, attrs, ...children) {
        return elem("xmp", deps, attrs, ...children);
}
