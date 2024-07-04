// Function to layout the graph using Dagre
export function layoutGraph(graph, paper) {
    const dagreGraph = new dagre.graphlib.Graph(); // Create a new Dagre graph
    dagreGraph.setGraph({
        rankdir: 'TB', // Set the layout direction to Top-to-Bottom
        align: "UL", // Align nodes to the upper-left
        ranker: "tight-tree", // Use the "tight-tree" ranker for layout
        ranksep: 350 // Set the separation between ranks
    });
    dagreGraph.setDefaultEdgeLabel(() => ({})); // Set default edge label to an empty object

    // Add nodes to the Dagre graph with their sizes
    graph.getElements().forEach(node => {
        dagreGraph.setNode(node.id, { width: node.size().width, height: node.size().height });
    });

    // Add edges to the Dagre graph from the JointJS graph
    graph.getLinks().forEach(link => {
        const source = link.getSourceElement();
        const target = link.getTargetElement();
        if (source && target) {
            dagreGraph.setEdge(source.id, target.id); // Set edge in Dagre graph
        }
    });

    dagre.layout(dagreGraph); // Perform layout calculation with Dagre

    // Update JointJS graph with new positions from Dagre
    dagreGraph.nodes().forEach(nodeId => {
        const node = graph.getCell(nodeId); // Get the node from the JointJS graph
        const nodeData = dagreGraph.node(nodeId); // Get the layout data from Dagre
        node.position(nodeData.x - nodeData.width / 2, nodeData.y - nodeData.height / 2); // Update node position
    });

    // Adjust paper dimensions based on the graph bounding box
    const graphBBox = graph.getBBox(); // Get the bounding box of the graph
    paper.setDimensions(
        Math.max(graphBBox.width + 100, window.innerWidth), // Set paper width with extra padding
        Math.max(graphBBox.height + 100, window.innerHeight) // Set paper height with extra padding
    );
}
