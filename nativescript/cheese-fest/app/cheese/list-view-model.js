const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;

const CheeseService = require("./shared/cheese-service");

/* ***********************************************************
 * This is the master list view model.
 *************************************************************/
function ListViewModel() {
    const viewModel = observableModule.fromObject({
        cheese: new ObservableArray([]),
        isLoading: false,

        _cheeseService: CheeseService.getInstance(),

        load: function () {
            this.set("isLoading", true);

            this._cheeseService.load()
                .finally(() => this.set("isLoading", false))
                .subscribe((cheese) => {
                    this.set("cheese", new ObservableArray(cheese));
                    this.set("isLoading", false);
                });
        }
    });

    return viewModel;
}

module.exports = ListViewModel;
