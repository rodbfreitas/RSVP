import { test } from "node:test";
import assert from "node:assert/strict";
import { toCsv } from "../utils";

test("toCsv gera cabeçalho e linhas separadas por ;", () => {
  const csv = toCsv([
    { nome: "Fulano", quantidade: 2 },
    { nome: "Ciclana", quantidade: 1 },
  ]);
  const lines = csv.replace("﻿", "").split("\r\n");
  assert.equal(lines[0], "nome;quantidade");
  assert.equal(lines[1], "Fulano;2");
  assert.equal(lines[2], "Ciclana;1");
});

test("toCsv escapa campos com vírgula, ponto e vírgula ou aspas", () => {
  const csv = toCsv([{ nome: 'Fulano "Beach Tennis"; Vôlei' }]);
  assert.match(csv, /"Fulano ""Beach Tennis""; Vôlei"/);
});

test("toCsv com lista vazia retorna string vazia", () => {
  assert.equal(toCsv([]), "");
});
