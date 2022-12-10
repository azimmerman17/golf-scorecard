function Round(holesArr, stats, sgObj) {
    this.ability = 'pgaTour'
    this.score = 0,
    this.par = 0,
    this.holes = holesArr,  // add holes to arrey 
    this.stats = stats // stats object
    this.sg = sgObj
    
}

function Hole(holeNum) {
    this.holeNme = `Hole ${holeNum}`
    this.holeNum = holeNum
    this.score = 0,  // shots.length
    this.par = 0,  // user input
    this.lngth = null,  // user input !!Shot 1 dist
    this.expScore = 0
    this.shots =[] // add shots to arrey
    // strokes gained
    this.sgTee = 0
    this.sgAppoach = 0
    this.sgShortGame = 0
    this.sgPutting = 0
    this.sgTotal = 0
}

function Shot(shotNum) {
    this.shotNme =`Shot ${shotNum}`
    this.shotNum = shotNum
    this.startDist= 0, // user input
    this.startLoc= null,   // user input
    this. endDist= 0  // user input
    this.endLoc= 'h'  // user input
        // shotDist: null,
    this.sg = {
        startCode: null,
        startValue: null,
        endCode: null,
        endValue: null,
        sgShotValue: null,
        category: null
    }
}

const roundStatsObj = {
    fwy: 0,
    gir: 0,
    missGir: 0,
    putts: 0,
    scrambling: 0,
    driveDist: 0,
    proxToHle: 0,
    sandSave: 0,
}

const sgObj = {
    tee: 0,
    approach: 0,
    shortGame: 0,
    putting: 0,
    total: 0,
    expScore: 0,
}

const holesArr = []
for (let i = 1; i <= 18; i++) {
    let hole = new Hole(i)
    holesArr.push(hole)
}

let round = new Round(holesArr, roundStatsObj, sgObj)

//updates to stats via DOM
function updateAddShot(hole) {
    hole.score = hole.shots.length
    if (hole.score === 1) {
        hole.shots[0].startLoc = 't'
    }
    let roundScore = 0
    for (let i = 1; i <= round.holes.length; i++) {
        roundScore +=  round.holes[i-1].score
    }
    round.score = roundScore
    updateStats()
}

function updateRmShot(hole) {
    hole.score = hole.shots.length
    let roundScore = 0
    for (let i = 1; i <= round.holes.length; i++) {
        roundScore +=  round.holes[i-1].score
    }
    round.score = roundScore
    hole.shots[hole.shots.length - 1].endLoc = 'h'
    hole.shots[hole.shots.length - 1].endDist = 0
    updateStats()

}

function updatePar(hole, num) {
    hole.par = parseInt(document.getElementById(`parHole${num}`).value)
    round.par = 0
    for (let i = 1; i <= round.holes.length; i++) {
        round.par +=  round.holes[i-1].par
    }
    updateStats()
}

function updateDist(holeNmb, shotNmb, hole) {
    hole.shots[shotNmb - 1].startDist = parseInt(document.getElementById(`yardH${holeNmb}S${shotNmb}`).value)
    if (hole.shots[shotNmb - 1].startDist > 660) {
        hole.shots[shotNmb - 1].startDist = 660   
    }
    if(shotNmb > 1) {
        hole.shots[shotNmb - 2].endDist = hole.shots[shotNmb - 1].startDist
    }
    updateStats()
}

function updateLoc(holeNmb, shotNmb, hole) {
    hole.shots[shotNmb - 1].startLoc = document.getElementById(`lieH${holeNmb}S${shotNmb}`).value 
    if(shotNmb > 1) {
        hole.shots[shotNmb - 2].endLoc = hole.shots[shotNmb - 1].startLoc
    }
    updateStats()
}

