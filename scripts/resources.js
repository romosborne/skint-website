$(document).ready(function() {

    var Recording = function(displayName, year, category, source) {
        this.displayName = displayName;
        this.source = source;
        this.category = category;

        this.year = year;
        this.workshop = "Swedish";
        this.tuneType = "Polska";
    };

    var viewModel = function(recordings) {

        var self = this;

        self.recordings = ko.observableArray(recordings);

        self.sortBy = ko.observable("Tune Name");

        self.sortOptions = [
            "Tune name",
            "Tune type",
            "File type",
            "Year",
            "Year asc"
        ];

        self.changeSort = function(data) {
            self.sortBy(data);

            self.recordings.sort(function(a, b) {
                if (self.sortBy() == "Year asc") {
                    return a.year == b.year ? (a.displayName > b.displayName ? 1 : -1) : a.year > b.year ? 1: -1;
                } else if (self.sortBy() == "Year") {
                    return a.year == b.year ? (a.displayName > b.displayName ? 1 : -1) : a.year < b.year ? 1: -1;
                } else if (self.sortBy() == "Tune type") {
                    return a.tuneType == b.tuneType ? (a.displayName > b.displayName ? 1 : -1) : a.tuneType > b.tuneType ? 1: -1;
                } else if (self.sortBy() == "File type") {
                    return a.tuneType == b.category ? (a.displayName > b.displayName ? 1 : -1) : a.category > b.category ? 1: -1;
                } else {
                    return a.displayName > b.displayName ? 1 : -1;
                }

            });
        };

        self.pageSize = ko.observable(50);

        self.changeSort("Tune name");
    };


    var jsonUrl = "/resources.json"

    $.getJSON(jsonUrl).done(function(data){
        ko.applyBindings(new viewModel(data));
    });

    viewModel.changeSort(viewModel.sortBy());

});
