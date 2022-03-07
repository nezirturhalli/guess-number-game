import React from "react";

import Badge from "./badge";
import Card from "./card";
import CardHeader from "./card-header";
import CardBody from "./card-body";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function Statistics(props) {
    return (<Card>
        <CardHeader title="Game Statistics"/>
        <CardBody>
            <Badge
                className="alert-info"
                id="wins"
                label="Wins"
                value={props.stats.wins}> </Badge>
            <ProgressBar
                now={props.stats.wins}
            ></ProgressBar>
            <Badge
                className="alert-info"
                id="loses"
                label="Loses"
                value={props.stats.loses}> </Badge>
            <ProgressBar
                now={props.stats.loses}
            ></ProgressBar>
            <Badge
                className="alert-info"
                id="total"
                label="Total"
                value={props.stats.total}> </Badge>
            <ProgressBar
                now={props.stats.total}
            ></ProgressBar>
        </CardBody>
    </Card>);
}