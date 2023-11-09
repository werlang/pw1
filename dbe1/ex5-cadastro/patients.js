fetch('patients.php').then(res => res.json()).then(patients => {
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Observações</th>
            </tr>
        </thead>
        <tbody id="table"></tbody>
    `;

    const body = table.querySelector('tbody');
    
    patients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.name}</td>
            <td>${patient.phone}</td>
            <td>${patient.email}</td>
            <td>${patient.notes}</td>
        `;
        body.appendChild(row);
    });
    
    document.body.appendChild(table);
});