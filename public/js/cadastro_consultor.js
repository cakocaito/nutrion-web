document.getElementById("cadastroConsultorForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede o recarregamento da página

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const cpf = document.getElementById("cpf").value;
    const dataNascimento = document.getElementById("dataNascimento").value;

    const response = await fetch("http://localhost:3000/api/consultores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, email, senha, cpf, dataNascimento })
    });

    const result = await response.json();
    alert(result.message || "Cadastro realizado com sucesso!");
});
