import loadable from 'loadable-components';

import Loader from "../common/Loader/index"
import ErrorWrapper from "../common/Error"

export default (name) => {
    return loadable(() => import(`../pages/${name}/index`), {
        LoadingComponent: Loader,
        ErrorComponent: ErrorWrapper
    });
}