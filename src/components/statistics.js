import React from "react";

import Badge from "./badge";
import Card from "./card";
import CardHeader from "./card-header";
import CardBody from "./card-body";

export default function Statistics(props) {
    return (
        <Card>
            <CardHeader title="Game Statistics"/>
            <CardBody>
                <Badge
                    className="alert-info"
                    id="wins"
                    label="Wins"
                    value={props.stats.wins}> </Badge>
                <Badge
                    className="alert-info"
                    id="loses"
                    label="Loses"
                    value={props.stats.loses}> </Badge>
                <Badge
                    className="alert-info"
                    id="total"
                    label="Total"
                    value={props.stats.total}> </Badge>
            </CardBody>
        </Card>
    );
}