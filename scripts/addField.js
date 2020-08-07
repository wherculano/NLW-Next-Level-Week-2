// Procurar o botão
document.querySelector("#add-time")
    // Quando clicar no botão
    .addEventListener('click', cloneField)


// Executar uma ação
function cloneField() {
    // Duplicar os campos: Que campo?
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)
        //Pegar os campos: Que campos?
    const fields = newFieldContainer.querySelectorAll('input')
        //Para cada campo duplicado, limpa-lo
    fields.forEach(function(field) {
            //pegar o field do momento e limpa ele
            field.value = ""
        })
        // Colocar na página: Em que lugar da página?
    document.querySelector('#schedule-items').append(newFieldContainer)
}