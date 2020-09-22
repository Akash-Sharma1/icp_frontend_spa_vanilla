const Router = {
    RouteToComponent : {},
    WordToRoute: {},
    mainDiv : "app",
    addRoute : (path, view, word) => {
        Router.RouteToComponent[path] = view
        Router.WordToRoute[word] = '#'+path
    },
    removeRoute : (path) => {
        Router.RouteToComponent[path] = null
    },
    getRoute : (path) => {
        return  Router.RouteToComponent[path];
    },
    getpath : (word, passed = {}) => {
        let Path = Router.WordToRoute[word];
        for (var key in passed) {
            Path = Path.replace(":"+key, ""+passed[key])
        }
        return Path;
    },
    parseRequestURL : () => {

        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        }
        request.resource    = r[1]
        request.id          = r[2]
        request.verb        = r[3]

        return request
    },
    renderpage : async () => {
        const page_content = null || document.getElementById(Router.mainDiv);
        
        let request = Router.parseRequestURL();

        let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

        let page = Router.getRoute(parsedURL) ? Router.getRoute(parsedURL) : Router.getRoute('/notfound')
        
        page_content.innerHTML = await page.render(request.id)
        await page.after_render()
    },
    redirect : (word, passed = {}) => {
        let Path = Router.getpath(word,passed);
        location.replace(Path);
        Router.renderpage();
    }
}
export default Router;