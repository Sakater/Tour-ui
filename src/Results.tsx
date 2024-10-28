import React, {useEffect, useState} from 'react';
import {Result, Edge} from "./Types";

export interface ResultsProps {
    results: Result;
    onUpdate: (processedResults: { lat: number; lon: number }[]) => void;
}

export const Results = ({results, onUpdate}: ResultsProps) => {
    const [processedResults, setProcessedResults] = useState<[{ lat: number; lon: number; }]>([]);

    useEffect(() => {
        processResults();
    }, [results]);
    const processResults = () => {
        const processedResults: { 'lat': number, 'lon': number }[] = []
        results.distances.map((distances, outerIndex) => {
            return distances.map((distance, innerIndex) => {
                const routes: number = results.routes[0][outerIndex];
                const target: number = results.routes[0][outerIndex + 1];
                if (distance === results.distances[routes][target]) {
                    processedResults.push({
                        'lat': distance.originNode.lat,
                        'lon': distance.originNode.lon
                    });
                }
            });
        })
        onUpdate(processedResults);
    }

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
                            if (distance === results.distances[routes][target]) {
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
