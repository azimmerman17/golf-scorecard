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

//listener ADD function
function addShot(i) {
let doc = document.querySelector(`#accordion-body-hole${i}`)
let shotDiv = document.createElement('div')
    shotDiv.className = 'shotDiv d-flex bg-light'

// shot Banner -- displays shot number
const shotBanner = document.createElement('div')
    shotBanner.className = 'shotBanner'
let shotNum = document.createElement('h4')
    shotNum.textContent = `${1}`
    shotNum.className = 'text-center'
let shotTxt = document.createElement('h6')
    shotTxt.textContent = 'Shot'
    shotTxt.className = 'text-center'

// shot yards -- displays input for yards
const yardDiv = document.createElement('div')
    yardDiv.className = 'yardDiv'
let yardLabel = document.createElement('label')
    yardLabel.for = `yardH${i}S${i}`
let yardInput = document.createElement('input')
    yardInput.className = 'yardInput text-center'
    yardInput.name = `yardH${i}S${i}`
    yardInput.id = yardInput.name
    yardInput.type = 'number'
let yardTxt = document.createElement('h6')
    yardTxt.textContent = 'Yards'
    yardTxt.className = 'text-center'

// shot lie -- displays option for lie
const lieDiv = document.createElement('div')
    lieDiv.className = 'lieDiv'
let lieLabel = document.createElement('label')
    lieLabel.for = `lieH${i}S${i}`
let lieSelect = document.createElement('select')
    lieSelect.name = `lieH${1}S${1}`
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

for (let i = 1; i <= 18; i++) {
    document.getElementById(`addShotBtn${i}`).addEventListener('click', function () {
        addShot(i)
    }
     );
    // document.getElementById(`rmShotBtn${i}`).addEventListener('click',
        
    // );

};