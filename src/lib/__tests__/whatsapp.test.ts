import { test } from "node:test";
import assert from "node:assert/strict";
import { buildWaShareLink } from "../whatsapp";
import { buildWhatsAppInviteMessage, buildReminderMessage } from "../constants";

test("buildWaShareLink URL-encoda a mensagem corretamente", () => {
  const link = buildWaShareLink("Confirme aqui: https://exemplo.com?a=1&b=2");
  assert.ok(link.startsWith("https://wa.me/?text="));
  const url = new URL(link);
  assert.equal(
    url.searchParams.get("text"),
    "Confirme aqui: https://exemplo.com?a=1&b=2",
  );
});

test("buildWaShareLink inclui o telefone normalizado quando fornecido", () => {
  const link = buildWaShareLink("Oi!", "5511999999999");
  assert.ok(link.startsWith("https://wa.me/5511999999999?text="));
});

test("buildWhatsAppInviteMessage substitui o placeholder da URL", () => {
  const msg = buildWhatsAppInviteMessage("https://pagodedosirmaos.com.br");
  assert.match(msg, /PAGODE DOS IRMÃOS/);
  assert.match(msg, /https:\/\/pagodedosirmaos\.com\.br/);
  assert.doesNotMatch(msg, /\{url\}/);
});

test("buildReminderMessage pluraliza corretamente", () => {
  assert.match(buildReminderMessage("Ana", 1), /1 pessoa\./);
  assert.match(buildReminderMessage("Ana", 3), /3 pessoas\./);
});
