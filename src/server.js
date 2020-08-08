//dados
const proffys = [{
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "(00)000000000",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [0], //domingo
        time_from: [900], //segundos
        time_to: [1800] //segundos
    },
    {
        name: "Wagner Herculano",
        avatar: "https://avatars0.githubusercontent.com/u/26460999?s=460&u=6cd1f32e88ae5c240a1041bb6ef9ef8f449ab6ea&v=4",
        whatsapp: "(00)000000000",
        bio: "Estudante da linguagem Python há um pouco mais de 2 anos e se aventurando nos estudos de Back end com outras linguagens também.",
        subject: "Python Developer",
        cost: "20",
        weekday: [0], //domingo
        time_from: [900], //segundos
        time_to: [1800] //segundos
    }
]
const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

//funcionalidades
function getSubject(subjectNumber) {
    const arrayPosition = +subjectNumber - 1 //+ garante que se trata de um numero
    return subjects[arrayPosition]
}

function pageLanding(req, resp) {
    return resp.render("index.html")
        //return resp.sendFile(__dirname + "/views/index.html")
}

function pageStudy(req, resp) {
    const filters = req.query
    return resp.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, resp) {
    const data = req.query

    //convertendo chaves do objeto em arrays 
    // de { name: "xxx", avatar: "xxx" } em [name, avatar]
    const isNotEmpty = Object.keys(data).length != 0

    //Se tiver dados, adiciona-los à lista proffys
    if (isNotEmpty) {
        data.subject = getSubject(data.subject)
        proffys.push(data)
        return resp.redirect("/study")
    }
    //senão, mostrar a pagina
    return resp.render("give-classes.html", { subjects, weekdays })
}

//Servidor
const express = require('express')
const server = express()

//configurar nunjucks (Template Engine)
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})

//Inicio e configuração do servidor
server
// mostrando ao servidor onde estão os aquivos estáticos/publicos (css, html, js, scripts, imagens, etc)
    .use(express.static("public"))
    //rotas da aplicação
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .listen(5500) // 5500 foi a porta deseja no momento, mas pode ser qualquer uma