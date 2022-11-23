function Round(holesArr,roundStatsObj) {
    this.score = 0,
    this.par = 0,
    this.holes = holesArr,  // add holes to arrey 
    this.stats = {} // stats object
    this.sg = {} // strokes Gained Object
}

function Hole(holeNum,stats) {
    this.holeNme = `Hole ${holeNum}`
    this.holeNum = holeNum
    this.score = 0,  // shots.length
    this.par = 0,  // user input
    this.length = null,  // user input !!Shot 1 dist
    this.shots =[] // add shots to arrey
    this.stats = stats // stats object
    this.sg = {} //strokes gained object
}

function Shot(shotNum) {
    this.shotNme =`Shot ${shotNum}`
    this.shotNum = shotNum
    this.info = {}  // information on shot later use
    this.stats = {
        statDist: null,  // user input
        startLoc: null,   // user input
        endDist: 0,   // user input
        endLoc: 'h',  // user input
    } 
    this.sg = {} // strokes gained object
}

const roundStatsObj = {
    fwy: 0,
    gir: 0,
    putts: 0,
    scrambling: NaN,
    driveDist: 0,
    proxToHle: NaN,
}

const holeStatsObj = {
    fwy: 0,
    countFwy: 0,
    gir: 0,
    putts: 0,
    scrambling: NaN,
    driveDist: 0,
    driveCount: 0,
    proxToHle: NaN,
}

const shotStatsObj = {
    statDist: null,  // user input
    startLoc: null,   // user input
    endDist: 0,   // user input
    endLoc: 0,   // user input
}

const holesArr = []
for (let i = 1; i <= 18; i++) {
    let hole = new Hole(i, holeStatsObj)
    holesArr.push(hole)
}

let round = new Round(holesArr, roundStatsObj)

