import React, {useEffect, useState} from "react";
import ProgressBar from 'react-bootstrap/ProgressBar'
import Move from "./model/move";
import Badge from "./components/badge";
import CardBody from "./components/card-body";
import CardHeader from "./components/card-header";
import Card from "./components/card";
import Container from "./components/container";
import Statistics from "./components/statistics";


export default function Game() {
    let initialGameState = {
        level: 2,
        secret: createSecret(2),
        tries: 0,
        guess: 50,
        moves: [],
        maxTries: createMaxTries(2),
        counter: getTimeOut(2)
    }

    let initialStatistics = {
        wins: 0, loses: 0, total: 0
    }

    let [game, setGame] = useState(initialGameState);
    let [statistics, setStatistics] = useState(initialStatistics);

    //region action/life-cycle functions
    useEffect(() => {
        let timerId = setInterval(countDown, 100);
        return () => {
            clearInterval(timerId);
        }
    });

    function handleChange(event) {
        let newGame = {...game}
        newGame.guess = Number(event.target.value);
        setGame(newGame);
    }

    //endregion

    //region functions  game-logic
    function countDown() {
        let newGame = {...game}
        let newStatistics = {...statistics}
        newGame.counter--;
        if (newGame.counter <= 0) {
            let message = "Game Over!";
            initialGameState.guess = "Time is out!";
            initGame(newGame);
            newGame.moves.push(new Move(initialGameState.guess, message));
            newStatistics.loses++;
            newStatistics.total++;
            setStatistics(newStatistics);
        }
        setGame(newGame);
    }

    function initGame(game) {
        game.counter = getTimeOut(game.level);
        game.secret = createSecret(game.level);
        game.maxTries = createMaxTries(game.level);
        game.tries = 0;
        game.moves = [];
    }

    function play() {
        let newGame = {...game};
        let newStatistics = {...statistics};
        if (newGame.secret === newGame.guess) {
            newGame.level++;
            newStatistics.wins++;
            newStatistics.total++;
            initGame(newGame);
            setGame(newGame);
            setStatistics(newStatistics);
        } else {
            newGame.tries++;
            if (newGame.tries > newGame.maxTries) {
                newStatistics.loses++;
                newStatistics.total++;
                setStatistics(newStatistics);
                initGame(newGame);
            } else {
                let message = "Pick  smaller! ";
                if (newGame.guess < newGame.secret) {
                    message = "Pick  larger! ";
                }
                newGame.moves.push(new Move(newGame.guess, message));
            }
            setGame(newGame);
        }
    }

    //endregion

    //region  utility functions
    function createMaxTries(level) {
        return Math.ceil(Math.log2(Math.pow(10, level)));
    }

    function createSecret(level) {
        let max = Math.pow(10, level);
        return Math.floor(Math.random() * max) + 1;
    }

    function getTimeOut(level) {
        return 30 * level;
    }

    //endregion

    let triesBadge = "";
    if (game.tries > 0) {
        triesBadge = <Badge className="alert-primary"
                            id="tries"
                            label="Tries"
                            value={game.tries}></Badge>;
    }
    let movesCard = "";
    if (game.moves.length > 0) {
        movesCard =
            <Card>
                <CardHeader title="History"/>
                <CardBody>
                    <table className="table table-bordered table-hover table-striped table-responsive">
                        <thead>
                        <tr>
                            <th>Guess</th>
                            <th>Message</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            game.moves.map((move, index) =>
                                <tr key={move.guess + index.toString()}>
                                    <td>{move.guess}</td>
                                    <td>{move.message}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </CardBody>
            </Card>
    }
    return (
        <Container>
            <Card>
                <CardHeader title="Number Guessing Game"/>
                <CardBody>

                    <Badge className="alert-info"
                           id="game-level"
                           label="Game Level"
                           value={game.level}></Badge>
                    {triesBadge}<Badge
                    className="alert-primary"
                    id="remainingTries"
                    label="Remaining Tries"></Badge>

                    <Badge className="alert-danger"
                           id="counter"
                           label="Counter"
                           value={game.counter}></Badge>

                    <div className="form-group">
                        <label htmlFor="guess">Guess:</label>

                        <input type="text"
                               id="guess"
                               value={game.guess}
                               onChange={handleChange}
                               className="form-control"></input>
                        <button onClick={play}
                                className="btn btn-success">Play
                        </button>
                    </div>
                </CardBody>
            </Card>
            <p></p>
            {movesCard}
            <p></p>
            <Statistics stats={statistics}></Statistics>
        </Container>
    );
}


