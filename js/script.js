$(document).ready(function(){

    var dataToday = moment("2018-01-01");

    daysInList(dataToday);
    addHolidays(dataToday);
//quando premo tasto prev o next rimuovo i li stampati
// ed inserisco quelli nuovi.
//Aggiunti anche alert se vado fuori 2018
    $("#next").click(function(){
        if (dataToday.format("M")!= 12) {
            $("li").remove();
            dataToday.add(1, "months");
            daysInList(dataToday);
            addHolidays(dataToday);
        }else {
            alert("Non puoi andare più avanti!")
        }
    });
    $("#prev").click(function(){
        if (dataToday.format("M")!= 1) {
            $("li").remove();
            dataToday.subtract(1, "months");
            daysInList(dataToday);
            addHolidays(dataToday);
        }else {
            alert("Non puoi andare più indietro!")
        }


    });
});

//funzione che inserisce i giorni nella lista
function daysInList(data){
//mese ed anno nel titolo
    var month = data.format("MMMM");
    var year = data.format("YYYY");
    $("h1.month").text(month + " " + year);

//determino quanti giorni ha il mese e li stampo nel template
    var daysInMonth = data.daysInMonth();
    for (var i = 1; i <= daysInMonth; i++) {
        var dataLi = {
            "day": addZero(i),
            "month":month,
            "year":year,
            "numbers" : year + "-" + data.format("MM") + "-" + addZero(i)
        }

        var source = $("#days-template").html();
        var template = Handlebars.compile(source);
        var html = template(dataLi);

        $(".month-list").append(html);
    }


}

//funzione che aggiunge 0 prima dei numeri <0
function addZero(n){
    if (n<10) {
        n = "0"+n;
        return n;
    }
    return n;
}
//funzione che aggiunge i giorni festivi
function addHolidays(date){
    $.ajax ({
        url: "https://flynn.boolean.careers/exercises/api/holidays",
        method: "GET",
        data: {
            year: date.year(),
            month: date.month()
        },
        success: function (risposta){
            for (var i = 0; i < risposta.response.length; i++) {
                var listItem = $('li[data-complete-date="' + risposta.response[i].date + '"]');
                listItem.append("- " + risposta.response[i].name)
                listItem.addClass("holiday");
            }
        }

    })
}

//funzione che cambia mese quando premo tasto
// prova con click/add(1,month)
