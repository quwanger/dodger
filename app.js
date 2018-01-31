var app = new Vue({
	el: '#dodger',
	data: {
		teamName: 'Enter your team name',
		editable: false
	},
	methods: {
		editTeam: function(e) {
			this.editable = true;

			// Focus input field
      if(this.editable) {
      	this.$nextTick(() => this.$refs.input.focus());
      }
		},

		saveTeam: function() {
			this.editable = false;
		}
	}
});