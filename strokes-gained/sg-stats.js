// need to add for entire hole
function strokesGained() {
    for (let i = 0; i < round.holes.length; i++) {
        const hole = round.holes[i]
        for (let j = 0; j <  round.holes[i].shots.length; j++) {
            const shot = round.holes[i].shots[j]
            if (shot.startDist !== null && shot.startLoc !== null) {
                shot.sg.startCode = shot.startDist + shot.startLoc
                shot.sg.endCode = shot.endDist + shot.endLoc        
            }
            for (let k = 0; k < stokesGainedData.length; k++) {
                if (stokesGainedData[k].sgCode === shot.sg.startCode) {
                    shot.sg.category = stokesGainedData[k].category
                        if (shot.sg.category === 'tee' && shot.par === 3) {
                            shot.sg.category === 'app'
                        }
                    switch (round.ability) {
                        case 'pgaTour':
                            shot.sg.startValue = stokesGainedData[k].pgaTour
                            break
                        case 'eighty':
                            shot.sg.startValue = stokesGainedData[k].eighty
                            break
                         case 'ninety':
                            shot.sg.startValue = stokesGainedData[k].ninety
                            break
                        case 'oneHundred':
                            shot.sg.startValue = stokesGainedData[k].oneHundred
                            break
                        default:
                            shot.sg.startValue = stokesGainedData[k].originalPGA
                            break
                    }
                }
                if (stokesGainedData[k].sgCode === shot.sg.endCode) {
                    switch (round.ability) {
                        case 'pgaTour':
                            shot.sg.endValue = stokesGainedData[k].pgaTour
                            break
                        case 'eighty':
                            shot.sg.endValue = stokesGainedData[k].eighty
                            break
                         case 'ninety':
                            shot.sg.endValue = stokesGainedData[k].ninety
                            break
                        case 'oneHundred':
                            shot.sg.endValue = stokesGainedData[k].oneHundred
                            break
                        default:
                            shot.sg.endValue = stokesGainedData[k].originalPGA
                            break
                    }

                } // end if
            } // k loop
            shot.sg.sgShotValue = shot.sg.startValue - shot.sg.endValue - 1.000
            // console.log(shot)
            
        } // j loop
        if (round.holes[i.score > 0]) {
            // console.log(round.holes[i])
        }
    } // i loop
    // console.log(round)
    updateStrokesGainedRound()
}

function updateStrokesGainedRound() {
    Object.keys(round.sg).forEach(key => {
        round.sg[key] = 0
    });
    for (let i = 0; i < round.holes.length; i++) {
        for (let j = 0; j <  round.holes[i].shots.length; j++) {
            const shot = round.holes[i].shots[j]
            // console.log(shot)
            switch (round.holes[i].shots[j].sg.category) {
                case 'tee':
                    round.sg.tee += round.holes[i].shots[j].sg.sgShotValue
                    break
                case 'app':
                    round.sg.approach += round.holes[i].shots[j].sg.sgShotValue
                    break
                case 'sg':
                    round.sg.shortGame += round.holes[i].shots[j].sg.sgShotValue
                    break
                case 'putt':
                    round.sg. putting += round.holes[i].shots[j].sg.sgShotValue
                    break
// sgCategory:  'tee', 'app', 'sg', 'putt'
            }

        }
    }
    Object.keys(round.sg).forEach(key => {
        round.sg[key] = Number(round.sg[key].toFixed(3))

        console.log(`${key}`, round.sg[key].toFixed(3))
    })
}

// const sgObj = {
//     tee: 0,
//     approach: 0,
//     shortGame: 0,
//     putting: 0,
//     total: 0


//  number * 1000 
//  parseInt(number)
    // number / 1000