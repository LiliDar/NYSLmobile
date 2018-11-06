var app = new Vue({

    el: '#app',

    data: {
        allGames: [],
        allTeams: [],
        allLocations: [],
        filter: {},
        filterArray: [],
        currentMonth: '',
        currentDay: '',
        /*show: true,*/

    },

    created: function () {
        this.getGamesData()
    },

    methods: {

        getGamesData() {

            fetch('https://api.myjson.com/bins/1amy8m', {
                    "method": "GET",
                })
                .then(r => r.json())
                .then(json => {
                    console.log(json);
                    data = json;

                    app.allGames = json.games;
                    app.allTeams = json.allTeams;
                    app.allLocations = json.allLocations;

                    app.fillFilter();
                    app.filterArray = app.allGames;

                    app.currentMonth = new Date().getMonth();
                    app.currentDay = new Date().getDate();
                    console.log(app.currentDay)

                    /*app.showCurrentDate();*/

                })
        },

        fillFilter() {

            var games = app.allGames;

            for (i = 0; i < games.length; i++) {

                if (!this.filter[games[i].teams.visitor] || !this.filter[games[i].teams.host]) {
                    this.filter[games[i].teams.visitor] = [];
                    this.filter[games[i].teams.host] = [];
                }
                if (this.filter[games[i].teams.visitor]) {
                    this.filter[games[i].teams.visitor].push(games[i])
                }
                if (this.filter[games[i].teams.host]) {
                    this.filter[games[i].teams.host].push(games[i])
                }
            }
        },

        fillFilterArray(team) {
            if (team != "all") {
                this.filterArray = this.filter[team];

            } else {
                this.filterArray = this.allGames;
            }
        },

        /*showCurrentDate() {

            var games = app.allGames;

            for (i = 0; i < games.length; i++) {

                if (games[i].date == '9/01') {
                    app.show = true;
                } else {
                    app.show = false;
                }

            }

        },*/

    }
})
