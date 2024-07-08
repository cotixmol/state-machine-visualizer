// Function to add event handlers to the paper (canvas)
export const addEventHandlers = (paper) => {
    paper.on('element:mouseover', (nodeView) => {
        const node = nodeView.model; 
        node.attr('body/stroke', 'red'); 
        node.attr('label/text', 'Click for details');
    });

    paper.on('element:mouseout', (nodeView) => {
        const node = nodeView.model; 
        node.attr('body/stroke', 'black');
        node.attr('label/text', node.attr('nodeData').name);
    });

    paper.on('element:pointerclick', (nodeView, event) => {
        const node = nodeView.model;
        const nodeData = node.attr('nodeData'); 
        showNodeDetails(nodeData, event.clientX, event.clientY); // Show the details of the node at the click position
    });

    paper.on('blank:pointerclick', () => {
        const NodeDetails = document.getElementById('node-details');
        NodeDetails.style.display = 'none';
    });
}

const showNodeDetails = (nodeData, x, y) => {
    const detailsDiv = document.getElementById('node-details');
    const paperDiv = document.getElementById('paper')

    detailsDiv.innerHTML = `<pre>${JSON.stringify(nodeData, null, 2)}</pre>`;
    detailsDiv.style.display = 'block';

    const metadataPaperDiv = paperDiv.getBoundingClientRect(); //Reference https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

    detailsDiv.style.left = x - metadataPaperDiv.left + 'px'; 
    detailsDiv.style.top = y - metadataPaperDiv.top + 'px';
}
