import { describe, it, expect } from "vitest";
import {
  maskCPF,
  maskCNPJ,
  maskCEP,
  maskTelefone,
  validateCPF,
  validateCNPJ,
  validateEmail,
  validatePassword,
  validateNome,
  validateDataNascimento,
  validateCEP,
  validateTelefone,
  validateRequired,
  validateDataAgendada,
} from "@/lib/validators";

describe("maskCPF", () => {
  it("formata 11 dígitos como XXX.XXX.XXX-XX", () => {
    expect(maskCPF("11144477735")).toBe("111.444.777-35");
  });
  it("ignora caracteres não numéricos", () => {
    expect(maskCPF("aaa111.444b777c35")).toBe("111.444.777-35");
  });
  it("trunca em 11 dígitos", () => {
    expect(maskCPF("1234567890123")).toBe("123.456.789-01");
  });
  it("aplica máscara parcial enquanto digita", () => {
    expect(maskCPF("123")).toBe("123");
    expect(maskCPF("1234")).toBe("123.4");
    expect(maskCPF("1234567")).toBe("123.456.7");
    expect(maskCPF("1234567890")).toBe("123.456.789-0");
  });
});

describe("maskCNPJ", () => {
  it("formata 14 dígitos como XX.XXX.XXX/XXXX-XX", () => {
    expect(maskCNPJ("11222333000181")).toBe("11.222.333/0001-81");
  });
  it("trunca em 14 dígitos", () => {
    expect(maskCNPJ("112223330001819999")).toBe("11.222.333/0001-81");
  });
});

describe("maskCEP", () => {
  it("formata 8 dígitos como XXXXX-XXX", () => {
    expect(maskCEP("01310100")).toBe("01310-100");
  });
  it("trunca em 8 dígitos", () => {
    expect(maskCEP("013101009999")).toBe("01310-100");
  });
});

describe("maskTelefone", () => {
  it("formata fixo (10 dígitos) como (XX) XXXX-XXXX", () => {
    expect(maskTelefone("2122223333")).toBe("(21) 2222-3333");
  });
  it("formata celular (11 dígitos) como (XX) XXXXX-XXXX", () => {
    expect(maskTelefone("21987654321")).toBe("(21) 98765-4321");
  });
  it("trunca em 11 dígitos", () => {
    expect(maskTelefone("21987654321999")).toBe("(21) 98765-4321");
  });
});

describe("validateCPF", () => {
  it("aceita CPF válido", () => {
    expect(validateCPF("111.444.777-35")).toBeNull();
    expect(validateCPF("11144477735")).toBeNull();
  });
  it("rejeita comprimento diferente de 11", () => {
    expect(validateCPF("123")).toBe("CPF deve ter 11 dígitos.");
    expect(validateCPF("123456789012")).toBe("CPF deve ter 11 dígitos.");
  });
  it("rejeita CPFs com todos dígitos iguais", () => {
    expect(validateCPF("00000000000")).toBe("CPF inválido.");
    expect(validateCPF("11111111111")).toBe("CPF inválido.");
    expect(validateCPF("99999999999")).toBe("CPF inválido.");
  });
  it("rejeita checksum inválido", () => {
    expect(validateCPF("11144477700")).toBe("CPF inválido.");
    expect(validateCPF("12345678900")).toBe("CPF inválido.");
  });
});

describe("validateCNPJ", () => {
  it("aceita CNPJ válido", () => {
    expect(validateCNPJ("11.222.333/0001-81")).toBeNull();
    expect(validateCNPJ("11222333000181")).toBeNull();
  });
  it("rejeita comprimento diferente de 14", () => {
    expect(validateCNPJ("123")).toBe("CNPJ deve ter 14 dígitos.");
  });
  it("rejeita CNPJs com todos dígitos iguais", () => {
    expect(validateCNPJ("00000000000000")).toBe("CNPJ inválido.");
    expect(validateCNPJ("11111111111111")).toBe("CNPJ inválido.");
  });
  it("rejeita checksum inválido", () => {
    expect(validateCNPJ("11222333000100")).toBe("CNPJ inválido.");
  });
});

describe("validateEmail", () => {
  it("rejeita string vazia/whitespace", () => {
    expect(validateEmail("")).toBe("E-mail é obrigatório.");
    expect(validateEmail("   ")).toBe("E-mail é obrigatório.");
  });
  it("rejeita formato inválido", () => {
    expect(validateEmail("foo")).toBe("E-mail inválido.");
    expect(validateEmail("foo@")).toBe("E-mail inválido.");
    expect(validateEmail("foo@bar")).toBe("E-mail inválido.");
    expect(validateEmail("@bar.com")).toBe("E-mail inválido.");
    expect(validateEmail("foo @bar.com")).toBe("E-mail inválido.");
  });
  it("aceita e-mails válidos", () => {
    expect(validateEmail("caio@uff.br")).toBeNull();
    expect(validateEmail("user.name+tag@sub.domain.com")).toBeNull();
  });
});

