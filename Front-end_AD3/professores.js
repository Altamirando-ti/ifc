//const { response } = require("express");

// let professores = [
//     {codigo:1, nomeProfessor:'Paulo', emailProfessor: 'paulo.ifc@email'},
//     {codigo:2, nomeProfessor:'Beto', emailProfessor: 'beto.ifc@email'}
// ];
let currentProfessorId = null;

function openModal(modalId){
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId){
    document.getElementById(modalId).style.display = 'none';
}

const btAddProfessor = document.getElementById('addProfessor');
btAddProfessor.addEventListener('click', function(){
    currentProfessorId = null;
    document.getElementById('professorForm').reset();
    openModal('professorModal');
})

document.querySelectorAll('.close').forEach(function(closeBtn){
    closeBtn.addEventListener('click', function(){
        closeModal('professorModal')
    })
})

//manipulação dos array
function renderProfessores(){
    const tbody = document.querySelector("#professoresTable tbody")
    tbody.innerHTML = '';
        //fetch INSERIR AQUI!
    fetch('http://localhost:3000/professores')
    .then(response=>response.json())
    .then(profs => {
        professores = profs
        console.log(profs)
        professores.forEach((professor, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${professor.nomeProfessor}</td>
            <td>${professor.emailProfessor}</td>
            <td>
                <button onclick = "editProfessor(${index})">Editar</button>
                <button onclick = "deleteProfessor(${index})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
        })
    })
}

function editProfessor(index){
    const professor = professores[index];
    document.getElementById('codigo').value = professor.codigo;
    document.getElementById('nomeProfessor').value = professor.nomeProfessor;
    document.getElementById('emailProfessor').value = professor.emailProfessor;
    currentProfessorId = index;
    openModal('professorModal');
}

function deleteProfessor(index){
    if (confirm('Tem certeza que deseja excluir este professor?')){
        professores.splice(index,1);
        renderProfessores();
    }
}

//Função addProfessor pelo método get
// function addProfessor(codigo, nomeProfessor, emailProfessor){
//     professores.push({codigo, nomeProfessor, emailProfessor});
//     renderProfessores();
// } 

//Função addProfessor pelo método post
function addProfessor(codigo, nomeProfessor, emailProfessor){
    // professores.push({codigo, nomeProfessor, emailProfessor});
    let professor = {codigo, nomeProfessor, emailProfessor}
    console.log(professor)
    fetch('http://localhost:3000/professores',
        {
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(professor)
        })
        .then(response => response.json())
        .then(dados =>{
            console.log(dados)
        })
    renderProfessores();
}

const professorForm = document.getElementById('professorForm');
professorForm.addEventListener('submit',function(e){
    e.preventDefault();
    const codigo = document.getElementById('codigo').value;
    const nomeProfessor = document.getElementById('nomeProfessor').value;
    const emailProfessor = document.getElementById('emailProfessor').value;
    //inclusão ou alteração
    if(currentProfessorId !== null){
        professores[currentProfessorId] = {codigo, nomeProfessor, emailProfessor}
    }else{
        addProfessor(codigo, nomeProfessor, emailProfessor);
    }
    closeModal('professorModal');
    renderProfessores();
});

renderProfessores();