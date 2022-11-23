let lieList = [] //list of golf lies

function lieLocation(name, value) {
    this.name = name
    this.value = value
}

lieList.push(new lieLocation('Tee','t'))
lieList.push(new lieLocation('Fairway','f'))
lieList.push(new lieLocation('Rough','r'))
lieList.push(new lieLocation('Sand','s'))
lieList.push(new lieLocation('Green','g'))
// lieList.push(new lieLocation('Recovery','x'))
// lieList.push(new lieLocation('Penalty','p'))

//listener to add shots to the DOM
function addShot(i) {
let doc = document.querySelector(`#accordion-body-hole${i}`)
let shotDiv = document.createElement('div')
    shotDiv.className = 'shotDiv d-flex bg-light'
    shotDiv.id = `h${i}S${round.holes[i-1].shots.length}`


// shot Banner -- displays shot number
const shotBanner = document.createElement('div')
    shotBanner.className = 'shotBanner'
let shotNum = document.createElement('h4')
    shotNum.textContent = round.holes[i - 1].shots.length
    shotNum.className = 'text-center'
let shotTxt = document.createElement('h6')
    shotTxt.textContent = 'Shot'
    shotTxt.className = 'text-center'

// shot yards -- displays input for yards
const yardDiv = document.createElement('div')
    yardDiv.className = 'yardDiv'
let yardLabel = document.createElement('label')
    yardLabel.for = `yardH${i}S${round.holes[i - 1].shots.length + 1}`
let yardInput = document.createElement('input')
    yardInput.className = 'yardInput text-center'
    yardInput.name = `yardH${i}S${round.holes[i - 1].shots.length + 1}`
    yardInput.id = yardInput.name
    yardInput.type = 'number'
let yardTxt = document.createElement('h6')
    yardTxt.textContent = 'Dist'
    yardTxt.className = 'text-center'

// shot lie -- displays option for lie
const lieDiv = document.createElement('div')
    lieDiv.className = 'lieDiv'
let lieLabel = document.createElement('label')
    lieLabel.for = `lieH${i}S${round.holes[i - 1].shots.length + 1}`
let lieSelect = document.createElement('select')
    lieSelect.name = `lieH${i}S${round.holes[i - 1].shots.length + 1}`
    lieSelect.id = lieSelect.name
for (let j = 0; j < lieList.length; j++) {
    let lieOption = document.createElement('option')
        lieOption.value = lieList[j].value
        lieOption.textContent = lieList[j].name
    lieSelect.append(lieOption)
};
let lieTxt = document.createElement('h6')
    lieTxt.textContent = 'Location'
    lieTxt.className = 'text-center'

shotBanner.append(shotNum, shotTxt)
yardDiv.append(yardLabel, yardInput, yardTxt)
lieDiv.append(lieLabel, lieSelect, lieTxt)
shotDiv.append(shotBanner,yardDiv, lieDiv)
doc.append(shotDiv)
}

// listeners for DOM
for (let i = 1; i <= 18; i++) {
    // add shot
    document.getElementById(`addShotBtn${i}`).addEventListener('click',(() => {
        round.holes[i - 1].shots.push(new Shot(round.holes[i - 1].shots.length + 1, ))
        updateAddShot(round.holes[i - 1])
        updateDocStats()
        addShot(i)
        console.log(round)
        console.log(round.holes[i - 1])
    }));

    // remove shot 
    document.getElementById(`rmShotBtn${i}`).addEventListener('click', (() => {
        if(round.holes[i - 1].score.length !== 0) {
            round.holes[i - 1].shots.pop()
            document.querySelector(`#h${i}S${round.holes[i-1].score}`).remove()
            updateRmShot(round.holes[i - 1])
            updateDocStats()
        }
        console.log(round)
        console.log(round.holes[i - 1])
    }));

    // change par
    document.getElementById(`parHole${i}`).addEventListener('change', (() => {
        updatePar(round.holes[i-1], i)
        updateDocStats()
        console.log(round)
        console.log(round.holes[i - 1])
    }))
};

// make this work for the entire document
function updateDocStats() {
    document.getElementById('score-main').innerHTML = round.score
    document.getElementById('Score-panel').innerHTML = round.score
    document.getElementById('par-main').innerHTML = round.par
    document.getElementById('Par-panel').innerHTML = round.par
   if (round.score - round.par === 0) {
        document.getElementById('vspar-main').innerHTML = 'E'
        document.getElementById('vspar-main').style.color = 'green'
        document.getElementById('Vspar-panel').innerHTML = 'E'
        document.getElementById('vspar-main').style.color = 'green'
    } else if (round.score - round.par > 0) {
        document.getElementById('vspar-main').innerHTML = `+${round.score - round.par}`
        document.getElementById('vspar-main').style.color = 'black'
        document.getElementById('Vspar-panel').innerHTML = `+${round.score - round.par}`
        document.getElementById('vspar-main').style.color = 'black'
    } else if  (round.score - round.par < 0){
        document.getElementById('vspar-main').innerHTML = round.score - round.par
        document.getElementById('vspar-main').style.color = 'red'
        document.getElementById('Vspar-panel').innerHTML = round.score - round.par
        document.getElementById('vspar-main').style.color = 'red'
    }

    for (let i = 1; i <= 18; i++) {
        document.getElementById(`score${i}`).innerHTML = round.holes[i - 1].score
    }
}