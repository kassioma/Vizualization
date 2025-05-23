const dados = [
  {
    area: "Legislação",
    referencia: "LGPD (LEI Nº 13.709),LAI (LEI Nº 12.527), SGD, Marco Civil da Internet (LEI Nº 12.965), ANPD",
    competencia: "Noções Básicas da LGPD, Direitos dos Titulares de Dados, Consentimento e Revogação, Funções e Responsabilidades do Controlador, Operador e Encarregado, Princípios da LAI, Portaria SGD/MGI Nº 852, de 26 de Março de 2023, Conhecimento Geral sobre o Marco Civil da Internet, Atuação do Encarregado conforme a ANPD",
    descricao: "Compreensão dos principais conceitos da LGPD, incluindo definição de dados pessoais e sensíveis, bases legais para tratamento e direitos dos titulares.",
    perfis: ["Encarregado", "Controlador", "Operador", "Titular", "Equipe do Encarregado", "Alta Gestão1", "Alta Gestão2", "Resp. Unidade Interna", "Usuário"]
  },
  {
    area: "Conhecimentos em Tecnologia da Informação",
    referencia: "-",
    competencia: "Noções Básicas de TI e Sistemas de Informação, Conceitos de Privacidade e Segurança em TI, Noções Básicas Sobre Armazenamento de Dados",
    descricao: "Entendimento dos conceitos básicos de TI, como o que são redes de computadores, sistemas operacionais (Windows, Linux, etc.) e a função dos servidores na armazenagem e processamento de dados.",
    perfis: ["Encarregado", "Controlador", "Operador", "Titular", "Equipe do Encarregado", "Alta Gestão1", "Alta Gestão2", "Resp. Unidade Interna", "Usuário"]
  },
  {
    area: "Privacy by Design",
    referencia: "-",
    competencia: "Conceitos Fundamentais de Privacy By Design and By Default, Princípios de Privacidade, Noções de Compliance com Regulamentos de Privacidade",
    descricao: "Privacy by Design (PbD) e Privacy by Default (PbDft), como a integração da privacidade desde o início de um projeto.",
    perfis: ["Encarregado", "Controlador", "Operador", "Titular", "Equipe do Encarregado", "Alta Gestão1", "Alta Gestão2", "Resp. Unidade Interna", "Usuário"]
  },
  {
    area: "Estratégias de Privacidade",
    referencia: "-",
    competencia: "Conceitos Básicos de Privacidade, Noções de Privacidade e Proteção de Dados, Conceitos Fundamentais de Privacidade, Comunicação Eficaz sobre Privacidade, Princípios Éticos de Privacidade, Implementação de Programas de Conformidade,Cultura de Privacidade na Organização",
    descricao: "Entender os princípios fundamentais da privacidade, incluindo confidencialidade, integridade e disponibilidade de dados.",
    perfis: ["Encarregado", "Controlador", "Operador", "Titular", "Equipe do Encarregado", "Alta Gestão1", "Alta Gestão2", "Resp. Unidade Interna", "Usuário"]
  },
  {
    area: "Documentos Orientativos",
    referencia: "SGD, ANPD",
    competencia: "Conhecimento geral sobre o glossário de proteção de dados pessoais e privacidade, Conhecimento sobre o PPSI e seu funcionamento, Conhecimento sobre Framework do PPSI, Conhecimento sobre os Requisitos Gerais de Estruturação de Privacidade e Segurança referentes a contratos, Conhecimento sobre as definições do Guia Orientativo para Definições dos Agentes de Tratamento de Dados Pessoais e do Encarregado, Conhecimento sobre as definições do Guia Orientativo: Atuação do Encarregado Pelo Tratamento de Dados Pessoais, Tratamento de dados pessoais pelo Poder Público, Entendimento sobre proteção de dados pessoais de acordo com a ANPD, Conhecimento sobre Vazamento de Dados.",
    descricao: "Conhecimento geral sobre o documento: Glossário de proteção de dados pessoais e privacidade.",
    perfis: ["Encarregado", "Controlador", "Operador", "Titular", "Equipe do Encarregado", "Alta Gestão1", "Alta Gestão2", "Resp. Unidade Interna", "Usuário"]
  },
  {
    area: "Gestão de Riscos e Conformidade",
    referencia: "-",
    competencia: "Governança Corporativa, Gestão de Incidentes de Privacidade, Fundamentos de Conformidade, Conceitos Básicos de Gestão de Riscos de Privacidade",
    descricao: "Noções básicas sobre o papel da governança corporativa na proteção de dados e como ela se relaciona com as estratégias de privacidade.",
    perfis: ["Encarregado"]
  }
];

let dadosOrdenados = [...dados];
let ordenacao = { coluna: null, direcao: 'asc' };

document.addEventListener('DOMContentLoaded', function() {
  // Preencher a tabela com todos os dados inicialmente
  filtrarPerfil();
});

function filtrarPerfil() {
  const perfilSelecionado = Array.from(document.getElementById("perfil").selectedOptions)
    .map(option => option.value);
  const termoBusca = document.getElementById("busca").value.toLowerCase();
  const corpoTabela = document.getElementById("corpo-tabela");
  const semResultados = document.getElementById("sem-resultados");

  let filtrados = [...dadosOrdenados];

  // Filtro por perfil
  if (perfilSelecionado.length > 0) {
    filtrados = filtrados.filter(d => 
      perfilSelecionado.some(perfil => d.perfis.includes(perfil))
    );
  }

  // Filtro por busca
  if (termoBusca) {
    filtrados = filtrados.filter(d => 
      d.area.toLowerCase().includes(termoBusca) ||
      d.competencia.toLowerCase().includes(termoBusca) ||
      d.descricao.toLowerCase().includes(termoBusca)
    );
  }

  // Atualizar tabela
  corpoTabela.innerHTML = "";
  
  if (filtrados.length === 0) {
    semResultados.style.display = "block";
    corpoTabela.style.display = "none";
  } else {
    semResultados.style.display = "none";
    corpoTabela.style.display = "table-row-group";
    
    for (const item of filtrados) {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${item.area}</td>
        <td>${item.referencia}</td>
        <td>${item.competencia}</td>
        <td>${item.descricao}</td>
        <td>${item.perfis.join(", ")}</td>
      `;
      corpoTabela.appendChild(linha);
    }
  }
}

function ordenarTabela(coluna) {
  if (ordenacao.coluna === coluna) {
    ordenacao.direcao = ordenacao.direcao === 'asc' ? 'desc' : 'asc';
  } else {
    ordenacao.coluna = coluna;
    ordenacao.direcao = 'asc';
  }

  dadosOrdenados.sort((a, b) => {
    let valorA, valorB;
    
    switch (coluna) {
      case 0: valorA = a.area; valorB = b.area; break;
      case 1: valorA = a.competencia; valorB = b.competencia; break;
      case 3: valorA = a.perfis.join(", "); valorB = b.perfis.join(", "); break;
      default: return 0;
    }

    if (valorA < valorB) return ordenacao.direcao === 'asc' ? -1 : 1;
    if (valorA > valorB) return ordenacao.direcao === 'asc' ? 1 : -1;
    return 0;
  });

  filtrarPerfil();
}