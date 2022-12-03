# **Golf Scorecard and Stats app**
Currently Under Devolopment

Final Product will allow golfers to input shot data and track stats and strokes gained as they play.

## **Scorecard**

### Buttons

| **Button** | **Function** |
| --- | --- |
| Save | Saves round to local storage (Not Operational) |
| Reset | Removes all shots and stats from DOM and starts new round ((Not Operational) |
| Add Shot | Adds a new Shot to that hole |
| Remove Shot | Removes final shot from that hole |

### User Input

| **Input** | **Useage** |
| --- | --- |
| Par | Set par for the hole played
| Dist* | Set the distance of the shot from where it was hit from.  Unit is yards, with expection for putts (feet) |
| Loc | Set the location of the shot from where it was hit from. |

### Shots

| Location | Discription | Max Distance |
| --- | --- | --- |
| Tee | Only shots hit from the tee box or teeing area. | 660 yds |
| Fairway | Shots hit from the fairway length cut. | 600 yds |
| Rough | Shots hit from the grass, with a cut longer than the fairway. | 600 yds
| Sand | Shots hit from a sandy area. i.e. Waste Area or Bunker | 600 yds |
| Green | Shots hit on putting green, these will only count as putts | 119 ft |

## **Stats**

### Scoreing Stats

| Stat | Definition |
| --- | --- |
| Strokes | Number of strokes hit for either the round or hole also called, Score |
| Par | Number of expected strokes hit for hole or round |
| (+/-) | Score in relation to par |

### Hole Scores

| Score | Definition |
| --- | --- |
| Eagle+ | Hole with score of 2 under par or better |
| Birdie | Hole with score of 1 under par |
| Par | Hole with score equal to par |
| Bogey | Hole with score of 1 over par |
| Dbl Bogey+ | Hole with score of 2 over par or worse | 

### Performance Stats

| Stat | Definition |
| --- | --- |
| Drive Distance |The average number of yards per  drive. Drives are measured to the distance at which they come to rest regardless of whether they are in the fairway or not.   Note: Stat is not 100% accurate.  Cutting corners will inflate the stats and Shots offline cound deflate the stat.|
| Fairways (Fwy) | The percentage of time a tee shot comes to rest in the fairway (regardless of club). Shown as a percentage, excludes Par 3's|
| Greens in Regulation (GIR)| The percent of time a player was able to hit the green in regulation. Note: A green is considered hit in regulation if any portion of the ball is touching the putting surface after the GIR stroke has been taken. (The GIR stroke is determined by subtracting 2 from par (1st stroke on a par 3, 2nd on a par 4, 3rd on a par 5))  |
| Proximity to Hole | The average distance the ball comes to rest from the hole (in feet) after the player's approach shot. The approach shot distance must be outside of 40 yards from the hole, and not on the green. The shot also must end on within 40 yards from the hole, on the green, or in the hole.
| Scrambling | The percent of time a player misses the green in regulation, but still makes par or better. |
| Sand Save | The percent of time a player was able to get 'up and down' once in a greenside sand bunker (regardless of score). Note: 'Up and down' indicates it took the player 2 shots or less to put the ball in the hole from that point. Greenside Sand Bunker is defined by a bunker within 30 yards from the hole |
| Putts | Number of shots hit from on the green (regardless of club) |

 * Stat definitions are modified from defitions used by the [PGATOUR](https://www.pgatour.com/stats.html)

### Strokes Gained Stats

For details on strokes gained [read this from the PGA TOUR](https://www.pgatour.com/news/2016/05/31/strokes-gained-defined.html)

| Catagory | Definition |
| --- | --- |
| Tee | The number of strokes a player takes from a specific distance off the tee on Par 4 & par 5's is measured against a statistical baseline to determine the player's strokes gained or lost off the tee on a hole.  The total is the sum of all shots in this catagory.
| Approach | The number of Approach the Green strokes a player takes from specific locations and distances are measured against a statistical baseline to determine the player's strokes gained or lost on a hole. The total is the sum of all shots in this catagory. Note: Approach to green is defined by shots outside 50 yards from the hole, and Tee Shot for only Par 3's
| Short Game | The number of Around the Green strokes a player takes from specific locations and distances are measured against a statistical baseline to determine the player's strokes gained or lost on a hole. The total is the sum of all shots in this catagory. Note: Approach to green is defined by shots insidr 50 yards from the hole, and not on the green.
| Putting | The number of putts a player takes from a specific distance is measured against a statistical baseline to determine the player's strokes gained or lost on a hole.The total is the sum of all shots in this catagory. |

 * Strokes Gained definitions are modified from defitions used by the [PGATOUR](https://www.pgatour.com/stats.html)

## **Continued Development**

- Features Under Devolopment
    - Usage of Save and Reset Buttons
    - Addition of Strokes Gained stats
    - Addition of more stats (TBD)

- Future Features
    - Add hole button to show only holes played
    - Allow for strokes gained data feedback
    -  Store data to track over time
    - Add handicapping data
    - Add club data input
    