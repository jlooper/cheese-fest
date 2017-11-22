if (global.TNS_WEBPACK) {
    //registers tns-core-modules UI framework modules
    require("bundle-entry-points");

    global.registerModule("nativescript-pro-ui/listview", () =>
        require("../node_modules/nativescript-pro-ui/listview"));

    //register application modules
    global.registerModule("cheese/list-page", () => require("./cheese/list-page"));
    global.registerModule("cheese/detail-page/detail-page", () =>
        require("./cheese/detail-page/detail-page"));
}
