import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function GPTButton() {
  const handleClick = async () => {
      const userMessage = document.getElementById('submitGPT').value;
      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage })
      });
      const data = await response.json();
	  
      document.getElementById('responseBox').innerHTML += `<div class="query toast" style="display:block">
      <div class="toast-body">
		${userMessage}
      </div>
    </div>`;
      document.getElementById('responseBox').innerHTML += `<div class="response toast" style="display:block">
      <div class="toast-body">
		${data.content[0].text}
      </div>
    </div>`;
	  console.log(data)
  };

  return (
	<InputGroup className="mb-3">
	<Form.Control
	  placeholder="Ask Grok"
	  aria-label="Grok GPT"
	  aria-describedby="GPTButton"
	  id="submitGPT"
	/>
    <Button variant="outline-secondary" id="GPTButton" onClick={handleClick}>
	  Submit
	</Button>
	</InputGroup>
  );
}

export default GPTButton;