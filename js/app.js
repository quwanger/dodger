$(document).ready(function(){
  $('.sidenav').sidenav();

  // var docDefinition = {
  //   content: [
  //     {
  //       layout: 'lightHorizontalLines', // optional
  //       table: {
  //         // headers are automatically repeated if the table spans over multiple pages
  //         // you can declare how many rows should be treated as headers
  //         headerRows: 1,
  //         widths: [ '*', 'auto', 100, '*' ],

  //         body: [
  //           [ 'First', 'Second', 'Third', 'The last one' ],
  //           [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
  //           [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
  //         ]
  //       }
  //     }
  //   ]
  // };

  //pdfMake.createPdf(docDefinition).download();
});

var app = new Vue({
  el: '#dodger',
  data: {
    newPlayer: '',
    players: [],
    killValue: 1,
    deathValue: -1,
    catchValue: 2,
    headers: ['Name', 'Kills', 'Deaths', 'Catches', '+/-'],
  },

  methods: {
    addPlayer() {
      if (this.newPlayer.length > 0) {
        this.players.push({
          name: this.newPlayer,
          kills: 0,
          deaths: 0,
          catches: 0,
          plusminus: 0
        });
        this.newPlayer = '';
      } else {
        alert('Add a name!');
      }

      this.save();
    },

    addPoints(key, index) {
      switch (key) {
        case 'kills':
          this.players[index].kills++;
          break;
        case 'deaths':
          this.players[index].deaths++;
          break;
        case 'catches':
          this.players[index].catches++;
          break;
      }
      this.calculatePlusMinus(index);
      this.save();
    },

    minusPoints(key, index) {
      switch (key) {
        case 'kills':
          if (this.players[index].kills > 0) this.players[index].kills--;
          break;
        case 'deaths':
          if (this.players[index].deaths > 0) this.players[index].deaths--;
          break;
        case 'catches':
          if (this.players[index].catches > 0) this.players[index].catches--;
          break;
      }
      this.calculatePlusMinus(index);
      this.save();
    },

    calculatePlusMinus(index) {
      this.players[index].plusminus = (this.players[index].kills * this.killValue) + (this.players[index].deaths * this.deathValue) + (this.players[index].catches * this.catchValue);
      this.save();
    },

    resetTeam() {
      for (i = 0; i < this.players.length; i++) {
        this.players[i].kills = 0;
        this.players[i].deaths = 0;
        this.players[i].catches = 0;
        this.players[i].plusminus = 0;
      }
    },

    deleteTeam() {
      this.players = [];
      this.save();
    },

    resetPlayer(index) {
      this.players[index].kills = 0;
      this.players[index].deaths = 0;
      this.players[index].catches = 0;
      this.players[index].plusminus = 0;
      this.save();
    },

    deletePlayer(index) {
      this.players.splice(index, 1);
      this.save();
    },

    save() {
      localStorage.setItem('Dodger', JSON.stringify(this.players));
    },

    print() {
      var obj = this.players;
      var array = [];
      var forPDF = [this.headers];

      for (var i = 0; i < this.players.length; i++) {
        array[i] = [obj[i].name, obj[i].kills, obj[i].deaths, obj[i].catches, obj[i].plusminus];
        forPDF.push(array[i]);
      }

      var docDefinition = {
        content: [
          {
            layout: 'lightHorizontalLines', // optional
            table: {
              headerRows: 1,
              widths: [ '*', '*', '*', '*', '*' ],

              body: forPDF
            }
          }
        ]
      };

      pdfMake.createPdf(docDefinition).download();
    }
  },

  mounted() {
    if (localStorage.getItem('Dodger')) {
      this.players = JSON.parse(localStorage.getItem('Dodger'));
    }
  }
});