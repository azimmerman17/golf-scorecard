// use this to change the heading
const statHeader = 'Round Stats'
document.getElementById('offcanvasLabel').textContent = statHeader
document.getElementById('statHeading').textContent = statHeader

// array's for stats
let statDivArr = ['Scoring', 'Hole Scores', 'Performance', 'Strokes Gained']
let scoreDivArr = ['Score', 'Par', '(+/-)']
let parDivArr = ['Eagles+', 'Birdies', 'Par', 'Bogeys', '2x Bogeys+']
let perfDivArr = ['Fwy', 'GIR', 'Putts', 'Scrambling', 'Drive Dist', 'Prox to Hole']
let sgDivArr = ['Tee', 'Approach', 'Short Game', 'Putting']

function statBuild(array, parent) {
    for(let j = 0; j < array.length; j++) {
        const statElm = document.createElement('div');
            statElm.className = 'p-2'
        const statValue = document.createElement('h5');
            statValue.className = 'text-center'
            statValue.id = array[j] + '-panel'
            statValue.textContent = '#';  //will need to be a function to grab data
        const statName = document.createElement('p');
            statName.className = 'text-center'
            statName.textContent = array[j];
        statElm.append(statValue);
        statElm.append(statName);
        parent.append(statElm);
    }
}

const statsDoc = document.getElementById('statsPanel')

for (let i = 0; i < statDivArr.length; i++) {
    const elm = document.createElement('div');
        elm.className = 'd-flex justify-content-around flex-column';
    const heading = document.createElement('h4');
        heading.className = 'text-center fw-bold';
        heading.textContent = statDivArr[i];
    const statDiv = document.createElement('div');
        statDiv.className = 'd-flex flex-row justify-content-around flex-wrap'
    elm.append(heading);
    elm.append(statDiv)
    statsDoc.append(elm);
    switch (statDivArr[i]) {
        case 'Scoring':
            statBuild(scoreDivArr, statDiv)
            break;
        case 'Hole Scores':
            statBuild(parDivArr, statDiv)
            break;    
        case 'Performance':
            statBuild(perfDivArr, statDiv)
            break;
        case 'Strokes Gained':
            statBuild(sgDivArr, statDiv)
            break;
    }   
}