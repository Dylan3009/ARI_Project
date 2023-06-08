import React from 'react'

function Create() {
  return (
    <div>
        <h1>Generate</h1>
        <label>Documeto</label>
        <input type="text" name="document" />
        <label>Nombres</label>
        <input type="text" name="name" />
        <label>Apellidos</label>
        <input type="text" name="lastname" />
        <label>Tarjeta</label>
        <input type="text" name="card" />
        <label>Tipo</label>
        <input type="text" name="type" />
        <label>Telefono</label>
        <input type="number" name="phone" />
        <label>Poligono</label>
        <input type="text" name="polygon" />
    </div>
  )
}

export default Create