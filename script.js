$(function() {

	function randomString() {                                                             //kreuje dziesięcioznakowe ID potrzebne przy tworzeniu Column
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		for (var i = 0; i < 10; i++) {                                                    // pętli i pędli, aż losowy ciąg znaków nie będzie miał długości 10
			str += chars[Math.floor(Math.random() * chars.length)];                       // zaokrąglenie do pełnej liczby w dół nałożone na: (losowa liczba mniejsza od jeden pomnożona przez długość stringu 'chars')
		}
		return str;
	}

	function Column(name) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {                                                          //tworzy kolumnę, oto składniki kolumny:
			var $column = $('<div>').addClass('column');                                   //tworzy diva z kolumną
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);         //tworzy tytuł kolumny (h2)
			var $columnCardList = $('<ul>').addClass('column-card-list');                  //tworzy listę nieuporządkowaną (ul) na "karteczki"
			var $columnDelete = $('<button>').addClass('btn-delete').text('x');            //tworzy guzik do kasowania kolumny
			var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj nowe zadanie');    //tworzy guzik do dodawania "karteczek" w kolumne 

			$columnDelete.click(function() {                                               //mówi co trzeba zrobić po kliknięciu guzika z wiersza 22 (btn-delete) (funkcja - ale jeszcze bez definicji, definicja w wierszu 46)
				self.removeColumn();
			});
                                                                                           
			$columnAddCard.click(function() {                                              //mówi co trzeba zrobić po kliknięciu guzika z wiersza 23 (add-card) (funkcja - ale jeszcze bez definicji, definicja w wierszu 43) zasysa jedynie do nowej karty napis metodą 'prompt'
				self.addCard(new Card(prompt('wprowadź nazwę zadania')));
			});

			$column.append($columnTitle)                                                   //Łączenie wszystkich wężłów w odpowiedniej kolejności: Najpierw tytuł, potem przyciski delete i addCard, a na końcu lista kart
			.append($columnDelete)
			.append($columnAddCard)
			.append($columnCardList);

			return $column;                                                                //- bez tego nie mielibyśmy odniesienia do stworzonego elementu tam, gdzie wywołujemy funkcję.
		};
	};

	Column.prototype = {
		addCard: function(card) {                                                          //definiuje funkcję addCard, która pierwszy raz pojawiała się w wierszu 29, card jest zdefiniowane od wiersza 59
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {                                                         //definiuje funkcję removeColumn, która pierwszy raz pojawiała się w wierszu 26
			this.$element.remove();
		}
	};

	function Card(description) {                                                           //tworzenie funkcji konstruującej klasę Card
		var self = this;
		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			if ((!(self.description == false)) && (!(self.description == null))) {
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('x');

			$cardDelete.click(function() {
				self.removeCard();                                                         //medody removeCard na razie jeszcze nie zdefiniowaliśmy (wiersz 78)
			});

			$card.append($cardDelete)
			.append($cardDescription);

			return $card;                                                                  //odniesienie do stworzonego elementu
			} else if (self.description == false) {
				alert('Please write down task description');
			};
		};
	};

	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	};

	var board = {
		name: 'Kanban Board',
		$element: $('#board .column-container'),
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		}
	};

	function initSortable() {
  	$('.column-card-list').sortable({
  		connectWith: '.column-card-list',                     // wybór listy, na którym zadziała sortowanie                           
  		placeholder: 'card-placeholder'                       // trzyma nazwę klasy, która pojawia się po najechaniu na puste pole, na które chcemy upuścić przenoszony element
  	}).disableSelection();                                    // wyłączenie możliwości zaznaczania tekstu na kartach, które przeciągamy. Nie chcemy, aby omyłkowo podczas przeciągania, zaznaczał nam się tekst
  };

  $('.create-column').click(function() {
  	var name = prompt('wprowadź nazwę kolumny');
  	if ((!(name == false)) && (!(name == null))) {
  	var column = new Column(name);
  	board.addColumn(column);
  } else if (name == false) {
  	alert('spróbuj jeszcze raz - wprowadź nazwę kolumny');
  };
  });

  var todoColumn = new Column('DO ZROBIENIA');
  var doingColumn = new Column('W TRAKCIE');
  var doneColumn = new Column('ZROBIONE');

  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);

  var card1 = new Card('kodowanie');
  var card2 = new Card('kawa');
  var card3 = new Card('prysznic');

  todoColumn.addCard(card1);
  doingColumn.addCard(card2);
  doneColumn.addCard(card3);

})
