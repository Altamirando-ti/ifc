//deletear até..
// let cursos = [
//     {codigo:1, nomeCurso:'TSI', semestres: 1, 'coordenador':'Joice'},
//     {codigo:2, nomeCurso:'BSI', semestres: 8, 'coordenador':'Aujor'}
// ];
let currentCursoId = null;

function openModal(modalId){
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId){
    document.getElementById(modalId).style.display = 'none';
}

const btAddCurso = document.getElementById('addCurso');
btAddCurso.addEventListener('click', function(){
    currentCursoId = null;
    document.getElementById('cursoForm').reset();
    openModal('cursoModal');
})

document.querySelectorAll('.close').forEach(function(closeBtn){
    closeBtn.addEventListener('click', function(){
        closeModal('cursoModal')
    })
})

//Funções para Cursos
function renderCursos(){
    const tbody = document.querySelector("#cursosTable tbody")
    tbody.innerHTML = '';
        //fetch INSERIR AQUI!
    fetch('http://localhost:3000/cursos')
    .then(response=>response.json())
    .then(a_cursos => {
        cursos = a_cursos
        console.log(a_cursos)
        cursos.forEach((curso, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${curso.nomeCurso}</td>
                <td>${curso.semestres}</td>
                <td>${curso.coordenador}</td>
                <td>
                    <button onclick = "editCurso(${index})">Editar</button>
                    <button onclick = "deleteCurso(${index})">Excluir</button>
                </td>
            `;
            tbody.appendChild(row);
        })
    })
}

function editCurso(index){
    const curso = cursos[index];
    document.getElementById('codigo').value = curso.codigo;
    document.getElementById('nomeCurso').value = curso.nomeCurso;
    document.getElementById('semestres').value = curso.semestres;
    document.getElementById('coordenador').value = curso.coordenador;
    currentCursoId = index;
    openModal('cursoModal');
}

function deleteCurso(index){
    if (confirm('Tem certeza que deseja excluir o este curso?')){
        cursos.splice(index,1);
        renderCursos();
    }
}

//Função addCurso pelo método get
// function addCurso(codigo, nomeCurso, semestres, coordenador){
//     cursos.push({codigo, nomeCurso, semestres, coordenador});
//     renderCursos();
// }

//Função addCurso pelo método post
function addCurso(codigo, nomeCurso, semestres, coordenador){
    // cursos.push({codigo, nomeCurso, semestres, coordenador});
    let curso = {codigo, nomeCurso, semestres, coordenador}
    console.log(curso)
    fetch('http://localhost:3000/cursos',
        {
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(curso)
        })
        .then(response => response.json())
        .then(dados =>{
            console.log(dados)
        })
    renderCursos();
}


const cursoForm = document.getElementById('cursoForm');
cursoForm.addEventListener('submit',function(e){
    e.preventDefault();
    const codigo = document.getElementById('codigo').value;
    const nomeCurso = document.getElementById('nomeCurso').value;
    const semestres = document.getElementById('semestres').value;
    const coordenador = document.getElementById('coordenador').value;
    //inclusão ou alteração
    if(currentCursoId !== null){
        cursos[currentCursoId] = {codigo, nomeCurso, semestres, coordenador}
    }else{
        addCurso(codigo, nomeCurso, semestres, coordenador);
    }
    closeModal('cursoModal');
    renderCursos();
});

renderCursos();