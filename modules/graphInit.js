// Import necessary functions from other modules
import { createNodes, createLinks } from './nodeLink.js';
import { layoutGraph } from './layout.js';
import { addEventHandlers } from './eventHandlers.js';

// Function to initialize the graph with given data
export function initializeGraph(data) {
    const namespace = joint.shapes; // Reference to JointJS shape namespace
    const graph = new joint.dia.Graph({}, { cellNamespace: namespace }); // Create a new JointJS graph

    // Create a new paper (canvas) for the graph
    const paper = new joint.dia.Paper({
        el: document.getElementById('paper'), // DOM element to attach the paper to
        model: graph, // Associate the paper with the graph model
        background: { color: '#DDDDDD' }, // Set the background color of the paper
        cellViewNamespace: namespace, // Namespace for cell views
        width: window.innerWidth, // Set paper width to the window width
        height: window.innerHeight, // Set paper height to the window height
        gridSize: 10 // Set the grid size for the paper
    });

    const nodes = createNodes(data, graph); // Create nodes from the data and add them to the graph
    createLinks(data, nodes, graph); // Create links between nodes based on the data
    layoutGraph(graph, paper); // Layout the graph using the layout function
    addEventHandlers(paper); // Add event handlers to the paper for interactive functionalities
}
