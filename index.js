const fs = require("fs");
const path = require("path");
const title = require("console-title");
const ask = require("prompt-sync")();
const gradient = require("gradient-string");
const fetch = require('node-fetch'); //npm install node-fetch@^2.6.6
var config = require("./config.json");
if (!fs.existsSync(config.playerdir)) return console.log("Error when Fetching to (" + config.playerdir + ")\n{Error Directory not found}");
if (!fs.existsSync(config.worlddir)) return console.log("Error when Fetching to (" + config.worlddir + ")\n{Error Directory not found}");
var playersdir = config.playerdir, worldsdir = config.worlddir;
var playersdirtotal = fs.readdirSync(config.playerdir).length, worldsdirtotal = fs.readdirSync(config.worlddir).length;
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var montas = "";
if (month == 1) montas = "January";
if (month == 2) montas = "Febuary";
if (month == 3) montas = "March";
if (month == 4) montas = "April";
if (month == 5) montas = "May";
if (month == 6) montas = "June";
if (month == 7) montas = "July";
if (month == 8) montas = "August";
if (month == 9) montas = "Febuary";
if (month == 10) montas = "September";
if (month == 11) montas = "October";
if (month == 12) montas = "December";
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
var type = "", timeds = "";
var version = "1.4\n"; //Dont change this to bypass version :)
if (hours > 12) type = "PM";
if (hours < 12) type = "AM";
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
var times = `${hours}:${minutes}:${seconds} ${type}`;
var dates = `[${montas}-${date}-${year}]`;

var log = `[${gradient('#f5d64c','#f5d64c')("•")}]`;
var who = `[${gradient('#ff0011','#ff0011')("?")}]`
var err = `[${gradient('#ff0011','#ff0011')("x")}]`;
var warn = `[${gradient('#f5d64c','#f5d64c')("!")}]`;
var results = `[${gradient('#ad5028','#ad5028')("~")}]`;


/*function TypeIn (msg) {
    for (let c of s + "\n") {
        process.stdout.write(c);
        process.stdout.flush();
        setTimeout(() => {}, 50); // Delay of 50 milliseconds
    }
}*/

const update_version = async () => {
    var createnewfile = await fetch("https://raw.githubusercontent.com/BorzXy/EcoScanner/main/index.js").then(data => data.text());
    console.log("Please wait, writing the file!")
    var scriptName = path.basename(__filename);
    fs.unlinkSync(scriptName);
    setTimeout(() => {
        fs.writeFileSync(scriptName, createnewfile);
    }, 500);
}

const MasukMenu = async () => {
    console.clear();
    var ckversion = await fetch("https://raw.githubusercontent.com/BorzXys/EcoScanners/main/ver").then(data => data.text());
    if (version != ckversion) {
        console.log("New version has been found, updating...");
        update_version();
        return;
    }
    var ip = await fetch(`https://api.ipify.org`).then(data => data.text());
    title("[MENU] | Version : " + version + " | Date : " + dates)
    var banner = `${gradient('white','white')(`███████  ██████  █████  ███    ██ ███    ██ ███████ ██████  
██      ██      ██   ██ ████   ██ ████   ██ ██      ██   ██ 
███████ ██      ███████ ██ ██  ██ ██ ██  ██ █████   ██████  
     ██ ██      ██   ██ ██  ██ ██ ██  ██ ██ ██      ██   ██ 
███████  ██████ ██   ██ ██   ████ ██   ████ ███████ ██   ██`)}

${log} Author : ${gradient('#f5d64c','#f5d64c')("Daritoc & BorzXy")}
${log} Github / Discord : ${gradient('#f5d64c','#f5d64c')("BorzXy / borzxy")}
${log} Programming Language : ${gradient('#f5d64c','#f5d64c')("Node.js (21.7.1)")}
${log} IP : ${gradient('#f5d64c','#f5d64c')(ip)}
${log} Time : ${gradient('#f5d64c','#f5d64c')(times)}

${log} Player Directory : ${gradient('#f5d64c', '#f5d64c')("(" + playersdir + ")")}
${log} World Directory : ${gradient('#f5d64c', '#f5d64c')("(" + worldsdir + ")")}
${log} Registered Player Total : ${gradient('#f5d64c', '#f5d64c')(playersdirtotal)}
${log} Registered World Total : ${gradient('#f5d64c', '#f5d64c')(worldsdirtotal)}


${log} Note : ${gradient('#f5d64c', '#f5d64c')("If you have any suggestion and Report a Problem, Feel free to Dm me at Discord (borzxy)")}

${log} [1] ${gradient('#f5d64c', '#f5d64c')("Role Scanner (Note: Only scan vip, mod, dev, superdev)")}
${log} [2] ${gradient('#f5d64c', '#f5d64c')("Scan Economy (Note: Only Scan Dropped Item and Player Inventory)")}
${log} [3] ${gradient('#f5d64c', '#f5d64c')("Info Player")}
${log} [4] ${gradient('#f5d64c', '#f5d64c')("View Player Set (Note: You need items.json)")}
${log} [0] ${gradient('#f5d64c', '#f5d64c')("Exit")}
    `;
    console.clear();
    console.log(banner);
    var choose = ask(log + " > ");
    Scanner(choose);
}

