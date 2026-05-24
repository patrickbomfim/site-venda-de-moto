/* ============================================
   MOTO-DARK — script.js
   Lógica global, localStorage, utilitários
   ============================================ */

// ============ DADOS INICIAIS ============

/** Motos padrão carregadas se o localStorage estiver vazio */
const DEFAULT_MOTOS = [
  { id: 'm1', nome: 'Honda CB 300R', preco: 22900, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', emplacamento: true },
  { id: 'm2', nome: 'Yamaha MT-03',  preco: 31500, img: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80', emplacamento: true },
  { id: 'm3', nome: 'Honda CG 160',  preco: 13400, img: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80', emplacamento: true },
  { id: 'm4', nome: 'Kawasaki Z400', preco: 36800, img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&q=80', emplacamento: true },
  { id: 'm5', nome: 'Royal Enfield Classic 350', preco: 27500, img: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=600&q=80', emplacamento: true },
  { id: 'm6', nome: 'Suzuki GSX-S750', preco: 41200, img: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80', emplacamento: true },
];

/** Equipamentos estáticos com fotos reais */
const EQUIPAMENTOS = [
  {
    id: 'e1',
    nome: 'Capacete Full Face',
    preco: 489,
    icon: '⛑️',
    desc: 'Proteção integral com viseira anti-risco',
    img: '/images/capacete.jpg',
    imgFallback: '/images/capacete-fallback.jpg'
  },
  {
    id: 'e2',
    nome: 'Jaqueta Moto Racing',
    preco: 699,
    icon: '🧥',
    desc: 'Couro premium com proteções CE Nível 2',
    img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    imgFallback: 'https://makerofjacket.com/cdn/shop/products/Black-Orange-KTM-Motorcycle-Racing-Leather-Jacket.jpg'
  },
  {
    id: 'e3',
    nome: 'Luvas de Couro',
    preco: 199,
    icon: '🧤',
    desc: 'Reforço nos nós e palma antiderrapante',
    img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80',
    imgFallback: 'https://m.media-amazon.com/images/I/71TnIgqDPYL._AC_SX679_.jpg'
  },
  {
    id: 'e4',
    nome: 'Baú Traseiro 45L',
    preco: 349,
    icon: '🧳',
    desc: 'Impermeável, trava dupla, suporte universal',
    img: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80',
    imgFallback: 'https://m.media-amazon.com/images/I/71GUpCNmWHL._AC_SX679_.jpg'
  },
  {
    id: 'e5',
    nome: 'Bota Adventure',
    preco: 599,
    icon: '👢',
    desc: 'Tornozelo reforçado, solado antiderrapante',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    imgFallback: 'https://raxid.com/cdn/shop/products/DARWIN-WP-CE-ADVENTURE-BOOTS-BLACK.jpg'
  },
  {
    id: 'e6',
    nome: 'Calça Motociclista',
    preco: 449,
    icon: '👖',
    desc: 'Com joelheiras e proteção de quadril CE',
    img: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80',
    imgFallback: 'https://m.media-amazon.com/images/I/61q4xs2ZQNL._AC_SX679_.jpg'
  },
];

// ============ LOCALSTORAGE HELPERS ============

/** Retorna array de motos do localStorage (ou padrão) */
function getMotos() {
  const raw = localStorage.getItem('motodark_motos');
  if (!raw) {
    localStorage.setItem('motodark_motos', JSON.stringify(DEFAULT_MOTOS));
    return DEFAULT_MOTOS;
  }
  try { return JSON.parse(raw); }
  catch { return DEFAULT_MOTOS; }
}

/** Salva array de motos */
function saveMotos(arr) {
  localStorage.setItem('motodark_motos', JSON.stringify(arr));
}

/** Retorna array de clientes */
function getClientes() {
  try { return JSON.parse(localStorage.getItem('motodark_clientes') || '[]'); }
  catch { return []; }
}

/** Salva array de clientes */
function saveClientes(arr) {
  localStorage.setItem('motodark_clientes', JSON.stringify(arr));
}

/** Retorna array de compras simuladas */
function getCompras() {
  try { return JSON.parse(localStorage.getItem('motodark_compras') || '[]'); }
  catch { return []; }
}

/** Salva compra simulada */
function addCompra(item) {
  const compras = getCompras();
  compras.push({ ...item, data: new Date().toLocaleDateString('pt-BR') });
  localStorage.setItem('motodark_compras', JSON.stringify(compras));
}

// ============ UTILITÁRIOS ============

/** Formata número como moeda BRL */
function formatBRL(value) {
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/** Gera ID único simples */
function uid() {
  return 'm' + Date.now() + Math.random().toString(36).slice(2, 6);
}

/** Valida CPF (apenas formato) */
function validarCPF(cpf) {
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf) || /^\d{11}$/.test(cpf);
}

/** Máscara de CPF */
function maskCPF(v) {
  return v.replace(/\D/g,'')
          .replace(/(\d{3})(\d)/,'$1.$2')
          .replace(/(\d{3})(\d)/,'$1.$2')
          .replace(/(\d{3})(\d{1,2})$/,'$1-$2')
          .slice(0,14);
}

/** Máscara de telefone */
function maskPhone(v) {
  return v.replace(/\D/g,'')
          .replace(/^(\d{2})(\d)/,'($1) $2')
          .replace(/(\d{5})(\d{4})$/,'$1-$2')
          .slice(0,15);
}

// ============ TOAST ============

/** Exibe toast notification */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✅', error: '❌', info: '🔔' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || '🔔'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3100);
}

// ============ NAVBAR HAMBURGER ============

document.addEventListener('DOMContentLoaded', () => {
  const btn  = document.getElementById('hamburger-btn');
  const menu = document.getElementById('navbar-links');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
    // Fecha ao clicar em link
    menu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => menu.classList.remove('open'))
    );
  }

  // Marca link ativo
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
});

// ============ MODAL ============

/** Exibe modal de confirmação de compra */
function openBuyModal(nome, preco, tipo) {
  // Remove modal anterior se existir
  const old = document.getElementById('buy-modal');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'buy-modal';
  overlay.innerHTML = `
    <div class="modal-box">
      <div class="modal-title">🏍️ Confirmar interesse</div>
      <p style="color:var(--text-secondary);font-size:.9rem;">
        Você demonstrou interesse em:
      </p>
      <p style="font-weight:700;font-size:1.1rem;margin:.75rem 0 .25rem;">
        ${nome}
      </p>
      <p style="color:var(--orange);font-size:1.3rem;font-weight:700;font-family:var(--font-display);">
        ${formatBRL(preco)}
      </p>
      <p style="color:var(--text-secondary);font-size:.82rem;margin-top:.75rem;">
        🔖 Emplacamento incluso · Maior de 16 anos · Sem financiamento
      </p>
      <div class="modal-actions">
        <button class="btn btn-ghost btn-sm" onclick="document.getElementById('buy-modal').remove()">Cancelar</button>
        <button class="btn btn-primary btn-sm" onclick="confirmBuy('${nome}',${preco},'${tipo}')">Confirmar Interesse</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
}

/** Confirma compra simulada */
function confirmBuy(nome, preco, tipo) {
  addCompra({ nome, preco, tipo });
  document.getElementById('buy-modal')?.remove();
  showToast(`Interesse registrado: ${nome}`, 'success');
}