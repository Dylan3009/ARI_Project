import React from 'react'
import './Transform.css'

//LoadJson = document.querySelector('.load-button')

/*LoadJson.addEventListener('click', async () => {
  try {
    const references = await window.showOpenFilePicker({});
    const file = await references[0].getFile();
    let content = await file.text();

    for (element in content) {
      const user = createUserData(content[element]);
      AddSection(user);
    }
  } catch (error) {
    console.log(error);
    console.log('There was an error loading the file');
  }
});*/

  const Transform = () => {
    return (
      <div>
        <a className='generate-button' href="/generate">Generate</a>
        <label for="load-btn" class="load-button">Load</label>
        <input id='load-btn' type='file'></input>
      </div>
    )
  }

  export default Transform