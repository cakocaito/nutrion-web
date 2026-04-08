// ─── Masks (format as user types) ───

export function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskCNPJ(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  return digits
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

export function maskCEP(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return digits.replace(/(\d{5})(\d{1,3})$/, "$1-$2");
}

export function maskTelefone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d{1,4})$/, "$1-$2");
  }
  return digits
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
}

// ─── Validators ───

export function validateCPF(cpf: string): string | null {
  const digits = cpf.replace(/\D/g, "");

  if (digits.length !== 11) return "CPF deve ter 11 dígitos.";
  if (/^(\d)\1{10}$/.test(digits)) return "CPF inválido.";

  // Checksum validation
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(digits[9])) return "CPF inválido.";

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(digits[10])) return "CPF inválido.";

  return null;
}

export function validateCNPJ(cnpj: string): string | null {
  const digits = cnpj.replace(/\D/g, "");

  if (digits.length !== 14) return "CNPJ deve ter 14 dígitos.";
  if (/^(\d)\1{13}$/.test(digits)) return "CNPJ inválido.";

  // Checksum validation
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 12; i++) sum += parseInt(digits[i]) * weights1[i];
  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;
  if (parseInt(digits[12]) !== digit1) return "CNPJ inválido.";

  sum = 0;
  for (let i = 0; i < 13; i++) sum += parseInt(digits[i]) * weights2[i];
  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;
  if (parseInt(digits[13]) !== digit2) return "CNPJ inválido.";

  return null;
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "E-mail é obrigatório.";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return "E-mail inválido.";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Senha é obrigatória.";
  if (password.length < 8) return "Senha deve ter no mínimo 8 caracteres.";
  return null;
}

export function validateNome(nome: string): string | null {
  if (!nome.trim()) return "Nome é obrigatório.";
  if (nome.trim().length < 3) return "Nome deve ter no mínimo 3 caracteres.";
  if (!nome.trim().includes(" ")) return "Informe o nome completo.";
  return null;
}

export function validateDataNascimento(data: string): string | null {
  if (!data) return "Data de nascimento é obrigatória.";
  const date = new Date(data);
  const today = new Date();
  if (date >= today) return "Data de nascimento não pode ser no futuro.";

  const age = today.getFullYear() - date.getFullYear();
  if (age > 120) return "Data de nascimento inválida.";
  if (age < 16) return "É necessário ter pelo menos 16 anos.";

  return null;
}

export function validateCEP(cep: string): string | null {
  const digits = cep.replace(/\D/g, "");
  if (digits.length !== 8) return "CEP deve ter 8 dígitos.";
  return null;
}

export function validateTelefone(telefone: string): string | null {
  const digits = telefone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11)
    return "Telefone deve ter 10 ou 11 dígitos.";
  return null;
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value.trim()) return `${fieldName} é obrigatório.`;
  return null;
}

export function validateDataAgendada(data: string): string | null {
  if (!data) return "Data é obrigatória.";
  const date = new Date(data);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) return "A data não pode ser no passado.";
  return null;
}