function updateStats() {
    Object.keys(round.stats).forEach(key => {
        round.stats[key] = 0
    });
    const countDrive = driveCount()
    const countSand = sandCount()
    let countHoles = 0
    for (let i = 0; i < round.holes.length; i++ ) {
        if (round.holes[i].score > 0) {
            countHoles += 1
            round.holes[i].lngth = round.holes[i].shots[0].startDist  // hole length - works 
            updateFwy(i)
            updateDriveDist(i)
            updatePutts(i)
            updateGir(i)
            updateScrambling(i)
            updateSand(i)
            updateProx(i)
            strokesGained()
        }
    }
    round.stats.fwy = `${parseInt(round.stats.fwy / countDrive * 100)}%` // round fwy %
    round.stats.driveDist = parseInt(round.stats.driveDist / countDrive) // round drive distance -- works?
    round.stats.gir = `${parseInt(round.stats.gir / countHoles * 100)}%`
    round.stats.scrambling = `${parseInt(round.stats.scrambling / round.stats.missGir * 100)}%`
    round.stats.sandSave = `${parseInt(round.stats.sandSave / countSand * 100)}%`
    round.stats.proxToHle = `${parseInt(round.stats.proxToHle / countHoles)}' ${round.stats.proxToHle % countHoles}"` 
}

function driveCount() {
    let count = 0
    for (let i = 0; i < round.holes.length; i++ ) {
        if (round.holes[i].par > 3) {
            for (let j = 0; j < round.holes[i].score; j++) {
                if (round.holes[i].shots[j].startLoc === 't') [
                    count += 1
                ]
            }
        }
    }
    return count
}

function sandCount() {
    let count = 0
    for (let i = 0; i < round.holes.length; i++ ) {
        for (let j = 0; j < round.holes[i].score; j++) {
            if (round.holes[i].shots[j].startDist <= 40 && round.holes[i].shots[j].startLoc === 's') {
                count += 1
            }
        }
    }
    return count
}

function updateFwy(i) {
    if (round.holes[i].par > 3) {
        switch (round.holes[i].shots[0].endLoc) { 
            case 'f': 
                round.stats.fwy +=1
                break
            case 'g': 
                round.stats.fwy +=1
                break
            case 'h': 
                round.stats.fwy +=1
                break
        }
    }
}

function updateDriveDist(i) {
    if (round.holes[i].par > 3) {
        for (let j = 0; j < round.holes[i].score; j++) {
            if (round.holes[i].shots[j].startLoc === 't') {
                switch (round.holes[i].shots[j].endLoc === 'g') {
                    case 'g':
                        round.stats.driveDist += round.holes[i].shots[j].startDist - parseInt(round.holes[i].shots[j].endDist / 3)
                        break
                    default:
                        round.stats.driveDist += round.holes[i].shots[j].startDist - round.holes[i].shots[j].endDist
                        break
                }
            }
        }
    }
}

function updatePutts(i) {
    for (let j = 0; j < round.holes[i].shots.length; j++) {
        if (round.holes[i].shots[j].startLoc === 'g') {
            round.stats.putts += 1
        }
    }
}

function updateGir(i) {
    round.holes[i].missGir = 1
    round.holes[i].gir = 0
    for (let j = 0; j < round.holes[i].shots.length; j++) {
        if (j < round.holes[i].par - 2) {
            switch(round.holes[i].shots[j].endLoc) {
                case 'g':
                    round.holes[i].missGir = 0
                    round.holes[i].gir = 1  
                    break 
                case 'h':
                    round.holes[i].missGir = 0
                    round.holes[i].gir = 1   
                    break
            }
        }
    }
    round.stats.gir += round.holes[i].gir
    round.stats.missGir += round.holes[i].missGir
}

function updateScrambling(i) {
    if (round.holes[i].missGir === 1 && round.holes[i].score <= round.holes[i].par) {
            round.stats.scrambling +=1
    }
}

function updateSand(i) {
    for (let j = 0; j < round.holes[i].score; j++) {
        if (round.holes[i].shots[j].startDist <= 40 && round.holes[i].shots[j].startLoc === 's') {
            if (round.holes[i].score <= j + 2) {
                round.stats.sandSave += 1
            }
        }
    }
    
}

function updateProx(i) {
    for (let j = 0; j < round.holes[i].score; j++) {
        if (round.holes[i].shots[j].startDist >= 40 && round.holes[i].shots[j].endDist <= 40 && round.holes[i].shots[j].startLoc !== 'g') {
            switch (round.holes[i].shots[j].endLoc) {
                case 'g':
                    round.stats.proxToHle += round.holes[i].shots[j].endDist
                    break
                default:
                    round.stats.proxToHle += round.holes[i].shots[j].endDist * 3
                    break
            }
        }
    }
}
