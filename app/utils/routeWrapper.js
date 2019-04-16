import React from "react"
import { Switch, Route } from 'react-router-dom';

import NotFound from "../pages/NotFound"
import Loadable from "./loadable"
import RouteMap from "../app.routes"

export default () => {
    const _renderRoute = (route, index) => {
        const options = {
            path: route.path
        }

        if (route.isExact) options.exact = true

        if (route.isLoadable) options.component = Loadable(route.componentPath)
        else options.component = route.component

        return (<Route key={index} {...options} />)
    }

    return (
        <Switch>
            {RouteMap && RouteMap.map(_renderRoute)}
            <Route path="" component={NotFound} />
        </Switch>
    )
}