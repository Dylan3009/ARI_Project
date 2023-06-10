import React from 'react'
import './Generate.css'

function Generate() {

  const handleClick = () => {
    fetch('http://localhost:3001/generate', {
      method: 'GET',
    }, [])
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='generate-div'>
      <a className='btn-back' href="/">Back</a>
      <h1>Generate</h1>
      <div className='div1'>
        <label>Documeto</label>
        <input type="text" name="document" />
        <label>Nombres</label>
        <input type="text" name="name" />
      </div>
      <div className='div2'>
        <label>Apellidos</label>
        <input type="text" name="lastname" />
        <label>Tarjeta</label>
        <input type="number" name="card" />
      </div>
      <div className='div3'>
        <label>Tipo</label>
        <input type="text" name="type" />
        <label>Telefono</label>
        <input type="number" name="phone" />
      </div>
      <label for="btn-generate" class="button-generate">Generar</label>
      <input id='btn-generate' type='file' onClick={handleClick}></input>
    </div>
  )
} 

export default Generate