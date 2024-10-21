import React, {useState} from 'react';
import axios from "axios";
import {Location} from "./Types";

export interface ResultsProps {
    locations: Location[];
}

export const Results = ({locations}: ResultsProps) => {
    const [results, setResults] = useState([]);
    const postResults = async (nodes: Location[]) => {
        return axios.post('http://127.0.0.1:8000/nodes', locations)
            .then(response => {
                setResults(() => {
                    return response.data
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
    return (
        <div>
            {results.map((result) => (
                postResults(locations) &&
                <div>
                    <p>{result}</p>
                </div>
            ))}
        </div>)
}
