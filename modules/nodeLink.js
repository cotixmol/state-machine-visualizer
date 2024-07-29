//NODES CREATION
export const createNodes = (state_machine, graph) => {
    return state_machine.map(state => createNode(state, graph));
}

export const createNode = (state, graph) => {
    const node = new joint.shapes.standard.Rectangle();
    node.size(150, 50);
    node.attr('label', { text: state.name || 'Unnamed node' }); 
    node.attr('nodeData', state);
    node.addTo(graph);
    return node;
}


// LINKS (CONNECTION BETWEEN NODES) CREATION
export const createLinks = (state_machine, nodes, graph) => {
    state_machine.forEach(state => {
        const { routing, next_flow, name } = state;

        if (routing && routing.route) {
            routing.route.forEach(route_element => {
                const { next_flow: routeNextFlow, response } = route_element;
                if (routeNextFlow) {
                    const sourceNode = nodes.find(node => node.attr('nodeData').name === name);
                    const targetNode = nodes.find(node => node.attr('nodeData').name === routeNextFlow);
                    if (sourceNode && targetNode) {
                        createLink(sourceNode, targetNode, response, graph);
                    }
                }
            });
        } else if (next_flow) { // General case for any state with next_flow at the root level
            const sourceNode = nodes.find(node => node.attr('nodeData').name === name);
            const targetNode = nodes.find(node => node.attr('nodeData').name === next_flow);
            if (sourceNode && targetNode) {
                createLink(sourceNode, targetNode, name, graph);
            }
        }
    });
};

export const createLink = (source, target, labelText, graph) => {
    const link = new joint.shapes.standard.Link()
    link.source(source); 
    link.target(target); 
    link.addTo(graph); 
    link.appendLabel({ // Style of the link labels
        attrs: {
            text: {
                text: labelText, 
                fontSize: 8,
                fontFamily: 'Arial, helvetica, sans-serif',
                fontWeight: 'bold',
                fill: '#FFFFFF'
            },
            rect: {
                fill: '#000000',
                stroke: '#000',
                'stroke-width': 5
            }
        },
        position: { distance: 0.85 }
    });
    return link;
}




