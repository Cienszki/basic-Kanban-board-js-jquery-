function Card(id, name) {
    var self = this;
    this.name = name || "No name given";
    this.id = id;
    this.$element = createCard();

    function createCard() {

        // Creating components

        var $card = $('<li>').addClass('card');
        var $cardDescription = $('<p>').addClass('card-description').text(self.name);
        var $cardDelete = $('<button>').addClass('btn-delete').text('x');

        // Adding event (delete)

        $cardDelete.click(function() {
            self.removeCard();
        });

        // Constructing the element (card)
        
        $card                
            .append($cardDelete)
            .append($cardDescription);
        
        return $card;
    }
}

// Adding functionality to Card class

Card.prototype = {
    removeCard: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function() {
                self.$element.remove();
            }
        })            
    }
};