import { initializeGraph } from './modules/graphInit.js';

let stateMachineData = [];

fetch('/state-machine.json')
    .then(response => response.json())
    .then(data => {
        stateMachineData = data; // Store the fetched data in stateMachineData
        initializeGraph(stateMachineData); // Initialize the graph with the fetched data
    })
    .catch(error => console.error('Error loading the JSON file:', error)); // Log any errors that occur during the fetch operation
