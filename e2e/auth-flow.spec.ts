import { test, expect, type BrowserContext } from "@playwright/test";

const fakeUser = {
  token: "jwt-fake-token-for-e2e",
  email: "caio@uff.br",
  nomeCompleto: "Caio Silva",
  role: "Consultor",
  expiration: "2030-01-01T00:00:00Z",
  empresaId: null,
};

async function seedAuth(context: BrowserContext) {
  await context.addCookies([
    {
      name: "token",
      value: fakeUser.token,
      domain: "localhost",
      path: "/",
    },
  ]);
  await context.addInitScript((user) => {
    localStorage.setItem("token", user.token);
    localStorage.setItem("user", JSON.stringify(user));
    // pula o termo de uso
    localStorage.setItem(`nutrisec_terms_v1_${user.email}`, "true");
  }, fakeUser);
}

test.describe("Fluxo de auth — não logado", () => {
  test("landing mostra Começar apontando para /login", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /^começar$/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/login");
  });

  test("clicar em Começar leva para /login", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /^começar$/i }).click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: /^entrar$/i })).toBeVisible();
  });

  test("acessar /home sem cookie redireciona para /login", async ({ page }) => {
    await page.goto("/home");
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe("Fluxo de auth — já logado", () => {
  test("landing mostra Começar apontando direto para /home", async ({
    page,
    context,
  }) => {
    await seedAuth(context);
    await page.goto("/");
    const cta = page.getByRole("link", { name: /^começar$/i });
    await expect(cta).toHaveAttribute("href", "/home");
  });

  test("clicar em Começar leva direto para /home", async ({ page, context }) => {
    await seedAuth(context);
    await page.route("**/api/avaliacoes", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: "[]",
      }),
    );
    await page.goto("/");
    await page.getByRole("link", { name: /^começar$/i }).click();
    await expect(page).toHaveURL(/\/home$/);
  });

  test("acessar /login estando logado redireciona para /home", async ({
    page,
    context,
  }) => {
    await seedAuth(context);
    await page.route("**/api/avaliacoes", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: "[]",
      }),
    );
    await page.goto("/login");
    await expect(page).toHaveURL(/\/home$/);
  });
});

test.describe("Landing — links externos", () => {
  test("Responder Pesquisa abre o RedCap em nova aba", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: /responder pesquisa/i });
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
    await expect(link).toHaveAttribute(
      "href",
      "https://redcap.uff.br/redcap/surveys/?s=TPJ4PMEMDL7AA98X",
    );
  });

  test("link Sobre no cabeçalho leva para /sobre", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /^sobre$/i }).click();
    await expect(page).toHaveURL(/\/sobre$/);
  });
});
