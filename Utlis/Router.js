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
        let Path = Router.WordToRoute[word].split("/");
        let formedPath = "";
        for(let i=0;i<Path.length;i++){

            var data_patt = /^<[\w]+>:[\w]+/g;
            var Pathmatch = Path[i].match(data_patt);
            
            if(Pathmatch){
                Pathmatch = Pathmatch[0];
                let x = Pathmatch.split(":");
                let variablename = x[1];
                if(variablename in passed){
                    formedPath += passed[variablename]+'/';
                }
                else return null;
            }
            else{
                formedPath += Path[i]+'/';
            }
        }
        return formedPath;
    },
    checkdatatype: (type, str) => {
        let value = null;
        if(type == "int"){
            try{
                value = parseInt(str);
            }
            catch(err){
                value = null;
            }
        }
        return value;
    },
    parseUrl : () => {

        let url = location.hash.slice(1).toLowerCase() || '/';
        let foundurl = url.split("/");
        let passed = {};
        let matchingpath = null;

        for(let i=1;i<foundurl.length;i++){
            if(foundurl[i].length > 0)continue;
            else{
                foundurl.splice(i,foundurl.length);
            }
        }

        for (var key in Router.RouteToComponent) {
            
            let originalurl = key.split("/");
            
            
            for(let i=1;i<originalurl.length;i++){
                if(originalurl[i].length > 0)continue;
                else{
                    originalurl.splice(i,originalurl.length);
                }
            }
            //console.log(foundurl ,originalurl);

            if(originalurl.length != foundurl.length)continue;

            matchingpath = key;

            for(let i=0;i<foundurl.length;i++){
                var data_patt = /^<[\w]+>:[\w]+/g;
                var origmatch = originalurl[i].match(data_patt);
                //console.log(originalurl[i], origmatch);
    
                if(origmatch){
                    origmatch = origmatch[0];
                    let x = origmatch.split(':');
                    let type = x[0].split('<')[1].split('>')[0];
                    let variablename = x[1];
                    
                    let value = Router.checkdatatype(type ,foundurl[i]);
                    //console.log(type, variablename, origmatch, value);

                    if(!value){
                        matchingpath = null;
                        break;
                    }
                    else{
                        passed[variablename] = value;
                    }
                }
                else if(originalurl[i] != foundurl[i]){
                    //console.log(originalurl[i] , foundurl[i]);
                    matchingpath = null;
                    break;
                }
            }    
            if(matchingpath)break;
        }
        return {
            "path" : matchingpath,
            "request" : passed
        };
        
    },
    renderpage : async () => {
        const page_content = null || document.getElementById(Router.mainDiv);
        
        let ParsedUrl = Router.parseUrl();
        //console.log(ParsedUrl);
        
        let page = Router.getRoute(ParsedUrl["path"]) ? Router.getRoute(ParsedUrl["path"]) : Router.getRoute('/notfound')
        
        page_content.innerHTML = await page.render(ParsedUrl["request"])
        await page.after_render()
    },
    redirect : (word, passed = {}) => {
        let Path = Router.getpath(word,passed);
        location.replace(Path);
        Router.renderpage();
    }
}
export default Router;