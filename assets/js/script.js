var saveButtonEL = $("button");
var calendarRow = $('textarea')
var timerEL = $("#currentDay");
var startingTime = moment();
timerEL.text(startingTime.format("dddd, MMMM Do YYYY hh:mm:ssa"));


function handleSave (event) {

    event.preventDefault();

    var currentlEL = $(event.target);

    var textAreaEL = currentlEL.siblings().next();

    textAreaEL.addClass("saved");

    var timeSlot = currentlEL.parent().attr("id")

    localStorage.setItem(timeSlot, textAreaEL.val());

    setTimeout(function () {
        textAreaEL.removeClass("saved");
    },700)

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

        var timeNow = moment();

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

function setCurrentTime () {

    var displayTime = moment();

    timerEL.text(displayTime.format("dddd, MMMM Do YYYY hh:mm:ssa"));

}

function init() {
    setStartingText();
    setColourBlock()
    saveButtonEL.on("click", handleSave);
    setInterval(setCurrentTime, 1000);
    setInterval(setColourBlock, 1000);
};

init();
