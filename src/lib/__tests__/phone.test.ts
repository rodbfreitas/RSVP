import { test } from "node:test";
import assert from "node:assert/strict";
import {
  maskPhone,
  isValidPhone,
  normalizePhone,
  formatPhoneDisplay,
  onlyDigits,
} from "../phone";

test("onlyDigits remove tudo que não é dígito", () => {
  assert.equal(onlyDigits("(11) 99999-9999"), "11999999999");
});

test("maskPhone aplica a máscara progressivamente", () => {
  assert.equal(maskPhone("1"), "(1");
  assert.equal(maskPhone("11"), "(11");
  assert.equal(maskPhone("119999"), "(11) 9999");
  assert.equal(maskPhone("11999999999"), "(11) 99999-9999");
  // ignora excesso de dígitos (limite 11)
  assert.equal(maskPhone("119999999999999"), "(11) 99999-9999");
});

test("isValidPhone aceita 10 ou 11 dígitos com DDD plausível", () => {
  assert.equal(isValidPhone("(11) 99999-9999"), true);
  assert.equal(isValidPhone("(11) 9999-9999"), true);
  assert.equal(isValidPhone("(01) 99999-9999"), false); // DDD < 11
  assert.equal(isValidPhone("123"), false);
  assert.equal(isValidPhone(""), false);
});

test("normalizePhone produz uma chave canônica 55 + DDD + número", () => {
  assert.equal(normalizePhone("(11) 99999-9999"), "5511999999999");
  assert.equal(normalizePhone("11999999999"), "5511999999999");
  // já vem com 55 e DDI completo
  assert.equal(normalizePhone("+55 11 99999-9999"), "5511999999999");
});

test("normalizePhone garante idempotência (mesmo telefone => mesma chave)", () => {
  const variants = ["(11) 99999-9999", "11999999999", "+55 (11) 99999-9999"];
  const normalized = variants.map(normalizePhone);
  assert.deepEqual(new Set(normalized).size, 1);
});

test("formatPhoneDisplay converte de volta para exibição", () => {
  assert.equal(formatPhoneDisplay("5511999999999"), "(11) 99999-9999");
});
