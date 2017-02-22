function solve() {
    'use strict';

    const ERROR_MESSAGES = {
        INVALID_NAME_TYPE: 'Name must be string!',
        INVALID_NAME_LENGTH: 'Name must be between between 2 and 20 symbols long!',
        INVALID_NAME_SYMBOLS: 'Name can contain only latin symbols and whitespaces!',
        INVALID_MANA: 'Mana must be a positive integer number!',
        INVALID_EFFECT: 'Effect must be a function with 1 parameter!',
        INVALID_DAMAGE: 'Damage must be a positive number that is at most 100!',
        INVALID_HEALTH: 'Health must be a positive number that is at most 200!',
        INVALID_SPEED: 'Speed must be a positive number that is at most 100!',
        INVALID_COUNT: 'Count must be a positive integer number!',
        INVALID_SPELL_OBJECT: 'Passed objects must be Spell-like objects!',
        NOT_ENOUGH_MANA: 'Not enough mana!',
        TARGET_NOT_FOUND: 'Target not found!',
        INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!',
		INVALID_ALIGNMENT: 'Alignment must be good, neutral or evil!',
    };
		const getNextId = (function(){
		var count=0;
		return function(){
			count+=1;
			return count;
		};
	})();
const VALIDATOR={
 isString(str){
    if(typeof str !== 'string'){
        throw  Errore(ERROR_MESSAGES.INVALID_NAME_TYPE);
    }
},
isValidDamage(number){
	 if(typeof number!== 'number' || number<=0 || number>=100){
        throw  Error(ERROR_MESSAGES.INVALID_DAMAGE);
    }
},
isValidHealth(number){
	 if(typeof number!== 'number' || number<=0 || number>200){
        throw  Error(ERROR_MESSAGES.INVALID_HEALTH);
    }
},
isValidCount(number){
	 if(typeof number!== 'number' || number<0){
        throw  Error(ERROR_MESSAGES.INVALID_HEALTH);
    }
},
isValidSpeed(number){
	 if(typeof number!== 'number' || number<0 || number>100){
        throw  Error(ERROR_MESSAGES.INVALID_SPEED);
    }
},
isLengthInRange(str){
    if(str.length<2 || str.length>20){
        throw  Error(ERROR_MESSAGES.INVALID_NAME_LENGTH)
    }
},
isContainValidSymbol(str){
    if(str.match(/[^a-zA-Z ]/)){
        throw  Error(ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
    }
},
isPositiveNumber(number){
    if(typeof str!== 'number' || str<0){
        throw  Error(ERROR_MESSAGES.INVALID_MANA);
    }
},
isNotValidAlignmet(str){
	if(str!== 'good' && str !== 'neutral' && str !=='evil'){
		throw Error(ERROR_MESSAGES.INVALID_ALIGNMENT);
	}
},
isValidEffect(func)
{
    if(typeof func !== 'function' || func !== 1){
        throw  Error(ERROR_MESSAGES.INVALID_EFFECT);
    }
}}
  class Spell{
      constructor(name,manaCost,effect){
          this.name=name,
          this.manaCost=manaCost,
          this.effect=effect;
      }
      get name(){          
          return this._name;
      }
      set name(name){
          VALIDATOR.isString(name),
          VALIDATOR.isLengthInRange(name);
          VALIDATOR.isContainValidSymbol(name);
          this._name=name;
      }
        get manaCost(){
          return this._manaCost;
      }
      set manaCost(manaCost){
          VALIDATOR.isPositiveNumber(manaCost);
          this._manaCost=manaCost;
      }
        get effect(){
          return this.effect;
      }
      set effect(effect){
          VALIDATOR.isValidEffect(effect);
          this.effect=effect;
      }
  }
  class Unit{
	constructor(name,alignment){
	  this.name=name,
	  this.alignment=alignment
	}
	   get name(){          
          return this._name;
      }
      set name(name){
          VALIDATOR.isString(name),
          VALIDATOR.isLengthInRange(name);
          VALIDATOR.isContainValidSymbol(name);
          this._name=name;
      }
	   get alignment(){
          return this.alignment;
      }
      set alignment(alignment){
          VALIDATOR.isNotValidAlignmet(alignment);
          this._alignment=alignment;
      }	
  }
  class ArmyUnit extends Unit{
	constructor(name,alignment,damage,health,count,speed){
		super(name,alignment);
		this._id=getNextId();
		this.damage=damage;
		this.health=health;
		this.count=count;
		this.speed=speed;
	}
	get id(){
		return this._id;
	}
	get damage(){
		return this._damage;
	}
	set damage(damage){
		VALIDATOR.isValidDamage(damage);
		this._damage=damage;
	}
	get health(){
		return this._damage;
	}
	set health(health){
		VALIDATOR.isValidHealth(health);
		this._health=health;
	}
	get count(){
		return this._count;
	}
	set count(count){
		VALIDATOR.isValidCount(count);
		this._count=count;
	}
	get speed(){
		return this._speed;
	}
	set speed(speed){
		VALIDATOR.isValidSpeed(speed);
		this._speed=speed;
	}
  }
  class Commander extends Unit{
	constructor(name,alignment,mana,spellBook,army){
		super(name,alignment);
		this.mana=mana;
		this.spellbook=spellbook;
		this.army=army;
	}
	get mana(){
		return this._mana;
	}
	set mana(mana){
		VALIDATOR.isPositiveNumber(mana);
		this._mana=mana;
	}
	  get spellbook () {
        return this._spellbook;
      }
      set spellbook(spellbook) {
        this._spellbook = spellbook;
      }
      get army () {
        return this._army;
      }
      set army(army) {
        this._army = army;
      }

  }
     const battlemanagerData = {
      commanders: [],
      armyUnitsObj: {},
      armyUnits: [],
    };
	Array.prototype.filterByProperty=function(query,propName){
		if(!query.hasOwnProperty(propName)){
			return this;
		}
		const value=query[propName];
		return this.filter(x=>x[propName]===value);
	};
    const battlemanager = {
        getCommander:function(name, alignment, mana){
			return new Commander(name, alignment, mana);
        },
        getArmyUnit:function(options){
		  const { name, alignment, damage, health, count, speed } = options;
        const unit = new ArmyUnit(name, alignment, damage, health, count, speed);
        battlemanagerData.armyUnitsObj[unit.id] = unit;
        battlemanagerData.armyUnits.push(unit);
        return unit;
        },
        getSpell:function(name, manaCost, effect){
			return new Spell(name, manaCost, effect);
        },
        addCommanders:function(...commanders){
		battlemanagerData.commanders.push(...commanders);
		return this;
        },
        addArmyUnitTo:function(commanderName, armyUnit){
		battlemanagerData.commanders.find(c=>c.name===commanderName)
		.army.push(armyUnit);
		return this;
        },
		
         addSpellsTo: function(commanderName, ...spells) {
        try {  
          battlemanagerData.commanders
            .find(c => c.name === commanderName)
            .spellbook.push(...(spells.map(s => new Spell(s.name, s.manaCost, s.effect))));
        }
        catch(e) {
          throw Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
        }

        return this;
      },
        findCommanders:function(query){
			return battlemanagerData.commanders().slice()
			.filterByProperty(query,'name')
			.filterByProperty(query,'alignment')
			.sort((x,y)=>x.name.locateCompare(y.name));
        },
        findArmyUnitById:function(id){
		return battlemanagerData.armyUnitsObj[id];
        },
        findArmyUnits:function(query){
			return battlemanagerData.armyUnits.slice()
			.filterByProperty(query,'id')
			.filterByProperty(query,'name')
			.filterByProperty(query,'alignment')
			.sort((x,y)=>{
				const spd=y.speed-x.speed;
				if(spd==0){
					return x.name.locateCompare(y.name);
				}
				return spd;
			});
        },
        spellcast:function(casterName, spellName, targetUnitId) {
		
        },
        battle:function(attacker, defender){

        }
    };

    return battlemanager;
}
module.exports = solve;