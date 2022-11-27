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
    this.length = null,  // user input !!Shot 1 dist
    this.shots =[] // add shots to arrey
    this.fwy = 0
    this.gir = 0
    this.putts = 0
    this.scrambling = 0
    this.driveDist = 0
    this.proxToHle = 0
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
    fwy: 0,
    gir: 0,
    putts: 0,
    scrambling: 0,
    driveDist: 0,
    proxToHle: 0,
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
    round.stats.fwy = 0
    round.stats.driveDist = 0
    const countDrive = driveCount()
    for (let i = 0; i < round.holes.length; i++ ) {
        if (round.holes[i].shots.length > 0) {
            round.holes[i].length = round.holes[i].shots[0].stats.startDist  // hole length - works 
            if (round.holes[i].par > 3) {
            round.holes[i].driveDist = round.holes[i].length - round.holes[i].shots[0].stats.endDist
                switch (round.holes[i].shots[0].stats.endLoc) {   // fwy - hole
                    case 'f': 
                        round.holes[i].fwy = 1
                        round.stats.fwy +=1
                        break
                    case 'g': 
                        round.holes[i].fwy = 1
                        round.stats.fwy +=1
                        round.holes[i].driveDist = round.holes[i].length - parseInt(round.holes[i].shots[0].stats.endDist / 3)
                        break
                    case 'h': 
                        round.holes[i].fwy = 1
                        round.stats.fwy +=1
                        break
                    default: 
                        round.holes[i].fwy = 0
                        break
                }
            round.stats.driveDist += round.holes[i].driveDist  // drive dist - hole  
                
            } else {
                round.holes[i].fwy = 0
                round.holes[i].driveDist = 0
            }
        }
    }
    round.stats.fwy = `${parseInt(round.stats.fwy / countDrive * 100)}%` // round fwy %
    round.stats.driveDist = parseInt(round.stats.driveDist / countDrive) // round drive distance -- works?
}

function driveCount() {
    let count = 0
    for (let i = 0; i <round.holes.length; i++ ) {
         if (round.holes[i].par > 3) {
        count += 1
        }
    }
    return count
}


//xx this.length = null, 
// const roundStatsObj = {
// XX    fwy: 0,   %
//     gir: 0,  %
//     putts: 0,
//     scrambling: NaN,  
//     driveDist: 0,
//     proxToHle: NaN,
// }

// const holeStatsObj = {
// XX    fwy: null,  
//     gir: 0,   
//     putts: 0,
//     scrambling: null,  %
//  XX   driveDist: null,
//     proxToHle: NaN,

//xx shotDist: null,
// }