function Round(holesArr, stats) {
    this.score = 0,
    this.par = 0,
    this.holes = holesArr,  // add holes to arrey 
    this.stats = stats // stats object
    this.sg = {} // strokes Gained Object
}

function Hole(holeNum, stats) {
    this.holeNme = `Hole ${holeNum}`
    this.holeNum = holeNum
    this.score = 0,  // shots.length
    this.par = 0,  // user input
    this.lngth = null,  // user input !!Shot 1 dist
    this.shots =[] // add shots to arrey
    // stats
    this.fwy = 0
    this.gir = 0
    this.missGir = 0
    this.putts = 0
    this.scrambling = 0
    this.driveDist = 0
    this.proxToHle = 0
    this.sandSave = 0
    // strokes gained
    this.sg = {} //strokes gained object
}

function Shot(shotNum) {
    this.shotNme =`Shot ${shotNum}`
    this.shotNum = shotNum
    this.stats = {  // information on shot later use
        startDist: null,  // user input
        startLoc: null,   // user input
        endDist: 0,   // user input
        endLoc: 'h',  // user input
        // shotDist: null,
    } 
    this.sg = {} // strokes gained object
}

const roundStatsObj = {
    fwy: 1,
    gir: 1,
    missGir: 1,
    putts: 1,
    scrambling: 1,
    driveDist: 1,
    proxToHle: 1,
    sandSave: 1,
}

const holesArr = []
for (let i = 1; i <= 18; i++) {
    let hole = new Hole(i)
    holesArr.push(hole)
}

let round = new Round(holesArr, roundStatsObj)

//updates to stats via DOM
function updateAddShot(hole) {
    hole.score = hole.shots.length
    if (hole.score === 1) {
        hole.shots[0].stats.startLoc = 't'
    }
    let roundScore = 0
    for (let i = 1; i <= round.holes.length; i++) {
        roundScore +=  round.holes[i-1].score
    }
    round.score = roundScore

}

function updateRmShot(hole) {
    hole.score = hole.shots.length
    let roundScore = 0
    for (let i = 1; i <= round.holes.length; i++) {
        roundScore +=  round.holes[i-1].score
    }
    round.score = roundScore
}

function updatePar(hole, num) {
    hole.par = parseInt(document.getElementById(`parHole${num}`).value)
    let roundPar = 0
    for (let i = 1; i <= round.holes.length; i++) {
        roundPar +=  round.holes[i-1].par
    }
    round.par = roundPar
}

function updateDist(holeNmb, shotNmb, hole) {
    hole.shots[shotNmb - 1].stats.startDist = parseInt(document.getElementById(`yardH${holeNmb}S${shotNmb}`).value)
    if (hole.shots[shotNmb - 1].stats.startDist > 660) {
        hole.shots[shotNmb - 1].stats.startDist = 660   
    }
    if(shotNmb > 1) {
        hole.shots[shotNmb - 2].stats.endDist = hole.shots[shotNmb - 1].stats.startDist
    }
    updateStats()
    updateDocStats()
}

function updateLoc(holeNmb, shotNmb, hole) {
    hole.shots[shotNmb - 1].stats.startLoc = document.getElementById(`lieH${holeNmb}S${shotNmb}`).value 
    if(shotNmb > 1) {
        hole.shots[shotNmb - 2].stats.endLoc = hole.shots[shotNmb - 1].stats.startLoc
    }
    updateStats()
    updateDocStats()
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
            round.holes[i].lngth = round.holes[i].shots[0].stats.startDist  // hole length - works 
            updateFwy(i)
            updateDriveDist(i)
            updatePutts(i)
            updateGir(i)
            updateScrambling(i)
            updateSand(i)
            updateProx(i)
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
        count += 1
        }
    }
    return count
}

function sandCount() {
    let count = 0
    for (let i = 0; i < round.holes.length; i++ ) {
        for (let j = 0; j < round.holes[i].score; j++) {
            if (round.holes[i].shots[j].stats.startDist <= 40 && round.holes[i].shots[j].stats.startLoc === 's') {
                count += 1
            }
        }
    }

    return count
}

function updateFwy(i) {
    if (round.holes[i].par > 3) {
        switch (round.holes[i].shots[0].stats.endLoc) {   // fwy - hole
            case 'f': 
                round.holes[i].fwy = 1
                round.stats.fwy +=1
                break
            case 'g': 
                round.holes[i].fwy = 1
                round.stats.fwy +=1
                break
            case 'h': 
                round.holes[i].fwy = 1
                round.stats.fwy +=1
                break
            default: 
                round.holes[i].fwy = 0
                break
        }
    } else {
        round.holes[i].fwy = 0
    }
}

function updateDriveDist(i) {
    if (round.holes[i].par > 3) {
        round.holes[i].driveDist = round.holes[i].lngth - round.holes[i].shots[0].stats.endDist
        if (round.holes[i].shots[0].stats.endLoc === 'g') {
            round.holes[i].driveDist = round.holes[i].lngth - parseInt(round.holes[i].shots[0].stats.endDist / 3)
        }
    } else {
        round.holes[i].driveDist = 0
    }
    round.stats.driveDist += round.holes[i].driveDist 
}

function updatePutts(i) {
    round.holes[i].putts = 0
    for (let j = 0; j < round.holes[i].shots.length; j++) {
        if (round.holes[i].shots[j].stats.startLoc === 'g') {
            round.stats.putts += 1
            round.holes[i].putts += 1
        }
    }
}

function updateGir(i) {
    round.holes[i].missGir = 1
    round.holes[i].gir = 0
    for (let j = 0; j < round.holes[i].shots.length; j++) {
        if (j < round.holes[i].par - 2) {
            switch(round.holes[i].shots[j].stats.endLoc) {
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
            round.holes[i].scrambling = 1
            round.stats.scrambling +=1
    }
}

function updateSand(i) {
    for (let j = 0; j < round.holes[i].score; j++) {
        if (round.holes[i].shots[j].stats.startDist <= 40 && round.holes[i].shots[j].stats.startLoc === 's') {
            if (round.holes[i].score <= j + 2) {
                round.holes[i].sandSave +=1
                round.stats.sandSave += 1

            }
        }
    }
    
}

function updateProx(i) {
    for (let j = 0; j < round.holes[i].score; j++) {
        if (round.holes[i].shots[j].stats.startDist >= 40 && round.holes[i].shots[j].stats.endDist <= 40 && round.holes[i].shots[j].stats.startLoc !== 'g') {
            switch (round.holes[i].shots[j].stats.endLoc) {
                case 'g':
                    round.holes[i].proxToHle = round.holes[i].shots[j].stats.endDist
                    round.stats.proxToHle += round.holes[i].proxToHle
                    break
                default:
                    round.holes[i].proxToHle = round.holes[i].shots[j].stats.endDist * 3
                    round.stats.proxToHle += round.holes[i].proxToHle
                    break
            }
        }
    }
}
