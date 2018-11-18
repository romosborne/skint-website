---
title: Resources
date: 2017-03-11T00:00:55+00:00
---

<div class="input-group input-group-lg">
    <span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>
    <input type="text" id="resource-filter-input" class="form-control" placeholder="Search" data-bind="textInput: searchFilter" />

<span class="year-filters">
    <a href="javascript:void(0)"><div class="year-filter" data-bind="click: selectYear(null), css: { 'selected': !selectedYear() }">All</div></a>
    <!-- ko foreach:years -->
        <a href="javascript:void(0)"><div class="year-filter" data-bind="text: $data, click: $parent.selectYear, css: { 'selected': $parent.isSelectedYear($data) }"></div></a>
    <!-- /ko -->
</span>

</div>

<div>
    <table class="table resource-table" data-bind="foreach: filteredRecordings">
        <tr>
            <td>
                <div class="media">
                    <i class="mr-3" data-bind="attr: { title: category }, css: 'fas ' + (category == 'Recording' ? 'fa-music' : 'fa-file')"></i>
                    <div class="media-body">
                        <a data-bind="attr: {href: source, target: '_blank'}"><h5 class="media-heading" data-bind="text:displayName"></h5></a>
                        <div data-bind="text: tuneType + ', from ' + workshop + ' ' + year"></div>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</div>