let lieList = [] //list of golf lies

function lieLocation(name, value) {
    this.name = name
    this.value = value
}

lieList.push(new lieLocation(null, '-'))
lieList.push(new lieLocation('Tee','t'))
lieList.push(new lieLocation('Fairway','f'))
lieList.push(new lieLocation('Rough','r'))
lieList.push(new lieLocation('Sand','s'))
lieList.push(new lieLocation('Green','g'))
// lieList.push(new lieLocation('Recovery','x'))
// lieList.push(new lieLocation('Penalty','p'))

//listener to add shots to the DOM
function addShot(holeNmb) {
let shotNmb = round.holes[holeNmb - 1].score
let doc = document.querySelector(`#accordion-body-hole${holeNmb}`)
let shotDiv = document.createElement('div')
    shotDiv.className = 'shotDiv d-flex bg-light'
    shotDiv.id = `h${holeNmb}S${shotNmb}`

// shot Banner -- displays shot number
const shotBanner = document.createElement('div')
    shotBanner.className = 'shotBanner'
let shotNmbEle = document.createElement('h4')
    shotNmbEle.innerHTML = shotNmb
    shotNmbEle.className = 'text-center'
let shotTxt = document.createElement('h6')
    shotTxt.innerHTML = 'Shot'
    shotTxt.className = 'text-center'

// shot yards -- displays input for yards
const yardDiv = document.createElement('div')
    yardDiv.className = 'yardDiv'
let yardLabel = document.createElement('label')
    yardLabel.for = `yardH${holeNmb}S${shotNmb}`
let yardInput = document.createElement('input')
    yardInput.className = 'yardInput text-center'
    yardInput.name = `yardH${holeNmb}S${shotNmb}`
    yardInput.id = yardInput.name
    yardInput.type = 'number'
    yardInput.max = 660
    yardInput.min = 0
let yardTxt = document.createElement('h6')
    yardTxt.innerHTML = 'Dist'
    yardTxt.className = 'text-center'
let sup = document.createElement('super')
    sup.innerHTML = '*'
    yardInput.addEventListener('keyup', (() => {
        updateDist(holeNmb, shotNmb, round.holes[holeNmb - 1])
    }))

// shot lie -- displays option for lie
const lieDiv = document.createElement('div')
    lieDiv.className = 'lieDiv'
let lieLabel = document.createElement('label')
    lieLabel.for = `lieH${holeNmb}S${shotNmb}`
let lieSelect = document.createElement('select')
    lieSelect.name = `lieH${holeNmb}S${shotNmb}`
    lieSelect.id = lieSelect.name
for (let i = 0; i < lieList.length; i++) {
    let lieOption = document.createElement('option')
        lieOption.value = lieList[i].value
        lieOption.innerHTML = lieList[i].name
    lieSelect.append(lieOption)
};
let lieTxt = document.createElement('h6')
    lieTxt.innerHTML = 'Location'
    lieTxt.className = 'text-center'
    lieSelect.addEventListener('change', (() => {
        updateLoc(holeNmb, shotNmb, round.holes[holeNmb - 1])
    }))

yardTxt.append(sup)
shotBanner.append(shotNmbEle, shotTxt)
yardDiv.append(yardLabel, yardInput, yardTxt)
lieDiv.append(lieLabel, lieSelect, lieTxt)
shotDiv.append(shotBanner,yardDiv, lieDiv)
doc.append(shotDiv)
}

// listeners for DOM
for (let i = 1; i <= round.holes.length; i++) {
    // add shot
    document.getElementById(`addShotBtn${i}`).addEventListener('click',(() => {
        round.holes[i - 1].shots.push(new Shot(round.holes[i - 1].shots.length + 1, ))
        updateAddShot(round.holes[i - 1])
        updateStats()
        updateDocStats()
        addShot(i)
    }));

    // remove shot 
    document.getElementById(`rmShotBtn${i}`).addEventListener('click', (() => {
        if (round.holes[i - 1].score !== 0) {
            round.holes[i - 1].shots.pop()
            document.querySelector(`#h${i}S${round.holes[i-1].score}`).remove()
            updateRmShot(round.holes[i - 1])
            updateStats()
            updateDocStats()
        }
    }));

    // change par
    document.getElementById(`parHole${i}`).addEventListener('change', (() => {
        updatePar(round.holes[i-1], i)
        updateStats()
        updateDocStats()
    }))

};

// make this work for the entire document
function updateDocStats() {
// Scoring
    document.getElementById('score-main').innerHTML = round.score
    document.getElementById('Score-panel').innerHTML = round.score
    document.getElementById('par-main').innerHTML = round.par
    document.getElementById('Par-panel').innerHTML = round.par
   if (round.score - round.par === 0) {
        document.getElementById('vspar-main').innerHTML = 'E'
        document.getElementById('vspar-main').style.color = 'green'
        document.getElementById('vsPar-panel').innerHTML = 'E'
        document.getElementById('vspar-main').style.color = 'green'
    } else if (round.score - round.par > 0) {
        document.getElementById('vspar-main').innerHTML = `+${round.score - round.par}`
        document.getElementById('vspar-main').style.color = 'black'
        document.getElementById('vsPar-panel').innerHTML = `+${round.score - round.par}`
        document.getElementById('vspar-main').style.color = 'black'
    } else if  (round.score - round.par < 0){
        document.getElementById('vspar-main').innerHTML = round.score - round.par
        document.getElementById('vspar-main').style.color = 'red'
        document.getElementById('vsPar-panel').innerHTML = round.score - round.par
        document.getElementById('vspar-main').style.color = 'red'
    }

// Hole Scores
    let eagle = 0
    let birdie = 0
    let par = 0
    let bogey = 0
    let dblBogey = 0
    for (let i = 0; i < 18; i++) {
        document.getElementById(`score${i + 1}`).innerHTML = round.holes[i].score
        if (round.holes[i].score !== 0 && round.holes[i].par !== 0) {
            let vsPar = (round.holes[i].score - round.holes[i].par)
            switch (true) {
                case (vsPar <= -2):
                    eagle += 1
                    break
                case (vsPar === -1):
                    birdie += 1
                    break
                    case (vsPar === 0):
                        par += 1
                        break
                    case (vsPar === 1):
                        bogey += 1
                        break
                    case (vsPar >= 2):
                        dblBogey += 1
                        break
            }
            document.getElementById('Eagle+-holes-panel').innerHTML = eagle
            document.getElementById('Birdie-holes-panel').innerHTML = birdie
            document.getElementById('Par-holes-panel').innerHTML = par
            document.getElementById('Bogey-holes-panel').innerHTML = bogey
            document.getElementById('DblBogey+-holes-panel').innerHTML = dblBogey
        }
    }
// performance stats
    document.getElementById('Fwy-panel').innerHTML = round.stats.fwy 
    document.getElementById('driveDist-panel').innerHTML = round.stats.driveDist
}