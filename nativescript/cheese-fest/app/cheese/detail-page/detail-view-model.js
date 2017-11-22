const observableModule = require("data/observable");

/* ***********************************************************
* This is the item details view model.
*************************************************************/
function DetailViewModel(cheeseModel) {
    const viewModel = observableModule.fromObject({
        cheese: cheeseModel
    });

    return viewModel;
}

module.exports = DetailViewModel;
