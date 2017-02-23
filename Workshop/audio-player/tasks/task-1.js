function solve() {
 var Id = (function() { 
        var id = 0;

        function nextId() { 
            id++;
            return id;
        }
        return {
            nextId: nextId
        };
    })();

    const VALIDATOR={
        isLengthInRange(str){
    if(str.length<3 || str.length>25){
        throw  Error('String must be between 3 and 25 symbol.')
    }
},
isGreaterThanZero(number){
    	if(typeof number!== 'number' || number<0){
            throw Error("The length must be greate than 0");
}
},
isValidNumber(number){
    	if(typeof number!== 'number' || number<1 || number>5){
            throw Error("The number must be between 1 and 5");
}
}
};
    
    class Playable{
        constructor(title,author){
            this._id=Id.nextId();
            this.title=title;
            this.author=author;
        }
        get id(){
            return this._id;
        }
        get title(){
            return this._title;
        }
        set title(title){
            VALIDATOR.isLengthInRange(title);
            this._title=title;
        }
            get author(){
            return this._author;
        }
        set author(author){
            VALIDATOR.isLengthInRange(author);
            this._author=author;
        }
        play(){
            return `[${this.id}]. [${this.title}] - [${this.author}]`;
        }
    }
    class Audio extends Playable{
        constructor(title,author,length){
            super(title,author);
            this.length=length;
        }
        get length(){
            return this._length;
        }
        set length(length){
            VALIDATOR.isGreaterThanZero(length);
            this._length=length;
        }
        play(){
            return `${super.play()} - [${this.length}]`;
        }
    }

    class Video extends Playable{
        constructor(title,author,imdbRating){
            super(title,author);
            this.imdbRating=imdbRating;
        }
        get imdbRating(){
            return this._imdbRating;
        }

        set imdbRating(imdbRating){
            VALIDATOR.isValidNumber(imdbRating);
            this._imdbRating=imdbRating;
        }
        play(){
            return `${super.play()} - [${this.imdbRating}]`;
        }

    }

    class Player{
        constructor(name){
            this.name=name;
            this._playlist=[];
        }
        get name(){
            return this._name=name;
        }
        set name(name){
            VALIDATOR.isLengthInRange(name);
            this._name=name;
        }
        addPlaylist(playlistToAdd){
              if (!(playlistToAdd instanceof PlayList)) {
                throw Error('Must be an instance');
}
        this._playlist.push(playlistToAdd);
        return this;
        }
        getPlaylistById(id){
   var res= this._playlist.find(i=>i.id===id);
         if(res==='undefied'){
             return null;
         }
         return res;
        }
        
       removePlaylist(arg){
 if(typeof arg==='number'){
          var res= this._playlist.findIndex(i=>i.id===arg);
          if(res==-1){
              throw ErrorI('Playlist doesn\'t contain this id');
          } 
          
        return  this._playlist.splice(res,1);
        }
          if(typeof arg==='object'){
              if(arg===null){
                throw ErrorI('Playlist doesn\'t contain this id');
              }else{
    var res= this._playlist.findIndex(i=>i.id===arg.id);
          if(res==-1){
              throw ErrorI('Playlist doesn\'t contain this id');
          }
        
              return  this._playlist.splice(res,1);
              
        }
       
              }
        }
        removePlaylist(playlist){

        }
        listPlaylists(page, size){
            
            let sortedPlayList = this._playlists.sort((x, y) => {
                if (x.name === y.name) {
                    return x.id - y.id;
                }
                return x.name.localCompare(y.name);
            });
            let slicedPlayList = sortedPlayList.slice(page * size, (page + 1) * size);
            return slicedPlayList;

        }
           contains(playable, playlist) {
            let playListById = this.getPlaylistById(playlist.id);
            if (playListById == null) {
                return false;
            }
            let playableById = getPlayableById(playable.id);
            if (playableById == null) {
                return false;
            }
            return true;
        }
        search(pattern) {
            return this._playlists.filter(p => p.listPlayables().some(playable => {
                return (playable.title.indexOf(pattern) > -1);
            })).map(playlist => ({ id: playlist.id, name: playlist.name }));
}
    }
     class Playlist{
        constructor(name){
            this._id=Id.nextId();
            this.name=name;
            this._playable=[];
        }
        get id(){
            return this._id;
        }
        get name(){
            return this._name;
        }
        set name(name){
            VALIDATOR.isLengthInRange(name);
            this._name=name;
        }
        addPlayable(playable){
    this._playable.push(playable);
            return this;
        }
        getPlayableById(id){
         var res= this._playable.find(i=>i.id===id);
         if(res==='undefied'){
             return null;
         }
         return res;
        }
        removePlayable(arg){
            if(typeof arg==='number'){
          var res= this._playable.findIndex(i=>i.id===arg);
          if(res==-1){
              throw ErrorI('Playlist doesn\'t contain this id');
          } 
          
        return  this._playable.splice(res,1);
        }
          if(typeof arg==='object'){
              if(arg===null){
                throw ErrorI('Playlist doesn\'t contain this id');
              }else{
    var res= this._playable.findIndex(i=>i.id===arg.id);
          if(res==-1){
              throw ErrorI('Playlist doesn\'t contain this id');
          }
        
              return  this._playable.splice(res,1);
              
        }
       
              }
      
        }
        removePlayable(playable){

        }
        listPlayables(page, size){
                let sortedPlayable = this._playable.sort((x, y) => {
                if (x.name === y.name) {
                    return x.id - y.id;
                }
                return x.name.localCompare(y.name);
            });
            let slicedPlayable = sortedPlayable.slice(page * size, (page + 1) * size);
return slicedPlayable;
        }
    }
    const module = {
    getPlayer: function (name){
        return new Player(name);
    },
    getPlaylist: function(name){
       return new Playlist(name);
    },
    getAudio: function(title, author, length){
       return new Audio(title,author,length);
    },
    getVideo: function(title, author, imdbRating){
      return new Video(title,author,imdbRating);
    }
};
return module;
}

module.exports = solve;