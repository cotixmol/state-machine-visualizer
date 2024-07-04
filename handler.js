// Import the initializeGraph function from the graphInit module
import { initializeGraph } from './modules/graphInit.js';

// Initialize an empty array to hold the state machine data
let stateMachineData = [];

// Fetch JSON data from the specified URL
fetch('/state-machine.json')
    .then(response => response.json()) // Convert the response to JSON
    .then(data => {
        stateMachineData = data; // Store the fetched data in stateMachineData
        initializeGraph(stateMachineData); // Initialize the graph with the fetched data
    })
    .catch(error => console.error('Error loading the JSON file:', error)); // Log any errors that occur during the fetch operation
