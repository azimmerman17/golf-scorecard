// need to add for entire hole
function strokesGained() {
    let abilityMod = 0
    let puttingMod = 0
    
    if (round.ability !== 'pgaTour') {
        // see notes on lines  1, 2, and 3 at strokes-gained/sg-dataset.js
        abilityMod = Number(((Number(round.ability) - 80) * 0.0556).toFixed(3))
        puttingMod = Number(((Number(round.ability) - 80) * 0.0100).toFixed(3))
        console.log('!== "pgaTour')
    }
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
                        if (shot.sg.category === 'recovery') {
                            shot.sg.category  = hole.shots[j-1].sg.category
                        }
                    switch (round.ability) {
                        case 'pgaTour':
                            shot.sg.startValue = stokesGainedData[k].pgaTour
                            break
                        default:
                            shot.sg.startValue = stokesGainedData[k].amatuer + abilityMod
                            if( shot.sg.startLoc === 'g') {
                                shot.sg.startValue = stokesGainedData[k].amatuer + puttingMod
                            }
                            break
                    }
                }
                if (stokesGainedData[k].sgCode === shot.sg.endCode) {
                    switch (round.ability) {
                        case 'pgaTour':
                            shot.sg.endValue = stokesGainedData[k].pgaTour
                            break
                        default:
                            if(shot.sg.endDist === 0) {
                                shot.sg.endValue = stokesGainedData[k].amatuer   
                            }
                            else if(shot.sg.endLoc === 'g') {
                                shot.sg.endValue = stokesGainedData[k].amatuer + puttingMod
                            } else {
                            shot.sg.endValue = stokesGainedData[k].amatuer + abilityMod
                            }
                            break
                    }
                } 
            } 
            shot.sg.sgShotValue = shot.sg.startValue - shot.sg.endValue - 1.000
        } 
    } 
    updateStrokesGained()
}

function updateStrokesGained() {
    Object.keys(round.sg).forEach(key => {
        round.sg[key] = 0
    });
    for (let i = 0; i < round.holes.length; i++) {
        const hole = round.holes[i]
        for (let j = 0; j <  round.holes[i].shots.length; j++) {
            const shot = round.holes[i].shots[j]
            // console.log(shot)
            switch (round.holes[i].shots[j].sg.category) {
                case 'tee':
                    round.sg.tee += round.holes[i].shots[j].sg.sgShotValue
                    round.sg.total += round.holes[i].shots[j].sg.sgShotValue
                    break
                case 'app':
                    round.sg.approach += round.holes[i].shots[j].sg.sgShotValue
                    round.sg.total += round.holes[i].shots[j].sg.sgShotValue

                    break
                case 'sg':
                    round.sg.shortGame += round.holes[i].shots[j].sg.sgShotValue
                    round.sg.total += round.holes[i].shots[j].sg.sgShotValue

                    break
                case 'putt':
                    round.sg. putting += round.holes[i].shots[j].sg.sgShotValue
                    round.sg.total += round.holes[i].shots[j].sg.sgShotValue
                    break
            }
        }
        if (hole.score > 0) {
            hole.expScore = hole.shots[0].sg.startValue
            round.sg.expScore += hole.expScore
        }
    }

    Object.keys(round.sg).forEach(key => {
        round.sg[key] = Number(round.sg[key].toFixed(4))
    })
    updateDocStats()
}