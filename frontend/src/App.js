// Importa React e hooks necessários
import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [customers, setCustomers] = useState([]); // Estado para lista de clientes
  const [newCustomer, setNewCustomer] = useState(""); // Estado para novo cliente

  // Função para buscar todos os clientes
  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:3000/customers");
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  // Carrega os clientes ao montar o componente
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Função para adicionar um novo cliente
  const addCustomer = async () => {
    if (!newCustomer) return alert("Por favor, insira um nome.");

    try {
      const response = await fetch("http://localhost:3000/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCustomer }),
      });

      if (response.ok) {
        const createdCustomer = await response.json();
        setCustomers([...customers, createdCustomer]); // Atualiza a lista com o novo cliente
        setNewCustomer(""); // Limpa o campo
      } else {
        console.error("Erro ao adicionar cliente:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
    }
  };

  return (
    <div className="App">
      <h1>Clientes</h1>

      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          value={newCustomer}
          onChange={(e) => setNewCustomer(e.target.value)}
          placeholder="Digite o nome do cliente"
        />
        <button onClick={addCustomer}>Adicionar Cliente</button>
      </div>
    </div>
  );
};

export default App;
