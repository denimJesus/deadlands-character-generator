/* 
	TODO: Transport-kamat gear-listasta, descriptionit,
	aseet joissa pistimet/veitset?, Arcane Background?,
	All Thumbs -apt. costit, Harrowed?, Mysterious Pasts?
	El Cheapo -kamat inventoreihin (ammot ja leMat't näkyviin?)
*/
var traitCards = [], jokerSuits = [], traitDice = [], hindCosts = 0,
	spectAptPoint = false, jokerNum = 0, elCheapo = 0, // 1 = -75%, 2 = -50%
	output, input, desc, cardNum, aptPoints, traitsTxt,
	pace, wind, size = 6, grit = 0, notes = "", cash = 250, tempApt = 0,
	cognition, deftness, knowledge, mien, nimbleness, quickness,
	smarts, spirit, strength, vigor,
	coDie = "d1", deDie, knDie = "d1", miDie, niDie = "d1",
	quDie, smDie = "d1", spDie = "d1", stDie, viDie = "d1",
	deck = [
	"AC", "AD", "AH", "AS",
	"2C", "2D", "2H", "2S",
	"3C", "3D", "3H", "3S",
	"4C", "4D", "4H", "4S",
	"5C", "5D", "5H", "5S",
	"6C", "6D", "6H", "6S",
	"7C", "7D", "7H", "7S",
	"8C", "8D", "8H", "8S",
	"9C", "9D", "9H", "9S",
	"TC", "TD", "TH", "TS", // T = 10
	"JC", "JD", "JH", "JS",
	"QC", "QD", "QH", "QS",
	"KC", "KD", "KH", "KS",
	"XB", "XR"],            // X = jokeri, [B]lack tai [R]ed
	aptitudes = [{name:"Artillery", con:"", trait:"co", type:"mental", fname:"artillery", lvl:0},
		{name:"Scrutinize", trait:"co", type:"mental", fname:"scrutinize", lvl:0},
		{name:"Search", trait:"co", type:"mental", fname:"search", lvl:1},
		{name:"Trackin'", trait:"co", type:"mental", fname:"trackin", lvl:0},
		{name:"Bow", trait:"de", type:"corporeal", fname:"bow", lvl:0},
		{name:"Filchin'", trait:"de", type:"corporeal", fname:"filchin", lvl:0},
		{name:"Lockpickin'", trait:"de", type:"corporeal", fname:"lockpickin", lvl:0},
		{name:"Shootin'", con:"", trait:"de", type:"corporeal", fname:"shootin", lvl:0},
		{name:"Sleight o' Hand", trait:"de", type:"corporeal", fname:"sleightO", lvl:0},
		{name:"Speed Load", con:"", trait:"de", type:"corporeal", fname:"speedLoad", lvl:0},
		{name:"Throwin'", con:"", trait:"de", type:"corporeal", fname:"throwin", lvl:0},
		{name:"Area Knowledge: Home County", trait:"kn", type:"mental", fname:"areaHome", lvl:2},
		{name:"Demolition", trait:"kn", type:"mental", fname:"demolition", lvl:0},
		{name:"Disguise", trait:"kn", type:"mental", fname:"disguise", lvl:0},
		{name:"Mad Science", trait:"kn", type:"mental", fname:"madScience", lvl:0},
		{name:"Medicine", con:"", trait:"kn", type:"mental", fname:"medicine", lvl:0},
		{name:"Animal Wranglin'", con:"", trait:"mi", type:"mental", fname:"animalWr", lvl:0},
		{name:"Leadership", trait:"mi", type:"mental", fname:"leadership", lvl:0},
		{name:"Overawe", trait:"mi", type:"mental", fname:"overawe", lvl:0},
		{name:"Performin'", con:"", trait:"mi", type:"mental", fname:"performin", lvl:0},
		{name:"Persuasion", trait:"mi", type:"mental", fname:"persuasion", lvl:0},
		{name:"Tale Tellin'", trait:"mi", type:"mental", fname:"taleTellin", lvl:0},
		{name:"Climbin'", trait:"ni", type:"corporeal", fname:"climbin", lvl:1},
		{name:"Dodge", trait:"ni", type:"corporeal", fname:"dodge", lvl:0},
		{name:"Drivin'", con:"", trait:"ni", type:"corporeal", fname:"drivin", lvl:0},
		{name:"Fightin'", con:"", trait:"ni", type:"corporeal", fname:"fightin", lvl:0},
		{name:"Hexslingin'", trait:"", type:"", fname:"hexslingin", lvl:0},
		{name:"Horse Ridin'", trait:"ni", type:"corporeal", fname:"horseRidin", lvl:0},
		{name:"Sneak", trait:"ni", type:"corporeal", fname:"sneak", lvl:1},
		{name:"Swimmin'", trait:"ni", type:"corporeal", fname:"swimmin", lvl:0},
		{name:"Teamster", trait:"ni", type:"corporeal", fname:"teamster", lvl:0},
		{name:"Quick Draw", con:"", trait:"qu", type:"corporeal", fname:"quickDraw", lvl:0},
		{name:"Bluff", trait:"sm", type:"mental", fname:"bluff", lvl:0},
		{name:"Gamblin'", trait:"sm", type:"mental", fname:"gamblin", lvl:0},
		{name:"Ridicule", trait:"sm", type:"mental", fname:"ridicule", lvl:0},
		{name:"Scroungin'", trait:"sm", type:"mental", fname:"scroungin", lvl:0},
		{name:"Survival", con:"", trait:"sm", type:"mental", fname:"survival", lvl:0},
		{name:"Tinkerin'", trait:"sm", type:"mental", fname:"tinkerin", lvl:0},
		{name:"Faith", trait:"sp", type:"mental", fname:"faith", lvl:0},
		{name:"Guts", trait:"sp", type:"mental", fname:"guts", lvl:0}],
	hindrances = [{name:"Ailin'", cost:"1/3/5", fname:"ailin", lvl:0, desc:""},
		{name:"All Thumbs", cost:"2", fname:"allThumbs", lvl:0, desc:""},
		{name:"Bad Ears", cost:"3/5", fname:"badEars", lvl:0, desc:""},
		{name:"Bad Eyes", cost:"3/5", fname:"badEyes", lvl:0, desc:""},
		{name:"Bad Luck", cost:"5", fname:"badLuck", lvl:0, desc:""},
		{name:"Big Britches", cost:"3", fname:"bigBritches", lvl:0, desc:""},
		{name:"Big Mouth", cost:"3", fname:"bigMouth", lvl:0, desc:""},
		{name:"Big 'Un", cost:"1/2", fname:"bigUn", lvl:0, desc:""},
		{name:"Bloodthirsty", cost:"2", fname:"bloodthirsty", lvl:0, desc:""},
		{name:"Cautious", cost:"3", fname:"cautious", lvl:0, desc:""},
		{name:"Curious", cost:"3", fname:"curious", lvl:0, desc:""},
		{name:"Clueless", cost:"3", fname:"clueless", lvl:0, desc:""},
		{name:"Death Wish", cost:"5", fname:"deathWish", lvl:0, desc:""},
		{name:"Doubting Thomas", cost:"3", fname:"doubting", lvl:0, desc:""},
		{name:"Enemy", cost:"1/2/3/4/5", fname:"enemy", lvl:0, desc:""},
		{name:"Ferner", cost:"3", fname:"ferner", lvl:0, desc:""},
		{name:"Geezer", cost:"3/5", fname:"geezer", lvl:0, desc:""},
		{name:"Greedy", cost:"2", fname:"greedy", lvl:0, desc:""},
		{name:"Grim Servant o' Death", cost:"5", fname:"grimServant", lvl:0, desc:""},
		{name:"Habit", cost:"1/2/3", fname:"habit", lvl:0, desc:""},
		{name:"Hankerin'", cost:"1/3", fname:"hankerin", lvl:0, desc:""},
		{name:"Heavy Sleeper", cost:"1", fname:"heavySleeper", lvl:0, desc:""},
		{name:"Heroic", cost:"3", fname:"heroic", lvl:0, desc:""},
		{name:"High-Falutin'", cost:"2", fname:"highFalutin", lvl:0, desc:""},
		{name:"Illiterate", cost:"3", fname:"illiterate", lvl:0, desc:""},
		{name:"Impulsive", cost:"3", fname:"impulsive", lvl:0, desc:""},
		{name:"Intolerance", cost:"1/2/3", fname:"intolerance", lvl:0, desc:""},
		{name:"Kid", cost:"2/4", fname:"kid", lvl:0, desc:""},
		{name:"Law o' The West", cost:"3", fname:"lawO", lvl:0, desc:""},
		{name:"Lame", cost:"3/5", fname:"lame", lvl:0, desc:""},
		{name:"Loco", cost:"1/2/3/4/5", fname:"loco", lvl:0, desc:""},
		{name:"Loyal", cost:"3", fname:"loyal", lvl:0, desc:""},
		{name:"Lyin' Eyes", cost:"3", fname:"lyinEyes", lvl:0, desc:""},
		{name:"Miser", cost:"3", fname:"miser", lvl:0, desc:""},
		{name:"Mean as a Rattler", cost:"2", fname:"mean", lvl:0, desc:""},
		{name:"Night Terrors", cost:"5", fname:"nightTerrors", lvl:0, desc:""},
		{name:"Oath", cost:"1/2/3/4/5", fname:"oath", lvl:0, desc:""},
		{name:"Obligation", cost:"1/2/3/4/5", fname:"obligation", lvl:0, desc:""},
		{name:"Outlaw", cost:"1/2/3/4/5", fname:"outlaw", lvl:0, desc:""},
		{name:"One-Armed Bandit", cost:"3", fname:"oneArmed", lvl:0, desc:""},
		{name:"Pacifist", cost:"3/5", fname:"pacifist", lvl:0, desc:""},
		{name:"Poverty", cost:"3", fname:"poverty", lvl:0, desc:""},
		{name:"Randy", cost:"3", fname:"randy", lvl:0, desc:""},
		{name:"Scrawny", cost:"5", fname:"scrawny", lvl:0, desc:""},
		{name:"Self-Righteous", cost:"3", fname:"selfRighteous", lvl:0, desc:""},
		{name:"Slowpoke", cost:"1/2/3/4/5", fname:"slowpoke", lvl:0, desc:""},
		{name:"Squeaky", cost:"2", fname:"squeaky", lvl:0, desc:""},
		{name:"Squeamish", cost:"3", fname:"squeamish", lvl:0, desc:""},
		{name:"Stubborn", cost:"2", fname:"stubborn", lvl:0, desc:""},
		{name:"Superstitious", cost:"2", fname:"superstitious", lvl:0, desc:""},
		{name:"Tinhorn", cost:"2", fname:"tinhorn", lvl:0, desc:""},
		{name:"Thin-Skinned", cost:"3", fname:"thinSkinned", lvl:0, desc:""},
		{name:"Tuckered", cost:"1/2/3/4/5", fname:"tuckered", lvl:0, desc:""},
		{name:"Ugly As Sin", cost:"1", fname:"ugly", lvl:0, desc:""},
		{name:"Vengeful", cost:"3", fname:"vengeful", lvl:0, desc:""},
		{name:"Wanted", cost:"1/2/3/4/5", fname:"wanted", lvl:0, desc:""},
		{name:"Yearnin'", cost:"1/2/3/4/5", fname:"yearnin", lvl:0, desc:""},
		{name:"Yeller", cost:"5", fname:"yeller", lvl:0, desc:""}],
	edges = [{name:"Arcane Background", cost:"3", fname:"arcane", lvl:0, desc:""},
		{name:"Belongin's", cost:"1/2/3/4/5", fname:"belongins", lvl:0, desc:""},
		{name:"Big Ears", cost:"1", fname:"bigEars", lvl:0, desc:""},
		{name:"Brave", cost:"2", fname:"brave", lvl:0, desc:""},
		{name:"Brawny", cost:"3", fname:"brawny", lvl:0, desc:""},
		{name:"Dinero", cost:"1/2/3/4/5", fname:"dinero", lvl:0, desc:""},
		{name:"Don't Get 'Im Riled!", cost:"2", fname:"dontGet", lvl:0, desc:""},
		{name:"Eagle Eyes", cost:"1", fname:"eagleEyes", lvl:0, desc:""},
		{name:"Fleet-Footed", cost:"1/2/3/4/5", fname:"fleetFooted", lvl:0, desc:""},
		{name:"Friends in High Places", cost:"1/2/3/4/5", fname:"friends", lvl:0, desc:""},
		{name:"Gift of Gab", cost:"1", fname:"giftOfGab", lvl:0, desc:""},
		{name:"Keen", cost:"3", fname:"keen", lvl:0, desc:""},
		{name:"Kemosabe", cost:"1/2", fname:"kemosabe", lvl:0, desc:""},
		{name:"Law Man", cost:"1/3/5", fname:"lawMan", lvl:0, desc:""},
		{name:"Level-Headed", cost:"5", fname:"levelHeaded", lvl:0, desc:""},
		{name:"Light Sleeper", cost:"1", fname:"lightSleeper", lvl:0, desc:""},
		{name:"Luck o' The Irish", cost:"5", fname:"luckO", lvl:0, desc:""},
		{name:"Mechanically Inclined", cost:"1", fname:"mechanical", lvl:0, desc:""},
		{name:"Nerves o' Steel", cost:"1", fname:"nervesO", lvl:0, desc:""},
		{name:"Purty", cost:"1", fname:"purty", lvl:0, desc:""},
		{name:"Rank", cost:"1/2/3/4/5", fname:"rank", lvl:0, desc:""},
		{name:"Renown", cost:"1/3/5", fname:"renown", lvl:0, desc:""},
		{name:"Sand", cost:"1/2/3/4/5", fname:"sand", lvl:0, desc:""},
		{name:"Sense o' Direction", cost:"1", fname:"senseO", lvl:0, desc:""},
		{name:"Sidekick", cost:"5", fname:"sidekick", lvl:0, desc:""},
		{name:'"The Stare"', cost:"1", fname:"theStare", lvl:0, desc:""},
		{name:"Thick-Skinned", cost:"3", fname:"thickSkinned", lvl:0, desc:""},
		{name:"Tough as Nails", cost:"1/2/3/4/5", fname:"tough", lvl:0, desc:""},
		{name:"Two-Fisted", cost:"3", fname:"twoFisted", lvl:0, desc:""},
		{name:"Veteran o' The Weird West", cost:"-15", fname:"veteranO", lvl:0, desc:""},
		{name:'"The Voice"', cost:"1", fname:"theVoice", lvl:0, desc:""}],
	guns = [{name:"Gatling Gun", type:"auto", malf:19, shots:45, cal:".36", rof:3, dam:"3d8", range:20, price:1500, ammoPrice:2, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Gatling Pistol", type:"auto", malf:19, shots:12, cal:".44", rof:3, dam:"3d6", range:10, price:800, ammoPrice:3, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Sharps '55", type:"carb", malf:20, shots:1, cal:".57 C&B", rof:1, dam:"5d8", range:15, price:18, ammoPrice:1.75, ammoAmount:30, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Spencer", type:"carb", malf:20, shots:7, cal:".56", rof:1, dam:"4d8", range:15, price:15, ammoPrice:5, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"LeMat Carbine", type:"carb", malf:20, shots:9, cal:".42", rof:1, dam:"3d6", range:15, price:35, ammoPrice:4, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0, leMat:true},
		{name:"&emsp;& Shotgun", type:"carb", malf:20, shots:1, cal:"16-gauge", rof:1, dam:"Special", range:5, price:0, ammoPrice:2, ammoAmount:20, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Derringer", type:"derr", malf:20, shots:2, cal:".44", rof:2, dam:"3d6", range:5, price:8, ammoPrice:3, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"English 1840 Model", type:"derr", malf:20, shots:8, cal:".36 C&B", rof:1, dam:"2d6", range:5, price:5, ammoPrice:1.75, ammoAmount:30, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Rupertus Pepperbox", type:"derr", malf:20, shots:8, cal:".22", rof:1, dam:"2d4", range:5, price:6, ammoPrice:2, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Wesson Dagger-Pistol", type:"derr", malf:20, shots:2, cal:".41", rof:1, dam:"2d6", range:5, price:6, ammoPrice:3, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Colt Army", type:"sing", malf:20, shots:6, cal:".44", rof:1, dam:"3d6", range:10, price:12, ammoPrice:3, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Colt Buntline Special", type:"sing", malf:20, shots:6, cal:".45", rof:1, dam:"3d6", range:10, price:500, ammoPrice:3, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Colt Dragoon", type:"sing", malf:20, shots:6, cal:".44", rof:1, dam:"3d6", range:10, price:11, ammoPrice:3, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Colt Navy", type:"sing", malf:20, shots:6, cal:".36", rof:1, dam:"2d6", range:10, price:10, ammoPrice:2, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Colt Peacemaker (single-action)", type:"sing", malf:20, shots:6, cal:".45", rof:1, dam:"3d6", range:10, price:15, ammoPrice:3, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Knuckle-Duster", type:"sing", malf:20, shots:5, cal:".32", rof:1, dam:"2d6", range:5, price:8, ammoPrice:2, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"LeMat Grapeshot Pistol", type:"sing", malf:20, shots:9, cal:".40", rof:1, dam:"2d6", range:10, price:25, ammoPrice:3, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0, leMat:true},
		{name:"&emsp;& Shotgun", type:"sing", malf:20, shots:1, cal:"16-gauge", rof:1, dam:"Special", range:5, price:0, ammoPrice:2, ammoAmount:20, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Colt Frontier", type:"doub", malf:20, shots:6, cal:".32-20", rof:2, dam:"2d6", range:10, price:8, ammoPrice:2, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Colt Lightning", type:"doub", malf:20, shots:6, cal:".38", rof:2, dam:"2d6", range:10, price:13, ammoPrice:2, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Colt Peacemaker (double-action)", type:"doub", malf:20, shots:6, cal:".45", rof:2, dam:"3d6", range:10, price:15, ammoPrice:3, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Colt Thunderer", type:"doub", malf:20, shots:6, cal:".41", rof:2, dam:"2d6", range:10, price:14, ammoPrice:3, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Starr Revolver", type:"doub", malf:20, shots:6, cal:".44 C&B", rof:2, dam:"3d6", range:10, price:9, ammoPrice:1.75, ammoAmount:30, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Ballard '72", type:"rifl", malf:20, shots:1, cal:".56 C&B", rof:1, dam:"5d8", range:20, price:24, ammoPrice:1.75, ammoAmount:30, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Ballard Express", type:"rifl", malf:20, shots:11, cal:".50", rof:1, dam:"4d10", range:20, price:30, ammoPrice:4, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Colt-Paterson Model '36", type:"rifl", malf:20, shots:7, cal:".69 C&B", rof:1, dam:"5d10", range:20, price:25, ammoPrice:1.75, ammoAmount:30, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Colt Revolving Rifle", type:"rifl", malf:20, shots:5, cal:".56 C&B", rof:1, dam:"5d8", range:20, price:24, ammoPrice:1.75, ammoAmount:30, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Enfield Musket (muzzle-loaded)", type:"rifl", malf:20, shots:1, cal:".58 C&B", rof:1, dam:"5d8", range:10, price:25, ammoPrice:1.75, ammoAmount:30, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Evans Old Model Sporter", type:"rifl", malf:20, shots:34, cal:".44 Evans", rof:1, dam:"4d8", range:20, price:30, ammoPrice:4, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Remington '71", type:"rifl", malf:20, shots:1, cal:".50-.70", rof:1, dam:"4d10", range:20, price:20, ammoPrice:5, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Sharp's Big 50", type:"rifl", malf:20, shots:1, cal:".50", rof:1, dam:"4d10", range:20, price:20, ammoPrice:4, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Springfield (muzzle-loaded)", type:"rifl", malf:20, shots:1, cal:".58 C&B", rof:1, dam:"5d8", range:20, price:8, ammoPrice:1.75, ammoAmount:30, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Winchester '73", type:"rifl", malf:20, shots:15, cal:".44-40", rof:1, dam:"4d8", range:20, price:25, ammoPrice:4, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Winchester '76", type:"rifl", malf:20, shots:15, cal:".45", rof:1, dam:"4d8+2", range:20, price:40, ammoPrice:4, ammoAmount:50, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Colt Revolving Shotgun", type:"shot", malf:20, shots:5, cal:"12-gauge", rof:1, dam:"Special", range:10, price:45, ammoPrice:2, ammoAmount:20, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Double barrel", type:"shot", malf:20, shots:2, cal:"12-gauge", rof:2, dam:"Special", range:10, price:35, ammoPrice:2, ammoAmount:20, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Scattergun", type:"shot", malf:20, shots:2, cal:"12-gauge", rof:2, dam:"Special", range:5, price:35, ammoPrice:2, ammoAmount:20, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Single Barrel", type:"shot", malf:20, shots:1, cal:"12-gauge", rof:1, dam:"Special", range:10, price:25, ammoPrice:2, ammoAmount:20, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Winchester Lever-Action Shotgun", type:"shot", malf:20, shots:4, cal:"12-gauge", rof:1, dam:"Special", range:10, price:35, ammoPrice:2, ammoAmount:20, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Bow & Arrow", type:"other", malf:20, shots:1, cal:"Arrow", rof:1, dam:"STR+1d6", range:10, price:3, ammoPrice:2, ammoAmount:20, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Flamethrower", type:"other", malf:20, shots:30, cal:"-", rof:"1d6", dam:"1d10/shot", range:"20 max", price:2000, ammoPrice:0, ammoAmount:0, owned:0, elCheapo75:0, elCheapo50:0, ammo:0},
		{name:"Bolas", type:"throw", malf:20, shots:1, cal:"Bolo", rof:1, dam:"STR+1d4", range:5, price:3, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Dynamite", type:"throw", malf:20, shots:1, cal:"1 stick", rof:1, dam:"3d20 (BR 10)", range:5, price:3, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Nitro", type:"throw", malf:20, shots:1, cal:"8 oz. bottle", rof:1, dam:"3d20 (BR 10)", range:5, price:1.25, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Thrown knife", type:"throw", shots:1, malf:20, cal:"Knife", rof:1, dam:"STR+1d6", range:5, price:3, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Thrown spear", type:"throw", shots:1, malf:20, cal:"Spear", rof:1, dam:"STR+2d6", range:5, price:3, owned:0, elCheapo75:0, elCheapo50:0}],
	melee = [{name:"Brass Knuckles", malf:20, db:"-", dam:"STR+1d4", price:1, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Club, small", malf:20, db:"-", dam:"STR+1d4", price:0, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Club, large", malf:20, db:"+1", dam:"STR+1d6", price:0, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Knife", malf:20, db:"+1", dam:"STR+1d4", price:2, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Knife, large (Bowie)", malf:20, db:"+1", dam:"STR+1d6", price:4, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Rapier", malf:20, db:"+2", dam:"STR+2d6", price:10, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Saber", malf:20, db:"+2", dam:"STR+2d8", price:15, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Spear", malf:20, db:"+3", dam:"STR+2d6", price:3, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Tomahawk", malf:20, db:"-", dam:"STR+2d6", price:3, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Whip", malf:20, db:"+1", dam:"STR", price:10, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Lariat", malf:20, db:"-", dam:"-", price:4, owned:0, elCheapo75:0, elCheapo50:0}],
	gear = [{name:"Boots", type:"clothes", malf:20, price:8, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Chaps (Armor -2)", type:"clothes", malf:20, price:4, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Duster", type:"clothes", malf:20, price:10, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Longjohns", type:"clothes", malf:20, price:2, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Shirt/blouse, dress", type:"clothes", malf:20, price:3, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Shirt/blouse, work", type:"clothes", malf:20, price:1, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Silk stockings", type:"clothes", malf:20, price:1, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Shoes", type:"clothes", malf:20, price:2, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Suit/fancy dress", type:"clothes", malf:20, price:15, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Trousers/skirt", type:"clothes", malf:20, price:2, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Winter coat", type:"clothes", malf:20, price:15, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Blasting cap", type:"explosives", malf:20, price:1, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Dynamite (stick)", type:"explosives", malf:20, price:3, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Fuse (foot)", type:"explosives", malf:20, price:0.05, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Nitro (pint)", type:"explosives", malf:20, price:2.50, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Bacon (pound)", type:"foodDrink", malf:20, price:0.15, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Coffee (pound)", type:"foodDrink", malf:20, price:0.25, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Trail rations (for a day)", type:"foodDrink", malf:20, price:0.50, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Cheap bottle of liquor", type:"foodDrink", malf:20, price:2, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Good bottle of liquor", type:"foodDrink", malf:20, price:5, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Axe", type:"general", malf:20, price:2, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Backpack", type:"general", malf:20, price:2, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Barbed wire (yard)", type:"general", malf:20, price:0.05, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Bed roll", type:"general", malf:20, price:4, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Camera", type:"general", malf:20, price:3, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Canteen", type:"general", malf:20, price:1, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Cigar", type:"general", malf:20, price:0.05, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Detonator, plunger", type:"general", malf:20, price:10, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Detonation wire (50')", type:"general", malf:20, price:2.50, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Drill", type:"general", malf:20, price:2, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"File", type:"general", malf:20, price:0.25, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Guitar", type:"general", malf:20, price:8, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Hammer", type:"general", malf:20, price:0.50, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Handcuffs", type:"general", malf:20, price:3.50, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Harmonica", type:"general", malf:20, price:0.50, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Hatchet", type:"general", malf:20, price:1, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Iron skillet", type:"general", malf:20, price:0.50, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Lantern", type:"general", malf:20, price:2.50, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Lantern oil (gallon)", type:"general", malf:20, price:0.10, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Matches (x100)", type:"general", malf:20, price:0.50, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Mess kit", type:"general", malf:20, price:2, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Photographic plate", type:"general", malf:20, price:1, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Pick", type:"general", malf:20, price:2, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Pipe", type:"general", malf:20, price:2, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Playing cards", type:"general", malf:20, price:0.25, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Rope (50')", type:"general", malf:20, price:5, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Shovel", type:"general", malf:20, price:1.50, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Spectacles", type:"general", malf:20, price:5, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Tobacco, chewing (tin)", type:"general", malf:20, price:0.50, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Tobacco, smoking (pouch)", type:"general", malf:20, price:0.50, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Watch, standard", type:"general", malf:20, price:2.50, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Watch, gold", type:"general", malf:20, price:10, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Gun belt", type:"gunAcc", malf:20, price:2, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Holster", type:"gunAcc", malf:20, price:3, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Quick-draw holster", type:"gunAcc", malf:20, price:11, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Rifle scabbard", type:"gunAcc", malf:20, price:3, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Shotgun thong", type:"gunAcc", malf:20, price:0.25, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Speed-load cylinder", type:"gunAcc", malf:20, price:3, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Bonnet", type:"hats", malf:20, price:2, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Derby", type:"hats", malf:20, price:1.50, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Fedora", type:"hats", malf:20, price:3, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Sombrero", type:"hats", malf:20, price:3.50, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Stetson", type:"hats", malf:20, price:5, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Buckboard", type:"transport", malf:20, price:75, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Buggy/cab", type:"transport", malf:20, price:200, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Conestoga wagon", type:"transport", malf:20, price:200, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Horse", type:"transport", malf:20, price:150, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Mule", type:"transport", malf:20, price:50, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Saddle", type:"transport", malf:20, price:25, owned:0, elCheapo75:0, elCheapo50:0},
		{name:"Saddle bags", type:"transport", malf:20, price:5, owned:0, elCheapo75:0, elCheapo50:0}],
	notesHTML = '<br><p><b>Notes</b>&emsp;<input type=button value="Edit" ' +
		'onclick="editNotes()"</p>',
	editMode = false;

function drawTraits() {
	var card = [],
		traitCardsTxt = "";
	cardNum = document.getElementById("cardNum").value;
	if (cardNum < 10 || cardNum > 52) {return;}
	// Vedetään cardNum korttia ja lisätään traitCards-arrayhin
	for (i = 0; i < cardNum; i++) {
		card[i] = Math.floor(Math.random() * 54);
		// Tarkistetaan ettei ole samoja kortteja
		for (j = 0; j < traitCards.length; j++) {
			if (card[i] == traitCards[j]) {
			i--;
			break;
		}}
		traitCards[i] = card[i];
	}
	// Muutetaan traitCards numeroista korttimuotoon
	for (i = 0; i < cardNum; i++) {traitCards[i] = deck[traitCards[i]]}
	// ...ja edelleen tekstiksi, eri muuttujalle
	for (i = 0; i < cardNum; i++) {
		if (traitCards[i].charAt(0) == "X") {
			jokerNum++;
			if (traitCards[i].charAt(1) == "B") {
				traitCardsTxt += "Black Joker"}
			else {traitCardsTxt += "Red Joker"}
			drawJokerSuit(jokerNum - 1);
			if (jokerSuits[jokerNum - 1].charAt(1) == "C") {
				traitCardsTxt += " (&clubs;)<br>"}
			else if (jokerSuits[jokerNum - 1].charAt(1) == "D") {
				traitCardsTxt += " (&diams;)<br>"}
			else if (jokerSuits[jokerNum - 1].charAt(1) == "H") {
				traitCardsTxt += " (&hearts;)<br>"}
			else if (jokerSuits[jokerNum - 1].charAt(1) == "S") {
				traitCardsTxt += " (&spades;)<br>"}
			continue;}
		else if (traitCards[i].charAt(0) == "A") {
			traitCardsTxt += "Ace of ";}
		else if (traitCards[i].charAt(0) == "T") {
			traitCardsTxt += "10 of "}
		else if (traitCards[i].charAt(0) == "J") {
			traitCardsTxt += "Jack of "}
		else if (traitCards[i].charAt(0) == "Q") {
			traitCardsTxt += "Queen of "}
		else if (traitCards[i].charAt(0) == "K") {
			traitCardsTxt += "King of "}
		else {traitCardsTxt += traitCards[i].charAt(0) + " of "}
		if (traitCards[i].charAt(1) == "C") {
			traitCardsTxt += "Clubs<br>"}
		else if (traitCards[i].charAt(1) == "D") {
			traitCardsTxt += "Diamonds<br>"}
		else if (traitCards[i].charAt(1) == "H") {
			traitCardsTxt += "Hearts<br>"}
		else if (traitCards[i].charAt(1) == "S") {
			traitCardsTxt += "Spades<br>"}
	}
	// Kortit nopiksi
	for (i = 0; i < traitCards.length; i++) {
		traitDice.push(cardToDice(traitCards[i]));
	}

	console.log("Trait cards: " + traitCards);
	console.log("Joker suit cards (if any): " + jokerSuits);
	console.log("Traits: " + traitDice);
	
	traitDice.sort(sortDice);       
	output = "<b>Trait cards:</b><br><br>" + traitCardsTxt;
	document.getElementById("output").innerHTML = output;
	if (traitDice.length > 10) {selectDiscard();}
	else {allocTraits();}
}
		
function drawJokerSuit(x) { // Ylimääräinen kortti jokeriarvon maaksi
	jokerSuits[x] = Math.floor(Math.random() * 54);
	jokerSuits[x] = deck[jokerSuits[x]];
	if (jokerSuits[x].charAt(0) == "X") {
	drawJokerSuit(x);
	return;
	}
	for (j = 0; j < traitCards.length; j++) {
		if (jokerSuits[x] == traitCards[j]) {
		drawJokerSuit(x);
		return;
		}
	}
	// Jos kyseessä jo toinen jokka, ei samaa maakorttia
	if (x = 1) {
		if (jokerSuits[1] == jokerSuits[0]) {
		drawJokerSuit(x);
		return;
	}}
}

function cardToDice(traitCard) { // Inputtina tuleva kortti palautuu 
								 // noppana
	var die, level, traitDie, x;
	if (traitCard.charAt(0) >= 3 && traitCard.charAt(0) <= 8) {
		die = "d6";}
	else switch (traitCard.charAt(0)) {
		case "2":
			die = "d4";
			break;
		case "9":
		case "T":
		case "J":
			die = "d8";
			break;
		case "Q":
		case "K":
			die = "d10";
			break;
		case "A":
			die = "d12";
			break;
		case "X":
			die = "d12J";
			break;
	}
	
	switch (traitCard.charAt(1)) {
		case "C":
			level = 1;
			break;
		case "D":
			level = 2;
			break;
		case "H":
			level = 3;
			break;
		case "S":
			level = 4;
			break;
		default:
			jokerNum--;
			if (jokerNum == 0 && jokerSuits.length == 2) {x = 1}
			else {x = 0}
			switch (jokerSuits[x].charAt(1)) {
				case "C":
					level = 1;
					break;
				case "D":
					level = 2;
					break;
				case "H":
					level = 3;
					break;
				case "S":
					level = 4;
			}
	}
	traitDie = level + die;
	return traitDie;
}

function sortDice(a,b){ // Käänteinen vertailufunktio noppatyypin mukaan
						// siten, että esim. 2d12 < 4d6 < 2d6
	var dieA = a.substr(2,2);
	var dieB = b.substr(2,2);
	if (dieA == dieB) {return b.charAt(0) - a.charAt(0);}
	return dieB - dieA;
}

function selectDiscard() {
	input = "<b>Select " + (cardNum - 10) + " to discard:</b><br><br><form>";
	for (i = 0; i < traitDice.length; i++) {
		input += '<input type="checkbox" name="traits" onclick=' +
		'"updateDiscard()" value="' + i + '" ';
		// Kakkosta (d4) tai jokeria ei saa discardata
		if (traitDice[i].charAt(2) == "4"
			|| traitDice[i].charAt(4) == "J") {
			input += "disabled";
			// Jokerin merkinnän J:tä ei enää tarvita, poistetaan
			traitDice[i] = traitDice[i].substr(0,4);
		}
		input += "> " + traitDice[i] + "<br>";
	}
	input += '<p id="discardButton"></p>';
	document.getElementById("input").innerHTML = input;
	updateDiscard();
}

// Discard-nappi toimintaan vasta kun tarpeeksi checkmarkeja.
function updateDiscard() {
	var buttonTxt,
		checkboxes = document.forms[0],
		x = 0;
	for (i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {x++}
	}
	buttonTxt = '<input type="button" value="Discard" ' +
		'onclick="discardTraits()"';
	if (x != cardNum - 10) {buttonTxt += " disabled"}
	buttonTxt += "></p></form>";
	document.getElementById("discardButton").innerHTML = buttonTxt;
}

function discardTraits() {
	var checkboxes = document.forms[0],
		x = 0;
	for (i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			traitDice.splice(i - x, 1);
			x++;
	}}
	console.log("Sorted traits after discard: " + traitDice);
	allocTraits();
}

function allocTraits() {
	// Jos cardNum = 10, tarvitaan myös seur. rivi:
	for (i = 0; i < traitDice.length; i++) {
		traitDice[i] = traitDice[i].substr(0,4);}
	input = '<form onclick="updateUnalloc()">' +
		"<b>Select traits:</b><br><br>";
	for (i = 0; i < 10; i++) {
		input += traitDice[i] + ' <select id="trait' + i + '">' +
			'<option value="">Select trait...</option>' +
			'<option value="co">Cognition</option>' +
			'<option value="de">Deftness</option>' +
			'<option value="kn">Knowledge</option>' +
			'<option value="mi">Mien</option>' +
			'<option value="ni">Nimbleness</option>' +
			'<option value="qu">Quickness</option>' +
			'<option value="sm">Smarts</option>' +
			'<option value="sp">Spirit</option>' +
			'<option value="st">Strength</option>' +
			'<option value="vi">Vigor</option></select><br>';
	}
	input += '</form><br><input type="button" value="Done" ' +
		'onclick="finishTraits()">';
	document.getElementById("input").innerHTML = input;
	updateUnalloc();
}

function updateUnalloc() {
	var traits = ["Cognition", "Deftness", "Knowledge", "Mien",
			"Nimbleness", "Quickness", "Smarts", "Spirit",
			"Strength", "Vigor"],
		form = document.forms[0],
		unallocated;
	desc = "<b>Unallocated traits:</b><br><br>";
	for (i = 0; i < 10; i++) {
		unallocated = true;
		for (j = 0; j < 10; j++) {
			if (form[j].selectedIndex == i + 1) {
				unallocated = false;
				break;
		}}
		if (unallocated == true) {desc += traits[i] + "<br>";}
	}
	document.getElementById("desc").innerHTML = desc;
}
// Valitut nopat Trait-muuttujiin
function finishTraits() {
	var traits = document.forms[0];
	document.getElementById("desc").innerHTML = "";
	for (i = 0; i < 10; i++) {
		if (traits[i].selectedIndex == 1) {
			cognition = traitDice[i];
			coDie = traitDice[i].substr(1);
		} else if (traits[i].selectedIndex == 2) {
			deftness = traitDice[i];
			deDie = traitDice[i].substr(1);
		} else if (traits[i].selectedIndex == 3) {
			knowledge = traitDice[i];
			knDie = traitDice[i].substr(1);
		} else if (traits[i].selectedIndex == 4) {
			mien = traitDice[i];
			miDie = traitDice[i].substr(1);
		} else if (traits[i].selectedIndex == 5) {
			nimbleness = traitDice[i];
			niDie = traitDice[i].substr(1);
		} else if (traits[i].selectedIndex == 6) {
			quickness = traitDice[i];
			quDie = traitDice[i].substr(1);
		} else if (traits[i].selectedIndex == 7) {
			smarts = traitDice[i];
			smDie = traitDice[i].substr(1);
		} else if (traits[i].selectedIndex == 8) {
			spirit = traitDice[i];
			spDie = traitDice[i].substr(1);
		} else if (traits[i].selectedIndex == 9) {
			strength = traitDice[i];
			stDie = traitDice[i].substr(1);
		} else if (traits[i].selectedIndex == 10) {
			vigor = traitDice[i];
			viDie = traitDice[i].substr(1);
		} else console.log("Error"); // Tähän jotain estään tyrimiset?
	}
	aptPoints = smDie.substr(1)*1 + knDie.substr(1)*1 + coDie.substr(1)*1;
	pace = niDie.substr(1)*1;
	wind = viDie.substr(1)*1 + spDie.substr(1)*1;
		
	chooseAptitudes();
	updateSheet();
}

function updateSheet() {
	traitsTxt = "<p><b>Traits</b></p>Cognition: " + cognition + 
		"<br>Deftness: " + deftness + "<br>Knowledge: " + knowledge +
		"<br>Mien: " + mien + "<br>Nimbleness: " + nimbleness +
		"<br>Quickness: " + quickness + "<br>Smarts: " + smarts +
		"<br>Spirit: " + spirit + "<br>Strength: " + strength +
		"<br>Vigor: " + vigor + "<br><br>";
	output = "Remaining Aptitude Points: " + aptPoints + "<br><br>" +
		traitsTxt + 
		"<b>Pace:</b> " + pace + " <b>Size:</b> " + size +
		" <b>Wind:</b> " + wind + " <b>Grit:</b> " + grit +  "<br><br>" +
		"<p><b>Aptitudes</b></p>";
	for (i = 0; i < aptitudes.length; i++) {
		if (aptitudes[i].lvl != 0) {
			output += aptitudes[i].name;
			if (aptitudes[i].con != undefined) {
				output += ": " + aptitudes[i].con.toLowerCase();
			}
			output += " " + aptitudes[i].lvl + "<br>";
	}}
	output += "<br><p><b>Edges</b></p>";
	for (i = 0; i < edges.length; i++) {
		if (edges[i].lvl == -15) {output += edges[i].name + "<br>";}
		else if (edges[i].lvl != 0) {
			output += edges[i].name + " ";
			if (edges[i].parenth != undefined &&
				edges[i].parenth != "") {
				output += "(" + edges[i].parenth + ") ";
			}
			output += edges[i].lvl + "<br>";
	}}
	output += "<br><p><b>Hindrances</b></p>";
	for (i = 0; i < hindrances.length; i++) {
		if (hindrances[i].lvl != 0) {
			output += hindrances[i].name + " ";
			if (hindrances[i].parenth != undefined &&
				hindrances[i].parenth != "") {
				output += "(" + hindrances[i].parenth + ") ";
			}
			output += hindrances[i].lvl + "<br>";
	}}
	output += "<br><p><b>Gear</b>&emsp;" +
		'<input type="button" value="Buy" onclick="gearMenu(1)"></p>';
	for (i = 0; i < guns.length; i++) {
		if (guns[i].owned > 0) {
			if (guns[i].owned > 1) {output += guns[i].owned + "x ";}
			output += guns[i].name
			if (guns[i].type != "throw") {
				output += "<br>&emsp;Ammo: " + guns[i].ammo;}
			output += "<br>";
	}}
	for (i = 0; i < melee.length; i++) {
		if (melee[i].owned > 0) {
			if (melee[i].owned > 1) {output += melee[i].owned + "x ";}
			output += melee[i].name + "<br>";
	}}
	for (i = 0; i < gear.length; i++) {
		if (gear[i].owned > 0) {
			if (gear[i].owned > 1) {output += gear[i].owned + "x ";}
			output += gear[i].name + "<br>";
	}}
	output += "$" + cash.toFixed(2) + "<br>";
	output += notesHTML;
	if (editMode == false) {output += "<br><br>" + notes}
	output += '<br><br><input type="button" value="Finished" onclick="printSheets()">'
	document.getElementById("output").innerHTML = output;
}
// Aptitudet, Edget ja Hindrancet valittaviksi
function chooseAptitudes() {
	aptitudes.sort(sortByNameAttr);
	input = "<b>New Aptitude:</b><br>" +
		'<input type="button" value="Arts" onclick="newArts()"> ' +
		'<input type="button" value="Academia" onclick="newAcademia()"> ' +
		'<input type="button" value="Area Knowledge" onclick="newAreaKnowledge()">' +
		'<br><input type="button" value="Language" onclick="newLanguage()"> ' +
		'<input type="button" value="Professional" onclick="newProfessional()"> ' +
		'<input type="button" value="Science" onclick="newScience()"> ' +
		'<input type="button" value="Trade" onclick="newTrade()"><br>' +
		"<p><b>Modify Aptitudes:</b><br>";
	for (i = 0; i < aptitudes.length; i++) { // + ja - Aptitude-napit
		input += '<input type="button" value="-1" onclick="subAptitude(' + i + ')"> ' +
			aptitudes[i].name +
			' <input type="button" value="+1" onclick="addAptitude(' + i + ')"> '
		if (aptitudes[i].con != undefined) {
			input += '<input type="button" value="Add concentration" ' +
				'onclick="newCon(' + i + ')">';
		}
		input += "<br>";
	} // Hindrance-napit HTML:ään
	input += "</p><p><b>Add Hindrances:</b><br>";
	for (i = 0; i < hindrances.length; i++) {
		input += hindrances[i].name;
		for (j = 0; j < hindrances[i].cost.length; j = j + 2) {
			input += ' <input type="button" value="' +
			hindrances[i].cost.charAt(j) +
			'" onclick="newHindrance(' + i + ', ' + 
			hindrances[i].cost.charAt(j) + ')">';
			// Array position, Aptitude Point Cost
		}
		input += "<br>";
	} // Edge-napit HTML:ään
	input += "</p><p><b>Add Edges:</b><br>";
	for (i = 0; i < edges.length; i++) {
		input += edges[i].name;
		if (edges[i].cost == -15) { // Veteran o' The Weird West
			input += ' <input type="button" value="0" ' +
				'onclick="newEdge(' + i + ', -15)">';
		} else {for (j = 0; j < edges[i].cost.length; j = j + 2) {
			input += ' <input type="button" value="' +
			edges[i].cost.charAt(j) +
			'" onclick="newEdge(' + i + ', ' +
			edges[i].cost.charAt(j) + ')">';
			// Array position, Aptitude Point Cost
		}}
		input += "<br>";
	}
	input += "</p>";
	document.getElementById("input").innerHTML = input;
}

function subAptitude(arrPos) {
	if ((aptitudes[arrPos].lvl) - 1 < 0) {return;}
	else {
		aptitudes[arrPos].lvl--;
		aptPoints++;
	}
	updateSheet();
}

function addAptitude(arrPos) {
	if (aptPoints - 1 < 0 || aptitudes[arrPos].lvl + 1 > 5) {return;}
	if (aptitudes[arrPos].con == "") {
		newCon(arrPos);
		return;
	}
	aptitudes[arrPos].lvl++;
	aptPoints--;
	updateSheet();      
}

function newCon(arrPos) {
	if (aptPoints == 0) {return;}
	if (aptitudes[arrPos].lvl == 0) {
		aptitudes[arrPos].lvl++;
		aptPoints--;
	} else if (aptPoints < 3) {return;}
	if (aptitudes[arrPos].con != "") {aptPoints = aptPoints - 3;}
	// Tästä concentration-vaihtoehdot erikseen
	// kaikkiin conillisiin aptitudeihin
	input = "<form>";
	if (aptitudes[arrPos].fname == "shootin") {
		input += '<input type="radio" name="x" value="Automatics" ' +
			'onclick="updateField(this.value)">Automatics<br>' +
			'<input type="radio" name="x" value="Flamethrower" ' +
			'onclick="updateField(this.value)">Flamethrower<br>' +
			'<input type="radio" name="x" value="Pistol" ' +
			'onclick="updateField(this.value)">Pistol<br>' +
			'<input type="radio" name="x" value="Rifle" ' +
			'onclick="updateField(this.value)">Rifle<br>' +
			'<input type="radio" name="x" value="Shotgun" ' +
			'onclick="updateField(this.value)">Shotgun<br>';
	} else if (aptitudes[arrPos].fname == "throwin") {
		input += '<input type="radio" name="x" value="Balanced" ' +
			'onclick="updateField(this.value)">Balanced<br>' +
			'<input type="radio" name="x" value="Unbalanced" ' +
			'onclick="updateField(this.value)">Unbalanced<br>';
	} else if (aptitudes[arrPos].fname == "medicine") {
		input += '<input type="radio" name="x" value="General" ' +
			'onclick="updateField(this.value)">General<br>' +
			'<input type="radio" name="x" value="Surgery" ' +
			'onclick="updateField(this.value)">Surgery<br>' +
			'<input type="radio" name="x" value="Veterinary" ' +
			'onclick="updateField(this.value)">Veterinary<br>';
	} else if (aptitudes[arrPos].fname == "animalWr") {
		input += '<input type="radio" name="x" value="Bronco Busting" ' +
			'onclick="updateField(this.value)">Bronco Busting<br>' +
			'<input type="radio" name="x" value="Dog Training" ' +
			'onclick="updateField(this.value)">Dog Training<br>';
	} else if (aptitudes[arrPos].fname == "performin") {
		input += '<input type="radio" name="x" value="Acting" ' +
			'onclick="updateField(this.value)">Acting<br>' +
			'<input type="radio" name="x" value="Singing" ' +
			'onclick="updateField(this.value)">Singing<br>';
	} else if (aptitudes[arrPos].fname == "fightin") {
		input += '<input type="radio" name="x" value="Brawlin\'" ' +
			'onclick="updateField(this.value)">Brawlin\'<br>' +
			'<input type="radio" name="x" value="Knife" ' +
			'onclick="updateField(this.value)">Knife<br>' +
			'<input type="radio" name="x" value="Lariat" ' +
			'onclick="updateField(this.value)">Lariat<br>' +
			'<input type="radio" name="x" value="Sword" ' +
			'onclick="updateField(this.value)">Sword<br>' +
			'<input type="radio" name="x" value="Whip" ' +
			'onclick="updateField(this.value)">Whip<br>' +
			'<input type="radio" name="x" value="Wrasslin\'" ' +
			'onclick="updateField(this.value)">Wrasslin\'<br>';
	} else if (aptitudes[arrPos].fname == "quickDraw") {
		input += '<input type="radio" name="x" value="Knife" ' +
			'onclick="updateField(this.value)">Knife<br>' +
			'<input type="radio" name="x" value="Pistol" ' +
			'onclick="updateField(this.value)">Pistol<br>' +
			'<input type="radio" name="x" value="Rifle" ' +
			'onclick="updateField(this.value)">Rifle<br>' +
			'<input type="radio" name="x" value="Shotgun" ' +
			'onclick="updateField(this.value)">Shotgun<br>' +
			'<input type="radio" name="x" value="Sword" ' +
			'onclick="updateField(this.value)">Sword<br>';
	} else if (aptitudes[arrPos].fname == "survival") {
		input += '<input type="radio" name="x" value="Desert" ' +
			'onclick="updateField(this.value)">Desert<br>' +
			'<input type="radio" name="x" value="Mountain" ' +
			'onclick="updateField(this.value)">Mountain<br>';
	} else if (aptitudes[arrPos].fname == "artillery") {
		input += '<input type="radio" name="x" value="Cannons" ' +
			'onclick="updateField(this.value)">Cannons<br>' +
			'<input type="radio" name="x" value="Gatling Guns" ' +
			'onclick="updateField(this.value)">Gatling Guns<br>' +
			'<input type="radio" name="x" value="Rockets" ' +
			'onclick="updateField(this.value)">Rockets<br>';
	} else if (aptitudes[arrPos].fname == "speedLoad") {
		input += '<input type="radio" name="x" value="Pistol" ' +
			'onclick="updateField(this.value)">Pistol<br>' +
			'<input type="radio" name="x" value="Rifle" ' +
			'onclick="updateField(this.value)">Rifle<br>' +
			'<input type="radio" name="x" value="Shotgun" ' +
			'onclick="updateField(this.value)">Shotgun<br>';
	} else if (aptitudes[arrPos].fname == "drivin") {
		input += '<input type="radio" name="x" value="Steam Boat" ' +
			'onclick="updateField(this.value)">Steam Boat<br>' +
			'<input type="radio" name="x" value="Ornithopter" ' +
			'onclick="updateField(this.value)">Ornithopter<br>' +
			'<input type="radio" name="x" value="Steam Wagon" ' +
			'onclick="updateField(this.value)">Steam Wagon<br>';
	} else {console.log("Tyrit jotain");}
	input += '<br><input type="text" id="selection"> ' +
		'<input type="button" value="Add" ' +
		'onclick="addCon(' + arrPos + ')"></form>';
	document.getElementById("input").innerHTML = input;
	window.scrollTo(0, 0);
}

function updateField(selection) {
	document.getElementById("selection").value = selection;
}

function addCon(arrPos) {
	if (aptitudes[arrPos].con != "") {aptitudes[arrPos].con += ", "}
	aptitudes[arrPos].con += document.getElementById("selection").value;
	updateSheet();
	if (tempApt != 0) {geezerAptitudes()}
	else {chooseAptitudes();}
}

function newHindrance(arrPos, cost) {
	var vigorLvl, specArrPos;
	if (hindCosts + cost > 10) {return;}
	hindCosts += cost;
	aptPoints += cost;
	hindrances[arrPos].lvl = cost;
	if (hindrances[arrPos].fname == "ailin") {
		addParentheses(arrPos, "hindrance");
		notes += "-2 to any <i>persuasion</i> and <i>sneak</i> rolls (from Ailin')<br>";
	} else if (hindrances[arrPos].fname == "allThumbs") {
		notes += "-2 to rolls made to use or repair machinery. " +
			"Scientific and mechanical Aptitudes cost double (NOT IMPLEMENTED)<br>";
	} else if (hindrances[arrPos].fname == "badEars") {
		if (cost == 3) {
			notes += "-2 to all <i>Cognition</i> rolls based on hearing<br>";
		} else {notes += "Deaf<br>";}
	} else if (hindrances[arrPos].fname == "badEyes") {
		if (cost == 3) {
			notes += "-2 to rolls to see or affect things at >20 yards<br>";
		} else if (cost == 5) {
			notes += "-4 to rolls to see or affect things at >20 yards<br>";
		} if (spectAptPoint == false) {
			specArrPos = getArrPos("Spectacles", "gear");
			if (gear[specArrPos].owned > 0) {
				aptPoints--;
				hindCosts--;
				spectAptPoint = true;
		}}
	} else if (hindrances[arrPos].fname == "bigUn") {
		for (i = 0; i < edges.length; i++) {
			if (edges[i].fname == "brawny" && edges[i].lvl > 0) {return;}
		} if (cost == 1) {
			size++;
			if (pace > 4) {pace--;}
			if (niDie == "d12") {
				niDie = "d10";
				nimbleness = nimbleness.charAt(0) + niDie;
		}} else if (cost == 2) {
			size = size + 2;
			pace = pace - 2;
			if (pace < 4) {pace = 4;}
			if (niDie == "d12" || niDie == "d10") {
				niDie = "d8";
				nimbleness = nimbleness.charAt(0) + niDie;
		}}
	} else if (hindrances[arrPos].fname == "clueless") {
		notes += "-2 to <i>Cognition</i> checks to notice things<br>";
	} else if (hindrances[arrPos].fname == "geezer") {
		if (cost == 3) {
			vigorLvl = vigor.charAt(0) - 2;
			 if (vigorLvl < 1) {vigorLvl = 1;}
			vigor = vigorLvl + vigor.slice(1);
			pace = pace - 2;
			tempApt = aptPoints;
			aptPoints = 5;
			geezerAptitudes();
		} else if (cost == 5) {
			vigor = reduceDieType(2, vigor, "vigor", 4);
			pace = pace - 4;
			tempApt = aptPoints;
			aptPoints = 10;
			geezerAptitudes();
		} if (pace < 2) {pace = 2;}
	} else if (hindrances[arrPos].fname == "habit") {
		addParentheses(arrPos, "hindrance");
		notes += "-" + cost + " to <i>persuasion</i> rolls from Habit<br>";
	} else if (hindrances[arrPos].fname == "heavySleeper") {
		notes += "-2 to <i>Cognition</i> rolls to wake up<br>";
	} else if (hindrances[arrPos].fname == "highFalutin") {
		notes += "-2 to <i>persuasion</i> rolls toward those " +
			"who know your hero thinks they are " +
			"beneath him in social stature. (High-Falutin')<br>";
	} else if (hindrances[arrPos].fname == "kid") {
		if (cost == 2) {
			strength = reduceDieType(1, strength, "strength", 4);
			knowledge = reduceDieType(1, knowledge, "knowledge", 4);
		} else if (cost == 4) {
			strength = reduceDieType(2, strength, "strength", 4);
			knowledge = reduceDieType(2, knowledge, "knowledge", 4);
	}} else if (hindrances[arrPos].fname == "lawO") {
		notes += "+2 to any negotiations or <i>persuasion</i> attempts whenever " +
			"your character’s honorable reputation is known and " +
			"might make a difference.<br>";
	} else if (hindrances[arrPos].fname == "lame") {
		if (cost == 3) {
			pace = pace - 2;
			if (pace < 2) {pace = 2}
			notes += "-2 to active <i>dodge</i> rolls and others requiring mobility<br>";
		} else if (cost == 5) {
			pace = 2;
			notes += "Pace 1 without crutches. -4 to active <i>dodge</i> " +
				"rolls and others requiring mobility<br>";
	}} else if (hindrances[arrPos].fname == "lyinEyes") {
		notes += "-4 to <i>bluff</i> rolls<br>";
	} else if (hindrances[arrPos].fname == "miser") {
		setCheapo(1);
		notes += 'Can only buy "el cheapo" gear<br>';
	} else if (hindrances[arrPos].fname == "mean") {
		notes += "-2 to friendly <i>persuasion</i> attempts. " +
			"May occasionally be allowed to add +2 to hostile " +
			"<i>persuasion</i> or <i>overawe</i> rolls.<br>"
	} else if (hindrances[arrPos].fname == "oneArmed") {
		notes += "-4 to rolls requiring two hands<br>";
	} else if (hindrances[arrPos].fname == "poverty") {
		cash = 50;
	} else if (hindrances[arrPos].fname == "randy") {
		notes += '-4 to <i>persuasion</i> rolls to influense "nice girls" ' +
			"and to resist the charms of ladies of lesser morals. " +
			"If female, +4 to <i>persuasion</i> to seduce a fellow.<br>"
	} else if (hindrances[arrPos].fname == "scrawny") {
		size--;
		if (stDie == "d12") {reduceDieType(1, strength, "strength", 10)}
	} else if (hindrances[arrPos].fname == "slowpoke") {
		pace = pace - cost;
		if (pace < 2) {pace = 2};
	} else if (hindrances[arrPos].fname == "squeaky") {
		notes += "-2 to any test of wills he initiates (Squeaky)<br>";
	} else if (hindrances[arrPos].fname == "squeamish") {
		notes += "<i>Guts</i> checks caused by gory scenes are made at -2<br>";
	} else if (hindrances[arrPos].fname == "thinSkinned") {
		notes += "Wound penalties +1<br>";
	} else if (hindrances[arrPos].fname == "tuckered") {
		wind = wind - cost;
		if (wind < 4) {wind = 4}
	} else if (hindrances[arrPos].fname == "ugly") {
		notes += "-2 to <i>persuasion</i> rolls when looks might intervene. " +
			"+2 when being ugly might help such as <i>overawe</i>.<br>";
	} else if (hindrances[arrPos].fname == "yeller") {
		notes += "Subtract –2 from guts checks and persuasion rolls made "
			"on those with no respect for your character’s cowardly ways.<br>";
	} else if (hindrances[arrPos].fname == "enemy" ||
			hindrances[arrPos].fname == "hankerin" ||
			hindrances[arrPos].fname == "intolerance" ||
			hindrances[arrPos].fname == "loco" ||
			hindrances[arrPos].fname == "oath" ||
			hindrances[arrPos].fname == "obligation" ||
			hindrances[arrPos].fname == "yearnin") {
		addParentheses(arrPos, "hindrance");
	}
	updateSheet();
}

function reduceDieType(steps, trait, traitName, min) {
	die = trait.slice(2);
	die = die - steps * 2;
	if (die < min) {die = min};
	if (traitName == "cognition") {
		coDie = "d" + die;
	}  else if (traitName == "deftness") {
		deDie = "d" + die;
	} else if (traitName == "knowledge") {
		knDie = "d" + die;
	} else if (traitName == "mien") {
		miDie = "d" + die;
	} else if (traitName == "nimbleness") {
		niDie = "d" + die;
	} else if (traitName == "quickness") {
		quDie = "d" + die;
	} else if (traitName == "smarts") {
		smDie = "d" + die;
	} else if (traitName == "spirit") {
		spDie = "d" + die;
	} else if (traitName == "strength") {
		stDie = "d" + die;
	} else if (traitName == "vigor") {
		viDie = "d" + die;
	} else {console.log("Tyrit jotain");}
	return trait.charAt(0) + "d" + die;
}

function geezerAptitudes() {
	updateSheet();
	aptitudes.sort(sortByNameAttr); 
	input = "<p><b>Choose Knowledge-based aptitudes for your geezer</b></p>" +
		"<b>New Aptitude:</b><br>" +
		'<input type="button" value="Academia" onclick="newAcademia()"> ' +
		'<input type="button" value="Area Knowledge" onclick="newAreaKnowledge()">' +
		'<br><input type="button" value="Language" onclick="newLanguage()"> ' +
		'<input type="button" value="Professional" onclick="newProfessional()"> ' +
		'<input type="button" value="Science" onclick="newScience()"> ' +
		'<input type="button" value="Trade" onclick="newTrade()"><br>' +
		"<p><b>Modify Aptitudes:</b></p>";
	for (i = 0; i < aptitudes.length; i++) {
		if (aptitudes[i].trait == "kn") {
			input += '<br><input type="button" value="-1" onclick="subAptitude(' + i + ')"> ' +
				aptitudes[i].name +
				' <input type="button" value="+1" onclick="addAptitude(' + i + ')"> '
			if (aptitudes[i].con != undefined) {
				input += '<input type="button" value="Add concentration" ' +
					'onclick="newCon(' + i + ')">';
	}   }   }
	input += '<br><br><input type="button" value="Done" onclick="geezerFinish()">'
	document.getElementById("input").innerHTML = input;
	window.scrollTo(0, 0);
}

function geezerFinish() {
	aptPoints = tempApt;
	tempApt = 0;
	chooseAptitudes();
	updateSheet();
}

function newEdge(arrPos, cost) {
	if (cost > aptPoints) {return;}
	if (edges[arrPos].fname == "arcane") {
		addParentheses(arrPos, "edge"); // Arcane Background!
	} else if (edges[arrPos].fname == "belongins") {
		switch (cost) {
			case 1:
				cash = 500;
				break;
			case 2:
				cash = 1000;
				break;
			case 3:
				cash = 5000;
				break;
			case 4:
				cash = 20000
				break;
			case 5:
				cash = 50000;
	}} else if (edges[arrPos].fname == "bigEars") {
		notes += "+2 to <i>Cognition</i> rolls involving hearing things<br>";
	} else if (edges[arrPos].fname == "brave") {
		notes += "+2 to <i>guts</i> checks<br>";
	} else if (edges[arrPos].fname == "brawny") {
		for (i = 0; i < hindrances.length; i++) {
			if (hindrances[i].fname == "bigUn" && hindrances[i].lvl > 0) {return;}
		} if (strength.substr(0,3) == "1d8" || stDie == "d4" || stDie == "d6")
			{return;} // Saattais kuulua olla strength.charAt(0) = "1" ?
		size++;
	} else if (edges[arrPos].fname == "dinero") {
		switch (cost) {
		case 1:
			cash = 250;
			break;
		case 2:
			cash = 500;
			break;
		case 3:
			cash = 1000;
			break;
		case 4:
			cash = 2000;
			break;
		case 5:
			cash = 5000;
	}} else if (edges[arrPos].fname == "dontGet") {
		notes += "+Xd4 to melee damage, where X is character's highest wound penalty " +
		"(not counting Edges or abilities that ignore such penalties)<br>";
	} else if (edges[arrPos].fname == "eagleEyes") {
		notes += "+2 to <i>Cognition</i> checks to spot or notice things at distance<br>";
	} else if (edges[arrPos].fname == "fleetFooted") {
		pace += cost;
	} else if (edges[arrPos].fname == "friends") {
		addParentheses(arrPos, "edge");
	} else if (edges[arrPos].fname == "keen") {
		notes += "+2 to any <i>Cognition, search, tracking</i> or <i>scrutinize</i> rolls " +
			"to notice little details, sounds, and movements.<br>";
	} else if (edges[arrPos].fname == "levelHeaded") {
		notes += "Immediately after drawing Action Cards in combat, character can " +
			"discard their lowest card and draw another<br>";
	} else if (edges[arrPos].fname == "lightSleeper") {
		notes += "+2 to <i>Cognition</i> rolls to wake up<br>";
	} else if (edges[arrPos].fname == "luckO") {
		notes += "Extra fate chip at beginning of session<br>";
	} else if (edges[arrPos].fname == "mechanical") {
		notes += "+2 to rolls involving understanding and fixing machinery<br>";
	} else if (edges[arrPos].fname == "nervesO") {
		notes += "May ignore being forced to flee due to failed <i>guts</i> checks<br>";
	} else if (edges[arrPos].fname == "purty") {
		notes += "+2 to most <i>persuasion</i> rolls where good looks might come into play<br>";
	} else if (edges[arrPos].fname == "theStare") {
		notes += "+2 to <i>overawe</i> attacks if eyes can be seen<br>";
	} else if (edges[arrPos].fname == "thickSkinned") {
		notes += "Wound penalty reduced by one<br>";
	} else if (edges[arrPos].fname == "tough") {
		wind += cost * 2;
	} else if (edges[arrPos].fname == "twoFisted") {
		notes += "Ambidextrous<br>";
	} else if (edges[arrPos].fname == "theVoice" ||
			edges[arrPos].fname == "rank") {
		addParentheses(arrPos, "edge");
	}
	aptPoints -= cost;
	edges[arrPos].lvl = cost;
	updateSheet();
}

function newArts() {
	if (aptPoints == 0) {return;}
	input = '<input type="radio" name="x" value="Painting" ' +
		'onclick="updateField(this.value)">Painting<br>' +
		'<input type="radio" name="x" value="Sculpting" ' +
		'onclick="updateField(this.value)">Sculpting<br>' +
		'<input type="radio" name="x" value="Sketching" ' +
		'onclick="updateField(this.value)">Sketching<br>' +
		'<br><input type="text" id="selection"> ' +
		'<input type="button" value="Add" ' +
		'onclick="pushAptitude(\'Arts\', \'co\')">';
	document.getElementById("input").innerHTML = input;
	window.scrollTo(0, 0);
}

function newAcademia () {
	if (aptPoints == 0) {return;}
	input = '<input type="radio" name="x" value="Philosophy" ' +
		'onclick="updateField(this.value)">Philosophy<br>' +
		'<input type="radio" name="x" value="History" ' +
		'onclick="updateField(this.value)">History<br>' +
		'<input type="radio" name="x" value="Occult" ' +
		'onclick="updateField(this.value)">Occult<br>' +
		'<br><input type="text" id="selection"> ' +
		'<input type="button" value="Add" ' +
		'onclick="pushAptitude(\'Academia\', \'kn\')">';
	document.getElementById("input").innerHTML = input;
	window.scrollTo(0, 0);
}

function newAreaKnowledge() {
	if (aptPoints == 0) {return;}
	input = '<br><input type="text" id="selection"> ' +
		'<input type="button" value="Add" ' +
		'onclick="pushAptitude(\'Area Knowledge\', \'kn\')">';
	document.getElementById("input").innerHTML = input;
	window.scrollTo(0, 0);
}

function newLanguage() {
	if (aptPoints == 0) {return;}
	input = '<input type="radio" name="x" value="Apache" ' +
		'onclick="updateField(this.value)">Apache<br>' +
		'<input type="radio" name="x" value="French" ' +
		'onclick="updateField(this.value)">French<br>' +
		'<input type="radio" name="x" value="Gaelic" ' +
		'onclick="updateField(this.value)">Gaelic<br>' +
		'<input type="radio" name="x" value="German" ' +
		'onclick="updateField(this.value)">German<br>' +
		'<input type="radio" name="x" value="Latin" ' +
		'onclick="updateField(this.value)">Latin<br>' +
		'<input type="radio" name="x" value="Sign Language (Indian)" ' +
		'onclick="updateField(this.value)">Sign Language (Indian)<br>' +
		'<input type="radio" name="x" value="Sioux" ' +
		'onclick="updateField(this.value)">Sioux<br>' +
		'<input type="radio" name="x" value="Spanish" ' +
		'onclick="updateField(this.value)">Spanish<br>' +
		'<br><input type="text" id="selection"> ' +
		'<input type="button" value="Add" ' +
		'onclick="pushAptitude(\'Language\', \'kn\')">';
	document.getElementById("input").innerHTML = input;
	window.scrollTo(0, 0);
}

function newProfessional() {
	if (aptPoints == 0) {return;}
	input = '<input type="radio" name="x" value="Journalism" ' +
		'onclick="updateField(this.value)">Journalism<br>' +
		'<input type="radio" name="x" value="Law" ' +
		'onclick="updateField(this.value)">Law<br>' +
		'<input type="radio" name="x" value="Military" ' +
		'onclick="updateField(this.value)">Military<br>' +
		'<input type="radio" name="x" value="Photography" ' +
		'onclick="updateField(this.value)">Photography<br>' +
		'<input type="radio" name="x" value="Politics" ' +
		'onclick="updateField(this.value)">Politics<br>' +
		'<input type="radio" name="x" value="Theology" ' +
		'onclick="updateField(this.value)">Theology<br>' +
		'<br><input type="text" id="selection"> ' +
		'<input type="button" value="Add" ' +
		'onclick="pushAptitude(\'Professional\', \'kn\')">';
	document.getElementById("input").innerHTML = input;
	window.scrollTo(0, 0);
}

function newScience() {
	if (aptPoints == 0) {return;}
	input = '<input type="radio" name="x" value="Biology" ' +
		'onclick="updateField(this.value)">Biology<br>' +
		'<input type="radio" name="x" value="Chemisty" ' +
		'onclick="updateField(this.value)">Chemistry<br>' +
		'<input type="radio" name="x" value="Engineering" ' +
		'onclick="updateField(this.value)">Engineering<br>' +
		'<input type="radio" name="x" value="Physics" ' +
		'onclick="updateField(this.value)">Physics<br>' +
		'<br><input type="text" id="selection"> ' +
		'<input type="button" value="Add" ' +
		'onclick="pushAptitude(\'Science\', \'kn\')">';
	document.getElementById("input").innerHTML = input;
	window.scrollTo(0, 0);
}

function newTrade() {
	if (aptPoints == 0) {return;}
	input = '<input type="radio" name="x" value="Blacksmithing" ' +
		'onclick="updateField(this.value)">Blacksmithing<br>' +
		'<input type="radio" name="x" value="Carpentry" ' +
		'onclick="updateField(this.value)">Carpentry<br>' +
		'<input type="radio" name="x" value="Seamanship" ' +
		'onclick="updateField(this.value)">Seamanship<br>' +
		'<input type="radio" name="x" value="Mining" ' +
		'onclick="updateField(this.value)">Mining<br>' +
		'<input type="radio" name="x" value="Telegraphy" ' +
		'onclick="updateField(this.value)">Telegraphy<br>' +
		'<input type="radio" name="x" value="Undertaking" ' +
		'onclick="updateField(this.value)">Undertaking<br>' +
		'<br><input type="text" id="selection"> ' +
		'<input type="button" value="Add" ' +
		'onclick="pushAptitude(\'Trade\', \'kn\')">';
	document.getElementById("input").innerHTML = input;
	window.scrollTo(0, 0);
}

function pushAptitude(apt, trait) {
	var selection = document.getElementById("selection").value,
		name = apt + ": " + selection;
		x = {name:name, trait:trait, type:"mental", lvl:1};
	aptPoints--;
	aptitudes.push(x);
	if (tempApt != 0) {geezerAptitudes();}
	else {chooseAptitudes();}
	updateSheet();
}

function editNotes() {
	editMode = true;
	notesHTML = '<br><p><b>Notes</b>&emsp;<input type=button value="Done" ' +
		'onclick="saveNotes()"></p> <textarea id="notes" rows="20" cols="30">' +
		notes + '</textarea>';
	updateSheet();
}

function saveNotes() {
	editMode = false;
	notes = document.getElementById("notes").value;
	notesHTML = '<br><p><b>Notes</b>&emsp;<input type=button value="Edit" ' +
		'onclick="editNotes()"</p>';
	updateSheet();
}

function sortByNameAttr(a,b) {
	if (a.name < b.name) {return -1;}
	if (b.name < a.name) {return 1;}
}

function gearMenu(x) {
	var miserPos = getArrPos("miser", "hindrances");
	if (x == 1) {
		document.getElementById("output").innerHTML = "";
		window.scrollTo(0, 0);
	}
	input = '<input type="button" value="Guns \'n Such" onclick="weapons()"><br>' +
		'<input type="button" value="Melee & Thrown" onclick="meleeThrown()"><br>' +
		'<input type="button" value="Equipment" onclick="equipment()"><br><br>' +
		'<input type="button" value="Done" onclick="exitGearMenu()"><br><br>' +
		'<form><input type="radio" name="x" onclick="setCheapo(0)" ';
	if (elCheapo == 0) {input += "checked";}
	else if (hindrances[miserPos].lvl > 0) {input += " disabled";}
	input += '>Normal<br>' +
		'<input type="radio" name="x" onclick="setCheapo(1)" ';
	if (elCheapo == 1) {input += "checked";}
	input += '>El Cheapo -75%<br>' +
		'<input type="radio" name="x" onclick="setCheapo(2)" ';
	if (elCheapo == 2) {input += "checked";}
	input += '>El Cheapo -50%</form><br><br>' +
		"Cash: $" + cash.toFixed(2) + "<br><p><b>Gear:</b></p>";
	for (i = 0; i < guns.length; i++) {
		if (guns[i].owned > 0) {
			if (guns[i].owned > 1) {input += guns[i].owned + "x ";}
			input += guns[i].name 
			if (guns[i].type != "throw") {
				input += "<br>&emsp;Ammo: " + guns[i].ammo;}
			input += "<br>";
	}}
	for (i = 0; i < melee.length; i++) {
		if (melee[i].owned > 0) {
			if (melee[i].owned > 1) {input += melee[i].owned + "x ";}
			input += melee[i].name + "<br>";
	}}
	for (i = 0; i < gear.length; i++) {
		if (gear[i].owned > 0) {
			if (gear[i].owned > 1) {input += gear[i].owned + "x ";}
			input += gear[i].name + "<br>";
	}}
	document.getElementById("input").innerHTML = input;
}

function setCheapo(x) {
	var percent;
	if (x == elCheapo) {return;}
	if (x == 0) {
		if (elCheapo == 1) {
			percent = 4/3;
		} else if (elCheapo == 2) {
			percent = 2;
	}} else if (x == 1) {
		if (elCheapo == 0) {
			percent = 3/4;
		} else if (elCheapo == 2) {
			percent = 1.5;
	}} else if (x == 2) {
		if (elCheapo == 0) {
			percent = 0.5;
		} else if (elCheapo == 1) {
			percent = 2/3;
	}}
	elCheapo = x;
	gear.forEach(function(y){y.price = y.price * percent;})
	guns.forEach(function(y){y.price = y.price * percent;})
	melee.forEach(function(y){y.price = y.price * percent;})
	document.getElementById("output").innerHTML = "";
}

function weapons() {
	output = '<table><tr><th>Weapons</th><th>Shots</th><th colspan="2">Caliber</th>' +
		"<th>ROF</th><th>Damage</th><th>Range Incr.</th><th>Price</th></tr>";
	output += "<tr><th><i>Automatics</i></th></tr>";
	for (i = 0; i < guns.length, guns[i].type == "auto"; i++) {
		output += '<tr><td>';
		if (guns[i].name.substr(0,6) != "&emsp;") {
			output += '<input type="button" value="Buy" onclick="buyGun(' + i +')"> '
		} else {output += "&emsp;&emsp;&emsp;"}
		output += guns[i].name + "</td><td>" + guns[i].shots + "</td><td> " +
			'<input type="button" value="Buy ' + guns[i].ammoAmount +
			' for $' + guns[i].ammoPrice + '" onclick="buyAmmo(' + i + ')"';
		if (guns[i].owned == 0 && guns[i].elCheapo75 == 0 && guns[i].elCheapo50 == 0) {
			output += " disabled"}
		output += "></td><td>" + guns[i].cal + "</td><td>" + guns[i].rof + "</td><td>" +
			guns[i].dam + "</td><td>" + guns[i].range + "</td><td>";
		if (guns[i].price != 0) {output += "$" + guns[i].price;}
		output += "</td></tr>";
	}
	output += '<tr><th><i>Carbines</i></th></tr>';
	for (i = 0; i < guns.length; i++) {
		if (guns[i].type == "carb") {
			output += '<tr><td>';
		if (guns[i].name.substr(0,6) != "&emsp;") {
			output += '<input type="button" value="Buy" onclick="buyGun(' + i +')"> '
		} else {output += "&emsp;&emsp;&emsp;"}
		output += guns[i].name + "</td><td>" + guns[i].shots + "</td><td> " +
			'<input type="button" value="Buy ' + guns[i].ammoAmount +
			' for $' + guns[i].ammoPrice + '" onclick="buyAmmo(' + i + ')"';
		if (guns[i].owned == 0 && guns[i].elCheapo75 == 0 && guns[i].elCheapo50 == 0) {
			output += " disabled"}
		output += "></td><td>" + guns[i].cal + "</td><td>" + guns[i].rof + "</td><td>" +
			guns[i].dam + "</td><td>" + guns[i].range + "</td><td>";
		if (guns[i].price != 0) {output += "$" + guns[i].price;}
		output += "</td></tr>";
	}}
	output += '<tr><th><i>Derringers & Pepperboxes</i></th></tr>';
	for (i = 0; i < guns.length; i++) {
		if (guns[i].type == "derr") {
			output += '<tr><td>';
		if (guns[i].name.substr(0,6) != "&emsp;") {
			output += '<input type="button" value="Buy" onclick="buyGun(' + i +')"> '
		} else {output += "&emsp;&emsp;&emsp;"}
		output += guns[i].name + "</td><td>" + guns[i].shots + "</td><td> " +
			'<input type="button" value="Buy ' + guns[i].ammoAmount +
			' for $' + guns[i].ammoPrice + '" onclick="buyAmmo(' + i + ')"';
		if (guns[i].owned == 0 && guns[i].elCheapo75 == 0 && guns[i].elCheapo50 == 0) {
			output += " disabled"}
		output += "></td><td>" + guns[i].cal + "</td><td>" + guns[i].rof + "</td><td>" +
			guns[i].dam + "</td><td>" + guns[i].range + "</td><td>";
		if (guns[i].price != 0) {output += "$" + guns[i].price;}
		output += "</td></tr>";
	}}
	output += '<tr><th><i>Pistols, Single-Action</i></th></tr>';
	for (i = 0; i < guns.length; i++) {
		if (guns[i].type == "sing") {
			output += '<tr><td>';
		if (guns[i].name.substr(0,6) != "&emsp;") {
			output += '<input type="button" value="Buy" onclick="buyGun(' + i +')"> '
		} else {output += "&emsp;&emsp;&emsp;"}
		output += guns[i].name + "</td><td>" + guns[i].shots + "</td><td> " +
			'<input type="button" value="Buy ' + guns[i].ammoAmount +
			' for $' + guns[i].ammoPrice + '" onclick="buyAmmo(' + i + ')"';
		if (guns[i].owned == 0 && guns[i].elCheapo75 == 0 && guns[i].elCheapo50 == 0) {
			output += " disabled"}
		output += "></td><td>" + guns[i].cal + "</td><td>" + guns[i].rof + "</td><td>" +
			guns[i].dam + "</td><td>" + guns[i].range + "</td><td>";
		if (guns[i].price != 0) {output += "$" + guns[i].price;}
		output += "</td></tr>";
	}}
	output += '<tr><th><i>Pistols, Double-Action</i></th></tr>';
	for (i = 0; i < guns.length; i++) {
		if (guns[i].type == "doub") {
			output += '<tr><td>';
		if (guns[i].name.substr(0,6) != "&emsp;") {
			output += '<input type="button" value="Buy" onclick="buyGun(' + i +')"> '
		} else {output += "&emsp;&emsp;&emsp;"}
		output += guns[i].name + "</td><td>" + guns[i].shots + "</td><td> " +
			'<input type="button" value="Buy ' + guns[i].ammoAmount +
			' for $' + guns[i].ammoPrice + '" onclick="buyAmmo(' + i + ')"';
		if (guns[i].owned == 0 && guns[i].elCheapo75 == 0 && guns[i].elCheapo50 == 0) {
			output += " disabled"}
		output += "></td><td>" + guns[i].cal + "</td><td>" + guns[i].rof + "</td><td>" +
			guns[i].dam + "</td><td>" + guns[i].range + "</td><td>";
		if (guns[i].price != 0) {output += "$" + guns[i].price;}
		output += "</td></tr>";
	}}
	output += '<tr><th><i>Rifles</i></th></tr>';
	for (i = 0; i < guns.length; i++) {
		if (guns[i].type == "rifl") {
			output += '<tr><td>';
		if (guns[i].name.substr(0,6) != "&emsp;") {
			output += '<input type="button" value="Buy" onclick="buyGun(' + i +')"> '
		} else {output += "&emsp;&emsp;&emsp;"}
		output += guns[i].name + "</td><td>" + guns[i].shots + "</td><td> " +
			'<input type="button" value="Buy ' + guns[i].ammoAmount +
			' for $' + guns[i].ammoPrice + '" onclick="buyAmmo(' + i + ')"';
		if (guns[i].owned == 0 && guns[i].elCheapo75 == 0 && guns[i].elCheapo50 == 0) {
			output += " disabled"}
		output += "></td><td>" + guns[i].cal + "</td><td>" + guns[i].rof + "</td><td>" +
			guns[i].dam + "</td><td>" + guns[i].range + "</td><td>";
		if (guns[i].price != 0) {output += "$" + guns[i].price;}
		output += "</td></tr>";
	}}
	output += '<tr><th><i>Shotguns</i></th></tr>';
	for (i = 0; i < guns.length; i++) {
		if (guns[i].type == "shot") {
			output += '<tr><td>';
		if (guns[i].name.substr(0,6) != "&emsp;") {
			output += '<input type="button" value="Buy" onclick="buyGun(' + i +')"> '
		} else {output += "&emsp;&emsp;&emsp;"}
		output += guns[i].name + "</td><td>" + guns[i].shots + "</td><td> " +
			'<input type="button" value="Buy ' + guns[i].ammoAmount +
			' for $' + guns[i].ammoPrice + '" onclick="buyAmmo(' + i + ')"';
		if (guns[i].owned == 0 && guns[i].elCheapo75 == 0 && guns[i].elCheapo50 == 0) {
			output += " disabled"}
		output += "></td><td>" + guns[i].cal + "</td><td>" + guns[i].rof + "</td><td>" +
			guns[i].dam + "</td><td>" + guns[i].range + "</td><td>";
		if (guns[i].price != 0) {output += "$" + guns[i].price;}
		output += "</td></tr>";
	}}
	output += '<tr><th><i>Other</i></th></tr>';
	for (i = 0; i < guns.length; i++) {
		if (guns[i].type == "other") {
			output += '<tr><td>';
		if (guns[i].name.substr(0,6) != "&emsp;") {
			output += '<input type="button" value="Buy" onclick="buyGun(' + i +')"> '
		} else {output += "&emsp;&emsp;&emsp;"}
		output += guns[i].name + "</td><td>" + guns[i].shots + "</td><td> " +
			'<input type="button" value="Buy ' + guns[i].ammoAmount +
			' for $' + guns[i].ammoPrice + '" onclick="buyAmmo(' + i + ')"';
		if (guns[i].owned == 0 && guns[i].elCheapo75 == 0 && guns[i].elCheapo50 == 0) {
			output += " disabled"}
		output += "></td><td>" + guns[i].cal + "</td><td>" + guns[i].rof + "</td><td>" +
			guns[i].dam + "</td><td>" + guns[i].range + "</td><td>";
		if (guns[i].price != 0) {output += "$" + guns[i].price;}
		output += "</td></tr>";
	}}
	output += "</table>";
	document.getElementById("output").innerHTML = output;
}

function meleeThrown() {
	output = "<table><caption>Fightin' Weapons</caption><tr><th>Weapon</th>" +
		"<th>DB</th><th>Damage</th><th>Price</th></tr>";
		for (i = 0; i < melee.length; i++) {
			output += '<tr><td><input type="button" value="Buy" onclick=' +
				'"buyMelee('+ i +')"> ' + melee[i].name + '</td><td>' +
				melee[i].db + '</td><td>' + melee[i].dam + '</td><td>' +
				"&emsp;$" + melee[i].price + '</td></tr>';
		}
	output += "</table><br><br>";
	output += "<table><caption>Throwin' Weapons</caption><tr><th>Weapon</th>" +
		"<th>Ammo</th><th>Damage</th><th>Range Incr</th><th>Price" +
		"</th></tr>";
	for (i = 0; i < guns.length; i++) {
		if (guns[i].type == "throw") {
			output += '<tr><td><input type="button" value="Buy" onclick="buyGun(' +
				i + ', true)"> ' + guns[i].name + '</td><td>' + guns[i].cal + '</td><td>' +
				guns[i].dam + '</td><td>' + guns[i].range + '</td><td>' + 
				"$" + guns[i].price + '</td></tr>';
	}}
	output += "</table>";
	document.getElementById("output").innerHTML = output;
}

function equipment() {
	var colNum = 0;
	output = '<table><tr><td><b><i>Clothes</i></b></td></tr><tr>';
	for (i = 0; i < gear.length, gear[i].type == "clothes"; i++) {
		colNum++;
		output += '<td><input type="button" value="Buy" onclick="buyGear(' + i +')"> ' +
			gear[i].name + ", $" + gear[i].price.toFixed(2) + "&emsp;</td>";
		if (colNum % 3 == 0) {output += "</tr><tr>";}
	}
	if (colNum % 3 != 0) {output += "</tr><tr>"}
	colNum = 0;
	output += "<td><b><i>Explosives</i></b></td></tr><tr>";
	for (i = 0; i < gear.length; i++) {
		if (gear[i].type == "explosives") {
		colNum++;
		output += '<td><input type="button" value="Buy" onclick="buyGear(' + i +')"> ' +
			gear[i].name + ", $" + gear[i].price.toFixed(2) + "&emsp;</td>";
		if (colNum % 3 == 0) {output += "</tr><tr>";}
	}}
	if (colNum % 3 != 0) {output += "</tr>";}
	colNum = 0;
	output += "<td><b><i>Food & Drink</i></b></td></tr><tr>";
	for (i = 0; i < gear.length; i++) {
		if (gear[i].type == "foodDrink") {
		colNum++;
		output += '<td><input type="button" value="Buy" onclick="buyGear(' + i +')"> ' +
			gear[i].name + ", $" + gear[i].price.toFixed(2) + "&emsp;</td>";
		if (colNum % 3 == 0) {output += "</tr><tr>";}
	}}
	if (colNum % 3 != 0) {output += "</tr>";}
	colNum = 0;
	output += "<td><b><i>General Equipment</i></b></td></tr><tr>";
	for (i = 0; i < gear.length; i++) {
		if (gear[i].type == "general") {
		colNum++;
		output += '<td><input type="button" value="Buy" onclick="buyGear(' + i +')"> ' +
			gear[i].name + ", $" + gear[i].price.toFixed(2) + "&emsp;</td>";
		if (colNum % 3 == 0) {output += "</tr><tr>";}
	}}
	if (colNum % 3 != 0) {output += "</tr>";}
	colNum = 0;
	output += "<td><b><i>Gun Accessories</i></b></td></tr><tr>";
	for (i = 0; i < gear.length; i++) {
		if (gear[i].type == "gunAcc") {
		colNum++;
		output += '<td><input type="button" value="Buy" onclick="buyGear(' + i +')"> ' +
			gear[i].name + ", $" + gear[i].price.toFixed(2) + "&emsp;</td>";
		if (colNum % 3 == 0) {output += "</tr><tr>";}
	}}
	if (colNum % 3 != 0) {output += "</tr>";}
	colNum = 0;
	output += "<td><b><i>Hats</i></b></td></tr><tr>";
	for (i = 0; i < gear.length; i++) {
		if (gear[i].type == "hats") {
		colNum++;
		output += '<td><input type="button" value="Buy" onclick="buyGear(' + i +')"> ' +
			gear[i].name + ", $" + gear[i].price.toFixed(2) + "&emsp;</td>";
		if (colNum % 3 == 0) {output += "</tr><tr>";}
	}}
	if (colNum % 3 != 0) {output += "</tr>";}
	output += "</table>";
	output += '<br><b><i>Custom</i></b><br>' +
		'<input type="text" placeholder="Equipment name" size="35" id="name"> ' +
		'<input type="text" placeholder="Amount" size="5" id="amount"> ' +
		'<input type="text" placeholder="Cost per" size="5" id="price"> ' +
		'<input type="button" value="Add" onclick="addCustom()">';
	document.getElementById("output").innerHTML = output;
}

function exitGearMenu() {
	chooseAptitudes();
	updateSheet();
	window.scrollTo(0, 0);
}

function buyGun(arrPos, thrown) {
	if (guns[arrPos].price > cash) {return;}
	cash -= guns[arrPos].price;
	if (elCheapo == 0) {guns[arrPos].owned++;}
	else if (elCheapo == 1) {guns[arrPos].elCheapo75++;}
	else if (elCheapo == 2) {guns[arrPos].elCheapo50++;}
	if (guns[arrPos].leMat == true) {guns[arrPos+1].owned++;}
	if (thrown != true) {weapons();}
	gearMenu();
}

function buyMelee(arrPos) {
	if (melee[arrPos].price > cash) {return;}
	cash -= melee[arrPos].price;
	if (elCheapo == 0) {melee[arrPos].owned++;}
	else if (elCheapo == 1) {melee[arrPos].elCheapo75++;}
	else if (elCheapo == 2) {melee[arrPos].elCheapo50++;}
	gearMenu();
}

function buyGear(arrPos) {
	var badEyesPos;
	if (gear[arrPos].price > cash) {return;}
	cash -= gear[arrPos].price;
	if (elCheapo == 0) {gear[arrPos].owned++;}
	else if (elCheapo == 1) {gear[arrPos].elCheapo75++;}
	else if (elCheapo == 2) {gear[arrPos].elCheapo50++;}
	if (gear[arrPos].name == "Spectacles") {
		badEyesPos = getArrPos("badEyes", "hindrances");
		if (hindrances[badEyesPos].lvl > 0 &&
			spectAptPoint == false) {
			aptPoints--;
			hindCosts--;
			spectAptPoint = true;
	}}
	gearMenu();
}

function addCustom() {
	var name, amount, price, item;
	name = document.getElementById("name").value;
	amount = document.getElementById("amount").value;
	price = document.getElementById("price").value;
	if (amount == "") {amount = 1}
	if (price * amount > cash) {return;}
	item = {name:name, owned:amount};
	cash -= price * amount;
	gear.push(item);
	gearMenu();
}

function buyAmmo(arrPos) {
	if (guns[arrPos].ammoPrice > cash) {return;}
	cash -= guns[arrPos].ammoPrice;
	guns[arrPos].ammo += guns[arrPos].ammoAmount;
	gearMenu();
}

function getArrPos(name, type) { // type = gear/guns/melee/aptitudes/edges/hindrances, 
								 // name = fname, jos aptitude, edge tai hindrance
	if (type == "gear") {
		for (i = 0; i < gear.length; i++) {
			if (gear[i].name == name) {return i;}
	}} else if (type == "guns") {
		for (i = 0; i < guns.length; i++) {
			if (guns[i].name == name) {return i;}
	}} else if (type == "melee") {
		for (i = 0; i < melee.length; i++) {
			if (melee[i].name == name) {return i;}
	}} else if (type == "aptitudes") {
		for (i = 0; i < aptitudes.length; i++) {
			if (aptitudes[i].fname == name) {return i;}
	}}  else if (type == "edges") {
		for (i = 0; i < edges.length; i++) {
			if (edges[i].fname == name) {return i;}
	}}  else if (type == "hindrances") {
		for (i = 0; i < hindrances.length; i++) {
			if (hindrances[i].fname == name) {return i;}
	}}
	console.log("Error");
}

function printSheets() {
	var hexArrPos = getArrPos("hexslingin", "aptitudes");
	if (aptPoints < 0) {return;}
	output = '<table><tr><td id="padded"><b>Cognition ' +
		cognition + '</b><br>';
	for (i = 0; i < aptitudes.length; i++) {
		if (aptitudes[i].trait == "co" && aptitudes[i].lvl != 0) {
			output += aptitudes[i].name
			if (aptitudes[i].con != undefined) {
				output += ": " + aptitudes[i].con.toLowerCase()}
			output += " " + aptitudes[i].lvl + "<br>"
	}}
	output += "<b>Deftness " + deftness + "</b><br>";
	for (i = 0; i < aptitudes.length; i++) {
		if (aptitudes[i].trait == "de" && aptitudes[i].lvl != 0) {
			output += aptitudes[i].name
			if (aptitudes[i].con != undefined) {
				output += ": " + aptitudes[i].con.toLowerCase()}
			output += " " + aptitudes[i].lvl + "<br>"
	}}
	output += "<b>Knowledge " + knowledge + "</b><br>";
	for (i = 0; i < aptitudes.length; i++) {
		if (aptitudes[i].trait == "kn" && aptitudes[i].lvl != 0) {
			output += aptitudes[i].name
			if (aptitudes[i].con != undefined) {
				output += ": " + aptitudes[i].con.toLowerCase()}
			output += " " + aptitudes[i].lvl + "<br>"
	}}
	output += "<b>Mien " + mien + "</b><br>";
	for (i = 0; i < aptitudes.length; i++) {
		if (aptitudes[i].trait == "mi" && aptitudes[i].lvl != 0) {
			output += aptitudes[i].name
			if (aptitudes[i].con != undefined) {
				output += ": " + aptitudes[i].con.toLowerCase()}
			output += " " + aptitudes[i].lvl + "<br>"
	}}
	output += "<b>Nimbleness " + nimbleness + "</b><br>";
	for (i = 0; i < aptitudes.length; i++) {
		if (aptitudes[i].trait == "ni" && aptitudes[i].lvl != 0) {
			output += aptitudes[i].name
			if (aptitudes[i].con != undefined) {
				output += ": " + aptitudes[i].con.toLowerCase()}
			output += " " + aptitudes[i].lvl + "<br>"
	}}
	output += "<b>Quickness " + quickness + "</b><br>";
	for (i = 0; i < aptitudes.length; i++) {
		if (aptitudes[i].trait == "qu" && aptitudes[i].lvl != 0) {
			output += aptitudes[i].name
			if (aptitudes[i].con != undefined) {
				output += ": " + aptitudes[i].con.toLowerCase()}
			output += " " + aptitudes[i].lvl + "<br>"
	}}
	output += "<b>Smarts " + smarts + "</b><br>";
	for (i = 0; i < aptitudes.length; i++) {
		if (aptitudes[i].trait == "sm" && aptitudes[i].lvl != 0) {
			output += aptitudes[i].name
			if (aptitudes[i].con != undefined) {
				output += ": " + aptitudes[i].con.toLowerCase()}
			output += " " + aptitudes[i].lvl + "<br>"
	}}
	output += "<b>Spirit " + spirit + "</b><br>";
	for (i = 0; i < aptitudes.length; i++) {
		if (aptitudes[i].trait == "sp" && aptitudes[i].lvl != 0) {
			output += aptitudes[i].name
			if (aptitudes[i].con != undefined) {
				output += ": " + aptitudes[i].con.toLowerCase()}
			output += " " + aptitudes[i].lvl + "<br>"
	}}
	output += "<b>Strength " + strength + "</b><br>";
	for (i = 0; i < aptitudes.length; i++) {
		if (aptitudes[i].trait == "st" && aptitudes[i].lvl != 0) {
			output += aptitudes[i].name
			if (aptitudes[i].con != undefined) {
				output += ": " + aptitudes[i].con.toLowerCase()}
			output += " " + aptitudes[i].lvl + "<br>"
	}}
	output += "<b>Vigor " + vigor + "</b><br>";
	for (i = 0; i < aptitudes.length; i++) {
		if (aptitudes[i].trait == "vi" && aptitudes[i].lvl != 0) {
			output += aptitudes[i].name
			if (aptitudes[i].con != undefined) {
				output += ": " + aptitudes[i].con.toLowerCase()}
			output += " " + aptitudes[i].lvl + "<br>"
	}}
	if (aptitudes[hexArrPos].lvl > 0) {
		output += "<br>Hexslingin': " + aptitudes[hexArrPos].lvl + "<br>";
	}
	output += "<br><b>Pace:</b> " + pace + " <b>Size:</b> " + size +
		" <b>Wind:</b> " + wind + " <b>Grit:</b> " + grit + 
		'</td><td id="padded">' + "<p><b>Edges</b></p>";
	for (i = 0; i < edges.length; i++) {
		if (edges[i].lvl != 0) {
			output += edges[i].name + " ";
			if (edges[i].parenth != undefined &&
				edges[i].parenth != "") {
				output += "(" + edges[i].parenth + ") ";
			}
			if (edges[i].lvl != -15) {output += edges[i].lvl;}
			output += "<br>";
	}}
	output += "<p><b>Hindrances</b></p>";
	for (i = 0; i < hindrances.length; i++) {
		if (hindrances[i].lvl != 0) {
			output += hindrances[i].name + " ";
			if (hindrances[i].parenth != undefined &&
				hindrances[i].parenth != "") {
				output += "(" + hindrances[i].parenth + ") ";
			}
			output += hindrances[i].lvl + "<br>";
	}}
	output += "<p><b>Gear</b></p>";
	for (i = 0; i < guns.length; i++) {
		if (guns[i].owned > 0) {
			if (guns[i].owned > 1) {output += guns[i].owned + "x ";}
			output += guns[i].name;
			if (guns[i].type != "throw") {
				output += "<br>&emsp;Ammo: " + guns[i].ammo;}
			output += "<br>";
	}}
	for (i = 0; i < melee.length; i++) {
		if (melee[i].owned > 0) {
			if (melee[i].owned > 1) {output += melee[i].owned + "x ";}
			output += melee[i].name + "<br>";
	}}
	for (i = 0; i < gear.length; i++) {
		if (gear[i].owned > 0) {
			if (gear[i].owned > 1) {output += gear[i].owned + "x ";}
			output += gear[i].name + "<br>";
	}}
	output += "$" + cash.toFixed(2) + "<p><b>Notes</b></p>" + notes;
	output += '<td id="padded"></td>' // Tänne väliin esim. Hexit jos teet
	output += "</td></tr></table>"
	output += "<br><table><caption>Shootin' Irons & Such</caption<tr><th>Weapon" +
		"</th><th>Shots</th><th>RoF</th><th>Range</th><th>Damage</th></tr>";
	for (i = 0; i < guns.length; i++) {
		if (guns[i].owned > 0) {
			output += "<tr><td>" + guns[i].name + "</td><td>" + guns[i].shots +
				"</td><td>" + guns[i].rof + "</td><td>" + guns[i].range +
				"</td><td>" + guns[i].dam + "</td></tr>";
	}}
	output += "</table><br><table><caption>Hand-to-Hand Weapons</caption>" +
		"<tr><th>Weapon</th><th>Defense</th><th>Damage</th></tr>";
	for (i = 0; i < melee.length; i++) {
		if (melee[i].owned > 0) {
			output += "<tr><td>" + melee[i].name + "</td><td>" + melee[i].db +
				"</td><td>" + melee[i].dam + "</tr>";
	}}
	output += "</table>";
	document.getElementById("output").innerHTML = output;
	
	input = "<b>Corporeal:</b> D:" + deftness + ", N:" + nimbleness + ", Q:" +
		quickness + ", S:" + strength + ", V:" + vigor + "<br>";
	for (i = 0; i < aptitudes.length; i++) {
		if (aptitudes[i].lvl == 0) {continue;}
		if (aptitudes[i].type == "corporeal") {
			input += aptitudes[i].name.toLowerCase();
			if (aptitudes[i].con != undefined) {
				input += ": " + aptitudes[i].con.toLowerCase();
			}
			input += " " + aptitudes[i].lvl;
			switch (aptitudes[i].trait) {
				case "de":
					input += deDie;
					break;
				case "ni":
					input += niDie;
					break;
				case "qu":
					input += quDie;
					break;
				case "st":
					input += stDie;
					break;
				case "vi":
					input += viDie;
			}
			input += ", ";
	}}
	if (input.slice(-2) == ", ") {input = input.slice(0, -2) + "<br>";}
	input += "<b>Mental:</b> C:" + cognition + ", K:" + knowledge + ", M:" +
		mien + ", Sm:" + smarts + ", Sp:" + spirit + "<br>";
	for (i = 0; i < aptitudes.length; i++) {
		if (aptitudes[i].lvl == 0) {continue;}
		if (aptitudes[i].type == "mental") {
			input += aptitudes[i].name.toLowerCase();
			if (aptitudes[i].con != undefined) {
				input += ": " + aptitudes[i].con.toLowerCase();
			}
			input += " " + aptitudes[i].lvl;
			switch (aptitudes[i].trait) {
				case "co":
					input += coDie;
					break;
				case "kn":
					input += knDie;
					break;
				case "mi":
					input += miDie;
					break;
				case "sm":
					input += smDie;
					break;
				case "sp":
					input += spDie;
			}
			input += ", ";
	}}
	input = input.slice(0, -2) + "<br><b>Edges & Hindrances:</b> "
	for (i = 0; i < edges.length; i++) {
		if (edges[i].lvl == 0) {continue;}
		input += edges[i].name.toLowerCase();
		if (edges[i].parenth != undefined &&
			edges[i].parenth != "") {
			input += " (" + edges[i].parenth.toLowerCase() + ")";
		}
		if (edges[i].lvl != -15) {input += " " + edges[i].lvl;}
		input += ", ";
	}
	for (i = 0; i < hindrances.length; i++) {
		if (hindrances[i].lvl == 0) {continue;}
		input += hindrances[i].name.toLowerCase() + " ";
		if (hindrances[i].parenth != undefined &&
			hindrances[i].parenth != "") {
			input += "(" + hindrances[i].parenth.toLowerCase() + ") ";
		}
		input += hindrances[i].lvl + ", ";
	}
	if (input.slice(-2) == ", ") {input = input.slice(0, -2)}
	else if (input.slice(-2) == "> ") {input = input.slice(0, -31)}
	input += "<br><b>Gear:</b> ";
	for (i = 0; i < gear.length; i++) {
		if (gear[i].owned > 0) {
			if (gear[i].owned > 1) {input += gear[i].owned + "x "}
			input += gear[i].name.toLowerCase() + ", ";
	}}
	if (input.slice(-2) == ", ") {input = input.slice(0, -2)}
	else if (input.slice(-2) == "> ") {input = input.slice(0, -17)}
	input += "<br><b>Attacks:</b> ";
	for (i = 0; i < guns.length; i++) {
		if (guns[i].owned > 0) {
			if (guns[i].owned > 1) {input += guns[i].owned + "x "}
			if (guns[i].leMat == true) {
				input += guns[i].name + " & Shotgun";
			} else {input += guns[i].name;}
			if (guns[i].type != "shot") {input += ": " + guns[i].dam}
			input += ", ";
			if (guns[i].leMat == true) {i++;}
	}}
	for (i = 0; i < melee.length; i++) {
		if (melee[i].owned > 0) {
			if (melee[i].owned > 1) {input += melee[i].owned + "x "}
			input += melee[i].name;
			if (melee[i].dam != "-") {input += ": " + melee[i].dam;}
			input += ", ";
	}}
	if (input.slice(-2) == ", ") {input = input.slice(0, -2)}
	else if (input.slice(-2) == "> ") {input = input.slice(0, -20)}
	if (aptitudes[hexArrPos].lvl > 0) {
	input += "<br>Hexslingin': " + aptitudes[hexArrPos].lvl;
	}
	input += "<br><br>" + notes;
	document.getElementById("input").innerHTML = input;
	window.scrollTo(0, 0);
}

function addParentheses(arrPos, type) {
	var name;
	if (type == "edge") {name = edges[arrPos].fname;}
	else if (type == "hindrance") {name = hindrances[arrPos].fname;}
	else {console.log("Error");}
	input = "";
	if (name == "arcane") {
		input = '<input type="radio" name="x" value="Huckster" ' +
		'onclick="updateField(this.value)">Huckster<br>' +
		'<input type="radio" name="x" value="Mad Scientist" ' +
		'onclick="updateField(this.value)">Mad Scientist<br>' +
		'<input type="radio" name="x" value="Blessed" ' +
		'onclick="updateField(this.value)">Blessed<br>' +
		'<input type="radio" name="x" value="Shaman" ' +
		'onclick="updateField(this.value)">Shaman<br>';
	} else if (name == "theVoice") {
		input = '<input type="radio" name="x" value="Soothing" ' +
		'onclick="updateField(this.value)">Soothing ' + 
		'(+2 to <i>persuasion</i> rolls in peaceful situations)<br>' +
		'<input type="radio" name="x" value="Threatening" ' +
		'onclick="updateField(this.value)">Threatening ' +
		'(+2 to <i>overawe</i> rolls)<br>' +
		'<input type="radio" name="x" value="Grating" ' +
		'onclick="updateField(this.value)">Grating ' +
		'(+2 to <i>ridicule</i> rolls)<br>';
	}
	input += '<br><input type="text" id="selection"> ' +
		'<input type="button" value="Add Edge/Hindrance" ' +
		'onclick="parenthAttr(' + arrPos + 
		', \'' + type + '\')">';
	document.getElementById("input").innerHTML = input;
	window.scrollTo(0, 0);
}

function parenthAttr(arrPos, type) {
	var parenth = document.getElementById("selection").value;
	if (parenth == "Soothing") {
		notes += "+2 to <i>persuasion</i> rolls in peaceful situations<br>"
	} else if (parenth == "Threatening") {
		notes += "+2 to <i>overawe</i> rolls<br>"
	} else if (parenth == "Grating") {
		notes += "+2 to <i>ridicule</i> rolls<br>"
	}
	if (type == "edge") {
		if (edges[arrPos].parenth != undefined &&
			edges[arrPos].parenth != "") {
			edges[arrPos].parenth += " & " + parenth;
		} else {edges[arrPos].parenth = parenth;}
	}
	else if (type == "hindrance") {
		if (hindrances[arrPos].parenth != undefined &&
			hindrances[arrPos].parenth != "") {
			hindrances[arrPos].parenth += " & " + parenth;
		} else {hindrances[arrPos].parenth = parenth;}
	}
	else {console.log("Error");}
	chooseAptitudes();
	updateSheet();
}