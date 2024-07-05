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
    let sourceNode;
    let targetNode;
    let labelText;

    state_machine.forEach(state => {
        if (state.routing && state.routing.route) {
            state.routing.route.forEach(route_element => {
                
                labelText = route_element.response;
                const next_flow = route_element.next_flow;
                const route_response = route_element.response;

                sourceNode = nodes.find(node => node.attr('nodeData').name === state.name);

                if (sourceNode && next_flow) {
                    targetNode = nodes.find(node => node.attr('nodeData').name === next_flow);

                } else if (sourceNode && route_response === "UNKNOWN") { 
                    
                    const targetNodeData = {
                        name: 'UNKNOWN',
                        ...route_element
                    };

                    targetNode = createNode(targetNodeData, graph);

                } 

                createLink(sourceNode, targetNode, labelText, graph); 

            });
        }
    });
}



export function createLink(source, target, labelText, graph) {
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




