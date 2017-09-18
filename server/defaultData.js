/////////////////////////////////////////////////////////////////////
///////////////////// Insertion des Pizzas /////////////////////////
///////////////////////////////////////////////////////////////////

var PizzasList = [{
        image: "pizzaProvencale.png",
        name: "Paysanne ",
        description: "Sauce tomate, emmenthal, lardons fumés, champignons frais émincés, oeuf, mozzarella fraiche, olives noires confites. ",
        price: 12
    },
        {
            image: "pizzaSummer.png",
            name: "Royale",
            description: "Sauce tomate, emmenthal, épaule cuite tradition, champignons frais émincés, mozzarella fraiche, olives noires confites. ",
            price: 12
        },
        {
            image: "pizzaChorizo.png",
            name: "Valencia",
            description: "Sauce tomate, emmenthal, chorizo traiteur, poivrons frais, oeuf, mozzarella fraiche, olives noires confites. ",
            price: 12
        },
        {
            image: "pizzaCharcuterie.png",
            name: "4 saisons",
            description: "Sauce tomate, emmenthal, épaule cuite tradition, champignons frais émincés, petits artichauts grillés, mozzarella fraiche, olives noires confites. ",
            price: 12
        },
        {
            image: "pizzaVegan.png",
            name: "Buffalo",
            description: "Sauce tomate, emmenthal, steak haché, oignons cuits, mozzarella fraiche, olives noires confites. ",
            price: 12
        },
        {
            image: "pizzaFromage.png",
            name: "Hawaïenne",
            description: "Sauce tomate, emmenthal, épaule cuite tradition, dés d'ananas crus rôtis, mozzarella fraiche, olives noires confites",
            price: 12
        }
        ];
if(Pizzas.find().count() === 0) {
    _.each(PizzasList, function(doc){
        Pizzas.insert(doc);
    })
}

/////////////////////////////////////////////////////////////////////
///////////////////// Insertion des Burgers ////////////////////////
///////////////////////////////////////////////////////////////////


    var BurgersList = [{
            image: "baconBurger.png",
            name: "Le Daron ",
            description: "Après une bonne journée passée à couper du bois à la force des ongles rien ne vaut un bon daron ! Des champignons, des oignons frais et du munster pour l’haleine de bûcheron, du lard et de la sauce ciboulette pour se remplir la panse, bref, le daron c’est comme Mennen : « pour nous les gnomes ! » ",
            price: 12
        },
            {
                image: "classicChickenBurger.png",
                name: "Le grand papa",
                description: "Qu’il pleuve, qu’il vente ou qu’il canicule, il y a pas de saison pour la raclette ! Un bon steak de boeuf, une belle tranche de jambon cru, quelques oignons confits, une poignée de champignons de Lutèce et un nappage de sauce cocktail, chuuuuut ! Tu l’entends chanter dans tes oreilles le bel accent savoyard ? ",
                price: 12
            },
            {
                image: "classicFishBurger.png",
                name: "La poulette",
                description: "Ôte tes tongs et allume la lumière de tes chakras ! hume ce délicieux poulet pané agrémenté de cheddar ! Hume ces quelques rondelles de tomate, cette roquette et sa sauce curry ! Bienvenu au Nirvana du burger, Papa sait aussi prendre soin de ton karma ! ",
                price: 12
            },
            {
                image: "classicBurger.png",
                name: "Le tête de lard",
                description: "Du lard paysan toasté délicatement posée sur du cheddar fondu et une viande de boeuf limousine, c’est du velours ! Mais alors quand on y ajoute quelques rondelles de tomate, de la roquette et une sauce béarnaise, là je vous le dis : cette Tête de lard, c’est de l’art ! ",
                price: 12
            },
            {
                image: "doubleBaconBurger.png",
                name: "Le gaillard",
                description: "C’est toi qui as peté ? Mais non c’est la bonne odeur du Munster ! Ce fromage alsacien relevé de quelques grains de cumin se marie parfaitement avec un bon steak de boeuf hâché, des oignons confits et de la roquette du jardin. Quant à sa sauce tartare… je me l’envoie dare-dare ! ",
                price: 12
            },
            {
                image: "doubleClassicBurger.png",
                name: "Le fils à papa",
                description: "Prêt pour un détour aux States en ouvrant simplement la bouche ? Un croc dans ce fils à Papa et ses oignons frits, pickles et sauce américaine t’emmène à Manhattan plus vite que le Concorde ! Oooooh yeah !",
                price: 12
            }
    ];
