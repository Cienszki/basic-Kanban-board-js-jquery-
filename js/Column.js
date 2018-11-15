function Column(id, name){
    var self = this;
    
    this.id = id;
    this.name = name || 'No name given';
    this.$element = createColumn();
    
    function createColumn(){
        
        // Creating components
        
        var $column = $('<div>').addClass('column');
        var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
        var $columnCardList = $('<ul>').addClass('column-card-list');            
        var $columnDelete= $('<button>').addClass('btn-delete').text('x');
        var $columnAddCard = $('<button>').addClass('add-card').text('Add card');
        
        // Adding events (add/delete)
        
        $columnDelete.click(function() {
            self.removeColumn();
        });
        $columnAddCard.click(function(event) {
            var cardName = prompt('Enter the name of the card');
            event.preventDefault();
            $.ajax({
                url: baseUrl + '/card',
                method: 'POST',
                data: {
                    name: cardName,
                    bootcamp_kanban_column_id: self.id                    
                },
                success: function(response) {
                    var card = new Card(response.id, response.name);
                    self.addCard(card)
                }
            });
            //self.addCard(new Card(cardName));
        });
        
        // Constructing the element (column)
        
        $column
        .append($columnTitle)
        .append($columnDelete)
        .append($columnAddCard)
        .append($columnCardList);
        
        return $column;
    }     
}

// Adding functionality to Column class

Column.prototype = {
    addCard: function(card) {
        this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/column/' + self.id,
            method: 'DELETE',
            success: self.$element.remove()
        });
    }
};
