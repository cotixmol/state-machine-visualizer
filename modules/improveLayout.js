// DAGRE is a library that provides a simple API to lay out nodes in a graph and then adjust their positions to make the graph look nice.

export const improveLayout = (graph, paper) => {
    const dagreGraph = new dagre.graphlib.Graph();
    
    dagreGraph.setGraph({
        rankdir: 'TB',
        align: "UL",
        ranker: "tight-tree",
        ranksep: 350
    });
    dagreGraph.setDefaultEdgeLabel(function() { return {}; });

    graph.getElements().forEach(node => {
        dagreGraph.setNode(node.id, { width: node.size().width, height: node.size().height });
    });

    // Dagre Edges are the connections between nodes and are set based on the links in the JointJS graph
    graph.getLinks().forEach(link => {
        const source = link.getSourceElement();
        const target = link.getTargetElement();

        if (source && target) {
            dagreGraph.setEdge(source.id, target.id);
        }
    });

    dagre.layout(dagreGraph); // Perform the layout

    // Update JointJS positions based on the node width and height
    dagreGraph.nodes().forEach(nodeId => {
        const node = graph.getCell(nodeId);
        const nodeData = dagreGraph.node(nodeId);
        node.position(nodeData.x - nodeData.width / 2, nodeData.y - nodeData.height / 2); 
    });

    // Adjust the paper dimensions based on the graph dimensions
    const graphBBox = graph.getBBox();
    paper.setDimensions(
        Math.max(graphBBox.width + 100, window.innerWidth + 100), 
        Math.max(graphBBox.height + 100, window.innerHeight + 100)
    );
}
