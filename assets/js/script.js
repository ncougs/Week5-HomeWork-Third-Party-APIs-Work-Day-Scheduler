var saveButtonEL = $("button");
var calendarRow = $('textarea')
var timeNow = moment();

function handleSave (event) {

    event.preventDefault();

    var currentlEL = $(event.target);

    var textAreaEL = currentlEL.siblings().next();

    var timeSlot = currentlEL.parent().attr("id")

    localStorage.setItem(timeSlot, textAreaEL.val());

    return;

};

function setStartingText () {

    for (i=0; i<calendarRow.length; i++) {

        var currentRow = $(calendarRow[i]);

        var rowID = currentRow.parent().attr("id");

        if (localStorage.getItem(rowID) != 'null') {
            currentRow.text(localStorage.getItem(rowID));
        };

    }

  

};

function setColourBlock () {

    for (i=0; i<calendarRow.length; i++) {

        var currentRow = $(calendarRow[i]);

        var currentHour = timeNow.format('H');
        var timeSlot = Number(currentRow.parent().attr("id"));

        if (currentHour > timeSlot) {
            currentRow.addClass('past')
            }
        else if (currentHour < timeSlot) {
            currentRow.addClass('future');
        }
        else if (currentHour == timeSlot) {
            currentRow.addClass('present');
        };

    }

    
};



setStartingText();
setColourBlock();
saveButtonEL.on("click", handleSave);
