function getPage(req) {
    alert(`request: ${req}`);
    var loc = new URLSearchParams(window.location);
    var urlParams = new URLSearchParams(window.location.search);
    alert(`urlParams: ${urlParams}`);
    console.log(urlParams.has('post')); // true
    console.log(urlParams.get('action')); // "edit"
    console.log(urlParams.getAll('action')); // ["edit"]
    console.log(urlParams.toString()); // "?post=1234&action=edit"
    console.log(urlParams.append('active', '1')); // "?
    alert(`loc: ${loc}`);
}