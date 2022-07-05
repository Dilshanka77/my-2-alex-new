require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || 'OTU1MDUyMzk3OTQyNzAyMTMw.G0M_ng.MI58Jl8oJhfciAAoF6AGvIV1rU4l5wqvP2VP5o', // your discord bot token
  prefix: process.env.PREFIX || '%', // bot prefix
  ownerID: process.env.OWNERID || ['', '828968509420732446', '868098748281155595'], //your discord id
  SpotifyID: process.env.SPOTIFYID || '52ad218fe09e463f8cb9e110902946ef', // spotify client id
  SpotifySecret: process.env.SPOTIFYSECRET || '8cba16cad2e243cda21c3fcf4538e5f8', // spotify client secret
  mongourl: process.env.MONGO_URI || 'mongodb+srv://D_D_K:Dk00mongodb@staxmusic.id3r1.mongodb.net/Apa?retryWrites=true&w=majority', // MongoDb URL
  embedColor: process.env.COlOR || '#d0a9be', // embed colour
  logs: process.env.LOGS || '', // Discord channel id 
  links: {
    support: process.env.SUPPORT || 'https://discord.gg/hKWE5FgxUy',
    invite: process.env.INVITE || 'https://discord.com/api/oauth2/authorize?client_id=976073875072901170&permissions=397619363193&scope=bot%20applications.commands',
    vote: process.env.VOTE || 'https://discordbotlist.com/bots/alexia/upvote',
    bg: process.env.BG || 'https://cdn.discordapp.com/attachments/981575766347218975/986940889857421312/wallpapersden.com_anime-girl-listening-music_1920x1080.jpg',
    web: process.env.WEB || 'https://alexiamusic.ml/'
  },

  nodes: [
    {
      url: process.env.NODE_URL || '51.161.130.134:10337',
      name: process.env.NODE_NAME || 'Main',
      auth: process.env.NODE_AUTH || 'Dilshan',
      secure: parseBoolean(process.env.NODE_SECURE || 'false'),
    },
  ],
  filters: {
    clear: "dynaudnorm=f=200",
    lightbass: "bass=g=8,dynaudnorm=f=200",
    heavybass: "bass=g=20,dynaudnorm=f=200",
    bassboost: "bass=g=8,dynaudnorm=f=200",
    custombassboost: "bass=g=1,dynaudnorm=f=200",
    customspeed: "atempo=1.0",
    purebass: "bass=g=20,dynaudnorm=f=200,asubboost",
    "8d": "apulsator=hz=0.08",
    vaporwave: "aresample=48000,asetrate=48000*0.8",
    nightcore: "aresample=48000,asetrate=48000*1.25",
    phaser: "aphaser=in_gain=0.4",
    tremolo: "tremolo",
    vibrato: "vibrato=f=6.5",
    reverse: "areverse",
    treble: "treble=g=5",
    surrounding: "surround",
    pulsator: "apulsator=hz=1",
    subboost: "asubboost",
    karaoke: "stereotools=mlev=0.03",
    flanger: "flanger",
    gate: "agate",
    haas: "haas",
    mcompand: "mcompand",
    earrape: "bass=g=50",
    bassboost1: "bass=g=1,dynaudnorm=f=200",
    bassboost2: "bass=g=2,dynaudnorm=f=200",
    bassboost3: "bass=g=3,dynaudnorm=f=200",
    bassboost4: "bass=g=4,dynaudnorm=f=200",
    bassboost5: "bass=g=5,dynaudnorm=f=200",
    bassboost6: "bass=g=6,dynaudnorm=f=200",
    bassboost7: "bass=g=7,dynaudnorm=f=200",
    bassboost8: "bass=g=8,dynaudnorm=f=200",
    bassboost9: "bass=g=9,dynaudnorm=f=200",
    bassboost10: "bass=g=10,dynaudnorm=f=200",
    bassboost11: "bass=g=11,dynaudnorm=f=200",
    bassboost12: "bass=g=12,dynaudnorm=f=200",
    bassboost13: "bass=g=13,dynaudnorm=f=200",
    bassboost14: "bass=g=17,dynaudnorm=f=200",
    bassboost15: "bass=g=15,dynaudnorm=f=200",
    bassboost16: "bass=g=16,dynaudnorm=f=200",
    bassboost17: "bass=g=17,dynaudnorm=f=200",
    bassboost18: "bass=g=18,dynaudnorm=f=200",
    bassboost19: "bass=g=19,dynaudnorm=f=200",
    bassboost20: "bass=g=20,dynaudnorm=f=200",
  },
  options: {
    embedFooter: true,
    nowplayingMsg: true
  },
};

function parseBoolean(value){
    if (typeof(value) === 'string'){
        value = value.trim().toLowerCase();
    }
    switch(value){
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}
