$(document).ready(function(){
  $('.sidenav').sidenav();

  // Default export is a4 paper, portrait, using milimeters for units
  var doc = new jsPDF();

  doc.text('Hello world!', 10, 10);
  
  $('.test').click(function() {
    doc.save('a4.pdf'); 
  })

});

var app = new Vue({
  el: '#dodger',
  data: {
    newPlayer: '',
    players: [],
    killValue: 1,
    deathValue: -1,
    catchValue: 2
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
    }
  },

  mounted() {
    if (localStorage.getItem('Dodger')) {
      this.players = JSON.parse(localStorage.getItem('Dodger'));
    }
  }
});