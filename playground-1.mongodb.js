/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('Escola');

// Limpar as coleções antes de inserir dados
db.getCollection('alunos').deleteMany({});
db.getCollection('cursos').deleteMany({});
db.getCollection('professores').deleteMany({});
db.getCollection('materias').deleteMany({});

// Insere dados na tabela alunos
db.getCollection('alunos').insertMany([
  { 'nome': 'Maria', 'RA': 22001562, 'curso':'Engenharia de Dados'},
  { 'nome': 'João', 'RA': 22003789, 'curso':'Engenharia de Produção'},
  { 'nome': 'Ana', 'RA': 22009431, 'curso':'Engenharia de Dados'},
  { 'nome': 'Luiza', 'RA': 22008421, 'curso':'Engenharia de Computação'},
  { 'nome': 'Carlos', 'RA': 22002763, 'curso':'Engenharia de Computação'},
  { 'nome': 'Juliana', 'RA': 22007654, 'curso':'Engenharia de Produção'},
  { 'nome': 'Mateus', 'RA': 22002685, 'curso':'Engenharia de Dados'},
]);

// Insere as materias 
db.getCollection('materias').insertMany([
  { 'nome': 'Analise de Algoritmos', 'RM': 'P0120', 'cursos': 'Engenharia de Computação', 'professor_m': 'Fernando Oliveira' },
  { 'nome': 'Sistemas Distribuidos', 'RM': 'P0135', 'cursos': 'Engenharia de Computação', 'professor_m': 'Roberta Silva' },
  { 'nome': 'Gestão da Qualidade', 'RM': 'P0201', 'cursos': 'Engenharia de Produção', 'professor_m': 'Isabela Sousa' },
  { 'nome': 'Logística Integrada', 'RM': 'P0101', 'cursos': 'Engenharia de Produção', 'professor_m': 'Daniel Santos' },
  { 'nome': 'Mineração de Dados', 'RM': 'P0203', 'cursos': 'Engenharia de Dados', 'professor_m': 'Guilherme Mendonça' },
  { 'nome': 'Big Data Analytics', 'RM': 'P0301', 'cursos': 'Engenharia de Dados', 'professor_m': 'Caroline Almeida' },
]);

// Insere os cursos
db.getCollection('cursos').insertMany([
  { 'nome': 'Engenharia de Computação', 'code': 'ENGEL101', 'professores': ['Fernando Oliveira', 'Roberta Silva'] },
  { 'nome': 'Engenharia de Produção', 'code': 'ENCI201', 'professores': ['Isabela Sousa', 'Daniel Santos'] },
  { 'nome': 'Engenharia de Dados', 'code': 'ENME301', 'professores': ['Guilherme Mendonça', 'Caroline Almeida'] },
]);

// Insere os professores 
db.getCollection('professores').insertMany([
  { 'nome': 'Fernando Oliveira', 'professor_id': 'RS001', 'cursos': ['Engenharia de Computação'] },
  { 'nome': 'Roberta Silva', 'professor_id': 'ED002', 'cursos': ['Engenharia de Computação'] },
  { 'nome': 'Isabela Sousa', 'professor_id': 'MJ003', 'cursos': ['Engenharia de Produção'] },
  { 'nome': 'Daniel Santos', 'professor_id': 'SB004', 'cursos': ['Engenharia de Produção'] },
  { 'nome': 'Guilherme Mendonça', 'professor_id': 'DW005', 'cursos': ['Engenharia de Dados'] },
  { 'nome': 'Caroline Almeida', 'professor_id': 'RT006', 'cursos': ['Engenharia de Dados'] },
]);

// Função para imprimir dados em formato de tabela
function printTable(data) {
  // Verifica se há dados
  if (data.length === 0) {
      console.log("Nenhum dado disponivel.");
      return;
  }
  
  // Remove o campo _id do cabeçalho e dos dados
  const keys = Object.keys(data[0]).filter(key => key !== '_id');

  // Calcula a largura de cada coluna
  const columnWidths = {};
  keys.forEach(key => {
      const maxLength = Math.max(...data.map(item => String(item[key]).length));
      columnWidths[key] = Math.max(maxLength, key.length);
  });
  
  // Imprime cabeçalho da tabela
  const header = keys.map(key => key.padEnd(columnWidths[key])).join(" | ");
  console.log(header);

  // Imprime linha divisória
  const divider = keys.map(key => "-".repeat(columnWidths[key])).join("-|-");
  console.log(divider);

  // Imprime dados em formato de tabela
  data.forEach((item) => {
      const row = keys.map(key => String(item[key]).padEnd(columnWidths[key]));
      console.log(row.join(" | "));
  });
}

// Imprimir alunos
const alunos = db.getCollection('alunos').find().toArray();
console.log("Alunos:");
printTable(alunos);

// Query to find alunos of a professor
const professorName = 'Fernando Oliveira';
const cursosDoProfessor = db.getCollection('cursos').find({ professores: professorName }).toArray();
const cursos = cursosDoProfessor.map(c => c.nome);
const alunosDoProfessor = db.getCollection('alunos').find({ curso: { $in: cursos } }).toArray();

console.log('Alunos do professor:', professorName);
printTable(alunosDoProfessor);
