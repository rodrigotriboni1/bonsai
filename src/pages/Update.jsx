import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Atualizar Bonsai</h1>
      <input
        type="text"
        placeholder="Nome da Especie"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Descrição/Origem"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Preço"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Foto"
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Atualizar</button>
      {error && "Something went wrong!"}
      <Link to="/">Veja todos os Bonsais</Link>
    </div>
  );
};

export default Update;
