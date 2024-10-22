import React from 'react';
import {Result} from "./Types";

export interface ResultsProps {
    results: Result;
}

export const Results = ({results}: ResultsProps) => {
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Start (von)</th>
                    <th>Ziel (nach)</th>
                    <th>Entfernung</th>
                    <th>Reihenfolge</th>
                </tr>
                </thead>
                <tbody>
                {
                    results.distances.map((distances, outerIndex) => {
                        return distances.map((distance, innerIndex) => {
                            const routes: number = results.routes[0][outerIndex];
                            const target: number = results.routes[0][outerIndex + 1];
                            if (distance.distance === results.distances[routes][target].distance) {
                                return (
                                    <tr key={`${outerIndex}-${innerIndex}`} style={{fontSize: "15px"}}>
                                        <td>{distance.originNode.display_name}</td>
                                        <td>{distance.targetNode.display_name}</td>
                                        <td>{distance.distance}</td>
                                        <td>{outerIndex + 1}</td>
                                    </tr>
                                );
                            }
                            return null;
                        });
                    })
                }
                </tbody>
            </table>
        </div>
    );
}
