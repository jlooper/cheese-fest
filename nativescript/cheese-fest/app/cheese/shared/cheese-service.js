const Observable = require("rxjs/Rx").Observable;
const firebase = require("nativescript-plugin-firebase");


function CheeseService() {
    if (CheeseService._instance) {
        throw new Error("Use CheeseService.getInstance() instead of new.");
    }

    this._cheese = [];
    CheeseService._instance = this;

    this.load = function () {
        return new Observable((observer) => {
            const path = "Cheeses";
            const onValueEvent = (snapshot) => {
                const results = this._handleSnapshot(snapshot.value);
                observer.next(results);
            };

            firebase.addValueEventListener(onValueEvent, `/${path}`);
        }).catch(this._handleErrors);
    };

    
    this._handleSnapshot = function (data) {
        this._cheese = [];
        if (data) {
            console.log(JSON.stringify(data))
            for (const id in data) {
                if (data.hasOwnProperty(id)) {
                    this._cheese.push(data[id]);
                }
            }
        }

        return this._cheese;
    };

    this._handleErrors = function (error) {
        return Observable.throw(error);
    };
}

CheeseService.getInstance = function () {
    return CheeseService._instance;
};

CheeseService._instance = new CheeseService();

module.exports = CheeseService;
