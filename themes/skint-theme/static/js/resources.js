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
        self.searchFilter = ko.observable("");
        
        self.years = ko.computed(function(){
            var recordings = self.recordings();
            var years = [];
            ko.utils.arrayMap(recordings, function(item){
                if(years.indexOf(item.year) == -1){
                    years.push(item.year);
                }
                return item.year;
            });
            return years.sort();
        });

        self.selectedYear = ko.observable(null);

        self.selectYear = function(year) {
            self.selectedYear(year);
        }
        self.isSelectedYear = function(year){
            return year == self.selectedYear();
        }

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

        self.filteredRecordings = ko.computed(function () {
            var filtered = self.recordings();

            if(!!self.selectedYear()){
                filtered = ko.utils.arrayFilter(filtered, function(recording){
                    return recording.year == self.selectedYear();
                });
            }

            if (self.searchFilter() != "") {
                filtered = ko.utils.arrayFilter(filtered, function (recording) {
                    var isContained = true;
                    var parts = self.searchFilter().split(' ');

                    for (var i = 0; i < parts.length; i++) {
                        if(parts[i] == "") break;
                        
                        var isPartContained = false;
                        isPartContained = isPartContained || recording.displayName.toLowerCase().indexOf(parts[i].toLowerCase()) > -1;
                        isPartContained = isPartContained || recording.category.toLowerCase().indexOf(parts[i].toLowerCase()) > -1;
                        isPartContained = isPartContained || recording.year.toString().toLowerCase().indexOf(parts[i].toLowerCase()) > -1;
                        isPartContained = isPartContained || recording.workshop.toLowerCase().indexOf(parts[i].toLowerCase()) > -1;
                        isPartContained = isPartContained || recording.tuneType.toLowerCase().indexOf(parts[i].toLowerCase()) > -1;
                        
                        isContained = isPartContained && isContained;
                    }

                    return isContained;
                });

            }

            if (filtered.length > self.pageSize()) {
                filtered = filtered.take(self.pageSize());
            }

            return filtered;
        });

    };


    var jsonUrl = "/resources.json"

    $.getJSON(jsonUrl).done(function(data){
        var instance = new viewModel(data); 
        ko.applyBindings(instance);
        instance.changeSort(instance.sortBy());
    });


});
