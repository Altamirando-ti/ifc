//Variáveis globais
let cursos = [];
let professores = [];
let currentCursoId = null;
let currentProfessorId = null;

// Funções para manipulaçoes modais
function openModal(modalId){
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId){
    document.getElementById(modalId).style.display = 'none';
}

// Event listeners para fechar modais
document.querySelectorAll('.close').forEach(function(closeBtn){
    closeBtn.addEventListener('click',function(){
        closeModal(this.closest('.modal').id);
    });
});