// use this to change the heading
const statHeader = 'Round Stats'
document.getElementById('offcanvasLabel').textContent = statHeader
document.getElementById('statHeading').textContent = statHeader

// array's for stats
let statDivArr = ['Scoring', 'Hole Scores', 'Performance', 'Strokes Gained']
let scoreDivArr = ['Score', 'Par', '(+/-)', 'Expected Score', 'Strokes Gained']
let parDivArr = ['Eagle+', 'Birdie', 'Par', 'Bogey', 'DblBogey+']
let perfDivArr = ['Drive Dist', 'Fwy', 'Gir', 'Prox to Hole', 'Scrambling', 'Sand Save', 'Putts']
let sgDivArr = ['Total', 'Tee', 'Approach', 'Short Game', 'Putting']

function statBuild(array, parent) {
    for(let i = 0; i < array.length; i++) {
        const statElm = document.createElement('div');
            statElm.className = 'p-2 m-2 stat-panel'
        const statValue = document.createElement('h5');
            statValue.className = 'text-center'
            switch (array[i]) {
                case '(+/-)':
                    statValue.id = 'vsPar-panel'
                    break
                case 'Expected Score':
                    statValue.id = 'expected-panel'
                    break
                case 'Strokes Gained':
                    statValue.id = 'vsexpected-panel'
                    break
                case 'Drive Dist':
                    statValue.id = 'driveDist-panel'
                    break                
                case 'Prox to Hole':
                    statValue.id = 'proxToHole-panel'
                    break
                case 'Short Game':
                    statValue.id = 'shortGame-panel'
                    break
                case 'Sand Save':
                    statValue.id = 'sandSave-panel'
                    break
                default:
                    statValue.id = array[i] + '-panel'
            }
            if (array === parDivArr) {
                statValue.id = array[i] + '-holes-panel'
            }
            statValue.textContent = '0';  //will need to be a function to grab data
        const statName = document.createElement('p');
            statName.className = 'text-center'
            statName.textContent = array[i];
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
        statDiv.className = 'd-flex flex-row flex-wrap justify-content-around'
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