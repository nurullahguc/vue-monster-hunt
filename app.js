new Vue({
    el: '#app',
    data: {
        gameStatus: false,
        playerLife: 100,
        monsterLife: 100,
        damages: {
            playerAttack: 15,
            specialAttack: 30,
            lifeUp: 30,
            monsterAttack: 20,
        },
        logText: {
            playerAttack: "Player Attack: ",
            specialAttack: "Special Attack: ",
            lifeUp: "Player Life Up: ",
            giveUp: "Player Give Up! ",
            monsterAttack: "Monster Attack: ",
        },
        logs: [],
    },
    methods: {
        startGame: function () {
            this.gameStatus = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
        },
        playerAttack: function () {
            let point = Math.ceil(Math.random() * this.damages.playerAttack)
            this.monsterLife -= point
            this.createLog({turn: 'P', text: this.logText.playerAttack + point})
            this.monsterAttack()
        },
        specialAttack: function () {
            let point = Math.ceil(Math.random() * this.damages.specialAttack)
            this.monsterLife -= point
            this.createLog({turn: 'P', text: this.logText.specialAttack + point})
            this.monsterAttack()
        },
        lifeUp: function () {
            let point = Math.ceil(Math.random() * this.damages.lifeUp)
            this.playerLife += point
            this.createLog({turn: 'P', text: this.logText.lifeUp + point})
            this.monsterAttack()
        },
        giveUp: function () {
            this.playerLife = 0
            this.createLog({turn: 'P', text: this.logText.giveUp})
        },
        monsterAttack: function () {
            let point = Math.ceil(Math.random() * this.damages.monsterAttack)
            this.playerLife -= point
            this.createLog({turn: 'M', text: this.logText.monsterAttack + point})
        },
        createLog: function (val) {
            this.logs.push(val)
        }
    },
    watch: {
        playerLife: function (val) {
            if (val <= 0) {
                this.playerLife = 0
                if (confirm("Kaybettiniz, Tekrar oynamak ister misiniz?")) {
                    this.playerLife = 100
                    this.monsterLife = 100
                    this.logs = []
                } else {
                    this.gameStatus = false
                }
            } else if (val >= 100)
                this.playerLife = 100
        },
        monsterLife: function (val) {
            if (val <= 0) {
                this.playerLife = 0
                if (confirm("Kazandınız, Tekrar oynamak ister misiniz?")) {
                    this.playerLife = 100
                    this.monsterLife = 100
                    this.logs = []
                } else {
                    this.gameStatus = false
                }
            }
        },
    }
})