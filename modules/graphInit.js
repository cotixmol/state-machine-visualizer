import { createNodes, createLinks } from './nodeLink.js';
import { layoutGraph } from './layout.js';
import { addEventHandlers } from './eventHandlers.js';

export const initializeGraph = (state_machine) => {
    // Basic JointJS setup
    const namespace = joint.shapes;
    const graph = new joint.dia.Graph({}, { cellNamespace: namespace }); 

    const paper = new joint.dia.Paper({
        el: document.getElementById('paper'),
        model: graph,
        cellViewNamespace: namespace
    });

    const nodes = createNodes(state_machine, graph);
    createLinks(state_machine, nodes, graph);
    layoutGraph(graph, paper); // Layout the graph using the layout function
    addEventHandlers(paper); // Add event handlers to the paper for interactive functionalities
}
