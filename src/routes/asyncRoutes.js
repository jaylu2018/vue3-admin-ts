let routesModules = require.context('./modules', false, /\.js$/)
let asyncRoutes = routesModules.keys().reduce((routes, fileName) => {
    //fileName.replace(/\.\/(.+)\.js$/, '$1')
    routes.push(routesModules(fileName).default)
    return routes
}, [])




// function generateRoutes() {
//     // Layout.children.push(...order.children);
//     routes.sort((a, b) => a.sort - b.sort)
// }

// generateRoutes()
export default asyncRoutes