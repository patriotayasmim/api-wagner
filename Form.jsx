import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAmYQSLYBr6_qxhtlX2vQ1yr-JqQxJ3IF4",
    authDomain: "api-wagner-878bc.firebaseapp.com",
    projectId: "api-wagner-878bc",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const reclamacoesCollectionRef = collection(db, "reclamacoes");

export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { name, email, message } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const user = await addDoc(reclamacoesCollectionRef, { name, email, message });
        console.log('Dados salvos com sucesso:', user);
        alert('Formulário enviado com sucesso!');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } catch (error) {
        console.error('Erro ao enviar reclamação:', error);
        alert('Erro ao enviar reclamação. Por favor, tente novamente.');
      }
    };

    const handleReset = (event) => {
        event.preventDefault();
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      };
        
  return (
    <main id="reclamacoes">
      <h1 style={{ color: 'white' }}>Deixe sua reclamação ou dúvida aqui!</h1>
      <form id="formulario-reclamacoes" onSubmit={handleSubmit} onReset={handleReset}>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <label htmlFor="message">Mensagem:</label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={handleChange}
          required
        ></textarea>
        <input type="submit" value="Enviar" id="enviar" />
        <input type="reset" value="Limpar Reclamação" id="apagar" />
      </form>
    </main>
  );
};