
//instalación de bootstrap en react
//npm i bootstrap reactstrap

//https://www.youtube.com/watch?v=F4MdhfMn2vs&list=PLqC1FgzJhTiyO8c56d6wD0C7xbCVnZizl

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table, Button, Container, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup } from 'reactstrap';


const data = [
  { id: 1, personaje: "Naruto", anime: "Naruto Shipuden" },
  { id: 2, personaje: "Goku", anime: "Bola de dragón Z" },
  { id: 3, personaje: "Kirito", anime: "Sword art online" },
  { id: 4, personaje: "Kasel", anime: "King's raid" },
  { id: 5, personaje: "Monkey D. Luffy", anime: "One Piece" },
  { id: 6, personaje: "Yui Takamura", anime: "Muv-Luv Alternative:Total Eclipse" }
];
class App extends Component {

  state = {
    data: data,
    form: {
      id: '',
      personaje: '',
      anime: ''
    },
    modalInsertar: false,
    modalEditar: false
  };

  handleChange = event => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      }
    })
  }
  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true });
  }
  ocultarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  }

  mostrarModalEditar = (registro) => {
    this.setState({ modalEditar: true, form: registro });
  }
  ocultarModalEditar = () => {
    this.setState({ modalEditar: false });
  }


  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ data: lista, modalInsertar: false })
  }

  editar = (dato) => {
    var contador = 0;
    var lista = this.state.data;
    lista.map((registro) => {
      if (dato.id === registro.id) {
        lista[contador].personaje = dato.personaje;
        lista[contador].anime = dato.anime;
      }
      contador++;
    });
    this.setState({ data: lista, modalEditar: false })
  }

  eliminar = (dato) => {
    const opcion = window.confirm(`¿Realmente deseas eliminar el registro ${dato.id}?`);
    if (opcion) {
      var contador = 0;
      var lista = this.state.data;
      lista.map((registro) => {
        if (dato.id === registro.id) {
          lista.splice(contador, 1)
        }
        contador++;
      })
      this.setState({ data: lista, modalEditar: false  })
    }
  }


  render() {
    return (

      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Personaje</th>
                <th>Anime</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((elemento) => (
                <tr key={elemento.id}>
                  <td>{elemento.id}</td>
                  <td>{elemento.personaje}</td>
                  <td>{elemento.anime}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalEditar(elemento)}
                    >
                      Editar
                  </Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(elemento)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
    </label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Personaje:
    </label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.personaje}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Anime:
    </label>
              <input
                className="form-control"
                name="anime"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.anime}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
  </Button>
            <Button
              color="danger"
              onClick={() => this.ocultarModalEditar()}
            >
              Cancelar
  </Button>
          </ModalFooter>
        </Modal>

        {/* *** Modal insertar personaje **** */}

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Insertar Personaje</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
    </label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Personaje:
    </label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Anime:
    </label>
              <input
                className="form-control"
                name="anime"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
  </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.ocultarModalInsertar()}
            >
              Cancelar
  </Button>
          </ModalFooter>
        </Modal>



      </>



    );
  }
}

export default App;
