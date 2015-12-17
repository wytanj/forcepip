$(function() {
    var selectSymbol = $("#selectSymbol");
    var oldBid = null;
    //reset the display when the symbol is changed
    selectSymbol.change(function() {
        $("#bid").text("");
        $("#ask").text("");
        oldBid = null;
    });
    var sessionToken = null;
    //called every second to refresh the display
    function getCurrentRates() {
        OANDA.rate.quote(["EUR_USD"], function(rateQuoteResponse) {
            var priceInfo = rateQuoteResponse.prices[0];
            //change the divs' background colour if the rates have changed. TODO: some jQuery animation would be nice:)
            if(oldBid && priceInfo.bid < oldBid) {
                $("#quote-panel").css("background-color", "#dd0000");
            } else if(oldBid && priceInfo.bid > oldBid) {
                $("#quote-panel").css("background-color", "#00dd00");
            } else {
                $("#quote-panel").css("background-color", "#ffffff");
            }
            oldBid = priceInfo.bid;
            //update the displayed rates
            $("#bid").text(priceInfo.bid);
            $("#ask").text(priceInfo.ask);
        });
    }
    //get the symbol list
    OANDA.rate.instruments(0, ['pip', 'precision', 'marginRate'],function(listSymbolsResponse) {
        //add the symbols to our drop down
        for(var cur in listSymbolsResponse.instruments) {
            var symbolName = listSymbolsResponse.instruments[cur].instrument;
            selectSymbol.append("<option value='" + symbolName + "'>" + symbolName + "</option>");
        }
        //select EUR/USD by default
        selectSymbol.find("[value=EUR_USD]").attr("selected", "selected");
        setInterval(getCurrentRates, 1000);
    });
});
