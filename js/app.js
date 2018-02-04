$(document).ready(function(){
  $('.sidenav').sidenav();
});

new Vue({
  el: '#dodger',
  data: {
    teamName: '',
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

    save(location) {
      localStorage.setItem('Dodger', JSON.stringify(this.players));

      if (location === 'nav') {
        M.toast({html: 'Saved!'});
      }
    },

    print() {
      this.setPDF();
      var date = new Date();
      var currentDate = date.toDateString() + " " + date.getHours() + ":" + date.getMinutes();

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
            text: [
              'Team Name\n',
              '(' + currentDate + ' Results)\n\n'
            ],
            style: 'header',
            alignment: 'center'
          },

          {
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
              widths: [ '*', '*', '*', '*', '*' ],

              body: forPDF
            },
            style: 'table'
          }
        ],

        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },

          table: {
            alignment: 'center'
          }
        }
      };

      pdfMake.createPdf(docDefinition).download();

      M.toast({html: 'Printed!'});
    }
  },

  mounted() {
    if (localStorage.getItem('Dodger')) {
      this.players = JSON.parse(localStorage.getItem('Dodger'));
    }
  }
});