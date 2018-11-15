// Setting up API communication

var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': 3007,
    'X-Auth-Token': 'c210a25f36491e74805b1285286f38ef'
};

// Headers 

$.ajaxSetup({
    headers: myHeaders
});

// Setting up board

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {
        setupColumns(response.columns)
    }
});

function setupColumns(columns) {
    columns.forEach(function (column) {
        var col = new Column(column.id, column.name);
        board.addColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
    cards.forEach(function(card) {
        var cardObj = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
        col.addCard(cardObj);
    })
}
/*
// Default board

// Creating Columns

var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');

// Adding columns to the board

board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

// Creating cards

var card1 = new Card('New task');
var card2 = new Card('Create kanban boards');

// Adding cards to columns

todoColumn.addCard(card1);
doingColumn.addCard(card2);
*/