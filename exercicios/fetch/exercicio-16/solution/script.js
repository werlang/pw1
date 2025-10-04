import showToast from "./components/toast.js";

let students = [];

async function loadStudents() {
    try {
        const data = await fetch('/api/student/list.php').then(res => res.json());
        
        if (data.error) {
            showToast(data.message, 'error');
            return;
        }
        
        students = data.students.map(s => ({
            ...s,
            selected: false,
            average: ((parseFloat(s.grade1) + parseFloat(s.grade2) + parseFloat(s.grade3)) / 3).toFixed(2)
        }));
        
        renderStudents();
    } catch (error) {
        showToast('Erro ao carregar estudantes', 'error');
    }
}

function renderStudents() {
    const container = document.querySelector('#studentsList');
    container.innerHTML = '';
    
    if (!students || students.length === 0) {
        container.innerHTML = '<p class="no-students">Nenhum estudante cadastrado.</p>';
        return;
    }
    
    // Add header with select all
    const header = document.createElement('div');
    header.className = 'student-header';
    header.innerHTML = `
        <input type="checkbox" id="selectAll" class="student-checkbox">
        <span>Nome</span>
        <span>Nota 1</span>
        <span>Nota 2</span>
        <span>Nota 3</span>
        <span>Média</span>
    `;
    container.appendChild(header);
    
    document.querySelector('#selectAll').addEventListener('change', (e) => {
        students.forEach(s => s.selected = e.target.checked);
        renderStudents();
        updateCalculateButton();
    });
    
    students.forEach(student => {
        const row = document.createElement('div');
        row.className = 'student-row';
        
        const status = parseFloat(student.average) >= 7 ? 'approved' : 'failed';
        
        row.innerHTML = `
            <input type="checkbox" class="student-checkbox" ${student.selected ? 'checked' : ''} data-id="${student.id}">
            <span class="student-name">${student.name}</span>
            <span class="grade">${parseFloat(student.grade1).toFixed(1)}</span>
            <span class="grade">${parseFloat(student.grade2).toFixed(1)}</span>
            <span class="grade">${parseFloat(student.grade3).toFixed(1)}</span>
            <span class="average ${status}">${student.average}</span>
        `;
        
        const checkbox = row.querySelector('.student-checkbox');
        checkbox.addEventListener('change', (e) => {
            const st = students.find(s => s.id == student.id);
            if (st) {
                st.selected = e.target.checked;
                updateCalculateButton();
            }
        });
        
        container.appendChild(row);
    });
    
    updateSelectAllCheckbox();
}

function updateSelectAllCheckbox() {
    const selectAll = document.querySelector('#selectAll');
    if (selectAll) {
        selectAll.checked = students.length > 0 && students.every(s => s.selected);
    }
}

function updateCalculateButton() {
    const btn = document.querySelector('#calculateBtn');
    const selectedCount = students.filter(s => s.selected).length;
    btn.disabled = selectedCount === 0;
    btn.textContent = selectedCount > 0 ? `Calcular Média (${selectedCount})` : 'Calcular Média';
}

function calculateSelectedAverage() {
    const selected = students.filter(s => s.selected);
    
    if (selected.length === 0) {
        showToast('Selecione pelo menos um estudante', 'warning');
        return;
    }
    
    const totalAverage = selected.reduce((sum, s) => sum + parseFloat(s.average), 0) / selected.length;
    
    const display = document.querySelector('#averageDisplay');
    display.textContent = `Média da Turma: ${totalAverage.toFixed(2)}`;
    display.style.display = 'block';
    
    showToast(`Média calculada para ${selected.length} estudante(s): ${totalAverage.toFixed(2)}`, 'success');
}

document.querySelector('#calculateBtn').addEventListener('click', calculateSelectedAverage);

loadStudents();
