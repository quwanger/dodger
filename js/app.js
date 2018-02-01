var app = new Vue({
	el: '#dodger',
	data: {
		newPlayer: '',
		players: [],
		title: 'Title'
	},

	methods: {
		addPlayer() {
			if (this.newPlayer.length > 0) {
				this.players.push({ name: this.newPlayer, kills: 0, deaths: 0, catches: 0 });
				this.newPlayer = '';
			} else {
				alert('Add a name!');
			}	
		},

		addPoints: function(key, index) {
			switch(key) {
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
        },

        minusPoints: function(key, index) {
    		switch(key) {
				case 'kills':
					if (this.players[index].kills > 0)
						this.players[index].kills--;
					break;
				case 'deaths':
					if (this.players[index].deaths > 0)
						this.players[index].deaths--;
					break;
				case 'catches':
					if (this.players[index].catches > 0)
						this.players[index].catches--;
					break;
			}
        },
	}
});