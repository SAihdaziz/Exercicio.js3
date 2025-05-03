document
  .getElementById("formConsulta")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o envio do formulário

    const cep = document.getElementById("cep").value.replace(/\D/g, ""); // Remove qualquer caractere que não seja número

    if (cep.length !== 8) {
      alert("CEP inválido. Digite 8 números.");
      return;
    }

    // URL da API ViaCEP
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Erro na requisição");
        return response.json();
      })
      .then((data) => {
        if (data.erro) {
          document.getElementById(
            "resultados"
          ).innerHTML = `<p>CEP não encontrado.</p>`;
        } else {
          document.getElementById("resultados").innerHTML = `
          <p><strong>Rua:</strong> ${data.logradouro}</p>
          <p><strong>Bairro:</strong> ${data.bairro}</p>
          <p><strong>Cidade:</strong> ${data.localidade}</p>
          <p><strong>UF:</strong> ${data.uf}</p>
        `;
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        document.getElementById(
          "resultados"
        ).innerHTML = `<p>Erro ao buscar o CEP.</p>`;
      });
  });
