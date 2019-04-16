export default [
    {
        title: "Home", // is required
        isExact: true, // true, false
        path: "/", // string
        isLoadable: true, // true, false
        component: null, // required if isLoadable is false
        componentPath: "Home", // required if isLoadable is true
    },
    {
        title: "Users",
        isExact: false,
        path: "/users",
        isLoadable: true,
        componentPath: "Users", // required if isLoadable is true
    }
]