MasukMenu();

function MenuTerakhir (type) {
    if (type == 1) {
        MasukMenu();
    } else if (type == 0) {
        console.clear();
        console.log(log + " Bye Bye")
        process.exit();
    } else {
        console.clear();
        console.log(err + " System dont have that command")
        process.exit();
    }
}

function Scanner (type) {
    if (type == 1) {
        title("[Role Scanner] | Date : " + dates)
        fs.readdir(playersdir, (err, files) => {
            var filter = files.filter(f => f.split(".").pop() === "json");
            var vip = [], mod = [], dev = [], superdev = [];
            for (i = 0; i < filter.length; i++) {
                try {
                    const fileData = fs.readFileSync(path.join(playersdir, filter[i]));
                    const json = JSON.parse(fileData.toString());
                    if (json.vip) {
                        vip.push(json.name);
                    }
                    if (json.mod) {
                        mod.push(json.name);
                    }
                    if (json.dev) {
                        dev.push(json.name);
                    }
                    if (json.superdev) {
                        superdev.push(json.name);
                    }
                } catch (e) {
                    console.log(err + e)
                    return;
                }
            }
            console.clear();
            console.log(`${results} [RESULT]:`)
            console.log(`${log} VIP : ${vip}`)
            console.log(`${log} Moderator : ${mod}`)
            console.log(`${log} Developer : ${dev}`)
            console.log(`${log} Super Developer : ${superdev}`)
            console.log(`\n${log} [1] Back to Main Menu`)
            console.log(`${log} [0] Exit`)
            var menu = ask(log + " > ");
            MenuTerakhir(menu);
        })
    } else if (type == 2) {
        title("[Scan Economy] | Date : " + dates)
        const itemid = ask(who + " itemid? > ")
        fs.readdir(playersdir, (err, files) => {
            var filter = files.filter(f => f.split(".").pop() === "json");
            var totalitem = [];
            for (i = 0; i < filter.length; i++) {
                try {
                    const fileData = fs.readFileSync(path.join(playersdir, filter[i]));
                    const json = JSON.parse(fileData.toString());
                    let total = 0;
                    for (_i = 0; _i < json.inv.length; _i++) {
                        if (json.inv[_i].i == itemid) {
                            total = json.inv[_i].c;
                        }
                    }
                    totalitem.push(json.name + " | Total : " + total + "\n")
                } catch (e) {
                    console.log(e)
                    return;
                }
            }
            console.clear();
            console.log(`${results} [RESULT]:`)
            console.log(`${results} Players : ${totalitem}`)
        })
        fs.readdir(worldsdir, (err, files) => {
            var filter = files.filter(f => f.split(".").pop() === "json");
            var totalitem = [];
            for (i = 0; i < filter.length; i++) {
                try {
                    const fileData = fs.readFileSync(path.join(worldsdir, filter[i]));
                    const json = JSON.parse(fileData.toString());
                    let total = 0;
                    for (_i = 0; _i < json.drop.length; _i++) {
                        if (json.drop[_i].i == itemid) {
                            if (json.drop[_i].c != 0) {
                                total = json.drop[_i].c;
                            }
                        }
                    }
                    var owner = "";
                    if (json.owner == "" || !json.owner || json.owner == null) {
                        owner = "No Owner"
                    } else {
                        owner = json.owner;
                    }
                    if (total != 0) {
                        totalitem.push(filter[i] + " | " + owner + " | Total : " + total + "\n")
                    }
                } catch (e) {
                    console.log(e)
                    return;
                }
            }
            console.log(`${results} Worlds : ${totalitem}`)
            console.log(`\n${log} [1] Back to Main Menu`)
            console.log(`${log} [0] Exit`)
            var menu = ask(log + " > ");
            MenuTerakhir(menu);
        });
    } else if (type == 3) {
        title("[Info Player] | Date : " + dates)
        var playername = ask(who + " Player GrowID > ");
        if (!fs.existsSync(playersdir + playername + "_.json")) {
            console.clear();
            console.log(err + " Player not found!")
            console.log(`\n${log} [1] Back to Main Menu`)
            console.log(`${log} [0] Exit`)
            var menu = ask(log + " > ");
            MenuTerakhir(menu);
            return;
        }
        const user = playersdir + playername + "_.json";
        const data = require(user);
        var ip = data.ip, rid = data.rid, mac = data.mac, wk = data.wk;
        var level = data.level, xp = data.xp, growid = data.name, modname = data.modname, password = data.pass;
        var growidc = "", growids = "";
        var drtit = data._drt, legendtt = data.legend;
        var drtits = "", legendtts = "";
        var vip = data.vip, mod = data.mod, dev = data.dev, superdev = data.superdev;
        var vips = "", mods = "", devs = "", superdevs = "";
        if (drtit == 1 || drtit == true) drtits = "This user have Doctor Title";
        if (legendtt == 1 || legendtt == true) legendtts = "This user have Legend Title";
        if (vip == 1) {
            growids = growid;
            vips = "This user have VIP Role";
        }
        if (mod == 1) {
            growids = "@" + growid;
            mods = "This user have Moderator Role";
        }
        if (dev == 1) {
            growids = "@" + growid;
            devs = "This user have Developer Role";
        }
        if (superdev == 1) {
            growids = "@" + growid;
            superdevs = "This user have Super-Developer Role";
        }
        if (drtit == 1 || drtit == true) growids = "Dr. " + growids;
        if (legendtt == 1 || legendtt == true) growids = growids + " of Legend";
        console.clear();
        console.log(`${results} [RESULT]:`)
        console.log(`${log} [INFORMATION]:\n${results} Grow ID : ${growids}\n${warn} Password : ${password}\n${results} XP/LEVEL : ${xp} (${level})\n`); //\n${results} Mod Name : ${modnames}\n
        console.log(`${log} [NETWORK]:\n${results} IP : ${ip}\n${results} RID : ${rid}\n${results} MAC : ${mac}\n${results} WK : ${wk}\n`)
        console.log(`${log} [TITLE]:\n${results} ${drtits}\n${results} ${legendtts}\n`)
        console.log(`${log} [ROLE]:\n${results} ${vips}\n${results} ${mods}\n${results} ${devs}\n${results} ${superdevs}`)
        console.log(`\n${log} [1] Back to Main Menu`)
        console.log(`${log} [0] Exit`)
        var menu = ask(log + " > ");
        MenuTerakhir(menu);
    } else if (type == 4) {
        title("[View Player Set] | Date : " + dates)
        var playername = ask(who + " Player GrowID > ");
        if (!fs.existsSync(playersdir + playername + "_.json")) {
            console.clear();
            console.log(err + " Player not found!")
            console.log(`\n${log} [1] Back to Main Menu`)
            console.log(`${log} [0] Exit`)
            var menu = ask(log + " > ");
            MenuTerakhir(menu);
            return;
        }
        if (!fs.existsSync("./items.json")) {
            console.clear();
            console.log(err + " items.json not found\n" + err + " decode your items.dat at here https://gucktubeyt.github.io/GrowTools/")
            console.log(`\n${log} [1] Back to Main Menu`)
            console.log(`${log} [0] Exit`)
            var menu = ask(log + " > ");
            MenuTerakhir(menu);
            return;
        }
        const user = playersdir + playername + "_.json";
        const data = require(user);

        var wing = data.back, hand = data.hand, hair = data.hair, pant = data.pants, feet = data.feet, face = data.face;
        var mask = data.mask, ances = data.ances, necklace = data.necklace;
        var wings = "", hands = "", hairs  = "", pants = "", feets = "", faces = "";
        var masks = "", ancess  = "", necklaces  = "";
        var wingc = "", handc = "", hairc  = "", pantc = "", feetc = "", facec = "";
        var maskc = "", ancesc = "", necklacec = "";

        const json = JSON.parse(fs.readFileSync("./items.json").toString());
        for (const itemfinder of json.items) {
            if (itemfinder.item_id == mask) {
                maskc = itemfinder.name
            }
            if (itemfinder.item_id == ances) {
                ancesc = itemfinder.name
            }
            if (itemfinder.item_id == necklace) {
                necklacec = itemfinder.name
            }
            if (itemfinder.item_id == wing) {
                wingc = itemfinder.name
            }
            if (itemfinder.item_id == hand) {
                handc = itemfinder.name
            }
            if (itemfinder.item_id == hair) {
                hairc = itemfinder.name
            }
            if (itemfinder.item_id == pant) {
                pantc = itemfinder.name
            }
            if (itemfinder.item_id == feet) {
                feetc = itemfinder.name
            }
            if (itemfinder.item_id == face) {
                facec = itemfinder.name
            }
        }

        if (maskc != "Blank") masks = results + " Mask : " + maskc + "\n";
        if (ancesc != "Blank") ancess = results + " Ancestral : " + ancesc + "\n";
        if (necklacec != "Blank") necklaces = results + " Necklace : " + necklacec + "\n";
        if (wingc != "Blank") wings = results + " Wing : " + wingc + "\n";
        if (handc != "Blank") hands = results + " Hand : " + handc + "\n";
        if (hairc != "Blank") hairs = results + " Hair : " + hairc + "\n";
        if (pantc != "Blank") pants = results + " Pant : " + pantc + "\n";
        if (feetc != "Blank") feets = results + " Feet : " + feetc + "\n";
        if (facec != "Blank") faces = results + " Face : " + facec + "\n";
        
        console.clear();
        console.log(`${results} [RESULT]:`)
        console.log(`${wings}${hands}${pants}${feets}${faces}${masks}${ancess}${necklaces}`)
        console.log(`\n${log} [1] Back to Main Menu`)
        console.log(`${log} [0] Exit`)
        var menu = ask(log + " > ");
        MenuTerakhir(menu);
    } else if (type == 0) {
        console.clear();
        console.log(log + " Bye Bye")
        process.exit();
    }
    else {
        console.clear();
        console.log(err + " System dont have that command")
        process.exit();
    }
}
