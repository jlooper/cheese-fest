const topmost = require("ui/frame").topmost;

const DetailViewModel = require("./detail-view-model");

/* ***********************************************************
* This is the item details code behind in the master-detail structure.
* This code behind retrieves the passed parameter from the master list component,
* finds the data item by this parameter and displays the detailed data item information.
*************************************************************/

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }

    const page = args.object;

    page.bindingContext = new DetailViewModel(page.navigationContext);
}

/* ***********************************************************
* The back button is essential for a master-detail feature.
*************************************************************/
function onBackButtonTap() {
    topmost().goBack();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onBackButtonTap = onBackButtonTap;
