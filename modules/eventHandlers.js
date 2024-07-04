// Function to add event handlers to the paper (canvas)
export function addEventHandlers(paper) {
    // Add mouseover event listener to elements (nodes) in the paper
    paper.on('element:mouseover', function(cellView) {
        const node = cellView.model; // Get the model of the element
        node.attr('body/stroke', 'blue'); // Change the border color of the node to blue
        node.attr('label/text', 'Click for details'); // Change the label text to 'Click for details'
    });

    // Add mouseout event listener to elements (nodes) in the paper
    paper.on('element:mouseout', function(cellView) {
        const node = cellView.model; // Get the model of the element
        node.attr('body/stroke', 'black'); // Change the border color of the node back to black
        node.attr('label/text', node.attr('nodeData').name || 'No name provided'); // Restore the original label text
    });

    // Add click event listener to elements (nodes) in the paper
    paper.on('element:pointerclick', function(cellView, evt) {
        const node = cellView.model; // Get the model of the element
        const nodeData = node.attr('nodeData'); // Get the original data stored in the node's attributes
        showNodeDetails(nodeData, evt.clientX, evt.clientY); // Show the details of the node at the click position
    });

    // Add click event listener to the blank space in the paper
    paper.on('blank:pointerclick', function() {
        hideNodeDetails(); // Hide the node details box
    });
}

// Function to show the details of a node in a details box
function showNodeDetails(nodeData, x, y) {
    const detailsDiv = document.getElementById('node-details'); // Get the details box element
    detailsDiv.innerHTML = `<pre>${JSON.stringify(nodeData, null, 2)}</pre>`; // Set the details box content to the node data
    detailsDiv.style.display = 'block'; // Display the details box

    const detailsDivRect = detailsDiv.getBoundingClientRect(); // Get the bounding rectangle of the details box
    const paperRect = document.getElementById('paper').getBoundingClientRect(); // Get the bounding rectangle of the paper

    let newX = x - paperRect.left + 10; // Calculate the new X position for the details box with an offset
    let newY = y - paperRect.top + 10; // Calculate the new Y position for the details box with an offset

    // Ensure the details box is within the viewport horizontally
    if (newX + detailsDivRect.width > paperRect.width) {
        newX = paperRect.width - detailsDivRect.width - 10;
    }
    // Ensure the details box is within the viewport vertically
    if (newY + detailsDivRect.height > paperRect.height) {
        newY = paperRect.height - detailsDivRect.height - 10;
    }

    detailsDiv.style.left = newX + 'px'; // Set the new left position of the details box
    detailsDiv.style.top = newY + 'px'; // Set the new top position of the details box
}


// Function to hide the details box
function hideNodeDetails() {
    const detailsDiv = document.getElementById('node-details'); // Get the details box element
    detailsDiv.style.display = 'none'; // Hide the details box
}