describe("validatePassword", () => {
  it("rejeita senha vazia", () => {
    expect(validatePassword("")).toBe("Senha é obrigatória.");
  });
  it("rejeita senha menor que 8 caracteres", () => {
    expect(validatePassword("1234567")).toBe(
      "Senha deve ter no mínimo 8 caracteres.",
    );
  });
  it("aceita senha com 8+ caracteres", () => {
    expect(validatePassword("12345678")).toBeNull();
    expect(validatePassword("uma_senha_longa")).toBeNull();
  });
});

describe("validateNome", () => {
  it("rejeita vazio/whitespace", () => {
    expect(validateNome("")).toBe("Nome é obrigatório.");
    expect(validateNome("   ")).toBe("Nome é obrigatório.");
  });
  it("rejeita nome com menos de 3 caracteres", () => {
    expect(validateNome("Jo")).toBe("Nome deve ter no mínimo 3 caracteres.");
  });
  it("exige nome completo (espaço entre tokens)", () => {
    expect(validateNome("Joao")).toBe("Informe o nome completo.");
  });
  it("aceita nome completo", () => {
    expect(validateNome("Joao Silva")).toBeNull();
  });
});

describe("validateDataNascimento", () => {
  it("rejeita data vazia", () => {
    expect(validateDataNascimento("")).toBe(
      "Data de nascimento é obrigatória.",
    );
  });
  it("rejeita data futura", () => {
    const future = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    expect(validateDataNascimento(future)).toBe(
      "Data de nascimento não pode ser no futuro.",
    );
  });
  it("rejeita idade < 16", () => {
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
    const iso = tenYearsAgo.toISOString().slice(0, 10);
    expect(validateDataNascimento(iso)).toBe(
      "É necessário ter pelo menos 16 anos.",
    );
  });
  it("rejeita idade > 120", () => {
    const oldDate = new Date();
    oldDate.setFullYear(oldDate.getFullYear() - 125);
    const iso = oldDate.toISOString().slice(0, 10);
    expect(validateDataNascimento(iso)).toBe(
      "Data de nascimento inválida.",
    );
  });
  it("aceita idade dentro do intervalo", () => {
    const adult = new Date();
    adult.setFullYear(adult.getFullYear() - 25);
    const iso = adult.toISOString().slice(0, 10);
    expect(validateDataNascimento(iso)).toBeNull();
  });
});

describe("validateCEP", () => {
  it("rejeita comprimento diferente de 8", () => {
    expect(validateCEP("12345")).toBe("CEP deve ter 8 dígitos.");
    expect(validateCEP("123456789")).toBe("CEP deve ter 8 dígitos.");
  });
  it("aceita 8 dígitos com ou sem máscara", () => {
    expect(validateCEP("01310100")).toBeNull();
    expect(validateCEP("01310-100")).toBeNull();
  });
});

describe("validateTelefone", () => {
  it("rejeita comprimento fora de 10–11", () => {
    expect(validateTelefone("999")).toBe("Telefone deve ter 10 ou 11 dígitos.");
    expect(validateTelefone("123456789012")).toBe(
      "Telefone deve ter 10 ou 11 dígitos.",
    );
  });
  it("aceita 10 e 11 dígitos", () => {
    expect(validateTelefone("2122223333")).toBeNull();
    expect(validateTelefone("(21) 98765-4321")).toBeNull();
  });
});

describe("validateRequired", () => {
  it("rejeita string vazia/whitespace usando o nome do campo", () => {
    expect(validateRequired("", "CNPJ")).toBe("CNPJ é obrigatório.");
    expect(validateRequired("   ", "Empresa")).toBe("Empresa é obrigatório.");
  });
  it("aceita string preenchida", () => {
    expect(validateRequired("ok", "CNPJ")).toBeNull();
  });
});

describe("validateDataAgendada", () => {
  it("rejeita data vazia", () => {
    expect(validateDataAgendada("")).toBe("Data é obrigatória.");
  });
  it("rejeita data no passado", () => {
    const past = new Date();
    past.setDate(past.getDate() - 1);
    const iso = past.toISOString().slice(0, 10);
    expect(validateDataAgendada(iso)).toBe("A data não pode ser no passado.");
  });
  it("aceita data de hoje", () => {
    const today = new Date().toISOString().slice(0, 10);
    expect(validateDataAgendada(today)).toBeNull();
  });
  it("aceita data futura", () => {
    const future = new Date();
    future.setDate(future.getDate() + 7);
    const iso = future.toISOString().slice(0, 10);
    expect(validateDataAgendada(iso)).toBeNull();
  });
});
