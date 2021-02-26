$(document).ready(function (e)
{
    
    var dataset = "data/techNotes_table.csv";

    d3.csv(dataset).then(function(data) {
        drawTable(data);
    });
});

function drawTable(dataset) {
    console.log(dataset);

    var tableFull = $('#techNotes_table').DataTable({
        'data': dataset,
        'paging': false,
        'searching': false,
        'info': false,
        'ordering': true,
        'order': [[4, 'asc']],
        'columnDefs': [
            {'targets': [ 4 ], 'visible': false},
            {'targets': [ 0 ], 'orderable': false, 'visible': true}
        ],
        'columns': [
            {'data': 'Age_group', 'title': 'Age Group'},
            {'data': 'Male', 'title': 'Male', 'className': 'dt-body-right', 'render': $.fn.dataTable.render.number( ',', '.')},
            {'data': 'Female', 'title': 'Female', 'className': 'dt-body-right', 'render': $.fn.dataTable.render.number( ',', '.')},
            {'data': 'Total', 'title': 'Total', 'className': 'dt-body-right', 'render': $.fn.dataTable.render.number( ',', '.')},
            {'data': 'Order'}
        ]
    });  
    GenerateAccordion("divTechNotes");
}


function GenerateAccordion(elementName)
{
    const HEADER_DIRECTION_IMG = "<img class='imgRotate' style='margin-right: 10px; margin-left: 5px; margin-bottom: 3px;' src='plus_m.png' data-swap='minus_m.png' alt='' />";

    //Get all child headers. We only need the 1st one, but just in case. 
    let headerElements = $("#" + elementName).find(":header");

    $.each(headerElements, function ()
    {
        //$(this).addClass("header");

        //Add header style
        $(this).css({
            "background-color": "#075290",
            "color": "#fff",
            "padding": "5px 10px",
            "cursor": "pointer",
            "font-weight": "normal",
            "font-size": "18px",
            "border-radius": "4px",
            "border-top-left-radius": "4px",
            "border-top-right-radius": "4px",
            "border-bottom-right-radius": "4px",
            "border-bottom-left-radius": "4px"
        });

        //Append the open/close icon
        $(this).prepend(HEADER_DIRECTION_IMG);

        $(this).attr("aria-expanded", "false");

        //This all a copy/paste of the toggleTables function
        $(this).click(
            function ()
            {
                var currentHeader = $(this);

                /* Image to toggle within header */
                var currentHeaderImage = currentHeader.children();

                /* DIV containing data table */
                var divBelowCurrentHeader = currentHeader.next();

                var currentSource = currentHeaderImage.attr("src");
                var swap = currentHeaderImage.attr("data-swap");

                currentHeaderImage.attr("src", swap).attr("data-swap", currentSource);

                divBelowCurrentHeader.stop().slideToggle(500, function ()
                {

                    if (divBelowCurrentHeader.css('display') == 'none')
                    {
                        divBelowCurrentHeader.attr("aria-hidden", "true");
                        currentHeader.attr("aria-expanded", "false");
                    }
                    else if (divBelowCurrentHeader.css('display') == 'block')
                    {
                        divBelowCurrentHeader.attr("aria-hidden", "false");
                        currentHeader.attr("aria-expanded", "true");
                    }
                });
            }
        );

        //This is added to simplify keyboard navigation
        $(this).keyup(function (event)
        {
            if (event.keyCode == 13)
            {
                $(this).trigger('click');
            }
        });
    });
}

