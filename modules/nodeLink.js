// Function to create a node (rectangle) in the JointJS graph
export function createNode(data, graph) {
    const rect = new joint.shapes.standard.Rectangle(); // Create a new rectangle shape
    rect.resize(150, 50); // Resize the rectangle to 150x50 pixels
    rect.attr('label', { text: data.name || 'No name provided' }); // Set the label text, using the name from data or a default if not provided
    rect.attr('nodeData', data); // Store the original data in the node's attributes
    rect.attr('body', { stroke: 'black' }); // Set the border color of the rectangle to black
    rect.addTo(graph); // Add the rectangle to the graph
    return rect; // Return the created rectangle
}


// Function to create a link (edge) between two nodes in the JointJS graph
export function createLink(source, target, labelText, graph) {
    const link = new joint.shapes.standard.Link(); // Create a new link shape
    link.source(source); // Set the source node of the link
    link.target(target); // Set the target node of the link
    link.addTo(graph); // Add the link to the graph
    link.appendLabel({ // Add a label to the link
        attrs: {
            text: {
                text: labelText, // Set the label text
                fontSize: 8, // Set the font size of the label text
                fontFamily: 'Arial, helvetica, sans-serif', // Set the font family of the label text
                fontWeight: 'bold', // Set the font weight of the label text
                fill: '#FFFFFF' // Set the text color to white
            },
            rect: {
                fill: '#111111', // Set the background color of the label to dark gray
                stroke: '#111', // Set the border color of the label to dark gray
                'stroke-width': 5 // Set the border width of the label
            }
        },
        position: { distance: 0.85 } // Position the label near the end of the link
    });
    return link; // Return the created link
}


// Function to find a node by its name attribute in the array of nodes
export function findNodeByName(nodes, name) {
    return nodes.find(node => node.attr('nodeData').name === name); // Return the first node with the matching name attribute
}

// Function to create nodes for each item in the data array
export function createNodes(data, graph) {
    return data.map(item => createNode(item, graph)); // Map each item in the data array to a new node and return the array of nodes
}

// Function to create links for each routing in the data array
export function createLinks(data, nodes, graph) {
    data.forEach(item => {
        if (item.routing && item.routing.route) { // Check if the item has routing information
            item.routing.route.forEach(route => {
                const sourceNode = findNodeByName(nodes, item.name); // Find the source node by name
                if (route.next_flow) { // If the route has a next_flow attribute
                    const targetNode = findNodeByName(nodes, route.next_flow); // Find the target node by next_flow name
                    if (sourceNode && targetNode) {
                        createLink(sourceNode, targetNode, route.response, graph); // Create a link between the source and target nodes
                    }
                } else if (route.response === "UNKNOWN" && sourceNode) { // If the route response is "UNKNOWN"
                    const unknownNodeData = {
                        name: 'UNKNOWN',
                        response: route.response,
                        generate_answer: route.generate_answer
                    };
                    const unknownNode = createNode(unknownNodeData, graph); // Create a special node for UNKNOWN response
                    createLink(sourceNode, unknownNode, 'UNKNOWN', graph); // Create a link to the UNKNOWN node
                } else if (sourceNode) { // If no next_flow, create an end node
                    const endNode = createNode({ name: 'generate_answer' }, graph); // Create an end node
                    createLink(sourceNode, endNode, route.response, graph); // Create a link to the end node
                }
            });
        }
    });
}

