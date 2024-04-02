const fs = require("fs");
const path = require("path");
const title = require("console-title");
const ask = require("prompt-sync")();
const gradient = require("gradient-string");
const fetch = require('node-fetch'); //npm install node-fetch@^2.6.6
var config = require("./config.json") //C:\Data\BorzXy\Full\GT\EcoScanner\players
if (!fs.existsSync(config.playerdir)) return console.log("Error when Fetching to (" + config.playerdir + ")\n{Error Directory not found}");
if (!fs.existsSync(config.worlddir)) return console.log("Error when Fetching to (" + config.worlddir + ")\n{Error Directory not found}");
var playersdir = config.playerdir, worldsdir = config.worlddir;
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
if (hours > 12) type = "PM";
if (hours < 12) type = "AM";
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
var times = `${hours}:${minutes}:${seconds} ${type}`;
var dates = `[${montas}-${date}-${year}]`;

var log = `[${gradient('#f5d64c','#f5d64c')("•")}]`;
var err = `[${gradient('#ff0011','#ff0011')("x")}]`;

const MasukMenu = async () => {
    console.clear();
    var ip = await fetch(`https://api.ipify.org`).then(data => data.text());
    title("[MENU] | Date : " + dates)
    var banner = `${gradient('white','white')(`███████  ██████  █████  ███    ██ ███    ██ ███████ ██████  
██      ██      ██   ██ ████   ██ ████   ██ ██      ██   ██ 
███████ ██      ███████ ██ ██  ██ ██ ██  ██ █████   ██████  
     ██ ██      ██   ██ ██  ██ ██ ██  ██ ██ ██      ██   ██ 
███████  ██████ ██   ██ ██   ████ ██   ████ ███████ ██   ██`)}

${log} Author : ${gradient('#f5d64c','#f5d64c')("Daritoc & BorzXy")}
${log} Source : ${gradient('#f5d64c','#f5d64c')("Node.js (21.7.1) and Github")}
${log} IP : ${gradient('#f5d64c','#f5d64c')(ip)}
${log} Time : ${gradient('#f5d64c','#f5d64c')(times)}

${log} Player Directory : ${gradient('#f5d64c', '#f5d64c')("(" + playersdir + ")")}
${log} World Directory : ${gradient('#f5d64c', '#f5d64c')("(" + worldsdir + ")")}

${log} Note : ${gradient('#f5d64c', '#f5d64c')("If you have any suggestion and Report a Problem, Feel free to Dm me at Discord (borzxy)")}

${log} [1] ${gradient('#f5d64c', '#f5d64c')("Role Scanner (Note: Only scan vip, mod, dev, superdev)")}
${log} [2] ${gradient('#f5d64c', '#f5d64c')("Scan Economy (Note: Only Scan Dropped Item)")}
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
            console.log(`${log} [RESULT]:`)
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
        const itemid = ask("itemid? > ")
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
                            total = json.drop[_i].c;
                        }
                    }
                    var owner = "";
                    if (json.owner == "" || !json.owner || json.owner == null) {
                        owner = "No Owner"
                    } else {
                        owner = json.owner;
                    }
                    totalitem.push(filter[i] + " | " + owner + " | Total : " + total + "\n")
                } catch (e) {
                    console.log(e)
                    return;
                }
            }
            console.clear();
            console.log(`${log} [RESULT]:`)
            console.log(`${totalitem}`)
            console.log(`\n${log} [1] Back to Main Menu`)
            console.log(`${log} [0] Exit`)
            var menu = ask(log + " > ");
            MenuTerakhir(menu);
        });
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