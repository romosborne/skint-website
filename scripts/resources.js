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



var recordings = [
            {
                displayName: "Varvinder Friska", 
                year: 2015, 
                category: "Recording", 
                tuneType: "Polska", 
                workshop: "Swedish Tunes", 
                source: "https://drive.google.com/open?id=0B36gCreiztaXR1JfcXVTenhMYVE"
            },
            {
                displayName: "DOOM DOOM DOOM nananananananana", 
                year: 2015, 
                category: "Recording", 
                tuneType: "Slangpolska", 
                workshop: "Swedish Tunes", 
                source: "https://drive.google.com/open?id=0B36gCreiztaXR1JfcXVTenhMYVE"
            },
            {
                displayName: "DOOM DOOM DOOM nananananananana", 
                year: 2015, 
                category: "Sheet Music", 
                tuneType: "Slangpolska", 
                workshop: "Swedish Tunes", 
                source: "https://drive.google.com/open?id=0B36gCreiztaXR1JfcXVTenhMYVE"
            },
            {
                displayName: "Vals",
                year: 2013, 
                category: "Recording", 
                tuneType: "Vals", 
                workshop: "Swedish Tunes",
                source:"https://drive.google.com/open?id=0B36gCreiztaXR1JfcXVTenhMYVE"
            },
            {
                displayName: "Pols efter Hans Gruber", 
                year:2014, 
                category: "Sheet Music",
                tuneType: "Pols", 
                workshop: "Swedish Tunes", 
                source: "https://drive.google.com/open?id=0B36gCreiztaXR1JfcXVTenhMYVE"
            }
            ];


    ko.applyBindings(new viewModel(recordings));

    viewModel.changeSort(viewModel.sortBy());

});