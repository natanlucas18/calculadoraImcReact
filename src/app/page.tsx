"use client"
import React, { useState } from 'react';

type Pessoa = {
  peso: number;
  altura: number;
}

export default function Home() {
  const [pessoa, setPessoa] = useState<Pessoa>({
    peso: 0,
    altura: 0,
  });
  const [imc, setImc] = useState<number | null>(null);
  const [resultado, setResultado] = useState<string | null>(null);

  const calcularIMC = (): void => {
    if (pessoa.peso > 0 && pessoa.altura > 0) {
      const imcValue = pessoa.peso / (pessoa.altura * pessoa.altura);
      setImc(imcValue);
      if (imcValue < 18.5) {
        setResultado('Abaixo do peso');
      } else if (imcValue >= 18.5 && imcValue < 24.9) {
        setResultado('Peso normal');
      } else if (imcValue >= 25 && imcValue < 29.9) {
        setResultado('Sobrepeso');
      } else {
        setResultado('Obesidade');
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPessoa((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <form action="post" className='flex flex-col rounded-sm p-4 bg-white' onSubmit={handleSubmit}>
          <h1 className='mb-5 text-center text-lg font-bold text-black'>Calculadora IMC</h1>
          <label htmlFor='peso' className='text-black'>Peso:</label>
          <input
           type="number"
           placeholder='Insira seu peso'
           className='w-80 h-10 bg-gray-400 mt-4 text-black p-5 rounded-sm'
           value={pessoa.peso}
           onChange={handleChange}
           name='peso'
          />
          <label htmlFor='altura' className='mt-2 text-black'>Altura:</label>
          <input 
          type="number"
           placeholder='Insira sua altura'
           className='w-80 h-10 bg-gray-400 mt-4 text-black p-5 rounded-sm'
           value={pessoa.altura}
           onChange={handleChange}
           name='altura'          
           />
          <button type="button"
           className='w-70 h-9 bg-dark m-4 bg-orange-600 rounded-sm hover:bg-orange-500 cursor-pointer'
            onClick={() => calcularIMC()}>
              Calcular
          </button>
        </form>
        <div className='flex flex-col w-full h-25'>
          {imc && <p className='text-center'>Seu IMC é: {imc.toFixed(2)}</p>}
          {resultado && <p className='text-center'>Resultado: {resultado}</p>}
        </div>
          
      </main>
      <footer className="text-center text-gray-500 row-start-3">
        <p>Desenvolvido por <a href="https://www.linkedin.com/in/natanls18" className='text-blue-500 hover:underline' target="_blank" rel="noopener noreferrer">Natan Lucas</a></p>
      </footer>
    </div>
  );
}

