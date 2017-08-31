---
title: Resources
date: 2017-03-11T00:00:55+00:00
---

<div class="input-group input-group-lg">
<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>
<input type="text" class="form-control" placeholder="Search" data-bind="textInput: searchFilter" />
</div>
<div>
    <table class="table resource-table" data-bind="foreach: filteredRecordings">
        <tr>
            <td>
                <div class="media">
                    <div class="media-left">
                        <span class="media-object"><span data-bind="attr: { title: category }, css: 'glyphicon ' + (category == 'Recording' ? 'glyphicon-headphones' : 'glyphicon-file')"></span></span>
                    </div>
                    <div class="media-body">
                        <a data-bind="attr: {href: source, target: '_blank'}"><h4 class="media-heading" data-bind="text:displayName"></h4></a>
                        <div data-bind="text: tuneType + ', from ' + workshop + ' ' + year"></div>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</div>