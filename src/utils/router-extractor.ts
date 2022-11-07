// ref: https://github.com/alansouzati/react-router-to-array/

import { Route } from 'react-router-dom';

interface Route {
    path: string;
    name: string;
}

interface RouteElement extends JSX.Element {
    path: string;
    childRoutes?: RouteElement[]; // not sure if this is exist
}

function extractRouteChildren(route: RouteElement, prefix: string): Route[] {
    let routes: Route[] = [];
    const routeChild =
        route.props && route.props.children ? route.props.children : route.childRoutes;
    if (routeChild) {
        if (Array.isArray(routeChild)) {
            routeChild.forEach((child) => {
                routes = routes.concat(extractRoute(child, prefix));
            });
        } else {
            routes = routes.concat(extractRoute(routeChild, prefix));
        }
    }
    return routes;
}

function extractRoute(routeElement: RouteElement, prefix = ''): Route[] {
    const path =
        routeElement.props && routeElement.props.path ? routeElement.props.path : routeElement.path;
    const name =
        routeElement.props && routeElement.props.element
            ? routeElement.props.element.type.name
            : path;

    let routes: Route[] = [];

    if (!path) {
        if (Array.isArray(routeElement)) {
            routeElement.forEach((r) => {
                routes = routes.concat(extractRoute(r, prefix));
            });

            return routes;
        } else {
            return extractRouteChildren(routeElement, prefix);
        }
    }
    const currentPath = `${prefix || ''}${path}`.replace(/\/+/g, '/');

    if (!/:|\*/.test(currentPath)) {
        const route = {
            name: name,
            path: `${currentPath.startsWith('/') ? '' : '/'}${currentPath}`
        };
        routes.push(route);
        routes = routes.concat(extractRouteChildren(routeElement, `${currentPath}/`));
    }
    return routes;
}

export default function routerExtractor(route: JSX.Element | RouteElement): Route[] {
    let routes: Route[] = [];
    if (Array.isArray(route)) {
        route.forEach((r) => {
            routes = routes.concat(extractRoute(r));
        });
    } else {
        routes = routes.concat(extractRoute(route));
    }

    console.log(routes);
    return routes;
}
