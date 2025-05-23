const dados = [
  {
    area: "Legislação - LGPD",
    competencia: "Noções Básicas da LGPD",
    descricao: "Compreensão dos principais conceitos da LGPD, incluindo definição de dados pessoais e sensíveis, bases legais para tratamento e direitos dos titulares.",
    perfis: ["Encarregado", "Controlador", "Operador", "Titular", "Equipe do Encarregado", "Alta Gestão1", "Alta Gestão2", "Resp. Unidade Interna", "Usuário"]
  },
  {
    area: "Legislação - LGPD",
    competencia: "Direitos dos Titulares de Dados",
    descricao: "Familiaridade com os direitos dos titulares previstos na LGPD e apoio na resposta a solicitações.",
    perfis: ["Encarregado", "Controlador", "Operador", "Titular", "Equipe do Encarregado", "Alta Gestão1", "Alta Gestão2", "Resp. Unidade Interna", "Usuário"]
  },
  {
    area: "Legislação - LGPD",
    competencia: "Consentimento e Revogação",
    descricao: "Entendimento sobre como o consentimento é solicitado e o direito de revogação.",
    perfis: ["Encarregado", "Controlador", "Operador", "Titular", "Equipe do Encarregado", "Alta Gestão1", "Alta Gestão2", "Resp. Unidade Interna", "Usuário"]
  },
  {
    area: "Legislação - LGPD",
    competencia: "Funções e Responsabilidades",
    descricao: "Conhecimento sobre as responsabilidades de controlador, operador e encarregado.",
    perfis: ["Encarregado", "Controlador", "Operador", "Titular", "Equipe do Encarregado", "Alta Gestão1", "Alta Gestão2", "Resp. Unidade Interna", "Usuário"]
  },
  {
    area: "ANPD",
    competencia: "Atuação do Encarregado conforme a ANPD",
    descricao: "Compreensão sobre a Resolução CD/ANPD Nº 18/2024 e as responsabilidades do Encarregado.",
    perfis: ["Encarregado"]
  },
  {
    area: "TI e Privacidade",
    competencia: "Noções Básicas de TI",
    descricao: "Conceitos de redes, sistemas operacionais e servidores na gestão de dados.",
    perfis: ["Encarregado"]
  },
  {
    area: "Privacidade por Design",
    competencia: "Privacy by Design e Default",
    descricao: "Conceitos fundamentais e princípios centrais como proatividade, prevenção e transparência.",
    perfis: ["Encarregado", "Controlador"]
  },
  {
    area: "Governança",
    competencia: "Fundamentos de Conformidade",
    descricao: "Conhecimento básico sobre a necessidade de se adequar à legislação, como a criação de políticas de privacidade claras e acessíveis.",
    perfis: ["Controlador"]
  },
  {
    area: "Legislação - LGPD",
    competencia: "Conformidade com a LGPD e suas Obrigações",
    descricao: "Compreensão das principais obrigações impostas pela LGPD para as organizações.",
    perfis: ["Controlador"]
  },
  {
    area: "Gestão de Dados",
    competencia: "Mapeamento de Dados e Inventário",
    descricao: "Habilidade em identificar e mapear onde os dados pessoais são coletados, armazenados e processados.",
    perfis: ["Controlador"]
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