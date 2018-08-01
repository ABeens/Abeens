/*GLOBAL VARAIBLES*/
/*Holidays array configurable*/
var holidays = {};
holidays[new Date('2018/12/04')] = new Date('2018/12/04');
holidays[new Date('2018/12/06')] = new Date('2018/12/06');
holidays[new Date('2018/12/20')] = new Date('2018/12/20');
holidays[new Date('2018/12/25')] = new Date('2018/12/25');
var minDate='';
var maxDayDate= '';
var row=0;
var daysToShow=0;

$(document).ready(function () {
    /*Startdate DatePicker*/
    var start_date = $('input[id="startDatePicker"]');
    var container1 = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
    var options = {
        format: 'mm/dd/yyyy',
        container: container1,
        todayHighlight: true,
        autoclose: true,
    };
    start_date.datepicker(options);
    $("#startDatePicker").datepicker("setDate", GetTodayDate());

    /*Default value for input days to show*/
    $('#daysToShow').val('30');
    $('#countryCode').val('US');
});

/*DRAW FUNCTIONS*/
/*Loop for draw everydatepicker*/
function AddDatePickers(minDate, maxDate){
	var monthsToDraw = GetMonthDifference(minDate,maxDate);
	for(i=0;i<monthsToDraw;i++){
		AddDatepicker(i)
	}
}

/*Add specify datepicker with conditions requested*/
function AddDatepicker(i){
	if(i % 6 === 0  )
	{
		row=i;
		$('#resultDP').append('<div id="row' + i + '" class="row"></div>');
	}
	var start=GetNextMonthDate(minDate,i);
	var end;
	if(start.getMonth()==maxDayDate.getMonth() && start.getFullYear()==maxDayDate.getFullYear())
	{
		end=maxDayDate;
	}
	else
	{
		end= GetMaxDayOfCurrentMonth(start);
	}
	$('#row' + row).append('<div class="col-lg-2"><div id="datepicker' + i + '"></div></div>');
	var newDatepicker = $('div[id="datepicker' + i +'"]');
	var container3 = $('#row' + row);
	var options = {
    	format: 'mm/dd/yyyy',
    	container: container3,
    	todayHighlight: true,
    	autoclose: true,
    	startDate: start,
    	endDate: end,
    	daysOfWeekHighlighted: [0, 6],
    	/*Function run for every day loaded*/
        beforeShowDay: MarkDay
    }
	newDatepicker.datepicker(options);
}

/*DATE FUNCTIONS*/
/*Mark holidays and norm days*/
function MarkDay(dt) {
    var isHolliday = holidays[dt];
    if (isHolliday) {
        return { classes: 'holliday' };
    }
}

/*Gets the today date*/
function GetTodayDate(){
	var d = new Date();
    var currMonth = d.getMonth();
    var currYear = d.getFullYear();
    var currentDate = new Date(currYear, currMonth, 1);
    return currentDate;
}

/*Gets next month of a specify date*/
function GetNextMonthDate(minDate,monthsToAdd){
    var currMonth = minDate.getMonth();
    var currYear = minDate.getFullYear();
    var currentDate = new Date(currYear, currMonth, 1);
    currentDate.setMonth(currentDate.getMonth() + monthsToAdd);
    return currentDate;
}

/*Gets difference in month of two dates*/
function GetMonthDifference(minDate, maxDate){
	var months;
    months = (maxDate.getFullYear() - minDate.getFullYear()) * 12;
    months -= minDate.getMonth();
    months += maxDate.getMonth();
    return (months <= 0 ? 0 : months)+1;
}

/*Gets last day of a specify month*/
function GetMaxDayOfCurrentMonth(date){
	y = date.getFullYear(), m = date.getMonth();
	return new Date(y,m+1,0);
}

/*Gets the last date to draw*/
function GetEndDate(date,daysToAdd){
	var currMonth = date.getMonth();
    var currYear = date.getFullYear();
    var currDay=date.getDate();
    var currentDate = new Date(currYear, currMonth, currDay);
    currentDate.setDate(date.getDate() + Number(daysToAdd));
    return currentDate;
}


/*EVENTS*/
/*Event of button "Process" click*/
function Process(){
	var min=$('#startDatePicker').val();
	if(!min){
		alert('Need fill the start date field');
		return false;
	}
	if(!Date.parse(min)){
		alert('Need a valid start date field');
		return false;
	}
	else
		minDate=new Date(min);

	daysToShow=$('#daysToShow').val();
	if(!daysToShow){
		alert('Need fill the days to show field');
		return false;
	}
	if(isNaN(daysToShow)){
		alert('Need a valid number of days to show in field');
		return false;
	}

	var countryCode=$('#countryCode').val();
	if(!countryCode){
		alert('Need fill the country code field');
		return false;
	}
	$('#resultDP').empty();
	maxDayDate= GetEndDate(minDate,daysToShow);
	AddDatePickers(minDate,maxDayDate);
}