if(Burgers.find().count() === 0) {
    _.each(BurgersList, function(doc){
        Burgers.insert(doc);
    })
}
/////////////////////////////////////////////////////////////////////
///////////////////// Insertion des Saladess ///////////////////////
///////////////////////////////////////////////////////////////////

    var SaladesList = [{
            image: "sa1.png",
            name: "L'auvergnate ",
            description: "Après une bonne journée passée à couper du bois à la force des ongles rien ne vaut un bon daron ! Des champignons, des oignons frais et du munster pour l’haleine de bûcheron, du lard et de la sauce ciboulette pour se remplir la panse, bref, le daron c’est comme Mennen : « pour nous les gnomes ! » ",
            price: 12
        },
            {
                image: "sa2.png",
                name: "La Nordiste",
                description: "Qu’il pleuve, qu’il vente ou qu’il canicule, il y a pas de saison pour la raclette ! Un bon steak de boeuf, une belle tranche de jambon cru, quelques oignons confits, une poignée de champignons de Lutèce et un nappage de sauce cocktail, chuuuuut ! Tu l’entends chanter dans tes oreilles le bel accent savoyard ? ",
                price: 12
            },
            {
                image: "sa3.png",
                name: "L'hollandaise",
                description: "Ôte tes tongs et allume la lumière de tes chakras ! hume ce délicieux poulet pané agrémenté de cheddar ! Hume ces quelques rondelles de tomate, cette roquette et sa sauce curry ! Bienvenu au Nirvana du burger, Papa sait aussi prendre soin de ton karma ! ",
                price: 12
            },
            {
                image: "sa4.png",
                name: " La Provençale",
                description: "Du lard paysan toasté délicatement posée sur du cheddar fondu et une viande de boeuf limousine, c’est du velours ! Mais alors quand on y ajoute quelques rondelles de tomate, de la roquette et une sauce béarnaise, là je vous le dis : cette Tête de lard, c’est de l’art ! ",
                price: 12
            },
            {
                image: "sa5.png",
                name: "La César",
                description: "C’est toi qui as peté ? Mais non c’est la bonne odeur du Munster ! Ce fromage alsacien relevé de quelques grains de cumin se marie parfaitement avec un bon steak de boeuf hâché, des oignons confits et de la roquette du jardin. Quant à sa sauce tartare… je me l’envoie dare-dare ! ",
                price: 12
            },
            {
                image: "sa6.png",
                name: "Le fils à papa",
                description: "Prêt pour un détour aux States en ouvrant simplement la bouche ? Un croc dans ce fils à Papa et ses oignons frits, pickles et sauce américaine t’emmène à Manhattan plus vite que le Concorde ! Oooooh yeah !",
                price: 12
            }
    ];
if(Salades.find().count() === 0) {
    _.each(SaladesList, function(doc){
        Salades.insert(doc);
    })
}
/////////////////////////////////////////////////////////////////////
///////////////////// Insertion des boissons /////////////////////////
///////////////////////////////////////////////////////////////////

    var BoissonsList = [{
            image: "cocacola.png",
            name: "Coca Cola",
            description: "Boisson gazeuse",
            price: 1
        },
            {
                image: "cocacolaLight.png",
                name: "Coca Cola light",
                description: "Boisson gazeuse allégé en sucre",
                price: 1
            },
            {
                image: "cocacolaZero.png",
                name: "Coca Cola zero",
                description: "Boisson gazeuse sans sucre",
                price: 1
            },
            {
                image: "fanta.png",
                name: "Fanta",
                description: "Boisson gazeuse aromatisé à l'orange",
                price: 1
            },
            {
                image: "nestea.png",
                name: "Nestea",
                description: "Boisson à base de thé",
                price: 1
            },
            {
                image: "sprite.png",
                name: "Sprite",
                description: "Limonade",
                price: 1
            }
    ];
if(Boissons.find().count() === 0) {
    _.each(BoissonsList, function(doc){
        Boissons.insert(doc);
    })
}

/////////////////////////////////////////////////////////////////////
///////////////////// Insertion des boissons /////////////////////////
///////////////////////////////////////////////////////////////////

var DessertsList= [{
    image: "cone.png",
    name: "Cornet de glace",
    description: "Glace en cornet vanille chocolat, coulis de fraise",
    price: 3
},
    {
        image: "donut.png",
        name: "Donut",
        description: "Beignet au chocolat",
        price: 2
    },
    {
        image: "fondant.png",
        name: "Fondant",
        description: "Fondant moelleux au chocolat",
        price: 2
    },
    {
        image: "milkshake.png",
        name: "Milkshake",
        description: "Boisson lacté aromatisé",
        price: 2
    },
    {
        image: "muffin.png",
        name: "Muffin",
        description: "Muffin moelleux au chocolat",
        price: 2
    },
    {
        image: "sunday.png",
        name: "Sunday",
        description: "dessert glacé à la vanille, coulis au choix",
        price: 2
    }
];

if(Desserts.find().count() === 0) {
    _.each(DessertsList, function(doc){
        Desserts.insert(doc);
    })
}